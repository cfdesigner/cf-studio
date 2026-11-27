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

export const PostDomingueira: React.FC<{ cor?: "marinho" | "verde" }> = ({ cor = "marinho" }) => {
  const az = cor === "marinho";
  const fundo = az ? colors.marinho : colors.verde;
  const destaque = az ? colors.laranja : "#f6b47c";
  const pillFundo = az ? colors.laranja : colors.creme;
  const pillTexto = az ? colors.noite : colors.vinho;
  const claro = colors.creme;
  const W = 1080;
  const creditos: { rotulo: string; texto?: string }[] = [
    { rotulo: "Produção" },
    { rotulo: "Realização" },
    { rotulo: "Apoio", texto: "Prefeitura de Florianópolis" },
    { rotulo: "Acessível em Libras" },
  ];
  return (
    <AbsoluteFill style={{ background: fundo }}>
      <Suave nome="elSolRespingo" largura={520} style={{ right: -120, top: 40 }} opacidade={0.18} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 92, textAlign: "center", fontFamily: fontFamilies.pincel, fontSize: 58, color: claro }}>maracatu arrasta ilha convida</div>
      <T tam={184} cor={destaque} style={{ position: "absolute", left: 0, right: 0, textAlign: "center", top: 160 }}>Domingueira</T>
      <div style={{ position: "absolute", left: 0, right: 0, top: 340, display: "flex", justifyContent: "center" }}>
        <div style={{ background: pillFundo, color: pillTexto, fontFamily: fontFamilies.display, fontSize: 52, lineHeight: 1, textTransform: "uppercase", padding: "14px 40px", borderRadius: 999, WebkitTextStroke: `${52 * engrossar.padrao}px ${pillTexto}`, paintOrder: "stroke fill" }}>Blocos Afros Floripa</div>
      </div>
      <Img src={fotoDomingueira} style={{ position: "absolute", left: 0, top: 440, width: W, height: 450, objectFit: "cover", objectPosition: "50% 0%" }} />
      <T tam={124} cor={claro} style={{ position: "absolute", left: 0, right: 0, textAlign: "center", top: 908 }}>29 de novembro</T>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1028, textAlign: "center", fontFamily: fontFamilies.texto, fontWeight: 700, fontSize: 40, color: claro }}>a partir das 14h · Pista de Skate da Costeira</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1088, display: "flex", justifyContent: "center" }}>
        <div style={{ background: az ? colors.verde : colors.marinho, color: claro, fontFamily: fontFamilies.etiqueta, fontSize: 36, padding: "8px 34px", borderRadius: 999 }}>ANCESTRALIDADE · AFETO · RESISTÊNCIA</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1154, textAlign: "center", fontFamily: fontFamilies.texto, fontWeight: 700, fontSize: 34, color: destaque }}>Entrada gratuita | Toda a comunidade convidada!</div>
      {/* créditos: o print do cartaz original corta os logos; as vagas marcadas esperam os arquivos */}
      <div style={{ position: "absolute", left: 60, right: 60, top: 1204, display: "flex", justifyContent: "space-between" }}>
        {creditos.map((c) => (
          <div key={c.rotulo} style={{ width: 230, textAlign: "center" }}>
            <div style={{ fontFamily: fontFamilies.texto, fontWeight: 700, fontSize: 22, color: destaque }}>{c.rotulo}:</div>
            {c.texto ? (
              <div style={{ fontFamily: fontFamilies.texto, fontWeight: 700, fontSize: 22, lineHeight: 1.1, color: claro, marginTop: 8 }}>{c.texto}</div>
            ) : (
              <div style={{ marginTop: 6, height: 36, border: `2px dashed ${claro}`, opacity: 0.6, borderRadius: 8, fontFamily: fontFamilies.texto, fontSize: 18, color: claro, display: "flex", alignItems: "center", justifyContent: "center" }}>[logo]</div>
            )}
          </div>
        ))}
      </div>
      <Faixa nome={az ? "ofTriangulos" : "ofDancarinos"} w={W} alt={az ? 56 : 72} style={{ position: "absolute", top: 0 }} />
      <Faixa nome={az ? "ofHexagonos" : "ofDancarinos"} w={W} alt={az ? 44 : 60} style={{ position: "absolute", bottom: 0 }} />
    </AbsoluteFill>
  );
};
