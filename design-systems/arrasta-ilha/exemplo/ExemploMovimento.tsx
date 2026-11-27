import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import "../fonts";
import { colors, engrossar, fontFamilies, temas, type TemaNome } from "../tokens";
import { clamp, firme, tempos } from "../movimento";
import { CortinaZigue, EtiquetaFirme, FileteDesenha, SocoDeBatida, TituloBatida } from "../efeitos";
import { FaixaZigue } from "../components";

const W = 1080;
const H = 1920;

const Cena: React.FC<{ tema: TemaNome; etiqueta: string; titulo: string; linha: string }> = ({ tema, etiqueta, titulo, linha }) => {
  const t = temas[tema];
  const frame = useCurrentFrame();
  const linhaT = firme(interpolate(frame, [26, 40], [0, 1], clamp));
  return (
    <SocoDeBatida>
      <AbsoluteFill style={{ background: colors.creme }}>
        <FaixaZigue cor={t.sobreCreme} w={W} alt={44} />
        <div style={{ position: "absolute", left: 90, right: 90, top: 560 }}>
          <EtiquetaFirme atraso={4} style={{ fontFamily: fontFamilies.etiqueta, fontSize: 44, letterSpacing: 8, color: t.sobreCreme }}>{etiqueta}</EtiquetaFirme>
          <div style={{ margin: "20px 0 36px" }}><FileteDesenha cor={t.sobreCreme} largura={170} atraso={8} /></div>
          <TituloBatida
            texto={titulo}
            atraso={10}
            style={{ fontFamily: fontFamilies.display, fontSize: 210, lineHeight: 0.92, color: colors.noite, textTransform: "uppercase", WebkitTextStroke: `${210 * engrossar.padrao}px ${colors.noite}`, paintOrder: "stroke fill" }}
          />
          <div style={{ fontFamily: fontFamilies.corpo, fontSize: 52, color: "#4a3a33", marginTop: 40, opacity: linhaT, transform: `translateY(${(1 - linhaT) * 24}px)` }}>{linha}</div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 130, background: t.fundo, color: t.texto, fontFamily: fontFamilies.etiqueta, fontSize: 44, letterSpacing: 6, display: "flex", alignItems: "center", paddingLeft: 90 }}>
          DOMINGOS · 15H · ESPAÇO ARUANDA · UFSC
        </div>
      </AbsoluteFill>
    </SocoDeBatida>
  );
};

const Fecho: React.FC = () => {
  const frame = useCurrentFrame();
  const t = firme(interpolate(frame, [0, 16], [0, 1], clamp));
  return (
    <SocoDeBatida>
      <AbsoluteFill style={{ background: colors.noite, alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: fontFamilies.pincel, fontSize: 190, color: colors.creme, opacity: t, transform: `translateY(${(1 - t) * 30}px)` }}>Arrasta Ilha</div>
        <div style={{ fontFamily: fontFamilies.etiqueta, fontSize: 40, letterSpacing: 8, color: colors.laranja, opacity: t }}>MARACATU · FLORIANÓPOLIS · DESDE 2002</div>
      </AbsoluteFill>
    </SocoDeBatida>
  );
};

const CENA = 66; // 2,2 s por cena
const T = tempos.transicao;

/** Vídeo de teste do movimento (stories 9:16, ~9 s, sem som). Cada corte usa a cortina em zigue-zague na cor da cena que entra. */
export const ExemploMovimento: React.FC = () => (
  <AbsoluteFill style={{ background: colors.creme }}>
    <Sequence durationInFrames={CENA + T}>
      <Cena tema="laranja" etiqueta="ENSAIO ABERTO" titulo="Domingo tem maracatu" linha="Chegue, toque e dance com o grupo" />
    </Sequence>
    <Sequence from={CENA} durationInFrames={CENA + T}>
      <Cena tema="verde" etiqueta="PLATAFORMA" titulo="Toada nova no ar" linha="Escute e aprenda com o grupo" />
    </Sequence>
    <Sequence from={CENA * 2} durationInFrames={CENA + T}>
      <Cena tema="azul" etiqueta="OFICINA" titulo="Oficina com mestre" linha="Vagas e horário em breve" />
    </Sequence>
    <Sequence from={CENA * 3} durationInFrames={90}>
      <Fecho />
    </Sequence>
    <Sequence from={CENA - T / 2} durationInFrames={T}><CortinaZigue cor={temas.verde.fundo} w={W} h={H} /></Sequence>
    <Sequence from={CENA * 2 - T / 2} durationInFrames={T}><CortinaZigue cor={temas.azul.fundo} w={W} h={H} /></Sequence>
    <Sequence from={CENA * 3 - T / 2} durationInFrames={T}><CortinaZigue cor={colors.noite} w={W} h={H} /></Sequence>
  </AbsoluteFill>
);
