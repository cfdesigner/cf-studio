import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../tokens";

const c = colors.cinema;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type LinhaChamadaProps = {
  /** Pontos da linha, em px na base de 1080 de largura (usa 2 ou 3 pontos: o último leva o pontinho). */
  pontos: { x: number; y: number }[];
  /** Anel tracejado em volta do que está sendo apontado (começa a linha na borda dele). */
  anel?: { x: number; y: number; r: number };
  /** Quadro (dentro da `<Sequence>`) em que começa a se desenhar. */
  entra?: number;
  /** Quadros que a linha leva para se desenhar (padrão 14). */
  duracao?: number;
  /** Quadro em que some (fade de 5 quadros). Padrão: fica até o fim. */
  sai?: number;
  cor?: string;
};

/** Linha de chamada: anel tracejado que gira + linha fina que se desenha até um pontinho. Aponta um objeto para uma etiqueta. */
export const LinhaChamada: React.FC<LinhaChamadaProps> = ({
  pontos,
  anel,
  entra = 0,
  duracao = 14,
  sai,
  cor = c.ink,
}) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const k = width / 1080;
  const q = interpolate(f, [entra, entra + duracao], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const o =
    sai === undefined ? 1 : interpolate(f, [sai, sai + 5], [1, 0], clamp);
  const d = pontos
    .map((p, i) => `${i ? "L" : "M"}${p.x * k} ${p.y * k}`)
    .join("");
  const fim = pontos[pontos.length - 1];
  const girar = (f - entra) * 3;
  return (
    <svg
      width={width}
      height={height}
      style={{
        position: "absolute",
        inset: 0,
        opacity: o,
        pointerEvents: "none",
      }}
    >
      {anel && (
        <circle
          cx={anel.x * k}
          cy={anel.y * k}
          r={anel.r * k * (0.6 + 0.4 * q)}
          fill="none"
          stroke={cor}
          strokeWidth={3 * k}
          strokeDasharray={`${10 * k} ${8 * k}`}
          opacity={q}
          transform={`rotate(${girar} ${anel.x * k} ${anel.y * k})`}
        />
      )}
      <path
        d={d}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - q}
        fill="none"
        stroke={cor}
        strokeWidth={2.6 * k}
      />
      <circle
        cx={fim.x * k}
        cy={fim.y * k}
        r={6 * k}
        fill={cor}
        opacity={q > 0.98 ? 1 : 0}
      />
    </svg>
  );
};
