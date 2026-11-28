import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import "../fonts";
import { colors } from "../tokens";
import { batida, clamp, firme } from "../movimento";
import { Faixa, Recorte } from "./Original";
import { Suave } from "./Pagina";

/**
 * FECHO do vídeo (decisão do dono, 28/11/2026): só a logo, menor e centralizada, sem texto (a logo já traz o nome).
 * Fundo branco com manchas e folhas suaves; as faixas oficiais deslizam e a logo entra com a "batida".
 * Duração sugerida: 75 quadros a 30 fps.
 */
export const FechoLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const faixa = firme(interpolate(frame, [0, 14], [0, 1], clamp));
  const logo = batida(interpolate(frame, [6, 28], [0, 1], clamp));
  const larg = 540;
  const alt = (larg * 1497) / 1400;
  return (
    <AbsoluteFill style={{ background: colors.branco }}>
      <Suave nome="elManchasPessegoAzul" largura={1000} style={{ right: 0, top: 560 }} opacidade={1} />
      <Suave nome="elFolhaLarga" altura={900} style={{ right: -40, bottom: 120 }} opacidade={0.1} />
      <Suave nome="elSolRespingo" largura={460} style={{ left: -100, top: 1000 }} opacidade={0.16} />
      <Recorte
        nome="logoVertical"
        largura={larg}
        style={{ left: (1080 - larg) / 2, top: (1920 - alt) / 2, opacity: Math.min(1, logo * 1.5), transform: `translateY(${(1 - logo) * 60}px) scale(${0.94 + 0.06 * logo})` }}
      />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, transform: `translateY(${(faixa - 1) * 90}px)` }}>
        <Faixa nome="ofTriangulos" w={1080} alt={56} />
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, transform: `translateY(${(1 - faixa) * 90}px)` }}>
        <Faixa nome="ofDancarinos" w={1080} alt={72} />
      </div>
    </AbsoluteFill>
  );
};
