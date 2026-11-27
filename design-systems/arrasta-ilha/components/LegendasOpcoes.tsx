import React from "react";
import { AbsoluteFill, Img } from "remotion";
import "../fonts";
import fotoQuadro from "../assets/aplicacoes/domingueira-foto.jpg";
import { colors, engrossar, entrelinha, fontFamilies } from "../tokens";

// ETAPA DE VÍDEO, LEGENDAS: 4 opções em imagem para o dono escolher (frame 9:16 com a foto do grupo como fundo de exemplo).
// Frase de exemplo, na voz do grupo e SEM ponto final: "Todo domingo tem maracatu na UFSC" (palavra falada: "maracatu").

type Op = "A" | "B" | "C" | "D" | "E" | "F";
const base = (tam: number, cor: string, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: fontFamilies.display,
  fontSize: tam,
  lineHeight: entrelinha.titulo,
  color: cor,
  textTransform: "uppercase",
  ...extra,
});
const contorno = (tam: number, cor: string): React.CSSProperties => ({ WebkitTextStroke: `${tam * engrossar.padrao}px ${cor}`, paintOrder: "stroke fill" });

const Fundo: React.FC<{ escuro?: number }> = ({ escuro = 0.25 }) => (
  <AbsoluteFill style={{ background: "#0b1220" }}>
    <Img src={fotoQuadro} style={{ position: "absolute", left: -300, top: 0, width: 2300 * 0.84, height: 1920, objectFit: "cover", objectPosition: "42% 50%" }} />
    <AbsoluteFill style={{ background: `linear-gradient(to bottom, rgba(0,0,0,${escuro * 0.5}) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,${escuro * 1.6}) 100%)` }} />
  </AbsoluteFill>
);

/** Posição: acima dos ~24% de baixo (interface do Reels/Shorts), centralizada. */
const Zona: React.FC<{ children: React.ReactNode; top?: number }> = ({ children, top = 1180 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top, textAlign: "center" }}>{children}</div>
);

/** A: Zenzero branca com contorno fino escuro; a palavra falada em laranja. É a leitura mais limpa. */
const A: React.FC = () => (
  <Zona>
    <div style={{ ...base(112, "#ffffff"), ...contorno(112, "#ffffff"), textShadow: "0 3px 16px rgba(0,0,0,.55)" }}>Todo domingo tem</div>
    <div style={{ ...base(150, colors.laranja), ...contorno(150, colors.laranja), textShadow: "0 4px 18px rgba(0,0,0,.55)", marginTop: 0 }}>maracatu</div>
    <div style={{ ...base(112, "#ffffff"), ...contorno(112, "#ffffff"), textShadow: "0 3px 16px rgba(0,0,0,.55)", marginTop: 0 }}>na UFSC</div>
  </Zona>
);

/** B: pílula azul-marinho com a frase em creme; a palavra falada em laranja. Funciona em qualquer imagem. */
const B: React.FC = () => (
  <Zona top={1240}>
    <div style={{ display: "inline-block", background: colors.marinho, borderRadius: 54, padding: "26px 52px", boxShadow: "0 10px 30px rgba(0,0,0,.4)" }}>
      <div style={{ ...base(88, colors.creme), ...contorno(88, colors.creme) }}>Todo domingo tem</div>
      <div style={{ ...base(118, colors.laranja), ...contorno(118, colors.laranja), marginTop: 6 }}>maracatu na UFSC</div>
    </div>
  </Zona>
);

/** C: frase de efeito. Palavra-chave gigante em laranja, o resto pequeno em Carlito; fundo mais escuro. */
const C: React.FC = () => (
  <Zona top={1060}>
    <div style={{ fontFamily: fontFamilies.texto, fontWeight: 700, fontSize: 58, color: "#ffffff", textShadow: "0 3px 14px rgba(0,0,0,.6)" }}>todo domingo tem</div>
    <div style={{ ...base(236, colors.laranja), ...contorno(236, colors.laranja), lineHeight: entrelinha.titulo, marginTop: -4, textShadow: "0 6px 26px rgba(0,0,0,.55)" }}>maracatu</div>
    <div style={{ fontFamily: fontFamilies.texto, fontWeight: 700, fontSize: 58, color: "#ffffff", textShadow: "0 3px 14px rgba(0,0,0,.6)", marginTop: 0 }}>na UFSC</div>
  </Zona>
);

/** D: pincel (Kaushan), a letra manual do nome do grupo; a palavra falada em pêssego. */
const D: React.FC = () => (
  <Zona top={1200}>
    <div style={{ fontFamily: fontFamilies.pincel, fontSize: 118, lineHeight: entrelinha.pincel, color: colors.creme, textShadow: "0 4px 18px rgba(0,0,0,.65)" }}>
      todo domingo tem
    </div>
    <div style={{ fontFamily: fontFamilies.pincel, fontSize: 168, lineHeight: entrelinha.pincel, color: "#f6b47c", textShadow: "0 5px 22px rgba(0,0,0,.65)" }}>maracatu</div>
    <div style={{ fontFamily: fontFamilies.pincel, fontSize: 118, lineHeight: entrelinha.pincel, color: colors.creme, textShadow: "0 4px 18px rgba(0,0,0,.65)" }}>na UFSC</div>
  </Zona>
);

/** E: como a D (pincel nas frases), mas a palavra falada em Zenzero, a fonte principal, em pêssego. */
const E: React.FC = () => (
  <Zona top={1170}>
    <div style={{ fontFamily: fontFamilies.pincel, fontSize: 118, lineHeight: entrelinha.pincel, color: colors.creme, textShadow: "0 4px 18px rgba(0,0,0,.65)" }}>todo domingo tem</div>
    <div style={{ ...base(190, "#f6b47c"), ...contorno(190, "#f6b47c"), lineHeight: entrelinha.titulo, textShadow: "0 5px 22px rgba(0,0,0,.65)", marginTop: 0 }}>maracatu</div>
    <div style={{ fontFamily: fontFamilies.pincel, fontSize: 118, lineHeight: entrelinha.pincel, color: colors.creme, textShadow: "0 4px 18px rgba(0,0,0,.65)", marginTop: 0 }}>na UFSC</div>
  </Zona>
);

/** F (escolha do dono: mistura de A e C): tudo em Zenzero. "todo domingo tem" grande e branco (como na A), "maracatu" gigante em laranja
 *  (como na C) e "na UFSC" também em laranja, na mesma fonte e no mesmo contorno. Entrelinha curta. */
const F: React.FC = () => (
  <Zona top={1010}>
    <div style={{ ...base(128, "#ffffff"), ...contorno(128, "#ffffff"), textShadow: "0 3px 16px rgba(0,0,0,.6)" }}>Todo domingo tem</div>
    <div style={{ ...base(236, colors.laranja), ...contorno(236, colors.laranja), textShadow: "0 6px 26px rgba(0,0,0,.55)", marginTop: -6 }}>maracatu</div>
    <div style={{ ...base(128, colors.laranja), ...contorno(128, colors.laranja), textShadow: "0 3px 16px rgba(0,0,0,.6)", marginTop: -4 }}>na UFSC</div>
  </Zona>
);

export const LegendaOpcao: React.FC<{ opcao: Op }> = ({ opcao }) => (
  <AbsoluteFill>
    <Fundo escuro={opcao === "C" || opcao === "F" ? 0.9 : 0.5} />
    {opcao === "A" && <A />}
    {opcao === "B" && <B />}
    {opcao === "C" && <C />}
    {opcao === "D" && <D />}
    {opcao === "E" && <E />}
    {opcao === "F" && <F />}
  </AbsoluteFill>
);
