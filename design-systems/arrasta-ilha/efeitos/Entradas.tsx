import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { batida, clamp, firme, tempos } from "../movimento";

/** Palavras sobem de uma máscara com a pancada da batida, uma depois da outra. */
export const TituloBatida: React.FC<{ texto: string; style: React.CSSProperties; atraso?: number }> = ({ texto, style, atraso = 0 }) => {
  const frame = useCurrentFrame();
  const palavras = texto.split(" ");
  return (
    <div style={{ ...style, display: "flex", flexWrap: "wrap", columnGap: "0.28em" }}>
      {palavras.map((p, i) => {
        const t = interpolate(frame - atraso - i * tempos.intervaloPalavra, [0, tempos.entradaTitulo], [0, 1], clamp);
        const y = interpolate(batida(t), [0, 1], [105, 0]);
        return (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", paddingTop: "0.08em", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
            <span style={{ display: "inline-block", transform: `translateY(${y}%)` }}>{p}</span>
          </span>
        );
      })}
    </div>
  );
};

/** Etiqueta pequena: desliza da esquerda e firma. */
export const EtiquetaFirme: React.FC<{ children: React.ReactNode; style: React.CSSProperties; atraso?: number }> = ({ children, style, atraso = 0 }) => {
  const frame = useCurrentFrame();
  const t = firme(interpolate(frame - atraso, [0, tempos.entradaEtiqueta], [0, 1], clamp));
  return <div style={{ ...style, opacity: t, transform: `translateX(${(1 - t) * -40}px)` }}>{children}</div>;
};

/** Filete que se desenha da esquerda para a direita. */
export const FileteDesenha: React.FC<{ cor: string; largura: number; atraso?: number }> = ({ cor, largura, atraso = 0 }) => {
  const frame = useCurrentFrame();
  const t = firme(interpolate(frame - atraso, [0, tempos.filete], [0, 1], clamp));
  return <div style={{ height: 4, width: largura * t, background: cor }} />;
};
