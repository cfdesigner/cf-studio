#!/usr/bin/env python3
"""Mixa o som do episódio 04 "Mesma cena" e grava o MP4 final (vídeo copiado, sem recompressão).

Uso: python3 producoes/ep04-mesma-cena/mixar.py <video-sem-audio.mp4> <saida.mp4>
Usa: public/entrada/ep04/narracao.wav (voz do dono), public/entrada/ep04/musica.mp3 (Suno) e os efeitos de design-systems/cfdesigner/assets/sfx.
- A voz tem a pausa depois de "e por fim o som" ALARGADA em 1,4 s (corte dentro da pausa) para os efeitos aparecerem sozinhos.
- A música entra deslocada: o primeiro kick dela (21,9 s do arquivo) cai em 9,2 s do vídeo (clarão da cor). Volume por curva (abaixa na etapa do som e sob a fala).
- Tudo termina em −14 LUFS (loudnorm), AAC 256k.
"""
import os, subprocess, sys, tempfile, wave
import numpy as np

SR = 44100
RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
ENT = os.path.join(RAIZ, "public", "entrada", "ep04")
SFX = os.path.join(RAIZ, "design-systems", "cfdesigner", "assets", "sfx")
DURACAO = 21.4
KICK_ARQUIVO = 21.9      # primeiro kick da música, em s do arquivo
KICK_VIDEO = 9.2         # onde ele deve cair no vídeo
CORTE_VOZ, PAUSA_EXTRA = 13.60, 1.4   # dentro da pausa depois de "som"


def ff(*args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)


def le(path):
    w = wave.open(path); n = w.getnchannels(); sr = w.getframerate()
    x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768
    x = x.reshape(-1, n) if n > 1 else np.stack([x, x], 1)
    return x, sr


def carrega(path):
    """Qualquer áudio -> estéreo 44,1 kHz (float)."""
    with tempfile.TemporaryDirectory() as d:
        t = os.path.join(d, "x.wav")
        ff("-i", path, "-ac", "2", "-ar", str(SR), t)
        return le(t)[0]


def pos(sinal, t, ini, ganho_db=0.0):
    i = int(t * SR); g = 10 ** (ganho_db / 20)
    n = min(len(sinal) - i, len(ini))
    if n > 0 and i >= 0:
        sinal[i:i + n] += ini[:n] * g


def curva(pontos, n):
    """Ganho em dB por amostra, interpolando linearmente entre (tempo s, dB)."""
    t = np.arange(n) / SR
    xs, ys = zip(*pontos)
    return np.interp(t, xs, ys)


def main(video, saida):
    total = int(DURACAO * SR)
    # --- voz: normalizada a −16 LUFS, pausa alargada
    with tempfile.TemporaryDirectory() as d:
        voz_n = os.path.join(d, "voz.wav")
        ff("-i", os.path.join(ENT, "narracao.wav"), "-ac", "2", "-ar", str(SR),
           "-af", "highpass=f=70,loudnorm=I=-16:TP=-3:LRA=7", voz_n)
        voz, _ = le(voz_n)
    i = int(CORTE_VOZ * SR)
    voz = np.concatenate([voz[:i], np.zeros((int(PAUSA_EXTRA * SR), 2)), voz[i:]])
    mix_voz = np.zeros((total, 2)); mix_voz[:min(total, len(voz))] = voz[:total]

    # --- música: deslocada para o kick cair em 9,2 s; curva de volume
    mus = carrega(os.path.join(ENT, "musica.mp3"))
    ini = int((KICK_ARQUIVO - KICK_VIDEO) * SR)
    trecho = mus[ini:ini + total]
    if len(trecho) < total:
        trecho = np.pad(trecho, ((0, total - len(trecho)), (0, 0)))
    curva_db = curva([
        (0.0, -40), (0.7, 6), (8.9, 6),          # intro: o pad suave, levantado para ser ouvido
        (9.1, -1), (9.5, -3.5), (12.0, -4),      # kick no clarão, depois groove sob a voz ("depois, a cor")
        (12.3, -11), (16.2, -11),                # etapa do som: música recua para os efeitos aparecerem
        (16.5, -6.5), (18.2, -6.5),              # "Mesma cena, qual mudou mais?"
        (18.9, -2.5), (19.5, -2.5), (21.3, -40),  # sobe um pouco e some com o logo
    ], total)
    mus_mix = trecho * (10 ** (curva_db / 20))[:, None]

    # --- efeitos (tempo = início do som; sons do dono, nível original + MASTER)
    MASTER = 2.0
    ef = np.zeros((total, 2))
    EVENTOS = [
        (0.00, "grande", -4), (0.00, "cartao", 0),              # gancho
        (2.45, "fraco", 0),                                      # vai para o bruto
        (5.45, "fraco", 0), (5.55, "icone", -3),                # ritmo: etiqueta
        (6.65, "fraco", 0), (7.85, "fraco", 0),                 # cortes na batida
        (9.05, "grande", -2), (9.25, "icone", -3),              # cor: clarão e etiqueta
        (10.25, "fraco", -3), (11.45, "fraco", -3),
        (12.00, "cartao", 0),                                    # caixinha de som entra
        (12.90, "tick", 0), (14.10, "tick", 0), (15.20, "tick_final", 0),
        (13.15, "fraco", 0), (14.35, "fraco", 0), (15.55, "fraco", 0),   # whooshes que acabam nos cortes
        (14.75, "grande", 0),                                    # braços no alto: impacto
        (16.30, "cartao", -2),                                   # texto final
        (19.35, "grande", -4), (20.90, "fraco", -3),            # fecho
    ]
    for t, nome, db in EVENTOS:
        s = carrega(os.path.join(SFX, nome + ".wav"))
        pos(ef, t, s, db + MASTER)

    final = mix_voz + mus_mix + ef
    pico = np.abs(final).max()
    if pico > 0.98:
        final *= 0.98 / pico
    with tempfile.TemporaryDirectory() as d:
        bruto = os.path.join(d, "mix.wav")
        w = wave.open(bruto, "wb"); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(final, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
        # loudnorm em dois passos (preciso em peças curtas): mede e depois aplica
        r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", bruto, "-af",
                            "loudnorm=I=-14:TP=-1.5:LRA=9:print_format=json", "-f", "null", "-"],
                           capture_output=True, text=True)
        import json as _j
        m = _j.loads(r.stderr[r.stderr.rindex("{"):r.stderr.rindex("}") + 1])
        filtro = (f"loudnorm=I=-14:TP=-1.5:LRA=9:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
                  f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true")
        ff("-i", video, "-i", bruto, "-map", "0:v", "-map", "1:a", "-c:v", "copy",
           "-af", filtro, "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-shortest", saida)
    print("ok ->", saida)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
