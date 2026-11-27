import React from "react";
import { Img } from "remotion";
import { faixas, padrao, recortes, type FaixaNome, type RecorteNome } from "../assets";

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

/** Padrão oficial do grupo cobrindo uma área (repete lado a lado, sem emenda visível). `escala` 1 = tamanho do arquivo. */
export const PadraoOficial: React.FC<{ w: number; h: number; escala?: number; style?: React.CSSProperties }> = ({ w, h, escala = 1, style }) => {
  const tw = padrao.w * escala;
  const th = padrao.h * escala;
  const nx = Math.ceil(w / tw);
  const ny = Math.ceil(h / th);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, overflow: "hidden", ...style }}>
      {Array.from({ length: nx * ny }, (_, i) => (
        <Img key={i} src={padrao.src} style={{ position: "absolute", left: (i % nx) * tw, top: Math.floor(i / nx) * th, width: tw + 1, height: th + 1 }} />
      ))}
    </div>
  );
};
