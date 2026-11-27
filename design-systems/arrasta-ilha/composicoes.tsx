import React from "react";
import { Composition, Still } from "remotion";
import { ExemploMovimento } from "./exemplo/ExemploMovimento";
import { ModeloAviso, ModeloCapa, ModeloDestaque, ModeloEvento, ModeloFecho, ModeloOficina, ModeloPercussao, ModeloToada, PranchaElementos, PranchaFotos, PranchaRecortes, QuadroEtapa1 } from "./components";

/** Composições de referência do Arrasta Ilha. */
export const ArrastaIlhaComposicoes: React.FC = () => (
  <>
    <Still id="ArrastaIlha-Etapa1" component={QuadroEtapa1} width={1500} height={1500} />
    <Still id="ArrastaIlha-Recortes" component={PranchaRecortes} width={1500} height={1400} />
    <Still id="ArrastaIlha-ModeloA-Aviso" component={ModeloAviso} width={1080} height={1350} />
    <Still id="ArrastaIlha-ModeloB-Toada" component={ModeloToada} width={1080} height={1350} />
    <Still id="ArrastaIlha-ModeloC-Oficina" component={ModeloOficina} width={1080} height={1350} />
    <Still id="ArrastaIlha-ModeloD-Percussao" component={ModeloPercussao} width={1080} height={1350} />
    <Still id="ArrastaIlha-ModeloE-Destaque" component={ModeloDestaque} width={1080} height={1350} />
    <Still id="ArrastaIlha-ModeloF-Evento" component={ModeloEvento} width={1080} height={1350} />
    <Still id="ArrastaIlha-ModeloF-Evento-Stories" component={() => <ModeloEvento stories />} width={1080} height={1920} />
    <Still id="ArrastaIlha-ModeloG-Capa" component={ModeloCapa} width={1080} height={1350} />
    <Still id="ArrastaIlha-ModeloG-Capa-Stories" component={() => <ModeloCapa stories />} width={1080} height={1920} />
    <Still id="ArrastaIlha-Fotos" component={PranchaFotos} width={1960} height={1500} />
    <Still id="ArrastaIlha-ModeloH-Fecho" component={ModeloFecho} width={1080} height={1350} />
    <Still id="ArrastaIlha-ModeloH-Fecho-Stories" component={() => <ModeloFecho stories />} width={1080} height={1920} />
    <Still id="ArrastaIlha-Elementos" component={PranchaElementos} width={1900} height={1260} />
    <Composition id="ArrastaIlha-Movimento" component={ExemploMovimento} durationInFrames={66 * 3 + 90} fps={30} width={1080} height={1920} />
  </>
);
