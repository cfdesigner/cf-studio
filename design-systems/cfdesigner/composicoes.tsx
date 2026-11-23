import React from "react";
import { Composition, Still } from "remotion";
import { CFDesignerShowcase } from "./Showcase";
import { ExemploFundos } from "./exemplo/ExemploFundos";
import { ExemploEfeitos } from "./exemplo/ExemploEfeitos";
import { ExemploGraficos } from "./exemplo/ExemploGraficos";
import { ExemploIcone } from "./exemplo/ExemploIcone";
import { ExemploLegendas } from "./exemplo/ExemploLegendas";

/** Composições de referência do CFDesigner. Entram no Root.tsx; pode apagar quando quiser. */
export const CFDesignerComposicoes: React.FC = () => (
  <>
    <Still
      id="CFDesigner-Componentes"
      component={CFDesignerShowcase}
      width={1600}
      height={1500}
    />
    <Composition
      id="CFDesigner-Legendas-Exemplo"
      component={ExemploLegendas}
      durationInFrames={150}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="CFDesigner-Efeitos-Exemplo"
      component={ExemploEfeitos}
      durationInFrames={210}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="CFDesigner-Fundos-Exemplo"
      component={ExemploFundos}
      durationInFrames={540}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="CFDesigner-Graficos-Exemplo"
      component={ExemploGraficos}
      durationInFrames={360}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="CFDesigner-Icone-Inclinacao"
      component={ExemploIcone}
      durationInFrames={90}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ inclinacao: 25, inclinacaoY: 25 }}
    />
  </>
);
