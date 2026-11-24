import React from "react";
import { AbsoluteFill, Img, Sequence } from "remotion";
import {
  FundoCF,
  Logo,
  colors,
  fontFamilies,
  imagery,
  type VarianteFundo,
} from "../../design-systems/cfdesigner";
import "../../design-systems/cfdesigner/fonts";

/** Carrossel refinado: 3 versões (v=1 "Linha fina", v=2 "Editorial", v=3 "Cinema") para avaliação do dono. */
const c = colors.cinema;
const PERFIL = "@cfdesigner.oficial";
const TOTAL = 8;

type Dado = {
  etiqueta: string;
  linhas: string[]; // [palavra] = destaque âmbar
  foto?: { src: string; pos: string };
  fundo?: VarianteFundo;
  apoio?: string;
  lista?: string[];
  barras?: boolean;
  fecho?: boolean;
};

const dados: Dado[] = [
  { etiqueta: "Produção completa", linhas: ["Vídeo com [IA]"], apoio: "Do roteiro ao fecho", foto: { src: imagery.portraitEditingDesk, pos: "28% 50%" } },
  { etiqueta: "O ponto", linhas: ["IA gera clipe,", "filme exige [método]"], apoio: "Cada etapa tem uma regra", fundo: "visor" },
  { etiqueta: "O método", linhas: ["Cinco [etapas]"], lista: ["Roteiro", "Storyboard", "Edição", "Som", "Fecho"], fundo: "grade" },
  { etiqueta: "01 · Roteiro", linhas: ["Uma ideia", "por [frase]"], lista: ["Gancho em até 6 palavras", "Frases curtas, com ritmo de corte", "Número concreto, não adjetivo"], fundo: "pontos" },
  { etiqueta: "02 · Storyboard", linhas: ["Antes de gerar,", "[desenhe]"], apoio: "Quadros, linha do tempo e o som de cada trecho", foto: { src: imagery.timelineCloseup, pos: "35% 50%" } },
  { etiqueta: "03 · Edição", linhas: ["A emoção está", "no [ritmo]"], apoio: "Corte seco, fade curto, nada sobrando", foto: { src: imagery.studioSetup, pos: "38% 50%" } },
  { etiqueta: "04 · Som", linhas: ["Som baixo,", "sem [clique]"], barras: true, apoio: "Efeitos bem abaixo da voz", fundo: "timeline" },
  { etiqueta: "05 · Fecho", linhas: ["Seu vídeo", "com [IA]"], apoio: "Chame no direct e conte a sua ideia", fundo: "losangos", fecho: true },
];

const Linha: React.FC<{ t: string }> = ({ t }) => (
  <>
    {t.split(/(\[[^\]]+\])/).map((p, i) =>
      p.startsWith("[") ? (
        <span key={i} style={{ color: c.amberText }}>{p.slice(1, -1)}</span>
      ) : (
        <React.Fragment key={i}>{p}</React.Fragment>
      ),
    )}
  </>
);

export const CarrosselRefinado: React.FC<{ n: number; v: number }> = ({ n, v }) => {
  const d = dados[Math.min(Math.max(n, 1), TOTAL) - 1];
  const P = v === 1 ? 104 : 88;
  const fotoTopo = v === 2 && d.foto;
  const fotoFundo = (v === 3 || (v === 1 && n === 1)) && !!d.foto;

  // tipografia por versão
  const titulo: React.CSSProperties =
    v === 2
      ? { fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 78, lineHeight: 1.1, letterSpacing: "-0.015em", color: c.ink }
      : v === 1
        ? { fontFamily: fontFamilies.display, fontSize: 118, lineHeight: 1, letterSpacing: "0.06em", color: c.ink, textTransform: "uppercase" }
        : { fontFamily: fontFamilies.display, fontSize: 150, lineHeight: 0.98, letterSpacing: "0.05em", color: c.ink, textTransform: "uppercase" };
  const etiq: React.CSSProperties = {
    fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 18, letterSpacing: "0.32em",
    textTransform: "uppercase", color: c.amberText, opacity: 0.9,
  };
  const apoio: React.CSSProperties = {
    fontFamily: fontFamilies.body, fontWeight: 400, fontSize: 28, lineHeight: 1.45, color: c.inkMuted, letterSpacing: "0.01em",
  };

  // posição do bloco de título
  const topoTitulo = v === 2 ? (d.foto ? 780 : 230) : 200;

  const blocoTitulo = (
    <div
      style={{
        position: "absolute", left: P, right: P,
        ...(fotoFundo ? { bottom: 250 } : { top: topoTitulo }),
      }}
    >
      <div style={etiq}>{d.etiqueta}</div>
      <div style={{ ...titulo, marginTop: 28 }}>
        {d.linhas.map((l) => (
          <div key={l}><Linha t={l} /></div>
        ))}
      </div>
      {d.apoio && (d.foto || d.fundo) && !d.barras && (v === 3 || d.fecho || v === 2 || fotoFundo) && (
        <div style={{ ...apoio, marginTop: 34, maxWidth: 720 }}>{d.apoio}</div>
      )}
    </div>
  );

  // elemento central
  let meio: React.ReactNode = null;
  const topoMeio = v === 2 ? 600 : 610;
  if (d.lista) {
    meio = (
      <div style={{ position: "absolute", left: P, right: P, top: topoMeio, display: "flex", flexDirection: "column" }}>
        {d.lista.map((t, i) => (
          <div
            key={t}
            style={{
              display: "flex", alignItems: "baseline", gap: 28, padding: "20px 0",
              borderTop: `1px solid ${c.line}`,
              ...(i === d.lista!.length - 1 ? { borderBottom: `1px solid ${c.line}` } : {}),
            }}
          >
            <span style={{ fontFamily: fontFamilies.mono, fontSize: 18, color: c.amberText, opacity: 0.85, width: 36 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              style={
                n === 3
                  ? { fontFamily: v === 2 ? fontFamilies.heading : fontFamilies.display, fontWeight: v === 2 ? 600 : 400, fontSize: v === 2 ? 38 : 56, letterSpacing: v === 2 ? 0 : "0.07em", textTransform: v === 2 ? "none" : "uppercase", color: c.ink }
                  : { fontFamily: fontFamilies.body, fontSize: 31, color: c.ink }
              }
            >
              {t}
            </span>
          </div>
        ))}
      </div>
    );
  } else if (d.barras) {
    meio = (
      <div style={{ position: "absolute", left: P, right: P, top: topoMeio, display: "flex", flexDirection: "column", gap: 40 }}>
        {[["Voz", 1, c.petrolText], ["Música", 0.62, c.chrome], ["Efeitos", 0.22, c.amber]].map(([nome, nivel, cor]) => (
          <div key={nome as string} style={{ display: "flex", alignItems: "center", gap: 30 }}>
            <span style={{ ...etiq, color: c.inkMuted, width: 150, letterSpacing: "0.24em" }}>{nome}</span>
            <div style={{ flex: 1, height: 3, background: c.line }}>
              <div style={{ width: `${(nivel as number) * 100}%`, height: 3, background: cor as string }} />
            </div>
          </div>
        ))}
        <div style={{ ...apoio, marginTop: 20 }}>{d.apoio}</div>
      </div>
    );
  } else if (d.foto && v === 1 && n !== 1) {
    meio = (
      <>
        <div style={{ position: "absolute", left: P, right: P, top: 610, height: 440, border: `1px solid ${c.bronze}`, overflow: "hidden" }}>
          <Img src={d.foto.src} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: d.foto.pos, filter: "brightness(0.8)" }} />
        </div>
        <div style={{ ...apoio, position: "absolute", left: P, right: P, top: 1086, fontSize: 26 }}>{d.apoio}</div>
      </>
    );
  }

  return (
    <AbsoluteFill style={{ background: c.void }}>
      {/* imagem de fundo / topo */}
      {fotoFundo && d.foto && (
        <>
          <Img src={d.foto.src} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: d.foto.pos, filter: `brightness(${v === 3 ? 0.62 : 0.78})` }} />
          <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(11,12,14,0.5) 0%, rgba(11,12,14,0) 25%, rgba(11,12,14,0.55) 55%, #0b0c0e 92%)" }} />
        </>
      )}
      {fotoTopo && d.foto && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: n === 1 ? 860 : 700 }}>
          <Img src={d.foto.src} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: d.foto.pos, filter: "brightness(0.8)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,12,14,0.45) 0%, rgba(11,12,14,0) 25%, rgba(11,12,14,0) 55%, #0b0c0e 100%)" }} />
        </div>
      )}
      {d.fundo && (
        <Sequence from={-45} layout="none">
          <FundoCF variante={d.fundo} entrada={1} intensidade={v === 3 ? 0.45 : 0.55} foco={{ x: 0.5, y: 0.55 }} />
        </Sequence>
      )}

      {/* topo */}
      <div style={{ position: "absolute", top: 64, left: P, right: P, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Logo layout="horizontal" height={34} style={{ opacity: 0.92 }} />
        <span style={{ fontFamily: fontFamilies.mono, fontSize: 18, letterSpacing: "0.16em", color: c.inkMuted }}>
          {String(n).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </span>
      </div>

      {d.fecho && (
        <div style={{ position: "absolute", left: 0, right: 0, top: v === 2 ? 640 : 700, display: "flex", justifyContent: "center" }}>
          <Logo layout="symbol" finish="metal" height={150} />
        </div>
      )}

      {blocoTitulo}
      {meio}

      {/* rodapé minimalista */}
      <div style={{ position: "absolute", left: P, right: P, bottom: 64, borderTop: `1px solid ${c.line}`, paddingTop: 26, display: "flex", justifyContent: "space-between", fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 17, letterSpacing: "0.22em", color: c.inkMuted }}>
        <span>{PERFIL.toUpperCase()}</span>
        {!d.fecho && <span>ARRASTE →</span>}
      </div>
    </AbsoluteFill>
  );
};
