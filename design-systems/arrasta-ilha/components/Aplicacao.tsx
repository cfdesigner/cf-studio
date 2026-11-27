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

// ---------------------------------------------------------------------------------------------
// APLICAÇÃO: "Vem vadiá! Carnaval 2027 · 25 anos", escolha de camiseta (refeita de um post atual do grupo).
// As camisetas são recortes do print do post (baixa resolução): trocar pelos arquivos originais.
import camCatirinas from "../assets/aplicacoes/camiseta-catirinas.png";
import camEstandarte from "../assets/aplicacoes/camiseta-estandarte.png";
import camBatuqueiros from "../assets/aplicacoes/camiseta-batuqueiros.png";
import camCorteReal from "../assets/aplicacoes/camiseta-corte-real.png";

const modelosCamiseta = [
  { nome: "Catirinas", src: camCatirinas, w: 581, h: 489 },
  { nome: "Estandarte", src: camEstandarte, w: 562, h: 497 },
  { nome: "Batuqueiros", src: camBatuqueiros, w: 578, h: 444 },
  { nome: "Corte Real", src: camCorteReal, w: 580, h: 501 },
];

/** Nomes ao lado, como no original: o rótulo ocupa o canto vazio embaixo à direita de cada par (frente + costas). */
export const PostCamisetas: React.FC<{ stories?: boolean }> = ({ stories = false }) => {
  const H = stories ? 1920 : 1350;
  const larg = stories ? 480 : 440;
  const colX = stories ? [40, 560] : [50, 560];
  const rowY = stories ? [930, 1390] : [480, 890];
  return (
    <AbsoluteFill style={{ background: colors.branco }}>
      <Suave nome="elFolhaLarga" altura={H * 0.66} style={{ right: -50, top: stories ? 520 : 380 }} opacidade={0.09} />
      <Suave nome="elSolRespingo" largura={stories ? 560 : 420} style={{ right: -90, top: stories ? 130 : 70 }} opacidade={0.16} />
      <Suave nome="elFolhaLarga" altura={H * 0.5} style={{ left: -60, top: stories ? 900 : 640 }} opacidade={0.06} />
      {stories ? (
        <>
          <Recorte nome="logoVertical" largura={330} style={{ left: 375, top: 110 }} />
          <div style={{ position: "absolute", left: 0, right: 0, textAlign: "center", top: 490, fontFamily: fontFamilies.pincel, fontSize: 72, color: colors.laranjaTexto }}>vem vadiá!</div>
          <T tam={150} style={{ position: "absolute", left: 0, right: 0, textAlign: "center", top: 580 }}>Carnaval 2027</T>
          <T tam={150} cor={colors.laranjaTexto} style={{ position: "absolute", left: 0, right: 0, textAlign: "center", top: 700 }}>25 anos</T>
          <div style={{ position: "absolute", left: 0, right: 0, textAlign: "center", top: 850, fontFamily: fontFamilies.texto, fontSize: 44, color: colors.tintaTexto }}>Conheça os 4 modelos de camisetas e escolha a sua:</div>
        </>
      ) : (
        <>
          <Recorte nome="logoVertical" largura={210} style={{ left: 60, top: 100 }} />
          <div style={{ position: "absolute", left: 304, top: 104, fontFamily: fontFamilies.pincel, fontSize: 58, color: colors.laranjaTexto }}>vem vadiá!</div>
          <T tam={116} style={{ position: "absolute", left: 300, top: 168 }}>Carnaval 2027</T>
          <T tam={116} cor={colors.laranjaTexto} style={{ position: "absolute", left: 300, top: 262 }}>25 anos</T>
          <div style={{ position: "absolute", left: 66, top: 396, width: 940, fontFamily: fontFamilies.texto, fontSize: 36, color: colors.tintaTexto }}>Conheça os 4 modelos de camisetas e escolha a sua:</div>
        </>
      )}
      {modelosCamiseta.map((m, i) => {
        const w = larg;
        const h = (w * m.h) / m.w;
        const x = colX[i % 2];
        const y = rowY[Math.floor(i / 2)];
        const lw = w * 0.4;
        const tam = Math.min(stories ? 54 : 48, Math.floor(lw / (m.nome.length * 0.45)));
        return (
          <React.Fragment key={m.nome}>
            <Img src={m.src} style={{ position: "absolute", left: x, top: y, width: w, height: h }} />
            <div style={{ position: "absolute", left: x + w * 0.62, top: y + h * 0.6, width: lw }}>
              <div style={{ fontFamily: fontFamilies.pincel, fontSize: stories ? 38 : 34, color: colors.laranjaTexto, lineHeight: 1 }}>modelo</div>
              <div style={{ fontFamily: fontFamilies.display, fontSize: tam, lineHeight: 1, marginTop: 6, color: colors.vinho, textTransform: "uppercase", whiteSpace: "nowrap", WebkitTextStroke: `${tam * engrossar.padrao}px ${colors.vinho}`, paintOrder: "stroke fill" }}>{m.nome}</div>
            </div>
          </React.Fragment>
        );
      })}
      <Faixa nome="ofDancarinos" w={1080} alt={72} style={{ position: "absolute", top: 0 }} />
      <Faixa nome="ofDancarinos" w={1080} alt={72} style={{ position: "absolute", bottom: 0 }} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------------------------
// APLICAÇÃO: cartaz de chamada de evento "Domingueira" (refeito de um cartaz atual do grupo), em duas cores.
// Foto: do grupo (arquivo do dono). Logos de produção, realização e apoio: pendentes (o print do cartaz original está cortado).
import fotoDomingueira from "../assets/aplicacoes/domingueira-foto.jpg";

import creditosDomingueira from "../assets/aplicacoes/creditos-domingueira.png";

/** variante "branco": fundo branco. variante "azul": fundo azul-marinho com todos os textos em branco. */
export const PostDomingueira: React.FC<{ variante?: "branco" | "azul" | "degrade" }> = ({ variante = "branco" }) => {
  const azul = variante === "azul";
  const deg = variante === "degrade";
  const W = 1080;
  const txt = azul ? "#ffffff" : colors.tintaTexto;
  const titulo = azul ? "#ffffff" : colors.vinho;
  const pincel = azul ? "#ffffff" : colors.laranjaTexto;
  const traco = azul ? "#ffffff" : colors.marinho;
  const stripW = 480;
  const stripH = (stripW * 88) / 453;
  return (
    <AbsoluteFill style={{ background: azul ? colors.marinho : colors.branco }}>
      <Suave nome="elSolRespingo" largura={560} style={{ right: -130, top: 40 }} opacidade={azul ? 0.2 : 0.2} />
      {!azul && <Suave nome="elFolhaLarga" altura={820} style={{ left: -50, top: 560 }} opacidade={0.07} />}
      <div style={{ position: "absolute", left: 0, right: 0, top: 92, textAlign: "center", fontFamily: fontFamilies.pincel, fontSize: 58, color: pincel }}>maracatu arrasta ilha convida</div>
      <T tam={184} cor={titulo} style={{ position: "absolute", left: 0, right: 0, textAlign: "center", top: 160 }}>Domingueira</T>
      <div style={{ position: "absolute", left: 0, right: 0, top: 340, display: "flex", justifyContent: "center" }}>
        <div style={{ border: `3px solid ${traco}`, color: traco, fontFamily: fontFamilies.display, fontSize: 52, lineHeight: 1, textTransform: "uppercase", padding: "12px 40px", borderRadius: 999, WebkitTextStroke: `${52 * engrossar.padrao}px ${traco}`, paintOrder: "stroke fill" }}>Blocos Afros Floripa</div>
      </div>
      {deg ? (
        // foto trabalhada: maior, com degradê que a dissolve no branco embaixo e nas laterais
        <div style={{ position: "absolute", left: 0, top: 440, width: W, height: 520, WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 76%, rgba(0,0,0,0.35) 88%, rgba(0,0,0,0) 100%)", maskImage: "linear-gradient(to bottom, #000 0%, #000 76%, rgba(0,0,0,0.35) 88%, rgba(0,0,0,0) 100%)" }}>
          <div style={{ position: "absolute", inset: 0, WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, #000 12%, #000 88%, rgba(0,0,0,0) 100%)", maskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, #000 12%, #000 88%, rgba(0,0,0,0) 100%)" }}>
            <Img src={fotoDomingueira} style={{ position: "absolute", left: 0, top: 0, width: W, height: 520, objectFit: "cover", objectPosition: "50% 0%" }} />
          </div>
        </div>
      ) : (
        <Img src={fotoDomingueira} style={{ position: "absolute", left: 0, top: 440, width: W, height: 440, objectFit: "cover", objectPosition: "50% 0%" }} />
      )}
      <T tam={124} cor={titulo} style={{ position: "absolute", left: 0, right: 0, textAlign: "center", top: deg ? 930 : 900 }}>29 de novembro</T>
      <div style={{ position: "absolute", left: 0, right: 0, top: deg ? 1048 : 1020, textAlign: "center", fontFamily: fontFamilies.texto, fontWeight: 700, fontSize: 40, color: txt }}>a partir das 14h · Pista de Skate da Costeira</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: deg ? 1104 : 1080, display: "flex", justifyContent: "center" }}>
        <div style={azul ? { border: "3px solid #ffffff", color: "#ffffff", fontFamily: fontFamilies.etiqueta, fontSize: 36, padding: "6px 32px", borderRadius: 999 } : { background: colors.verde, color: colors.creme, fontFamily: fontFamilies.etiqueta, fontSize: 36, padding: "8px 34px", borderRadius: 999 }}>ANCESTRALIDADE · AFETO · RESISTÊNCIA</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: deg ? 1158 : 1148, textAlign: "center", fontFamily: fontFamilies.texto, fontWeight: 700, fontSize: 34, color: azul ? "#ffffff" : colors.laranjaTexto }}>Entrada gratuita | Toda a comunidade convidada!</div>
      {azul && <div style={{ position: "absolute", left: 0, right: 0, top: 1196, height: 104, background: "#ffffff" }} />}
      <Img src={creditosDomingueira} style={{ position: "absolute", left: (W - stripW) / 2, top: azul ? 1196 + (104 - stripH) / 2 : deg ? 1198 : 1190, width: stripW, height: stripH }} />
      <Faixa nome={azul ? "ofTriangulos" : "ofDancarinos"} w={W} alt={azul ? 56 : 72} style={{ position: "absolute", top: 0 }} />
      <Faixa nome={azul ? "ofHexagonos" : "ofDancarinos"} w={W} alt={azul ? 50 : 60} style={{ position: "absolute", bottom: 0 }} />
    </AbsoluteFill>
  );
};

/** Domingueira em stories 9:16, versão com a foto em degradê. Textos importantes fora das faixas de interface do Instagram (topo e rodapé). */
export const PostDomingueiraStories: React.FC = () => {
  const W = 1080;
  const fotoH = 740;
  const fotoTop = 560;
  const stripW = 600;
  const stripH = (stripW * 88) / 453;
  const mask = "linear-gradient(to bottom, #000 0%, #000 76%, rgba(0,0,0,0.35) 88%, rgba(0,0,0,0) 100%)";
  const maskLado = "linear-gradient(to right, rgba(0,0,0,0) 0%, #000 12%, #000 88%, rgba(0,0,0,0) 100%)";
  return (
    <AbsoluteFill style={{ background: colors.branco }}>
      <Suave nome="elSolRespingo" largura={640} style={{ right: -150, top: 60 }} opacidade={0.2} />
      <Suave nome="elFolhaLarga" altura={900} style={{ left: -50, top: 1000 }} opacidade={0.07} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 180, textAlign: "center", fontFamily: fontFamilies.pincel, fontSize: 64, color: colors.laranjaTexto }}>maracatu arrasta ilha convida</div>
      <T tam={196} cor={colors.vinho} style={{ position: "absolute", left: 0, right: 0, textAlign: "center", top: 255 }}>Domingueira</T>
      <div style={{ position: "absolute", left: 0, right: 0, top: 450, display: "flex", justifyContent: "center" }}>
        <div style={{ border: `3px solid ${colors.marinho}`, color: colors.marinho, fontFamily: fontFamilies.display, fontSize: 56, lineHeight: 1, textTransform: "uppercase", padding: "13px 44px", borderRadius: 999, WebkitTextStroke: `${56 * engrossar.padrao}px ${colors.marinho}`, paintOrder: "stroke fill" }}>Blocos Afros Floripa</div>
      </div>
      <div style={{ position: "absolute", left: 0, top: fotoTop, width: W, height: fotoH, WebkitMaskImage: mask, maskImage: mask }}>
        <div style={{ position: "absolute", inset: 0, WebkitMaskImage: maskLado, maskImage: maskLado }}>
          <Img src={fotoDomingueira} style={{ position: "absolute", left: 0, top: 0, width: W, height: fotoH, objectFit: "cover", objectPosition: "50% 0%" }} />
        </div>
      </div>
      <T tam={132} cor={colors.vinho} style={{ position: "absolute", left: 0, right: 0, textAlign: "center", top: 1235 }}>29 de novembro</T>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1385, textAlign: "center", fontFamily: fontFamilies.texto, fontWeight: 700, fontSize: 44, color: colors.tintaTexto }}>a partir das 14h · Pista de Skate da Costeira</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1452, display: "flex", justifyContent: "center" }}>
        <div style={{ background: colors.verde, color: colors.creme, fontFamily: fontFamilies.etiqueta, fontSize: 40, padding: "8px 38px", borderRadius: 999 }}>ANCESTRALIDADE · AFETO · RESISTÊNCIA</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1528, textAlign: "center", fontFamily: fontFamilies.texto, fontWeight: 700, fontSize: 38, color: colors.laranjaTexto }}>Entrada gratuita | Toda a comunidade convidada!</div>
      <Img src={creditosDomingueira} style={{ position: "absolute", left: (W - stripW) / 2, top: 1585, width: stripW, height: stripH }} />
      <Faixa nome="ofDancarinos" w={W} alt={72} style={{ position: "absolute", top: 0 }} />
      <Faixa nome="ofDancarinos" w={W} alt={72} style={{ position: "absolute", bottom: 0 }} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------------------------
// APLICAÇÕES DO DIA A DIA: ensaio e oficina (com foto) e aviso de programação. Refeitas de dois posts atuais do grupo.
import fotoEnsaioOficina from "../assets/aplicacoes/ensaio-oficina-foto.png";

export type EnsaioProps = {
  titulo?: string; // "Ensaio"
  subtitulo?: string; // "Maracatu Arrasta Ilha"
  destaque?: string; // "e oficina para iniciantes"
  nota?: string; // "(continuação)"
  data?: string; // "Domingo 30/08 | 15h00"
  linha?: string; // "ensaios e oficinas semanais"
  local?: string; // "Espaço Aruanda (em frente ao lago) | UFSC"
  foto?: string;
};

export const ModeloEnsaio: React.FC<EnsaioProps> = ({
  titulo = "Ensaio",
  subtitulo = "Maracatu Arrasta Ilha",
  destaque = "e oficina para iniciantes",
  nota = "(continuação)",
  data = "Domingo 30/08 | 15h00",
  linha = "ensaios e oficinas semanais",
  local = "Espaço Aruanda (em frente ao lago) | UFSC",
  foto,
}) => {
  const src = foto ?? fotoEnsaioOficina;
  const fw = 960;
  const fh = 470;
  return (
    <AbsoluteFill style={{ background: colors.branco }}>
      <Suave nome="elFolhaLarga" altura={760} style={{ right: -40, top: 330 }} opacidade={0.08} />
      <Suave nome="elSolRespingo" largura={380} style={{ right: -80, top: 60 }} opacidade={0.18} />
      <Faixa nome="ofTriangulos" w={1080} alt={56} style={{ position: "absolute", top: 0 }} />
      <Recorte nome="logoVertical" largura={190} style={{ right: 60, top: 90 }} />
      <T tam={190} style={{ position: "absolute", left: 60, top: 95 }}>{titulo}</T>
      <T tam={78} cor={colors.laranjaTexto} style={{ position: "absolute", left: 60, top: 280 }}>{subtitulo}</T>
      <div style={{ position: "absolute", left: 66, top: 378, fontFamily: fontFamilies.pincel, fontSize: 56, color: colors.marinho }}>{destaque}</div>
      <div style={{ position: "absolute", left: 66, top: 462, fontFamily: fontFamilies.texto, fontSize: 32, color: "#6a564c" }}>{nota}</div>
      <div style={{ position: "absolute", left: 60 + 28, top: 530 + 26, width: fw - 28, height: fh, background: colors.marinho }} />
      <Img src={src} style={{ position: "absolute", left: 60, top: 530, width: fw - 28, height: fh, objectFit: "cover", objectPosition: "50% 35%" }} />
      <div style={{ position: "absolute", left: 66, top: 1050, fontFamily: fontFamilies.display, fontSize: 80, lineHeight: 1, color: colors.vinho, textTransform: "uppercase", WebkitTextStroke: `${80 * engrossar.padrao}px ${colors.vinho}`, paintOrder: "stroke fill" }}>{data}</div>
      <div style={{ position: "absolute", left: 66, top: 1150, fontFamily: fontFamilies.pincel, fontSize: 40, color: colors.laranjaTexto }}>{linha}</div>
      <div style={{ position: "absolute", left: 66, top: 1205, fontFamily: fontFamilies.texto, fontWeight: 700, fontSize: 36, color: colors.tintaTexto }}>{local}</div>
      <Faixa nome="ofHexagonos" w={1080} alt={44} style={{ position: "absolute", bottom: 0 }} />
    </AbsoluteFill>
  );
};

export type AvisoProps = { titulo?: string; subtitulo?: string; data?: string; mensagem?: string; detalhe?: string };

/** Aviso de programação (ex.: "não haverá ensaio"). Sem foto: título grande, logo e mensagem em destaque. */
export const ModeloProgramacao: React.FC<AvisoProps> = ({
  titulo = "Programação",
  subtitulo = "Maracatu Arrasta Ilha",
  data = "Domingo: 11/10",
  mensagem = "Não haverá | ensaio na UFSC",
  detalhe = "",
}) => (
  <AbsoluteFill style={{ background: colors.branco }}>
    <Suave nome="elFolhaLarga" altura={900} style={{ left: -60, top: 400 }} opacidade={0.09} />
    <Suave nome="elSolRespingo" largura={560} style={{ right: -110, top: 480 }} opacidade={0.16} />
    <Faixa nome="ofTriangulos" w={1080} alt={56} style={{ position: "absolute", top: 0 }} />
    <Recorte nome="logoVertical" largura={200} style={{ right: 60, top: 90 }} />
    <T tam={128} style={{ position: "absolute", left: 60, top: 125 }}>{titulo}</T>
    <div style={{ position: "absolute", left: 66, top: 262, fontFamily: fontFamilies.pincel, fontSize: 64, color: colors.laranjaTexto }}>{subtitulo}</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 560, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 26 }}>
      <div style={{ background: colors.verde, color: colors.creme, fontFamily: fontFamilies.etiqueta, fontSize: 60, padding: "10px 40px", borderRadius: 999 }}>{data.toUpperCase()}</div>
      <div>{mensagem.split("|").map((l, i) => (<T key={i} tam={150} cor={colors.marinho} style={{ marginBottom: 8 }}>{l.trim()}</T>))}</div>
      {detalhe ? <div style={{ fontFamily: fontFamilies.texto, fontSize: 42, color: colors.tintaTexto, maxWidth: 800 }}>{detalhe}</div> : null}
    </div>
    <Faixa nome="ofDancarinos" w={1080} alt={72} style={{ position: "absolute", bottom: 0 }} />
  </AbsoluteFill>
);
