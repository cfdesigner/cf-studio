import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  buildPages,
  pickKeywordIndex,
  tiraPontoFinal,
  type Caption,
  type PunchLine,
} from "../../../tecnicas/legendas/texto";
import { colors } from "../tokens";
import { fam } from "./shared";
import "../fonts";

export type LegendasProps = {
  /** Entrelinha da legenda do dia a dia (padrão 1,12, escolha do dono). */
  entrelinha?: number;
  /** Palavras com tempo, de scripts/transcrever.py (ou @remotion/captions). */
  captions: Caption[];
  /** Frases de efeito aprovadas pelo dono. Viram o "Título de cinema". */
  punchLines?: PunchLine[];
};

const c = colors.cinema;
const clean = (s: string) => s.replace(/[.,!?…:;"“”()]/g, "").trim();

/** Fonte em px que cabe `chars` letras de Bebas em `maxW`. */
const fit = (chars: number, maxW: number, max: number, min: number) =>
  Math.max(min, Math.min(max, maxW / (Math.max(chars, 1) * 0.43)));

/**
 * Legendas do CFDesigner. Sempre sobre o vídeo, acima dos ~24% de baixo (botões de Reels/Shorts).
 * - Dia a dia: Montserrat 700, contorno preto fino, sem tarja; a palavra falada fica em âmbar.
 * - Frase de efeito: "Título de cinema" (palavra-chave gigante em âmbar, resto pequeno em branco).
 */
export const Legendas: React.FC<LegendasProps> = ({
  entrelinha = 1.12,
  captions,
  punchLines = [],
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = (frame / fps) * 1000;
  const k = width / 1080;
  const pages = useMemo(
    () => buildPages(captions, punchLines),
    [captions, punchLines],
  );

  const zone: React.CSSProperties = {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height * 0.24,
  };

  const punch = punchLines.find((p) => t >= p.startMs && t < p.endMs);
  if (punch) {
    const words = captions.filter(
      (w) => w.startMs >= punch.startMs && w.startMs < punch.endMs,
    );
    const texts = words.map((w) => clean(w.text));
    // Interrogação e exclamação são bem-vindas; ponto final nunca.
    const lastRaw = words.length ? words[words.length - 1].text.trim() : "";
    if (texts.length && /[?!]$/.test(lastRaw))
      texts[texts.length - 1] += lastRaw.slice(-1);
    const byName = punch.keyword
      ? texts.findIndex(
          (w) =>
            clean(w).toLowerCase() ===
            clean(punch.keyword as string).toLowerCase(),
        )
      : -1;
    const ki = byName >= 0 ? byName : pickKeywordIndex(texts);
    const above = texts.slice(0, ki).join(" ");
    const below = texts.slice(ki + 1).join(" ");
    const maxW = 960 * k;
    const dim = interpolate(
      t,
      [punch.startMs, punch.startMs + 200, punch.endMs - 150, punch.endMs],
      [0, 1, 1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );
    const push = interpolate(t, [punch.startMs, punch.endMs], [1, 1.06], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const line: React.CSSProperties = {
      fontFamily: fam.display,
      textTransform: "uppercase",
      lineHeight: 0.95,
      letterSpacing: "0.02em",
      textAlign: "center",
      color: c.ink,
    };
    return (
      <AbsoluteFill>
        <AbsoluteFill
          style={{
            background: `rgba(11,12,14,${punch.escurece ?? 0.4})`,
            opacity: dim,
          }}
        />
        <AbsoluteFill style={zone}>
          <div
            style={{
              display: "grid",
              justifyItems: "center",
              gap: 6 * k,
              transform: `scale(${push})`,
              textShadow: "0 6px 40px rgba(0,0,0,.8)",
            }}
          >
            {above ? (
              <div
                style={{
                  ...line,
                  fontSize: fit(above.length, maxW, (punch.antesMax ?? 96) * k, 40 * k),
                }}
              >
                {above}
              </div>
            ) : null}
            <div
              style={{
                ...line,
                color: c.amberText,
                fontSize: fit(texts[ki]?.length ?? 1, maxW, 300 * k, 110 * k),
              }}
            >
              {texts[ki]}
            </div>
            {below ? (
              <div
                style={{
                  ...line,
                  fontSize: punch.depoisEscala
                    ? fit(texts[ki]?.length ?? 1, maxW, 300 * k, 110 * k) *
                      punch.depoisEscala
                    : fit(below.length, maxW, 96 * k, 48 * k),
                }}
              >
                {below}
              </div>
            ) : null}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  const i = pages.findIndex((p, idx) => {
    const holdEnd = Math.min(
      p.endMs + 300,
      pages[idx + 1]?.startMs ?? Infinity,
    );
    return t >= p.startMs && t < holdEnd;
  });
  if (i < 0) return null;
  const page = pages[i];
  let active = 0;
  page.words.forEach((w, idx) => {
    if (w.startMs <= t) active = idx;
  });
  const fadeIn = interpolate(t, [page.startMs, page.startMs + 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={zone}>
      <div
        style={{
          maxWidth: 900 * k,
          opacity: fadeIn,
          fontFamily: fam.heading,
          fontWeight: 700,
          fontSize: 64 * k,
          lineHeight: entrelinha,
          color: c.ink,
          textAlign: "center",
          textWrap: "balance",
          WebkitTextStroke: `${3 * k}px #000`,
          paintOrder: "stroke fill",
          textShadow: "0 2px 12px rgba(0,0,0,.5)",
        }}
      >
        {page.words.map((w, idx) => (
          <span
            key={idx}
            style={{ color: idx === active ? c.amberText : c.ink }}
          >
            {idx === page.words.length - 1
              ? tiraPontoFinal(idx === 0 ? w.text.trimStart() : w.text)
              : idx === 0
                ? w.text.trimStart()
                : w.text}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
