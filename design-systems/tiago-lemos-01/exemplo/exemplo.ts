import type { Edicao } from "../components";

// Texto sintético só para mostrar o estilo (tempos inventados, 1 palavra a cada ~0,34 s).
const falas =
  "Corto as pausas, coloco legenda palavra por palavra, e cada ideia ganha um elemento animado. São 12 passos prontos, com resultado rápido e sem complicação, direto no seu celular".split(
    " ",
  );
export const exemploEdicao: Edicao = {
  duracaoSeg: 11,
  captions: falas.map((text, i) => ({
    text,
    startMs: 300 + i * 340,
    endMs: 300 + i * 340 + 300,
    timestampMs: null,
    confidence: 1,
  })),
  destaques: ["pausas", "legenda", "elemento", "12", "rápido", "celular"],
  elementos: [
    { tipo: "icone", icone: "tesoura", titulo: "CORTA AS *PAUSAS*", kicker: "passo 1", de: 0.4, ate: 2.4 },
    { tipo: "icone", icone: "chat", titulo: "LEGENDA *VIVA*", de: 2.8, ate: 4.8 },
    { tipo: "numero", valor: 12, sufixo: "", rotulo: "PASSOS *PRONTOS*", kicker: "tudo incluso", de: 5.2, ate: 7.4 },
    { tipo: "lista", itens: ["SEM *COMPLICAÇÃO*", "RESULTADO *RÁPIDO*"], de: 7.8, ate: 10.4 },
  ],
};
