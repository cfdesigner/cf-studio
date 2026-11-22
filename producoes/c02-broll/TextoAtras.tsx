// Texto gigante ATRÁS da pessoa (recorte por quadro em public/entrada/pessoa-c02/, ignorado pelo Git).
import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { colors } from "../../design-systems/cfdesigner";
import "../../design-systems/cfdesigner/fonts";

const c = colors.cinema;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const BRANCO = "#eef3f6";
const SOMBRA = "0 6px 40px rgba(0,0,0,0.3)";
const fonte = (tamanho: number, cor: string): React.CSSProperties => ({
  fontFamily: "Bebas Neue, sans-serif",
  fontSize: tamanho,
  lineHeight: 0.9,
  color: cor,
  whiteSpace: "nowrap",
  letterSpacing: 2,
  textShadow: SOMBRA,
});

export const TextoAtras: React.FC<{
  /** Quadro (no vídeo) em que o texto começa a entrar. */
  entra: number;
  /** Quadro em que o texto some (corte). */
  sai: number;
  /** Posição do fundo do bloco, em px do topo. */
  fundo?: number;
}> = ({ entra, sai, fundo = 790 }) => {
  const fr = useCurrentFrame();
  // cada linha sobe de baixo (opacidade 0 a 100%), uma logo depois da outra
  const sobe = (atraso: number) =>
    interpolate(fr, [entra + atraso, entra + atraso + 16], [0, 1], {
      ...clamp,
      easing: Easing.out(Easing.exp),
    });
  const estilo = (p: number): React.CSSProperties => ({
    opacity: p,
    transform: `translateY(${(1 - p) * 150}px)`,
  });
  const escurece = interpolate(fr, [entra, entra + 14], [0, 0.07], clamp);
  const visivel = fr >= entra && fr < sai;
  const n = String(Math.min(fr + 1, 108)).padStart(3, "0");
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile("entrada/c02-broll.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <AbsoluteFill style={{ background: "#000", opacity: escurece }} />
      {visivel && (
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 1920 - fundo,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 26,
              ...estilo(sobe(0)),
            }}
          >
            <span style={fonte(170, BRANCO)}>MUITO</span>
            <span style={fonte(310, BRANCO)}>MAIS</span>
          </div>
          <div style={{ ...fonte(222, c.amber), ...estilo(sobe(4)) }}>
            INTERESSANTE
          </div>
        </AbsoluteFill>
      )}
      {/* a pessoa recortada, por cima do texto */}
      <AbsoluteFill>
        <Img src={staticFile(`entrada/pessoa-c02/${n}.png`)} style={{ width: "100%", height: "100%" }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const C02Cena1Teste: React.FC = () => (
  <TextoAtras entra={Math.round(2.3 * 30)} sai={107} />
);
