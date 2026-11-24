import React from "react";
import { Img } from "remotion";
import { Logo, fontFamilies } from "../../design-systems/cfdesigner";
import { AM, INK, X, abs, CarrosselShell } from "./CarrosselClaudeCode";
import euFala from "./assets/eu-fala.png";
import arteOlho from "./assets/impacto/heroi-capa-olho.png";
import artePodio from "./assets/impacto/heroi-ranking.png";
import arteCegas from "./assets/impacto/heroi-cegas.png";
import arteGpt from "./assets/impacto/heroi-gpt.png";
import arteNano from "./assets/impacto/heroi-nano.png";
import arteFlux from "./assets/impacto/heroi-flux.png";

/**
 * Modelo "Impacto" (referência: capas de título gigante com arte desconstruída vazando do texto).
 * CFDesigner: preto cinema alternando com âmbar, Bebas Neue gigante, palavra em destaque, losangos tom sobre tom.
 * Uma arte por slide, ligada ao conteúdo (geradas no Magnific a pedido do dono: papel rasgado, meio-tom, ouro líquido, pixels).
 * O dono só aparece no último slide. Tema: melhores geradores de imagem (llm-stats.com, nov/2026).
 */
const VOID = "#0b0c0e";
const CLARO = "#eef2f5";
const CINZA = "#9aa3ad";
const FUNDOS = ["amber", "void", "amber", "void", "amber", "void", "amber", "void"] as const;
const amb = (i: number) => FUNDOS[i - 1] === "amber";

const Fundos: React.FC = () => (
  <>
    {FUNDOS.map((f, k) => (
      <div key={k} style={abs({ left: X(k + 1), top: 0, width: 1080, height: 1350, background: f === "amber" ? AM : VOID })} />
    ))}
  </>
);

const Arte: React.FC<{ src: string; i: number; left: number; top: number; w: number; h: number }> = ({ src, i, left, top, w, h }) => (
  <Img src={src} style={abs({ left: X(i) + left, top, width: w, height: h })} />
);

const Palco: React.FC = () => (
  <>
    <Fundos />
    {/* losangos gigantes tom sobre tom, que atravessam as divisas */}
    <div style={abs({ left: X(2) + 1000 - 260, top: 380 - 260, width: 520, height: 520, transform: "rotate(45deg)", border: `5px solid ${AM}`, opacity: 0.28 })} />
    <div style={abs({ left: X(4) + 130 - 250, top: 1000 - 250, width: 500, height: 500, transform: "rotate(45deg)", background: AM, opacity: 0.12 })} />
    <div style={abs({ left: X(6) + 960 - 260, top: 360 - 260, width: 520, height: 520, transform: "rotate(45deg)", border: `5px solid ${AM}`, opacity: 0.28 })} />
    <div style={abs({ left: X(7) + 900 - 300, top: 1000 - 300, width: 600, height: 600, transform: "rotate(45deg)", border: `5px solid ${INK}`, opacity: 0.2 })} />
    {/* artes */}
    <Arte src={arteOlho} i={1} left={250} top={330} w={900} h={1200} />
    <Arte src={artePodio} i={2} left={380} top={690} w={700} h={700} />
    <Arte src={arteCegas} i={3} left={0} top={400} w={720} h={960} />
    <Arte src={arteGpt} i={4} left={0} top={480} w={680} h={907} />
    <Arte src={arteNano} i={5} left={500} top={520} w={720} h={960} />
    <Arte src={arteFlux} i={6} left={380} top={400} w={780} h={1040} />
  </>
);

type Linha = { t: string; dest?: boolean };

const Titulo: React.FC<{ i: number; linhas: Linha[]; size: number; top?: number; direita?: boolean; sombra?: number }> = ({ i, linhas, size, top = 170, direita, sombra }) => {
  const a = amb(i);
  return (
    <div style={abs({ ...(direita ? { left: X(i) + 88, width: 904, textAlign: "right" as const } : { left: X(i) + 88 }), top, fontFamily: fontFamilies.display, fontSize: size, lineHeight: 0.9, letterSpacing: "0.01em", textTransform: "uppercase", color: a ? INK : CLARO, ...(sombra && a ? { textShadow: `${sombra}px ${sombra}px 0 ${AM}` } : {}) })}>
      {linhas.map((l, k) => (
        <div key={k}>
          {l.dest ? (
            <span style={a ? { background: INK, color: AM, padding: "0 18px", display: "inline-block", lineHeight: 0.98 } : { color: AM }}>{l.t}</span>
          ) : (
            l.t
          )}
        </div>
      ))}
    </div>
  );
};

const Etiqueta: React.FC<{ i: number; children: React.ReactNode; direita?: boolean }> = ({ i, children, direita }) => (
  <div style={abs({ ...(direita ? { left: X(i) + 88, width: 904, textAlign: "right" as const } : { left: X(i) + 88 }), top: 124, fontFamily: fontFamilies.heading, fontWeight: 700, fontSize: 18, letterSpacing: "0.32em", textTransform: "uppercase", color: amb(i) ? INK : AM })}>{children}</div>
);

const Pontos: React.FC<{ i: number; itens: string[]; left: number; top: number; w: number; fonte?: number; aviso?: string }> = ({ i, itens, left, top, w, fonte = 30, aviso }) => {
  const a = amb(i);
  return (
    <div style={abs({ left: X(i) + left, top, width: w })}>
      {itens.map((t) => (
        <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 20 }}>
          <div style={{ width: 16, height: 16, background: a ? INK : AM, transform: "rotate(45deg)", flex: "none", marginTop: fonte * 0.4 }} />
          <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: fonte, lineHeight: 1.22, color: a ? INK : CLARO }}>{t}</div>
        </div>
      ))}
      {aviso && (
        <div style={{ marginTop: 26, borderTop: `2px solid ${a ? INK : AM}`, paddingTop: 20, fontFamily: fontFamilies.body, fontSize: 26, lineHeight: 1.35, color: a ? INK : CINZA }}>
          <b style={{ fontFamily: fontFamilies.heading, letterSpacing: "0.14em", fontSize: 18 }}>CUIDADO · </b>
          {aviso}
        </div>
      )}
    </div>
  );
};

const Linha1: React.FC<{ pos: number; nome: string; nota: string; top: number }> = ({ pos, nome, nota, top }) => (
  <div style={abs({ left: X(2) + 88, top, width: 470, display: "flex", alignItems: "baseline", gap: 18, borderBottom: "2px solid #2e3238", paddingBottom: 12 })}>
    <div style={{ fontFamily: fontFamilies.display, fontSize: pos === 1 ? 150 : 100, lineHeight: 0.85, color: AM, width: pos === 1 ? 80 : 56 }}>{pos}</div>
    <div style={{ flex: 1, fontFamily: fontFamilies.heading, fontWeight: 700, fontSize: pos === 1 ? 32 : 26, color: CLARO, lineHeight: 1.1 }}>{nome}</div>
    <div style={{ fontFamily: fontFamilies.display, fontSize: pos === 1 ? 110 : 76, lineHeight: 0.85, color: CLARO }}>{nota}</div>
  </div>
);

const Escolha: React.FC<{ i: number; top: number; legenda: string; nome: string }> = ({ i, top, legenda, nome }) => (
  <div style={abs({ left: X(i) + 88, top, width: 900, borderTop: `3px solid ${INK}`, paddingTop: 16 })}>
    <div style={{ fontFamily: fontFamilies.heading, fontWeight: 700, fontSize: 22, letterSpacing: "0.22em", textTransform: "uppercase", color: INK }}>{legenda}</div>
    <div style={{ fontFamily: fontFamilies.display, fontSize: 118, lineHeight: 0.95, color: INK, textTransform: "uppercase" }}>{nome}</div>
  </div>
);

const Textos = (i: number): React.ReactNode => {
  if (i === 1) return (
    <>
      <Etiqueta i={1}>Novembro de 2026</Etiqueta>
      <Titulo i={1} size={200} sombra={4} linhas={[{ t: "Melhor" }, { t: "gerador" }, { t: "de imagens", dest: true }, { t: "com IA" }]} />
    </>
  );
  if (i === 2) return (
    <>
      <Etiqueta i={2}>Arena de imagens</Etiqueta>
      <Titulo i={2} size={170} linhas={[{ t: "Quem lidera" }, { t: "o ranking", dest: true }]} />
      <Linha1 pos={1} nome="GPT Image 2" nota="506" top={560} />
      <Linha1 pos={2} nome="Grok Imagine Image 2.0" nota="362" top={760} />
      <Linha1 pos={3} nome="MAI-Image-2.5" nota="257" top={900} />
      <div style={abs({ left: X(2) + 88, top: 1060, width: 400, fontFamily: fontFamilies.body, fontSize: 24, lineHeight: 1.35, color: CINZA })}>11.311 votos humanos anônimos, em comparações às cegas</div>
    </>
  );
  if (i === 3) return (
    <>
      <Etiqueta i={3} direita>Como é medido</Etiqueta>
      <div style={abs({ left: X(3) + 88, width: 904, top: 190, textAlign: "right", fontFamily: fontFamilies.display, fontSize: 178, lineHeight: 0.95, letterSpacing: "0.01em", textTransform: "uppercase", color: INK, whiteSpace: "nowrap" })}>
        Voto às <span style={{ background: INK, color: AM, padding: "0 16px", display: "inline-block", lineHeight: 1 }}>cegas</span>
      </div>
      <Pontos i={3} left={680} top={560} w={310} fonte={25} itens={["Cada pedido gera 4 imagens de modelos sorteados", "A pessoa escolhe a melhor e a pior, sem ver o nome", "A nota usa TrueSkill, de forma conservadora"]} />
    </>
  );
  if (i === 4) return (
    <>
      <Etiqueta i={4}>01 · Texto na imagem</Etiqueta>
      <Titulo i={4} size={190} linhas={[{ t: "GPT" }, { t: "Image 2", dest: true }]} />
      <Pontos i={4} left={710} top={600} w={290} fonte={25} itens={["Renderiza texto na imagem com mais confiança", "Segue bem o pedido em cenas complexas"]} aviso="estilo reconhecível e preço premium" />
    </>
  );
  if (i === 5) return (
    <>
      <Etiqueta i={5}>02 · Grátis e rápido</Etiqueta>
      <Titulo i={5} size={190} linhas={[{ t: "Nano" }, { t: "Banana", dest: true }]} />
      <Pontos i={5} left={88} top={560} w={330} fonte={26} itens={["Plano grátis generoso no AI Studio", "Resposta abaixo de 1 segundo em pedidos curtos"]} aviso="em raciocínio complexo, fica atrás do nível Pro" />
      <div style={abs({ left: X(5) + 88, top: 1190, fontFamily: fontFamilies.heading, fontWeight: 700, fontSize: 20, letterSpacing: "0.14em", color: INK })}>GEMINI 2.5 FLASH IMAGE</div>
    </>
  );
  if (i === 6) return (
    <>
      <Etiqueta i={6}>03 · Código aberto</Etiqueta>
      <Titulo i={6} size={230} linhas={[{ t: "Flux 2", dest: true }]} />
      <Pontos i={6} left={88} top={470} w={360} fonte={26} itens={["Flux Schnell é gratuito e rápido, com pesos livres", "Flux Pro 1.1 desafia o fotorrealismo dos modelos fechados"]} aviso="o texto na imagem ainda perde para o GPT Image" />
    </>
  );
  if (i === 7) return (
    <>
      <Etiqueta i={7}>Resumo</Etiqueta>
      <Titulo i={7} size={170} linhas={[{ t: "Qual" }, { t: "escolher?", dest: true }]} />
      <Escolha i={7} top={520} legenda="Texto e infográfico" nome="GPT Image 2" />
      <Escolha i={7} top={730} legenda="Grátis e alto volume" nome="Nano Banana" />
      <Escolha i={7} top={940} legenda="Auto-hospedado" nome="Flux" />
    </>
  );
  return (
    <>
      <Etiqueta i={8}>Fecho</Etiqueta>
      <Titulo i={8} size={190} linhas={[{ t: "Gostou" }, { t: "do conteúdo?", dest: true }]} />
      {/* o dono, só no último slide, com a cabeça passando por cima do título */}
      <Img src={euFala} style={abs({ left: X(8) + 480, bottom: 0, height: 920, width: 920 * (768 / 1108) })} />
      <div style={abs({ left: X(8) + 88, top: 720, borderRadius: 999, padding: "16px 34px", fontFamily: fontFamilies.heading, fontWeight: 700, fontSize: 24, letterSpacing: "0.1em", background: AM, color: INK })}>Salve e envie</div>
      <div style={abs({ left: X(8) + 88, top: 840, width: 330, fontFamily: fontFamilies.body, fontSize: 19, lineHeight: 1.35, color: CINZA })}>Fonte: llm-stats.com, Arena de Imagens, novembro de 2026</div>
      <Logo layout="symbol" finish="metal" height={150} style={{ position: "absolute", left: X(8) + 88, top: 1000 }} />
    </>
  );
};

export const CarrosselImpacto: React.FC<{ n: number }> = ({ n }) => <CarrosselShell n={n} palco={<Palco />} textos={Textos} fundo={VOID} />;
