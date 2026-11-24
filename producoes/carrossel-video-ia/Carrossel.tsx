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

/** Carrossel 4:5 (1080x1350) no design system CFDesigner. Modelo de referência: série de posts com título grande,
 *  elemento central, texto de apoio pequeno e barra de rodapé igual em todos. */
export const CARROSSEL_TOTAL = 8;
export const CARROSSEL_W = 1080;
export const CARROSSEL_H = 1350;

const c = colors.cinema;
const PERFIL = "@cfdesigner.oficial";

/** Palavra em âmbar: um destaque forte por slide. */
const Am: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: c.amberText }}>{children}</span>
);

const Titulo: React.FC<{
  children: React.ReactNode;
  size?: number;
  align?: "left" | "center";
  style?: React.CSSProperties;
}> = ({ children, size = 168, align = "left", style }) => (
  <div
    style={{
      fontFamily: fontFamilies.display,
      fontSize: size,
      lineHeight: 0.92,
      letterSpacing: "0.01em",
      color: c.ink,
      textAlign: align,
      textTransform: "uppercase",
      ...style,
    }}
  >
    {children}
  </div>
);

const Apoio: React.FC<{
  children: React.ReactNode;
  align?: "left" | "center";
  style?: React.CSSProperties;
}> = ({ children, align = "left", style }) => (
  <div
    style={{
      fontFamily: fontFamilies.heading,
      fontWeight: 600,
      fontSize: 30,
      lineHeight: 1.35,
      color: c.inkMuted,
      textAlign: align,
      maxWidth: 700,
      ...style,
    }}
  >
    {children}
  </div>
);

const Etiqueta: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: fontFamilies.heading,
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: c.amberText,
    }}
  >
    {children}
  </div>
);

/** Topo: logo pequeno e contador. */
const Topo: React.FC<{ n: number }> = ({ n }) => (
  <div
    style={{
      position: "absolute",
      top: 56,
      left: 72,
      right: 72,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Logo layout="horizontal" height={46} />
    <div
      style={{
        fontFamily: fontFamilies.mono,
        fontWeight: 500,
        fontSize: 22,
        letterSpacing: "0.12em",
        color: c.inkMuted,
      }}
    >
      {String(n).padStart(2, "0")} / {String(CARROSSEL_TOTAL).padStart(2, "0")}
    </div>
  </div>
);

/** Rodapé igual em todos os slides (como a barra do modelo). */
const Rodape: React.FC<{ ultimo?: boolean }> = ({ ultimo }) => (
  <div
    style={{
      position: "absolute",
      left: 72,
      right: 72,
      bottom: 56,
      height: 72,
      borderRadius: 999,
      background: "rgba(22,24,28,0.82)",
      border: `1px solid ${c.line}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 34px",
      fontFamily: fontFamilies.heading,
      fontWeight: 600,
      fontSize: 22,
      letterSpacing: "0.1em",
      color: c.inkMuted,
    }}
  >
    <span>{PERFIL}</span>
    {!ultimo && (
      <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
        ARRASTE
        <svg width="44" height="14" viewBox="0 0 44 14">
          <path
            d="M0 7h42M36 1l6 6-6 6"
            fill="none"
            stroke={c.amber}
            strokeWidth="2"
          />
        </svg>
      </span>
    )}
  </div>
);

/** Foto em cartão de borda dourada fina, com vinheta até o preto. */
const Foto: React.FC<{
  src: string;
  top: number;
  height: number;
  pos?: string;
}> = ({ src, top, height, pos = "50% 50%" }) => (
  <div
    style={{
      position: "absolute",
      left: 72,
      right: 72,
      top,
      height,
      borderRadius: 28,
      overflow: "hidden",
      border: `1px solid ${c.bronze}`,
    }}
  >
    <Img
      src={src}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: pos,
        filter: "brightness(0.85)",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(180deg, rgba(11,12,14,0.35) 0%, rgba(11,12,14,0) 30%, rgba(11,12,14,0) 70%, rgba(11,12,14,0.55) 100%)",
      }}
    />
  </div>
);

const Base: React.FC<{
  n: number;
  fundo?: VarianteFundo;
  foco?: { x: number; y: number };
  children: React.ReactNode;
  ultimo?: boolean;
}> = ({ n, fundo, foco, children, ultimo }) => (
  <AbsoluteFill style={{ background: c.void }}>
    {fundo && (
      <Sequence from={-45} layout="none">
        <FundoCF variante={fundo} entrada={1} foco={foco} intensidade={0.9} />
      </Sequence>
    )}
    <Topo n={n} />
    {children}
    <Rodape ultimo={ultimo} />
  </AbsoluteFill>
);

/* ---------------- Slides ---------------- */

/** 01 Capa: foto de perfil, título embaixo (rosto livre no alto). */
const S1: React.FC = () => (
  <AbsoluteFill style={{ background: c.void }}>
    <Img
      src={imagery.portraitEditingDesk}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "28% 50%",
        filter: "brightness(0.8)",
      }}
    />
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(11,12,14,0.55) 0%, rgba(11,12,14,0) 22%, rgba(11,12,14,0) 38%, rgba(11,12,14,0.92) 72%, #0b0c0e 100%)",
      }}
    />
    <Topo n={1} />
    <div style={{ position: "absolute", left: 72, right: 72, bottom: 190 }}>
      <Etiqueta>Produção completa</Etiqueta>
      <Titulo size={196} style={{ marginTop: 20 }}>
        Vídeo com <Am>IA</Am>
      </Titulo>
      <Titulo size={96} style={{ marginTop: 10 }}>
        do roteiro ao fecho
      </Titulo>
    </div>
    <Rodape />
  </AbsoluteFill>
);

/** 02 Tese. */
const S2: React.FC = () => (
  <Base n={2} fundo="visor" foco={{ x: 0.5, y: 0.5 }}>
    <div style={{ position: "absolute", left: 72, right: 72, top: 330 }}>
      <Etiqueta>O ponto</Etiqueta>
      <Titulo size={200} style={{ marginTop: 28 }}>
        IA gera clipe
      </Titulo>
      <Titulo size={200}>
        filme exige <Am>método</Am>
      </Titulo>
      <Apoio style={{ marginTop: 44 }}>
        Do roteiro ao fecho, cada etapa tem uma regra.
      </Apoio>
    </div>
  </Base>
);

/** 03 As 5 etapas. */
const etapas = ["Roteiro", "Storyboard", "Edição", "Som", "Fecho"];
const S3: React.FC = () => (
  <Base n={3} fundo="grade" foco={{ x: 0.5, y: 0.55 }}>
    <div style={{ position: "absolute", left: 72, right: 72, top: 190 }}>
      <Etiqueta>O método</Etiqueta>
      <Titulo size={190} style={{ marginTop: 22 }}>
        5 <Am>etapas</Am>
      </Titulo>
    </div>
    <div
      style={{
        position: "absolute",
        left: 72,
        right: 72,
        top: 470,
        bottom: 190,
        borderRadius: 28,
        background: "rgba(22,24,28,0.86)",
        border: `1px solid ${c.bronze}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: "10px 48px",
      }}
    >
      {etapas.map((e, i) => (
        <div
          key={e}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            borderBottom: i < 4 ? `1px solid ${c.line}` : "none",
            paddingBottom: i < 4 ? 14 : 0,
          }}
        >
          <div
            style={{
              fontFamily: fontFamilies.mono,
              fontWeight: 500,
              fontSize: 28,
              color: c.amberText,
              width: 56,
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </div>
          <div
            style={{
              fontFamily: fontFamilies.display,
              fontSize: 84,
              color: c.ink,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            {e}
          </div>
        </div>
      ))}
    </div>
  </Base>
);

/** 04 Roteiro. */
const S4: React.FC = () => (
  <Base n={4} fundo="pontos" foco={{ x: 0.5, y: 0.6 }}>
    <div style={{ position: "absolute", left: 72, right: 72, top: 190 }}>
      <Etiqueta>01 · Roteiro</Etiqueta>
      <Titulo size={190} style={{ marginTop: 22 }}>
        Uma ideia
      </Titulo>
      <Titulo size={190}>
        por <Am>frase</Am>
      </Titulo>
    </div>
    <div
      style={{
        position: "absolute",
        left: 72,
        right: 72,
        top: 640,
        borderRadius: 28,
        background: "rgba(22,24,28,0.86)",
        border: `1px solid ${c.bronze}`,
        padding: "44px 48px",
        display: "flex",
        flexDirection: "column",
        gap: 26,
      }}
    >
      {["Gancho em até 6 palavras", "Frases curtas, com ritmo de corte", "Número concreto, não adjetivo"].map(
        (t) => (
          <div
            key={t}
            style={{ display: "flex", alignItems: "center", gap: 26 }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                transform: "rotate(45deg)",
                border: `2px solid ${c.amber}`,
                flex: "none",
              }}
            />
            <div
              style={{
                fontFamily: fontFamilies.heading,
                fontWeight: 600,
                fontSize: 36,
                color: c.ink,
              }}
            >
              {t}
            </div>
          </div>
        ),
      )}
    </div>
  </Base>
);

/** 05 Storyboard com foto da timeline. */
const S5: React.FC = () => (
  <Base n={5}>
    <div style={{ position: "absolute", left: 72, right: 72, top: 190 }}>
      <Etiqueta>02 · Storyboard</Etiqueta>
      <Titulo size={170} style={{ marginTop: 22 }}>
        Antes de gerar,
      </Titulo>
      <Titulo size={170}>
        <Am>desenhe</Am>
      </Titulo>
    </div>
    <Foto src={imagery.timelineCloseup} top={620} height={420} pos="35% 50%" />
    <Apoio style={{ position: "absolute", left: 72, top: 1070, maxWidth: 840, fontSize: 28 }}>
      Quadros, linha do tempo e o som de cada trecho
    </Apoio>
  </Base>
);

/** 06 Edição com foto da estação. */
const S6: React.FC = () => (
  <Base n={6}>
    <div style={{ position: "absolute", left: 72, right: 72, top: 190 }}>
      <Etiqueta>03 · Edição</Etiqueta>
      <Titulo size={170} style={{ marginTop: 22 }}>
        A emoção está
      </Titulo>
      <Titulo size={170}>
        no <Am>ritmo</Am>
      </Titulo>
    </div>
    <Foto src={imagery.studioSetup} top={620} height={420} pos="38% 50%" />
    <Apoio style={{ position: "absolute", left: 72, top: 1070, maxWidth: 840, fontSize: 28 }}>
      Corte seco, fade curto, nada de efeito sobrando
    </Apoio>
  </Base>
);

/** 07 Som: camadas em barras. */
const camadas = [
  { nome: "Voz", nivel: 1, cor: c.petrolText },
  { nome: "Música", nivel: 0.62, cor: c.chrome },
  { nome: "Efeitos", nivel: 0.22, cor: c.amber },
];
const S7: React.FC = () => (
  <Base n={7} fundo="timeline" foco={{ x: 0.5, y: 0.6 }}>
    <div style={{ position: "absolute", left: 72, right: 72, top: 190 }}>
      <Etiqueta>04 · Som</Etiqueta>
      <Titulo size={170} style={{ marginTop: 22 }}>
        Som baixo,
      </Titulo>
      <Titulo size={170}>
        sem <Am>clique</Am>
      </Titulo>
    </div>
    <div
      style={{
        position: "absolute",
        left: 72,
        right: 72,
        top: 650,
        borderRadius: 28,
        background: "rgba(22,24,28,0.86)",
        border: `1px solid ${c.bronze}`,
        padding: "44px 48px",
        display: "flex",
        flexDirection: "column",
        gap: 34,
      }}
    >
      {camadas.map((k) => (
        <div key={k.nome} style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              fontFamily: fontFamilies.heading,
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: c.inkMuted,
              width: 170,
            }}
          >
            {k.nome}
          </div>
          <div style={{ flex: 1, height: 18, borderRadius: 9, background: c.line }}>
            <div
              style={{
                width: `${k.nivel * 100}%`,
                height: "100%",
                borderRadius: 9,
                background: k.cor,
              }}
            />
          </div>
        </div>
      ))}
    </div>
    <Apoio style={{ position: "absolute", left: 72, top: 930, maxWidth: 840, fontSize: 28 }}>
      Efeitos ficam bem abaixo da voz
    </Apoio>
  </Base>
);

/** 08 Fecho / chamada. */
const S8: React.FC = () => (
  <Base n={8} fundo="losangos" foco={{ x: 0.5, y: 0.42 }} ultimo>
    <div
      style={{
        position: "absolute",
        left: 72,
        right: 72,
        top: 250,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Logo layout="stacked" finish="metal" height={330} />
      <Titulo size={150} align="center" style={{ marginTop: 70 }}>
        Seu vídeo com <Am>IA</Am>
      </Titulo>
      <Apoio align="center" style={{ marginTop: 34 }}>
        Chame no direct e conte a sua ideia
      </Apoio>
    </div>
  </Base>
);

export const slides = [S1, S2, S3, S4, S5, S6, S7, S8];

export const CarrosselSlide: React.FC<{ n: number }> = ({ n }) => {
  const S = slides[Math.min(Math.max(n, 1), slides.length) - 1];
  return <S />;
};
