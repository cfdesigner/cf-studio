import React from "react";
import { Img } from "remotion";
import { fontFamilies } from "../../design-systems/cfdesigner";
import { AM, INK, X, abs, CarrosselShell } from "./CarrosselClaudeCode";
import { Etiqueta, Fundos, Titulo, VOID } from "./CarrosselImpacto";
import heroiOlho from "./assets/impacto/heroi-capa-olho.png";
import heroiRanking from "./assets/impacto/heroi-ranking.png";

/**
 * Modelo "Impacto" com arte gerada (Magnific, a pedido do dono): capa e página do ranking.
 * Heróis em PNG transparente: mãos (robô e humana) segurando um quadro dourado com o dono dentro; pódio com troféu em losango.
 */
const Palco: React.FC = () => (
  <>
    <Fundos />
    {/* capa: olho desconstruído (arte gerada) ocupando o quadro, vazando por trás do título */}
    <Img src={heroiOlho} style={abs({ left: X(1) + 250, top: 330, width: 900, height: 1200 })} />
    {/* ranking: pódio */}
    <Img src={heroiRanking} style={abs({ left: X(2) + 380, top: 690, width: 700, height: 700 })} />
  </>
);

const Linha: React.FC<{ pos: number; nome: string; nota: string; top: number }> = ({ pos, nome, nota, top }) => (
  <div style={abs({ left: X(2) + 88, top, width: 470, display: "flex", alignItems: "baseline", gap: 18, borderBottom: "2px solid #2e3238", paddingBottom: 12 })}>
    <div style={{ fontFamily: fontFamilies.display, fontSize: pos === 1 ? 150 : 100, lineHeight: 0.85, color: AM, width: pos === 1 ? 80 : 56 }}>{pos}</div>
    <div style={{ flex: 1, fontFamily: fontFamilies.heading, fontWeight: 700, fontSize: pos === 1 ? 32 : 26, color: "#eef2f5", lineHeight: 1.1 }}>{nome}</div>
    <div style={{ fontFamily: fontFamilies.display, fontSize: pos === 1 ? 110 : 76, lineHeight: 0.85, color: "#eef2f5" }}>{nota}</div>
  </div>
);

const Textos = (i: number): React.ReactNode => {
  if (i === 1) return (
    <>
      <Etiqueta i={1}>Novembro de 2026</Etiqueta>
      <Titulo i={1} size={200} linhas={[{ t: "Melhor" }, { t: "gerador" }, { t: "de imagens", dest: true }, { t: "com IA" }]} />
    </>
  );
  return (
    <>
      <Etiqueta i={2}>Arena de imagens</Etiqueta>
      <Titulo i={2} size={170} linhas={[{ t: "Quem lidera" }, { t: "o ranking", dest: true }]} />
      <Linha pos={1} nome="GPT Image 2" nota="506" top={560} />
      <Linha pos={2} nome="Grok Imagine Image 2.0" nota="362" top={760} />
      <Linha pos={3} nome="MAI-Image-2.5" nota="257" top={900} />
      <div style={abs({ left: X(2) + 88, top: 1060, width: 400, fontFamily: fontFamilies.body, fontSize: 24, lineHeight: 1.35, color: "#9aa3ad" })}>11.311 votos humanos anônimos, em comparações às cegas</div>
    </>
  );
};

export const CarrosselImpactoArte: React.FC<{ n: number }> = ({ n }) => <CarrosselShell n={n} palco={<Palco />} textos={Textos} fundo={VOID} />;
void INK; void AM;
