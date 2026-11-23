import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import "../fonts";
import { colors, fontFamilies } from "../tokens";

const c = colors.cinema;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type SeloFlutuanteProps = {
  /** Texto do selo (ex.: "Making off"). Sai em caixa alta. */
  texto: string;
  /** Distância da base do quadro até o centro do selo, em px na base de 1080 de largura (padrão 330: acima da barra do Stories). */
  base?: number;
  /** Quadro em que surge (padrão 6). */
  entra?: number;
  /** Duração total em quadros (da `<Sequence>`), para sumir no fim. Padrão: não some. */
  durationInFrames?: number;
};

/**
 * Selo pequeno e discreto que flutua na parte de baixo da tela: texto espaçado em Montserrat, entre dois fios finos
 * em bronze com um losango. Sobe de leve e desfocado ao entrar, depois balança devagar (nunca fica parado).
 * Serve para avisar o tipo da peça ("Making off", "Passo a passo"...). Coloque por cima de todas as cenas.
 */
export const SeloFlutuante: React.FC<SeloFlutuanteProps> = ({
  texto,
  base = 330,
  entra = 6,
  durationInFrames,
}) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const k = width / 1080;
  const p = interpolate(f, [entra, entra + 18], [0, 1], clamp);
  const fim =
    durationInFrames === undefined
      ? 1
      : interpolate(f, [durationInFrames - 8, durationInFrames], [1, 0], clamp);
  const bob = Math.sin(f / 15) * 6 * k;
  const respira = 0.34 + Math.sin(f / 26) * 0.02;
  const fio = (lado: 1 | -1) => (
    <div
      style={{
        width: 64 * k * p,
        height: 2 * k,
        background: `linear-gradient(${lado === 1 ? "90deg" : "270deg"}, ${c.bronze}, rgba(138,106,42,0))`,
        opacity: 0.9,
      }}
    />
  );
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: height - base * k + bob + (1 - p) * 24 * k,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 22 * k,
        opacity: p * fim * 0.88,
        filter: `blur(${(1 - p) * 8}px)`,
        pointerEvents: "none",
        zIndex: 4,
      }}
    >
      {fio(-1)}
      <div
        style={{
          width: 9 * k,
          height: 9 * k,
          background: c.bronze,
          transform: "rotate(45deg)",
        }}
      />
      <div
        style={{
          fontFamily: fontFamilies.heading,
          fontWeight: 600,
          fontSize: 27 * k,
          letterSpacing: `${respira}em`,
          paddingLeft: `${respira}em`,
          color: c.ink,
          textTransform: "uppercase",
          textShadow: "0 2px 18px rgba(0,0,0,.85)",
          whiteSpace: "nowrap",
        }}
      >
        {texto}
      </div>
      <div
        style={{
          width: 9 * k,
          height: 9 * k,
          background: c.bronze,
          transform: "rotate(45deg)",
        }}
      />
      {fio(1)}
    </div>
  );
};
