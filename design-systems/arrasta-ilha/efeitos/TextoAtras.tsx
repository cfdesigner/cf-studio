import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import "../fonts";
import { colors, engrossar, entrelinha, fontFamilies } from "../tokens";
import { batida, clamp } from "../movimento";

/**
 * TEXTO ATRÁS DA PESSOA (Arrasta Ilha). Camadas, de baixo para cima: vídeo (do chamador) → escurecimento leve → palavra gigante → pessoa recortada.
 * A pessoa vem de scripts/recortar-pessoa.py (PNGs 001.png... em public/). A palavra sobe com a "batida".
 * Coloque dentro de uma <Sequence> que começa no quadro 0 do trecho recortado, no MESMO container (e no mesmo transform) do vídeo,
 * para o recorte acompanhar o soco de 4% do corte.
 */
export const TextoAtras: React.FC<{
  palavra: string;
  pessoa: string;
  quadros: number;
  /** Centro vertical da palavra, em px na base de 1080x1920 (a cabeça fica ~ 300 a 900). */
  centroY?: number;
  /** Tamanho em px na base de 1080 (padrão: cabe em 960 px). */
  tamanho?: number;
  entra?: number;
  sai?: number;
  cor?: string;
  /** Escurecimento do fundo (0 a 1) para a palavra ler. */
  escurece?: number;
  /** Largura do vídeo de origem / altura, para alinhar o recorte ao vídeo (padrão: 312x482). */
  proporcao?: number;
}> = ({ palavra, pessoa, quadros, centroY = 640, tamanho, entra = 4, sai, cor = colors.laranjaVivo, escurece = 0.22, proporcao = 312 / 482 }) => {
  const fr = useCurrentFrame();
  const tam = tamanho ?? Math.min(300, Math.floor(960 / (palavra.length * 0.435)));
  const p = batida(interpolate(fr, [entra, entra + 18], [0, 1], clamp));
  const fim = sai ?? 9999;
  const visivel = fr >= entra && fr < fim;
  const n = String(Math.min(fr + 1, quadros)).padStart(3, "0");
  const largura = 1920 * proporcao;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "#000", opacity: visivel ? interpolate(fr, [entra, entra + 12], [0, escurece], clamp) : 0 }} />
      {visivel && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: centroY - tam / 2,
            textAlign: "center",
            fontFamily: fontFamilies.display,
            fontSize: tam,
            lineHeight: entrelinha.titulo,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            color: cor,
            WebkitTextStroke: `${tam * engrossar.padrao}px ${cor}`,
            paintOrder: "stroke fill",
            opacity: p,
            transform: `translateY(${(1 - p) * 140}px)`,
            textShadow: "0 6px 30px rgba(0,0,0,.35)",
          }}
        >
          {palavra}
        </div>
      )}
      <Img src={staticFile(`${pessoa}/${n}.png`)} style={{ position: "absolute", left: "50%", top: 0, height: 1920, width: largura, transform: "translateX(-50%)" }} />
    </AbsoluteFill>
  );
};
