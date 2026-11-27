import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { clamp, firme, tempos } from "../movimento";

/** Cortina em zigue-zague: uma faixa da cor-tema varre a tela de baixo para cima e revela a próxima cena.
 *  Coloque dentro de um <Sequence> de `tempos.transicao` quadros, POR CIMA das duas cenas; no meio da varredura a cena de baixo já é a nova. */
export const CortinaZigue: React.FC<{ cor: string; w: number; h: number; dentes?: number }> = ({ cor, w, h, dentes = 14 }) => {
  const frame = useCurrentFrame();
  const t = Easing.inOut(Easing.cubic)(interpolate(frame, [0, tempos.transicao], [0, 1], clamp));
  const amp = w / dentes / 2;
  // a borda superior da faixa sobe de h+amp até -amp*2; a faixa cobre tudo abaixo da borda no 1º tempo e some no 2º
  const metade = t < 0.5;
  const p = metade ? t / 0.5 : (t - 0.5) / 0.5;
  const borda = metade ? interpolate(p, [0, 1], [h + amp, -amp]) : -amp;
  const base = metade ? h + amp * 2 : interpolate(p, [0, 1], [h + amp * 2, -amp]);
  const pts = (y: number) => Array.from({ length: dentes * 2 + 1 }, (_, i) => `${(i * w) / (dentes * 2)},${y + (i % 2 ? amp : 0)}`);
  const topo = pts(borda);
  const fundo = pts(base).reverse();
  return (
    <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
      <polygon points={[...topo, ...fundo].join(" ")} fill={cor} />
    </svg>
  );
};

/** Soco de câmera: a cena entra 4% maior e assenta em 8 quadros (a "pancada" no corte). */
export const SocoDeBatida: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const s = interpolate(firme(interpolate(frame, [0, 8], [0, 1], clamp)), [0, 1], [1.04, 1]);
  return <div style={{ position: "absolute", inset: 0, transform: `scale(${s})` }}>{children}</div>;
};
