// Ícones de traço (grade 24×24) para ilustrar o que é falado. Cada ícone é uma lista de caminhos desenhados em sequência.
// Para criar mais: acrescente aqui e coloque o nome em NOMES_ICONES (a skill lê essa lista).
const c = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0z`;

export const ICONES: Record<string, string[]> = {
  raio: ["M13 2 4 14h7l-1 8 9-12h-7z"],
  foguete: [
    "M12 2c3 2.5 4.5 6 4.5 10l-2 3h-5l-2-3c0-4 1.5-7.5 4.5-10z",
    c(12, 9.5, 1.5),
    "M7.5 13 5 15.5V19l3.5-1.5",
    "M16.5 13 19 15.5V19l-3.5-1.5",
    "M12 18v3.5",
  ],
  lampada: [
    "M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z",
    "M9.5 18.5h5",
    "M10.5 21h3",
  ],
  estrela: ["M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"],
  check: [c(12, 12, 9), "M7.5 12.5l3 3 6-6.5"],
  alvo: [c(12, 12, 9), c(12, 12, 5), c(12, 12, 1)],
  relogio: [c(12, 12, 9), "M12 7v5l3 2"],
  calendario: ["M4 6h16v14H4z", "M4 10h16", "M8 3v4", "M16 3v4"],
  chat: ["M4 5h16v11H10l-4 4v-4H4z", "M8 9h8", "M8 12h5"],
  grafico: ["M3 17l6-6 4 4 8-8", "M15 7h6v6"],
  dinheiro: [
    c(12, 12, 9),
    "M12 6.5v11",
    "M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1 0-2-.5-2.5-1.5",
  ],
  escudo: ["M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z", "M8.5 12l2.5 2.5 4.5-5"],
  play: [c(12, 12, 9), "M10 8.5v7l6-3.5z"],
  camera: ["M3 8h4l2-3h6l2 3h4v11H3z", c(12, 13, 3.5)],
  pessoas: [
    c(9, 8, 3.5),
    "M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6",
    "M16 4.8a3.2 3.2 0 0 1 0 6.4",
    "M18 14.5c2.5.5 4 2.5 4 5.5",
  ],
  cadeado: ["M5 11h14v10H5z", "M8 11V8a4 4 0 0 1 8 0v3", "M12 15v2.5"],
  link: [
    "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1",
    "M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
  ],
  coracao: ["M12 20.5C5 15.5 3 12 3 8.8A4.8 4.8 0 0 1 12 6.5a4.8 4.8 0 0 1 9 2.3c0 3.2-2 6.7-9 11.7z"],
  livro: ["M12 6c-2-1.3-4.5-2-8-2v14c3.5 0 6 .7 8 2 2-1.3 4.5-2 8-2V4c-3.5 0-6 .7-8 2z", "M12 6v14"],
  maleta: ["M3 8h18v12H3z", "M9 8V5h6v3", "M3 13h18"],
  microfone: ["M9 3h6v9a3 3 0 0 1-6 0z", "M5.5 11a6.5 6.5 0 0 0 13 0", "M12 17.5V21", "M9 21h6"],
  alerta: ["M12 3l10 17H2z", "M12 10v5", "M12 17.5v.5"],
  diamante: ["M6 4h12l4 5-10 12L2 9z", "M2 9h20", "M9 4l3 5 3-5"],
  magia: [
    "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
    "M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
  ],
  lupa: [c(11, 11, 7), "M16 16l5 5"],
  computador: ["M3 5h18v12H3z", "M8 21h8", "M12 17v4"],
  celular: ["M7 2h10v20H7z", "M11 18.5h2"],
  tesoura: [c(6, 6, 2.5), c(6, 18, 2.5), "M8 7.5 20 17", "M8 16.5 20 7"],
  fogo: ["M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.2 2-4 0 1.5.8 2.3 1.5 2.5C10 8 10.5 5 12 3z"],
  mais: ["M12 5v14", "M5 12h14"],
  seta: ["M5 12h14", "M13 6l6 6-6 6"],
  cerebro: [
    "M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V4a3 3 0 0 0-3 0z",
    "M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1",
    "M12 8v8",
  ],
};

export const NOMES_ICONES = Object.keys(ICONES);
