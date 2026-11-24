import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../tokens";
import { clamp, outExpo } from "../movimento";

const c = colors.cinema;

export type FlashCutProps = {
  /** Frame (dentro da sequência) do corte. */
  at: number;
  /** Duração do clarão em frames (padrão 12). */
  durationInFrames?: number;
};

/** Clarão rápido de luz branco-gelo cobrindo um corte. Inspirado em "flash-through-white". */
export const FlashCut: React.FC<FlashCutProps> = ({
  at,
  durationInFrames = 12,
}) => {
  const f = useCurrentFrame();
  const o = interpolate(
    f,
    [at - 1, at + 1, at + durationInFrames],
    [0, 0.9, 0],
    clamp,
  );
  if (o <= 0) return null;
  return <AbsoluteFill style={{ background: c.ink, opacity: o }} />;
};

export type LightLeakProps = {
  /** Frame de início. */
  at?: number;
  durationInFrames?: number;
  /** Lado de onde a luz entra. */
  from?: "left" | "right";
};

/**
 * Vazamento de luz âmbar atravessando o quadro. Use em cortes, nunca atrás de texto
 * (o brand book pede flare único, âmbar, no canto). Inspirado em "light-leak".
 */
export const LightLeak: React.FC<LightLeakProps> = ({
  at = 0,
  durationInFrames = 36,
  from = "left",
}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + durationInFrames], [0, 1], {
    ...clamp,
    easing: outExpo,
  });
  const o = interpolate(
    f,
    [at, at + durationInFrames * 0.35, at + durationInFrames],
    [0, 1, 0],
    clamp,
  );
  if (o <= 0) return null;
  const dir = from === "left" ? 1 : -1;
  const x = (from === "left" ? -40 : 140) + dir * p * 120;
  return (
    <AbsoluteFill
      style={{
        mixBlendMode: "screen",
        opacity: o,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: `${x}%`,
          width: "70%",
          height: "120%",
          filter: "blur(60px)",
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(226,180,90,.75), rgba(217,164,65,.35) 40%, rgba(138,74,20,0) 70%)",
        }}
      />
    </AbsoluteFill>
  );
};

export type WipeRevealProps = {
  children: React.ReactNode;
  /** Direção em que a borda de revelação se move. */
  direction?: "left" | "right" | "up" | "down";
  from?: number;
  durationInFrames?: number;
};

/** Revela o conteúdo com uma cortina reta. Inspirado em "directional-wipe" / "curtain-reveal". */
export const WipeReveal: React.FC<WipeRevealProps> = ({
  children,
  direction = "right",
  from = 0,
  durationInFrames = 18,
}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [from, from + durationInFrames], [0, 1], {
    ...clamp,
    easing: outExpo,
  });
  const r = (1 - p) * 100;
  const inset = {
    right: `inset(0 ${r}% 0 0)`,
    left: `inset(0 0 0 ${r}%)`,
    up: `inset(${r}% 0 0 0)`,
    down: `inset(0 0 ${r}% 0)`,
  }[direction];
  return <AbsoluteFill style={{ clipPath: inset }}>{children}</AbsoluteFill>;
};

export type VarreduraAmbarProps = {
  /** A cena que entra: aparece atrás da linha. A cena anterior precisa continuar por baixo durante a varredura. */
  children: React.ReactNode;
  durationInFrames?: number;
  /** Inclinação da linha, como fração da largura (padrão 0,35). */
  inclinacao?: number;
};

/**
 * Transição "varredura âmbar": uma linha fina âmbar cruza o quadro na transversal, da esquerda para a direita,
 * e vai revelando a cena nova atrás dela. Pedida pelo dono no episódio 04 (ritmo → cor). Sem texto atrás da linha.
 */
export const VarreduraAmbar: React.FC<VarreduraAmbarProps> = ({
  children,
  durationInFrames = 16,
  inclinacao = 0.35,
}) => {
  const f = useCurrentFrame();
  const { width: W, height: H } = useVideoConfig();
  const p = interpolate(f, [0, durationInFrames], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const tilt = inclinacao * W;
  const xt = p * (W + tilt); // ponto da linha no topo
  const xb = xt - tilt; // ponto da linha embaixo
  const op = interpolate(f, [0, 3, durationInFrames - 2, durationInFrames + 4], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `polygon(0px 0px, ${xt}px 0px, ${xb}px ${H}px, 0px ${H}px)` }}>
        {children}
      </AbsoluteFill>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0, opacity: op, overflow: "visible" }}>
        <defs>
          <filter id="cf-varredura-brilho" x="-50%" y="-5%" width="200%" height="110%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>
        <line x1={xt} y1={0} x2={xb} y2={H} stroke={c.amber} strokeWidth={16} opacity={0.45} filter="url(#cf-varredura-brilho)" />
        <line x1={xt} y1={0} x2={xb} y2={H} stroke={c.amberText} strokeWidth={3.5} strokeLinecap="square" />
      </svg>
    </AbsoluteFill>
  );
};

export type VeuDeLuzProps = {
  /** Duração total, em quadros (padrão 28). */
  durationInFrames?: number;
  /** Quadro em que a tela fica mais clara: ponha o corte aqui (padrão 10). */
  quadroPico?: number;
  /** Opacidade máxima do véu, de 0 a 1 (padrão 0,65). */
  pico?: number;
};

/**
 * Véu de luz: a tela fica esbranquiçada (branco quente, mais forte no alto à direita) e a luz some em seguida.
 * Mais elegante que o `LightLeak` âmbar; pedido do dono no episódio 04 (bruto → ritmo). Use em cortes, com o corte no `quadroPico`.
 * Nunca atrás de texto (atrase o texto até o véu passar).
 */
export const VeuDeLuz: React.FC<VeuDeLuzProps> = ({
  durationInFrames = 28,
  quadroPico = 10,
  pico = 0.65,
}) => {
  const f = useCurrentFrame();
  const sobe = interpolate(f, [0, quadroPico], [0, pico], { ...clamp, easing: Easing.out(Easing.cubic) });
  const desce = interpolate(f, [quadroPico, durationInFrames], [pico, 0], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const o = f < quadroPico ? sobe : desce;
  if (o <= 0) return null;
  return (
    <AbsoluteFill
      style={{
        mixBlendMode: "screen",
        opacity: o,
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse at 62% 30%, rgba(255,251,242,1) 0%, rgba(255,246,230,.85) 45%, rgba(255,240,218,.6) 100%)",
      }}
    />
  );
};
