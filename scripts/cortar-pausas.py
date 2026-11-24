#!/usr/bin/env python3
"""Corta pausas e respiros de um vídeo falado, usando o tempo de cada palavra (Whisper).

Uso:
  python3 scripts/cortar-pausas.py <video> [saida.mp4] [--captions palavras.json]
      [--pausa-min 0.30] [--folga-antes 0.07] [--folga-depois 0.12]
      [--fps 30] [--tamanho 1080x1920] [--so-plano]

O que faz:
  1. Lê as palavras com tempo (--captions, do scripts/transcrever.py). Sem elas, transcreve sozinho.
  2. Mantém só a fala: cada trecho vai da folga antes da 1ª palavra até a folga depois da última.
     Todo vão entre palavras >= --pausa-min vira corte (é aí que ficam as pausas e os respiros).
     Pausa curta (< --pausa-min) é mantida, para a fala não ficar atropelada.
  3. Monta o vídeo cortado (FFmpeg: trim + concat, 30 fps, H.264 + AAC, pequenos fades de 10 ms no áudio
     em cada emenda para não haver estalo).
  4. Regrava os tempos das palavras para o vídeo novo: <saida>.captions.json
  5. Salva o mapa dos cortes: <saida>.cortes.json (trechos mantidos, tempo removido).

--so-plano: só calcula e mostra os cortes (e grava os .json), sem renderizar.
Ajuste: mais agressivo = --pausa-min 0.20; mais natural = --pausa-min 0.45.
Vícios ("é", "né", "hum", "tipo"...) são só listados no relatório: quem decide é o dono.
"""
import argparse
import json
import os
import re
import subprocess
import sys
import tempfile

AQUI = os.path.dirname(os.path.abspath(__file__))
WHISPER_PY = "/opt/whisper-venv/bin/python"
VICIOS = {"é", "ééé", "éé", "hm", "hum", "ah", "eh", "né", "tipo", "então", "assim", "aí", "ahn", "uh"}


def sh(cmd, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, **kw)


def duracao(video):
    r = sh(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", video])
    return float(r.stdout.strip())


def limpa(t):
    return re.sub(r"[.,!?…:;\"“”()]", "", t).strip().lower()


def trechos_mantidos(words, dur, pausa_min, antes, depois):
    grupos = []
    for w in words:
        s, e = w["startMs"] / 1000, w["endMs"] / 1000
        if grupos and s - grupos[-1][1] < pausa_min:
            grupos[-1][1] = max(grupos[-1][1], e)
        else:
            grupos.append([s, e])
    out = []
    for s, e in grupos:
        a, b = max(0.0, s - antes), min(dur, e + depois)
        if out and a <= out[-1][1]:
            out[-1][1] = max(out[-1][1], b)
        else:
            out.append([a, b])
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("saida", nargs="?")
    ap.add_argument("--captions")
    ap.add_argument("--pausa-min", type=float, default=0.30)
    ap.add_argument("--folga-antes", type=float, default=0.07)
    ap.add_argument("--folga-depois", type=float, default=0.12)
    ap.add_argument("--fps", type=int, default=30)
    ap.add_argument("--tamanho", help="LxA, ex.: 1080x1920 (padrão: tamanho original, só corrigindo a rotação)")
    ap.add_argument("--so-plano", action="store_true")
    a = ap.parse_args()

    base = os.path.splitext(a.saida or a.video)[0]
    saida = a.saida or base + "-cortado.mp4"
    pref = os.path.splitext(saida)[0]
    dur = duracao(a.video)

    cap = a.captions
    if not cap:
        cap = pref + ".original.captions.json"
        print("Transcrevendo (Whisper)...")
        r = sh([WHISPER_PY, os.path.join(AQUI, "transcrever.py"), a.video, cap, "--lingua", "pt"])
        if r.returncode:
            sys.exit(r.stderr[-800:])
    words = json.load(open(cap))
    words = [w for w in words if w["text"].strip()]
    if not words:
        sys.exit("Sem palavras na transcrição: nada para cortar.")

    segs = trechos_mantidos(words, dur, a.pausa_min, a.folga_antes, a.folga_depois)
    novo = sum(b - a_ for a_, b in segs)

    # mapa de tempo: início de cada trecho no vídeo novo
    offs, acc = [], 0.0
    for s, e in segs:
        offs.append(acc)
        acc += e - s

    def remapeia(ms):
        t = ms / 1000
        for (s, e), o in zip(segs, offs):
            if t <= e:
                return max(0, round((o + max(0.0, t - s)) * 1000))
        return round(novo * 1000)

    novas = []
    for w in words:
        nw = dict(w)
        nw["startMs"] = remapeia(w["startMs"])
        nw["endMs"] = max(nw["startMs"] + 1, remapeia(w["endMs"]))
        if nw.get("timestampMs") is not None:
            nw["timestampMs"] = nw["startMs"]
        novas.append(nw)
    json.dump(novas, open(pref + ".captions.json", "w"), ensure_ascii=False, indent=1)
    json.dump(
        {"original_s": round(dur, 3), "novo_s": round(novo, 3), "removido_s": round(dur - novo, 3),
         "trechos": [{"de": round(s, 3), "ate": round(e, 3), "no_novo": round(o, 3)} for (s, e), o in zip(segs, offs)]},
        open(pref + ".cortes.json", "w"), indent=1)

    print(f"Original: {dur:.2f} s  ->  cortado: {novo:.2f} s  (removi {dur - novo:.2f} s, {100*(dur-novo)/dur:.0f}%)")
    print(f"{len(segs)} trechos mantidos; pausas/respiros removidos: {len(segs)-1} cortes + pontas")
    vicios = [(w["startMs"] / 1000, w["text"]) for w in words if limpa(w["text"]) in VICIOS]
    if vicios:
        print("Possíveis vícios (NÃO removidos, o dono decide): " + ", ".join(f"{t:.1f}s '{x.strip()}'" for t, x in vicios[:25]))

    if a.so_plano:
        return

    fade = 0.010
    filtros, nomes = [], []
    escala = ""
    if a.tamanho:
        l, h = a.tamanho.lower().split("x")
        escala = f",scale={l}:{h}:force_original_aspect_ratio=increase:flags=lanczos,crop={l}:{h}"
    for i, (s, e) in enumerate(segs):
        filtros.append(f"[0:v]trim=start={s:.4f}:end={e:.4f},setpts=PTS-STARTPTS,fps={a.fps}{escala}[v{i}]")
        d = e - s
        filtros.append(
            f"[0:a]atrim=start={s:.4f}:end={e:.4f},asetpts=PTS-STARTPTS,"
            f"afade=t=in:d={fade},afade=t=out:st={max(0, d - fade):.4f}:d={fade}[a{i}]"
        )
        nomes.append(f"[v{i}][a{i}]")
    filtros.append("".join(nomes) + f"concat=n={len(segs)}:v=1:a=1[v][a]")
    with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False) as f:
        f.write(";\n".join(filtros))
        script = f.name
    r = sh(["ffmpeg", "-v", "error", "-y", "-i", a.video, "-filter_complex_script", script,
            "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-crf", "16", "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "192k", saida])
    os.unlink(script)
    if r.returncode:
        sys.exit(r.stderr[-1500:])
    print("Vídeo cortado:", saida)
    print("Palavras com o tempo novo:", pref + ".captions.json")


if __name__ == "__main__":
    main()
