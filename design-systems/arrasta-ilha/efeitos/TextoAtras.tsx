import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import "../fonts";
import { colors, engrossar, entrelinha, fontFamilies } from "../tokens";
import { batida, clamp } from "../movimento";

/** Uma linha do texto atrás da pessoa. `centroY` e `tamanho` em px na base de 1080x1920. */
export type LinhaAtras = { texto: string; tamanho: number; centroY: number; cor?: string };

/**
 * TEXTO ATRÁS DA PESSOA (Arrasta Ilha). Camadas, de baixo para cima: vídeo (do chamador) → escurecimento leve → linhas de texto → pessoa recortada.
 * A pessoa vem de scripts/recortar-pessoa.py (PNGs 001.png... em public/). As linhas sobem juntas com a "batida".
 * IMPORTANTE: o recorte só existe enquanto o texto está na tela (`entra` a `sai`). Quando o texto sai, a camada da pessoa sai junto e a cena
 * volta a ser só o vídeo, sem recorte por cima (o recorte tem poucos quadros e não pode ficar parado).
 * Coloque no MESMO container (e no mesmo transform) do vídeo, dentro de uma <Sequence> que começa no quadro 0 do trecho recortado.
 */
export const TextoAtras: React.FC<{
  linhas: LinhaAtras[];
  pessoa: string;
  quadros: number;
  entra?: number;
  /** Quadro em que o texto e o recorte saem (precisa ser <= quadros). */
  sai: number;
  escurece?: number;
  /** Largura do vídeo / altura, para alinhar o recorte ao vídeo (padrão: 312x482). */
  proporcao?: number;
}> = ({ linhas, pessoa, quadros, entra = 4, sai, escurece = 0.22, proporcao = 312 / 482 }) => {
  const fr = useCurrentFrame();
  const fim = Math.min(sai, quadros);
  if (fr < entra || fr >= fim) return null;
  const p = batida(interpolate(fr, [entra, entra + 18], [0, 1], clamp));
  const sumir = interpolate(fr, [fim - 6, fim], [1, 0], clamp);
  const n = String(Math.min(fr + 1, quadros)).padStart(3, "0");
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "#000", opacity: Math.min(interpolate(fr, [entra, entra + 12], [0, escurece], clamp), sumir * escurece) }} />
      {linhas.map((l, idx) => {
        const cor = l.cor ?? colors.laranjaVivo;
        const atraso = interpolate(fr, [entra + idx * 4, entra + idx * 4 + 18], [0, 1], clamp);
        const pp = idx === 0 ? p : batida(atraso);
        return (
          <div
            key={l.texto}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: l.centroY - l.tamanho / 2,
              textAlign: "center",
              fontFamily: fontFamilies.display,
              fontSize: l.tamanho,
              lineHeight: entrelinha.titulo,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              color: cor,
              WebkitTextStroke: `${l.tamanho * engrossar.padrao}px ${cor}`,
              paintOrder: "stroke fill",
              opacity: pp * sumir,
              transform: `translateY(${(1 - pp) * 120}px)`,
              textShadow: "0 6px 30px rgba(0,0,0,.4)",
            }}
          >
            {l.texto}
          </div>
        );
      })}
      <Img src={staticFile(`${pessoa}/${n}.png`)} style={{ position: "absolute", left: "50%", top: 0, height: 1920, width: 1920 * proporcao, transform: "translateX(-50%)" }} />
    </AbsoluteFill>
  );
};
