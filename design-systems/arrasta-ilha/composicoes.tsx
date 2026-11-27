import React from "react";
import { Composition, Still } from "remotion";
import { ExemploMovimento } from "./exemplo/ExemploMovimento";
import { ModeloAviso, ModeloCapa, ModeloDestaque, ModeloEvento, ModeloFecho, ModeloOficina, ModeloPercussao, ModeloToada, PranchaElementos, PranchaFotos, SlideCapaToadas, SlideToada, PranchaRecortes, QuadroEtapa1 } from "./components";

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
    <Still id="ArrastaIlha-Toadas-1-Capa" component={SlideCapaToadas} width={1080} height={1350} />
    <Still id="ArrastaIlha-Toadas-2-Rainha" component={() => <SlideToada numero="02" titulo="Rainha da Diáspora" credito="Criador: Charles Raimundo" verso={["Rainha da diáspora", "Africana do Brasil", "Ao sul és nossa guia", "com sua graça, com sua graça"]} foto="fotoMulherBandeira" alturaFoto={800} topoFoto={470} faixaTopo="ofAxeBuzios" />} width={1080} height={1350} />
    <Still id="ArrastaIlha-Toadas-3-Rua" component={() => <SlideToada numero="15" titulo="Rua" credito="Criadores: Charles Raimundo e Léo" verso={["Hoje a rua é nossa,", "desde tempos ancestrais", "Girando na rua é Arrasta Ilha", "Fazendo da rua o seu carnaval"]} foto="fotoTocadoresChapeuCor" alturaFoto={470} topoFoto={760} faixaTopo="ofArmas" larguraTexto={600} fotoNaBorda />} width={1080} height={1350} />
    <Still id="ArrastaIlha-Toadas-4-Ubuntu" component={() => <SlideToada numero="08" titulo="Ubuntu" credito="Criador: Charles Raimundo · 2018" verso={["A matriz é nossa escola,", "um por todos,", "Ubuntu"]} foto="fotoAdultoEMeninoCaixa" alturaFoto={860} topoFoto={420} faixaTopo="ofDancarinos" />} width={1080} height={1350} />
    <Still id="ArrastaIlha-Toadas-5-Fecho" component={ModeloFecho} width={1080} height={1350} />
    <Composition id="ArrastaIlha-Movimento" component={ExemploMovimento} durationInFrames={66 * 3 + 90} fps={30} width={1080} height={1920} />
  </>
);
