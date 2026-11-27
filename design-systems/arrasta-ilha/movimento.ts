// PERSONALIDADE DE MOVIMENTO do Arrasta Ilha: a "batida".
// Proposta (a aprovar): não há vídeo de referência do grupo; a personalidade vem da identidade (maracatu, tambor, coletivo):
// entra firme como uma pancada de alfaia, passa um pouco do ponto e assenta; nada de fade longo nem de elástico bobo.
import { Easing } from "remotion";

/** Pancada: acelera rápido, leve passada do ponto (1,2) e assenta. */
export const batida = Easing.out(Easing.back(1.2));
/** Chegada firme sem passar do ponto (textos pequenos, filetes). */
export const firme = Easing.bezier(0.16, 1, 0.3, 1);
/** Saída seca. */
export const saida = Easing.in(Easing.quad);
export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Velocidades em quadros a 30 fps. */
export const tempos = {
  entradaTitulo: 14,
  intervaloPalavra: 4, // cada palavra entra 4 quadros depois da anterior (a "levada")
  entradaEtiqueta: 10,
  filete: 12,
  transicao: 16,
  respiro: 6,
} as const;

/** Andamento para cortar na batida (hipótese; ajustar ao som real do grupo). */
export const bpm = 96;
export const quadrosPorBatida = (fps: number) => Math.round((60 / bpm) * fps);
