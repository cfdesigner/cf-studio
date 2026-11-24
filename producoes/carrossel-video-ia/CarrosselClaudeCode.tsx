import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { Logo, fontFamilies } from "../../design-systems/cfdesigner";
import "../../design-systems/cfdesigner/fonts";
import euCapa from "./assets/eu-capa.png";
import euFala from "./assets/eu-fala.png";
import fotoEscritorio from "./assets/foto-escritorio.jpg";
import fotoLivro from "./assets/foto-livro.jpg";
import fotoNotebook from "./assets/foto-notebook.jpg";

/**
 * Carrossel "Claude Code para edição de vídeo" (base: artigo do MindStudio, 20/04/2026).
 * Mesma identidade do carrossel "Vídeo com IA": fundo branco, âmbar, elementos que atravessam os slides.
 * Cada slide é uma janela de 1080 px sobre uma tela contínua de 8640 px.
 */
const W = 1080;
const H = 1350;
const N = 8;
const AM = "#d9a441";
const INK = "#0b0c0e";
const MUT = "#545c66";
const LINE = "#e3e5e8";
const GHOST = "rgba(217,164,65,0.16)";
const X = (i: number) => (i - 1) * W;
const abs = (s: React.CSSProperties): React.CSSProperties => ({ position: "absolute", ...s });

const Marca: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ background: AM, color: INK, padding: "0 16px 4px", borderRadius: 16, display: "inline-block", lineHeight: 1.08 }}>{children}</span>
);
const Titulo: React.FC<{ linhas: React.ReactNode[]; size: number }> = ({ linhas, size }) => (
  <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: size, lineHeight: 1.12, letterSpacing: "-0.02em", color: INK }}>
    {linhas.map((l, i) => <div key={i}>{l}</div>)}
  </div>
);
const Etiq: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 18, letterSpacing: "0.32em", textTransform: "uppercase", color: MUT, marginBottom: 26 }}>{children}</div>
);
const Ghost: React.FC<{ t: string; size: number; style: React.CSSProperties }> = ({ t, size, style }) => (
  <div style={abs({ fontFamily: fontFamilies.display, fontSize: size, lineHeight: 0.8, letterSpacing: "0.02em", color: GHOST, whiteSpace: "nowrap", textTransform: "uppercase", ...style })}>{t}</div>
);
const Apoio: React.FC<{ children: React.ReactNode; style: React.CSSProperties }> = ({ children, style }) => (
  <div style={abs({ fontFamily: fontFamilies.body, fontSize: 28, lineHeight: 1.4, color: MUT, ...style })}>{children}</div>
);
const Card: React.FC<{ src: string; pos?: string; cx: number; cy: number; w: number; h: number; rot: number; persp?: number }> = ({ src, pos = "50% 50%", cx, cy, w, h, rot, persp = -12 }) => (
  <div style={abs({ left: cx - w / 2, top: cy - h / 2, width: w, height: h, borderRadius: 22, overflow: "hidden", boxShadow: "0 40px 70px rgba(11,12,14,0.28)", transform: `perspective(1600px) rotateY(${persp}deg) rotate(${rot}deg)` })}>
    <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos }} />
  </div>
);
const Fita: React.FC<{ cx: number; cy: number; w: number; rot: number; texto: string }> = ({ cx, cy, w, rot, texto }) => (
  <div style={abs({ left: cx - w / 2, top: cy - 35, width: w, height: 70, background: AM, color: INK, display: "flex", alignItems: "center", overflow: "hidden", whiteSpace: "nowrap", fontFamily: fontFamilies.display, fontSize: 42, letterSpacing: "0.12em", transform: `rotate(${rot}deg)` })}>
    {Array.from({ length: 6 }).map((_, i) => <span key={i} style={{ marginRight: 30 }}>{texto}</span>)}
  </div>
);

/** Quadros nas proporções 16:9, 9:16 e 1:1 que atravessam os slides 6 e 7 (as exportações do pipeline do artigo). */
const Quadros: React.FC = () => {
  const itens: { x: number; y: number; w: number; h: number; rot: number; nome: string; fmt: string; cheio?: boolean }[] = [
    { x: X(6) + 800, y: 930, w: 420, h: 236, rot: -3, nome: "YouTube", fmt: "16:9", cheio: true },
    { x: X(7) + 70, y: 860, w: 200, h: 356, rot: 2, nome: "Reels", fmt: "9:16" },
    { x: X(7) + 340, y: 905, w: 300, h: 300, rot: -2, nome: "LinkedIn", fmt: "1:1" },
  ];
  return (
    <>
      {itens.map((q) => (
        <div key={q.nome} style={abs({ left: q.x, top: q.y, width: q.w, height: q.h, borderRadius: 18, background: q.cheio ? AM : "#fff", border: `3px solid ${AM}`, boxShadow: "0 24px 50px rgba(11,12,14,0.18)", transform: `rotate(${q.rot}deg)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 })}>
          <div style={{ fontFamily: fontFamilies.display, fontSize: 64, letterSpacing: "0.06em", color: INK }}>{q.fmt}</div>
          <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 20, letterSpacing: "0.16em", textTransform: "uppercase", color: INK }}>{q.nome}</div>
        </div>
      ))}
    </>
  );
};

const Lista: React.FC<{ itens: string[]; left: number; top: number; gap: number; fonte: number; largura: number; numerada?: boolean }> = ({ itens, left, top, gap, fonte, largura, numerada }) => (
  <div style={abs({ left, top, width: largura })}>
    {itens.map((p, i) => (
      <div key={p} style={{ display: "flex", alignItems: "center", gap: 22, minHeight: gap }}>
        {numerada ? (
          <div style={{ width: 56, height: 56, borderRadius: 28, background: AM, color: INK, fontFamily: fontFamilies.mono, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{String(i + 1).padStart(2, "0")}</div>
        ) : (
          <div style={{ width: 20, height: 20, background: AM, transform: "rotate(45deg)", flex: "none" }} />
        )}
        <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: fonte, lineHeight: 1.2, color: INK }}>{p}</div>
      </div>
    ))}
  </div>
);

const Palco: React.FC = () => (
  <>
    <Ghost t="Prompt" size={470} style={{ left: X(5) - 10, top: 1010 }} />
    <Ghost t="3" size={1000} style={{ left: X(3) + 740, top: 330 }} />
    {/* círculo âmbar atrás da capa, atravessando para o slide 2 */}
    <div style={abs({ left: 510, top: 930 - 500, width: 1000, height: 1000, borderRadius: 500, background: AM })} />
    <Img src={euCapa} style={abs({ left: 270, bottom: 0, height: 860, width: 860 * (862 / 1378) })} />
    <Card src={fotoNotebook} pos="50% 62%" cx={2010} cy={930} w={1000} h={580} rot={-4} />
    <Fita cx={3240} cy={1170} w={1900} rot={-5} texto="DESCREVA · RENDERIZE · REPITA ·" />
    <Card src={fotoLivro} pos="50% 33%" cx={4390} cy={940} w={800} h={460} rot={3} persp={-10} />
    <div style={abs({ left: 5520 - 380 + 40, top: 900 - 380 + 32, width: 760, height: 760, borderRadius: 380, border: `3px solid ${AM}` })} />
    <div style={abs({ left: 5520 - 380, top: 900 - 380, width: 760, height: 760, borderRadius: 380, overflow: "hidden", boxShadow: "0 30px 60px rgba(11,12,14,0.25)" })}>
      <Img src={fotoEscritorio} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(2.3)", transformOrigin: "70% 37%" }} />
    </div>
    <Quadros />
    <div style={abs({ left: X(8) + 700 - 450, top: 1130 - 450, width: 900, height: 900, borderRadius: 450, background: INK })} />
    <Img src={euFala} style={abs({ left: X(8) + 1110 - 900 * (768 / 1108), bottom: 0, height: 900, width: 900 * (768 / 1108) })} />
    <div style={abs({ left: X(8) + 88, top: 940, width: 170, height: 170, borderRadius: 85, background: INK, display: "flex", alignItems: "center", justifyContent: "center" })}>
      <Logo layout="symbol" finish="metal" height={100} />
    </div>
  </>
);

const Textos: React.FC<{ i: number }> = ({ i }) => {
  const L = X(i);
  const tit = (etq: string, linhas: React.ReactNode[], size = 104) => (
    <div style={abs({ left: L + 88, top: 190 })}>
      <Etiq>{etq}</Etiq>
      <Titulo linhas={linhas} size={size} />
    </div>
  );
  if (i === 1) return (
    <>
      <div style={abs({ left: L + 88, top: 190 })}>
        <Etiq>Guia rápido</Etiq>
        <Titulo linhas={["Edite vídeo", <>com <Marca>Claude Code</Marca></>]} size={100} />
      </div>
      <Apoio style={{ left: L + 88, top: 520, width: 270, fontSize: 30, fontWeight: 600, fontFamily: fontFamilies.heading }}>sem programar, só descrevendo</Apoio>
    </>
  );
  if (i === 2) return (
    <>
      {tit("O ponto", ["Sem timeline,", <>sem <Marca>keyframes</Marca></>])}
      <Apoio style={{ left: L + 88, top: 520, width: 380, fontSize: 26, color: INK, fontWeight: 600 }}>Você descreve a edição. O Claude Code chama a API do Hyperframes e devolve o vídeo renderizado.</Apoio>
    </>
  );
  if (i === 3) return (
    <>
      {tit("Antes de começar", ["O que você", <Marca key="m">precisa</Marca>], 108)}
      <Lista itens={["Claude Code", "Chave da API Hyperframes", "Vídeos em MP4 (H.264)", "Pasta do projeto"]} left={L + 500} top={620} gap={104} fonte={30} largura={520} numerada />
    </>
  );
  if (i === 4) return (
    <>
      {tit("O arquivo-chave", ["Quem manda?", <Marca key="m">CLAUDE.md</Marca>], 108)}
      <Lista itens={["Fonte e cores da marca", "Estilo das legendas", "Regras de render"]} left={L + 88} top={570} gap={104} fonte={34} largura={520} />
      <Apoio style={{ left: L + 88, top: 900, width: 400, fontSize: 24 }}>O Claude Code lê no início de cada sessão.</Apoio>
    </>
  );
  if (i === 5) return (
    <>
      {tit("Texto e motion", ["Descreva o", <Marca key="m">visual</Marca>], 108)}
      <div style={abs({ left: L + 88, top: 560, width: 680, borderRadius: 18, background: INK, padding: "26px 32px", color: "#eef2f5", fontFamily: fontFamilies.mono, fontSize: 25, lineHeight: 1.45 })}>
        <span style={{ color: AM }}>› </span>
        Terço inferior com o nome aos 0:05, por 4 segundos, saindo em fade
      </div>
    </>
  );
  if (i === 6) return (
    <>
      {tit("Legendas", ["Legendas de", <><Marca key="m">3 jeitos</Marca></>], 104)}
      <Lista itens={["SRT que você já tem", "Gerada do áudio", "Estilo por plataforma"]} left={L + 480} top={540} gap={76} fonte={32} largura={560} numerada />
    </>
  );
  if (i === 7) return (
    <>
      {tit("Escala", ["Salve o estilo,", <>rode em <Marca>lote</Marca></>], 100)}
      <Lista itens={["Template no CLAUDE.md", "Um comando, vários vídeos", "Peça a prévia antes de renderizar"]} left={L + 88} top={560} gap={72} fonte={30} largura={900} />
    </>
  );
  return (
    <>
      {tit("Fecho", ["Tarefa repetida?", <Marca key="m">Automatize</Marca>], 92)}
      <div style={abs({ left: L + 88, top: 590, background: AM, color: INK, fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 32, padding: "26px 54px", borderRadius: 999 })}>Chame no direct  →</div>
      <Apoio style={{ left: L + 88, top: 710, width: 330, fontSize: 24 }}>Edição complexa segue com o editor dedicado.</Apoio>
      <Apoio style={{ left: L + 88, top: 830, width: 330, fontSize: 20 }}>Fonte: MindStudio, abr/2026</Apoio>
    </>
  );
};

export const CarrosselClaudeCode: React.FC<{ n: number }> = ({ n }) => {
  const i = Math.min(Math.max(n, 1), N);
  return (
    <AbsoluteFill style={{ background: "#ffffff", overflow: "hidden" }}>
      <div style={abs({ left: -X(i), top: 0, width: W * N, height: H })}>
        <Palco />
        <Textos i={i} />
      </div>
      <div style={abs({ top: 56, left: 88, right: 88, display: "flex", justifyContent: "space-between", alignItems: "center" })}>
        <div style={{ background: INK, borderRadius: 10, padding: "10px 16px" }}><Logo layout="horizontal" height={28} /></div>
        <span style={{ fontFamily: fontFamilies.mono, fontSize: 18, letterSpacing: "0.16em", color: MUT }}>{String(i).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
      </div>
      <div style={abs({ left: 88, right: 88, bottom: 56, borderTop: `1px solid ${LINE}`, paddingTop: 22, display: "flex", justifyContent: "space-between", fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 17, letterSpacing: "0.22em", color: MUT })}>
        <span style={{ background: "rgba(255,255,255,0.92)", padding: "8px 18px", borderRadius: 999 }}>@CFDESIGNER.OFICIAL</span>
        {i < N && <span style={{ background: "rgba(255,255,255,0.92)", padding: "8px 18px", borderRadius: 999 }}>ARRASTE →</span>}
      </div>
    </AbsoluteFill>
  );
};
