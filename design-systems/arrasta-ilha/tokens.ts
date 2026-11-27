// Arrasta Ilha: tokens. Cores medidas nos prints do site (arrastailha.com.br) em 27/11/2026,
// amostrando áreas de cor chapada. "derivada" = ajustada por mim para contraste, não medida.

export const colors = {
  // fundos
  noite: "#1f1817", // preto quente (rodapés, fundo escuro do Instagram do grupo)
  grafite: "#303030", // rodapé do site
  creme: "#f3ece3", // fundo claro com textura leve (site usa branco quase puro com papel)
  areia: "#e4cebb",
  // cores-tema (cada página/peça usa uma como protagonista)
  laranja: "#f38b4c", // coluna "Contato" e filetes da página Fundamentos
  laranjaTexto: "#c4601f", // derivada: laranja escurecido para texto sobre creme
  petroleo: "#005d74", // faixa da Home
  marinho: "#143e6b", // faixa "Nações parceiras"
  verde: "#217355", // faixa "Grupos parceiros"
  verdeMata: "#006459", // faixa da Home
  verdeFolha: "#6eb140", // borda do topo da Home
  azulBandeira: "#007bc3", // faixa de ícones brancos
  terra: "#593226", // folhas marrons
  // texto
  tintaClara: "#fcf9f5",
  tintaEscura: "#1f1817",
} as const;

export type ColorName = keyof typeof colors;

/** Cada tema é um par fundo/destaque; a peça escolhe UM como protagonista. */
export const temas = {
  laranja: { fundo: colors.laranja, texto: colors.noite, destaque: colors.terra, sobreCreme: colors.laranjaTexto },
  verde: { fundo: colors.verde, texto: colors.tintaClara, destaque: colors.verdeFolha, sobreCreme: colors.verde },
  azul: { fundo: colors.marinho, texto: colors.tintaClara, destaque: colors.azulBandeira, sobreCreme: colors.marinho },
  petroleo: { fundo: colors.petroleo, texto: colors.tintaClara, destaque: colors.laranja, sobreCreme: colors.petroleo },
} as const;

export type TemaNome = keyof typeof temas;

export const fontFamilies = {
  /** Títulos e menu: "Zenzero Grotesk Sans" (a do site do grupo; arquivo em assets/fonts/). Plano B: Odibee Sans. */
  display: '"Zenzero Grotesk Sans", "Odibee Sans", "Staatliches", Impact, sans-serif',
  /** Nome do grupo e frases de impacto: pincel solto como o logo. */
  pincel: '"Kaushan Script", "Permanent Marker", cursive',
  /** Texto corrido: serifa quente como no site. */
  corpo: '"Crimson Pro", "Lora", Georgia, serif',
  /** Etiquetas, datas, serviço (menu e botões do site). */
  etiqueta: '"Zenzero Grotesk Sans", "Staatliches", Impact, sans-serif',
} as const;

export const espaco = { 4: 4, 8: 8, 12: 12, 16: 16, 24: 24, 32: 32, 48: 48, 64: 64, 96: 96 } as const;

export const raios = { reto: 0, suave: 6, cartao: 14, moldura: 9999 } as const;

/** Proporções das peças. */
export const formatos = {
  feed45: { w: 1080, h: 1350 },
  stories: { w: 1080, h: 1920 },
  quadrado: { w: 1080, h: 1080 },
  banner: { w: 1920, h: 1080 },
  cartaz: { w: 1080, h: 1528 }, // A-series
} as const;

/** Zenzero só tem peso Regular: engrossada com contorno da mesma cor (escolha do dono, 27/11/2026: 1,5 px num corpo de 84 px; no máximo 2 px).
 *  Em proporção ao corpo da letra: padrão 1,8%, máximo 2,4%. Use paintOrder "stroke fill". */
export const engrossar = { padrao: 0.018, maximo: 0.024 } as const;

/** Espaçamento entre letras (escolha do dono: letras bem juntas, nada de texto espaçado). Em em, aplicar como letterSpacing. */
export const espacamento = { titulo: "-0.045em", etiqueta: "-0.01em", corpo: "-0.005em" } as const;
