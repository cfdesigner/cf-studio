import React from "react";
import { AbsoluteFill, Easing, interpolate, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { colors, fontFamilies } from "../../design-systems/cfdesigner/tokens";
import "../../design-systems/cfdesigner/fonts";
import { clamp, outExpo } from "../../design-systems/cfdesigner/movimento";

export const HYPER_FRAMES = 121;
export type Versao = "calma" | "interessante" | "agressiva";
const c = colors.cinema;
const outSoft = Easing.bezier(0.22, 0.61, 0.36, 1);

/** Progresso 0→1 entre dois quadros, com easing. */
const p = (f: number, a: number, b: number, easing: (t: number) => number = outExpo) =>
  interpolate(f, [a, b], [0, 1], { ...clamp, easing });

const kicker: React.CSSProperties = {
  fontFamily: fontFamilies.heading, fontWeight: 300, fontSize: 28, textTransform: "uppercase",
  color: c.inkMuted, textShadow: "0 2px 14px rgba(0,0,0,.7)", whiteSpace: "nowrap",
};
const titulo: React.CSSProperties = {
  fontFamily: fontFamilies.display, fontSize: 104, lineHeight: 0.95, textTransform: "uppercase",
  color: c.ink, textShadow: "0 4px 28px rgba(0,0,0,.65)", whiteSpace: "nowrap",
};
const apoio: React.CSSProperties = {
  fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 30, letterSpacing: "0.2em", textTransform: "uppercase",
  color: c.amberText, textShadow: "0 2px 16px rgba(0,0,0,.7)", whiteSpace: "nowrap",
};
const fio = (w = 150): React.CSSProperties => ({ height: 4, width: w, background: c.amber, transformOrigin: "0 50%" });
const bloco: React.CSSProperties = { display: "grid", gap: 14, justifyItems: "start" };

/** Texto que sobe letra por letra por trás de uma máscara reta. */
const Mascara: React.FC<{ texto: string; f: number; inicio: number; passo: number; dur: number; estilo: React.CSSProperties }> = ({
  texto, f, inicio, passo, dur, estilo,
}) => (
  <div style={{ overflow: "hidden", padding: 24, margin: -24 }}>
    <div style={{ ...estilo, whiteSpace: "pre" }}>
      {texto.split("").map((ch, i) => {
        const q = p(f, inicio + i * passo, inicio + i * passo + dur);
        return (
          <span key={i} style={{ display: "inline-block", transform: `translateY(${(1 - q) * 115}%)`, opacity: q > 0 ? 1 : 0 }}>
            {ch}
          </span>
        );
      })}
    </div>
  </div>
);

/** 1. Calma: tudo emerge devagar do desfoque, o espaçamento das letras fecha, o fio se desenha lento. */
const Calma: React.FC<{ f: number }> = ({ f }) => {
  const k = p(f, 10, 48, outSoft);
  const t = p(f, 16, 72, outSoft);
  const l = p(f, 46, 88, outSoft);
  const a = p(f, 60, 94, outSoft);
  return (
    <div style={bloco}>
      <div style={{ ...kicker, opacity: k * 0.85, filter: `blur(${(1 - k) * 8}px)`, letterSpacing: `${0.2 + (1 - k) * 0.12}em` }}>Workflow:</div>
      <div style={{ ...titulo, opacity: t, filter: `blur(${(1 - t) * 16}px)`, letterSpacing: `${0.03 + (1 - t) * 0.16}em`, transform: `translateY(${(1 - t) * 18}px)` }}>
        hyper-realistic-skill
      </div>
      <div style={{ ...fio(), transform: `scaleX(${l})` }} />
      <div style={{ ...apoio, opacity: a, filter: `blur(${(1 - a) * 8}px)`, transform: `translateY(${(1 - a) * 12}px)` }}>Seedance 2.5</div>
    </div>
  );
};

/** 2. Interessante: cada letra sobe de uma máscara em cascata; o fio se desenha com um brilho que o atravessa. */
const Interessante: React.FC<{ f: number; titulo: string; apoio: string }> = ({ f, titulo: tit, apoio: apo }) => {
  const l = p(f, 18, 34);
  const brilho = p(f, 28, 44, Easing.inOut(Easing.quad));
  return (
    <div style={bloco}>
      <Mascara texto="WORKFLOW:" f={f} inicio={1} passo={0.6} dur={10} estilo={{ ...kicker, letterSpacing: "0.2em", opacity: 0.85 }} />
      <Mascara texto={tit.toUpperCase()} f={f} inicio={4} passo={0.7} dur={14} estilo={{ ...titulo, letterSpacing: "0.03em" }} />
      <div style={{ ...fio(), transform: `scaleX(${l})`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, width: 70, left: -70 + brilho * 230, background: "linear-gradient(90deg, transparent, rgba(255,255,255,.95), transparent)" }} />
      </div>
      <Mascara texto={apo.toUpperCase()} f={f} inicio={24} passo={0.8} dur={12} estilo={apoio} />
    </div>
  );
};

/** 3. Agressiva: palavras batem uma a uma com escala e tremor curto; o fio estala. */
const Agressiva: React.FC<{ f: number }> = ({ f }) => {
  const palavras = ["HYPER-", "REALISTIC-", "SKILL"];
  const inicios = palavras.map((_, i) => 5 + i * 4);
  const tremor = inicios.reduce((s, ini) => {
    const d = f - ini;
    return d < 0 ? s : s + Math.sin(d * 2.4) * 13 * Math.exp(-d / 3);
  }, 0);
  const k = p(f, 2, 6);
  const l = p(f, 17, 22);
  const a = p(f, 21, 27);
  return (
    <div style={{ ...bloco, transform: `translateX(${tremor}px)` }}>
      <div style={{ ...kicker, letterSpacing: "0.2em", opacity: k * 0.9, transform: `translateX(${(1 - k) * -34}px)` }}>Workflow:</div>
      <div style={titulo}>
        {palavras.map((w, i) => {
          const q = p(f, inicios[i], inicios[i] + 5);
          return (
            <span key={i} style={{ display: "inline-block", letterSpacing: "0.03em", transformOrigin: "0 60%", opacity: Math.min(1, q * 3), filter: `blur(${(1 - q) * 10}px)`, transform: `translateX(${(1 - q) * -70}px) scale(${1 + (1 - q) * 0.35})` }}>
              {w}
            </span>
          );
        })}
      </div>
      <div style={{ ...fio(), transform: `scaleX(${l})` }} />
      <div style={{ ...apoio, opacity: Math.min(1, a * 2), transform: `translateX(${(1 - a) * -50}px)`, letterSpacing: `${0.2 - (1 - a) * 0.1}em` }}>Seedance 2.5</div>
    </div>
  );
};

/** Personagem intacto; só muda a aparição do texto (CFDesigner). Canto inferior esquerdo. */
export const HyperRealist: React.FC<{ versao: Versao; titulo?: string; apoio?: string; fonte?: string }> = ({
  versao, titulo = "hyper-realistic-skill", apoio = "Seedance 2.5", fonte = "entrada/hyper-realist.mov",
}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: c.void }}>
      <OffthreadVideo src={staticFile(fonte)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <AbsoluteFill style={{ background: "linear-gradient(to top, rgba(11,12,14,.55) 0%, rgba(11,12,14,0) 28%)" }} />
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "flex-start", padding: "0 72px 150px" }}>
        {versao === "calma" ? <Calma f={f} /> : versao === "interessante" ? <Interessante f={f} titulo={titulo} apoio={apoio} /> : <Agressiva f={f} />}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
