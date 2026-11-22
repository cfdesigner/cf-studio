// Texto preso a um plano rastreado (parapeito): a matriz CSS de cada quadro vem de scripts/rastrear-plano.py.
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../../design-systems/cfdesigner";
import "../../design-systems/cfdesigner/fonts";
import trilha from "./trilha-parapeito.json";

const c = colors.cinema;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** `primeiro`: número (1, 2...) do quadro rastreado em que a `<Sequence>` começa. */
export const TextoNoParapeito: React.FC<{
  primeiro: number;
  duracao: number;
}> = ({ primeiro, duracao }) => {
  const fr = useCurrentFrame();
  const t = trilha[Math.min(primeiro - 1 + fr, trilha.length - 1)];
  const sobe = interpolate(fr, [0, 16], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.exp),
  });
  const sai = interpolate(fr, [duracao - 8, duracao], [1, 0], clamp);
  const linha = (cor: string, tamanho: number): React.CSSProperties => ({
    fontFamily: "Bebas Neue, sans-serif",
    fontSize: tamanho,
    lineHeight: 0.92,
    color: cor,
    letterSpacing: 2,
    whiteSpace: "nowrap",
    textShadow: "0 6px 30px rgba(0,0,0,0.45)",
  });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1000,
          height: 540,
          transformOrigin: "0 0",
          transform: `matrix3d(${t.matriz.join(",")})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 14,
          opacity: sobe * sai,
        }}
      >
        <div
          style={{
            transform: `translateY(${(1 - sobe) * 70}px)`,
            textAlign: "center",
          }}
        >
          <div style={linha("#eef3f6", 200)}>TRANSFORMAR</div>
          <div style={linha(c.amber, 178)}>COMPLETAMENTE</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
