import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { Logo, fontFamilies, imagery } from "../../design-systems/cfdesigner";
import "../../design-systems/cfdesigner/fonts";
import recorte from "./assets/retrato-recorte.png";

/** Carrossel criativo (base: versão 2 "Editorial"), com fundos coloridos da paleta da marca.
 *  p=1 Petróleo e claro · p=2 Âmbar e grafite · p=3 Claro com petróleo. */
const TOTAL = 8;

type Tema = {
  bg: string; ink: string; muted: string; acc: string; solid: string; onSolid: string;
  line: string; ghost: string; card: string; cardInk: string; escuro: boolean;
};
const T: Record<string, Tema> = {
  void: { bg: "#0b0c0e", ink: "#eef2f5", muted: "#9aa3ad", acc: "#e2b45a", solid: "#d9a441", onSolid: "#0b0c0e", line: "#2e3238", ghost: "rgba(238,242,245,0.06)", card: "#16181c", cardInk: "#eef2f5", escuro: true },
  petrol: { bg: "#0f4c5c", ink: "#eef2f5", muted: "#a8cbd3", acc: "#e2b45a", solid: "#d9a441", onSolid: "#0b0c0e", line: "rgba(238,242,245,0.2)", ghost: "rgba(238,242,245,0.09)", card: "#0b3642", cardInk: "#eef2f5", escuro: true },
  light: { bg: "#f3f4f5", ink: "#0b0c0e", muted: "#545c66", acc: "#0f4c5c", solid: "#0f4c5c", onSolid: "#eef2f5", line: "#d6dade", ghost: "rgba(15,76,92,0.07)", card: "#ffffff", cardInk: "#0b0c0e", escuro: false },
  amber: { bg: "#d9a441", ink: "#0b0c0e", muted: "rgba(11,12,14,0.68)", acc: "#ffffff", solid: "#0b0c0e", onSolid: "#e2b45a", line: "rgba(11,12,14,0.22)", ghost: "rgba(11,12,14,0.08)", card: "#0b0c0e", cardInk: "#eef2f5", escuro: false },
};
const SEQ: Record<number, string[]> = {
  1: ["petrol", "light", "petrol", "light", "light", "petrol", "light", "petrol"],
  2: ["amber", "void", "amber", "void", "void", "amber", "void", "amber"],
  3: ["light", "light", "light", "petrol", "light", "light", "petrol", "light"],
};

const Marca: React.FC<{ t: Tema; children: React.ReactNode }> = ({ t, children }) => (
  <span style={{ background: t.solid, color: t.onSolid, padding: "0 16px 4px", borderRadius: 16, display: "inline-block", lineHeight: 1.08 }}>{children}</span>
);

const Titulo: React.FC<{ t: Tema; linhas: React.ReactNode[]; size?: number; style?: React.CSSProperties }> = ({ t, linhas, size = 92, style }) => (
  <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: size, lineHeight: 1.12, letterSpacing: "-0.02em", color: t.ink, ...style }}>
    {linhas.map((l, i) => <div key={i}>{l}</div>)}
  </div>
);

const Ghost: React.FC<{ t: Tema; texto: string; size: number; style: React.CSSProperties }> = ({ t, texto, size, style }) => (
  <div style={{ position: "absolute", fontFamily: fontFamilies.display, fontSize: size, lineHeight: 0.8, letterSpacing: "0.02em", color: t.ghost, whiteSpace: "nowrap", textTransform: "uppercase", ...style }}>{texto}</div>
);

const Etiq: React.FC<{ t: Tema; children: React.ReactNode }> = ({ t, children }) => (
  <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 18, letterSpacing: "0.32em", textTransform: "uppercase", color: t.escuro ? t.acc : t.muted, marginBottom: 26 }}>{children}</div>
);

const Apoio: React.FC<{ t: Tema; children: React.ReactNode; style?: React.CSSProperties }> = ({ t, children, style }) => (
  <div style={{ fontFamily: fontFamilies.body, fontSize: 28, lineHeight: 1.4, color: t.muted, position: "absolute", ...style }}>{children}</div>
);

const Tilt: React.FC<{ src: string; pos?: string; style: React.CSSProperties; moldura?: number; sombra?: boolean }> = ({ src, pos = "50% 50%", style, moldura = 0, sombra = true }) => (
  <div style={{ position: "absolute", overflow: "hidden", borderRadius: moldura ? 8 : 22, background: "#fff", padding: moldura, boxShadow: sombra ? "0 40px 80px rgba(0,0,0,0.35)" : undefined, ...style }}>
    <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, display: "block", borderRadius: moldura ? 4 : 0 }} />
  </div>
);

const Fita: React.FC<{ t: Tema; texto: string; style: React.CSSProperties }> = ({ t, texto, style }) => (
  <div style={{ position: "absolute", left: -140, width: 1360, height: 70, background: t.solid, color: t.onSolid, display: "flex", alignItems: "center", overflow: "hidden", whiteSpace: "nowrap", fontFamily: fontFamilies.display, fontSize: 42, letterSpacing: "0.12em", ...style }}>
    {Array.from({ length: 4 }).map((_, i) => <span key={i} style={{ marginRight: 34 }}>{texto}</span>)}
  </div>
);

export const CarrosselCriativo: React.FC<{ n: number; p: number }> = ({ n, p }) => {
  const t = T[SEQ[p][Math.min(Math.max(n, 1), TOTAL) - 1]];
  const P = 88;
  const dentro = (e: React.ReactNode) => e;

  let corpo: React.ReactNode = null;

  if (n === 1) {
    corpo = (
      <>
        <Ghost t={t} texto="IA" size={980} style={{ right: -50, top: 200 }} />
        <div style={{ position: "absolute", left: P, top: 170 }}>
          <Etiq t={t}>Produção completa</Etiq>
          <Titulo t={t} size={132} linhas={["Vídeo com", <Marca t={t}>IA</Marca>]} style={{ lineHeight: 1.1 }} />
        </div>
        <Img src={recorte} style={{ position: "absolute", left: 90, bottom: 0, height: 940 }} />
        <Fita t={t} texto="ROTEIRO · STORYBOARD · EDIÇÃO · SOM · FECHO ·" style={{ bottom: 250, transform: "rotate(-5deg)" }} />
        <Apoio t={t} style={{ left: P, top: 560, fontWeight: 600, color: t.ink, fontFamily: fontFamilies.heading, fontSize: 28, width: 300 }}>Do roteiro ao fecho</Apoio>
      </>
    );
  } else if (n === 2) {
    corpo = (
      <>
        <Ghost t={t} texto="Método" size={430} style={{ left: -10, top: 880 }} />
        <div style={{ position: "absolute", left: P, top: 190 }}>
          <Etiq t={t}>O ponto</Etiq>
          <Titulo t={t} linhas={["IA gera clipe,", "filme exige", <Marca t={t}>método</Marca>]} size={100} />
        </div>
        <Tilt src={imagery.studioSetup} pos="38% 50%" style={{ left: 380, top: 700, width: 800, height: 470, transform: "perspective(1600px) rotateY(-14deg) rotate(-4deg)" }} />
        <Apoio t={t} style={{ left: P, top: 740, width: 270 }}>Cada etapa tem uma regra</Apoio>
      </>
    );
  } else if (n === 3) {
    const itens = ["Roteiro", "Storyboard", "Edição", "Som", "Fecho"];
    corpo = (
      <>
        <Ghost t={t} texto="5" size={1050} style={{ right: -40, top: 330 }} />
        <div style={{ position: "absolute", left: P, top: 190 }}>
          <Etiq t={t}>O método</Etiq>
          <Titulo t={t} linhas={["Cinco", <Marca t={t}>etapas</Marca>]} size={112} />
        </div>
        {itens.map((x, i) => (
          <div key={x} style={{ position: "absolute", left: P + i * 46, top: 560 + i * 118, width: 560, height: 92, borderRadius: 46, background: t.card, color: t.cardInk, border: `1px solid ${t.line}`, display: "flex", alignItems: "center", gap: 24, padding: "0 14px", boxShadow: t.escuro ? undefined : "0 18px 40px rgba(11,12,14,0.10)" }}>
            <div style={{ width: 64, height: 64, borderRadius: 32, background: t.solid, color: t.onSolid, fontFamily: fontFamilies.mono, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>{String(i + 1).padStart(2, "0")}</div>
            <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 38 }}>{x}</div>
          </div>
        ))}
      </>
    );
  } else if (n === 4) {
    const regras = [["Gancho em até 6 palavras", -3], ["Frases curtas, com ritmo de corte", 2], ["Número concreto, não adjetivo", -2]] as const;
    corpo = (
      <>
        <Ghost t={t} texto="Frase" size={470} style={{ left: -10, top: 1000 }} />
        <div style={{ position: "absolute", left: P, top: 190 }}>
          <Etiq t={t}>01 · Roteiro</Etiq>
          <Titulo t={t} linhas={["Uma ideia", <>por <Marca t={t}>frase</Marca></>]} size={112} />
        </div>
        {regras.map(([x, r], i) => (
          <div key={x} style={{ position: "absolute", left: P + (i === 1 ? 70 : 0), top: 590 + i * 190, width: 760, borderRadius: 24, background: t.card, color: t.cardInk, padding: "36px 40px", transform: `rotate(${r}deg)`, boxShadow: "0 24px 50px rgba(0,0,0,0.25)", display: "flex", gap: 28, alignItems: "center" }}>
            <div style={{ width: 20, height: 20, background: t.solid, transform: "rotate(45deg)", flex: "none" }} />
            <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 36, lineHeight: 1.2 }}>{x}</div>
          </div>
        ))}
      </>
    );
  } else if (n === 5) {
    corpo = (
      <>
        <Ghost t={t} texto="Storyboard" size={340} style={{ left: -10, top: 520 }} />
        <div style={{ position: "absolute", left: P, top: 190 }}>
          <Etiq t={t}>02 · Storyboard</Etiq>
          <Titulo t={t} linhas={["Antes de gerar,", <Marca t={t}>desenhe</Marca>]} size={100} />
        </div>
        <Tilt src={imagery.timelineCloseup} pos="35% 50%" style={{ left: 200, top: 640, width: 960, height: 520, transform: "perspective(1600px) rotateY(-12deg) rotate(3deg)" }} />
        <Tilt src={imagery.studioSetup} pos="40% 50%" moldura={12} style={{ left: 60, top: 920, width: 360, height: 270, transform: "rotate(-6deg)" }} />
        <Apoio t={t} style={{ left: P, top: 590, width: 560, fontSize: 26 }}>Quadros, linha do tempo e o som de cada trecho</Apoio>
      </>
    );
  } else if (n === 6) {
    corpo = (
      <>
        <Ghost t={t} texto="Ritmo" size={560} style={{ left: -20, top: 640 }} />
        <div style={{ position: "absolute", left: P, top: 190 }}>
          <Etiq t={t}>03 · Edição</Etiq>
          <Titulo t={t} linhas={["A emoção está", <>no <Marca t={t}>ritmo</Marca></>]} size={100} />
        </div>
        <div style={{ position: "absolute", left: 360, top: 610, width: 620, height: 620, borderRadius: "50%", border: `3px solid ${t.solid}`, transform: "translate(34px,26px)" }} />
        <Tilt src={imagery.studioSetup} pos="36% 50%" style={{ left: 360, top: 610, width: 620, height: 620, borderRadius: 310 }} />
        <Apoio t={t} style={{ left: P, top: 790, width: 250, fontSize: 26 }}>Corte seco, fade curto, nada sobrando</Apoio>
      </>
    );
  } else if (n === 7) {
    const barras = Array.from({ length: 34 }, (_, i) => 40 + Math.abs(Math.sin(i * 0.7) * 150) + Math.abs(Math.sin(i * 1.9) * 70));
    corpo = (
      <>
        <Ghost t={t} texto="Som" size={600} style={{ right: -20, top: 520 }} />
        <div style={{ position: "absolute", left: P, top: 190 }}>
          <Etiq t={t}>04 · Som</Etiq>
          <Titulo t={t} linhas={["Som baixo,", <>sem <Marca t={t}>clique</Marca></>]} size={112} />
        </div>
        <div style={{ position: "absolute", left: P, right: P, top: 600, height: 300, display: "flex", alignItems: "center", gap: 10 }}>
          {barras.map((h, i) => (
            <div key={i} style={{ flex: 1, height: h, borderRadius: 6, background: i > 24 ? t.solid : t.ink, opacity: i > 24 ? 1 : 0.85 }} />
          ))}
        </div>
        <div style={{ position: "absolute", left: P, top: 960, display: "flex", gap: 16 }}>
          {["Voz", "Música", "Efeitos · 12 dB abaixo"].map((x, i) => (
            <div key={x} style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 24, padding: "16px 28px", borderRadius: 999, border: `1px solid ${t.line}`, background: i === 2 ? t.solid : t.card, color: i === 2 ? t.onSolid : t.cardInk }}>{x}</div>
          ))}
        </div>
      </>
    );
  } else {
    corpo = (
      <>
        <Ghost t={t} texto="Vídeo" size={560} style={{ left: -10, top: 330 }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 210, display: "flex", justifyContent: "center" }}>
          <div style={{ width: 280, height: 280, borderRadius: "50%", background: "#0b0c0e", border: `3px solid ${t.solid}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Logo layout="symbol" finish="metal" height={170} />
          </div>
        </div>
        <Titulo t={t} linhas={["Seu vídeo", <>com <Marca t={t}>IA</Marca></>]} size={130} style={{ position: "absolute", left: 0, right: 0, top: 580, textAlign: "center" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 960, display: "flex", justifyContent: "center" }}>
          <div style={{ background: t.solid, color: t.onSolid, fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 32, padding: "26px 54px", borderRadius: 999 }}>Chame no direct  →</div>
        </div>
        <Apoio t={t} style={{ left: 0, right: 0, top: 1070, textAlign: "center", fontSize: 26 }}>e conte a sua ideia</Apoio>
      </>
    );
  }

  const ultimo = n === TOTAL;
  return (
    <AbsoluteFill style={{ background: t.bg, overflow: "hidden" }}>
      {dentro(corpo)}
      <div style={{ position: "absolute", top: 60, left: P, right: P, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {t.escuro ? (
          <Logo layout="horizontal" height={34} />
        ) : (
          <div style={{ background: "#0b0c0e", borderRadius: 10, padding: "10px 16px" }}><Logo layout="horizontal" height={28} /></div>
        )}
        <span style={{ fontFamily: fontFamilies.mono, fontSize: 18, letterSpacing: "0.16em", color: t.muted }}>{String(n).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}</span>
      </div>
      <div style={{ position: "absolute", left: n === 1 ? P - 18 : P, right: n === 1 ? P - 18 : P, bottom: 60, display: "flex", justifyContent: "space-between", fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 17, letterSpacing: "0.22em", ...(n === 1 ? { background: "rgba(11,12,14,0.62)", color: "#eef2f5", borderRadius: 999, padding: "22px 34px" } : { borderTop: `1px solid ${t.line}`, paddingTop: 24, color: t.muted }) }}>
        <span>@CFDESIGNER.OFICIAL</span>
        {!ultimo && <span>ARRASTE →</span>}
      </div>
    </AbsoluteFill>
  );
};
