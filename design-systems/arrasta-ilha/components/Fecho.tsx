import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import fotoFecho from "../assets/aplicacoes/domingueira-foto.jpg";
import "../fonts";
import { colors } from "../tokens";
import { batida, clamp, firme } from "../movimento";
import { Faixa, Recorte } from "./Original";
import { Suave } from "./Pagina";

export type FundoFecho = "A" | "B" | "C";
export type EntradaLogo = "sobe" | "revela" | "sol";

/**
 * FECHO do vídeo, só a logo (sem texto), em 3 fundos e 3 entradas para o dono escolher (28/11/2026).
 * Fundos: A creme com sol e folhas suaves; B foto do grupo dissolvendo no branco; C faixas oficiais empilhadas nas bordas e miolo branco.
 * Entradas da logo: "sobe" (batida), "revela" (cortina que abre da esquerda para a direita) e "sol" (o sol de respingo gira e abre e a logo aparece nele).
 * Logo ~440 px de largura, centralizada. 75 quadros a 30 fps.
 */
export const FechoLogo: React.FC<{ fundo?: FundoFecho; entrada?: EntradaLogo }> = ({ fundo = "A", entrada = "sobe" }) => {
  const frame = useCurrentFrame();
  const faixa = firme(interpolate(frame, [0, 14], [0, 1], clamp));
  const larg = 440;
  const alt = (larg * 1497) / 1400;
  const topo = fundo === "B" ? 1010 : (1920 - alt) / 2;
  const t = interpolate(frame, [6, 30], [0, 1], clamp);
  const sobe = batida(t);
  const revela = firme(t);
  const sol = firme(interpolate(frame, [4, 26], [0, 1], clamp));
  let estilo: React.CSSProperties = {};
  if (entrada === "sobe") estilo = { opacity: Math.min(1, sobe * 1.5), transform: `translateY(${(1 - sobe) * 70}px) scale(${0.94 + 0.06 * sobe})` };
  if (entrada === "revela") estilo = { clipPath: `inset(0 ${(1 - revela) * 100}% 0 0)`, opacity: Math.min(1, revela * 3) };
  if (entrada === "sol") estilo = { opacity: Math.min(1, Math.max(0, (sol - 0.35) * 2.2)), transform: `scale(${0.9 + 0.1 * sol})` };
  const cx = 540;
  const cy = topo + alt / 2;
  const bg = fundo === "A" ? colors.creme : colors.branco;
  return (
    <AbsoluteFill style={{ background: bg }}>
      {fundo === "A" && (
        <>
          <Suave nome="elSolRespingo" largura={900} style={{ left: 90, top: cy - 450 }} opacidade={0.22} />
          <Suave nome="elFolhaLarga" altura={1100} style={{ right: -90, bottom: 90 }} opacidade={0.12} />
          <Suave nome="elFolhaLarga" altura={800} style={{ left: -120, top: 120 }} opacidade={0.09} />
        </>
      )}
      {fundo === "B" && (
        <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1250, WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 42%, rgba(0,0,0,0.4) 62%, rgba(0,0,0,0) 86%)", maskImage: "linear-gradient(to bottom, #000 0%, #000 42%, rgba(0,0,0,0.4) 62%, rgba(0,0,0,0) 86%)" }}>
          <Img src={fotoFecho} style={{ position: "absolute", left: -330, top: 0, width: 1740, height: 1250, objectFit: "cover", objectPosition: "42% 0%" }} />
        </div>
      )}
      {fundo === "C" && (
        <>
          <Suave nome="elManchasPessegoAzul" largura={1000} style={{ right: 0, top: cy - 260 }} opacidade={1} />
          <Suave nome="elSolRespingo" largura={420} style={{ left: -110, bottom: 340 }} opacidade={0.16} />
        </>
      )}
      {entrada === "sol" && (
        <div style={{ position: "absolute", left: cx - 330, top: cy - 330, width: 660, height: 660, opacity: interpolate(frame, [26, 52], [1, 0.25], clamp), transform: `scale(${0.4 + 0.6 * sol}) rotate(${(1 - sol) * -60}deg)` }}>
          <Recorte nome="elSolRespingo" largura={660} style={{ left: 0, top: 0, opacity: 0.35 }} />
        </div>
      )}
      <Recorte nome="logoVertical" largura={larg} style={{ left: (1080 - larg) / 2, top: topo, ...estilo }} />
      {fundo === "A" && (
        <>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, transform: `translateY(${(faixa - 1) * 90}px)` }}><Faixa nome="ofDancarinos" w={1080} alt={72} /></div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, transform: `translateY(${(1 - faixa) * 90}px)` }}><Faixa nome="ofDancarinos" w={1080} alt={72} /></div>
        </>
      )}
      {fundo === "B" && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, transform: `translateY(${(1 - faixa) * 90}px)` }}><Faixa nome="ofTriangulos" w={1080} alt={56} /></div>
      )}
      {fundo === "C" && (
        <>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", flexDirection: "column", transform: `translateY(${(faixa - 1) * 220}px)` }}>
            <Faixa nome="ofTriangulos" w={1080} alt={56} />
            <Faixa nome="ofHexagonos" w={1080} alt={48} />
            <Faixa nome="ofIcones" w={1080} alt={84} />
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", transform: `translateY(${(1 - faixa) * 220}px)` }}>
            <Faixa nome="ofIcones" w={1080} alt={84} />
            <Faixa nome="ofHexagonos" w={1080} alt={48} />
            <Faixa nome="ofTriangulos" w={1080} alt={56} />
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
