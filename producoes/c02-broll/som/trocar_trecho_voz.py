#!/usr/bin/env python3
"""Troca um trecho da fala (regravado pelo dono) mantendo o resto da gravação intacta.

Uso: python3 producoes/c02-broll/som/trocar_trecho_voz.py <voz-atual.mp4> <original-cru.mp4> <referencia.mp4> <saida.wav> \
        --de 12.43,12.47 --ate 15.325,15.350
- voz-atual: o vídeo cujo áudio já está normalizado (o que o mixar.py usa como voz)
- original-cru: a gravação original (sem normalização), para medir o ganho que a normalização aplicou
- referencia: o vídeo com a fala regravada (mesma gravação, só o trecho novo difere)
- --de a,b: crossfade de entrada do trecho novo (dentro de uma PAUSA); --ate a,b: crossfade de volta ao original (outra pausa)
O ganho da normalização (`loudnorm` dinâmico, que variou ao longo do vídeo) é medido nas duas bordas e interpolado em dB sobre o trecho novo.
"""
import subprocess, sys, tempfile, wave
import numpy as np

SR = 48000


def le(f, tmp):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f, "-vn", "-ac", "2", "-ar", str(SR), tmp + "/a.wav"], check=True)
    w = wave.open(tmp + "/a.wav")
    return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).reshape(-1, 2).astype(np.float64) / 32768


def rms(x): return np.sqrt((x ** 2).mean()) + 1e-12


def main():
    atual, cru, ref, saida = sys.argv[1:5]
    de = [float(v) for v in sys.argv[sys.argv.index("--de") + 1].split(",")]
    ate = [float(v) for v in sys.argv[sys.argv.index("--ate") + 1].split(",")]
    with tempfile.TemporaryDirectory() as tmp:
        v, o, r = le(atual, tmp), le(cru, tmp), le(ref, tmp)
    n = min(len(v), len(o), len(r))
    v, o, r = v[:n], o[:n], r[:n]
    # ganho REAL que a normalização aplicou ao longo do trecho: energia da voz atual / energia do original cru (janela de Hann de 0,3 s)
    jan = np.hanning(int(0.3 * SR)); jan /= jan.sum()
    en = np.convolve((v.mean(1) ** 2), jan, mode="same"); eo = np.convolve((o.mean(1) ** 2), jan, mode="same")
    G = np.sqrt((en + 1e-12) / (eo + 1e-12))
    i0, i1 = int(de[0] * SR), int(ate[1] * SR)
    g = G[i0:i1]
    print(f"ganho da normalização no trecho: de {20 * np.log10(g.min()):+.2f} a {20 * np.log10(g.max()):+.2f} dB")
    novo = v.copy()
    novo[i0:i1] = r[i0:i1] * g[:, None]
    # crossfades (cosseno de potência igual) dentro das pausas: antes do trecho novo e de volta ao atual
    a0, a1 = int(de[0] * SR), int(de[1] * SR); ramp = np.linspace(0, np.pi / 2, a1 - a0)
    novo[a0:a1] = v[a0:a1] * np.cos(ramp)[:, None] + r[a0:a1] * g[: a1 - a0][:, None] * np.sin(ramp)[:, None]
    b0, b1 = int(ate[0] * SR), int(ate[1] * SR); ramp = np.linspace(0, np.pi / 2, b1 - b0)
    novo[b0:b1] = r[b0:b1] * g[b0 - i0:b1 - i0][:, None] * np.cos(ramp)[:, None] + v[b0:b1] * np.sin(ramp)[:, None]
    # conferência: fora de [de, ate] o resultado é IDÊNTICO ao atual
    fora = np.concatenate([novo[:i0] - v[:i0], novo[i1:] - v[i1:]])
    print(f"fora do trecho, diferença máxima para a voz atual: {np.abs(fora).max():.6f} (0 = idêntico)")
    pcm = (np.clip(novo, -1, 1) * 32767).astype(np.int16)
    with wave.open(saida, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
    print("gravado:", saida)


if __name__ == "__main__":
    main()
