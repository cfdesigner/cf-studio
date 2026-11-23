import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../tokens";
import { clamp, outExpo } from "../movimento";
import { FilmGrain } from "../efeitos/FilmGrain";

/** As 6 telas de fundo do CFDesigner. Cada uma tem um clima; use uma diferente a cada cena. */
export type VarianteFundo =
  | "grade"
  | "orbitas"
  | "visor"
  | "timeline"
  | "losangos"
  | "pontos";

export const variantesFundo: VarianteFundo[] = [
  "grade",
  "orbitas",
  "visor",
  "timeline",
  "losangos",
  "pontos",
];

export type FundoCFProps = {
  variante: VarianteFundo;
  /** Multiplicador da opacidade dos elementos (padrão 1; 0,6 para algo ainda mais discreto). */
  intensidade?: number;
  /** Quadros da entrada: os traços se desenham e a tela surge (padrão 18). */
  entrada?: number;
  /** Duração da cena em quadros. Se informada, a tela some em fade nos últimos `saida` quadros. */
  duracao?: number;
  /** Quadros do fade de saída (padrão 10; só vale com `duracao`). */
  saida?: number;
  /** Centro visual da tela, em fração da largura/altura (padrão 0,5 / 0,45): onde fica o conteúdo. */
  foco?: { x: number; y: number };
  /** Pinta o fundo `void` por baixo (padrão true). Desligue para pôr a tela sobre outra imagem. */
  fundo?: boolean;
  /** Granulado de filme por cima (padrão true, bem leve). */
  granulado?: boolean;
  /** Cor dos traços (padrão: bronze do metal do logo, #8a6a2a). */
  cor?: string;
};

type Ctx = {
  f: number;
  W: number;
  H: number;
  /** Unidade: 1 = vídeo de 1080 de lado menor. */
  u: number;
  cx: number;
  cy: number;
  /** Progresso suave da entrada, 0 a 1. */
  p: number;
  cor: string;
};

const rgba = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

/** Traço que se desenha: `q` vai de 0 a 1. */
const Traco: React.FC<{
  d: string;
  q: number;
  o: number;
  w: number;
  cor: string;
}> = ({ d, q, o, w, cor }) => (
  <path
    d={d}
    pathLength={1}
    strokeDasharray={1}
    strokeDashoffset={1 - Math.min(1, Math.max(0, q))}
    fill="none"
    stroke={cor}
    strokeOpacity={o}
    strokeWidth={w}
    strokeLinecap="square"
  />
);

const losango = (x: number, y: number, r: number) =>
  `M${x} ${y - r}L${x + r} ${y}L${x} ${y + r}L${x - r} ${y}Z`;
const cruz = (x: number, y: number, r: number) =>
  `M${x - r} ${y}H${x + r}M${x} ${y - r}V${y + r}`;
const quadrado = (x: number, y: number, r: number) =>
  `M${x} ${y}h${r}v${r}h${-r}Z`;
const cantos = (W: number, H: number, m: number, l: number) =>
  `M${m} ${m + l}V${m}H${m + l}` +
  `M${W - m - l} ${m}H${W - m}V${m + l}` +
  `M${m} ${H - m - l}V${H - m}H${m + l}` +
  `M${W - m - l} ${H - m}H${W - m}V${H - m - l}`;

const mascaraRadial = (cx: number, cy: number, r: number): React.CSSProperties => {
  const g = `radial-gradient(ellipse ${r}px ${r * 1.25}px at ${cx}px ${cy}px, #000 18%, transparent 100%)`;
  return { WebkitMaskImage: g, maskImage: g };
};

/** 1. GRADE TÉCNICA: grade fina que desliza, régua lateral, cruzes que piscam em sequência. */
const Grade: React.FC<Ctx> = ({ f, W, H, u, cx, cy, p, cor }) => {
  const cel = 96 * u;
  const d = f * 0.25 * u;
  const w = 2.2 * u;
  const pts: [number, number][] = [
    [-3, -5],
    [4, -3],
    [-4, 1],
    [3, 3],
    [-1, 6],
    [5, 7],
    [-5, 8],
  ];
  const regua: string[] = [];
  for (let y = 4; y < H / (12 * u); y++) {
    const yy = y * 12 * u * 1;
    regua.push(`M0 ${yy}h${(y % 5 === 0 ? 40 : 22) * u}`);
  }
  return (
    <>
      <AbsoluteFill
        style={{
          opacity: p,
          backgroundImage:
            `linear-gradient(${rgba(cor, 0.5)} ${1.6 * u}px, transparent ${1.6 * u}px),` +
            `linear-gradient(90deg, ${rgba(cor, 0.5)} ${1.6 * u}px, transparent ${1.6 * u}px)`,
          backgroundSize: `${cel}px ${cel}px`,
          backgroundPosition: `${d}px ${d}px`,
          ...mascaraRadial(cx, cy, Math.max(W, H) * 0.62),
        }}
      />
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <Traco d={regua.join("")} q={p} o={0.5} w={w} cor={cor} />
        {pts.map(([gx, gy], i) => {
          const x = cx + gx * cel + (d % cel);
          const y = cy + gy * cel + (d % cel);
          const pulso = (Math.sin(f / 16 - i * 1.25) + 1) / 2;
          return (
            <path
              key={i}
              d={cruz(x, y, 15 * u)}
              stroke={cor}
              strokeWidth={w}
              strokeOpacity={p * (0.18 + 0.7 * pulso)}
            />
          );
        })}
        <Traco d={losango(W * 0.88, H * 0.075, 30 * u)} q={p} o={0.6} w={w} cor={cor} />
        <Traco d={losango(W * 0.13, H * 0.38, 17 * u)} q={p} o={0.5} w={w} cor={cor} />
        <Traco
          d={quadrado(W * 0.1, H * 0.84 + Math.sin(f / 40) * 6 * u, 46 * u)}
          q={p}
          o={0.45}
          w={w}
          cor={cor}
        />
        <Traco d={quadrado(W * 0.83, H * 0.47, 32 * u)} q={p} o={0.45} w={w} cor={cor} />
        <Traco d={cantos(W, H, 52 * u, 70 * u)} q={p} o={0.6} w={w} cor={cor} />
      </svg>
    </>
  );
};

/** 2. ÓRBITAS E BOKEH: círculos concêntricos que giram e luzes desfocadas que respiram. */
const Orbitas: React.FC<Ctx> = ({ f, W, H, u, cx, cy, p, cor }) => {
  const w = 2.2 * u;
  const raios = [190, 310, 440, 590, 760].map((r) => r * u);
  const bokeh: [number, number, number, number, number][] = [
    [0.12, 0.2, 100, 0.22, 0],
    [0.88, 0.14, 66, 0.2, 1.4],
    [0.85, 0.62, 110, 0.18, 2.6],
    [0.1, 0.78, 76, 0.2, 3.8],
    [0.5, 0.94, 90, 0.16, 5.1],
    [0.94, 0.9, 50, 0.2, 0.7],
  ];
  const ponto = (r: number, a: number) =>
    [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const;
  const [d1x, d1y] = ponto(raios[1], -0.8 + f * 0.012);
  const [d2x, d2y] = ponto(raios[3], 2.5 - f * 0.008);
  const [d3x, d3y] = ponto(raios[0], 4.4 + f * 0.016);
  return (
    <>
      {bokeh.map(([x, y, r, o, fase], i) => {
        const resp = 1 + Math.sin(f / 34 + fase) * 0.09;
        const rr = r * u * resp;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: W * x - rr,
              top: H * y - rr,
              width: rr * 2,
              height: rr * 2,
              borderRadius: "50%",
              background: cor,
              opacity: o * p * (0.8 + 0.2 * Math.sin(f / 26 + fase)),
              filter: `blur(${22 * u}px)`,
            }}
          />
        );
      })}
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <Traco d={`M${cx - raios[0]} ${cy}a${raios[0]} ${raios[0]} 0 1 0 ${raios[0] * 2} 0a${raios[0]} ${raios[0]} 0 1 0 ${-raios[0] * 2} 0`} q={p} o={0.38} w={w} cor={cor} />
        <circle
          cx={cx}
          cy={cy}
          r={raios[1]}
          fill="none"
          stroke={cor}
          strokeOpacity={0.3 * p}
          strokeWidth={w}
          strokeDasharray={`${3 * u} ${14 * u}`}
          transform={`rotate(${f * 0.18} ${cx} ${cy})`}
        />
        <Traco d={`M${cx - raios[2]} ${cy}a${raios[2]} ${raios[2]} 0 1 0 ${raios[2] * 2} 0a${raios[2]} ${raios[2]} 0 1 0 ${-raios[2] * 2} 0`} q={p} o={0.3} w={w} cor={cor} />
        <circle
          cx={cx}
          cy={cy}
          r={raios[3]}
          fill="none"
          stroke={cor}
          strokeOpacity={0.28 * p}
          strokeWidth={w}
          strokeDasharray={`${16 * u} ${14 * u}`}
          transform={`rotate(${-f * 0.12} ${cx} ${cy})`}
        />
        <circle
          cx={cx}
          cy={cy}
          r={raios[4]}
          fill="none"
          stroke={cor}
          strokeOpacity={0.2 * p}
          strokeWidth={w}
        />
        {[
          [d1x, d1y, 9],
          [d2x, d2y, 7],
          [d3x, d3y, 6],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r * u} fill={cor} fillOpacity={0.85 * p} />
        ))}
        <Traco d={losango(W * 0.1, H * 0.075, 24 * u)} q={p} o={0.6} w={w} cor={cor} />
        <Traco d={losango(W * 0.91, H * 0.95, 24 * u)} q={p} o={0.6} w={w} cor={cor} />
      </svg>
    </>
  );
};

/** 3. VISOR DE CINEMA: linhas dos terços, mira, cantos de enquadramento e losango grande. */
const Visor: React.FC<Ctx> = ({ f, W, H, u, cx, cy, p, cor }) => {
  const w = 2.2 * u;
  const q = (a: number, b: number) =>
    Math.min(1, Math.max(0, (p - a) / (b - a)));
  const tx = [W / 3, (W * 2) / 3];
  const ty = [H / 3, (H * 2) / 3];
  const girar = Math.sin(f / 70) * 2.5;
  const R = Math.min(W, H) * 0.34;
  const pulso = 1 + Math.sin(f / 22) * 0.04;
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      <Traco d={`M0 0L${W} ${H}M${W} 0L0 ${H}`} q={q(0, 1)} o={0.11} w={w} cor={cor} />
      <Traco d={`M${tx[0]} 0V${H}M${tx[1]} 0V${H}`} q={q(0, 0.8)} o={0.26} w={w} cor={cor} />
      <Traco d={`M0 ${ty[0]}H${W}M0 ${ty[1]}H${W}`} q={q(0.1, 0.9)} o={0.26} w={w} cor={cor} />
      <g transform={`rotate(${girar} ${cx} ${cy})`}>
        <Traco d={losango(cx, cy, R)} q={q(0.2, 1)} o={0.3} w={w} cor={cor} />
        <Traco d={losango(cx, cy, R * 0.66)} q={q(0.3, 1)} o={0.2} w={w} cor={cor} />
      </g>
      {tx.flatMap((x) =>
        ty.map((y) => (
          <path
            key={`${x}-${y}`}
            d={cruz(x, y, 11 * u)}
            stroke={cor}
            strokeWidth={w}
            strokeOpacity={0.6 * q(0.4, 1)}
          />
        )),
      )}
      <g opacity={q(0.3, 1)}>
        <path d={cruz(cx, cy, 30 * u)} stroke={cor} strokeWidth={w} strokeOpacity={0.55} />
        <circle
          cx={cx}
          cy={cy}
          r={9 * u * pulso}
          fill="none"
          stroke={cor}
          strokeWidth={w}
          strokeOpacity={0.7}
        />
      </g>
      <Traco d={cantos(W, H, 52 * u, 76 * u)} q={q(0, 0.7)} o={0.7} w={w * 1.3} cor={cor} />
    </svg>
  );
};

/** 4. TIMELINE: régua de edição que corre, cabeça de leitura e blocos de clipes. Diz "isto é edição". */
const Timeline: React.FC<Ctx> = ({ f, W, H, u, p, cor }) => {
  const w = 2.2 * u;
  const passo = 21 * u;
  const desl = (f * 0.9 * u) % (passo * 5);
  const yR = H * 0.17;
  const ticks: string[] = [];
  for (let i = -6; i * passo < W + passo * 6; i++) {
    const x = i * passo - desl;
    if (x < -passo || x > W + passo) continue;
    const grande = (((i % 5) + 5) % 5) === 0;
    ticks.push(`M${x} ${yR}v${(grande ? 46 : 24) * u}`);
  }
  const trilhas = [
    { y: 0.7, blocos: [[0.05, 0.38], [0.42, 0.7], [0.74, 0.97]] },
    { y: 0.755, blocos: [[0.12, 0.3], [0.34, 0.6], [0.66, 0.9]] },
    { y: 0.81, blocos: [[0.02, 0.2], [0.24, 0.52], [0.56, 0.82]] },
  ];
  const cabeca = W * (0.14 + 0.72 * ((f / 300) % 1));
  const andar = -f * 0.35 * u;
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      <path d={ticks.join("")} stroke={cor} strokeWidth={w} strokeOpacity={0.5 * p} />
      <Traco d={`M0 ${yR}H${W}`} q={p} o={0.5} w={w} cor={cor} />
      <Traco d={`M0 ${yR + 70 * u}H${W}`} q={p} o={0.18} w={w} cor={cor} />
      {trilhas.map((t, i) => (
        <g key={i} transform={`translate(${andar * (1 + i * 0.4)},0)`}>
          {t.blocos.map(([a, b], j) => (
            <rect
              key={j}
              x={W * a}
              y={H * t.y}
              width={W * (b - a)}
              height={34 * u}
              rx={4 * u}
              fill={rgba(cor, 0.09)}
              stroke={cor}
              strokeOpacity={0.4 * p}
              strokeWidth={w}
              style={{
                transform: `translateX(${(1 - p) * -120 * u * (i + 1)}px)`,
              }}
            />
          ))}
        </g>
      ))}
      <path d={`M${cabeca} ${yR - 10 * u}V${H * 0.9}`} stroke={cor} strokeWidth={w * 1.2} strokeOpacity={0.75 * p} />
      <path d={losango(cabeca, yR - 22 * u, 14 * u)} fill={cor} fillOpacity={0.9 * p} />
      <Traco d={cantos(W, H, 52 * u, 70 * u)} q={p} o={0.45} w={w} cor={cor} />
    </svg>
  );
};

/** 5. LOSANGOS: treliça de losangos (eco do símbolo do logo) que desliza e um losango grande ao centro. */
const Losangos: React.FC<Ctx> = ({ f, W, H, u, cx, cy, p, cor }) => {
  const w = 2.2 * u;
  const c = 150 * u;
  const d = (f * 0.3 * u) % (c * 2);
  const a: string[] = [];
  const n = Math.ceil((W + H) / c) + 4;
  for (let k = -n; k <= n; k++) {
    const x = k * c + d;
    a.push(`M${x} 0L${x + H} ${H}`, `M${x} 0L${x - H} ${H}`);
  }
  const R = Math.min(W, H) * 0.3 * (1 + Math.sin(f / 30) * 0.015);
  const aceso = [
    [0.18, 0.3, 0],
    [0.8, 0.22, 2],
    [0.7, 0.72, 4],
    [0.25, 0.78, 6],
    [0.5, 0.1, 3],
  ];
  return (
    <>
      <AbsoluteFill
        style={{ opacity: p, ...mascaraRadial(cx, cy, Math.max(W, H) * 0.6) }}
      >
        <svg width={W} height={H}>
          <path d={a.join("")} stroke={cor} strokeWidth={w} strokeOpacity={0.3} />
        </svg>
      </AbsoluteFill>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <Traco d={losango(cx, cy, R)} q={p} o={0.55} w={w * 1.2} cor={cor} />
        <Traco d={losango(cx, cy, R * 0.72)} q={p} o={0.35} w={w} cor={cor} />
        <Traco d={losango(cx, cy, R * 1.28)} q={p} o={0.2} w={w} cor={cor} />
        {aceso.map(([x, y, fase], i) => (
          <path
            key={i}
            d={losango(W * x, H * y, 13 * u)}
            fill={cor}
            fillOpacity={p * (0.1 + 0.5 * ((Math.sin(f / 18 - fase) + 1) / 2))}
          />
        ))}
      </svg>
    </>
  );
};

/** 6. PONTOS: matriz de pontos em que passa uma onda de luz. Limpa e hipnótica, boa para explicações. */
const Pontos: React.FC<Ctx> = ({ f, W, H, u, cx, cy, p, cor }) => {
  const sp = 60 * u;
  const cols = Math.ceil(W / sp) + 1;
  const rows = Math.ceil(H / sp) + 1;
  const alcance = Math.max(W, H) * 0.7;
  const bolinhas: React.ReactNode[] = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * sp + (W - (cols - 1) * sp) / 2;
      const y = j * sp + (H - (rows - 1) * sp) / 2;
      const dist = Math.hypot(x - cx, y - cy);
      const borda = Math.max(0, 1 - dist / alcance);
      const onda = Math.pow(
        Math.max(0, Math.sin(dist / (130 * u) - f / 12)),
        3,
      );
      bolinhas.push(
        <circle
          key={`${i}-${j}`}
          cx={x}
          cy={y}
          r={(3.2 + 5.5 * onda) * u}
          fill={cor}
          fillOpacity={p * Math.min(1, borda * 1.4) * (0.45 + 0.55 * onda)}
        />,
      );
    }
  }
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      {bolinhas}
      <Traco d={cantos(W, H, 52 * u, 70 * u)} q={p} o={0.5} w={2.2 * u} cor={cor} />
    </svg>
  );
};

const VARIANTES: Record<VarianteFundo, React.FC<Ctx>> = {
  grade: Grade,
  orbitas: Orbitas,
  visor: Visor,
  timeline: Timeline,
  losangos: Losangos,
  pontos: Pontos,
};

/**
 * Tela de fundo animada do CFDesigner: preto `void` com elementos gráficos finos em bronze
 * (o metal do logo), bem discretos e em movimento lento. Para cenas sem foto ou vídeo
 * (passo a passo, explicações, frases). Veja docs/fundos.md.
 */
export const FundoCF: React.FC<FundoCFProps> = ({
  variante,
  intensidade = 1,
  entrada = 18,
  duracao,
  saida = 10,
  foco = { x: 0.5, y: 0.45 },
  fundo = true,
  granulado = true,
  cor = colors.cinema.bronze,
}) => {
  const f = useCurrentFrame();
  const { width: W, height: H } = useVideoConfig();
  const u = Math.min(W, H) / 1080;
  const p = outExpo(interpolate(f, [0, entrada], [0, 1], clamp));
  const fim =
    duracao === undefined
      ? 1
      : interpolate(f, [duracao - saida, duracao], [1, 0], clamp);
  const Variante = VARIANTES[variante];
  return (
    <AbsoluteFill
      style={{
        background: fundo ? colors.cinema.void : undefined,
        opacity: fim,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill style={{ opacity: Math.min(1, intensidade) }}>
        <Variante
          f={f}
          W={W}
          H={H}
          u={u}
          cx={W * foco.x}
          cy={H * foco.y}
          p={p}
          cor={cor}
        />
      </AbsoluteFill>
      {granulado ? <FilmGrain opacity={0.05} /> : null}
    </AbsoluteFill>
  );
};
