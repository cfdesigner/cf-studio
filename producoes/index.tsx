import React from "react";
import { Composition } from "remotion";
import { C02_FRAMES, C02Legendas } from "./c02-legendas/C02Legendas";
import { C02Cena1Teste } from "./c02-broll/TextoAtras";
import { CERTI_NEWS_FRAMES, CertiNews } from "./certi-news/CertiNews";

/**
 * Registro das produções (vídeos e peças de verdade).
 * Convenção: uma pasta por produção em producoes/<nome>/, com uma composição que usa UM design system.
 * Registre cada <Composition> aqui. Veja a skill producao-de-video.
 */
export const Producoes: React.FC = () => (
  <>
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
  </>
);
