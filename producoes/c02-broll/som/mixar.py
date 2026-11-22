#!/usr/bin/env python3
"""Mixa os efeitos sonoros do C02 sobre a voz e grava um MP4 (vídeo copiado, sem recompressão).

Uso: python3 producoes/c02-broll/som/mixar.py <video-in.mp4> <video-out.mp4> [--kit <pasta com WAVs do dono>]
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
    (18.70, "grande", 0, "zoom de aproximação: 'EXPERIÊNCIA VISUAL'"),
    (20.14, "fraco", 0, "saída: zoom e desfoque"),
    (20.70, "grande", 0, "logo CFDesigner"),
    (22.95, "fraco", 0, "logo sai"),
]
# o C01 do dono tem a fala a -16,7 LUFS; o nosso vídeo, a -14,1: sobe os efeitos junto para manter o equilíbrio dele
MASTER_DB = 2.6
DURACAO = 23.317
# a música sobe na intro e no respiro (antes do impacto) e na saída (depois da fala); na fala fica ~11 a 15 dB abaixo da voz
REFORCO_INTRO = 8   # dB, até o impacto
REFORCO_SAIDA = 7   # dB, depois de 20,1 s
IMPACTO_VIDEO = 4.76   # o drop da música cai um décimo antes da fala voltar ("Às vezes", 4,86 s)


def le_wav(p):
    w = wave.open(p); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768
    return x.reshape(-1, w.getnchannels()) if w.getnchannels() > 1 else np.stack([x, x], 1)


def arg(nome, padrao=None):
    return sys.argv[sys.argv.index(nome) + 1] if nome in sys.argv else padrao


def main():
    skip = {"--kit", "--musica", "--musica-inicio", "--musica-db"}
    a = [x for i, x in enumerate(sys.argv[1:], 1) if not x.startswith("--") and sys.argv[i - 1] not in skip]
    entrada, saida = a[0], a[1]
    raiz = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
    kit_dir = arg("--kit", os.path.join(raiz, "design-systems", "cfdesigner", "assets", "sfx"))
    musica = arg("--musica"); m_ini = float(arg("--musica-inicio", 0)); m_db = float(arg("--musica-db", 0))
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
        v = le_wav(voz); vv = np.zeros((n, 2)); vv[: min(n, len(v))] = v[:n]
        grava(voz, vv); grava(fx, sfx)
        if musica:
            # corta o trecho da música; fade de entrada e fade de saída com a cauda terminando no fim do vídeo
            filtro_m = (f"[0:a]atrim=start={m_ini}:duration={DURACAO},asetpts=PTS-STARTPTS,"
                        f"afade=t=in:st=0:d=0.5,afade=t=out:st={DURACAO - 1.6}:d=1.6,"
                        f"highpass=f=35,equalizer=f=250:t=q:w=1.2:g=-4,equalizer=f=2500:t=q:w=1.0:g=-3,"
                        f"volume='pow(10,({m_db}+{REFORCO_INTRO}*clip(({IMPACTO_VIDEO + 0.14}-t)/0.15,0,1)+{REFORCO_SAIDA}*clip((t-20.1)/0.4,0,1))/20)':eval=frame[m];"
                        f"[1:a]asplit[v1][v2];"
                        f"[m][v2]sidechaincompress=threshold=0.06:ratio=3:attack=30:release=400:makeup=1[md];"
                        f"[v1][2:a][md]amix=inputs=3:normalize=0:duration=first[o]")
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", musica, "-i", voz, "-i", fx, "-filter_complex", filtro_m,
                            "-map", "[o]", "-ar", str(SR), "-ac", "2", mix], check=True)
        else:
            grava(mix, np.clip(vv + sfx, -1, 1))
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", entrada, "-i", mix, "-map", "0:v", "-map", "1:a", "-c:v", "copy",
                        "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-ar", "48000", "-c:a", "aac", "-b:a", "192k", "-shortest", saida], check=True)
    print("ok:", saida)


if __name__ == "__main__":
    main()
