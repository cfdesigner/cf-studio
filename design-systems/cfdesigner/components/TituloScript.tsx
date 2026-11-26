import React from "react";
import { palette, fam, type BaseProps } from "./shared";

export type FonteScript = "kaushan" | "yellowtail" | "damion";
export type FundoTitulo = "preto" | "ambar" | "branco";

export type TituloScriptProps = BaseProps & {
  /** Primeira linha, em Montserrat 800 (ex.: "Quem dirige"). */
  linha1: string;
  /** Texto curto antes da palavra de destaque, na segunda linha (ex.: "é", "ao"). */
  prefixo?: string;
  /** A palavra em letra de pincel (ex.: "você."). */
  palavra: string;
  /** kaushan = principal (escolha do dono); yellowtail = fluida; damion = redonda. */
  fonte?: FonteScript;
  /** Cor do fundo onde o título será colocado. Define as cores sozinho. */
  fundo?: FundoTitulo;
  /** Corpo da letra quadrada em px (a de pincel é proporcional). */
  tamanho?: number;
  /** Traço fino sob a palavra de pincel. Padrão: só na kaushan. */
  sublinhado?: boolean;
};

const PRESET = {
  // escala da letra de pincel, quanto sobe sobre a linha de cima (em % do tamanho), giro, entrelinha
  kaushan: { escala: 1.27, sobe: 0.17, giro: -5, linha: 0.82, familia: fam.script },
  yellowtail: { escala: 1.35, sobe: 0.18, giro: -4, linha: 0.74, familia: fam.scriptFluida },
  damion: { escala: 1.28, sobe: 0.17, giro: -3, linha: 0.8, familia: fam.scriptRedonda },
} as const;

/**
 * Título com a mistura de letra quadrada (Montserrat 800) e uma palavra em letra de pincel
 * que sobe e sobrepõe a linha de cima. Pedido pelo dono em 26/11/2026; opção A (Kaushan, âmbar sobre preto) é a preferida.
 * Cores seguem a regra do carrossel: âmbar só sobre preto; sobre âmbar ou branco a palavra é preta ou branca.
 */
export const TituloScript: React.FC<TituloScriptProps> = ({
  linha1,
  prefixo,
  palavra,
  fonte = "kaushan",
  fundo = "preto",
  tamanho = 150,
  sublinhado,
  scale = 1,
  style,
}) => {
  const c = palette("cinema");
  const p = PRESET[fonte];
  const size = tamanho * scale;
  const corBase = fundo === "preto" ? "#ffffff" : c.void;
  const marcaTexto = fonte === "damion" && fundo === "branco";
  const corPalavra =
    fundo === "preto" ? c.amber : fonte === "yellowtail" && fundo === "ambar" ? "#ffffff" : c.void;
  const sombra =
    fonte === "yellowtail" && fundo === "ambar"
      ? `${size * 0.035}px ${size * 0.035}px 0 ${c.void}`
      : undefined;
  const traco = sublinhado ?? fonte === "kaushan";
  const corTraco = fundo === "preto" ? c.amber : c.void;

  return (
    <div
      style={{
        fontFamily: fam.heading,
        fontWeight: 800,
        fontSize: size,
        letterSpacing: "-0.025em",
        lineHeight: p.linha,
        color: corBase,
        ...style,
      }}
    >
      <div style={{ whiteSpace: "nowrap" }}>{linha1}</div>
      <div style={{ whiteSpace: "nowrap" }}>
        {prefixo ? <span>{prefixo} </span> : null}
        <span
          style={{
            position: "relative",
            display: "inline-block",
            marginLeft: size * 0.04,
            fontFamily: p.familia,
            fontWeight: 400,
            letterSpacing: 0,
            fontSize: size * p.escala,
            lineHeight: 1,
            color: corPalavra,
            textShadow: sombra,
            transform: `rotate(${p.giro}deg) translateY(${-size * p.sobe}px)`,
            zIndex: 2,
          }}
        >
          {marcaTexto ? (
            <span
              style={{
                position: "absolute",
                left: "-0.08em",
                right: "-0.12em",
                top: "0.2em",
                bottom: "-0.02em",
                background: c.amber,
                borderRadius: "0.16em",
                zIndex: -1,
              }}
            />
          ) : null}
          {palavra}
          {traco ? (
            <svg
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                left: "-0.04em",
                right: "0.02em",
                bottom: "-0.06em",
                width: "100%",
                height: "0.14em",
                overflow: "visible",
              }}
            >
              <path
                d="M2 14 C 25 2, 70 2, 98 10"
                stroke={corTraco}
                strokeWidth={Math.max(2, size * 0.03)}
                fill="none"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          ) : null}
        </span>
      </div>
    </div>
  );
};
