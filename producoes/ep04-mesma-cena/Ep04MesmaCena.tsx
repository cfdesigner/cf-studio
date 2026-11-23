// PRODUÇÃO: Episódio 04 "Mesma cena" (Reels 21,4 s, CFDesigner, look Âmbar Cinema). 100 BPM: o primeiro kick da música cai em 9,2 s.
// Arquivos de entrada (ignorados pelo Git) em public/entrada/canajure/: cena-bruto.mp4 (visual cinza, 18–30 s da cena) e cena-ambar.mp4 (com o look).
// O vídeo sai sem áudio; a narração, a música e os efeitos são mixados por producoes/ep04-mesma-cena/mixar.py.
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  colors,
  EtiquetaRotulo,
  FechoSimples,
  FlashCut,
  LinhaChamada,
  LinhasDeSom,
  Legendas,
} from "../../design-systems/cfdesigner";
import { fontFamilies } from "../../design-systems/cfdesigner/tokens";
import legendas from "./legendas.json";

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
export const EP04_FRAMES = f(21.4);

const c = colors.cinema;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Trechos da cena. `ini` = segundo da cena original (arquivos cena-bruto-full.mp4 e cena-ambar-full.mp4, 30,7 s). Cortes sempre em batidas (0,6 s) de 100 BPM.
 *  Sem braços levantados (pedido do dono): giros, olhar para baixo, passos. O último plano (ele vindo para a câmera) foi aprovado. */
type Plano = { de: number; ate: number; arq: "bruto" | "ambar"; ini: number; zoom?: number };
const PLANOS: Plano[] = [
  { de: 0, ate: 2.6, arq: "ambar", ini: 1.2 }, // gancho: ele vira de perfil para as costas, já com o look
  { de: 2.6, ate: 5.6, arq: "bruto", ini: 6.5 }, // bruto: um plano só, parado, sem cortes ("sem vida")
  // ritmo (visual bruto)
  { de: 5.6, ate: 6.8, arq: "bruto", ini: 4.6 }, // gira de costas para perfil
  { de: 6.8, ate: 8.0, arq: "bruto", ini: 15.6, zoom: 1.35 }, // olha para baixo
  { de: 8.0, ate: 9.2, arq: "bruto", ini: 13.2 }, // troca o peso e se vira para a câmera
  // cor (clarão em 9,2 s)
  { de: 9.2, ate: 10.4, arq: "ambar", ini: 17.6 }, // passo e giro
  { de: 10.4, ate: 11.6, arq: "ambar", ini: 25.4, zoom: 1.35 }, // se vira
  { de: 11.6, ate: 12.2, arq: "ambar", ini: 16.8 },
  // som
  { de: 12.2, ate: 13.4, arq: "ambar", ini: 2.2 }, // de costas
  { de: 13.4, ate: 14.6, arq: "ambar", ini: 13.4, zoom: 1.35 },
  { de: 14.6, ate: 15.8, arq: "ambar", ini: 18.6 },
  { de: 15.8, ate: 16.4, arq: "ambar", ini: 10.8 },
  // resultado: ele vindo para a câmera (aprovado pelo dono)
  { de: 16.4, ate: 19.4, arq: "ambar", ini: 27.7 },
];

const Camada: React.FC<{ p: Plano }> = ({ p }) => (
  <AbsoluteFill style={{ overflow: "hidden", background: "#000" }}>
    <AbsoluteFill style={p.zoom ? { transform: `scale(${p.zoom})`, transformOrigin: "50% 72%" } : undefined}>
      <OffthreadVideo src={staticFile(`entrada/canajure/cena-${p.arq}-full.mp4`)} startFrom={f(p.ini)} muted />
    </AbsoluteFill>
  </AbsoluteFill>
);

/** Texto no alto, entre o personagem e as folhas: uma linha grande e uma pequena e branca. */
const TextoAlto: React.FC<{
  durationInFrames: number;
  grande: React.ReactNode;
  pequena: string;
  tamanho: number;
  pequenaEmCima?: boolean;
}> = ({ durationInFrames, grande, pequena, tamanho, pequenaEmCima }) => {
  const fr = useCurrentFrame();
  const opacity =
    interpolate(fr, [0, 6], [0, 1], clamp) * interpolate(fr, [durationInFrames - 5, durationInFrames], [1, 0], clamp);
  const sombra = "0 4px 24px rgba(0,0,0,0.45)";
  const g = (
    <div style={{ fontFamily: fontFamilies.display, fontSize: tamanho, lineHeight: 0.95, letterSpacing: "0.02em", color: c.ink, textShadow: sombra }}>
      {grande}
    </div>
  );
  const pq = (
    <div style={{ fontFamily: fontFamilies.display, fontSize: 64, lineHeight: 1, letterSpacing: "0.14em", color: c.ink, opacity: 0.92, textShadow: sombra }}>
      {pequena}
    </div>
  );
  return (
    <AbsoluteFill style={{ opacity, alignItems: "center", top: 400, height: 340, justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
        {pequenaEmCima ? pq : g}
        {pequenaEmCima ? g : pq}
      </div>
    </AbsoluteFill>
  );
};

/** Pontos da linha de chamada em cada plano: da etiqueta até o personagem (nunca sobre o rosto). */
const ALVO_ABERTO = { anel: { x: 548, y: 1262, r: 46 }, pontos: [{ x: 330, y: 770 }, { x: 515, y: 1218 }] };
const ALVO_PERTO = { anel: { x: 470, y: 1255, r: 52 }, pontos: [{ x: 330, y: 770 }, { x: 440, y: 1210 }] };

const Etiqueta: React.FC<{ icone: "ritmo" | "cor"; rotulo: string; de: number; ate: number }> = ({ icone, rotulo, de, ate }) => (
  <>
    <Sequence from={f(de)} durationInFrames={f(ate - de)}>
      <EtiquetaRotulo icone={icone} rotulo={rotulo} esquerda={96} topo={650} escala={1.25} sai={f(ate - de) - 5} />
    </Sequence>
    {PLANOS.filter((p) => p.de >= de && p.ate <= ate).map((p) => (
      <Sequence key={p.de} from={f(p.de)} durationInFrames={f(p.ate - p.de)}>
        <LinhaChamada {...(p.zoom ? ALVO_PERTO : ALVO_ABERTO)} entra={4} duracao={12} sai={f(p.ate - p.de) - 5} />
      </Sequence>
    ))}
  </>
);

export const Ep04MesmaCena: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    {PLANOS.map((p) => (
      <Sequence key={p.de} from={f(p.de)} durationInFrames={f(p.ate - p.de)}>
        <Camada p={p} />
      </Sequence>
    ))}

    {/* Gancho */}
    <Sequence from={0} durationInFrames={f(2.6)}>
      <TextoAlto
        durationInFrames={f(2.6)}
        tamanho={190}
        grande={<>MESMA <span style={{ color: c.amber }}>CENA</span></>}
        pequena="3 MUDANÇAS"
      />
    </Sequence>

    {/* Etapas: ritmo (bruto) e cor (virada com clarão em 9,2 s, no primeiro kick da música) */}
    <Etiqueta icone="ritmo" rotulo="Ritmo" de={5.6} ate={9.2} />
    <Etiqueta icone="cor" rotulo="Cor" de={9.2} ate={12.2} />
    <Sequence from={f(9.2) - 2} durationInFrames={20}>
      <FlashCut at={2} durationInFrames={12} />
    </Sequence>

    {/* Som: a caixinha gira de um lado ao outro durante toda a etapa */}
    <Sequence from={f(12.2)} durationInFrames={f(4.2)}>
      <LinhasDeSom
        durationInFrames={f(4.2)}
        esquerda={150}
        topo={465}
        escala={1.5}
        trilha={330}
        alturaFaixa={26}
        giroDe={32}
        giroAte={-32}
        faixas={[
          { nome: "Voz", cor: "petroleo", segmentos: [{ deMs: 440, ateMs: 1300 }] },
          { nome: "Ambiente", cor: "ambar", segmentos: [{ deMs: 0, ateMs: 4200 }] },
          {
            nome: "Whoosh",
            cor: "ambar",
            segmentos: [
              { deMs: 0, ateMs: 250 },
              { deMs: 950, ateMs: 1200 },
              { deMs: 2150, ateMs: 2400 },
              { deMs: 3350, ateMs: 3600 },
            ],
          },
          { nome: "Impacto", cor: "ambar", segmentos: [{ deMs: 2450, ateMs: 3250 }] },
          { nome: "Tique", cor: "petroleo", segmentos: [{ deMs: 3000, ateMs: 3120 }] },
        ]}
      />
    </Sequence>

    {/* Legendas do miolo da fala (o gancho e o convite já têm texto grande na tela) */}
    <Legendas captions={legendas as never} />

    {/* Resultado */}
    <Sequence from={f(16.4)} durationInFrames={f(3.0)}>
      <TextoAlto
        durationInFrames={f(3.0)}
        tamanho={150}
        pequenaEmCima
        pequena="MESMA CENA"
        grande={<>QUAL MUDOU <span style={{ color: c.amber }}>MAIS?</span></>}
      />
    </Sequence>

    {/* Fecho */}
    <Sequence from={f(19.4)} durationInFrames={f(2.0)}>
      <FechoSimples durationInFrames={f(2.0)} />
    </Sequence>
  </AbsoluteFill>
);
