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
  type Caption,
  type PunchLine,
} from "../../../tecnicas/legendas/texto";
import "../fonts";
import { colors, engrossar, entrelinha, fontFamilies } from "../tokens";
import { batida, clamp } from "../movimento";

export type LegendasProps = {
  /** Palavras com tempo, de scripts/transcrever.py (ou @remotion/captions). */
  captions: Caption[];
  /** Frases de efeito aprovadas pelo dono. A palavra-chave vira o "maracatu" gigante. */
  punchLines?: PunchArrasta[];
};

/** Frase de efeito; com `atras` a palavra-chave NÃO é desenhada aqui (ela vai atrás da pessoa, pelo `TextoAtras`). */
export type PunchArrasta = PunchLine & { atras?: boolean };

const clean = (s: string) => s.replace(/[.,!?…:;"“”()]/g, "").trim();
const stroke = (tam: number, cor: string): React.CSSProperties => ({
  WebkitTextStroke: `${tam * engrossar.padrao}px ${cor}`,
  paintOrder: "stroke fill",
});
const zen = (tam: number, cor: string): React.CSSProperties => ({
  fontFamily: fontFamilies.display,
  textTransform: "uppercase",
  fontSize: tam,
  lineHeight: entrelinha.titulo,
  color: cor,
  ...stroke(tam, cor),
});
/** Tamanho em px que cabe `chars` letras de Zenzero em `maxW` (largura média 0,435 em). */
const cabe = (chars: number, maxW: number, max: number, min: number) =>
  Math.max(min, Math.min(max, maxW / (Math.max(chars, 1) * 0.435)));

/**
 * Legendas do Arrasta Ilha (escolhas do dono, 27/11/2026). Sempre acima dos ~24% de baixo (botões do Reels).
 * - Dia a dia (ajuste do dono, 28/11/2026): letra secundária simples (Carlito negrito), pequena, branca, minúscula, como o "todo domingo tem" da frase de efeito; a palavra falada em laranja vivo.
 * - Frase de efeito (opção F): "todo domingo tem" pequeno em Carlito negrito branco (minúsculo), palavra-chave GIGANTE em Zenzero laranja,
 *   o resto em Zenzero branca; fundo escurecido; entrelinha curta. Nunca termina com ponto final.
 */
export const Legendas: React.FC<LegendasProps> = ({
  captions,
  punchLines = [],
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = (frame / fps) * 1000;
  const k = width / 1080;
  const pages = useMemo(
    () => buildPages(captions, punchLines, { maxChars: 34, maxWords: 7 }),
    [captions, punchLines],
  );
  const zone: React.CSSProperties = {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height * 0.24,
  };
  const maxW = 940 * k;

  const punch = punchLines.find((p) => t >= p.startMs && t < p.endMs);
  if (punch) {
    const words = captions.filter(
      (w) => w.startMs >= punch.startMs && w.startMs < punch.endMs,
    );
    const texts = words.map((w) => clean(w.text));
    const last = words.length ? words[words.length - 1].text.trim() : "";
    if (texts.length && /[?!]$/.test(last))
      texts[texts.length - 1] += last.slice(-1);
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
    const dim = interpolate(
      t,
      [punch.startMs, punch.startMs + 200, punch.endMs - 150, punch.endMs],
      [0, 1, 1, 0],
      clamp,
    );
    const kw = interpolate(
      t,
      [punch.startMs, punch.startMs + 420],
      [0, 1],
      clamp,
    );
    const sobe = interpolate(batida(kw), [0, 1], [90 * k, 0]);
    const push = interpolate(t, [punch.startMs, punch.endMs], [1, 1.05], clamp);
    const kwTam = cabe(texts[ki]?.length ?? 1, maxW, 236 * k, 120 * k);
    return (
      <AbsoluteFill>
        <AbsoluteFill
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0) 35%, rgba(0,0,0,${(punch.escurece ?? 0.55) * 1.4}) 100%)`,
            opacity: dim,
          }}
        />
        <AbsoluteFill style={zone}>
          <div
            style={{
              width: maxW,
              display: "grid",
              justifyItems: "center",
              textAlign: "center",
              transform: `scale(${push})`,
              textShadow: "0 5px 26px rgba(0,0,0,.6)",
            }}
          >
            {above ? (
              <div
                style={{
                  fontFamily: fontFamilies.texto,
                  fontWeight: 700,
                  fontSize: Math.min(58 * k, maxW / (above.length * 0.5)),
                  lineHeight: 1,
                  color: "#ffffff",
                  opacity: interpolate(
                    t,
                    [punch.startMs, punch.startMs + 200],
                    [0, 1],
                    clamp,
                  ),
                }}
              >
                {above}
              </div>
            ) : null}
            {punch.atras ? null : (
              <div
                style={{
                  ...zen(kwTam, colors.laranjaVivo),
                  opacity: kw,
                  transform: `translateY(${sobe}px)`,
                }}
              >
                {texts[ki]}
              </div>
            )}
            {below ? (
              <div
                style={{
                  ...zen(cabe(below.length, maxW, 150 * k, 70 * k), "#ffffff"),
                  marginTop: punch.atras ? 12 * k : -6 * k,
                  opacity: interpolate(
                    t,
                    [punch.startMs + 180, punch.startMs + 420],
                    [0, 1],
                    clamp,
                  ),
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
  const fadeIn = interpolate(
    t,
    [page.startMs, page.startMs + 90],
    [0, 1],
    clamp,
  );
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 45%, rgba(0,0,0,0.45) 100%)",
          opacity: fadeIn,
        }}
      />
      <AbsoluteFill style={zone}>
        <div
          style={{
            width: maxW,
            opacity: fadeIn,
            textAlign: "center",
            textWrap: "balance",
            fontFamily: fontFamilies.texto,
            fontWeight: 700,
            fontSize: 58 * k,
            lineHeight: 1.12,
            color: "#ffffff",
            textShadow: "0 3px 14px rgba(0,0,0,.65)",
          }}
        >
          {page.words.map((w, idx) => {
            const entra = interpolate(
              t,
              [w.startMs, w.startMs + 160],
              [0, 1],
              clamp,
            );
            const cor = idx === active ? colors.laranjaVivo : "#ffffff";
            return (
              <span
                key={idx}
                style={{
                  display: "inline-block",
                  marginRight: "0.28em",
                  color: cor,
                  opacity: entra,
                }}
              >
                {clean(w.text) +
                  (/[?!,]$/.test(w.text.trim()) ? w.text.trim().slice(-1) : "")}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
