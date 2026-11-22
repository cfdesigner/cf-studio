#!/usr/bin/env python3
"""Mixa os efeitos sonoros do C02 sobre a voz e grava um MP4 (vídeo copiado, sem recompressão).

Uso: python3 producoes/c02-broll/som/mixar.py <video-in.mp4> <video-out.mp4> [--kit <pasta com WAVs do dono>]
Voz (opcional): --voz <wav> usa essa voz no lugar do áudio do vídeo (ex.: com um trecho regravado, veja trocar_trecho_voz.py).
Música (opcional): --musica <arquivo> [--musica-inicio S] [--musica-db DB (ganho base; usado: 2)]  (o impacto da música cai em IMPACTO_VIDEO s do vídeo;
o início é o ponto da faixa que vira 0:00). A música é cortada do vídeo, ganha fade, abaixa quando há fala (sidechain) e sobe nas pausas.
Padrão: os sons do dono em design-systems/cfdesigner/assets/sfx. --kit <pasta> usa outra pasta; --sintetico usa o kit sintetizado (kit.py, nomes antigos).
Tempo de cada evento = INÍCIO do som (o pico do whoosh cai perto do fim dele, por isso começa antes do corte).
"""
import os, subprocess, sys, tempfile, wave
import numpy as np
sys.path.insert(0, os.path.dirname(__file__))
import kit as K

SR = K.SR
# (tempo s, som, ganho dB, o que é). Sons do dono (design-systems/cfdesigner/assets/sfx), no volume original (0 dB).
# Regras lidas no C01 do dono: whoosh de cartão ~0,1 s ANTES do elemento; clique em cada marca (o último, tick_final);
# whoosh baixinho (fraco) na saída do cartão; som grande no zoom e no logo.
EVENTOS = [
    (2.12, "cartao", 0, "texto 'MUITO MAIS INTERESSANTE' sobe atrás dele"),
    (3.30, "fraco", 0, "corte para a praia (o respiro de 1,6 s fica livre para a música do dono)"),
    (5.92, "fraco", 0, "corte para o mar"),
    (6.20, "cartao", 0, "frase de efeito 'CÂMERA MELHOR'"),
    (8.35, "fraco", 0, "corte para a árvore"),
    (8.90, "cartao", 0, "cartão do checklist entra"),
    (9.30, "tick", 0, "✓ Direção"), (10.00, "tick", 0, "✓ Composição"), (10.90, "tick", 0, "✓ Cor"),
    (11.25, "tick", 0, "✓ Iluminação"), (11.92, "tick_final", 0, "✓ Som (última marca)"),
    (12.62, "fraco", 0, "checklist sai e corte para o parapeito"),
    (12.86, "cartao", 0, "'TRANSFORMAR COMPLETAMENTE' entra"),
    (15.08, "cartao", 0, "corte em que ele aparece + vazamento de luz"),
    (16.76, "cartao", 0, "'SIMPLESMENTE EDITAR' entra"),
    (18.10, "fraco", 0, "palavra riscada sai"),
    (18.90, "grande", 0, "zoom de aproximação + golpe final da música (o crescendo do som termina em ~0,25 s, em cima do golpe)"),
    (20.14, "fraco", 0, "saída: zoom e desfoque"),
    (20.70, "grande", 0, "logo CFDesigner"),
]
# o C01 do dono tem a fala a -16,7 LUFS; o nosso vídeo, a -14,1: sobe os efeitos junto para manter o equilíbrio dele
MASTER_DB = 2.6
DURACAO = 23.317
# a música sobe na intro e no respiro (antes do impacto) e na saída (depois da fala); na fala fica ~11 a 15 dB abaixo da voz
REFORCO_INTRO = 8   # dB, até o impacto
REFORCO_SAIDA = 7   # dB, depois de 20,1 s
REFORCO_GOLPE = 6    # dB, no golpe final da música (a fala está em cima: o sidechain o esconderia)
FADE_FINAL = 2.0     # s: cauda natural do acorde final e depois fade
IMPACTO_VIDEO = 4.76   # o drop da música cai um décimo antes da fala voltar ("Às vezes", 4,86 s)


def le_wav(p):
    w = wave.open(p); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768
    return x.reshape(-1, w.getnchannels()) if w.getnchannels() > 1 else np.stack([x, x], 1)


def onset_kick(x, t_nominal, janela=0.09):
    """Instante (s) do ataque do kick perto de t_nominal: primeiro cruzamento de 50% do pico do grave (suavizado)."""
    i0, i1 = int((t_nominal - janela) * SR), int((t_nominal + janela) * SR)
    seg = x[i0:i1]
    grave = np.convolve(np.abs(seg), np.ones(40) / 40, mode="same")      # ~1,2 kHz: pega só o corpo do kick
    env = np.convolve(grave, np.ones(48) / 48, mode="same")
    k = np.argmax(env > 0.5 * env.max())
    return (i0 + k) / SR


def monta_musica(arquivo, m_ini, batida_a, batida_b, xf=0.03):
    """Música com FINAL REAL: groove da faixa (a partir de m_ini) até a batida_a; dali em diante, o final da faixa a partir da
    batida_b (mesma nota de baixo nas duas, em cima do kick; os dois kicks são alinhados ao milissegundo). Devolve (estéreo, t_emenda_video)."""
    with tempfile.TemporaryDirectory() as tmp:
        wav = os.path.join(tmp, "m.wav")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", arquivo, "-ac", "2", "-ar", str(SR), wav], check=True)
        m = le_wav(wav)
    mono = m.mean(1)
    ta = onset_kick(mono, batida_a); tb = onset_kick(mono, batida_b)
    t_emenda = ta - m_ini                                  # no vídeo
    n = int(DURACAO * SR); out = np.zeros((n, 2))
    # parte A: até o começo do crossfade
    i_a0 = int(m_ini * SR); i_cut = int((ta - xf) * SR)
    a = m[i_a0:i_cut]; out[: len(a)] = a
    # parte B: começa xf antes do kick de B
    i_b0 = int((tb - xf) * SR)
    # ajuste fino de fase (±2 ms): o grave (dó) de A e de B tem que estar em fase na emenda, senão se cancelam no crossfade
    lp = lambda z: np.convolve(z, np.ones(48) / 48, mode="same")
    ref = lp(mono[i_cut - int(0.08 * SR): i_cut])
    melhor, melhor_c = 0, -2
    for d in range(-int(0.002 * SR), int(0.002 * SR) + 1):
        cand = lp(mono[i_b0 + d - int(0.08 * SR): i_b0 + d])
        c = float(ref @ cand / (np.linalg.norm(ref) * np.linalg.norm(cand) + 1e-12))
        if c > melhor_c: melhor, melhor_c = d, c
    i_b0 += melhor
    print(f"ajuste de fase da emenda: {melhor / SR * 1000:+.2f} ms (correlação do grave {melhor_c:.2f})")
    b = m[i_b0: i_b0 + (n - len(a))]
    # crossfade de potência igual nos xf segundos finais de A
    nx = int(xf * SR); t = np.linspace(0, np.pi / 2, nx)
    a_cauda = m[i_cut: i_cut + nx]
    out[len(a): len(a) + nx] = a_cauda * np.cos(t)[:, None] + b[:nx] * np.sin(t)[:, None]
    rest = b[nx:]; out[len(a) + nx: len(a) + nx + len(rest)] = rest[: n - len(a) - nx]
    return out, t_emenda


# ---------------------------------------------------------------- mixagem com música (automação suave, amostra a amostra)
DUCK_DB = 7.0          # redução da música quando há fala
DUCK_ATAQUE = 0.040    # s (a música cede em 40 ms, com 30 ms de antecipação: já está baixa quando a voz começa)
DUCK_SOLTA = 0.380     # s (volta devagar; entre palavras não "bombeia")
ANTECIPA = 0.030


def suave(t, a, b):
    """0 antes de a, 1 depois de b, com curva de cosseno (sem degrau nem quina)."""
    u = np.clip((t - a) / (b - a), 0, 1)
    return 0.5 - 0.5 * np.cos(np.pi * u)


def atividade_voz(v, n):
    """0..1 por amostra: há fala? Janela de 40 ms, antecipação e ataque/solta assimétricos num grid de 200 Hz."""
    mono = v.mean(1); c = np.cumsum(mono ** 2); w = int(0.04 * SR)
    rms = np.sqrt(np.maximum(c[w:] - c[:-w], 0) / w); rms = np.concatenate([np.zeros(w), rms])
    db = 20 * np.log10(rms + 1e-9)
    ativ = suave(db, -46, -36)                                   # 0 em silêncio, 1 com fala
    passo = SR // 200; m = len(ativ) // passo
    g = ativ[: m * passo].reshape(m, passo).max(1)               # pico por bloco de 5 ms
    g = np.concatenate([g[int(ANTECIPA * 200):], np.zeros(int(ANTECIPA * 200))])
    out = np.zeros(m); y = 0.0
    ka = 1 - np.exp(-1 / (DUCK_ATAQUE * 200)); ks = 1 - np.exp(-1 / (DUCK_SOLTA * 200))
    for i in range(m):
        y += (ka if g[i] > y else ks) * (g[i] - y); out[i] = y
    return np.interp(np.arange(n) / SR, np.arange(m) / 200, out)


def ganho_musica(n, v, m_db, golpe):
    t = np.arange(n) / SR
    db = m_db + np.zeros(n)
    db += REFORCO_INTRO * (1 - suave(t, IMPACTO_VIDEO + 0.03, IMPACTO_VIDEO + 0.55))     # intro e respiro mais altos, descem suave depois do impacto
    db += REFORCO_SAIDA * suave(t, 20.1, 20.9)                                           # sobe devagar depois da fala
    if golpe is not None:                                                                # protege o golpe final (a fala está em cima)
        db += REFORCO_GOLPE * suave(t, golpe - 0.12, golpe + 0.03) * (1 - suave(t, golpe + 0.30, golpe + 1.0))
    db -= DUCK_DB * atividade_voz(v, n)
    return 10 ** (db / 20)


def eq_musica(m):
    with tempfile.TemporaryDirectory() as tmp:
        a, b = os.path.join(tmp, "a.wav"), os.path.join(tmp, "b.wav")
        pcm = (np.clip(m, -1, 1) * 32767).astype(np.int16)
        with wave.open(a, "wb") as w:
            w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", a, "-af",
                        "highpass=f=35,equalizer=f=250:t=q:w=1.2:g=-4,equalizer=f=2500:t=q:w=1.0:g=-3", b], check=True)
        return le_wav(b)


def mixa_com_musica(vv, sfx, mus, m_db, golpe, saida, entrada):
    n = len(vv)
    mus = eq_musica(mus[:n])
    t = np.arange(n) / SR
    mus = mus * ganho_musica(n, vv, m_db, golpe)[:, None]
    mus *= (suave(t, 0, 0.8) * (1 - suave(t, DURACAO - FADE_FINAL, DURACAO)))[:, None]       # entrada e saída em cosseno
    mix = vv + sfx + mus
    esc = 0.5 / np.abs(mix).max()                                                         # escala segura só para medir
    with tempfile.TemporaryDirectory() as tmp:
        pre = os.path.join(tmp, "pre.wav")
        pcm = (np.clip(mix * esc, -1, 1) * 32767).astype(np.int16)
        with wave.open(pre, "wb") as w:
            w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
        r = subprocess.run(["ffmpeg", "-nostats", "-i", pre, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True)
        lufs = float([l for l in r.stderr.splitlines() if "I:" in l][-1].split("I:")[1].split("LUFS")[0])
        ganho = -14.0 - lufs                                                              # ganho ESTÁTICO (sem loudnorm dinâmico)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", entrada, "-i", pre, "-map", "0:v", "-map", "1:a", "-c:v", "copy",
                        "-af", f"volume={ganho}dB,alimiter=limit=0.84:attack=5:release=80:level=0",
                        "-ar", "48000", "-c:a", "aac", "-b:a", "192k", "-shortest", saida], check=True)
    print(f"ganho estático {ganho:+.2f} dB; ok: {saida}")



def arg(nome, padrao=None):
    return sys.argv[sys.argv.index(nome) + 1] if nome in sys.argv else padrao


def main():
    skip = {"--kit", "--musica", "--musica-inicio", "--musica-db", "--musica-final", "--voz"}
    a = [x for i, x in enumerate(sys.argv[1:], 1) if not x.startswith("--") and sys.argv[i - 1] not in skip]
    entrada, saida = a[0], a[1]
    raiz = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
    kit_dir = arg("--kit", os.path.join(raiz, "design-systems", "cfdesigner", "assets", "sfx"))
    musica = arg("--musica"); m_ini = float(arg("--musica-inicio", 0)); m_db = float(arg("--musica-db", 0))
    final = arg("--musica-final")   # "batida_a,batida_b": emenda no final real da faixa (veja monta_musica)
    n = int(DURACAO * SR); sfx = np.zeros((n, 2))
    for t, nome, db, _ in EVENTOS:
        s = K.KIT[nome]() if "--sintetico" in sys.argv else le_wav(os.path.join(kit_dir, nome + ".wav"))
        i = int(t * SR); j = min(n, i + len(s))
        sfx[i:j] += s[: j - i] * 10 ** ((db + MASTER_DB) / 20)

    def grava(path, x):
        pcm = (np.clip(x, -1, 1) * 32767).astype(np.int16)
        with wave.open(path, "wb") as w:
            w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())

    with tempfile.TemporaryDirectory() as tmp:
        voz, fx, mus, mix = (os.path.join(tmp, f) for f in ("voz.wav", "sfx.wav", "mus.wav", "mix.wav"))
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", entrada, "-vn", "-ac", "2", "-ar", str(SR), voz], check=True)
        if arg("--voz"):                               # voz já corrigida (ex.: trocar_trecho_voz.py)
            voz = arg("--voz")
        v = le_wav(voz); vv = np.zeros((n, 2)); vv[: min(n, len(v))] = v[:n]
        voz_tmp = os.path.join(tmp, "voz_tmp.wav"); grava(voz_tmp, vv); grava(fx, sfx)
        golpe = None
        if musica:
            if final:
                ba, bb = (float(v) for v in final.split(","))
                arr, t_emenda = monta_musica(musica, m_ini, ba, bb)
                golpe = t_emenda + 0.6
                print(f"emenda no vídeo: {t_emenda:.3f} s; golpe final da música: {golpe:.3f} s")
            else:
                with tempfile.TemporaryDirectory() as t2:
                    wv = os.path.join(t2, "m.wav")
                    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(m_ini), "-t", str(DURACAO), "-i", musica, "-ac", "2", "-ar", str(SR), wv], check=True)
                    arr = le_wav(wv)
            full = np.zeros((n, 2)); full[: min(n, len(arr))] = arr[:n]
            mixa_com_musica(vv, sfx, full, m_db, golpe, saida, entrada)
            return
        grava(mix, np.clip(vv + sfx, -1, 1))
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", entrada, "-i", mix, "-map", "0:v", "-map", "1:a", "-c:v", "copy",
                        "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-ar", "48000", "-c:a", "aac", "-b:a", "192k", "-shortest", saida], check=True)
    print("ok:", saida)


if __name__ == "__main__":
    main()
