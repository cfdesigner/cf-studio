import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import captionsBrutas from "../../../public/entrada/arrasta-gravacao.captions.json";
import { Legendas } from "../components/Legendas";
import { EntradaLogo, FechoLogo, FundoFecho } from "../components/Fecho";
import { CortinaZigue, SocoDeBatida } from "../efeitos";
import { tempos } from "../movimento";
import type { Caption } from "../../../tecnicas/legendas/texto";

// TESTE do fecho: só o final da fala + a cortina de entrada + o fecho. Gravação de tela de OUTRO grupo (só teste interno).
const FPS = 30;
const A = 50.6;
const B = 52.4;
const T = tempos.transicao;
const FALA = Math.round((B - A) * FPS);
export const FRAMES_FECHO = FALA + 75;

const caps: Caption[] = (captionsBrutas as Caption[])
  .filter((w) => w.startMs >= A * 1000 && w.startMs < B * 1000)
  .map((w) => ({ ...w, startMs: w.startMs - A * 1000, endMs: w.endMs - A * 1000, timestampMs: w.timestampMs === null ? null : w.timestampMs - A * 1000 }));

export const ExemploFecho: React.FC<{ fundo: FundoFecho; entrada: EntradaLogo }> = ({ fundo, entrada }) => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence durationInFrames={FALA}>
      <SocoDeBatida>
        <OffthreadVideo
          src={staticFile("entrada/arrasta-gravacao.mp4")}
          startFrom={Math.round(A * FPS)}
          endAt={Math.round(B * FPS)}
          style={{ position: "absolute", left: "50%", top: 0, height: 1920, width: "auto", transform: "translateX(-50%)" }}
        />
      </SocoDeBatida>
      <Legendas captions={caps} />
    </Sequence>
    <Sequence from={FALA} durationInFrames={75}>
      <FechoLogo fundo={fundo} entrada={entrada} />
    </Sequence>
    <Sequence from={FALA - T / 2} durationInFrames={T}>
      <CortinaZigue cor="#ffffff" w={1080} h={1920} />
    </Sequence>
  </AbsoluteFill>
);
