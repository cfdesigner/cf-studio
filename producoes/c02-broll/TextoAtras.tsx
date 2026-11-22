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

type Linha = { texto: string; tamanho: number; cor: string };

/** Linhas do texto de fundo (cada uma ocupa a largura do quadro). */
const LINHAS: Linha[] = [
  { texto: "MUITO MAIS", tamanho: 270, cor: "#eef3f6" },
  { texto: "INTERESSANTE", tamanho: 222, cor: c.amber },
];

export const TextoAtras: React.FC<{
  /** Quadro (no vídeo) em que o texto começa a entrar. */
  entra: number;
  /** Quadro em que o texto some (corte). */
  sai: number;
  /** Posição do fundo do bloco, em px do topo. */
  fundo?: number;
}> = ({ entra, sai, fundo = 790 }) => {
  const fr = useCurrentFrame();
  const p = interpolate(fr, [entra, entra + 14], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.exp),
  });
  const escurece = interpolate(fr, [entra, entra + 14], [0, 0.32], clamp);
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
            opacity: p,
            transform: `translateY(${(1 - p) * 40}px) scale(${1.07 - p * 0.07})`,
            filter: `blur(${(1 - p) * 14}px)`,
          }}
        >
          {LINHAS.map((l) => (
            <div
              key={l.texto}
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: l.tamanho,
                lineHeight: 0.9,
                color: l.cor,
                whiteSpace: "nowrap",
                letterSpacing: 2,
                textShadow: "0 6px 40px rgba(0,0,0,0.35)",
              }}
            >
              {l.texto}
            </div>
          ))}
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
