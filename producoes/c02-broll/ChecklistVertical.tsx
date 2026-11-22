// RASCUNHO (aguardando aprovação do dono): checklist VERTICAL para b-roll vertical. Se aprovado, vai para o design system.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fontFamilies } from "../../design-systems/cfdesigner";
import "../../design-systems/cfdesigner/fonts";

const c = colors.cinema;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type ItemV = { texto: string; marcaEmMs: number };

export const ChecklistVertical: React.FC<{
  titulo: string;
  itens: ItemV[];
  durationInFrames: number;
  variante?: "cartao" | "livre" | "mista";
  /** Perspectiva leve (graus). O sentido do Y é automático: o cartão fica virado para o centro da imagem. */
  inclinacaoX?: number;
  inclinacaoY?: number;
  esquerda?: number;
  topo?: number;
}> = ({ titulo, itens, durationInFrames, variante = "mista", inclinacaoX = 12, inclinacaoY = 14, esquerda = 48, topo = 250 }) => {
  const f = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const k = (width / 1080) * 1.3;
  const ms = (f / fps) * 1000;
  const endMs = (durationInFrames / fps) * 1000;
  const saida = interpolate(ms, [endMs - 250, endMs], [1, 0], clamp);
  const entra = interpolate(f, [0, 10], [0, 1], clamp);
  const cartao = variante !== "livre";
  const mista = variante === "mista";
  const centro = (esquerda + 270) * k / 1.3 <= 540 ? 1 : -1; // à esquerda: afasta o lado direito
  return (
    <AbsoluteFill style={{ opacity: saida * entra, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: esquerda * k,
          top: topo * k,
          padding: `${26 * k}px ${34 * k}px ${30 * k}px`,
          borderRadius: cartao ? 18 * k : 4 * k,
          background: cartao ? "rgba(11,12,14,0.82)" : "rgba(11,12,14,0.5)",
          backdropFilter: cartao ? undefined : `blur(${14 * k}px)`,
          border: cartao ? `${1 * k}px solid rgba(217,164,65,0.45)` : "none",
          borderLeft: mista || !cartao ? `${5 * k}px solid ${c.amber}` : undefined,
          transform: `perspective(${1100 * k}px) rotateX(${inclinacaoX}deg) rotateY(${centro * Math.abs(inclinacaoY)}deg)`,
          transformOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            fontFamily: fontFamilies.heading,
            fontWeight: 600,
            fontSize: 22 * k,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: c.amber,
            marginBottom: 20 * k,
          }}
        >
          {titulo}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 * k }}>
          {itens.map((it) => {
            const on = ms >= it.marcaEmMs;
            return (
              <div key={it.texto} style={{ display: "flex", alignItems: "center", gap: 18 * k }}>
                <div
                  style={{
                    width: 44 * k,
                    height: 44 * k,
                    boxSizing: "border-box",
                    borderRadius: 5 * k,
                    border: `${3 * k}px solid ${on ? c.amber : "rgba(238,242,245,0.7)"}`,
                    background: on ? c.amber : "rgba(11,12,14,0.35)",
                    display: "grid",
                    placeItems: "center",
                    flex: "none",
                  }}
                >
                  {on && (
                    <svg width={28 * k} height={28 * k} viewBox="0 0 32 32">
                      <path d="M5 17 L13 25 L27 7" stroke={c.void} strokeWidth={4.4} strokeLinecap="square" fill="none" />
                    </svg>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: fontFamilies.display,
                    fontSize: 78 * k,
                    lineHeight: 1,
                    letterSpacing: "0.01em",
                    textTransform: "uppercase",
                    color: on ? c.amber : c.ink,
                  }}
                >
                  {it.texto}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ITENS: ItemV[] = [
  { texto: "Direção", marcaEmMs: 700 },
  { texto: "Composição", marcaEmMs: 1400 },
  { texto: "Cor", marcaEmMs: 2300 },
  { texto: "Iluminação", marcaEmMs: 2650 },
  { texto: "Som", marcaEmMs: 3300 },
];
export const ChecklistTeste: React.FC<{ variante?: "cartao" | "livre" | "mista" }> = ({ variante }) => (
  <AbsoluteFill>
    <AbsoluteFillVideo />
    <ChecklistVertical titulo="O que muda a cena" itens={ITENS} durationInFrames={126} variante={variante} />
  </AbsoluteFill>
);
import { OffthreadVideo, staticFile } from "remotion";
const AbsoluteFillVideo: React.FC = () => (
  <OffthreadVideo src={staticFile("entrada/c02-broll.mp4")} startFrom={Math.round(8.6 * 30)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
);
