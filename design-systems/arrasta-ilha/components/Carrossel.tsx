import React from "react";
import { AbsoluteFill } from "remotion";
import "../fonts";
import type { ElementoNome } from "../assets";
import { colors, engrossar, fontFamilies } from "../tokens";
import { Faixa, Recorte } from "./Original";
import { Suave } from "./Pagina";

// CARROSSEL "DIAGRAMAÇÃO DE IMPACTO": só a diagramação vem da referência do dono (título enorme e apertado, frase curta em pincel
// como abertura, palavra gigante fantasma atrás, personagem recortado sobrepondo o título, textos pequenos nos cantos, etiquetas).
// Todo o resto é do design system do Arrasta Ilha. Textos de exemplo.

const W = 1080;

const T: React.FC<{ tam: number; cor?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ tam, cor = colors.vinho, children, style }) => (
  <div style={{ fontFamily: fontFamilies.display, fontSize: tam, lineHeight: 0.88, color: cor, textTransform: "uppercase", WebkitTextStroke: `${tam * engrossar.padrao}px ${cor}`, paintOrder: "stroke fill", ...style }}>{children}</div>
);
/** Frase curta em pincel, como a abertura em itálico da referência. */
const Pincel: React.FC<{ cor: string; tam?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ cor, tam = 62, children, style }) => (
  <div style={{ fontFamily: fontFamilies.pincel, fontSize: tam, color: cor, lineHeight: 1, ...style }}>{children}</div>
);
/** Palavra gigante fantasma atrás de tudo. */
const Fantasma: React.FC<{ texto: string; cor: string; tam: number; style: React.CSSProperties }> = ({ texto, cor, tam, style }) => (
  <div style={{ position: "absolute", fontFamily: fontFamilies.display, fontSize: tam, lineHeight: 0.85, color: cor, textTransform: "uppercase", whiteSpace: "nowrap", ...style }}>{texto}</div>
);
const Apoio: React.FC<{ cor: string; tam?: number; children: React.ReactNode; style: React.CSSProperties }> = ({ cor, tam = 32, children, style }) => (
  <div style={{ position: "absolute", fontFamily: fontFamilies.texto, fontSize: tam, lineHeight: 1.32, color: cor, ...style }}>{children}</div>
);
const Etiqueta: React.FC<{ fundo: string; cor: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ fundo, cor, children, style }) => (
  <div style={{ position: "absolute", background: fundo, color: cor, fontFamily: fontFamilies.etiqueta, fontSize: 30, padding: "8px 22px", borderRadius: 999, ...style }}>{children}</div>
);
const Rodape: React.FC<{ escuro?: boolean; n: string; arrobaDireita?: boolean }> = ({ escuro, n, arrobaDireita }) => (
  <>
    <div style={{ position: "absolute", [arrobaDireita ? "right" : "left"]: arrobaDireita ? 60 : 60, bottom: 82, fontFamily: fontFamilies.etiqueta, fontSize: 26, color: escuro ? colors.creme : colors.vinho }}>@ARRASTAILHAOFICIAL</div>
    {!arrobaDireita && <div style={{ position: "absolute", right: 60, bottom: 82, fontFamily: fontFamilies.etiqueta, fontSize: 26, color: escuro ? colors.creme : colors.vinho }}>{n} / 6</div>}
  </>
);
const Quadro: React.FC<{ fundo: string; topo: "ofTriangulos" | "ofHexagonos" | "ofAxeBuzios" | "ofArmas" | "ofIcones" | "ofMaracatu"; base: "ofHexagonos" | "ofTriangulos" | "ofArmas" | "ofDancarinos"; children: React.ReactNode }> = ({ fundo, topo, base, children }) => (
  <AbsoluteFill style={{ background: fundo }}>
    {children}
    <Faixa nome={topo} w={W} alt={topo === "ofIcones" ? 84 : topo === "ofMaracatu" ? 44 : 56} style={{ position: "absolute", top: 0 }} />
    <Faixa nome={base} w={W} alt={base === "ofDancarinos" ? 72 : 50} style={{ position: "absolute", bottom: 0 }} />
  </AbsoluteFill>
);
const G: React.FC<{ nome: ElementoNome; largura?: number; altura?: number; op: number; style: React.CSSProperties }> = (p) => <Suave nome={p.nome} largura={p.largura} altura={p.altura} opacidade={p.op} style={p.style} />;

/** 1, capa: título enorme, personagem sobrepõe a palavra, abertura em pincel. Marinho. */
export const CarrosselCapa: React.FC = () => (
  <Quadro fundo={colors.marinho} topo="ofTriangulos" base="ofHexagonos">
    <Fantasma texto="Baque" cor="#1c4a7c" tam={520} style={{ left: -30, top: 560 }} />
    <G nome="elArcosAzuis" largura={560} op={0.5} style={{ right: -60, top: 90 }} />
    <G nome="elPontosPessego" largura={300} op={0.9} style={{ left: 50, bottom: 150 }} />
    <Pincel cor={colors.creme} style={{ position: "absolute", left: 66, top: 130 }}>ensaio aberto</Pincel>
    <T tam={300} cor={colors.creme} style={{ position: "absolute", left: 60, top: 200 }}>Domingo</T>
    <T tam={104} cor={colors.laranja} style={{ position: "absolute", left: 66, top: 480 }}>tem maracatu</T>
    <Recorte nome="fotoMulherBandeira" altura={1000} style={{ right: 20, top: 330 }} />
    <Apoio cor={colors.creme} style={{ left: 66, top: 600, width: 400 }}>Todo domingo, a partir das 15h, no Espaço Aruanda, na UFSC.</Apoio>
    <Rodape escuro n="1" />
  </Quadro>
);

/** 2, branco: palavra enorme atrás dos tocadores; texto pequeno no canto. */
export const CarrosselToque: React.FC = () => (
  <Quadro fundo={colors.branco} topo="ofAxeBuzios" base="ofArmas">
    <Fantasma texto="Baque" cor="#f3e6d9" tam={560} style={{ left: -20, top: 330 }} />
    <G nome="elFolhaLarga" altura={820} op={0.12} style={{ right: -40, top: 90 }} />
    <G nome="elSolRespingo" largura={420} op={0.18} style={{ left: -60, top: 430 }} />
    <Pincel cor={colors.laranjaTexto} style={{ position: "absolute", left: 66, top: 120 }}>vem batucar</Pincel>
    <T tam={330} style={{ position: "absolute", left: 60, top: 190 }}>Toque</T>
    <T tam={330} cor={colors.laranjaTexto} style={{ position: "absolute", left: 60, top: 460 }}>junto</T>
    <Recorte nome="fotoTocadoresChapeuCor" altura={680} style={{ left: 0, bottom: 40 }} />
    <Apoio cor={colors.tintaTexto} style={{ right: 60, top: 850, width: 300 }}>Quem quer aprender entra na roda. O ensaio é aberto, com troca, vivência e muito baque.</Apoio>
    <Rodape n="2" arrobaDireita />
  </Quadro>
);

/** 3, marinho: título em duas linhas, mulher com cabaça emerge de baixo, ícone branco. */
export const CarrosselBaque: React.FC = () => (
  <Quadro fundo={colors.marinho} topo="ofIcones" base="ofTriangulos">
    <G nome="elSolRespingo" largura={640} op={0.16} style={{ right: -120, top: 120 }} />
    <G nome="elManchasPessegoAzul" largura={900} op={0.0} style={{ left: 0, top: 0 }} />
    <Pincel cor={colors.creme} style={{ position: "absolute", left: 66, top: 150 }}>maracatu de</Pincel>
    <T tam={250} cor={colors.creme} style={{ position: "absolute", left: 60, top: 220 }}>Baque</T>
    <T tam={250} cor={colors.laranja} style={{ position: "absolute", left: 60, top: 440 }}>Virado</T>
    <Recorte nome="fotoMulherCabaca" altura={780} style={{ right: 0, bottom: 40 }} />
    <Recorte nome="icMachadoDuplo" altura={170} style={{ left: 70, bottom: 360 }} />
    <Apoio cor={colors.creme} style={{ left: 66, bottom: 150, width: 230 }}>Desde 2002 em Florianópolis, com as raízes de Pernambuco.</Apoio>
    <Rodape escuro n="3" />
  </Quadro>
);

/** 4, branco: informação de serviço com número gigante e etiquetas. */
export const CarrosselServico: React.FC = () => (
  <Quadro fundo={colors.branco} topo="ofHexagonos" base="ofDancarinos">
    <Fantasma texto="15h" cor="#f3e6d9" tam={760} style={{ right: -30, top: 150 }} />
    <G nome="elFolhaCurvasLaranja" largura={560} op={0.16} style={{ left: -60, top: 60 }} />
    <Pincel cor={colors.laranjaTexto} style={{ position: "absolute", left: 66, top: 120 }}>todo domingo</Pincel>
    <T tam={420} style={{ position: "absolute", left: 56, top: 180 }}>15h</T>
    <Etiqueta fundo={colors.marinho} cor={colors.creme} style={{ left: 66, top: 640 }}>ESPAÇO ARUANDA</Etiqueta>
    <Etiqueta fundo={colors.laranja} cor={colors.noite} style={{ left: 66, top: 706 }}>CAMPUS DA UFSC</Etiqueta>
    <Etiqueta fundo={colors.verde} cor={colors.creme} style={{ left: 66, top: 772 }}>TRINDADE · FLORIANÓPOLIS</Etiqueta>
    <Recorte nome="fotoAdultoEMeninoCaixa" altura={1060} style={{ right: 20, bottom: 68 }} />
    <Apoio cor={colors.tintaTexto} style={{ left: 66, top: 900, width: 360 }}>Centro de Convivência, região central do campus.</Apoio>
    <Rodape n="4" />
  </Quadro>
);

/** 5, terracota: oficina com mestre, campos entre colchetes. */
export const CarrosselOficina: React.FC = () => (
  <Quadro fundo={colors.terracota} topo="ofMaracatu" base="ofArmas">
    <Fantasma texto="Oficina" cor="#cf7a43" tam={420} style={{ left: -20, top: 700 }} />
    <G nome="elPontosPessego" largura={320} op={0.7} style={{ right: 40, top: 110 }} />
    <Pincel cor={colors.creme} style={{ position: "absolute", left: 66, top: 120 }}>com mestre convidado</Pincel>
    <T tam={290} cor={colors.creme} style={{ position: "absolute", left: 60, top: 190 }}>Oficina</T>
    <T tam={92} cor={colors.noite} style={{ position: "absolute", left: 66, top: 460 }}>[nome do mestre]</T>
    <Recorte nome="fotoMulherMaosAoAlto" altura={1010} style={{ right: 0, bottom: 40 }} />
    <Apoio cor={colors.creme} style={{ left: 66, top: 600, width: 420 }}>[Data] · [Horário]<br />[Local]<br />[Vagas e inscrição]</Apoio>
    <Etiqueta fundo={colors.creme} cor={colors.vinho} style={{ left: 66, top: 790 }}>VAGAS LIMITADAS</Etiqueta>
    <Rodape escuro n="5" />
  </Quadro>
);

/** 6, fecho: fundo claro e a logo direto sobre ele, sem placa (regra do dono: nunca quadro branco atrás da imagem). */
export const CarrosselFecho: React.FC = () => (
  <Quadro fundo={colors.branco} topo="ofTriangulos" base="ofHexagonos">
    <G nome="elManchasPessegoAzul" largura={1000} op={1} style={{ right: 0, top: 56 }} />
    <G nome="elFolhaLarga" altura={820} op={0.1} style={{ right: -30, bottom: 60 }} />
    <G nome="elSolRespingo" largura={430} op={0.16} style={{ left: -90, top: 560 }} />
    <G nome="elPontosLaranja" largura={240} op={0.9} style={{ left: 50, bottom: 80 }} />
    <Recorte nome="logoVertical" largura={760} style={{ left: 160, top: 110 }} />
    <Pincel cor={colors.laranjaTexto} style={{ position: "absolute", left: 0, right: 0, textAlign: "center", top: 960 }}>bora arrastar com a gente</Pincel>
    <T tam={190} style={{ position: "absolute", left: 0, right: 0, textAlign: "center", top: 1040 }}>Siga</T>
    <div style={{ position: "absolute", left: 0, right: 0, textAlign: "center", top: 1215, fontFamily: fontFamilies.etiqueta, fontSize: 44, color: colors.vinho }}>@ARRASTAILHAOFICIAL</div>
  </Quadro>
);
