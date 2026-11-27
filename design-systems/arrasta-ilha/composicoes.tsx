import React from "react";
import { Composition, Still } from "remotion";
import { ExemploMovimento } from "./exemplo/ExemploMovimento";
import fotoKaren from "./assets/aplicacoes/regente-karen.png";
import { LegendaOpcao, ModeloEnsaio, ModeloProgramacao as ModeloAvisoProgramacao, PostDomingueiraStories, PostDomingueira, PostCamisetas, ModeloAniversario, CarrosselBaque, CarrosselCapa, CarrosselFecho, CarrosselOficina, CarrosselServico, CarrosselToque, FolhaDesignSystem, CapaPainel, PaginaIcone, PaginaPersonagem, PaginaTitulo, ModeloAviso, ModeloCapa, ModeloDestaque, ModeloEvento, ModeloFecho, ModeloOficina, ModeloPercussao, ModeloToada, PranchaElementos, PranchaFotos, PranchaRecortes, QuadroEtapa1 } from "./components";

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
    <Still id="ArrastaIlha-Pagina1-Titulo" component={() => <PaginaTitulo />} width={1080} height={1350} />
    <Still id="ArrastaIlha-Pagina2-Personagem" component={() => <PaginaPersonagem />} width={1080} height={1350} />
    <Still id="ArrastaIlha-Pagina3-Icone" component={() => <PaginaIcone />} width={1080} height={1350} />
    <Still id="ArrastaIlha-Pagina4-Capa" component={() => <CapaPainel />} width={1080} height={1350} />
    <Still id="ArrastaIlha-Pagina1-Titulo-Stories" component={() => <PaginaTitulo stories />} width={1080} height={1920} />
    <Still id="ArrastaIlha-Pagina2-Personagem-Stories" component={() => <PaginaPersonagem stories />} width={1080} height={1920} />
    <Still id="ArrastaIlha-Folha" component={FolhaDesignSystem} width={2400} height={5350} />
    <Still id="ArrastaIlha-Carrossel-1-Capa" component={CarrosselCapa} width={1080} height={1350} />
    <Still id="ArrastaIlha-Carrossel-2-Toque" component={CarrosselToque} width={1080} height={1350} />
    <Still id="ArrastaIlha-Carrossel-3-Baque" component={CarrosselBaque} width={1080} height={1350} />
    <Still id="ArrastaIlha-Carrossel-4-Servico" component={CarrosselServico} width={1080} height={1350} />
    <Still id="ArrastaIlha-Carrossel-5-Oficina" component={CarrosselOficina} width={1080} height={1350} />
    <Still id="ArrastaIlha-Carrossel-6-Fecho" component={CarrosselFecho} width={1080} height={1350} />
    <Still id="ArrastaIlha-Modelo-Aniversario" component={ModeloAniversario} width={1080} height={1350} />
    <Still id="ArrastaIlha-Modelo-Aniversario-Stories" component={ModeloAniversario} defaultProps={{ stories: true }} width={1080} height={1920} />
    <Still id="ArrastaIlha-Aplicacao-Aniversario" component={ModeloAniversario} defaultProps={{ titulo: "Regente", nome: "Karen", data: "22 de novembro", mensagem: "A Família Arrasta Ilha lhe deseja um vendaval de axé para o novo ciclo!", foto: fotoKaren }} width={1080} height={1350} />
    <Still id="ArrastaIlha-Aplicacao-Aniversario-Stories" component={ModeloAniversario} defaultProps={{ stories: true, titulo: "Regente", nome: "Karen", data: "22 de novembro", mensagem: "A Família Arrasta Ilha lhe deseja um vendaval de axé para o novo ciclo!", foto: fotoKaren }} width={1080} height={1920} />
    <Still id="ArrastaIlha-Aplicacao-Camisetas" component={PostCamisetas} width={1080} height={1350} />
    <Still id="ArrastaIlha-Aplicacao-Camisetas-Stories" component={PostCamisetas} defaultProps={{ stories: true }} width={1080} height={1920} />
    <Still id="ArrastaIlha-Aplicacao-Domingueira-Branco" component={PostDomingueira} defaultProps={{ variante: "branco" }} width={1080} height={1350} />
    <Still id="ArrastaIlha-Aplicacao-Domingueira-Azul" component={PostDomingueira} defaultProps={{ variante: "azul" }} width={1080} height={1350} />
    <Still id="ArrastaIlha-Aplicacao-Domingueira-Degrade" component={PostDomingueira} defaultProps={{ variante: "degrade" }} width={1080} height={1350} />
    <Still id="ArrastaIlha-Aplicacao-Domingueira-Degrade-Stories" component={PostDomingueiraStories} width={1080} height={1920} />
    <Still id="ArrastaIlha-Aplicacao-Ensaio" component={ModeloEnsaio} width={1080} height={1350} />
    <Still id="ArrastaIlha-Aplicacao-Programacao" component={ModeloAvisoProgramacao} width={1080} height={1350} />
    <Still id="ArrastaIlha-Legenda-A" component={LegendaOpcao} defaultProps={{ opcao: "A" }} width={1080} height={1920} />
    <Still id="ArrastaIlha-Legenda-B" component={LegendaOpcao} defaultProps={{ opcao: "B" }} width={1080} height={1920} />
    <Still id="ArrastaIlha-Legenda-C" component={LegendaOpcao} defaultProps={{ opcao: "C" }} width={1080} height={1920} />
    <Still id="ArrastaIlha-Legenda-D" component={LegendaOpcao} defaultProps={{ opcao: "D" }} width={1080} height={1920} />
    <Composition id="ArrastaIlha-Movimento" component={ExemploMovimento} durationInFrames={66 * 3 + 90} fps={30} width={1080} height={1920} />
  </>
);
