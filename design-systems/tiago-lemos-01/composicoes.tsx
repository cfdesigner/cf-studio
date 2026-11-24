import React from "react";
import { Composition } from "remotion";
import { VideoTiagoLemos, calculaMetadados } from "./components";
import { exemploEdicao } from "./exemplo/exemplo";

/** Composições de referência do tiago-lemos-01. Entram no Root.tsx. */
export const TiagoLemos01Composicoes: React.FC = () => (
  <>
    <Composition
      id="TiagoLemos01-Exemplo"
      component={VideoTiagoLemos}
      durationInFrames={330}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={exemploEdicao}
      calculateMetadata={calculaMetadados}
    />
    <Composition
      id="TiagoLemos01-Exemplo-Cheio"
      component={VideoTiagoLemos}
      durationInFrames={330}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ ...exemploEdicao, layout: "cheio" as const }}
      calculateMetadata={calculaMetadados}
    />
  </>
);
