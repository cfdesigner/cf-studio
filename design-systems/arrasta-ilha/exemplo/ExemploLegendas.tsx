import React from "react";
import { AbsoluteFill, Img } from "remotion";
import fotoQuadro from "../assets/aplicacoes/domingueira-foto.jpg";
import { Legendas } from "../components/Legendas";
import type { Caption, PunchLine } from "../../../tecnicas/legendas/texto";

// Palavras de exemplo (tempo sintético, sem áudio). Em produção vêm do Whisper: scripts/transcrever.py.
const w = (text: string, startMs: number, endMs: number): Caption => ({ text, startMs, endMs, timestampMs: startMs, confidence: 1 });
export const capsExemplo: Caption[] = [
  w("Bora", 200, 520), w(" tocar", 560, 900), w(" com", 940, 1160), w(" a", 1200, 1320), w(" gente", 1360, 1800),
  w(" todo", 2600, 2900), w(" domingo", 2940, 3340), w(" tem", 3380, 3640), w(" maracatu", 3700, 4300), w(" na", 4340, 4520), w(" UFSC", 4560, 5100),
  w(" Chegue", 5900, 6300), w(" às", 6340, 6520), w(" três", 6560, 6900), w(" e", 6940, 7040), w(" venha", 7080, 7400), w(" aprender", 7440, 8000),
];
export const punchExemplo: PunchLine[] = [{ startMs: 2600, endMs: 5400, keyword: "maracatu" }];

export const ExemploLegendas: React.FC = () => (
  <AbsoluteFill style={{ background: "#0b1220" }}>
    <Img src={fotoQuadro} style={{ position: "absolute", left: -300, top: 0, width: 1932, height: 1920, objectFit: "cover", objectPosition: "42% 50%" }} />
    <Legendas captions={capsExemplo} punchLines={punchExemplo} />
  </AbsoluteFill>
);
