import React from "react";
import { AbsoluteFill } from "remotion";
import "../fonts";
import { Faixa } from "./Original";
import { colors, engrossar, fontFamilies, temas, type TemaNome } from "../tokens";

const Amostra: React.FC<{ nome: string; hex: string; claro?: boolean; nota?: string }> = ({ nome, hex, claro, nota }) => (
  <div style={{ width: 168 }}>
    <div style={{ height: 96, background: hex, border: claro ? `1px solid ${colors.areia}` : "none", borderRadius: 6 }} />
    <div style={{ fontFamily: fontFamilies.etiqueta, fontSize: 22, letterSpacing: 2, marginTop: 8 }}>{nome}</div>
    <div style={{ fontFamily: fontFamilies.corpo, fontSize: 20, color: "#5b4a42" }}>{hex}{nota ? ` · ${nota}` : ""}</div>
  </div>
);

const Post: React.FC<{ tema: TemaNome; etiqueta: string; titulo: string; linha: string }> = ({ tema, etiqueta, titulo, linha }) => {
  const t = temas[tema];
  return (
    <div style={{ width: 360, height: 450, background: colors.creme, border: `1px solid ${colors.areia}`, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 6px 18px #0002" }}>
      <Faixa nome="azulZigue" w={360} alt={22} />
      <div style={{ flex: 1, padding: "26px 28px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontFamily: fontFamilies.etiqueta, fontSize: 20, letterSpacing: 4, color: t.sobreCreme }}>{etiqueta}</div>
        <div style={{ height: 3, width: 70, background: t.sobreCreme, margin: "8px 0 14px" }} />
        <div style={{ fontFamily: fontFamilies.display, fontWeight: 400, fontSize: 72, lineHeight: 0.95, color: colors.noite, textTransform: "uppercase", WebkitTextStroke: `${72 * engrossar.padrao}px ${colors.noite}`, paintOrder: "stroke fill" }}>{titulo}</div>
        <div style={{ fontFamily: fontFamilies.corpo, fontSize: 21, color: "#4a3a33", marginTop: 14 }}>{linha}</div>
      </div>
      <div style={{ background: t.fundo, color: t.texto, fontFamily: fontFamilies.etiqueta, letterSpacing: 3, fontSize: 20, padding: "10px 28px" }}>DOMINGOS · 15H · ESPAÇO ARUANDA · UFSC</div>
    </div>
  );
};

/** Etapa 1: cores, tipografia e três peças de teste. Prancha para aprovar. */
export const QuadroEtapa1: React.FC = () => (
  <AbsoluteFill style={{ background: colors.creme, padding: 48, color: colors.noite }}>
    <div style={{ fontFamily: fontFamilies.pincel, fontSize: 64 }}>Arrasta Ilha</div>
    <div style={{ fontFamily: fontFamilies.etiqueta, fontSize: 24, letterSpacing: 6, color: colors.laranjaTexto }}>DESIGN SYSTEM · ETAPA 1 · CORES E TIPOGRAFIA</div>

    <div style={{ fontFamily: fontFamilies.etiqueta, fontSize: 24, letterSpacing: 4, margin: "28px 0 10px" }}>CORES (medidas nos prints do site)</div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
      <Amostra nome="NOITE" hex={colors.noite} />
      <Amostra nome="LARANJA" hex={colors.laranja} />
      <Amostra nome="PETRÓLEO" hex={colors.petroleo} />
      <Amostra nome="MARINHO" hex={colors.marinho} />
      <Amostra nome="VERDE" hex={colors.verde} />
      <Amostra nome="VERDE-FOLHA" hex={colors.verdeFolha} />
      <Amostra nome="AZUL-BANDEIRA" hex={colors.azulBandeira} />
      <Amostra nome="TERRA" hex={colors.terra} />
      <Amostra nome="AREIA" hex={colors.areia} claro />
      <Amostra nome="CREME" hex={colors.creme} claro />
    </div>

    <div style={{ fontFamily: fontFamilies.etiqueta, fontSize: 24, letterSpacing: 4, margin: "30px 0 10px" }}>TIPOGRAFIA (proposta, a aprovar)</div>
    <div style={{ display: "flex", gap: 32, alignItems: "flex-end" }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: fontFamilies.display, fontWeight: 400, fontSize: 104, lineHeight: 0.95, textTransform: "uppercase", WebkitTextStroke: `${104 * engrossar.padrao}px ${colors.noite}`, paintOrder: "stroke fill" }}>Toque junto</div>
        <div style={{ fontFamily: fontFamilies.pincel, fontSize: 52, color: colors.laranjaTexto }}>maracatu de baque virado</div>
        <div style={{ fontFamily: fontFamilies.corpo, fontSize: 26, marginTop: 8, maxWidth: 520 }}>O domingo à tarde é o momento pleno do grupo: troca, ensaio, assembleia e vivência.</div>
      </div>
      <div style={{ fontFamily: fontFamilies.corpo, fontSize: 20, color: "#5b4a42", width: 300 }}>
        <b>Títulos:</b> Zenzero Grotesk Sans (a do site)<br /><b>Pincel:</b> Kaushan Script<br /><b>Texto:</b> Crimson Pro<br /><b>Etiquetas:</b> Staatliches
      </div>
    </div>

    <div style={{ fontFamily: fontFamilies.etiqueta, fontSize: 24, letterSpacing: 4, margin: "30px 0 12px" }}>TRÊS TEMAS, MESMA LINGUAGEM</div>
    <div style={{ display: "flex", gap: 28 }}>
      <Post tema="laranja" etiqueta="ENSAIO ABERTO" titulo="Domingo tem maracatu" linha="Chegue, toque e dance com o grupo" />
      <Post tema="verde" etiqueta="PLATAFORMA" titulo="Toada nova no ar" linha="Escute e aprenda na plataforma" />
      <Post tema="azul" etiqueta="OFICINA" titulo="Oficina com mestre" linha="Vagas e horário em breve" />
    </div>
  </AbsoluteFill>
);
