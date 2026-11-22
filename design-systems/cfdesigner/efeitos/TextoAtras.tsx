import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../tokens";
import "../fonts";

const c = colors.cinema;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Um pedaço de texto de uma linha. Tamanho em px num quadro de 1080 de largura. */
export type ParteTextoAtras = {
  texto: string;
  tamanho: number;
  /** Padrão: branco gelo (`ink`). Use `colors.cinema.amber` para o destaque. */
  cor?: string;
};

export type TextoAtrasProps = {
  /** Linhas de baixo pra cima na ordem de leitura. Cada linha tem 1 ou mais partes (tamanhos diferentes, alinhadas pela base). */
  linhas: ParteTextoAtras[][];
  /** Pasta (em public/) com a pessoa recortada: 001.png, 002.png... (scripts/recortar-pessoa.py). */
  pessoa: string;
  /** Quantos PNGs existem na pasta. */
  quadros: number;
  /** Quadro, dentro da `<Sequence>`, em que o texto começa a subir. */
  entra: number;
  /** Quadro em que o texto some (normalmente o corte). Padrão: até o fim da sequência. */
  sai?: number;
  /** Posição do fundo do bloco de texto, em % da altura (padrão 41%: o texto fica da cabeça para cima). */
  fundoPct?: number;
  /** Se a `<Sequence>` não começa no quadro 0 do recorte, quantos quadros pular. */
  deslocamento?: number;
  /** Escurecimento do fundo para o texto ler (0 a 1). Padrão 0,07: quase nada. */
  escurece?: number;
};

/**
 * Texto gigante ATRÁS da pessoa (recorte por quadro). Entra de baixo para cima, com a opacidade indo de 0 a 100%,
 * uma linha logo depois da outra; a pessoa recortada fica por cima do texto.
 *
 * Coloque dentro de uma `<Sequence>` por cima do vídeo da pessoa (o vídeo é do chamador).
 * Aprovado pelo dono no C02: "MUITO" (170) + "MAIS" (310) em branco gelo, "INTERESSANTE" (222) em âmbar.
 * Regras: a pessoa fica à frente de tudo; texto só da cabeça para cima; um único destaque âmbar.
 */
export const TextoAtras: React.FC<TextoAtrasProps> = ({
  linhas,
  pessoa,
  quadros,
  entra,
  sai,
  fundoPct = 41,
  deslocamento = 0,
  escurece = 0.07,
}) => {
  const fr = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const k = width / 1080;
  const fim = sai ?? durationInFrames;

  const sobe = (atraso: number) =>
    interpolate(fr, [entra + atraso, entra + atraso + 16], [0, 1], {
      ...clamp,
      easing: Easing.out(Easing.exp),
    });
  const escuro = interpolate(fr, [entra, entra + 14], [0, escurece], clamp);
  const n = String(Math.min(fr + deslocamento + 1, quadros)).padStart(3, "0");
  const visivel = fr >= entra && fr < fim;

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "#000", opacity: visivel ? escuro : 0 }} />
      {visivel && (
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: height * (1 - fundoPct / 100),
          }}
        >
          {linhas.map((partes, i) => {
            const p = sobe(i * 4);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 26 * k,
                  opacity: p,
                  transform: `translateY(${(1 - p) * 150 * k}px)`,
                }}
              >
                {partes.map((parte) => (
                  <span
                    key={parte.texto}
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: parte.tamanho * k,
                      lineHeight: 0.9,
                      color: parte.cor ?? c.ink,
                      whiteSpace: "nowrap",
                      letterSpacing: 2 * k,
                      textShadow: "0 6px 40px rgba(0,0,0,0.3)",
                    }}
                  >
                    {parte.texto}
                  </span>
                ))}
              </div>
            );
          })}
        </AbsoluteFill>
      )}
      <AbsoluteFill>
        <Img
          src={staticFile(`${pessoa}/${n}.png`)}
          style={{ width: "100%", height: "100%" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
