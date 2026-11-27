import React from "react";
import { Composition, Still } from "remotion";
import { ExemploMovimento } from "./exemplo/ExemploMovimento";
import { QuadroEtapa1, ComparativoPeso, ModeloAviso, ModeloMoldura, ModeloOficina, ModeloPercussao, PranchaGrafismos } from "./components";

/** Composições de referência do Arrasta Ilha. */
export const ArrastaIlhaComposicoes: React.FC = () => (
  <>
    <Still id="ArrastaIlha-Etapa1" component={QuadroEtapa1} width={1500} height={1500} />
    <Still id="ArrastaIlha-Peso" component={ComparativoPeso} width={1500} height={1000} />
    <Still id="ArrastaIlha-Grafismos" component={PranchaGrafismos} width={1500} height={1400} />
    <Still id="ArrastaIlha-ModeloA-Aviso" component={ModeloAviso} width={1080} height={1350} />
    <Still id="ArrastaIlha-ModeloB-Moldura" component={ModeloMoldura} width={1080} height={1350} />
    <Still id="ArrastaIlha-ModeloC-Oficina" component={ModeloOficina} width={1080} height={1350} />
    <Still id="ArrastaIlha-ModeloD-Percussao" component={ModeloPercussao} width={1080} height={1350} />
    <Composition id="ArrastaIlha-Movimento" component={ExemploMovimento} durationInFrames={66 * 3 + 90} fps={30} width={1080} height={1920} />
  </>
);
