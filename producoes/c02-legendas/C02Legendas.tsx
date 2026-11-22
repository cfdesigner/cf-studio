// PRODUÇÃO: C02, legendas + gráficos + b-roll com o CFDesigner. Vídeos em public/entrada/ (ignorada pelo Git).
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
  ChecklistCard,
  FechoSimples,
  FlashCut,
  LightLeak,
  Legendas,
  PalavraRiscada,
  WipeReveal,
  type Caption,
  type PunchLine,
} from "../../design-systems/cfdesigner";
import legendasJson from "./legendas.json";

const captions = legendasJson as Caption[];

// Frases de efeito (aprovadas pelo dono).
const punchLines: PunchLine[] = [
  { startMs: 4100, endMs: 5400, keyword: "câmera" },
  { startMs: 17500, endMs: 18840, keyword: "experiência" },
];

const f = (s: number) => Math.round(s * 30);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Vídeo: 19,5 s. Fecho com o logo: +2,5 s. */
const VIDEO_FRAMES = 585;
const FECHO_FRAMES = 75;
export const C02_FRAMES = VIDEO_FRAMES + FECHO_FRAMES;
const TRANSICAO = 27;

const Broll: React.FC<{
  arquivo: string;
  startFrom?: number;
  velocidade?: number;
}> = ({ arquivo, startFrom = 0, velocidade = 1 }) => (
  <AbsoluteFill>
    <OffthreadVideo
      src={staticFile(arquivo)}
      muted
      startFrom={startFrom}
      playbackRate={velocidade}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </AbsoluteFill>
);

const Corpo: React.FC = () => {
  const fr = useCurrentFrame();
  // transição final: zoom + desfoque + escurece
  const p = interpolate(fr, [VIDEO_FRAMES - TRANSICAO, VIDEO_FRAMES], [0, 1], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });
  const escuro = interpolate(
    fr,
    [VIDEO_FRAMES - 12, VIDEO_FRAMES],
    [1, 0],
    clamp,
  );
  // zoom de impacto em "câmera" (4,1 a 5,4 s)
  const punch = interpolate(
    fr,
    [f(4.1), f(4.1) + 10, f(5.2), f(5.5)],
    [0, 1, 1, 0],
    {
      ...clamp,
      easing: Easing.out(Easing.cubic),
    },
  );
  const escala = (1 + p * 0.16) * (1 + punch * 0.07);
  return (
    <AbsoluteFill
      style={{
        opacity: escuro,
        transform: `scale(${escala})`,
        filter: `blur(${p * 16}px)`,
      }}
    >
      <OffthreadVideo
        src={staticFile("entrada/C02.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {/* B-roll 1: "uma imagem" (imagem sem vida) */}
      <Sequence from={f(0.9)} durationInFrames={f(1.4)}>
        {/* clipe de 3 s acelerado (2,15x) para caber inteiro nos 1,4 s */}
        <Broll arquivo="entrada/broll/b1.mp4" velocidade={2.15} />
      </Sequence>
      {/* B-roll 2: "produção gigantesca" */}
      <Sequence from={f(5.5)} durationInFrames={f(1.3)}>
        <Broll arquivo="entrada/broll/b2.mp4" />
      </Sequence>
      <Sequence from={f(5.5) - 2} durationInFrames={14}>
        <FlashCut at={2} durationInFrames={12} />
      </Sequence>
      {/* B-roll 3: "transformar": a mesma cena sem tratamento e com cor e luz, revelada por cortina */}
      <Sequence from={f(11.3)} durationInFrames={f(2.4)}>
        <WipeReveal direction="right" durationInFrames={14}>
          <Broll arquivo="entrada/broll/b3.mp4" startFrom={30} />
        </WipeReveal>
      </Sequence>
      <Legendas captions={captions} punchLines={punchLines} />
      {/* Checklist: "direção, composição, cor, iluminação e som" (no topo, acima da cabeça) */}
      <Sequence from={f(7.3)} durationInFrames={f(3.6)}>
        <ChecklistCard
          titulo="O que muda a cena"
          durationInFrames={f(3.6)}
          topo={70}
          tamanho={56}
          itens={[
            { texto: "Direção", marcaEmMs: 300 },
            { texto: "Composição", marcaEmMs: 1000 },
            { texto: "Cor", marcaEmMs: 1820 },
            { texto: "Iluminação", marcaEmMs: 2220 },
            { texto: "Som", marcaEmMs: 2900 },
          ]}
        />
      </Sequence>
      {/* Vazamento de luz na virada: "E é justamente aí" */}
      <Sequence from={f(13.9)} durationInFrames={36}>
        <LightLeak durationInFrames={36} from="left" />
      </Sequence>
      {/* Palavra riscada: "simplesmente editar" */}
      <Sequence from={f(15.8)} durationInFrames={f(1.1)}>
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

export const C02Legendas: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence durationInFrames={VIDEO_FRAMES}>
      <Corpo />
    </Sequence>
    <Sequence from={VIDEO_FRAMES - TRANSICAO} durationInFrames={TRANSICAO + 12}>
      <LightLeak durationInFrames={TRANSICAO + 12} from="left" />
    </Sequence>
    <Sequence from={VIDEO_FRAMES} durationInFrames={FECHO_FRAMES}>
      <FechoSimples durationInFrames={FECHO_FRAMES} desfoque={18} />
    </Sequence>
  </AbsoluteFill>
);
