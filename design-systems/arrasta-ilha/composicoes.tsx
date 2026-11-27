import React from "react";
import { Still } from "remotion";
import { QuadroEtapa1, ComparativoPeso } from "./components";

/** Composições de referência do Arrasta Ilha. */
export const ArrastaIlhaComposicoes: React.FC = () => (
  <>
    <Still id="ArrastaIlha-Etapa1" component={QuadroEtapa1} width={1500} height={1500} />
    <Still id="ArrastaIlha-Peso" component={ComparativoPeso} width={1500} height={1000} />
  </>
);
