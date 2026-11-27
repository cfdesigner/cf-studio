import React from "react";
import { Img } from "remotion";
import { faixas, recortes, type FaixaNome, type RecorteNome } from "../assets";

/** Faixa de padrão original do site, repetida na horizontal (lado a lado, sem background-image). `alt` é a altura final. */
export const Faixa: React.FC<{ nome: FaixaNome; w?: number; alt?: number; fundo?: string; style?: React.CSSProperties }> = ({ nome, w = 1080, alt = 56, fundo, style }) => {
  const f = faixas[nome];
  const tile = (alt * f.w) / f.h;
  const n = Math.ceil(w / tile);
  return (
    <div style={{ position: "relative", width: w, height: alt, overflow: "hidden", background: fundo, ...style }}>
      {Array.from({ length: n }, (_, i) => (
        <Img key={i} src={f.src} style={{ position: "absolute", left: i * tile, top: 0, width: tile + 1, height: alt }} />
      ))}
    </div>
  );
};

/** Recorte original posicionado pelo canto. Informe `altura` (ou `largura`); a proporção é mantida. */
export const Recorte: React.FC<{
  nome: RecorteNome;
  altura?: number;
  largura?: number;
  style?: React.CSSProperties;
  espelhar?: boolean;
}> = ({ nome, altura, largura, style, espelhar }) => {
  const r = recortes[nome];
  const h = altura ?? (largura ? (largura * r.h) / r.w : r.h);
  const w = (h * r.w) / r.h;
  return <Img src={r.src} style={{ position: "absolute", width: w, height: h, transform: espelhar ? "scaleX(-1)" : undefined, ...style }} />;
};
