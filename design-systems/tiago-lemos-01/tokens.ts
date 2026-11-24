// Tokens do tiago-lemos-01. Cores medidas por amostragem do vídeo de referência (estimativa, não manual de marca).
export const colors = {
  fundo: "#0a0806",
  fundo2: "#15100a",
  ouroClaro: "#f3d58a",
  ouro: "#d8ab49",
  ouroEscuro: "#9a7424",
  branco: "#ffffff",
  textoSuave: "rgba(255,255,255,0.62)",
  fio: "rgba(216,171,73,0.45)",
} as const;

/** Degradê dourado (do claro ao âmbar escuro) usado em palavras e ícones grandes. */
export const ouroGradiente =
  "linear-gradient(180deg, #f3d58a 0%, #d8ab49 48%, #9a7424 100%)";

export const fonts = {
  titulo: "'Bebas Neue', 'Anton', sans-serif",
  legenda: "'Poppins', 'Montserrat', sans-serif",
  rotulo: "'Space Mono', 'IBM Plex Mono', monospace",
} as const;

/** Geometria base em 1080×1920 (escala sozinha por width/1080). */
export const layout = {
  painelTopo: 130,
  painelBase: 890,
  legendaBase: 950, // base da legenda (logo acima do quadro do rosto)
  quadroX: 60,
  quadroY: 975,
  quadroW: 960,
  quadroH: 690,
  quadroRaio: 40,
} as const;

/** Efeitos sonoros: arquivos em assets/sfx/ (pico -20 dBFS cada). `ganho` multiplica o volume. */
export const sfx = { ganho: 1, adiantaQuadros: 3 } as const;
