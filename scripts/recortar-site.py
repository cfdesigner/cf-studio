#!/usr/bin/env python3
"""Recorta personagens, instrumentos e grafismos dos prints do site do Arrasta Ilha (material do próprio grupo).
Pessoas e instrumentos: rembg (isnet-general-use). Grafismos chapados sobre papel claro: chave de cor suave.
Uso: /opt/recorte-venv/bin/python scripts/recortar-site.py"""
import cv2
import numpy as np
from PIL import Image
from rembg import new_session, remove

ENT = "clientes/arrata-ilha/entrada/"
SAI = "design-systems/arrasta-ilha/assets/recortes/"

# (nome, arquivo, caixa x0,y0,x1,y1, modo)
ITENS = [
    ("mulher-cabaca", "site-2.webp", (0, 400, 515, 1065), "cor"),
    ("mulher-bandeira", "site-2.webp", (1050, 170, 1470, 1060), "ia"),
    ("tocadores-caixa", "site-4.webp", (10, 500, 545, 1050), "ia"),
    ("tocador-agogo", "site-4.webp", (1050, 225, 1510, 1035), "ia"),
    ("tambores", "site-6-percussao.webp", (0, 395, 515, 960), "ia"),
    ("menino-caixa", "site-6-percussao.webp", (1190, 340, 1430, 955), "ia"),
    ("sol-respingo", "site-6-percussao.webp", (1555, 400, 1775, 615), "cor-solta"),
    ("folha-larga", "site-6-percussao.webp", (1745, 555, 1905, 935), "marrom"),
    ("pontos-claros", "site-6-percussao.webp", (1770, 395, 1915, 545), "cor"),
    ("semicirculo-curvas", "site-6-percussao.webp", (1405, 775, 1730, 960), "cor"),
    ("folha-toadas", "site-4.webp", (1485, 402, 1920, 705), "cor"),
    ("pontos-laranja", "site-4.webp", (1740, 855, 1915, 1045), "cor"),
    ("arcos-azuis", "site-4.webp", (1375, 815, 1725, 1048), "azul"),
    ("folha-fundamentos", "site-2.webp", (1580, 640, 1900, 1070), "marrom"),
    ("tracejado-laranja", "site-2.webp", (1470, 860, 1710, 1068), "laranja"),
    ("pontos-danca", "site-5.webp", (1445, 402, 1585, 540), "cor-solta"),
    ("folha-danca", "site-5.webp", (1605, 625, 1905, 1005), "marrom"),
]


def chave_cor(im):
    a = np.asarray(im.convert("RGB")).astype(np.float32)
    d = np.abs(a - 247).max(axis=2)
    alfa = np.clip((d - 16) / 44, 0, 1)
    out = np.dstack([a, alfa * 255]).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def filtro(im, modo):
    a = np.asarray(im.convert("RGB")).astype(np.int32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    if modo == "marrom":  # folhas marrons: escuras e avermelhadas
        k = ((r > b + 8) & (r + g + b < 420)).astype(np.float32)
    elif modo == "azul":  # arcos azul-claro
        k = ((b > r + 18) & (b > 150)).astype(np.float32)
    else:  # laranja
        k = ((r > 190) & (r > g + 40) & (g > b)).astype(np.float32)
    k = cv2.GaussianBlur(k, (0, 0), 0.6)
    out = np.dstack([a, k * 255]).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def limpar(out, rel=0.01, sem_borda=False):
    """Tira ilhas pequenas (restos de vizinhos) e, se pedido, tudo o que encosta na borda do recorte."""
    al = np.asarray(out.getchannel("A"))
    n, lab, st, _ = cv2.connectedComponentsWithStats((al > 24).astype(np.uint8), connectivity=8)
    if n <= 1:
        return out
    maior = st[1:, cv2.CC_STAT_AREA].max()
    h, w = al.shape
    manter = np.zeros_like(al, dtype=bool)
    for c in range(1, n):
        x, y, cw, ch, area = st[c]
        if area < rel * maior:
            continue
        if sem_borda and (x == 0 or y == 0 or x + cw >= w or y + ch >= h):
            continue
        manter |= lab == c
    arr = np.asarray(out).copy()
    arr[..., 3] = np.where(manter, arr[..., 3], 0)
    return Image.fromarray(arr, "RGBA")


REL = {"arcos-azuis": 0.1, "folha-toadas": 0.05}  # limite de ilhas por item


def main():
    sessao = new_session("isnet-general-use")
    sessao_h = new_session("u2net_human_seg")
    for nome, arq, caixa, modo in ITENS:
        im = Image.open(ENT + arq).convert("RGB").crop(caixa)
        if modo == "ia":
            out = limpar(remove(im, session=sessao, post_process_mask=True))
        elif modo == "humano":
            out = limpar(remove(im, session=sessao_h, post_process_mask=True))
        elif modo in ("marrom", "azul", "laranja"):
            out = limpar(filtro(im, modo), 0.004)
        elif modo == "cor-solta":
            out = limpar(chave_cor(im), 0.0005, sem_borda=True)
        else:
            out = limpar(chave_cor(im), 0.002)
        if nome in REL:
            out = limpar(out, REL[nome])
        bb = out.getchannel("A").point(lambda v: 255 if v > 24 else 0).getbbox()
        if bb:
            out = out.crop(bb)
        out.save(SAI + nome + ".png")
        print(nome, out.size)


if __name__ == "__main__":
    main()
