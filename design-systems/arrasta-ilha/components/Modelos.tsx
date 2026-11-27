import React from "react";
import { AbsoluteFill } from "remotion";
import "../fonts";
import { colors, engrossar, fontFamilies, temas, type TemaNome } from "../tokens";
import { fotos, type FotoNome } from "../assets";
import { Faixa, PadraoOficial, Recorte } from "./Original";

const titulo = (tam: number, cor: string = colors.noite): React.CSSProperties => ({
  fontFamily: fontFamilies.display,
  fontSize: tam,
  lineHeight: 0.92,
  color: cor,
  textTransform: "uppercase",
  WebkitTextStroke: `${tam * engrossar.padrao}px ${cor}`,
  paintOrder: "stroke fill",
});
const etiqueta = (tam: number, cor: string): React.CSSProperties => ({ fontFamily: fontFamilies.etiqueta, fontSize: tam, letterSpacing: tam * 0.18, color: cor });
const corpo = (tam: number, cor = "#4a3a33"): React.CSSProperties => ({ fontFamily: fontFamilies.corpo, fontSize: tam, color: cor, lineHeight: 1.25 });

const Servico: React.FC<{ tema: TemaNome; texto: string }> = ({ tema, texto }) => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 120, background: temas[tema].fundo, ...etiqueta(36, temas[tema].texto), display: "flex", alignItems: "center", paddingLeft: 72 }}>{texto}</div>
);

const Cabeca: React.FC<{ cor: string; texto: string; marginBottom?: number }> = ({ cor, texto, marginBottom = 30 }) => (
  <>
    <div style={etiqueta(34, cor)}>{texto}</div>
    <div style={{ height: 5, width: 150, background: cor, margin: `16px 0 ${marginBottom}px` }} />
  </>
);

/** Prancha com todos os recortes e faixas originais do site (conferência). */
export const PranchaRecortes: React.FC = () => (
  <AbsoluteFill style={{ background: colors.creme, padding: 40, color: colors.noite }}>
    <div style={{ fontFamily: fontFamilies.pincel, fontSize: 56 }}>Recortes e faixas do site</div>
    <div style={etiqueta(20, colors.laranjaTexto)}>MATERIAL DO PRÓPRIO GRUPO · RECORTADO DOS PRINTS · TROCAR PELOS ARQUIVOS DE ORIGEM EM ALTA</div>
    <div style={{ position: "relative", height: 760, marginTop: 20 }}>
      <Recorte nome="mulherBandeira" altura={640} style={{ left: 0, top: 0 }} />
      <Recorte nome="tocadorAgogo" altura={640} style={{ left: 290, top: 0 }} />
      <Recorte nome="tocadoresCaixa" altura={420} style={{ left: 640, top: 0 }} />
      <Recorte nome="meninoCaixa" altura={420} style={{ left: 940, top: 0 }} />
      <Recorte nome="tambores" altura={300} style={{ left: 1150, top: 0 }} />
      <Recorte nome="mulherCabaca" altura={330} style={{ left: 640, top: 440 }} />
      <Recorte nome="folhaToadas" largura={300} style={{ left: 980, top: 330 }} />
      <Recorte nome="folhaLarga" altura={300} style={{ left: 1300, top: 330 }} />
      <Recorte nome="folhaFundamentos" altura={300} style={{ left: 1090, top: 450 }} />
      <Recorte nome="solRespingo" largura={150} style={{ left: 1290, top: 650 }} />
    </div>
    <div style={{ display: "flex", gap: 20, alignItems: "flex-end", marginTop: 6 }}>
      <Recorte nome="pontosLaranja" altura={110} style={{ position: "relative" }} />
      <Recorte nome="pontosClaros" altura={110} style={{ position: "relative" }} />
      <Recorte nome="pontosDanca" altura={110} style={{ position: "relative" }} />
      <Recorte nome="arcosAzuis" altura={140} style={{ position: "relative" }} />
      <Recorte nome="semicirculoCurvas" altura={110} style={{ position: "relative" }} />
      <Recorte nome="tracejadoLaranja" altura={110} style={{ position: "relative" }} />
      <Recorte nome="folhaDanca" altura={140} style={{ position: "relative" }} />
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14, width: 1380 }}>
      <Faixa nome="verdeXis" w={1380} alt={42} />
      <Faixa nome="lilasSetas" w={1380} alt={42} />
      <Faixa nome="azulZigue" w={1380} alt={42} />
      <Faixa nome="verdeTriangulos" w={1380} alt={42} />
      <Faixa nome="simbolos" w={1380} alt={42} />
      <Faixa nome="ofTriangulos" w={1380} alt={42} />
      <Faixa nome="ofIcones" w={1380} alt={56} />
      <Faixa nome="ofDancarinos" w={1380} alt={57} />
    </div>
  </AbsoluteFill>
);

/** A: aviso do ensaio. Home do site (triângulos verdes), laranja. Mulher com a bandeira do grupo. */
export const ModeloAviso: React.FC = () => (
  <AbsoluteFill style={{ background: colors.creme }}>
    <Faixa nome="ofTriangulos" w={1080} alt={50} />
    <Recorte nome="logoVertical" largura={250} style={{ left: 60, top: 90 }} />
    <Recorte nome="folhaFundamentos" altura={560} style={{ right: -50, top: 360 }} />
    <Recorte nome="fotoMulherBandeira" altura={900} style={{ right: 10, top: 250 }} />
    <div style={{ position: "absolute", left: 72, top: 500, width: 600 }}>
      <Cabeca cor={colors.laranjaTexto} texto="ENSAIO ABERTO" />
      <div style={titulo(150)}>Domingo<br />tem<br />maracatu</div>
      <div style={{ ...corpo(46), marginTop: 34 }}>Chegue, toque e dance com o grupo</div>
    </div>
    <Servico tema="laranja" texto="DOMINGOS · 15H · ESPAÇO ARUANDA · UFSC" />
  </AbsoluteFill>
);

/** B: toada nova. Página Toadas (faixa de X verde), verde. Tocador de agogô. */
export const ModeloToada: React.FC = () => (
  <AbsoluteFill style={{ background: colors.creme }}>
    <Faixa nome="ofAxeBuzios" w={1080} alt={58} />
    <Recorte nome="folhaToadas" largura={560} style={{ right: -20, top: 100 }} />
    <Recorte nome="arcosAzuis" largura={380} style={{ left: -30, top: 560 }} />
    <Recorte nome="pontosLaranja" largura={150} style={{ left: 60, top: 140 }} />
    <Recorte nome="tocadorAgogo" altura={900} style={{ right: 30, top: 320 }} />
    <div style={{ position: "absolute", left: 72, top: 450, width: 560 }}>
      <Cabeca cor={colors.verde} texto="PLATAFORMA · TOADAS" />
      <div style={titulo(160)}>Toada<br />nova<br />no ar</div>
      <div style={{ ...corpo(44), marginTop: 30 }}>Escute e aprenda com o grupo</div>
    </div>
    <Servico tema="verde" texto="ARRASTAILHA.COM.BR · TOADAS" />
  </AbsoluteFill>
);

/** C: oficina com mestre convidado. Página Dança (faixa azul de zigue), azul-marinho, com campos entre colchetes. */
export const ModeloOficina: React.FC = () => (
  <AbsoluteFill style={{ background: colors.marinho }}>
    <Faixa nome="ofIcones" w={1080} alt={84} />
    <Recorte nome="arcosAzuis" largura={460} style={{ right: -40, top: 130 }} />
    
    <Recorte nome="fotoMulherMaosAoAlto" altura={760} style={{ right: 20, bottom: 54 }} />
    <div style={{ position: "absolute", left: 72, top: 250, width: 600 }}>
      <Cabeca cor={colors.laranja} texto="OFICINA COM MESTRE" />
      <div style={titulo(128, colors.creme)}>Oficina<br />de maracatu</div>
      <div style={{ ...titulo(76, colors.laranja), marginTop: 28 }}>[Nome do mestre]</div>
      <div style={{ ...corpo(44, colors.creme), marginTop: 30 }}>[Data] · [Horário]<br />[Local]<br />[Vagas e inscrição]</div>
    </div>
    <div style={{ position: "absolute", left: 60, bottom: 76, width: 220, height: 170, background: colors.creme, borderRadius: 14 }}><Recorte nome="logoVertical" altura={150} style={{ left: 45, top: 10 }} /></div>
    <Faixa nome="ofHexagonos" w={1080} alt={54} style={{ position: "absolute", bottom: 0 }} />
  </AbsoluteFill>
);

/** D: toque de percussão. Página Percussão (faixa lilás de setas), terracota. */
export const ModeloPercussao: React.FC = () => (
  <AbsoluteFill style={{ background: colors.creme }}>
    <Faixa nome="ofArmas" w={1080} alt={62} />
    <Recorte nome="solRespingo" largura={260} style={{ left: 70, top: 110 }} />
    <Recorte nome="folhaLarga" altura={520} style={{ right: -10, top: 120 }} />
    <Recorte nome="semicirculoCurvas" largura={500} style={{ left: -20, bottom: 120 }} />
    <Recorte nome="fotoAlfaiaEChocalhos" largura={500} style={{ right: -10, bottom: 125 }} />
    <div style={{ position: "absolute", left: 72, top: 420, width: 560 }}>
      <Cabeca cor={colors.terracota} texto="PERCUSSÃO · TOQUE BÁSICO" />
      <div style={titulo(150)}>Solfejo<br />base</div>
      <div style={{ ...corpo(46), marginTop: 30, maxWidth: 520 }}>Aprenda a batida do grupo, passo a passo</div>
    </div>
    <Servico tema="terracota" texto="ARRASTAILHA.COM.BR · INTRODUÇÃO À PERCUSSÃO" />
  </AbsoluteFill>
);

/** E: foto-destaque com a cabaça (Fundamentos). Faixa AXÉ · LUTA. */
export const ModeloDestaque: React.FC = () => (
  <AbsoluteFill style={{ background: colors.creme }}>
    <Faixa nome="ofDancarinos" w={1080} alt={85} />
    <Recorte nome="pontosLaranja" largura={170} style={{ right: 60, top: 140 }} />
    <Recorte nome="fotoMulherCabaca" altura={560} style={{ left: -10, top: 330 }} />
    <div style={{ position: "absolute", left: 610, top: 330, width: 420 }}>
      <Cabeca cor={colors.laranjaTexto} texto="DESDE 2002" />
      <div style={titulo(100)}>Maracatu<br />de baque<br />virado</div>
      <div style={{ ...corpo(38), marginTop: 26 }}>Em Florianópolis, com as raízes de Pernambuco</div>
    </div>
    <Servico tema="laranja" texto="@ARRASTAILHAOFICIAL" />
  </AbsoluteFill>
);

/** F: cartaz de evento (estrutura do cartaz "Lançamento da plataforma", feito pelo dono). Centralizado:
 *  título escuro em duas linhas, nome do grupo em laranja, DATA grande, serviço pequeno. Fundo creme com manchas pêssego e azul-claras,
 *  faixa azul de zigue no topo, folha à esquerda, instrumentista à direita. Serve para feed 4:5 e stories 9:16. */
export const ModeloEvento: React.FC<{ stories?: boolean }> = ({ stories = false }) => {
  const k = stories ? 1.25 : 1; // escala dos textos
  return (
    <AbsoluteFill style={{ background: colors.creme }}>
      <Faixa nome="ofTriangulos" w={1080} alt={50} />
      <Recorte nome="manchaPessego" largura={760} style={{ left: 40, top: stories ? 300 : 120 }} />
      <Recorte nome="manchaAzul" largura={520} style={{ right: -10, top: stories ? 160 : 60 }} />
      <Recorte nome="folhaFundamentos" altura={stories ? 640 : 480} style={{ left: -40, bottom: stories ? 150 : 130 }} />
      <Recorte nome="tocadoresCaixa" altura={stories ? 480 : 520} style={{ right: 10, bottom: stories ? 150 : 130 }} />
      <div style={{ position: "absolute", left: 90, right: 90, top: stories ? 250 : 170, textAlign: "center" }}>
        <div style={titulo(104 * k)}>[Título do evento]<br />[segunda linha]</div>
        <div style={{ ...titulo(112 * k, colors.laranjaTexto), marginTop: 26 * k }}>Maracatu<br />Arrasta Ilha</div>
        <div style={{ ...titulo(92 * k), marginTop: 44 * k }}>[00 de mês]</div>
        <div style={{ ...etiqueta(40 * k, colors.noite), marginTop: 18 * k, lineHeight: 1.25 }}>[DIA] · [HORÁRIO]<br />[LOCAL OU CANAL]</div>
      </div>
      <Faixa nome="ofHexagonos" w={1080} alt={54} style={{ position: "absolute", bottom: stories ? 110 : 96 }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: stories ? 110 : 96, background: colors.marinho, ...etiqueta(32, colors.creme), display: "flex", alignItems: "center", justifyContent: "center" }}>@ARRASTAILHAOFICIAL</div>
    </AbsoluteFill>
  );
};

/** G: capa e fecho. O padrão oficial do grupo em tela cheia, com painel creme no centro (título e arroba). Feed 4:5 e stories 9:16. */
export const ModeloCapa: React.FC<{ stories?: boolean }> = ({ stories = false }) => {
  const H = stories ? 1920 : 1350;
  return (
    <AbsoluteFill style={{ background: colors.marinho }}>
      <PadraoOficial w={1080} h={H} escala={0.95} />
      <div style={{ position: "absolute", left: 90, right: 90, top: stories ? 440 : 190, bottom: stories ? 440 : 190, background: colors.creme, boxShadow: "0 18px 40px #0006", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 40 }}>
        <Recorte nome="logoVertical" largura={300} style={{ position: "relative", marginBottom: 24 }} />
        <div style={titulo(112)}>[Título da<br />capa]</div>
        <div style={{ ...corpo(40), marginTop: 28 }}>[linha de apoio]</div>
        <div style={{ ...etiqueta(32, colors.laranjaTexto), marginTop: 36 }}>@ARRASTAILHAOFICIAL</div>
      </div>
    </AbsoluteFill>
  );
};

/** Catálogo das fotos recortadas enviadas pelo dono. */
export const PranchaFotos: React.FC = () => {
  const nomes = Object.keys(fotos) as FotoNome[];
  const cell = 270;
  return (
    <AbsoluteFill style={{ background: colors.creme, padding: 30 }}>
      <div style={{ fontFamily: fontFamilies.pincel, fontSize: 50 }}>Fotos recortadas do grupo</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 14 }}>
        {nomes.map((n, i) => {
          const r = fotos[n];
          const k = Math.min((cell - 40) / r.w, (cell - 40) / r.h);
          return (
            <div key={n} style={{ position: "relative", width: cell, height: cell, background: i % 2 ? "#e9dfd2" : "#2c3d5c", flex: "none" }}>
              <Recorte nome={n} altura={r.h * k} style={{ left: (cell - r.w * k) / 2, top: 6 }} />
              <div style={{ position: "absolute", left: 6, bottom: 4, fontFamily: fontFamilies.corpo, fontSize: 15, color: i % 2 ? "#333" : "#fff" }}>{n.replace("foto", "")} · {r.w}x{r.h}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** H: fecho. Logo oficial grande sobre creme, "Siga @arrastailhaoficial" e faixa de triângulos; a assinatura final de vídeo e carrossel. */
export const ModeloFecho: React.FC<{ stories?: boolean }> = ({ stories = false }) => (
  <AbsoluteFill style={{ background: colors.creme }}>
    <Faixa nome="ofTriangulos" w={1080} alt={50} />
    <Recorte nome="manchaPessego" largura={800} style={{ left: 140, top: stories ? 420 : 200 }} />
    <Recorte nome="manchaAzul" largura={500} style={{ right: -10, top: stories ? 260 : 80 }} />
    <Recorte nome="logoVertical" largura={stories ? 760 : 640} style={{ left: stories ? 160 : 220, top: stories ? 520 : 210 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: stories ? 1380 : 930, textAlign: "center" }}>
      <div style={etiqueta(38, colors.laranjaTexto)}>ENSAIO TODO DOMINGO · 15H</div>
      <div style={{ ...corpo(40), marginTop: 12 }}>Espaço Aruanda, campus da UFSC</div>
    </div>
    <Faixa nome="ofHexagonos" w={1080} alt={54} style={{ position: "absolute", bottom: stories ? 110 : 96 }} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: stories ? 110 : 96, background: colors.marinho, ...etiqueta(32, colors.creme), display: "flex", alignItems: "center", justifyContent: "center" }}>@ARRASTAILHAOFICIAL</div>
  </AbsoluteFill>
);
