#!/usr/bin/env python3
"""Rastreia um plano (ex.: parapeito) em um trecho de vídeo e gera, por quadro, a matriz CSS matrix3d que prende um retângulo ao plano.

Uso (Python do venv do recorte, com opencv-python-headless):
  python3 scripts/rastrear-plano.py <quadros-dir> <ref> <saida.json> --quad x1,y1,x2,y2,x3,y3,x4,y4 [--regiao x,y,...] [--largura 1000 --altura 600]

- quadros-dir: PNGs 001.png... (30 fps, 1080x1920) do trecho
- ref: número do quadro de referência (onde o quad foi marcado)
- quad: 4 cantos (TL, TR, BR, BL) do plano de texto, em px, no quadro de referência
- regiao: polígono (px) onde há textura do plano (padrão: o próprio quad). Só ali se procuram pontos de rastreio.
- largura/altura: tamanho do retângulo HTML que será preso ao quad (a matriz vale para ele, origem em 0 0)
Saída: lista de 16 números (matrix3d) por quadro, e o quad projetado.
"""
import argparse, glob, json, os
import cv2
import numpy as np


def pts(s):
    v = [float(x) for x in s.split(",")]
    return np.array(v, dtype=np.float32).reshape(-1, 2)


def mascara(poly, shape):
    m = np.zeros(shape[:2], np.uint8)
    cv2.fillPoly(m, [poly.astype(np.int32)], 255)
    return m


def passo(a, b, poly):
    """Homografia a→b usando pontos dentro de `poly` (coordenadas de a)."""
    ga, gb = cv2.cvtColor(a, cv2.COLOR_BGR2GRAY), cv2.cvtColor(b, cv2.COLOR_BGR2GRAY)
    p0 = cv2.goodFeaturesToTrack(ga, 600, 0.005, 8, mask=mascara(poly, a.shape))
    p1, st, _ = cv2.calcOpticalFlowPyrLK(ga, gb, p0, None, winSize=(31, 31), maxLevel=4)
    ok = st.ravel() == 1
    H, inl = cv2.findHomography(p0[ok], p1[ok], cv2.RANSAC, 2.5)
    return H


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("dir"); ap.add_argument("ref", type=int); ap.add_argument("saida")
    ap.add_argument("--quad", required=True); ap.add_argument("--regiao")
    ap.add_argument("--largura", type=float, default=1000); ap.add_argument("--altura", type=float, default=600)
    a = ap.parse_args()
    arqs = sorted(glob.glob(os.path.join(a.dir, "[0-9][0-9][0-9].png")))
    img = [cv2.imread(f) for f in arqs]
    n = len(img)
    quad = pts(a.quad)
    regiao = pts(a.regiao) if a.regiao else quad
    H = [None] * n
    H[a.ref - 1] = np.eye(3)
    for sentido in (1, -1):
        i = a.ref - 1
        while 0 <= i + sentido < n:
            poly = cv2.perspectiveTransform(regiao.reshape(-1, 1, 2), H[i]).reshape(-1, 2)
            h = passo(img[i], img[i + sentido], poly)
            H[i + sentido] = h @ H[i]
            i += sentido
    rect = np.array([[0, 0], [a.largura, 0], [a.largura, a.altura], [0, a.altura]], np.float32)
    saida = []
    for t in range(n):
        q = cv2.perspectiveTransform(quad.reshape(-1, 1, 2), H[t]).reshape(-1, 2)
        M = cv2.getPerspectiveTransform(rect, q.astype(np.float32))
        m = [M[0, 0], M[1, 0], 0, M[2, 0], M[0, 1], M[1, 1], 0, M[2, 1], 0, 0, 1, 0, M[0, 2], M[1, 2], 0, M[2, 2]]
        saida.append({"quadro": t + 1, "matriz": [float(x) for x in m], "quad": q.tolist()})
    json.dump(saida, open(a.saida, "w"))
    print(f"{n} quadros rastreados")


if __name__ == "__main__":
    main()
