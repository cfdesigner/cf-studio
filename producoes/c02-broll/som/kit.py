#!/usr/bin/env python3
"""Kit de efeitos sonoros sintetizado (numpy puro, grátis, sem IA paga). Gera WAVs 48 kHz estéreo em <saida>/.

Uso: python3 producoes/c02-broll/som/kit.py <pasta-saida>
Os tempos e a "personalidade" seguem a leitura do C01 feito pelo dono: cliques secos nas marcas, whooshes curtos um pouco ANTES do
corte, impacto grave nas frases de efeito, "ding" discreto no logo. Tudo curto, limpo, sem reverb exagerado.
"""
import sys, os, wave
import numpy as np

SR = 48000
rng = np.random.default_rng(7)  # determinístico: o mesmo kit sempre


def t_(dur): return np.arange(int(dur * SR)) / SR


def env_exp(n, tau): return np.exp(-np.arange(n) / (tau * SR))


def svf_bp(x, fc, q=2.0):
    """Passa-faixa de estado variável com frequência central por amostra (fc: array)."""
    low = band = 0.0
    out = np.empty_like(x)
    f = 2 * np.sin(np.pi * np.clip(fc, 20, SR * 0.45) / SR)
    for i in range(len(x)):
        low += f[i] * band
        high = x[i] - low - band / q
        band += f[i] * high
        out[i] = band
    return out


def norm(x, pico_db):
    x = x / (np.abs(x).max() + 1e-9)
    return x * 10 ** (pico_db / 20)


def fade(x, ini=0.002, fim=0.01):
    a, b = int(ini * SR), int(fim * SR)
    x = x.copy()
    x[:a] *= np.linspace(0, 1, a); x[-b:] *= np.linspace(1, 0, b)
    return x


def estereo(m, largura=0.0, pan0=0.0, pan1=0.0):
    """Mono -> estéreo com pan que vai de pan0 a pan1 (-1 esquerda ... 1 direita)."""
    n = len(m); pan = np.linspace(pan0, pan1, n)
    l = m * np.sqrt((1 - pan) / 2) * 1.0; r = m * np.sqrt((1 + pan) / 2)
    return np.stack([l, r], 1)


def tick():
    """Marca do checklist: clique seco com 'blip' de tom que cai (como o 'pop' das marcas do C01)."""
    n = int(0.11 * SR); t = np.arange(n) / SR
    f = 2300 * np.exp(-t / 0.02) + 800
    ph = 2 * np.pi * np.cumsum(f) / SR
    corpo = np.sin(ph) * env_exp(n, 0.022)
    clique = rng.standard_normal(n) * env_exp(n, 0.0025) * 0.7
    return estereo(fade(norm(corpo + clique, -9)))


def whoosh(dur=0.5, f0=350, f1=5500, pico=0.7, pan0=-0.5, pan1=0.5, q=1.6):
    """Whoosh: ruído em passa-faixa que sobe; o volume cresce até ~70% e cai rápido (o pico cai perto do corte)."""
    n = int(dur * SR); t = np.arange(n) / SR; u = t / dur
    ruido = rng.standard_normal(n)
    fc = f0 * (f1 / f0) ** (u ** 1.3)
    x = svf_bp(ruido, fc, q)
    env = np.where(u < pico, (u / pico) ** 2.2, ((1 - u) / (1 - pico)) ** 1.6)
    return estereo(fade(norm(x * env, -11), 0.004, 0.02), pan0=pan0, pan1=pan1)


def whoosh_card():  # entrada de cartão/texto: mais curto e mais agudo
    return whoosh(0.32, 700, 7000, 0.6, -0.3, 0.3, 1.4)


def whoosh_zoom():  # aproximação: mais longo, termina grosso
    return whoosh(0.65, 200, 3500, 0.8, 0.0, 0.0, 1.2)


def hit(grave=1.0):
    """Impacto: bumbo de sub com queda de tom + sopro de ruído + cauda curta."""
    n = int(0.9 * SR); t = np.arange(n) / SR
    f = 42 + 110 * np.exp(-t / 0.07)
    sub = np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(n, 0.28)
    topo = svf_bp(rng.standard_normal(n), np.full(n, 900.0), 0.8) * env_exp(n, 0.05) * 0.35
    cauda = svf_bp(rng.standard_normal(n), np.full(n, 160.0), 1.0) * env_exp(n, 0.35) * 0.25
    x = (sub * grave + topo + cauda)
    return estereo(fade(norm(x, -6), 0.001, 0.05))


def zip_():
    """Risco da palavra: zip rápido e fino."""
    n = int(0.2 * SR); u = np.arange(n) / n
    x = svf_bp(rng.standard_normal(n), 3000 * (3.2 ** u), 2.2) * np.sin(np.pi * u) ** 0.7
    return estereo(fade(norm(x, -10), 0.003, 0.03), pan0=-0.4, pan1=0.4)


def shimmer():
    """Vazamento de luz: ar brilhante que sobe e se desfaz, com dois tons suaves."""
    dur = 1.2; n = int(dur * SR); t = np.arange(n) / SR; u = t / dur
    ar = svf_bp(rng.standard_normal(n), 2500 + 6500 * u, 1.0) * np.sin(np.pi * u ** 0.8) ** 2
    tons = (np.sin(2 * np.pi * 1318 * t) + 0.6 * np.sin(2 * np.pi * 1976 * t * 1.003)) * np.sin(np.pi * u) ** 2 * 0.12
    x = ar + tons
    return estereo(fade(norm(x, -14), 0.02, 0.15), pan0=-0.6, pan1=0.6)


def reverso():
    """Inverso do whoosh longo: sucção para a saída."""
    return whoosh(0.8, 300, 6000, 0.97, 0.3, -0.3, 1.3)


def ding():
    """Logo: sino discreto (E6 com harmônicos inarmônicos), cauda longa e suave."""
    dur = 1.8; n = int(dur * SR); t = np.arange(n) / SR
    x = np.zeros(n)
    for razao, a, tau in ((1.0, 1.0, 0.9), (2.76, 0.45, 0.45), (5.4, 0.2, 0.2), (0.5, 0.35, 1.1)):
        x += a * np.sin(2 * np.pi * 1318.5 * razao * t) * np.exp(-t / tau)
    x *= 1 - np.exp(-t / 0.003)
    return estereo(fade(norm(x, -14), 0.001, 0.2))


KIT = {"tick": tick, "whoosh": lambda: whoosh(), "whoosh_card": whoosh_card, "whoosh_zoom": whoosh_zoom,
       "hit": hit, "zip": zip_, "shimmer": shimmer, "reverso": reverso, "ding": ding}


def salva(path, x):
    pcm = (np.clip(x, -1, 1) * 32767).astype(np.int16)
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())


if __name__ == "__main__":
    out = sys.argv[1]; os.makedirs(out, exist_ok=True)
    for nome, fn in KIT.items():
        salva(os.path.join(out, nome + ".wav"), fn())
    print("kit:", ", ".join(KIT))
