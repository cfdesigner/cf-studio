import React from "react";
import { Composition, Still } from "remotion";
import { ExemploMovimento } from "./exemplo/ExemploMovimento";
import { QuadroEtapa1, ComparativoPeso } from "./components";

/** Composições de referência do Arrasta Ilha. */
export const ArrastaIlhaComposicoes: React.FC = () => (
  <>
    <Still id="ArrastaIlha-Etapa1" component={QuadroEtapa1} width={1500} height={1500} />
    <Still id="ArrastaIlha-Peso" component={ComparativoPeso} width={1500} height={1000} />
    <Composition id="ArrastaIlha-Movimento" component={ExemploMovimento} durationInFrames={66 * 3 + 90} fps={30} width={1080} height={1920} />
  </>
);
