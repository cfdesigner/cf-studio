#!/usr/bin/env python3
"""Recorta a pessoa de UMA FOTO com borda de qualidade (grátis, só CPU, sem API).

Receita (mais fina que a do vídeo): modelo BiRefNet (retrato) para a máscara macia, trimap com faixa larga
nos fios de cabelo, matting de forma fechada (PyMatting) só na faixa incerta, e estimativa da cor do primeiro
plano para tirar o "halo" do fundo antigo (parede clara, piso colorido). Sai PNG com transparência, cortado
rente à pessoa.

Uso (Python do venv do recorte):
  /opt/recorte-venv/bin/python scripts/recortar-foto.py <foto> <saida.png> [--altura 1500] [--faixa 28]
                                                         [--modelo birefnet-portrait] [--fundo-claro]
"""
import argparse

import cv2
import numpy as np
from PIL import Image
from pymatting import estimate_alpha_cf, estimate_foreground_ml
from rembg import new_session, remove


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("foto")
    ap.add_argument("saida")
    ap.add_argument("--altura", type=int, default=1500, help="altura de trabalho em px (maior = mais fino e mais lento)")
    ap.add_argument("--faixa", type=int, default=28, help="largura da faixa incerta no contorno (px na altura de trabalho)")
    ap.add_argument("--modelo", default="birefnet-portrait")
    ap.add_argument("--manter-tela", action="store_true", help="não corta rente à pessoa: o PNG sai com o mesmo enquadramento da foto (para sobrepor alinhado)")
    ap.add_argument("--fundo-claro", action="store_true", help="fundo branco/cinza claro: tira também o miolo claro entre os cachos")
    a = ap.parse_args()

    im = Image.open(a.foto).convert("RGB")
    if im.height != a.altura:
        im = im.resize((round(im.width * a.altura / im.height), a.altura), Image.LANCZOS)
    rgb = np.asarray(im).astype(np.float64) / 255

    sessao = new_session(a.modelo)
    m = np.asarray(remove(im, session=sessao, only_mask=True).convert("L"), dtype=np.float32) / 255

    # fica só com o maior bloco (tira pessoas e objetos soltos no fundo)
    b = (m > 0.5).astype(np.uint8)
    n, lab, st, _ = cv2.connectedComponentsWithStats(b, 8)
    if n > 1:
        b = (lab == 1 + np.argmax(st[1:, 4])).astype(np.uint8)
    # buracos internos viram pessoa (camiseta branca parecida com a parede)
    pad = cv2.copyMakeBorder(b * 255, 1, 1, 1, 1, cv2.BORDER_CONSTANT, value=0)
    ff = pad.copy()
    h, w = ff.shape
    cv2.floodFill(ff, np.zeros((h + 2, w + 2), np.uint8), (0, 0), 255)
    b = (b > 0) | (cv2.bitwise_not(ff)[1:-1, 1:-1] > 0)
    b = b.astype(np.uint8)

    k = a.faixa
    ker = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k))
    certo_fg = cv2.erode(b, ker)
    certo_bg = 1 - cv2.dilate(b, ker)
    trimap = np.full(b.shape, 0.5)
    trimap[certo_fg > 0] = 1.0
    trimap[certo_bg > 0] = 0.0

    alfa = estimate_alpha_cf(rgb, trimap)
    alfa = np.clip(alfa, 0, 1)
    # tira o fundo claro que sobrou entre os cachos
    if a.fundo_claro:
        lum = rgb.mean(axis=2)
        sat = rgb.max(axis=2) - rgb.min(axis=2)
        parede = np.clip((lum - 0.62) / 0.2, 0, 1) * np.clip((0.12 - sat) / 0.06, 0, 1)
        parede[certo_fg > 0] = 0
        alfa = alfa * (1 - parede)
    frente = estimate_foreground_ml(rgb, alfa)

    out = np.dstack([np.clip(frente, 0, 1), alfa])
    out = (out * 255).astype(np.uint8)
    img = Image.fromarray(out, "RGBA")
    if not a.manter_tela:
        img = img.crop(img.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox())
    img.save(a.saida)
    print(a.saida, img.size)


if __name__ == "__main__":
    main()
