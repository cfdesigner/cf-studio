#!/usr/bin/env python3
"""Recorta a pessoa do fundo de um trecho de vídeo (grátis, só CPU, sem API).

Gera uma sequência de PNGs com transparência (001.png, 002.png, ...) em 30 fps, para o Remotion
colocar texto ou gráficos ATRÁS da pessoa. Veja tecnicas/recorte-pessoa/README.md.

Uso (com o Python do venv do recorte):
  /opt/recorte-venv/bin/python scripts/recortar-pessoa.py <video> <pasta-saida> [--inicio 0] [--duracao 3.6]

Preparar o venv uma vez (~2 min, baixa os modelos na primeira execução):
  python3 -m venv /opt/recorte-venv && /opt/recorte-venv/bin/pip install -r scripts/requirements-recorte.txt

Receita (a que o dono aprovou no C02): mistura dois modelos (u2net_human_seg + isnet-general-use),
suaviza no tempo (média ponderada de 3 quadros), firma a borda, recua 1 px e desfoca a borda (~2,6 px).
"""
import argparse
import os
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image, ImageFilter
from rembg import new_session, remove


def mascara(sessao, caminho):
    im = Image.open(caminho).convert("RGB")
    m = remove(im, session=sessao, post_process_mask=True, only_mask=True)
    return np.asarray(m.convert("L"), dtype=np.float32) / 255


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("saida")
    ap.add_argument("--inicio", type=float, default=0.0, help="segundo inicial do trecho")
    ap.add_argument("--duracao", type=float, required=True, help="duração do trecho, em segundos")
    ap.add_argument("--fps", type=int, default=30)
    ap.add_argument("--borda", type=float, default=2.6, help="desfoque da borda em px (0 = borda seca)")
    a = ap.parse_args()

    os.makedirs(a.saida, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(
            ["ffmpeg", "-v", "error", "-y", "-ss", str(a.inicio), "-t", str(a.duracao), "-i", a.video,
             "-vf", f"fps={a.fps}", os.path.join(tmp, "%03d.png")],
            check=True,
        )
        quadros = sorted(f for f in os.listdir(tmp) if f.endswith(".png"))
        n = len(quadros)
        print(f"{n} quadros", file=sys.stderr)
        s1 = new_session("u2net_human_seg")
        s2 = new_session("isnet-general-use")
        M = []
        for i, q in enumerate(quadros):
            p = os.path.join(tmp, q)
            M.append((mascara(s1, p) + mascara(s2, p)) / 2)
            print(f"\rmáscara {i + 1}/{n}", end="", file=sys.stderr)
        print(file=sys.stderr)
        for i, q in enumerate(quadros):
            m = (M[max(i - 1, 0)] + 2 * M[i] + M[min(i + 1, n - 1)]) / 4
            m = np.clip((m - 0.45) / 0.35, 0, 1)
            alfa = Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3))
            if a.borda > 0:
                alfa = alfa.filter(ImageFilter.GaussianBlur(a.borda))
            rgb = Image.open(os.path.join(tmp, q)).convert("RGB")
            rgb.putalpha(alfa)
            rgb.save(os.path.join(a.saida, q), compress_level=1)
    print(f"pronto: {n} PNGs em {a.saida}", file=sys.stderr)


if __name__ == "__main__":
    main()
