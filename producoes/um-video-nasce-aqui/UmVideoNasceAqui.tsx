// PRODUÇÃO: "Um vídeo nasce aqui" (Stories/Reels de 15 s, CFDesigner). 100 BPM: cada cena dura um múltiplo de 18 quadros (uma batida).
// Arquivos de entrada (ignorados pelo Git) em public/entrada/nasce/: tripe, roteiro, c1–c4 (.jpg), c02.mp4, musica.mp3, pessoa/001.png.
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  BlurIn,
  CantosVisor,
  ChecklistVertical,
  colors,
  EtiquetaRotulo,
  FilmGrain,
  FlashCut,
  FundoCF,
  LinhaChamada,
  Logo,
  PushIn,
  SeloFlutuante,
} from "../../design-systems/cfdesigner";
import { fontFamilies } from "../../design-systems/cfdesigner/tokens";
import cartao from "../../design-systems/cfdesigner/assets/sfx/cartao.wav";
import icone from "../../design-systems/cfdesigner/assets/sfx/icone.wav";
import tick from "../../design-systems/cfdesigner/assets/sfx/tick.wav";
import tickFinal from "../../design-systems/cfdesigner/assets/sfx/tick_final.wav";
import timelineIn from "../../design-systems/cfdesigner/assets/sfx/timeline_in.wav";
import grande from "../../design-systems/cfdesigner/assets/sfx/grande.wav";
import suave from "../../design-systems/cfdesigner/assets/sfx/suave.wav";
import texto from "../../design-systems/cfdesigner/assets/sfx/texto.wav";
import fraco from "../../design-systems/cfdesigner/assets/sfx/fraco.wav";

const c = colors.cinema;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const outExpo = Easing.out(Easing.exp);
const inOut = Easing.inOut(Easing.cubic);

/** Linha do tempo (quadros a 30 fps). Cada corte cai numa batida (18 quadros). */
const CENAS = {
  gancho: [0, 72],
  roteiro: [72, 144],
  tripe: [144, 216],
  cenarios: [216, 288],
  resultado: [288, 360],
  frase: [360, 414],
  fecho: [414, 450],
} as const;
export const NASCE_FRAMES = 450;
/** Quadros em que a cena nova "varre" a anterior. */
const T = 9;

const asset = (n: string) => staticFile(`entrada/nasce/${n}`);

// ───────────── transições entre cenas ─────────────

type Entrada = "esq" | "baixo" | "iris" | "dir" | "flash" | "fade";

/** A cena nova entra por cima da anterior com uma cortina e uma linha de luz na borda. */
const Entra: React.FC<{
  tipo: Entrada;
  iris?: { x: number; y: number };
  children: React.ReactNode;
}> = ({ tipo, iris = { x: 540, y: 960 }, children }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, T], [0, 1], { ...clamp, easing: inOut });
  const R = (1 - p) * 100;
  let clipPath: string | undefined;
  let linha: React.CSSProperties | undefined;
  if (tipo === "esq") {
    clipPath = `inset(0 ${R}% 0 0)`;
    linha = { left: `${p * 100}%`, top: 0, bottom: 0, width: 4 };
  } else if (tipo === "dir") {
    clipPath = `inset(0 0 0 ${R}%)`;
    linha = { left: `${(1 - p) * 100}%`, top: 0, bottom: 0, width: 4 };
  } else if (tipo === "baixo") {
    clipPath = `inset(${R}% 0 0 0)`;
    linha = { top: `${(1 - p) * 100}%`, left: 0, right: 0, height: 4 };
  } else if (tipo === "iris") {
    clipPath = `circle(${p * 1500}px at ${iris.x}px ${iris.y}px)`;
  }
  const sobe =
    tipo === "flash"
      ? interpolate(f, [0, T + 4], [1.08, 1], { ...clamp, easing: outExpo })
      : 1;
  const fade = tipo === "fade" ? interpolate(f, [0, 14], [0, 1], clamp) : 1;
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{ clipPath, opacity: fade, transform: `scale(${sobe})` }}
      >
        {children}
      </AbsoluteFill>
      {linha && f < T + 1 ? (
        <div
          style={{
            position: "absolute",
            background: c.ink,
            boxShadow: `0 0 36px 6px rgba(217,164,65,.55)`,
            opacity: 1 - Math.abs(p - 0.5) * 0.4,
            ...linha,
          }}
        />
      ) : null}
      {tipo === "iris" && f < T + 1 ? (
        <div
          style={{
            position: "absolute",
            left: iris.x - p * 1500,
            top: iris.y - p * 1500,
            width: p * 3000,
            height: p * 3000,
            borderRadius: "50%",
            border: `4px solid ${c.ink}`,
            boxShadow: `0 0 36px 6px rgba(217,164,65,.5)`,
            opacity: 1 - p,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

type CenaProps = {
  nome: keyof typeof CENAS;
  entrada?: Entrada;
  iris?: { x: number; y: number };
  children: React.ReactNode;
};

/** Sequência da cena, alongada em T quadros para a próxima varrer por cima. */
const Cena: React.FC<CenaProps> = ({ nome, entrada, iris, children }) => {
  const [de, ate] = CENAS[nome];
  const ultima = nome === "fecho";
  return (
    <Sequence
      from={de}
      durationInFrames={ate - de + (ultima ? 0 : T)}
      premountFor={30}
    >
      {entrada ? (
        <Entra tipo={entrada} iris={iris}>
          {children}
        </Entra>
      ) : (
        children
      )}
    </Sequence>
  );
};

// ───────────── pedaços reutilizáveis ─────────────

const Titulo: React.FC<{
  eyebrow: string;
  children: React.ReactNode;
  topo?: number;
  tamanho?: number;
  de?: number;
}> = ({ eyebrow, children, topo = 270, tamanho = 150, de = 4 }) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: topo - f * 0.35,
        textAlign: "center",
      }}
    >
      <BlurIn from={de} durationInFrames={14} blur={18} y={30}>
        <div
          style={{
            fontFamily: fontFamilies.heading,
            fontWeight: 600,
            fontSize: 28,
            letterSpacing: "0.34em",
            color: c.inkMuted,
            textTransform: "uppercase",
            paddingLeft: "0.34em",
          }}
        >
          {eyebrow}
        </div>
      </BlurIn>
      <BlurIn from={de + 4} durationInFrames={16} blur={26} y={50}>
        <div
          style={{
            fontFamily: fontFamilies.display,
            fontSize: tamanho,
            lineHeight: 0.95,
            color: c.ink,
            marginTop: 6,
            textShadow: "0 6px 40px rgba(0,0,0,.6)",
          }}
        >
          {children}
        </div>
      </BlurIn>
    </div>
  );
};

const FotoEscura: React.FC<{ src: string; filtro?: string }> = ({
  src,
  filtro,
}) => (
  <Img
    src={src}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: filtro ?? "brightness(.78) contrast(1.06) saturate(.85)",
    }}
  />
);

const Vinheta: React.FC = () => (
  <>
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 55%, rgba(11,12,14,.05) 30%, rgba(11,12,14,.78) 100%)",
      }}
    />
    <AbsoluteFill
      style={{
        background: "linear-gradient(rgba(11,12,14,.6), rgba(11,12,14,0) 38%)",
      }}
    />
  </>
);

// ───────────── cenas ─────────────

const Gancho: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: c.void }}>
      <PushIn
        from={1.0}
        to={1.16}
        durationInFrames={72 + T}
        originX="50%"
        originY="62%"
      >
        <FotoEscura src={asset("tripe.jpg")} />
      </PushIn>
      <Vinheta />
      <CantosVisor entra={3} duracao={14} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 300 - f * 0.45,
          textAlign: "center",
        }}
      >
        <BlurIn from={6} durationInFrames={14} blur={16} y={20}>
          <div
            style={{
              fontFamily: fontFamilies.heading,
              fontWeight: 600,
              fontSize: 28,
              letterSpacing: "0.34em",
              paddingLeft: "0.34em",
              color: c.inkMuted,
            }}
          >
            BASTIDORES
          </div>
        </BlurIn>
        <div style={{ height: 34 }} />
        <BlurIn from={10} durationInFrames={18} blur={30} y={60}>
          <div
            style={{
              fontFamily: fontFamilies.display,
              fontSize: 236,
              lineHeight: 0.92,
              color: c.ink,
              textShadow: "0 6px 40px rgba(0,0,0,.6)",
            }}
          >
            UM VÍDEO
          </div>
        </BlurIn>
        <BlurIn from={18} durationInFrames={18} blur={30} y={60}>
          <div
            style={{
              fontFamily: fontFamilies.display,
              fontSize: 236,
              lineHeight: 0.92,
              color: c.ink,
              textShadow: "0 6px 40px rgba(0,0,0,.6)",
            }}
          >
            NASCE <span style={{ color: c.amber }}>AQUI</span>
          </div>
        </BlurIn>
      </div>
    </AbsoluteFill>
  );
};

const CHECK_ITENS = (marcados: number) =>
  [
    { texto: "Roteiro", marcaEmMs: 0 },
    { texto: "Enquadre", marcaEmMs: 1e9 },
    { texto: "Gravação", marcaEmMs: 1e9 },
    { texto: "Edição", marcaEmMs: 1e9 },
  ].map((it, i) => (i < marcados ? { ...it, marcaEmMs: 0 } : it));

const Roteiro: React.FC = () => {
  const f = useCurrentFrame();
  const dur = CENAS.roteiro[1] - CENAS.roteiro[0] + T;
  const p = interpolate(f, [5, 28], [0, 1], { ...clamp, easing: outExpo });
  const sway = Math.sin(f / 16) * 2.4;
  const bob = Math.sin(f / 11) * 9;
  const zoom = 1 + f * 0.0007;
  const cp = interpolate(f, [8, 26], [0, 1], { ...clamp, easing: outExpo });
  return (
    <AbsoluteFill>
      <FundoCF variante="grade" duracao={dur} />
      <Titulo eyebrow="Passo 01">ROTEIRO NA MÃO</Titulo>
      <div
        style={{
          position: "absolute",
          left: 497,
          top: 440,
          width: 504,
          height: 724,
          opacity: Math.min(1, p * 1.5),
          filter: `blur(${(1 - p) * 14}px)`,
          transform: `translate(${(1 - p) * 420}px, ${(1 - p) * 60 + bob}px) scale(${zoom}) perspective(1300px) rotateY(${-14 + sway}deg) rotateX(6deg)`,
        }}
      >
        <Img
          src={asset("roteiro.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            border: `2px solid ${c.line}`,
            boxShadow: "0 40px 80px rgba(0,0,0,.65)",
            filter: "brightness(.94)",
          }}
        />
        <LinhaChamada
          anel={{ x: 205, y: 452, r: 66 }}
          pontos={[
            { x: 253, y: 498 },
            { x: 318, y: 812 },
          ]}
          entra={24}
        />
        <EtiquetaRotulo
          icone="papel"
          rotulo="O roteiro"
          esquerda={250}
          topo={808}
          entra={36}
          sentido={-1}
        />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${(1 - cp) * -420}px) translateY(${Math.sin(f / 14) * 7}px)`,
          opacity: Math.min(1, cp * 2),
        }}
      >
        <ChecklistVertical
          titulo="Processo"
          itens={CHECK_ITENS(1)}
          durationInFrames={dur}
          esquerda={50}
          topo={880}
          escala={0.88}
        />
      </div>
    </AbsoluteFill>
  );
};

const Tripe: React.FC = () => {
  const f = useCurrentFrame();
  const dur = CENAS.tripe[1] - CENAS.tripe[0] + T;
  const z =
    interpolate(f, [0, 24], [1.14, 1.5], { ...clamp, easing: outExpo }) +
    f * 0.0009;
  const cp = interpolate(f, [10, 28], [0, 1], { ...clamp, easing: outExpo });
  const ck = f >= 16 ? 2 : 1;
  return (
    <AbsoluteFill style={{ background: c.void }}>
      <AbsoluteFill
        style={{
          transformOrigin: "468px 1089px",
          transform: `translate(${40 - f * 0.4}px, ${-110 - f * 0.3}px) scale(${z})`,
        }}
      >
        <FotoEscura src={asset("tripe.jpg")} />
      </AbsoluteFill>
      <Vinheta />
      <CantosVisor
        area={{ x: 392, y: 800, w: 232, h: 330 }}
        comprimento={44}
        entra={6}
        duracao={12}
      />
      <LinhaChamada
        pontos={[
          { x: 210, y: 500 },
          { x: 210, y: 960 },
          { x: 396, y: 960 },
        ]}
        entra={14}
        duracao={16}
      />
      <EtiquetaRotulo
        icone="celular"
        rotulo="1 celular"
        esquerda={50}
        topo={410}
        entra={12}
      />
      <LinhaChamada
        pontos={[
          { x: 330, y: 1425 },
          { x: 470, y: 1245 },
        ]}
        entra={22}
        duracao={14}
      />
      <EtiquetaRotulo
        icone="tripe"
        rotulo="1 tripé"
        esquerda={60}
        topo={1425}
        entra={20}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${(1 - cp) * 420}px) translateY(${Math.sin(f / 12) * 7}px)`,
          opacity: Math.min(1, cp * 2),
        }}
      >
        <ChecklistVertical
          titulo="Processo"
          itens={CHECK_ITENS(ck)}
          durationInFrames={dur}
          esquerda={690}
          topo={270}
          escala={0.78}
        />
      </div>
    </AbsoluteFill>
  );
};

const CARDS = [
  {
    src: "c1.jpg",
    n: "01",
    x: 79,
    y: 440,
    rot: 14,
    de: 4,
    fx: -420,
    fy: -200,
    pos: "center 30%",
  },
  {
    src: "c2.jpg",
    n: "02",
    x: 605,
    y: 440,
    rot: -14,
    de: 9,
    fx: 420,
    fy: -200,
    pos: "center 30%",
  },
  {
    src: "c3.jpg",
    n: "03",
    x: 79,
    y: 960,
    rot: 14,
    de: 14,
    fx: -420,
    fy: 200,
    pos: "center 62%",
  },
  {
    src: "c4.jpg",
    n: "04",
    x: 605,
    y: 960,
    rot: -14,
    de: 19,
    fx: 420,
    fy: 200,
    pos: "center 30%",
  },
];

const Cenarios: React.FC = () => {
  const f = useCurrentFrame();
  const dur = CENAS.cenarios[1] - CENAS.cenarios[0] + T;
  const n = Math.round(
    interpolate(f, [4, 26], [0, 4], { ...clamp, easing: outExpo }),
  );
  return (
    <AbsoluteFill>
      <FundoCF variante="orbitas" duracao={dur} foco={{ x: 0.5, y: 0.5 }} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 270 - f * 0.35,
          textAlign: "center",
        }}
      >
        <BlurIn from={3} durationInFrames={14} blur={18} y={30}>
          <div
            style={{
              fontFamily: fontFamilies.heading,
              fontWeight: 600,
              fontSize: 28,
              letterSpacing: "0.34em",
              paddingLeft: "0.34em",
              color: c.inkMuted,
            }}
          >
            PASSO 03
          </div>
        </BlurIn>
        <BlurIn from={7} durationInFrames={16} blur={26} y={50}>
          <div
            style={{
              fontFamily: fontFamilies.display,
              fontSize: 150,
              lineHeight: 0.95,
              color: c.ink,
              marginTop: 6,
            }}
          >
            <span style={{ color: c.amber }}>{n}</span> CENÁRIOS
          </div>
        </BlurIn>
      </div>
      {CARDS.map((cd, i) => {
        const p = interpolate(f, [cd.de, cd.de + 18], [0, 1], {
          ...clamp,
          easing: outExpo,
        });
        const bob = Math.sin(f / 12 + i * 1.7) * 9;
        const sway = Math.sin(f / 17 + i) * 2.2;
        return (
          <div
            key={cd.n}
            style={{
              position: "absolute",
              left: cd.x,
              top: cd.y,
              width: 396,
              height: 462,
              opacity: Math.min(1, p * 1.6),
              filter: `blur(${(1 - p) * 12}px)`,
              transform: `translate(${(1 - p) * cd.fx}px, ${(1 - p) * cd.fy + bob}px) perspective(1200px) rotateY(${cd.rot + sway}deg) rotateX(5deg) scale(${0.85 + p * 0.15})`,
            }}
          >
            <Img
              src={asset(cd.src)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: cd.pos,
                border: `2px solid ${c.line}`,
                boxShadow: "0 30px 60px rgba(0,0,0,.6)",
                filter: "brightness(.92)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 16,
                bottom: 4,
                fontFamily: fontFamilies.display,
                fontSize: 96,
                color: "rgba(238,242,245,.9)",
                textShadow: "0 4px 20px rgba(0,0,0,.7)",
              }}
            >
              {cd.n}
            </div>
          </div>
        );
      })}
      <EtiquetaRotulo
        icone="celular"
        rotulo="1 celular"
        esquerda={340}
        topo={1450}
        entra={36}
      />
    </AbsoluteFill>
  );
};

const Resultado: React.FC = () => {
  const f = useCurrentFrame();
  const dur = CENAS.resultado[1] - CENAS.resultado[0] + T;
  const p = interpolate(f, [2, 24], [0, 1], { ...clamp, easing: outExpo });
  const bob = Math.sin(f / 14) * 12;
  const sway = Math.sin(f / 19) * 2.2;
  const zoom = 1 + f * 0.0011;
  return (
    <AbsoluteFill>
      <FundoCF variante="timeline" duracao={dur} />
      <Titulo eyebrow="Passo 04">O RESULTADO</Titulo>
      <div
        style={{
          position: "absolute",
          left: 250,
          top: 500,
          width: 580,
          height: 1030,
          borderRadius: 64,
          border: "8px solid #3a3f46",
          background: "#050506",
          overflow: "hidden",
          boxShadow: "0 50px 100px rgba(0,0,0,.7)",
          opacity: Math.min(1, p * 1.5),
          filter: `blur(${(1 - p) * 16}px)`,
          transform: `translateY(${(1 - p) * 300 + bob}px) scale(${zoom * (0.9 + p * 0.1)}) perspective(1400px) rotateY(${sway}deg) rotateX(${(1 - p) * 10}deg)`,
        }}
      >
        <OffthreadVideo
          src={asset("c02.mp4")}
          startFrom={Math.round(12.65 * 30)}
          volume={0.55}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <FlashCut at={0} durationInFrames={9} />
    </AbsoluteFill>
  );
};

const Frase: React.FC = () => {
  const f = useCurrentFrame();
  const dur = CENAS.frase[1] - CENAS.frase[0] + T;
  const sobe = (atraso: number) =>
    interpolate(f, [atraso, atraso + 14], [0, 1], {
      ...clamp,
      easing: outExpo,
    });
  const n = Math.round(
    interpolate(f, [6, 42], [0, 15], {
      ...clamp,
      easing: Easing.out(Easing.quad),
    }),
  );
  const pulso = interpolate(f, [42, 47, 56], [1, 1.07, 1], clamp);
  const l1 = sobe(0);
  const l2 = sobe(4);
  const zoom = 1 + f * 0.0016;
  return (
    <AbsoluteFill>
      <FundoCF variante="visor" duracao={dur} foco={{ x: 0.5, y: 0.5 }} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 520,
          textAlign: "center",
          transform: `scale(${1 + f * 0.0008})`,
        }}
      >
        <div
          style={{
            fontFamily: fontFamilies.display,
            fontSize: 184,
            lineHeight: 0.9,
            color: c.ink,
            opacity: l1,
            transform: `translateY(${(1 - l1) * 150}px)`,
            letterSpacing: 2,
          }}
        >
          CINEMA EM
        </div>
        <div
          style={{
            fontFamily: fontFamilies.display,
            fontSize: 236,
            lineHeight: 0.88,
            color: c.ink,
            whiteSpace: "nowrap",
            opacity: l2,
            transform: `translateY(${(1 - l2) * 150}px)`,
            letterSpacing: 2,
          }}
        >
          <span
            style={{
              color: c.amber,
              display: "inline-block",
              transform: `scale(${pulso})`,
            }}
          >
            {n}
          </span>{" "}
          SEGUNDOS
        </div>
      </div>
      <AbsoluteFill
        style={{ transformOrigin: "50% 55%", transform: `scale(${zoom})` }}
      >
        <Img
          src={asset("pessoa/001.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Fecho: React.FC = () => {
  const f = useCurrentFrame();
  const dur = CENAS.fecho[1] - CENAS.fecho[0];
  const p = interpolate(f, [4, 20], [0, 1], { ...clamp, easing: outExpo });
  const fim = interpolate(f, [dur - 8, dur], [1, 0], clamp);
  return (
    <AbsoluteFill>
      <FundoCF variante="losangos" intensidade={0.7} duracao={dur} saida={8} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: p * fim,
        }}
      >
        <div
          style={{
            transform: `scale(${0.88 + p * 0.12 + f * 0.0008}) translateY(${Math.sin(f / 10) * 4}px)`,
            filter: `blur(${(1 - p) * 14}px)`,
          }}
        >
          <Logo layout="horizontal" finish="white" height={96} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ───────────── som ─────────────

/**
 * Efeitos sonoros quase imperceptíveis (pedido do dono). Cada som é normalizado pelo seu PICO e colocado em ALVO dBFS,
 * ~11 dB abaixo da música (que fica em ≈ −29 dBFS de média): sentem-se mais do que se ouvem.
 */
const ALVO_PICO_DB = -40;
const PICO_DB = new Map<string, number>([
  [cartao, -9.1],
  [icone, -17.1],
  [tick, -10.6],
  [tickFinal, -8.0],
  [timelineIn, -16.3],
  [grande, -12.0],
  [suave, -18.5],
  [fraco, -17.0],
  [texto, -10.8],
]);
const ganhoSfx = (src: string) =>
  10 ** ((ALVO_PICO_DB - (PICO_DB.get(src) ?? -10)) / 20);

const Sfx: React.FC<{ em: number; src: string; vol?: number }> = ({
  em,
  src,
  vol = 1,
}) => (
  <Sequence from={Math.max(0, em)} durationInFrames={60} layout="none">
    <Audio src={src} volume={vol * ganhoSfx(src)} />
  </Sequence>
);

const SOM: { em: number; src: string; vol?: number }[] = [
  { em: 0, src: suave, vol: 0.7 },
  { em: 8, src: cartao },
  // roteiro
  { em: 70, src: cartao },
  { em: 82, src: tick },
  { em: 100, src: icone, vol: 0.8 },
  { em: 108, src: cartao, vol: 0.6 },
  // tripé
  { em: 144 + 8, src: cartao },
  { em: 144 + 12, src: icone, vol: 0.8 },
  { em: 144 + 16, src: tick },
  { em: 144 + 20, src: icone, vol: 0.8 },
  // cenários
  { em: 216 + 2, src: cartao },
  { em: 216 + 4, src: cartao, vol: 0.8 },
  { em: 216 + 9, src: cartao, vol: 0.8 },
  { em: 216 + 14, src: cartao, vol: 0.8 },
  { em: 216 + 19, src: cartao, vol: 0.8 },
  { em: 216 + 6, src: tick, vol: 0.7 },
  { em: 216 + 12, src: tick, vol: 0.7 },
  { em: 216 + 18, src: tick, vol: 0.7 },
  { em: 216 + 24, src: tickFinal, vol: 0.8 },
  { em: 216 + 36, src: icone, vol: 0.8 },
  // resultado
  { em: 288 - 2, src: timelineIn },
  // frase "Cinema em 15 segundos": o swell do dono sobe e atinge o pico quando o número chega ao 15 (quadro 42 da cena)
  { em: 360 + 42 - 27, src: texto },
  // fecho
  { em: 414 + 2, src: grande },
  { em: 414 + 26, src: fraco, vol: 0.7 },
];

export const UmVideoNasceAqui: React.FC = () => {
  const f = useCurrentFrame();
  // música: entra em 0,3 s, abaixa um pouco no resultado (o som do C02 fala) e some no fim
  const musica =
    interpolate(f, [0, 9], [0, 1], clamp) *
    interpolate(f, [NASCE_FRAMES - 30, NASCE_FRAMES], [1, 0], clamp) *
    interpolate(
      f,
      [
        CENAS.resultado[0] - 4,
        CENAS.resultado[0] + 6,
        CENAS.resultado[1] - 2,
        CENAS.resultado[1] + 8,
      ],
      [1, 0.45, 0.45, 1],
      clamp,
    );
  return (
    <AbsoluteFill style={{ background: c.void }}>
      <Cena nome="gancho">
        <Gancho />
      </Cena>
      <Cena nome="roteiro" entrada="esq">
        <Roteiro />
      </Cena>
      <Cena nome="tripe" entrada="iris" iris={{ x: 508, y: 980 }}>
        <Tripe />
      </Cena>
      <Cena nome="cenarios" entrada="baixo">
        <Cenarios />
      </Cena>
      <Cena nome="resultado" entrada="flash">
        <Resultado />
      </Cena>
      <Cena nome="frase" entrada="dir">
        <Frase />
      </Cena>
      <Cena nome="fecho" entrada="fade">
        <Fecho />
      </Cena>
      <SeloFlutuante texto="Making off" durationInFrames={NASCE_FRAMES} />
      <FilmGrain opacity={0.05} />
      <Audio src={asset("musica.mp3")} volume={0.62 * musica} />
      {SOM.map((s, i) => (
        <Sfx key={i} {...s} />
      ))}
    </AbsoluteFill>
  );
};
