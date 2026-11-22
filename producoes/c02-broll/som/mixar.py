#!/usr/bin/env python3
"""Mixa os efeitos sonoros do C02 sobre a voz e grava um MP4 (vídeo copiado, sem recompressão).

Uso: python3 producoes/c02-broll/som/mixar.py <video-in.mp4> <video-out.mp4> [--kit <pasta com WAVs do dono>]
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


def le_wav(p):
    w = wave.open(p); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768
    return x.reshape(-1, w.getnchannels()) if w.getnchannels() > 1 else np.stack([x, x], 1)


def main():
    a = [x for i, x in enumerate(sys.argv[1:], 1) if not x.startswith("--") and sys.argv[i - 1] != "--kit"]
    entrada, saida = a[0], a[1]
    raiz = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
    kit_dir = sys.argv[sys.argv.index("--kit") + 1] if "--kit" in sys.argv else os.path.join(raiz, "design-systems", "cfdesigner", "assets", "sfx")
    n = int(DURACAO * SR); sfx = np.zeros((n, 2))
    for t, nome, db, _ in EVENTOS:
        s = K.KIT[nome]() if "--sintetico" in sys.argv else le_wav(os.path.join(kit_dir, nome + ".wav"))
        i = int(t * SR); j = min(n, i + len(s))
        sfx[i:j] += s[: j - i] * 10 ** ((db + MASTER_DB) / 20)
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
