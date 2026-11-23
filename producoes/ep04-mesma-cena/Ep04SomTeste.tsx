// Teste da etapa "+ Som" do episódio 04: cena com look (arquivo em public/entrada/canajure/, ignorado pelo Git) + LinhasDeSom.
import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { colors, LinhasDeSom } from "../../design-systems/cfdesigner";
import { fontFamilies } from "../../design-systems/cfdesigner/tokens";

export const EP04_SOM_FRAMES = 150; // 5 s
export const EP04_TEXTO_FRAMES = 60; // 2 s

export const Ep04SomTeste: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <OffthreadVideo src={staticFile("entrada/canajure/cena-ambar.mp4")} startFrom={60} muted />
    <LinhasDeSom
      durationInFrames={EP04_SOM_FRAMES}
      esquerda={150}
      escala={1.5}
      trilha={330}
      alturaFaixa={26}
      giroDe={32}
      giroAte={-32}
      topo={540}
      faixas={[
        { nome: "Voz", cor: "petroleo", segmentos: [{ deMs: 0, ateMs: 1500 }] },
        { nome: "Ambiente", cor: "ambar", segmentos: [{ deMs: 0, ateMs: 5000 }] },
        {
          nome: "Whoosh",
          cor: "ambar",
          segmentos: [
            { deMs: 150, ateMs: 400 },
            { deMs: 1350, ateMs: 1600 },
            { deMs: 2550, ateMs: 2800 },
            { deMs: 3750, ateMs: 4000 },
          ],
        },
        { nome: "Impacto", cor: "ambar", segmentos: [{ deMs: 3100, ateMs: 3900 }] },
        {
          nome: "Tique",
          cor: "petroleo",
          segmentos: [
            { deMs: 700, ateMs: 820 },
            { deMs: 1900, ateMs: 2020 },
            { deMs: 3000, ateMs: 3120 },
          ],
        },
      ]}
    />
  </AbsoluteFill>
);

/** Texto no alto, entre o personagem e as folhas das árvores: uma linha grande e uma pequena (gancho e convite final). */
const TextoAlto: React.FC<{
  inicio: number;
  grande: React.ReactNode;
  pequena: React.ReactNode;
  tamanho: number;
  tamanhoPequena: number;
  pequenaEmCima?: boolean;
}> = ({ inicio, grande, pequena, tamanho, tamanhoPequena, pequenaEmCima }) => {
  const sombra = "0 4px 24px rgba(0,0,0,0.45)";
  const g = (
    <div style={{ fontFamily: fontFamilies.display, fontSize: tamanho, lineHeight: 0.95, letterSpacing: "0.02em", color: colors.cinema.ink, textShadow: sombra }}>
      {grande}
    </div>
  );
  const pq = (
    <div style={{ fontFamily: fontFamilies.display, fontSize: tamanhoPequena, lineHeight: 1, letterSpacing: "0.14em", color: colors.cinema.ink, opacity: 0.92, textShadow: sombra }}>
      {pequena}
    </div>
  );
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <OffthreadVideo src={staticFile("entrada/canajure/cena-ambar.mp4")} startFrom={inicio} muted />
      <AbsoluteFill style={{ alignItems: "center", top: 400, height: 340, justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
          {pequenaEmCima ? pq : g}
          {pequenaEmCima ? g : pq}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const A = colors.cinema.amber;
export const Ep04Gancho: React.FC = () => (
  <TextoAlto inicio={195} tamanho={190} tamanhoPequena={64} grande={<>MESMA <span style={{ color: A }}>CENA</span></>} pequena={<>3 MUDANÇAS</>} />
);
export const Ep04Convite: React.FC = () => (
  <TextoAlto inicio={320} tamanho={150} tamanhoPequena={64} pequenaEmCima grande={<>QUAL MUDOU <span style={{ color: A }}>MAIS?</span></>} pequena={<>MESMA CENA</>} />
);
