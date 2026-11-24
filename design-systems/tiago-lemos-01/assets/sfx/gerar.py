#!/usr/bin/env python3
"""Gera os efeitos sonoros suaves do tiago-lemos-01 (sintetizados aqui: grátis, sem IA, sem cliques).

Uso: python3 design-systems/tiago-lemos-01/assets/sfx/gerar.py

Cria entra-1..3.wav (ar suave que sobe) e sai-1..3.wav (ar suave que desce), mono 48 kHz, ~0,35 s.
Sem transiente: ataque lento em janela de Hann, começa e termina em zero (sem tick).
Cada arquivo sai com PICO em -20 dBFS: na mixagem a voz fica perto de -3 dBFS, então já nasce
cerca de 17 dB abaixo do pico da voz (a regra do dono pede pelo menos 12 dB). Quem usa pode
baixar mais com o ganho do componente. Se o dono mandar sons dele, é só trocar os arquivos.
"""
import math
import os
import struct
import wave

import numpy as np

SR = 48000
AQUI = os.path.dirname(os.path.abspath(__file__))
PICO_DB = -20.0


def passa_baixa_varrido(x, f0, f1):
    """Passa-baixa de 2 polos cuja frequência de corte vai de f0 a f1 ao longo do som."""
    n = len(x)
    fc = np.geomspace(f0, f1, n)
    a = 1 - np.exp(-2 * math.pi * fc / SR)
    y1 = y2 = 0.0
    out = np.empty(n)
    for i in range(n):
        y1 += a[i] * (x[i] - y1)
        y2 += a[i] * (y1 - y2)
        out[i] = y2
    return out


def passa_alta(x, fc=180.0):
    a = 1 - math.exp(-2 * math.pi * fc / SR)
    y = 0.0
    low = np.empty(len(x))
    for i, v in enumerate(x):
        y += a * (v - y)
        low[i] = y
    return x - low


def som(dur, f0, f1, ataque, seed, tom):
    rng = np.random.default_rng(seed)
    n = int(dur * SR)
    t = np.arange(n) / SR
    ruido = rng.standard_normal(n)
    y = passa_baixa_varrido(ruido, f0, f1)
    y = passa_alta(y)
    # envelope: sobe em Hann (sem transiente) e desce em Hann; zero nas pontas
    na = int(ataque * SR)
    env = np.ones(n)
    env[:na] = 0.5 - 0.5 * np.cos(np.linspace(0, math.pi, na))
    nd = n - na
    env[na:] = 0.5 + 0.5 * np.cos(np.linspace(0, math.pi, nd))
    y = y * env
    # um fio de tom (quinta suave) por baixo, bem discreto, dá "corpo" sem clique
    y = y / (np.max(np.abs(y)) + 1e-9)
    tomv = np.sin(2 * math.pi * tom * t) * env * 0.12
    y = y + tomv
    y = y / (np.max(np.abs(y)) + 1e-9)
    return y * 10 ** (PICO_DB / 20)


def salva(nome, y):
    pcm = (np.clip(y, -1, 1) * 32767).astype("<i2")
    with wave.open(os.path.join(AQUI, nome), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


# entra: o ar abre (corte sobe); pico perto do fim do ataque. sai: o ar fecha (corte desce).
VARIACOES = [
    (0.36, 500, 2800, 0.22, 11, 523.25),
    (0.34, 650, 3200, 0.20, 23, 587.33),
    (0.38, 450, 2500, 0.24, 37, 493.88),
]
for i, (dur, f0, f1, at, seed, tom) in enumerate(VARIACOES, 1):
    salva(f"entra-{i}.wav", som(dur, f0, f1, at, seed, tom))
    # saída: mais curta, ataque curto, corte descendo
    salva(f"sai-{i}.wav", som(dur * 0.8, f1 * 0.7, f0, at * 0.35, seed + 100, tom * 0.75))
print("ok")
