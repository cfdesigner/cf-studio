import React, { useMemo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  buildPages,
  tiraPontoFinal,
  type Caption,
} from "../../../tecnicas/legendas/texto";
import { colors, fonts } from "../tokens";
import { clamp, outExpo } from "../movimento";
import "../fonts";

export type LegendaProps = {
  /** Palavras com tempo (de scripts/transcrever.py ou do cortar-pausas.py). */
  captions: Caption[];
  /** Palavras-chave em ouro (qualquer caixa, com ou sem acento; compara sem pontuação). */
  destaques?: string[];
  /** Base da legenda em px (1080×1920): a legenda termina aqui. Padrão: logo acima do quadro do rosto. */
  base: number;
  /** "acumula": as palavras do grupo vão aparecendo uma a uma e ficam (padrão). "uma": só a palavra falada. */
  modo?: "acumula" | "uma";
  /** Tamanho em px na base de 1080 (padrão 60). */
  tamanho?: number;
  maxPalavras?: number;
};

const limpa = (s: string) =>
  s
    .replace(/[.,!?…:;"“”()]/g, "")
    .trim()
    .toLowerCase();

/**
 * Legenda palavra por palavra do tiago-lemos-01.
 * Poppins 700 branca, sem tarja, sombra suave. Palavra-chave em ouro. Grupos de até 3 palavras
 * (nunca terminam em artigo/preposição), centralizados. NUNCA termina com ponto final nem reticências.
 */
export const Legenda: React.FC<LegendaProps> = ({
  captions,
  destaques = [],
  base,
  modo = "acumula",
  tamanho = 60,
  maxPalavras = 3,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const k = width / 1080;
  const t = (frame / fps) * 1000;
  const pages = useMemo(
    () =>
      buildPages(captions, [], {
        maxWords: maxPalavras,
        maxChars: 24,
        maxGapMs: 450,
        carryStopwords: true,
      }),
    [captions, maxPalavras],
  );
  const chaves = useMemo(() => new Set(destaques.map(limpa)), [destaques]);

  const idx = pages.findIndex((p, i) => {
    const prox = pages[i + 1];
    const fim = prox ? prox.startMs : p.endMs + 260;
    return t >= p.startMs - 40 && t < Math.min(fim, p.endMs + 260);
  });
  if (idx < 0) return null;
  const page = pages[idx];
  const ultima = page.words.length - 1;

  const visiveis = page.words
    .map((w, i) => ({ w, i }))
    .filter(({ w }) => t >= w.startMs - 40);
  const mostrar =
    modo === "uma" ? visiveis.slice(-1) : visiveis;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: (base - 200) * k,
        height: 200 * k,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: `0 ${60 * k}px`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontFamily: fonts.legenda,
          fontWeight: 700,
          fontSize: tamanho * k,
          lineHeight: 1.1,
          textAlign: "center",
          color: colors.branco,
          textShadow: "0 2px 14px rgba(0,0,0,0.7), 0 0 2px rgba(0,0,0,0.5)",
          whiteSpace: "nowrap",
        }}
      >
        {mostrar.map(({ w, i }, n) => {
          const texto = i === ultima ? tiraPontoFinal(w.text.trim()) : w.text.trim();
          const dt = (t - (w.startMs - 40)) / (1000 / fps);
          const p = outExpo(interpolate(dt, [0, 5], [0, 1], clamp));
          const chave = chaves.has(limpa(w.text));
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginLeft: n ? 0.28 * tamanho * k : 0,
                opacity: p,
                transform: `translateY(${(1 - p) * 14 * k}px) scale(${0.9 + 0.1 * p})`,
                color: chave ? colors.ouro : colors.branco,
              }}
            >
              {texto}
            </span>
          );
        })}
      </div>
    </div>
  );
};
