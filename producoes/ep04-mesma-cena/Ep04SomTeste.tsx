// Teste da etapa "+ Som" do episódio 04: cena com look (arquivo em public/entrada/canajure/, ignorado pelo Git) + LinhasDeSom.
import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { LinhasDeSom } from "../../design-systems/cfdesigner";

export const EP04_SOM_FRAMES = 150; // 5 s

export const Ep04SomTeste: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <OffthreadVideo src={staticFile("entrada/canajure/cena-dourado.mp4")} startFrom={60} muted />
    <LinhasDeSom
      durationInFrames={EP04_SOM_FRAMES}
      esquerda={34}
      escala={1.15}
      topo={925}
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
