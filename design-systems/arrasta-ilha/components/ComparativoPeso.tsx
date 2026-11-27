import React from "react";
import { AbsoluteFill } from "remotion";
import "../fonts";
import { colors, fontFamilies } from "../tokens";

const linhas: { rotulo: string; familia: string; stroke: number; }[] = [
  { rotulo: "Sans, Regular (como veio)", familia: "Zenzero Grotesk Sans", stroke: 0 },
  { rotulo: "Sans + contorno 1,5 px", familia: "Zenzero Grotesk Sans", stroke: 1.5 },
  { rotulo: "Sans + contorno 3 px", familia: "Zenzero Grotesk Sans", stroke: 3 },
  { rotulo: "Sans + contorno 5 px", familia: "Zenzero Grotesk Sans", stroke: 5 },
  { rotulo: "Round, Regular (como veio)", familia: "Zenzero Grotesk Round", stroke: 0 },
  { rotulo: "Round + contorno 3 px", familia: "Zenzero Grotesk Round", stroke: 3 },
  { rotulo: "Round + contorno 5 px", familia: "Zenzero Grotesk Round", stroke: 5 },
];

/** Prancha para escolher como engrossar a Zenzero (o arquivo só veio no peso Regular). */
export const ComparativoPeso: React.FC = () => (
  <AbsoluteFill style={{ background: colors.creme, padding: 40, color: colors.noite }}>
    <div style={{ fontFamily: fontFamilies.etiqueta, fontSize: 26, letterSpacing: 4, color: colors.laranjaTexto, marginBottom: 14 }}>
      ZENZERO: COMO ENGROSSAR
    </div>
    {linhas.map((l) => (
      <div key={l.rotulo} style={{ display: "flex", alignItems: "center", gap: 24, borderBottom: `1px solid ${colors.areia}`, padding: "6px 0" }}>
        <div style={{ width: 250, fontFamily: fontFamilies.corpo, fontSize: 20, color: "#5b4a42" }}>{l.rotulo}</div>
        <div style={{ fontFamily: `"${l.familia}"`, fontSize: 84, lineHeight: 1.05, textTransform: "uppercase", WebkitTextStroke: `${l.stroke}px ${colors.noite}`, paintOrder: "stroke fill" }}>
          Domingo tem maracatu
        </div>
      </div>
    ))}
  </AbsoluteFill>
);
