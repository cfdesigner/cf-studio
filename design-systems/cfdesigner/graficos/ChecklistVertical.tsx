import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "../fonts";
import { colors, fontFamilies } from "../tokens";

const c = colors.cinema;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type ChecklistVerticalItem = {
  texto: string;
  /** Instante (ms, contado desde o início da <Sequence>) em que a caixinha vira ✓ dourado. Marque uns 0,2 s ANTES da palavra dita. */
  marcaEmMs: number;
};

export type ChecklistVerticalProps = {
  /** Chamada pequena em cima (ex.: "O que muda a cena"). */
  titulo: string;
  itens: ChecklistVerticalItem[];
  /** Duração total em tela, em quadros (igual à da `<Sequence>`). */
  durationInFrames: number;
  /** Distância da esquerda, em px na base de 1080 de largura (padrão 62). */
  esquerda?: number;
  /** Distância do topo, em px na base de 1080 de largura (padrão 325). */
  topo?: number;
  /** Tamanho geral do cartão (padrão 1,3: letras de ~100 px). */
  escala?: number;
  /** Perspectiva leve no eixo X, em graus (padrão 12). */
  inclinacaoX?: number;
  /** Perspectiva leve no eixo Y, em graus (padrão 14). O sentido é automático: o cartão fica sempre virado para o centro da imagem. */
  inclinacaoY?: number;
  /** Fade de saída em ms (padrão 250). */
  saidaMs?: number;
};

/**
 * Checklist VERTICAL para vídeos e b-rolls verticais (versão em coluna do `ChecklistCard`, aprovada pelo dono no C02).
 * Cartão escuro de cantos arredondados com borda dourada fina, linha âmbar na lateral esquerda e perspectiva leve (X e Y)
 * virada para o centro da imagem. Itens em Bebas Neue com caixinha; cada uma vira ✓ dourado no instante marcado.
 * Entra com um fade rápido e sai com fade. Regra do dono: nunca na frente do rosto de ninguém (`esquerda`/`topo`).
 */
export const ChecklistVertical: React.FC<ChecklistVerticalProps> = ({
  titulo,
  itens,
  durationInFrames,
  esquerda = 62,
  topo = 325,
  escala = 1.3,
  inclinacaoX = 12,
  inclinacaoY = 14,
  saidaMs = 250,
}) => {
  const f = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const k0 = width / 1080;
  const k = k0 * escala;
  const ms = (f / fps) * 1000;
  const endMs = (durationInFrames / fps) * 1000;
  const opacity =
    interpolate(ms, [endMs - saidaMs, endMs], [1, 0], clamp) *
    interpolate(f, [0, 10], [0, 1], clamp);
  // cartão à esquerda do centro: afasta o lado direito (+); à direita: afasta o lado esquerdo (−)
  const centroCartao = esquerda * k0 + 180 * k;
  const sentidoY = centroCartao <= width / 2 ? 1 : -1;
  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: esquerda * k0,
          top: topo * k0,
          padding: `${26 * k}px ${34 * k}px ${30 * k}px`,
          borderRadius: 18 * k,
          background: "rgba(11,12,14,0.82)",
          border: `${1 * k}px solid rgba(217,164,65,0.45)`,
          borderLeft: `${5 * k}px solid ${c.amber}`,
          transform: `perspective(${1100 * k}px) rotateX(${inclinacaoX}deg) rotateY(${sentidoY * Math.abs(inclinacaoY)}deg)`,
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
              <div
                key={it.texto}
                style={{ display: "flex", alignItems: "center", gap: 18 * k }}
              >
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
                      <path
                        d="M5 17 L13 25 L27 7"
                        stroke={c.void}
                        strokeWidth={4.4}
                        strokeLinecap="square"
                        fill="none"
                      />
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
