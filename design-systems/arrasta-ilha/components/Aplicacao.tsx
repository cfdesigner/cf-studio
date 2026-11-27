import React from "react";
import { AbsoluteFill, Img } from "remotion";
import "../fonts";
import fotoKaren from "../assets/aplicacoes/regente-karen.png";
import { colors, engrossar, fontFamilies } from "../tokens";
import { Faixa, Recorte } from "./Original";
import { Suave } from "./Pagina";

// APLICAÇÃO REAL: post de aniversário (primeira peça refeita a partir de um post atual do grupo, 22/11).
// Foto: recorte do print do post original, baixa resolução; trocar pelo arquivo original.

const T: React.FC<{ tam: number; cor?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ tam, cor = colors.vinho, children, style }) => (
  <div style={{ fontFamily: fontFamilies.display, fontSize: tam, lineHeight: 0.88, color: cor, textTransform: "uppercase", WebkitTextStroke: `${tam * engrossar.padrao}px ${cor}`, paintOrder: "stroke fill", ...style }}>{children}</div>
);

export const PostAniversario: React.FC<{ stories?: boolean }> = ({ stories = false }) => {
  const H = stories ? 1920 : 1350;
  const fw = stories ? 620 : 520;
  const fh = (fw * 1512) / 1131;
  const fotoTop = stories ? 750 : 590;
  return (
    <AbsoluteFill style={{ background: colors.branco }}>
      <Suave nome="elFolhaLarga" altura={H * 0.5} style={{ left: -30, top: stories ? 760 : 520 }} opacidade={0.1} />
      <Suave nome="elSolRespingo" largura={380} style={{ right: -70, top: 70 }} opacidade={0.2} />
      <div style={{ position: "absolute", left: 66, top: 112, fontFamily: fontFamilies.pincel, fontSize: 64, color: colors.laranjaTexto }}>parabéns</div>
      <T tam={stories ? 270 : 220} style={{ position: "absolute", left: 60, top: 176 }}>Regente</T>
      <T tam={stories ? 360 : 300} cor={colors.laranjaTexto} style={{ position: "absolute", left: 56, top: stories ? 390 : 350 }}>Karen</T>
      {/* bloco de cor atrás da foto, deslocado: profundidade sem moldura branca */}
      <div style={{ position: "absolute", right: 0, top: fotoTop + 26, width: fw - 6, height: fh, background: colors.marinho, transform: "translateX(-34px)" }} />
      <Img src={fotoKaren} style={{ position: "absolute", right: 0, top: fotoTop, width: fw, height: fh, objectFit: "cover" }} />
      <div style={{ position: "absolute", left: 66, top: fotoTop + 10, fontFamily: fontFamilies.etiqueta, fontSize: 34, color: colors.creme, background: colors.verde, padding: "8px 24px", borderRadius: 999 }}>22 DE NOVEMBRO</div>
      <div style={{ position: "absolute", left: 66, top: fotoTop + 100, width: stories ? 330 : 340, fontFamily: fontFamilies.texto, fontSize: stories ? 38 : 36, lineHeight: 1.3, color: colors.tintaTexto }}>
        A Família Arrasta Ilha lhe deseja um vendaval de axé para o novo ciclo!
      </div>
      <Recorte nome="logoVertical" largura={stories ? 260 : 220} style={{ left: 60, bottom: stories ? 160 : 120 }} />
      <Faixa nome="ofTriangulos" w={1080} alt={56} style={{ position: "absolute", top: 0 }} />
      <Faixa nome="ofIcones" w={1080} alt={84} style={{ position: "absolute", bottom: 0 }} />
    </AbsoluteFill>
  );
};
