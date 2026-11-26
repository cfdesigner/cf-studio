import React from "react";
import { AbsoluteFill } from "remotion";
import { TituloScript } from "../index";
import { colors, fontFamilies } from "../tokens";

const V = {
  a: { fundo: "preto", fonte: "kaushan", linha1: "Quem dirige", prefixo: "é", palavra: "você.", tamanho: 150, bg: colors.cinema.void, tx: "#c4cbd2" },
  b: { fundo: "ambar", fonte: "yellowtail", linha1: "Da argila", prefixo: "ao", palavra: "4K.", tamanho: 170, bg: colors.cinema.amber, tx: colors.cinema.void },
  c: { fundo: "branco", fonte: "damion", linha1: "Qual", prefixo: "", palavra: "sou eu?", tamanho: 180, bg: "#ffffff", tx: "#3a3f46" },
} as const;

/** Exemplo do TituloScript (4:5). variante a = preferida do dono (Kaushan, âmbar sobre preto). */
export const ExemploTituloScript: React.FC<{ variante?: "a" | "b" | "c" }> = ({ variante = "a" }) => {
  const v = V[variante];
  return (
    <AbsoluteFill style={{ background: v.bg, padding: 64 }}>
      <div style={{ marginTop: 190 }}>
        <TituloScript linha1={v.linha1} prefixo={v.prefixo || undefined} palavra={v.palavra} fonte={v.fonte} fundo={v.fundo} tamanho={v.tamanho} />
      </div>
      <p style={{ marginTop: 40, width: 520, fontFamily: fontFamilies.body, fontSize: 31, lineHeight: 1.45, color: v.tx }}>
        Mistura de letra quadrada com uma palavra em pincel que sobe sobre a linha de cima.
      </p>
    </AbsoluteFill>
  );
};
