#!/usr/bin/env python3
"""Máscara por cor de uma árvore (verdes amarelados, marrons e sombras) contra céu/mar/morro azulados e claros.

Uso: python3 scripts/mascara-arvore.py <quadros-dir> <trilha.json> <saida-dir>
Gera PNGs RGBA (mesmo nome dos quadros) onde só a árvore fica opaca, SÓ acima da linha de baixo do plano rastreado (o corrimão fica de fora).
Serve para colocar texto atrás da árvore. Ajuste os limiares no topo para outro vídeo.
"""
import glob, json, os, sys
import cv2
import numpy as np

H_MAX, S_MIN, V_ESCURO = 70, 45, 115   # matiz (OpenCV 0-179) amarelado/marrom; saturação mínima; escuro


def alfa(im):
    hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV).astype(np.float32)
    h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    a_cor = np.clip((H_MAX - h) / 12, 0, 1) * np.clip((s - S_MIN + 15) / 25, 0, 1) * np.clip((245 - v) / 20, 0, 1)
    a_esc = np.clip((V_ESCURO - v) / 40, 0, 1) * np.clip((105 - h) / 15, 0, 1)
    a = np.maximum(a_cor, a_esc)
    a = cv2.morphologyEx(a, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7)))
    # preenche furos pequenos dentro da árvore (cascas claras, reflexos); frestas grandes de céu continuam abertas
    b = (a > 0.5).astype(np.uint8)
    cont, hier = cv2.findContours(b, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    furos = np.zeros_like(b)
    for c, h in zip(cont, hier[0] if hier is not None else []):
        if h[3] >= 0 and cv2.contourArea(c) < 2500:
            cv2.drawContours(furos, [c], -1, 1, -1)
    a = np.maximum(a, furos.astype(np.float32))
    return cv2.GaussianBlur(a, (0, 0), 1.2)


def main():
    d, trilha, saida = sys.argv[1:4]
    tr = json.load(open(trilha))
    os.makedirs(saida, exist_ok=True)
    for f in sorted(glob.glob(os.path.join(d, "[0-9][0-9][0-9].png"))):
        n = int(os.path.basename(f)[:3])
        im = cv2.imread(f)
        a = alfa(im)
        q = np.array(tr[n - 1]["quad"], np.float32)       # TL, TR, BR, BL
        (x3, y3), (x4, y4) = q[2], q[3]
        # acima da linha BL–BR (estendida até as bordas), com 10 px de folga para cima
        m = (y4 - y3) / (x4 - x3 + 1e-6)
        xs = np.arange(im.shape[1], dtype=np.float32)
        yl = y4 + m * (xs - x4) - 10
        zona = (np.arange(im.shape[0], dtype=np.float32)[:, None] < yl[None, :]).astype(np.float32)
        a = a * cv2.GaussianBlur(zona, (0, 0), 1.5)
        out = np.dstack([im, (a * 255).astype(np.uint8)])
        cv2.imwrite(os.path.join(saida, os.path.basename(f)), out)
    print("pronto")


if __name__ == "__main__":
    main()
