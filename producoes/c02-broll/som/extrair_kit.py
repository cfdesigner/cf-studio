#!/usr/bin/env python3
"""Corta, do stem só de efeitos do dono (C01_SFX), um arquivo WAV por som, no volume original (sem normalizar).

Uso: python3 producoes/c02-broll/som/extrair_kit.py <stem.wav 48k estéreo> <pasta-saida>
Cada som aparece várias vezes no stem (o mesmo arquivo em volumes diferentes); usa-se a ocorrência mais alta (melhor sinal).
O nome e o tempo de cada som foram lidos cruzando o stem com os quadros do C01 (veja SOM.md).
"""
import os, sys, wave
import numpy as np

SR = 48000
# nome -> tempo (s) do início da ocorrência escolhida no stem do C01
SONS = {
    "suave":        0.03,    # abertura, bem baixo
    "icone":        1.26,    # ícone entra (ASSISTIU)
    "grande":       26.32,   # som grande de 0,5 s (logo; também no zoom em 2,72 s)
    "cartao":       3.50,    # whoosh curto de cartão/texto entrando (0,1 s antes do cartão aparecer)
    "tick":         5.41,    # clique de marca
    "tick_final":   6.01,    # clique da ÚLTIMA marca do cartão
    "fraco":        29.61,   # whoosh baixinho: saída de cartão e fade do logo
    "timeline_in":  10.98,
    "timeline_out": 13.06,
    "relogio":      25.25,   # 12 tiques do cronômetro (25,27 a 26,23 s)
}


def main():
    stem, out = sys.argv[1], sys.argv[2]
    w = wave.open(stem); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).reshape(-1, 2)
    os.makedirs(out, exist_ok=True)
    m = np.abs(x.astype(np.float64) / 32768).max(1)
    h = int(0.005 * SR)
    env = np.array([m[i:i + h].max() for i in range(0, len(m) - h, h)])  # pico a cada 5 ms
    for nome, t in SONS.items():
        i = int((t - 0.02) * SR); k = int(t * 200)
        # fim: primeiro trecho de 80 ms de silêncio quase digital (< -85 dB) depois do começo
        j = k
        while j < len(env) - 16 and not (env[j:j + 16] < 10 ** (-85 / 20)).all(): j += 1
        if nome == "relogio": j = int(26.26 * 200)
        fim = min(len(x), int(j * h) + int(0.03 * SR))
        seg = x[i:fim].copy()
        pico = np.abs(seg).max() / 32768
        with wave.open(os.path.join(out, nome + ".wav"), "wb") as o:
            o.setnchannels(2); o.setsampwidth(2); o.setframerate(SR); o.writeframes(seg.tobytes())
        print(f"{nome:13s} {len(seg) / SR:5.2f}s  pico {20 * np.log10(pico):6.1f} dB")


if __name__ == "__main__":
    main()
