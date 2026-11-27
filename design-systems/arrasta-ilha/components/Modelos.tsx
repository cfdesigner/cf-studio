import React from "react";
import { AbsoluteFill } from "remotion";
import "../fonts";
import { colors, engrossar, fontFamilies, temas, type TemaNome } from "../tokens";
import { Arcos, FaixaPadrao, FolhaPalma, GrupoPontos, Mancha, MolduraTambor, Sol, Tracejado } from "./Grafismos";

const titulo = (tam: number, cor: string = colors.noite): React.CSSProperties => ({
  fontFamily: fontFamilies.display,
  fontSize: tam,
  lineHeight: 0.92,
  color: cor,
  textTransform: "uppercase",
  WebkitTextStroke: `${tam * engrossar.padrao}px ${cor}`,
  paintOrder: "stroke fill",
});
const etiqueta = (tam: number, cor: string): React.CSSProperties => ({ fontFamily: fontFamilies.etiqueta, fontSize: tam, letterSpacing: tam * 0.18, color: cor });

const Foto: React.FC<{ rotulo?: string }> = ({ rotulo = "FOTO DO GRUPO" }) => (
  <AbsoluteFill style={{ background: `repeating-linear-gradient(135deg, ${colors.areia} 0 22px, #ecd9c8 22px 44px)`, alignItems: "center", justifyContent: "center" }}>
    <div style={etiqueta(30, "#8a6a55")}>{rotulo}</div>
  </AbsoluteFill>
);

/** Prancha com todos os grafismos. */
export const PranchaGrafismos: React.FC = () => (
  <AbsoluteFill style={{ background: colors.creme, padding: 48, color: colors.noite }}>
    <div style={{ fontFamily: fontFamilies.pincel, fontSize: 60 }}>Grafismos do Arrasta Ilha</div>
    <div style={etiqueta(22, colors.laranjaTexto)}>DESENHADOS A PARTIR DO REPERTÓRIO DO SITE · TROCAR PELOS ORIGINAIS DO GRUPO</div>
    <div style={{ display: "flex", gap: 40, marginTop: 36, alignItems: "flex-end", flexWrap: "wrap" }}>
      <FolhaPalma size={330} />
      <FolhaPalma size={330} cor={colors.verde} />
      <GrupoPontos size={250} />
      <Sol size={210} />
      <Arcos size={330} />
      <Tracejado size={240} />
      <div style={{ position: "relative" }}><Mancha size={300} /></div>
      <MolduraTambor size={250}><Foto rotulo="FOTO" /></MolduraTambor>
    </div>
    <div style={{ ...etiqueta(22, colors.noite), margin: "34px 0 10px" }}>FAIXAS DE PADRÃO</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 1100 }}>
      <FaixaPadrao variante="zigue" cor={colors.laranjaTexto} w={1100} />
      <FaixaPadrao variante="losangos" cor={colors.verde} w={1100} />
      <FaixaPadrao variante="triangulos" cor={colors.terra} w={1100} />
      <FaixaPadrao variante="simbolos" cor="#fff" fundo={colors.azulBandeira} w={1100} />
    </div>
  </AbsoluteFill>
);

const Servico: React.FC<{ tema: TemaNome; texto: string }> = ({ tema, texto }) => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 120, background: temas[tema].fundo, color: temas[tema].texto, ...etiqueta(36, temas[tema].texto), display: "flex", alignItems: "center", paddingLeft: 72 }}>{texto}</div>
);

/** A: aviso tipográfico, folha e pontos nos cantos, sol discreto. Laranja. */
export const ModeloAviso: React.FC = () => (
  <AbsoluteFill style={{ background: colors.creme }}>
    <div style={{ position: "absolute", right: -60, top: 40 }}><Mancha size={640} /></div>
    <div style={{ position: "absolute", right: 30, top: 120, transform: "rotate(14deg)" }}><FolhaPalma size={560} /></div>
    <div style={{ position: "absolute", right: 360, top: 90 }}><Sol size={190} /></div>
    <div style={{ position: "absolute", left: 40, top: 110 }}><GrupoPontos size={230} /></div>
    <FaixaPadrao variante="zigue" cor={colors.laranjaTexto} w={1080} alt={50} />
    <div style={{ position: "absolute", left: 72, top: 520 }}>
      <div style={etiqueta(34, colors.laranjaTexto)}>ENSAIO ABERTO</div>
      <div style={{ height: 5, width: 150, background: colors.laranjaTexto, margin: "16px 0 30px" }} />
      <div style={titulo(190)}>Domingo<br />tem<br />maracatu</div>
      <div style={{ fontFamily: fontFamilies.corpo, fontSize: 46, color: "#4a3a33", marginTop: 34 }}>Chegue, toque e dance com o grupo</div>
    </div>
    <Servico tema="laranja" texto="DOMINGOS · 15H · ESPAÇO ARUANDA · UFSC" />
  </AbsoluteFill>
);

/** B: foto do grupo na moldura de tambor, faixa de símbolos no topo. Verde. */
export const ModeloMoldura: React.FC = () => (
  <AbsoluteFill style={{ background: colors.creme }}>
    <FaixaPadrao variante="simbolos" cor="#fff" fundo={colors.verde} w={1080} alt={64} />
    <div style={{ position: "absolute", left: -90, top: 360 }}><Arcos size={620} cor="#a9cdb8" /></div>
    <div style={{ position: "absolute", right: -40, top: 230 }}><FolhaPalma size={420} cor={colors.verde} /></div>
    <div style={{ position: "absolute", left: 280, top: 120 }}>
      <MolduraTambor size={520}><Foto /></MolduraTambor>
    </div>
    <div style={{ position: "absolute", left: 72, right: 72, top: 680 }}>
      <div style={etiqueta(34, colors.verde)}>PLATAFORMA</div>
      <div style={{ height: 5, width: 150, background: colors.verde, margin: "14px 0 26px" }} />
      <div style={titulo(150)}>Toada nova no ar</div>
      <div style={{ fontFamily: fontFamilies.corpo, fontSize: 44, color: "#4a3a33", marginTop: 26 }}>Escute e aprenda com o grupo</div>
    </div>
    <div style={{ position: "absolute", right: 50, bottom: 150 }}><GrupoPontos size={170} cor={colors.verdeFolha} /></div>
    <Servico tema="verde" texto="ARRASTAILHA.COM.BR · PLATAFORMA DIGITAL" />
  </AbsoluteFill>
);

/** C: cartaz de oficina com mestre convidado, fundo marinho, creme sobre cor. Azul. */
export const ModeloOficina: React.FC = () => (
  <AbsoluteFill style={{ background: colors.marinho }}>
    <FaixaPadrao variante="losangos" cor={colors.creme} w={1080} alt={58} />
    <div style={{ position: "absolute", right: -50, top: 130 }}><Arcos size={640} cor="#3b6b9e" /></div>
    <div style={{ position: "absolute", right: 60, top: 150 }}><Sol size={200} cor={colors.laranja} /></div>
    <div style={{ position: "absolute", left: 72, top: 400 }}>
      <div style={etiqueta(34, colors.laranja)}>OFICINA COM MESTRE CONVIDADO</div>
      <div style={{ height: 5, width: 150, background: colors.laranja, margin: "16px 0 30px" }} />
      <div style={titulo(170, colors.creme)}>Oficina<br />de maracatu</div>
      <div style={{ ...titulo(96, colors.laranja), marginTop: 34 }}>[Nome do mestre]</div>
      <div style={{ fontFamily: fontFamilies.corpo, fontSize: 46, color: colors.creme, marginTop: 34, lineHeight: 1.25 }}>[Data] · [Horário]<br />[Local] · [Vagas e inscrição]</div>
    </div>
    <div style={{ position: "absolute", left: 50, top: 130 }}><GrupoPontos size={190} cor={colors.laranja} /></div>
    <div style={{ position: "absolute", right: 60, bottom: 140, fontFamily: fontFamilies.pincel, fontSize: 64, color: colors.creme }}>Arrasta Ilha</div>
    <FaixaPadrao variante="simbolos" cor="#fff" fundo={colors.azulBandeira} w={1080} alt={64} />
  </AbsoluteFill>
);
