import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../fonts";
import { colors, engrossar, fontFamilies } from "../tokens";
import { Faixa, Recorte } from "./Original";
import { Suave } from "./Pagina";

// MODELO REUTILIZÁVEL: post de aniversário / homenagem (nasceu do post "22/11 Parabéns Regente Karen").
// Troque só os campos (props). Guia: design-systems/arrasta-ilha/docs/modelo-aniversario.md

export type AniversarioProps = {
  /** Abertura em pincel, acima do título. */
  saudacao?: string;
  /** Primeira linha (vinho). Ex.: "Regente". */
  titulo?: string;
  /** Segunda linha (laranja), normalmente o nome. Ex.: "Karen". */
  nome?: string;
  /** Texto da etiqueta de data. Ex.: "22 de novembro". */
  data?: string;
  /** Mensagem curta, uma ou duas frases. */
  mensagem?: string;
  /** Foto: caminho dentro de public/ (ex.: "arrasta/karen.jpg"), URL completa, ou um import. Vazio = espaço marcado. */
  foto?: string;
  /** Enquadramento da foto dentro do retângulo (CSS object-position). */
  enquadramento?: string;
  stories?: boolean;
};

export const aniversarioPadrao: Required<Omit<AniversarioProps, "foto">> & { foto: string } = {
  saudacao: "parabéns",
  titulo: "Cargo ou título",
  nome: "Nome",
  data: "00 de mês",
  mensagem: "A Família Arrasta Ilha lhe deseja [mensagem curta].",
  foto: "",
  enquadramento: "50% 30%",
  stories: false,
};

const CH = 0.435; // largura média de uma letra da Zenzero, em em
const T: React.FC<{ tam: number; cor?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ tam, cor = colors.vinho, children, style }) => (
  <div style={{ fontFamily: fontFamilies.display, fontSize: tam, lineHeight: 0.88, color: cor, textTransform: "uppercase", whiteSpace: "nowrap", WebkitTextStroke: `${tam * engrossar.padrao}px ${cor}`, paintOrder: "stroke fill", ...style }}>{children}</div>
);
/** Tamanho que cabe na largura útil (960 px), sem passar do tamanho de referência. */
const cabe = (texto: string, base: number) => Math.min(base, Math.floor(960 / (Math.max(texto.length, 1) * CH)));
const urlFoto = (f: string) => (/^(https?:|data:|blob:|\/)/.test(f) ? f : staticFile(f));

export const ModeloAniversario: React.FC<AniversarioProps> = (props) => {
  const p = { ...aniversarioPadrao, ...props };
  const stories = p.stories;
  const fw = stories ? 620 : 520;
  const fh = (fw * 1512) / 1131;
  const s1 = cabe(p.titulo, stories ? 270 : 220);
  const s2 = cabe(p.nome, stories ? 360 : 300);
  const top1 = 176;
  const t2 = top1 + Math.round(0.79 * s1); // mesma distância entre linhas em qualquer tamanho
  const base2 = stories ? 390 : 350;
  const fotoTop = (stories ? 750 : 590) + (t2 - base2);
  const H = stories ? 1920 : 1350;
  return (
    <AbsoluteFill style={{ background: colors.branco }}>
      <Suave nome="elFolhaLarga" altura={H * 0.5} style={{ left: -30, top: stories ? 760 : 520 }} opacidade={0.1} />
      <Suave nome="elSolRespingo" largura={380} style={{ right: -70, top: 70 }} opacidade={0.2} />
      <div style={{ position: "absolute", left: 66, top: 112, fontFamily: fontFamilies.pincel, fontSize: 64, color: colors.laranjaTexto }}>{p.saudacao}</div>
      <T tam={s1} style={{ position: "absolute", left: 60, top: top1 }}>{p.titulo}</T>
      <T tam={s2} cor={colors.laranjaTexto} style={{ position: "absolute", left: 56, top: t2 }}>{p.nome}</T>
      {/* bloco de cor atrás da foto, deslocado: profundidade sem moldura branca */}
      <div style={{ position: "absolute", right: 0, top: fotoTop + 26, width: fw - 6, height: fh, background: colors.marinho, transform: "translateX(-34px)" }} />
      {p.foto ? (
        <Img src={urlFoto(p.foto)} style={{ position: "absolute", right: 0, top: fotoTop, width: fw, height: fh, objectFit: "cover", objectPosition: p.enquadramento }} />
      ) : (
        <div style={{ position: "absolute", right: 0, top: fotoTop, width: fw, height: fh, background: `repeating-linear-gradient(135deg, ${colors.areia} 0 22px, #ecd9c8 22px 44px)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fontFamilies.etiqueta, fontSize: 40, color: "#8a6a55" }}>FOTO</div>
      )}
      <div style={{ position: "absolute", left: 66, top: fotoTop + 10, fontFamily: fontFamilies.etiqueta, fontSize: 34, color: colors.creme, background: colors.verde, padding: "8px 24px", borderRadius: 999, textTransform: "uppercase" }}>{p.data}</div>
      <div style={{ position: "absolute", left: 66, top: fotoTop + 100, width: stories ? 330 : 340, fontFamily: fontFamilies.texto, fontSize: stories ? 38 : 36, lineHeight: 1.3, color: colors.tintaTexto }}>{p.mensagem}</div>
      <Recorte nome="logoVertical" largura={stories ? 260 : 220} style={{ left: 60, bottom: stories ? 160 : 120 }} />
      <Faixa nome="ofTriangulos" w={1080} alt={56} style={{ position: "absolute", top: 0 }} />
      <Faixa nome="ofIcones" w={1080} alt={84} style={{ position: "absolute", bottom: 0 }} />
    </AbsoluteFill>
  );
};
