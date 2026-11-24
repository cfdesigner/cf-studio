import React from "react";
import { Composition, Still } from "remotion";
import { CarrosselSlide, CARROSSEL_H, CARROSSEL_W } from "./carrossel-video-ia/Carrossel";
import { C02_FRAMES, C02Legendas } from "./c02-legendas/C02Legendas";
import { C02_BROLL_FRAMES, C02Broll } from "./c02-broll/C02Broll";
import { C02Cena1Teste } from "./c02-broll/TextoAtras";
import { NASCE_FRAMES, UmVideoNasceAqui } from "./um-video-nasce-aqui/UmVideoNasceAqui";
import { CERTI_NEWS_FRAMES, CertiNews } from "./certi-news/CertiNews";
import { EP04_FRAMES, Ep04MesmaCena } from "./ep04-mesma-cena/Ep04MesmaCena";
import { EP04_SOM_FRAMES, EP04_TEXTO_FRAMES, Ep04Convite, Ep04Gancho, Ep04SomTeste } from "./ep04-mesma-cena/Ep04SomTeste";

/**
 * Registro das produções (vídeos e peças de verdade).
 * Convenção: uma pasta por produção em producoes/<nome>/, com uma composição que usa UM design system.
 * Registre cada <Composition> aqui. Veja a skill producao-de-video.
 */
export const Producoes: React.FC = () => (
  <>
    <Still
      id="CarrosselVideoIA"
      component={CarrosselSlide}
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
