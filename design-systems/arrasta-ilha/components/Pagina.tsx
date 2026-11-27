import React from "react";
import { AbsoluteFill } from "remotion";
import "../fonts";
import type { ElementoNome, FotoNome, IconeNome, IconeVinhoNome } from "../assets";
import { colors, engrossar, fontFamilies } from "../tokens";
import { Faixa, PadraoOficial, Recorte } from "./Original";

// MODELOS DE PÁGINA NA LINGUAGEM DO eBOOK (referência do dono): fundo branco, grafismos bem suaves atrás do texto,
// faixas oficiais em cima e embaixo, título grande em vinho com ícone em contorno e a logo horizontal no canto,
// subtítulo em negrito sublinhado, texto corrido em sans, personagem recortado ancorado na borda.
// Todo texto aqui é EXEMPLO entre colchetes: nenhum conteúdo de toada.

type Faixas = "ofTriangulos" | "ofAxeBuzios" | "ofArmas" | "ofDancarinos" | "ofIcones" | "ofHexagonos" | "ofMaracatu";
const W = 1080;

/** Grafismo suave: o mesmo elemento oficial com pouquíssima opacidade, como as folhas e o sol claros do eBook. */
export const Suave: React.FC<{ nome: ElementoNome; largura?: number; altura?: number; style: React.CSSProperties; opacidade?: number }> = ({ nome, largura, altura, style, opacidade = 0.1 }) => (
  <div style={{ position: "absolute", inset: 0, opacity: opacidade, pointerEvents: "none" }}>
    <Recorte nome={nome} largura={largura} altura={altura} style={style} />
  </div>
);

/** Título grande (vinho) com ícone em contorno ao lado; logo horizontal no canto. */
export const TituloPagina: React.FC<{ titulo: string; icone?: IconeVinhoNome; sem_logo?: boolean; tam?: number }> = ({ titulo, icone = "ivArcoFlecha", sem_logo, tam = 150 }) => (
  <div style={{ position: "absolute", left: 72, right: 72, top: 120, display: "flex", alignItems: "center", gap: 28 }}>
    <div style={{ fontFamily: fontFamilies.display, fontSize: tam, lineHeight: 1, color: colors.vinho, textTransform: "uppercase", WebkitTextStroke: `${tam * engrossar.padrao}px ${colors.vinho}`, paintOrder: "stroke fill" }}>{titulo}</div>
    <div style={{ position: "relative", width: tam * 0.8, height: tam * 0.9 }}>
      <Recorte nome={icone} altura={tam * 0.85} style={{ left: 0, top: 0 }} />
    </div>
    {!sem_logo && <div style={{ flex: 1, position: "relative", height: tam * 0.9 }}><Recorte nome="logoAmbiente" largura={300} style={{ right: 0, top: 14 }} /></div>}
  </div>
);

/** Subtítulo em negrito sublinhado + linha de crédito em negrito menor, como "2. Rainha da Diáspora / Criador: ...". */
export const Subtitulo: React.FC<{ titulo: string; linha?: string; alinhar?: "left" | "right"; tam?: number }> = ({ titulo, linha, alinhar = "left", tam = 40 }) => (
  <div style={{ textAlign: alinhar, color: colors.tintaTexto, fontFamily: fontFamilies.texto }}>
    <div style={{ fontSize: tam, fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 6 }}>{titulo}</div>
    {linha && <div style={{ fontSize: tam * 0.72, fontWeight: 700, marginTop: 14 }}>{linha}</div>}
  </div>
);

export const Texto: React.FC<{ children: React.ReactNode; alinhar?: "left" | "right"; tam?: number; style?: React.CSSProperties }> = ({ children, alinhar = "left", tam = 34, style }) => (
  <div style={{ textAlign: alinhar, color: colors.tintaTexto, fontFamily: fontFamilies.texto, fontSize: tam, lineHeight: 1.42, ...style }}>{children}</div>
);

const altFaixa = (f: Faixas) => (f === "ofAxeBuzios" ? 56 : f === "ofMaracatu" ? 44 : 64);

const Moldura: React.FC<{ H: number; topo: Faixas; base: Faixas; children: React.ReactNode }> = ({ H, topo, base, children }) => (
  <AbsoluteFill style={{ background: colors.branco }}>
    {children}
    <Faixa nome={topo} w={W} alt={altFaixa(topo)} style={{ position: "absolute", top: 0 }} />
    <Faixa nome={base} w={W} alt={altFaixa(base)} style={{ position: "absolute", top: H - altFaixa(base) }} />
  </AbsoluteFill>
);

/** P1, página de título e lista (como o Sumário): título com ícone e logo, texto em duas colunas, grafismos suaves. */
export const PaginaTitulo: React.FC<{ stories?: boolean }> = ({ stories = false }) => {
  const H = stories ? 1920 : 1350;
  return (
    <Moldura H={H} topo="ofHexagonos" base="ofArmas">
      <Suave nome="elSolRespingo" largura={620} style={{ right: -120, top: 150 }} opacidade={0.13} />
      <Suave nome="elFolhaLarga" altura={H * 0.5} style={{ right: 20, bottom: 80 }} opacidade={0.09} />
      <Suave nome="elFolhaLarga" altura={H * 0.4} style={{ left: -30, bottom: 120 }} opacidade={0.07} />
      <TituloPagina titulo="[Título]" icone="ivArcoFlecha" />
      <div style={{ position: "absolute", left: 72, right: 72, top: 330, display: "flex", gap: 56 }}>
        <Texto style={{ flex: 1 }}>
          [1. Primeiro item da lista]<br />[2. Segundo item]<br />[3. Terceiro item]<br />[4. Quarto item]<br />[5. Quinto item]<br />[6. Sexto item]
        </Texto>
        <Texto style={{ flex: 1 }}>
          [7. Sétimo item]<br />[8. Oitavo item]<br />[9. Nono item]<br />[10. Décimo item]<br />[11. Item mais longo que quebra em duas linhas]<br />[12. Décimo segundo item]
        </Texto>
      </div>
    </Moldura>
  );
};

/** P2, página com personagem: título, subtítulo à esquerda, texto, e o personagem recortado grande ancorado na faixa de baixo. */
export const PaginaPersonagem: React.FC<{ foto?: FotoNome; stories?: boolean }> = ({ foto = "fotoMulherBandeira", stories = false }) => {
  const H = stories ? 1920 : 1350;
  const alt = stories ? 1000 : 700;
  return (
    <Moldura H={H} topo="ofMaracatu" base="ofTriangulos">
      <Suave nome="elFolhaLarga" altura={H * 0.62} style={{ right: -20, top: 150 }} opacidade={0.1} />
      <Suave nome="elFolhaLarga" altura={H * 0.46} style={{ left: 330, bottom: 40 }} opacidade={0.08} />
      <Suave nome="elSolRespingo" largura={520} style={{ left: -90, top: 520 }} opacidade={0.12} />
      <TituloPagina titulo="[Título]" icone="ivFerraduraEstrela" />
      <div style={{ position: "absolute", left: 72, top: 320, width: 640 }}>
        <Subtitulo titulo="[1. Subtítulo da seção]" linha="[Linha de apoio ou crédito]" />
        <Texto style={{ marginTop: 40 }}>[Texto de exemplo em duas ou três linhas, sem textão. Frase curta, direta, na voz do grupo.]</Texto>
      </div>
      <Recorte nome={foto} altura={alt} style={{ left: 40, top: H - 64 - alt + 24 }} />
      <div style={{ position: "absolute", right: 72, top: stories ? 1150 : 840, width: 520 }}>
        <Subtitulo titulo="[2. Outra seção]" linha="[Linha de apoio]" alinhar="right" />
        <Texto alinhar="right" style={{ marginTop: 36 }}>[Texto alinhado à direita, ao lado do personagem, com poucas linhas curtas e respiro em volta.]</Texto>
      </div>
    </Moldura>
  );
};

/** P3, página com ícone em painel inclinado: texto à esquerda, ícone branco sobre bloco de cor à direita. */
export const PaginaIcone: React.FC<{ icone?: IconeNome; stories?: boolean }> = ({ icone = "icMachadoDuplo", stories = false }) => {
  const H = stories ? 1920 : 1350;
  return (
    <Moldura H={H} topo="ofAxeBuzios" base="ofDancarinos">
      <Suave nome="elSolRespingo" largura={640} style={{ left: 120, top: 100 }} opacidade={0.13} />
      <Suave nome="elFolhaLarga" altura={H * 0.55} style={{ right: -10, bottom: 100 }} opacidade={0.09} />
      <div style={{ position: "absolute", left: 72, top: 150, width: 560 }}>
        <Subtitulo titulo="[3. Subtítulo da página]" linha="[Linha de apoio]" tam={46} />
        <Texto style={{ marginTop: 44 }}>[Texto de exemplo.<br />Cada linha curta, como nas páginas do eBook,<br />com bastante espaço branco em volta.]</Texto>
      </div>
      <div style={{ position: "absolute", right: 90, top: 170, width: 330, height: 330, background: colors.marinho, transform: "rotate(10deg)", boxShadow: "0 12px 28px #0003" }}>
        <Recorte nome={icone} altura={250} style={{ left: 70, top: 40 }} />
      </div>
      <Recorte nome="fotoAdultoEMeninoCaixa" altura={stories ? 900 : 640} style={{ right: 40, top: H - 64 - (stories ? 900 : 640) + 20 }} />
    </Moldura>
  );
};

/** P4, capa em painel: o padrão oficial vira moldura de um painel branco com logo e título; grafismos suaves fora do painel. */
export const CapaPainel: React.FC<{ stories?: boolean }> = ({ stories = false }) => {
  const pad = 62;
  return (
    <AbsoluteFill style={{ background: colors.branco }}>
      <Suave nome="elSolRespingo" largura={480} style={{ right: -40, top: 30 }} opacidade={0.9} />
      <Suave nome="elFolhaCurvasLaranja" largura={560} style={{ left: -60, top: 0 }} opacidade={0.9} />
      <Suave nome="elArcosAzuis" largura={420} style={{ left: -60, bottom: 40 }} opacidade={0.5} />
      <Suave nome="elPontosPessego" largura={300} style={{ right: 10, bottom: 40 }} opacidade={0.9} />
      <div style={{ position: "absolute", left: 140, right: 140, top: stories ? 330 : 190, bottom: stories ? 330 : 190, boxShadow: "0 14px 34px #0004", overflow: "hidden" }}>
        <PadraoOficial w={800} h={stories ? 1260 : 970} escala={0.7} />
        <div style={{ position: "absolute", left: pad, right: pad, top: pad, bottom: pad, background: colors.branco, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 30 }}>
          <Recorte nome="logoVertical" largura={300} style={{ position: "relative", marginBottom: 24 }} />
          <div style={{ fontFamily: fontFamilies.display, fontSize: 96, lineHeight: 0.95, color: colors.vinho, textTransform: "uppercase", WebkitTextStroke: `${96 * engrossar.padrao}px ${colors.vinho}`, paintOrder: "stroke fill" }}>[Título da<br />capa]</div>
          <Texto tam={32} alinhar="left" style={{ marginTop: 26, textAlign: "center" }}>[linha de apoio]</Texto>
        </div>
      </div>
    </AbsoluteFill>
  );
};
