import React from "react";
import { Composition, Still } from "remotion";
import { CarrosselImpacto } from "./carrossel-video-ia/CarrosselImpacto";
import { CarrosselGeradores3 } from "./carrossel-video-ia/CarrosselGeradores3";
import { CarrosselClaudeCode, CARROSSEL_H, CARROSSEL_W } from "./carrossel-video-ia/CarrosselClaudeCode";
import { C02_FRAMES, C02Legendas } from "./c02-legendas/C02Legendas";
import { C02_BROLL_FRAMES, C02Broll } from "./c02-broll/C02Broll";
import { C02Cena1Teste } from "./c02-broll/TextoAtras";
import { HYPER_FRAMES, HyperRealist } from "./hyper-realist/HyperRealist";
import { NASCE_FRAMES, UmVideoNasceAqui } from "./um-video-nasce-aqui/UmVideoNasceAqui";
import { CERTI_NEWS_FRAMES, CertiNews } from "./certi-news/CertiNews";
import { VideoTiagoLemos, calculaMetadados, type Edicao } from "../design-systems/tiago-lemos-01";
import c02TiagoEdicao from "./c02-tiago/edicao.json";
import { EP04_FRAMES, Ep04MesmaCena } from "./serie-conteudos-cfdesigner/ep04-mesma-cena/Ep04MesmaCena";
import { EP04_SOM_FRAMES, EP04_TEXTO_FRAMES, Ep04Convite, Ep04Gancho, Ep04SomTeste } from "./serie-conteudos-cfdesigner/ep04-mesma-cena/Ep04SomTeste";

/**
 * Registro das produções (vídeos e peças de verdade).
 * Convenção: uma pasta por produção em producoes/<nome>/, com uma composição que usa UM design system.
 * Registre cada <Composition> aqui. Veja a skill producao-de-video.
 */
export const Producoes: React.FC = () => (
  <>
    <Composition
      id="C02TiagoLemos"
      component={VideoTiagoLemos}
      durationInFrames={625}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={c02TiagoEdicao as unknown as Edicao}
      calculateMetadata={calculaMetadados}
    />
    <Still
      id="CarrosselImpacto"
      component={CarrosselImpacto}
      width={CARROSSEL_W}
      height={CARROSSEL_H}
      defaultProps={{ n: 1 }}
    />
    <Still
      id="CarrosselGeradores3"
      component={CarrosselGeradores3}
      width={CARROSSEL_W}
      height={CARROSSEL_H}
      defaultProps={{ n: 1 }}
    />
    <Still
      id="CarrosselClaudeCode"
      component={CarrosselClaudeCode}
      width={CARROSSEL_W}
      height={CARROSSEL_H}
      defaultProps={{ n: 1 }}
    />
    <Composition
      id="CertiNews"
      component={CertiNews}
      durationInFrames={CERTI_NEWS_FRAMES}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="C02Legendas"
      component={C02Legendas}
      durationInFrames={C02_FRAMES}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="C02Cena1Teste"
      component={C02Cena1Teste}
      durationInFrames={108}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition id="Ep04MesmaCena" component={Ep04MesmaCena} durationInFrames={EP04_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="Ep04Gancho" component={Ep04Gancho} durationInFrames={EP04_TEXTO_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="Ep04Convite" component={Ep04Convite} durationInFrames={EP04_TEXTO_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="Ep04SomTeste" component={Ep04SomTeste} durationInFrames={EP04_SOM_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="HyperRealistCalma" component={HyperRealist} durationInFrames={HYPER_FRAMES} fps={24} width={1080} height={1920} defaultProps={{ versao: "calma" as const }} />
    <Composition id="HyperRealistInteressante" component={HyperRealist} durationInFrames={HYPER_FRAMES} fps={24} width={1080} height={1920} defaultProps={{ versao: "interessante" as const }} />
    <Composition id="HyperRealistAgressiva" component={HyperRealist} durationInFrames={HYPER_FRAMES} fps={24} width={1080} height={1920} defaultProps={{ versao: "agressiva" as const }} />
    <Composition id="VideoUpscale" component={HyperRealist} durationInFrames={HYPER_FRAMES} fps={24} width={1080} height={1920} defaultProps={{ versao: "interessante" as const, titulo: "video-upscale-4k", apoio: "Topaz Video IA", fonte: "entrada/video-upscale.mov" }} />
    <Composition id="GuardiaoOrmuk" component={HyperRealist} durationInFrames={193} fps={24} width={1080} height={1920} defaultProps={{ versao: "interessante" as const, titulo: "Guardião-Ormuk", apoio: "Magi 2", fonte: "entrada/ormuk.mov", saida: 48 }} />
    <Composition id="C02Broll" component={C02Broll} durationInFrames={C02_BROLL_FRAMES} fps={30} width={1080} height={1920} />
    <Composition
      id="UmVideoNasceAqui"
      component={UmVideoNasceAqui}
      durationInFrames={NASCE_FRAMES}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
