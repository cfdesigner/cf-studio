// TÉCNICA GERAL (sem marca): lógica de TEXTO e TEMPO das legendas. Nada de visual aqui.
// Cada design system decide como desenhar, animar e agrupar; estas funções são ajudantes opcionais.
// Sem imports: também roda direto no Node (scripts/frases-de-efeito.mjs).

/** Compatível com o tipo Caption do Remotion e com a saída de scripts/transcrever.py. */
export type Caption = {
  text: string;
  startMs: number;
  endMs: number;
  timestampMs: number | null;
  confidence: number | null;
};

/** Frase de efeito: vira o "Título de cinema" (palavra-chave gigante em âmbar). */
export type PunchLine = {
  startMs: number;
  endMs: number;
  /** Palavra-chave. Se omitida, escolhe-se automaticamente (número, senão a palavra mais longa). */
  keyword?: string;
  /** Tamanho do texto DEPOIS da palavra-chave, como fração do tamanho da palavra-chave (padrão: pequeno, estilo legenda). Ex.: 1 = igual. */
  depoisEscala?: number;
  /** Tamanho máximo, em px na base de 1080, do texto ANTES da palavra-chave (padrão 96). */
  antesMax?: number;
};

export type Page = { words: Caption[]; startMs: number; endMs: number };

export type PunchCandidate = PunchLine & { text: string; keyword: string };

const clean = (s: string) => s.replace(/[.,!?…:;"“”()]/g, "").trim();

/** Índice da palavra-chave: um número, senão a palavra mais longa (empate: a última). */
export const pickKeywordIndex = (texts: string[]): number => {
  const words = texts.map(clean);
  const num = words.findIndex((w) => /\d/.test(w));
  if (num >= 0) return num;
  let best = 0;
  words.forEach((w, i) => {
    if (w.length >= words[best].length) best = i;
  });
  return best;
};

/**
 * Regra do dono: legenda NUNCA termina com ponto final NEM com reticências. Vírgula, ? e ! ficam.
 * Tira um ou mais pontos finais e reticências ("..." ou "…") do fim do texto; "certo?..." vira "certo?".
 * Pontos no meio (ex.: "3.5") não são mexidos.
 */
export const tiraPontoFinal = (text: string): string =>
  text.replace(/([^.\s…])\s*(?:\.+|…)+\s*$/, "$1");

/** Palavras curtas que não devem terminar uma página de legenda (português). */
const STOPWORDS = [
  "a",
  "o",
  "as",
  "os",
  "um",
  "uma",
  "de",
  "da",
  "do",
  "das",
  "dos",
  "em",
  "na",
  "no",
  "nas",
  "nos",
  "e",
  "que",
  "para",
  "com",
  "por",
  "ao",
  "à",
  "se",
  "ou",
  "pela",
  "pelo",
];

const endsSentence = (text: string) => /[.!?…]$/.test(text.trim());

/** Agrupa as palavras em "páginas" de legenda do dia a dia, pulando as frases de efeito. */
export const buildPages = (
  captions: Caption[],
  punchLines: PunchLine[] = [],
  opts: {
    maxChars?: number;
    maxWords?: number;
    maxGapMs?: number;
    carryStopwords?: boolean;
  } = {},
): Page[] => {
  const maxChars = opts.maxChars ?? 34;
  const maxWords = opts.maxWords ?? 7;
  const maxGapMs = opts.maxGapMs ?? 550;
  const carryStopwords = opts.carryStopwords ?? false;
  const inPunch = (c: Caption) =>
    punchLines.some((p) => c.startMs >= p.startMs && c.startMs < p.endMs);

  const pages: Page[] = [];
  let cur: Caption[] = [];
  const flush = () => {
    if (cur.length) {
      pages.push({
        words: cur,
        startMs: cur[0].startMs,
        endMs: cur[cur.length - 1].endMs,
      });
      cur = [];
    }
  };

  for (const c of captions) {
    if (inPunch(c)) {
      flush();
      continue;
    }
    const prev = cur[cur.length - 1];
    const chars =
      cur.reduce((n, w) => n + clean(w.text).length + 1, 0) +
      clean(c.text).length;
    if (
      prev &&
      (c.startMs - prev.endMs > maxGapMs ||
        chars > maxChars ||
        cur.length >= maxWords ||
        endsSentence(prev.text) ||
        (cur.length >= 3 && /[,;:]$/.test(prev.text.trim())))
    ) {
      // Quebra por tamanho: não deixa artigo/preposição sozinho no fim da página (vai junto da palavra seguinte).
      const bySize = chars > maxChars || cur.length >= maxWords;
      const carry: Caption[] = [];
      if (
        carryStopwords &&
        bySize &&
        cur.length > 1 &&
        !endsSentence(prev.text) &&
        !/[,;:]$/.test(prev.text.trim()) &&
        c.startMs - prev.endMs <= maxGapMs &&
        STOPWORDS.indexOf(clean(prev.text).toLowerCase()) >= 0
      ) {
        carry.push(cur.pop() as Caption);
      }
      flush();
      cur.push(...carry);
    }
    cur.push(c);
  }
  flush();
  return pages;
};

/**
 * Sugere frases de efeito (heurística, SEMPRE para o dono aprovar):
 * frases curtas (3–9 palavras, até 4 s) cercadas por pausa, a primeira frase (gancho) conta como "pausa antes".
 */
export const suggestPunchLines = (
  captions: Caption[],
  opts: { minPauseMs?: number; maxShare?: number } = {},
): PunchCandidate[] => {
  const minPause = opts.minPauseMs ?? 350;
  const sentences: Caption[][] = [];
  let cur: Caption[] = [];
  captions.forEach((c, i) => {
    cur.push(c);
    const next = captions[i + 1];
    if (!next || endsSentence(c.text) || next.startMs - c.endMs > 700) {
      sentences.push(cur);
      cur = [];
    }
  });

  const scored: (PunchCandidate & { score: number })[] = [];
  sentences.forEach((s, i) => {
    const prev = sentences[i - 1];
    const next = sentences[i + 1];
    const first = s[0];
    const last = s[s.length - 1];
    const before = prev
      ? first.startMs - prev[prev.length - 1].endMs
      : Infinity;
    const after = next ? next[0].startMs - last.endMs : Infinity;
    const dur = last.endMs - first.startMs;
    if (s.length < 3 || s.length > 9 || dur > 4000) return;
    if (!(before >= minPause || i === 0) || !(after >= minPause || !next))
      return;
    const texts = s.map((w) => w.text);
    const k = pickKeywordIndex(texts);
    scored.push({
      startMs: first.startMs,
      endMs: last.endMs + 200,
      text: texts.join("").trim(),
      keyword: clean(texts[k]),
      score:
        (Math.min(before, 1500) + Math.min(after, 1500)) / 3000 - s.length / 20,
    });
  });

  const cap = Math.max(1, Math.ceil(sentences.length * (opts.maxShare ?? 0.3)));
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, cap)
    .sort((a, b) => a.startMs - b.startMs)
    .map((c) => ({
      startMs: c.startMs,
      endMs: c.endMs,
      text: c.text,
      keyword: c.keyword,
    }));
};
