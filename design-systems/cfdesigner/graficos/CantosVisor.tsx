import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../tokens";

const c = colors.cinema;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type CantosVisorProps = {
  /** Retângulo enquadrado, em px na base de 1080 de largura. Padrão: o quadro inteiro, com margem. */
  area?: { x: number; y: number; w: number; h: number };
  /** Comprimento de cada braço do canto (padrão 70). */
  comprimento?: number;
  entra?: number;
  /** Quadros para se desenhar (padrão 12). */
  duracao?: number;
  sai?: number;
  cor?: string;
};

/** Cantos finos de visor de câmera que se desenham em volta de uma área (ou do quadro todo). */
export const CantosVisor: React.FC<CantosVisorProps> = ({
  area,
  comprimento = 70,
  entra = 0,
  duracao = 12,
  sai,
  cor = c.ink,
}) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const k = width / 1080;
  const a = area ?? { x: 52, y: 52, w: 1080 - 104, h: height / k - 104 };
  const l = comprimento;
  const q = interpolate(f, [entra, entra + duracao], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const o =
    sai === undefined ? 1 : interpolate(f, [sai, sai + 5], [1, 0], clamp);
  const x0 = a.x * k,
    y0 = a.y * k,
    x1 = (a.x + a.w) * k,
    y1 = (a.y + a.h) * k,
    L = l * k;
  const d =
    `M${x0} ${y0 + L}V${y0}H${x0 + L}M${x1 - L} ${y0}H${x1}V${y0 + L}` +
    `M${x0} ${y1 - L}V${y1}H${x0 + L}M${x1 - L} ${y1}H${x1}V${y1 - L}`;
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
      <path
        d={d}
        pathLength={1}
        strokeDasharray={`${q} 1`}
        fill="none"
        stroke={cor}
        strokeOpacity={0.9}
        strokeWidth={3.4 * k}
        strokeLinecap="square"
      />
    </svg>
  );
};
