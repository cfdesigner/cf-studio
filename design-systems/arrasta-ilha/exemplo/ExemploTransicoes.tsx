import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import captionsBrutas from "../../../public/entrada/arrasta-gravacao.captions.json";
import { Legendas, type PunchArrasta } from "../components/Legendas";
import { FechoLogo } from "../components/Fecho";
import { CortinaZigue, SocoDeBatida, TextoAtras } from "../efeitos";
import { colors } from "../tokens";
import { tempos } from "../movimento";
import type { Caption } from "../../../tecnicas/legendas/texto";

// TESTE de transição + legenda + fecho com uma gravação de tela (312x482, só para teste interno).
// O vídeo é de OUTRO grupo (Maracatu Raízes de África): serve só para testar; não publicar.
const FPS = 30;
type Corte = { a: number; b: number; cortina: string };
const CORTES: Corte[] = [
  { a: 23.3, b: 27.9, cortina: colors.marinho },
  { a: 39.9, b: 43.7, cortina: colors.laranjaVivo },
  { a: 48.3, b: 52.4, cortina: colors.branco },
];
const dur = (c: Corte) => Math.round((c.b - c.a) * FPS);
const T = tempos.transicao;

const brutas = captionsBrutas as Caption[];
// Correções de transcrição (a confirmar com o dono): "Maracantho" é "Maracatu".
const corrige = (s: string) => s.replace("Maracantho", "Maracatu");

const montar = () => {
  const out: Caption[] = [];
  const inicios: number[] = [];
  let acc = 0;
  CORTES.forEach((c) => {
    inicios.push(acc);
    brutas
      .filter((w) => w.startMs >= c.a * 1000 && w.startMs < c.b * 1000)
      .forEach((w) => {
        const sh = (acc / FPS) * 1000 - c.a * 1000;
        out.push({ ...w, text: corrige(w.text), startMs: w.startMs + sh, endMs: w.endMs + sh, timestampMs: w.timestampMs === null ? null : w.timestampMs + sh });
      });
    acc += dur(c);
  });
  return { caps: out, inicios, total: acc };
};
const { caps, inicios, total } = montar();
// Frases de efeito (para o dono aprovar): corte 1 "Esse maracatu já está fundado" e corte 3 "Aqui a gente distribui sinceridade"
const iniMs = (i: number) => (inicios[i] / FPS) * 1000;
// Corte 1: primeiro a frase de efeito NA FRENTE (embaixo), depois, quando a cena vira para o recorte, a frente apaga e a frase entra atrás da cabeça.
const TROCA = 28; // quadro da troca (frente → atrás)
const punch: PunchArrasta[] = [
  { startMs: iniMs(0) - 60, endMs: iniMs(0) + (TROCA / FPS) * 1000, keyword: "Maracatu" },
  { startMs: iniMs(0) + (TROCA / FPS) * 1000, endMs: iniMs(0) + 2100, keyword: "Maracatu", atras: true },
  { startMs: iniMs(2) - 60, endMs: iniMs(2) + (50.6 - 48.3) * 1000, keyword: "sinceridade" },
];

export const FRAMES_TRANSICOES = total + 75;
export const FRAMES_RECORTE = 100;

export const ExemploTransicoes: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    {CORTES.map((c, i) => (
      <Sequence key={i} from={inicios[i]} durationInFrames={dur(c)}>
        <SocoDeBatida>
          <OffthreadVideo
            src={staticFile("entrada/arrasta-gravacao.mp4")}
            startFrom={Math.round(c.a * FPS)}
            endAt={Math.round(c.b * FPS)}
            style={{ position: "absolute", left: "50%", top: 0, height: 1920, width: "auto", transform: "translateX(-50%)", filter: "contrast(1.04) saturate(1.05)" }}
          />
          {i === 0 && <TextoAtras pessoa="entrada/pessoa-corte1" quadros={66} entra={TROCA} sai={62} linhas={[{ texto: "Maracatu", tamanho: 240, centroY: 300 }, { texto: "já está fundado", tamanho: 124, centroY: 470, cor: "#ffffff" }]} />}
        </SocoDeBatida>
      </Sequence>
    ))}
    <Sequence from={total} durationInFrames={75}>
      <FechoLogo />
    </Sequence>
    <Legendas captions={caps} punchLines={punch} />
    {CORTES.map((c, i) => {
      const corte = i === 0 ? null : inicios[i];
      return corte === null ? null : (
        <Sequence key={`c${i}`} from={corte - T / 2} durationInFrames={T}>
          <CortinaZigue cor={CORTES[i - 1].cortina} w={1080} h={1920} />
        </Sequence>
      );
    })}
    <Sequence from={total - T / 2} durationInFrames={T}>
      <CortinaZigue cor={CORTES[2].cortina} w={1080} h={1920} />
    </Sequence>
  </AbsoluteFill>
);
