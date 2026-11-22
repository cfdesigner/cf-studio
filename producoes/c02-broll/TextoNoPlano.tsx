// Texto preso a um plano rastreado (parapeito): a matriz CSS de cada quadro vem de scripts/rastrear-plano.py.
import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
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
  // sai de trás da árvore: desliza pelo plano do parapeito (da direita para a esquerda) e sobe um pouco
  const sobe = interpolate(fr, [0, 26], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.exp),
  });
  const aparece = interpolate(fr, [0, 6], [0, 1], clamp);
  // a árvore (recorte por quadro) fica POR CIMA do texto
  const n = String(primeiro + fr).padStart(3, "0");
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
          height: 465,
          transformOrigin: "0 0",
          transform: `matrix3d(${t.matriz.join(",")})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 14,
          opacity: aparece * sai,
        }}
      >
        <div
          style={{
            transform: `translate(${(1 - sobe) * 620}px, ${(1 - sobe) * 30}px)`,
            textAlign: "center",
          }}
        >
          <div style={linha("#eef3f6", 208)}>TRANSFORMAR</div>
          <div style={linha(c.amber, 186)}>COMPLETAMENTE</div>
        </div>
      </div>
      <Img
        src={staticFile(`entrada/arvore-c02/${n}.png`)}
        style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}
      />
    </AbsoluteFill>
  );
};
