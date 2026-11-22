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
    H, inl = cv2.findHomography(p0[ok], p1[ok], cv2.USAC_MAGSAC, 2.0)
    return H


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("dir"); ap.add_argument("ref", type=int); ap.add_argument("saida")
    ap.add_argument("--quad", required=True); ap.add_argument("--regiao")
    ap.add_argument("--refinar", action="store_true", help="refina cada quadro contra a referência (ECC sub-pixel) usando só a madeira do plano: tira a tremida do rastreio encadeado")
    ap.add_argument("--madeira", default="5,30,60,50", help="matiz mín,máx (OpenCV 0-179), saturação mín, valor mín da madeira/estrutura do plano")
    ap.add_argument("--janela", default=None, help="de,ate: quadros a refinar (padrão: todos). Fora dela fica o rastreio encadeado")
    ap.add_argument("--suavizar", type=float, default=0.0, help="sigma (em quadros) do suavizado temporal dos cantos, dentro da --janela. 1,5 tira o ruído da estimativa sem soltar o plano da madeira")
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
    if a.refinar:
        h0, h1, smin, vmin = [float(x) for x in a.madeira.split(",")]
        hsv = cv2.cvtColor(img[a.ref - 1], cv2.COLOR_BGR2HSV)
        mad = cv2.inRange(hsv, (h0, smin, vmin), (h1, 255, 255))
        mad = cv2.bitwise_and(mad, mascara(regiao, img[0].shape))
        mad = cv2.dilate(mad, np.ones((5, 5), np.uint8))
        gris = lambda im: cv2.GaussianBlur(cv2.cvtColor(im, cv2.COLOR_BGR2GRAY), (0, 0), 1.0).astype(np.float32)
        meia = lambda g: cv2.resize(g, None, fx=0.5, fy=0.5, interpolation=cv2.INTER_AREA)
        ref = gris(img[a.ref - 1]); ref_m = meia(ref)
        mad_m = (cv2.resize(mad, None, fx=0.5, fy=0.5, interpolation=cv2.INTER_AREA) > 127).astype(np.uint8) * 255
        S2 = np.diag([0.5, 0.5, 1.0])
        grossa = (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 150, 1e-6)
        fina = (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 30, 1e-7)
        de, ate = (int(x) for x in a.janela.split(",")) if a.janela else (1, n)
        for sentido in (1, -1):
            W = np.eye(3)                                    # quadro ref -> referência
            t = a.ref - 1
            while 0 <= t + sentido < n and de - 1 <= t + sentido <= ate - 1:
                t += sentido
                gt = gris(img[t])
                try:
                    Wm = (S2 @ W @ np.linalg.inv(S2)).astype(np.float32)   # começa do vizinho já refinado
                    _, Wm = cv2.findTransformECC(meia(gt), ref_m, Wm, cv2.MOTION_HOMOGRAPHY, grossa, mad_m, 5)
                    Wf = (np.linalg.inv(S2) @ Wm @ S2).astype(np.float32)
                    _, Wf = cv2.findTransformECC(gt, ref, Wf, cv2.MOTION_HOMOGRAPHY, fina, mad, 5)
                    W = Wf.astype(np.float64)
                    H[t] = np.linalg.inv(W)
                except cv2.error:
                    print(f"aviso: ECC não convergiu no quadro {t + 1}; usando o quadro vizinho")
                    H[t] = np.linalg.inv(W)
    rect = np.array([[0, 0], [a.largura, 0], [a.largura, a.altura], [0, a.altura]], np.float32)
    Q = np.array([cv2.perspectiveTransform(quad.reshape(-1, 1, 2), H[t]).reshape(-1, 2) for t in range(n)])
    if a.suavizar > 0:
        de, ate = (int(x) for x in a.janela.split(",")) if a.janela else (1, n)
        k = int(3 * a.suavizar) + 1
        w = np.exp(-0.5 * (np.arange(-k, k + 1) / a.suavizar) ** 2)
        orig = Q.copy()
        for t in range(de - 1, ate):
            idx = np.clip(np.arange(t - k, t + k + 1), de - 1, ate - 1)
            Q[t] = (orig[idx] * w[:, None, None]).sum(0) / w.sum()
    saida = []
    for t in range(n):
        q = Q[t]
        M = cv2.getPerspectiveTransform(rect, q.astype(np.float32))
        m = [M[0, 0], M[1, 0], 0, M[2, 0], M[0, 1], M[1, 1], 0, M[2, 1], 0, 0, 1, 0, M[0, 2], M[1, 2], 0, M[2, 2]]
        saida.append({"quadro": t + 1, "matriz": [float(x) for x in m], "quad": q.tolist()})
    json.dump(saida, open(a.saida, "w"))
    print(f"{n} quadros rastreados")


if __name__ == "__main__":
    main()
