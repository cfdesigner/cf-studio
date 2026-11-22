// PRODUÇÃO: C02 com b-roll (CFDesigner). Vídeo normalizado em public/entrada/c02-broll-n.mp4; recorte em public/entrada/pessoa-c02/ (ambos ignorados pelo Git).
import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  ChecklistVertical,
  colors,
  FechoSimples,
  LightLeak,
  Legendas,
  PalavraRiscada,
  TextoAtras,
  type Caption,
  type PunchLine,
} from "../../design-systems/cfdesigner";
import { TextoNoParapeito } from "./TextoNoPlano";
import legendasJson from "./legendas.json";

const captions = legendasJson as Caption[];

// Frases de efeito (aprovadas pelo dono). "Transformar completamente" é um texto rastreado no parapeito (TextoNoParapeito).
const punchLines: PunchLine[] = [
  { startMs: 6300, endMs: 7180, keyword: "câmera" },
  { startMs: 18850, endMs: 20300, keyword: "experiência" },
];

const f = (s: number) => Math.round(s * 30);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const VIDEO_FRAMES = 624; // 20,8 s
const FECHO_FRAMES = 75;
export const C02_BROLL_FRAMES = VIDEO_FRAMES + FECHO_FRAMES;
const SAIDA = 18; // zoom + desfoque + escurece no fim do vídeo

/** Vinheta preta suave no topo, só enquanto a palavra riscada está na tela (a chamada pequena lê melhor sobre as folhas). */
const VinhetaTopo: React.FC = () => {
  const fr = useCurrentFrame();
  const o = interpolate(fr, [0, 8, f(1.2) - 8, f(1.2)], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill
      style={{
        opacity: o,
        background:
          "linear-gradient(to bottom, rgba(11,12,14,0.6) 0%, rgba(11,12,14,0) 24%)",
      }}
    />
  );
};

const Corpo: React.FC = () => {
  const fr = useCurrentFrame();
  const p = interpolate(fr, [VIDEO_FRAMES - SAIDA, VIDEO_FRAMES], [0, 1], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });
  const escuro = interpolate(fr, [VIDEO_FRAMES - 10, VIDEO_FRAMES], [1, 0], clamp);
  return (
    <AbsoluteFill
      style={{
        opacity: escuro,
        transform: `scale(${1 + p * 0.14})`,
        filter: `blur(${p * 14}px)`,
      }}
    >
      <OffthreadVideo
        src={staticFile("entrada/c02-broll-n.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {/* Cena 1: texto gigante atrás dele (0 a 3,6 s) */}
      <Sequence from={0} durationInFrames={f(3.57)}>
        <TextoAtras
          pessoa="entrada/pessoa-c02"
          quadros={108}
          entra={69}
          fundoPct={41}
          linhas={[
            [
              { texto: "MUITO", tamanho: 170 },
              { texto: "MAIS", tamanho: 310 },
            ],
            [{ texto: "INTERESSANTE", tamanho: 222, cor: colors.cinema.amber }],
          ]}
        />
      </Sequence>
      {/* Checklist vertical no b-roll da árvore e do mar: marca 0,2 s antes de cada palavra */}
      <Sequence from={f(9.0)} durationInFrames={f(12.81) - f(9.0)}>
        <ChecklistVertical
          titulo="O que muda a cena"
          durationInFrames={f(12.81) - f(9.0)}
          itens={[
            { texto: "Direção", marcaEmMs: 300 },
            { texto: "Composição", marcaEmMs: 1000 },
            { texto: "Cor", marcaEmMs: 1900 },
            { texto: "Iluminação", marcaEmMs: 2250 },
            { texto: "Som", marcaEmMs: 2920 },
          ]}
        />
      </Sequence>
      {/* "Transformar completamente" preso ao parapeito (rastreado): quadros 8 a 47 do trecho que começa em 12,7 s */}
      <Sequence from={f(12.7) + 7} durationInFrames={40}>
        <TextoNoParapeito primeiro={8} duracao={40} />
      </Sequence>
      {/* Legendas por cima de tudo (inclusive da pessoa recortada) */}
      <Legendas captions={captions} punchLines={punchLines} />
      {/* Vazamento de luz no corte em que ele aparece: "E é justamente aí" */}
      <Sequence from={f(15.38) - 6} durationInFrames={36}>
        <LightLeak durationInFrames={36} from="left" />
      </Sequence>
      {/* Palavra riscada: "simplesmente editar" */}
      <Sequence from={f(16.9)} durationInFrames={f(1.2)}>
        <VinhetaTopo />
        <PalavraRiscada
          chamada="Simplesmente"
          palavra="Editar"
          topoPct={3.2}
          escala={0.72}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export const C02Broll: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence durationInFrames={VIDEO_FRAMES}>
      <Corpo />
    </Sequence>
    <Sequence from={VIDEO_FRAMES} durationInFrames={FECHO_FRAMES}>
      <FechoSimples durationInFrames={FECHO_FRAMES} desfoque={18} />
    </Sequence>
  </AbsoluteFill>
);
