import React from "react";
import { AbsoluteFill } from "remotion";
import "../fonts";
import { elementos, fotos, icones, iconesVinho, recortes } from "../assets";
import { colors, engrossar, fontFamilies } from "../tokens";
import { Faixa, Recorte } from "./Original";
import {
  ModeloAviso,
  ModeloCapa,
  ModeloDestaque,
  ModeloEvento,
  ModeloFecho,
  ModeloOficina,
  ModeloPercussao,
  ModeloToada,
} from "./Modelos";
import { CapaPainel, PaginaIcone, PaginaPersonagem, PaginaTitulo, Suave } from "./Pagina";

// FOLHA DO DESIGN SYSTEM ARRASTA ILHA: uma prancha só com todos os elementos da marca, no estilo do eBook
// (fundo branco, grafismos suaves, faixas oficiais, título vinho com ícone e logo).

type Nome = keyof typeof fotos | keyof typeof recortes | keyof typeof elementos | keyof typeof icones | keyof typeof iconesVinho;
const medida = (n: Nome) => ({ ...fotos, ...recortes, ...elementos, ...icones, ...iconesVinho } as Record<string, { w: number; h: number }>)[n];

/** Caixa de tamanho fixo que encaixa o recorte inteiro, centralizado. */
const Cx: React.FC<{ nome: Nome; w: number; h: number; fundo?: string; legenda?: string }> = ({ nome, w, h, fundo, legenda }) => {
  const m = medida(nome);
  const k = Math.min((w - 16) / m.w, (h - 16) / m.h);
  const iw = m.w * k;
  const ih = m.h * k;
  return (
    <div style={{ position: "relative", width: w, height: h, background: fundo, flex: "none" }}>
      <Recorte nome={nome} altura={ih} style={{ left: (w - iw) / 2, top: (h - ih) / 2 }} />
      {legenda && <div style={{ position: "absolute", left: 0, right: 0, bottom: -26, textAlign: "center", fontFamily: fontFamilies.texto, fontSize: 17, color: "#7a6a63" }}>{legenda}</div>}
    </div>
  );
};

const Secao: React.FC<{ n: string; titulo: string; nota?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ n, titulo, nota, children, style }) => (
  <div style={{ position: "relative", ...style }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
      <div style={{ fontFamily: fontFamilies.texto, fontWeight: 700, fontSize: 30, color: colors.tintaTexto, textDecoration: "underline", textUnderlineOffset: 6 }}>
        {n}. {titulo}
      </div>
      {nota && <div style={{ fontFamily: fontFamilies.texto, fontSize: 19, color: "#7a6a63" }}>{nota}</div>}
    </div>
    <div style={{ marginTop: 22 }}>{children}</div>
  </div>
);

const Cor: React.FC<{ nome: string; hex: string; claro?: boolean }> = ({ nome, hex, claro }) => (
  <div style={{ width: 150 }}>
    <div style={{ height: 78, background: hex, border: claro ? "1px solid #e4d9cc" : "none" }} />
    <div style={{ fontFamily: fontFamilies.texto, fontWeight: 700, fontSize: 19, marginTop: 8, color: colors.tintaTexto }}>{nome}</div>
    <div style={{ fontFamily: fontFamilies.texto, fontSize: 18, color: "#7a6a63" }}>{hex}</div>
  </div>
);

const Mini: React.FC<{ children: React.ReactNode; w?: number; legenda: string; s?: number }> = ({ children, w = 1080, legenda, s = 0.2 }) => (
  <div style={{ width: w * s, flex: "none" }}>
    <div style={{ position: "relative", width: w * s, height: 1350 * s, overflow: "hidden", boxShadow: "0 4px 14px #0003", background: "#fff" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1350, transform: `scale(${s})`, transformOrigin: "top left" }}>{children}</div>
    </div>
    <div style={{ fontFamily: fontFamilies.texto, fontSize: 18, marginTop: 8, color: "#5b4a42", textAlign: "center" }}>{legenda}</div>
  </div>
);

const regras = [
  "Fundo branco ou creme, com grafismos suaves atrás e o texto na frente",
  "Uma cor-tema por peça: laranja, verde, azul, petróleo ou terracota",
  "Faixa oficial em cima e embaixo; trocar a faixa de uma página para outra",
  "Títulos em Zenzero, caixa alta, com contorno de 1,5 px; letras sem apertar nem abrir",
  "Subtítulo em negrito sublinhado; texto corrido curto, nunca textão",
  "Logo só sobre branco ou creme; em fundo escuro, sobre uma placa clara",
  "Personagens recortados ancorados na borda; rostos sempre livres",
  "Foto e ilustração não se misturam na mesma peça; preto e branco e colorido também não",
  "Grafismos e faixas nunca passam por cima de texto nem de rosto",
  "Sem toadas nem versos; fotos de pessoas só com autorização do grupo",
];

export const FolhaDesignSystem: React.FC = () => {
  const W = 2400;
  const H = 5350;
  const L = 110;
  return (
    <AbsoluteFill style={{ background: colors.branco, width: W, height: H }}>
      <Suave nome="elSolRespingo" largura={900} style={{ right: -160, top: 120 }} opacidade={0.12} />
      <Suave nome="elFolhaLarga" altura={1500} style={{ right: -40, top: 1500 }} opacidade={0.06} />
      <Suave nome="elFolhaLarga" altura={1300} style={{ left: -80, top: 2500 }} opacidade={0.05} />
      <Suave nome="elFolhaLarga" altura={1200} style={{ right: 400, bottom: 120 }} opacidade={0.05} />
      <Faixa nome="ofHexagonos" w={W} alt={90} style={{ position: "absolute", top: 0 }} />

      {/* cabeçalho */}
      <div style={{ position: "absolute", left: L, right: L, top: 190, display: "flex", alignItems: "center", gap: 44 }}>
        <div style={{ fontFamily: fontFamilies.display, fontSize: 210, lineHeight: 1, color: colors.vinho, textTransform: "uppercase", WebkitTextStroke: `${210 * engrossar.padrao}px ${colors.vinho}`, paintOrder: "stroke fill" }}>Design system</div>
        <div style={{ position: "relative", width: 150, height: 190 }}>
          <Recorte nome="ivArcoFlecha" altura={170} style={{ left: 0, top: 6 }} />
        </div>
        <div style={{ flex: 1, position: "relative", height: 190 }}>
          <Recorte nome="logoAmbiente" largura={520} style={{ right: 0, top: 10 }} />
        </div>
      </div>
      <div style={{ position: "absolute", left: L, top: 440, fontFamily: fontFamilies.texto, fontSize: 30, color: colors.tintaTexto, width: 1500, lineHeight: 1.4 }}>
        Maracatu Arrasta Ilha · Florianópolis · desde 2002<br />
        Linguagem visual para redes, cartazes de oficina e mestres convidados. Referência: o eBook das Toadas e o site do grupo.
      </div>

      <div style={{ position: "absolute", left: L, right: L, top: 600, display: "flex", flexDirection: "column", gap: 95 }}>
        {/* 1 logos + cores */}
        <div style={{ display: "flex", gap: 120 }}>
          <Secao n="1" titulo="Logos" nota="só sobre branco ou creme" style={{ width: 1000 }}>
            <div style={{ display: "flex", gap: 36, alignItems: "flex-end" }}>
              <Cx nome="logoVertical" w={300} h={320} legenda="vertical (principal)" />
              <Cx nome="logoAmbiente" w={440} h={150} legenda="horizontal (plataforma)" />
              <Cx nome="logoGrafismos" w={300} h={300} legenda="com grafismos" />
            </div>
          </Secao>
          <Secao n="2" titulo="Cores" nota="medidas nos materiais do grupo" style={{ flex: 1 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 26 }}>
              <Cor nome="Laranja" hex={colors.laranja} />
              <Cor nome="Terracota" hex={colors.terracota} />
              <Cor nome="Ocre" hex={colors.ocre} />
              <Cor nome="Verde" hex={colors.verde} />
              <Cor nome="Verde-folha" hex={colors.verdeFolha} />
              <Cor nome="Petróleo" hex={colors.petroleo} />
              <Cor nome="Marinho" hex={colors.marinho} />
              <Cor nome="Azul-bandeira" hex={colors.azulBandeira} />
              <Cor nome="Vinho (títulos)" hex={colors.vinho} />
              <Cor nome="Terra (folhas)" hex={colors.terra} />
              <Cor nome="Tinta (texto)" hex={colors.tintaTexto} />
              <Cor nome="Areia" hex={colors.areia} claro />
              <Cor nome="Creme" hex={colors.creme} claro />
              <Cor nome="Branco" hex={colors.branco} claro />
            </div>
          </Secao>
        </div>

        {/* 3 tipografia */}
        <Secao n="3" titulo="Tipografia" nota="letras no espaçamento normal">
          <div style={{ display: "flex", gap: 90 }}>
            <div style={{ width: 900 }}>
              <div style={{ fontFamily: fontFamilies.display, fontSize: 130, lineHeight: 1, color: colors.vinho, textTransform: "uppercase", WebkitTextStroke: `${130 * engrossar.padrao}px ${colors.vinho}`, paintOrder: "stroke fill" }}>Domingo tem maracatu</div>
              <div style={{ fontFamily: fontFamilies.texto, fontSize: 22, color: "#7a6a63", marginTop: 8 }}>Títulos: Zenzero Grotesk Sans, caixa alta, contorno de 1,5 px (no máximo 2 px)</div>
            </div>
            <div style={{ width: 560 }}>
              <div style={{ fontFamily: fontFamilies.texto, fontSize: 40, fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 6 }}>Subtítulo em negrito</div>
              <div style={{ fontFamily: fontFamilies.texto, fontSize: 28, fontWeight: 700, marginTop: 10 }}>Linha de apoio ou crédito</div>
              <div style={{ fontFamily: fontFamilies.texto, fontSize: 32, lineHeight: 1.4, marginTop: 14 }}>Texto corrido curto, claro, na voz do grupo. Cada linha com respiro.</div>
              <div style={{ fontFamily: fontFamilies.texto, fontSize: 22, color: "#7a6a63", marginTop: 8 }}>Subtítulo e texto: Carlito</div>
            </div>
            <div style={{ width: 420 }}>
              <div style={{ fontFamily: fontFamilies.etiqueta, fontSize: 40, letterSpacing: 6, color: colors.laranjaTexto }}>ENSAIO ABERTO · 15H</div>
              <div style={{ fontFamily: fontFamilies.texto, fontSize: 22, color: "#7a6a63", marginTop: 8 }}>Etiquetas e serviço: Staatliches</div>
              <div style={{ fontFamily: fontFamilies.corpo, fontSize: 32, marginTop: 24 }}>Texto de cartaz em serifa</div>
              <div style={{ fontFamily: fontFamilies.texto, fontSize: 22, color: "#7a6a63", marginTop: 8 }}>Crimson Pro, a serifa do site</div>
            </div>
          </div>
        </Secao>

        {/* 4 faixas */}
        <Secao n="4" titulo="Faixas oficiais" nota="repetem lado a lado; uma em cima, outra embaixo">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {(["ofTriangulos", "ofHexagonos", "ofAxeBuzios", "ofIcones", "ofArmas", "ofDancarinos", "ofMaracatu"] as const).map((n) => (
              <Faixa key={n} nome={n} w={W - L * 2} alt={n === "ofIcones" || n === "ofDancarinos" ? 112 : n === "ofMaracatu" ? 44 : 64} />
            ))}
          </div>
        </Secao>

        {/* 5 grafismos + ícones */}
        <div style={{ display: "flex", gap: 90 }}>
          <Secao n="5" titulo="Grafismos suaves" nota="com pouca opacidade, atrás do texto" style={{ width: 1120 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              {(["elFolhaLarga", "elFolhaCurvasLaranja", "elFolhaTracejado", "elFolhaManchaAzul", "elSolRespingo", "elPontosLaranja", "elPontosPessego", "elArcosAzuis", "elSemicirculoCurvas", "elCurvasAzuisSemicirculo", "elManchasPessegoAzul", "elFlorLaranja"] as const).map((n) => (
                <Cx key={n} nome={n} w={190} h={190} fundo="#faf6f1" />
              ))}
            </div>
          </Secao>
          <Secao n="6" titulo="Ícones" nota="brancos sobre cor, vinho sobre branco" style={{ flex: 1, minWidth: 880 }}>
            <div style={{ display: "flex", flexWrap: "nowrap", gap: 14 }}>
              {(["icArcoFlecha", "icMachadoDuplo", "icTridenteSetas", "icLequeCabaca", "icFerraduraEstrela", "icConeBordado"] as const).map((n) => (
                <Cx key={n} nome={n} w={125} h={140} fundo={colors.marinho} />
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "nowrap", gap: 14, marginTop: 14 }}>
              {(["ivArcoFlecha", "ivMachadoDuplo", "ivTridenteSetas", "ivLequeCabaca", "ivFerraduraEstrela", "ivConeBordado"] as const).map((n) => (
                <Cx key={n} nome={n} w={125} h={140} fundo="#faf6f1" />
              ))}
            </div>
          </Secao>
        </div>

        {/* 7 personagens e instrumentos */}
        <Secao n="7" titulo="Personagens e instrumentos" nota="recortes do grupo, ancorados na borda">
          <div style={{ display: "flex", gap: 20, alignItems: "flex-end", flexWrap: "wrap" }}>
            {(["fotoMulherBandeira", "fotoMulherMaosAoAlto", "fotoAdultoEMeninoCaixa", "fotoTocadoresChapeuCor", "fotoMulherCabaca", "fotoMeninoBaqueta", "fotoCasalAgogo", "fotoMestreSorrindoA"] as const).map((n) => (
              <Cx key={n} nome={n} w={250} h={340} fundo="#faf6f1" />
            ))}
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
            {(["fotoXequereAzul", "fotoXequereVerde", "fotoXequereAzulBuzios", "fotoTamborMadeiraTriangulos", "fotoGanzaVime", "fotoSinoPreto", "fotoCaixaAcoBaquetas", "fotoAlfaiaEChocalhos"] as const).map((n) => (
              <Cx key={n} nome={n} w={250} h={220} fundo="#faf6f1" />
            ))}
          </div>
        </Secao>

        {/* 8 modelos */}
        <Secao n="8" titulo="Modelos de peça" nota="feed 4:5 e stories 9:16, mesma linguagem">
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            <Mini legenda="Capa"><CapaPainel /></Mini>
            <Mini legenda="Página de título"><PaginaTitulo /></Mini>
            <Mini legenda="Personagem"><PaginaPersonagem /></Mini>
            <Mini legenda="Ícone"><PaginaIcone /></Mini>
            <Mini legenda="Aviso do ensaio"><ModeloAviso /></Mini>
            <Mini legenda="Toada nova"><ModeloToada /></Mini>
            <Mini legenda="Oficina com mestre"><ModeloOficina /></Mini>
          </div>
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap", marginTop: 30 }}>
            <Mini legenda="Percussão"><ModeloPercussao /></Mini>
            <Mini legenda="Destaque"><ModeloDestaque /></Mini>
            <Mini legenda="Evento"><ModeloEvento /></Mini>
            <Mini legenda="Capa com padrão"><ModeloCapa /></Mini>
            <Mini legenda="Fecho"><ModeloFecho /></Mini>
          </div>
        </Secao>

        {/* 9 regras + movimento */}
        <div style={{ display: "flex", gap: 120 }}>
          <Secao n="9" titulo="Regras" style={{ flex: 1.3 }}>
            <div style={{ fontFamily: fontFamilies.texto, fontSize: 27, lineHeight: 1.5, color: colors.tintaTexto }}>
              {regras.map((r, i) => (
                <div key={i}>{i + 1}. {r}</div>
              ))}
            </div>
          </Secao>
          <Secao n="10" titulo="Movimento" nota="vídeo" style={{ flex: 1 }}>
            <div style={{ fontFamily: fontFamilies.texto, fontSize: 27, lineHeight: 1.5 }}>
              A batida: entra firme como pancada de alfaia, passa um pouco do ponto e assenta.<br />
              Título palavra por palavra; corte com cortina em zigue-zague na cor da cena que entra.<br />
              Nada de fade longo, elástico nem giro.
            </div>
          </Secao>
        </div>
      </div>

      <Faixa nome="ofArmas" w={W} alt={90} style={{ position: "absolute", top: H - 90 }} />
    </AbsoluteFill>
  );
};
