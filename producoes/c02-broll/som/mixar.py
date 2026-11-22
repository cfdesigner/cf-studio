#!/usr/bin/env python3
"""Mixa os efeitos sonoros do C02 sobre a voz e grava um MP4 (vídeo copiado, sem recompressão).

Uso: python3 producoes/c02-broll/som/mixar.py <video-in.mp4> <video-out.mp4> [--kit <pasta com WAVs do dono>]
Sem --kit usa o kit sintetizado (kit.py). Com --kit, cada nome do mapa (tick, whoosh, hit...) é lido de <kit>/<nome>.wav.
Tempo de cada evento = INÍCIO do som (o pico do whoosh cai perto do fim dele, por isso começa antes do corte).
"""
import os, subprocess, sys, tempfile, wave
import numpy as np
sys.path.insert(0, os.path.dirname(__file__))
import kit as K

SR = K.SR
# (tempo s, som, ganho dB, o que é)
EVENTOS = [
    (2.20, "whoosh_card", -6, "texto 'MUITO MAIS' sobe atrás dele"),
    (2.52, "hit", -12, "'INTERESSANTE' entra (impacto leve)"),
    (3.36, "whoosh", -8, "corte para a praia (o respiro de 1,6 s fica livre para a música do dono)"),
    (6.00, "whoosh", -9, "corte para o mar"),
    (6.36, "hit", -5, "frase de efeito 'CÂMERA MELHOR'"),
    (8.40, "whoosh", -9, "corte para a árvore"),
    (8.85, "whoosh_card", -8, "cartão do checklist entra"),
    (9.30, "tick", -6, "✓ Direção"), (10.00, "tick", -6, "✓ Composição"), (10.90, "tick", -6, "✓ Cor"),
    (11.25, "tick", -6, "✓ Iluminação"), (11.92, "tick", -6, "✓ Som"),
    (12.55, "whoosh", -8, "corte para o parapeito"),
    (13.02, "hit", -11, "'TRANSFORMAR COMPLETAMENTE' emerge de trás da árvore"),
    (15.12, "whoosh", -8, "corte em que ele aparece"),
    (15.20, "shimmer", -10, "vazamento de luz âmbar"),
    (15.36, "hit", -9, "'E é justamente aí'"),
    (16.84, "whoosh_card", -10, "'SIMPLESMENTE' entra"),
    (17.58, "zip", -8, "risco em 'EDITAR'"),
    (18.78, "whoosh_zoom", -7, "zoom de aproximação"),
    (19.34, "hit", -4, "'EXPERIÊNCIA VISUAL'"),
    (20.05, "reverso", -9, "saída: zoom e desfoque"),
    (20.95, "ding", -10, "logo CFDesigner"),
]
DURACAO = 23.317


def le_wav(p):
    w = wave.open(p); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768
    return x.reshape(-1, w.getnchannels()) if w.getnchannels() > 1 else np.stack([x, x], 1)


def main():
    a = [x for x in sys.argv[1:] if not x.startswith("--")]
    entrada, saida = a[0], a[1]
    kit_dir = sys.argv[sys.argv.index("--kit") + 1] if "--kit" in sys.argv else None
    n = int(DURACAO * SR); sfx = np.zeros((n, 2))
    for t, nome, db, _ in EVENTOS:
        s = le_wav(os.path.join(kit_dir, nome + ".wav")) if kit_dir else K.KIT[nome]()
        i = int(t * SR); j = min(n, i + len(s))
        sfx[i:j] += s[: j - i] * 10 ** (db / 20)
    with tempfile.TemporaryDirectory() as tmp:
        voz = os.path.join(tmp, "voz.wav"); mix = os.path.join(tmp, "mix.wav")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", entrada, "-vn", "-ac", "2", "-ar", str(SR), voz], check=True)
        v = le_wav(voz); m = np.zeros((n, 2)); m[: min(n, len(v))] = v[:n]
        m += sfx
        pcm = (np.clip(m, -1, 1) * 32767).astype(np.int16)
        with wave.open(mix, "wb") as w:
            w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", entrada, "-i", mix, "-map", "0:v", "-map", "1:a", "-c:v", "copy",
                        "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-ar", "48000", "-c:a", "aac", "-b:a", "192k", "-shortest", saida], check=True)
    print("ok:", saida)


if __name__ == "__main__":
    main()
