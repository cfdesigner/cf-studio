#!/usr/bin/env python3
"""Converte ilustração sobre fundo PRETO PURO em PNG com fundo transparente (para os elementos `imagem`).

Uso: python3 scripts/preto-para-alpha.py <entrada.png> [saida.png]
     python3 scripts/preto-para-alpha.py <pasta-de-entrada> <pasta-de-saida>

Alpha = canal mais claro de cada pixel (preto vira transparente, ouro fica opaco); a cor é recuperada
dividindo pelo alpha. Serve para ilustrações geradas em ouro sobre preto (Nano Banana etc.). Não use em
imagens com fundo claro ou colorido.
"""
import os
import sys

import numpy as np
from PIL import Image


def converte(src, dst):
    im = np.asarray(Image.open(src).convert("RGB")).astype(float) / 255
    a = np.clip((im.max(axis=2) - 0.03) / 0.97, 0, 1)  # 0,03 tira o ruído do preto
    rgb = np.clip(np.where(a[..., None] > 0, im / np.maximum(a[..., None], 1e-6), 0), 0, 1)
    Image.fromarray((np.dstack([rgb, a]) * 255).astype("uint8"), "RGBA").save(dst, optimize=True)


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = sys.argv[1]
    dst = sys.argv[2] if len(sys.argv) > 2 else None
    if os.path.isdir(src):
        dst = dst or src
        os.makedirs(dst, exist_ok=True)
        for n in sorted(os.listdir(src)):
            if n.lower().endswith(".png"):
                converte(os.path.join(src, n), os.path.join(dst, n))
                print(n)
    else:
        converte(src, dst or os.path.splitext(src)[0] + "-alpha.png")


if __name__ == "__main__":
    main()
