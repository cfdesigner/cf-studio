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
      esquerda={34}
      escala={1.15}
      topo={470}
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

/** Texto grande no alto, entre o personagem e as folhas das árvores (gancho e convite final). */
const TextoAlto: React.FC<{ inicio: number; branco: string; ambar: string; tamanho: number }> = ({ inicio, branco, ambar, tamanho }) => (
  <AbsoluteFill style={{ background: "#000" }}>
    <OffthreadVideo src={staticFile("entrada/canajure/cena-ambar.mp4")} startFrom={inicio} muted />
    <AbsoluteFill style={{ alignItems: "center", top: 410, height: 300, justifyContent: "center" }}>
      <div
        style={{
          fontFamily: fontFamilies.display,
          fontSize: tamanho,
          lineHeight: 0.95,
          letterSpacing: "0.02em",
          color: colors.cinema.ink,
          textShadow: "0 4px 24px rgba(0,0,0,0.45)",
          textAlign: "center",
        }}
      >
        {branco} <span style={{ color: colors.cinema.amber }}>{ambar}</span>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

export const Ep04Gancho: React.FC = () => <TextoAlto inicio={195} branco="MESMA" ambar="CENA" tamanho={190} />;
export const Ep04Convite: React.FC = () => <TextoAlto inicio={320} branco="QUAL MUDOU" ambar="MAIS?" tamanho={150} />;
