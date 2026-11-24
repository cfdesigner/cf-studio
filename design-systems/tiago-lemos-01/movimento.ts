// MOVIMENTO do tiago-lemos-01: rápido, firme e limpo. Entrada em expo (chega rápido, assenta devagar),
// saída curta. Nada de elástico nem de balanço exagerado.
import { Easing } from "remotion";

export const outExpo = Easing.bezier(0.16, 1, 0.3, 1);
export const inCubic = Easing.in(Easing.cubic);
export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** Duração (em quadros a 30 fps) da entrada e da saída de cada elemento. */
export const ENTRADA = 14;
export const SAIDA = 9;
