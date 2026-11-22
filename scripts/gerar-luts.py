#!/usr/bin/env python3
"""Gera LUTs 3D (.cube) cinematográficas, só com numpy. Uso: python3 scripts/gerar-luts.py <pasta-saida> [tamanho=33]

Cada look é uma receita: curva S de contraste, saturação, nível de preto/branco (fade), gama e dois tons (sombra e luz).
Aplicar: ffmpeg -i in.mp4 -vf "lut3d=file=<look>.cube:interp=tetrahedral" ...
"""
import os, sys
import numpy as np

LOOKS = {
    # nome: dict(contraste, saturacao, preto, branco, gama, sombra(rgb), luz(rgb), forca_sombra, forca_luz)
    "ambar-cinema": dict(contraste=0.24, saturacao=0.92, preto=0.022, branco=0.985, gama=1.00,
                         sombra=(0.78, 1.00, 1.22), luz=(1.16, 1.02, 0.78), fs=0.70, fl=0.75),
    "noir-premium": dict(contraste=0.40, saturacao=0.38, preto=0.004, branco=0.99, gama=1.10,
                         sombra=(0.86, 0.98, 1.16), luz=(1.10, 1.02, 0.88), fs=0.55, fl=0.40),
    "dourado-suave": dict(contraste=0.08, saturacao=1.06, preto=0.050, branco=0.965, gama=0.94,
                          sombra=(1.08, 0.97, 1.06), luz=(1.12, 1.04, 0.86), fs=0.40, fl=0.70),
}


def sigmoide(x, k):
    s = 1 / (1 + np.exp(-k * (x - 0.5)))
    lo, hi = 1 / (1 + np.exp(k * 0.5)), 1 / (1 + np.exp(-k * 0.5))
    return (s - lo) / (hi - lo)


def aplica(rgb, p):
    x = np.clip(rgb, 0, 1)
    x = x ** p["gama"]
    k = 1e-3 + p["contraste"] * 9            # força da curva S
    x = (1 - min(p["contraste"] * 2.2, 0.9)) * x + min(p["contraste"] * 2.2, 0.9) * sigmoide(x, k + 3)
    luma = (x * np.array([0.2126, 0.7152, 0.0722])).sum(-1, keepdims=True)
    x = luma + (x - luma) * p["saturacao"]
    ws = (1 - luma) ** 2; wl = luma ** 2      # peso de sombra e de luz
    ts = np.array(p["sombra"]); tl = np.array(p["luz"])
    x = x * (1 + p["fs"] * ws * (ts / ts.mean() - 1)) * (1 + p["fl"] * wl * (tl / tl.mean() - 1))
    x = p["preto"] + x * (p["branco"] - p["preto"])   # preto levantado e branco suave (fade)
    return np.clip(x, 0, 1)


def grava(path, p, n):
    g = np.linspace(0, 1, n)
    # .cube: o vermelho varia mais rápido, depois o verde, depois o azul
    b, gg, r = np.meshgrid(g, g, g, indexing="ij")
    rgb = np.stack([r, gg, b], -1).reshape(-1, 3)
    out = aplica(rgb, p)
    with open(path, "w") as f:
        f.write(f'TITLE "{os.path.basename(path)[:-5]}"\nLUT_3D_SIZE {n}\nDOMAIN_MIN 0 0 0\nDOMAIN_MAX 1 1 1\n')
        for r_, g_, b_ in out: f.write(f"{r_:.6f} {g_:.6f} {b_:.6f}\n")


if __name__ == "__main__":
    pasta = sys.argv[1]; n = int(sys.argv[2]) if len(sys.argv) > 2 else 33
    os.makedirs(pasta, exist_ok=True)
    for nome, p in LOOKS.items():
        grava(os.path.join(pasta, nome + ".cube"), p, n); print(nome)
