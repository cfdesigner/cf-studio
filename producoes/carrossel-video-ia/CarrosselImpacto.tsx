import React from "react";
import { Img } from "remotion";
import { Logo, fontFamilies } from "../../design-systems/cfdesigner";
import { AM, INK, X, abs, CarrosselShell } from "./CarrosselClaudeCode";
import euCapa from "./assets/eu-capa.png";
import euFala from "./assets/eu-fala.png";
import euFrente from "./assets/eu-frente.png";
import euBaixo from "./assets/eu-baixo.png";
import euPerfilDir from "./assets/eu-perfil-dir.png";
import euPerfilEsq from "./assets/eu-perfil-esq.png";

/**
 * Modelo "Impacto" (referência: capas de título gigante com elemento herói vazando do texto).
 * CFDesigner: preto cinema `void` alternando com âmbar, Bebas Neue gigante, palavra em destaque,
 * pílula de chamada e o dono recortado por cima/ao lado do título. Tema: melhores geradores de imagem (llm-stats.com, nov/2026).
 */
const VOID = "#0b0c0e";
const CLARO = "#eef2f5";
const FUNDOS = ["amber", "void", "amber", "void", "amber", "void", "amber", "void"] as const;
const amb = (i: number) => FUNDOS[i - 1] === "amber";

const Fundos: React.FC = () => (
  <>
    {FUNDOS.map((f, k) => (
      <div key={k} style={abs({ left: X(k + 1), top: 0, width: 1080, height: 1350, background: f === "amber" ? AM : VOID })} />
    ))}
  </>
);

const Pessoa: React.FC<{ src: string; razao: number; left: number; h: number; bottom?: number }> = ({ src, razao, left, h, bottom = 0 }) => (
  <Img src={src} style={abs({ left, bottom, height: h, width: h * razao })} />
);

const Palco: React.FC = () => (
  <>
    <Fundos />
    {/* losangos gigantes de tom sobre tom, que atravessam as divisas */}
    <div style={abs({ left: X(1) + 880 - 300, top: 700 - 300, width: 600, height: 600, transform: "rotate(45deg)", border: `5px solid ${INK}`, opacity: 0.18 })} />
    <div style={abs({ left: X(2) + 1000 - 260, top: 1180 - 260, width: 520, height: 520, transform: "rotate(45deg)", background: AM, opacity: 0.14 })} />
    <div style={abs({ left: X(4) + 960 - 280, top: 640 - 280, width: 560, height: 560, transform: "rotate(45deg)", border: `5px solid ${AM}`, opacity: 0.3 })} />
    <div style={abs({ left: X(6) + 120 - 250, top: 1100 - 250, width: 500, height: 500, transform: "rotate(45deg)", background: AM, opacity: 0.14 })} />
    {/* heróis */}
    <Pessoa src={euCapa} razao={862 / 1378} left={X(1) + 480} h={900} bottom={-60} />
    <Pessoa src={euPerfilEsq} razao={1056 / 1210} left={X(3) + 500} h={640} bottom={0} />
    <Pessoa src={euFala} razao={768 / 1108} left={X(4) + 680} h={560} bottom={0} />
    <Pessoa src={euFrente} razao={1056 / 1228} left={X(5) + 510} h={640} bottom={0} />
    <Pessoa src={euPerfilDir} razao={1056 / 1256} left={X(6) + 20} h={560} bottom={0} />
    <Pessoa src={euBaixo} razao={1056 / 1159} left={X(7) + 480} h={620} bottom={0} />
    <Pessoa src={euFala} razao={768 / 1108} left={X(8) + 500} h={880} bottom={0} />
  </>
);

type Linha = { t: string; dest?: boolean };

const Titulo: React.FC<{ i: number; linhas: Linha[]; size: number; top?: number; left?: number }> = ({ i, linhas, size, top = 170, left = 88 }) => {
  const a = amb(i);
  return (
    <div style={abs({ left: X(i) + left, top, fontFamily: fontFamilies.display, fontSize: size, lineHeight: 0.9, letterSpacing: "0.01em", textTransform: "uppercase", color: a ? INK : CLARO })}>
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

const Etiqueta: React.FC<{ i: number; children: React.ReactNode; top?: number }> = ({ i, children, top = 124 }) => (
  <div style={abs({ left: X(i) + 88, top, fontFamily: fontFamilies.heading, fontWeight: 700, fontSize: 18, letterSpacing: "0.32em", textTransform: "uppercase", color: amb(i) ? INK : AM })}>{children}</div>
);

const Pilula: React.FC<{ i: number; left: number; top: number; children: React.ReactNode }> = ({ i, left, top, children }) => (
  <div style={abs({ left: X(i) + left, top, borderRadius: 999, padding: "16px 34px", fontFamily: fontFamilies.heading, fontWeight: 700, fontSize: 24, letterSpacing: "0.1em", background: amb(i) ? INK : AM, color: amb(i) ? AM : INK })}>{children}</div>
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
        <div style={{ marginTop: 26, borderTop: `2px solid ${a ? INK : AM}`, paddingTop: 20, fontFamily: fontFamilies.body, fontSize: 26, lineHeight: 1.35, color: a ? INK : "#9aa3ad" }}>
          <b style={{ fontFamily: fontFamilies.heading, letterSpacing: "0.14em", fontSize: 18 }}>CUIDADO · </b>
          {aviso}
        </div>
      )}
    </div>
  );
};

const Placar: React.FC<{ i: number; pos: number; nome: string; nota: string; top: number }> = ({ i, pos, nome, nota, top }) => (
  <div style={abs({ left: X(i) + 88, top, width: 900, display: "flex", alignItems: "baseline", gap: 28, borderBottom: `2px solid ${amb(i) ? INK : "#2e3238"}`, paddingBottom: 14 })}>
    <div style={{ fontFamily: fontFamilies.display, fontSize: pos === 1 ? 200 : 130, lineHeight: 0.85, color: AM, width: pos === 1 ? 110 : 80 }}>{pos}</div>
    <div style={{ flex: 1, fontFamily: fontFamilies.heading, fontWeight: 700, fontSize: pos === 1 ? 44 : 34, color: CLARO, lineHeight: 1.1 }}>{nome}</div>
    <div style={{ fontFamily: fontFamilies.display, fontSize: pos === 1 ? 150 : 96, lineHeight: 0.85, color: CLARO }}>{nota}</div>
  </div>
);

const Textos = (i: number): React.ReactNode => {
  if (i === 1) return (
    <>
      <Etiqueta i={1}>Novembro de 2026</Etiqueta>
      <Titulo i={1} size={186} linhas={[{ t: "Melhor" }, { t: "gerador" }, { t: "de imagens", dest: true }, { t: "com IA" }]} />
      <Pilula i={1} left={88} top={1130}>Arraste →</Pilula>
    </>
  );
  if (i === 2) return (
    <>
      <Etiqueta i={2}>Arena de imagens</Etiqueta>
      <Titulo i={2} size={170} linhas={[{ t: "Quem lidera" }, { t: "o ranking", dest: true }]} />
      <Placar i={2} pos={1} nome="GPT Image 2" nota="506" top={560} />
      <Placar i={2} pos={2} nome="Grok Imagine Image 2.0" nota="362" top={810} />
      <Placar i={2} pos={3} nome="MAI-Image-2.5" nota="257" top={980} />
      <div style={abs({ left: X(2) + 88, top: 1160, width: 760, fontFamily: fontFamilies.body, fontSize: 24, lineHeight: 1.35, color: "#9aa3ad" })}>11.311 votos humanos anônimos, em comparações às cegas</div>
    </>
  );
  if (i === 3) return (
    <>
      <Etiqueta i={3}>Como é medido</Etiqueta>
      <Titulo i={3} size={200} linhas={[{ t: "Voto às" }, { t: "cegas", dest: true }]} />
      <Pontos i={3} left={88} top={560} w={500} fonte={30} itens={["Cada pedido gera 4 imagens de modelos sorteados", "A pessoa escolhe a melhor e a pior, sem ver o nome", "A nota usa TrueSkill, de forma conservadora"]} />
    </>
  );
  if (i === 4) return (
    <>
      <Etiqueta i={4}>01 · Texto na imagem</Etiqueta>
      <Titulo i={4} size={190} linhas={[{ t: "GPT" }, { t: "Image 2", dest: true }]} />
      <Pontos i={4} left={88} top={560} w={560} fonte={29} itens={["Renderiza texto na imagem com mais confiança", "Segue bem o pedido em cenas complexas"]} aviso="estilo reconhecível e preço premium" />
    </>
  );
  if (i === 5) return (
    <>
      <Etiqueta i={5}>02 · Grátis e rápido</Etiqueta>
      <Titulo i={5} size={170} linhas={[{ t: "Nano" }, { t: "Banana", dest: true }]} />
      <Pontos i={5} left={88} top={520} w={470} fonte={28} itens={["Plano grátis generoso no AI Studio", "Resposta abaixo de 1 segundo em pedidos curtos"]} aviso="em raciocínio complexo, fica atrás do nível Pro" />
      <div style={abs({ left: X(5) + 88, top: 1190, fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 20, letterSpacing: "0.14em", color: INK })}>GEMINI 2.5 FLASH IMAGE</div>
    </>
  );
  if (i === 6) return (
    <>
      <Etiqueta i={6}>03 · Código aberto</Etiqueta>
      <Titulo i={6} size={200} linhas={[{ t: "Flux 2", dest: true }]} />
      <Pontos i={6} left={300} top={440} w={680} fonte={29} itens={["Flux Schnell é gratuito e rápido, com pesos livres", "Flux Pro 1.1 desafia o fotorrealismo dos modelos fechados"]} aviso="o texto na imagem ainda perde para o GPT Image" />
    </>
  );
  if (i === 7) return (
    <>
      <Etiqueta i={7}>Resumo</Etiqueta>
      <Titulo i={7} size={170} linhas={[{ t: "Qual" }, { t: "escolher?", dest: true }]} />
      <Pontos i={7} left={88} top={560} w={460} fonte={27} itens={["Texto e infográfico: GPT Image 2", "Grátis e alto volume: Nano Banana", "Auto-hospedado: Flux"]} />
    </>
  );
  return (
    <>
      <Etiqueta i={8}>Fecho</Etiqueta>
      <Titulo i={8} size={190} linhas={[{ t: "Gostou" }, { t: "do conteúdo?", dest: true }]} />
      <Pilula i={8} left={88} top={720}>Salve e envie</Pilula>
      <div style={abs({ left: X(8) + 88, top: 840, width: 330, fontFamily: fontFamilies.body, fontSize: 19, lineHeight: 1.35, color: "#9aa3ad" })}>Fonte: llm-stats.com, Arena de Imagens, novembro de 2026</div>
      <Logo layout="symbol" finish="metal" height={150} style={{ position: "absolute", left: X(8) + 88, top: 1000 }} />
    </>
  );
};

export const CarrosselImpacto: React.FC<{ n: number }> = ({ n }) => <CarrosselShell n={n} palco={<Palco />} textos={Textos} fundo={VOID} />;
