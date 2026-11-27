import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import "../fonts";
import { colors, engrossar, entrelinha, fontFamilies } from "../tokens";
import { batida, clamp, firme } from "../movimento";
import { Faixa, Recorte } from "./Original";
import { Suave } from "./Pagina";

/**
 * FECHO do vídeo (etapa de vídeo do Arrasta Ilha). Fundo branco com grafismos suaves, faixas oficiais que deslizam,
 * a logo sobe com a "batida", o nome em Zenzero entra palavra por palavra e o chamado aparece em seguida.
 * Duração sugerida: 90 quadros a 30 fps. Textos por props (nunca ponto final).
 */
export const FechoLogo: React.FC<{ linha?: string; arroba?: string; chamada?: string }> = ({
  linha = "ensaio todo domingo · 15h",
  arroba = "@arrastailhaoficial",
  chamada = "bora arrastar com a gente",
}) => {
  const frame = useCurrentFrame();
  const faixa = firme(interpolate(frame, [0, 14], [0, 1], clamp));
  const logo = batida(interpolate(frame, [4, 24], [0, 1], clamp));
  const nome = (i: number) => batida(interpolate(frame, [22 + i * 4, 22 + i * 4 + 14], [0, 1], clamp));
  const resto = firme(interpolate(frame, [46, 62], [0, 1], clamp));
  return (
    <AbsoluteFill style={{ background: colors.branco }}>
      <Suave nome="elManchasPessegoAzul" largura={1000} style={{ right: 0, top: 330 }} opacidade={1} />
      <Suave nome="elFolhaLarga" altura={900} style={{ right: -40, bottom: 120 }} opacidade={0.1} />
      <Suave nome="elSolRespingo" largura={460} style={{ left: -100, top: 760 }} opacidade={0.16} />
      <Recorte
        nome="logoVertical"
        largura={640}
        style={{ left: 220, top: 250, opacity: logo, transform: `translateY(${(1 - logo) * 80}px) scale(${0.92 + 0.08 * logo})` }}
      />
      <div style={{ position: "absolute", left: 0, right: 0, top: 1100, textAlign: "center", display: "flex", justifyContent: "center", gap: 28 }}>
        {["Arrasta", "Ilha"].map((p, i) => (
          <div key={p} style={{ overflow: "hidden", padding: "0.2em 0.04em", margin: "-0.2em -0.04em" }}>
            <div
              style={{
                fontFamily: fontFamilies.display,
                fontSize: 160,
                lineHeight: entrelinha.titulo,
                color: colors.vinho,
                textTransform: "uppercase",
                WebkitTextStroke: `${160 * engrossar.padrao}px ${colors.vinho}`,
                paintOrder: "stroke fill",
                transform: `translateY(${(1 - nome(i)) * 1.7}em)`,
                visibility: nome(i) <= 0 ? "hidden" : "visible",
              }}
            >
              {p}
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1290, textAlign: "center", fontFamily: fontFamilies.pincel, fontSize: 62, color: colors.laranjaTexto, opacity: resto, transform: `translateY(${(1 - resto) * 20}px)` }}>{chamada}</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1380, textAlign: "center", fontFamily: fontFamilies.etiqueta, fontSize: 46, color: colors.marinho, opacity: resto }}>{arroba}</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1450, textAlign: "center", fontFamily: fontFamilies.texto, fontWeight: 700, fontSize: 38, color: colors.tintaTexto, opacity: resto }}>{linha}</div>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, transform: `translateY(${(faixa - 1) * 90}px)` }}>
        <Faixa nome="ofTriangulos" w={1080} alt={56} />
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, transform: `translateY(${(1 - faixa) * 90}px)` }}>
        <Faixa nome="ofDancarinos" w={1080} alt={72} />
      </div>
    </AbsoluteFill>
  );
};
