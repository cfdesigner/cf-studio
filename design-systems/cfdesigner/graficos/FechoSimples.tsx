import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Logo } from "../components/Logo";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type FechoSimplesProps = {
  durationInFrames: number;
  /** Altura do logo em px na base de 1080 (padrão 96: o logo ocupa ~36% da largura, como no vídeo de referência). */
  logoHeight?: number;
  /** Desfoque inicial do logo em px (0 = só fade). Com 18, o logo sai do desfoque ao entrar. */
  desfoque?: number;
  /** Fundo animado por baixo do logo (ex.: `<FundoCF variante="losangos" />`). Sem ele, o fecho é preto puro. */
  fundo?: React.ReactNode;
};

/**
 * Fecho simples (visto no vídeo de referência C01): preto puro e o logo horizontal branco, pequeno, no centro. Sem texto.
 * Entra por fade de 400 ms e sai por fade de 400 ms no fim. É o fecho mais discreto do CFDesigner (o `LogoOutro` usa o logo
 * metálico grande e uma assinatura).
 */
export const FechoSimples: React.FC<FechoSimplesProps> = ({
  durationInFrames,
  logoHeight = 96,
  desfoque = 0,
  fundo,
}) => {
  const f = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const k = width / 1080;
  const ms = (f / fps) * 1000;
  const endMs = (durationInFrames / fps) * 1000;
  const o = interpolate(ms, [0, 400, endMs - 400, endMs], [0, 1, 1, 0], clamp);
  const p = interpolate(ms, [0, 700], [1, 0], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return (
    <AbsoluteFill
      style={{
        background: fundo ? undefined : "#000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {fundo}
      <div style={{ opacity: o, filter: `blur(${p * desfoque}px)` }}>
        <Logo layout="horizontal" finish="white" height={logoHeight * k} />
      </div>
    </AbsoluteFill>
  );
};
