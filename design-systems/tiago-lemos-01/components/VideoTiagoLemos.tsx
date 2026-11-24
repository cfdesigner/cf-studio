import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import type { Caption } from "../../../tecnicas/legendas/texto";
import { colors, fonts, layout, sfx } from "../tokens";
import { SAIDA } from "../movimento";
import { Fundo } from "./Fundo";
import { Legenda } from "./Legenda";
import { ElementoPainel, type Elemento } from "./Elementos";
import entra1 from "../assets/sfx/entra-1.wav";
import entra2 from "../assets/sfx/entra-2.wav";
import entra3 from "../assets/sfx/entra-3.wav";
import sai1 from "../assets/sfx/sai-1.wav";
import sai2 from "../assets/sfx/sai-2.wav";
import sai3 from "../assets/sfx/sai-3.wav";
import "../fonts";

const ENTRAS = [entra1, entra2, entra3];
const SAIS = [sai1, sai2, sai3];

/** O que a skill `video-tiago-lemos` gera (edicao.json) e esta composição consome. */
export type Edicao = {
  /** Caminho dentro de public/ (ex.: "entrada/meu-video-cortado.mp4"). Sem ele, aparece um marcador. */
  video?: string;
  /** Duração do vídeo já cortado, em segundos. */
  duracaoSeg: number;
  captions: Caption[];
  /** Palavras-chave em ouro na legenda (aprovadas pelo dono). */
  destaques: string[];
  elementos: Elemento[];
  /** "dividido" (padrão, como a referência): gráficos em cima, rosto embaixo. "cheio": vídeo em tela cheia com os elementos por cima. */
  layout?: "dividido" | "cheio";
  /** Onde fica o rosto na altura do vídeo de origem, de 0 (topo) a 100 (base): enquadra o quadro do rosto. Padrão 35. */
  rostoY?: number;
  /** Multiplica o volume dos efeitos (1 = pico -20 dBFS). Use menos que 1 para ficar ainda mais baixo. */
  ganhoSfx?: number;
  /** Desliga os efeitos sonoros. */
  semSom?: boolean;
  /** Legenda: "acumula" (padrão) ou "uma" palavra por vez. */
  modoLegenda?: "acumula" | "uma";
};

/**
 * Vídeo no estilo tiago-lemos-01: cortes de pausa já feitos (vídeo de entrada), legenda palavra por
 * palavra com palavras-chave em ouro, elementos animados ilustrando a fala e efeitos sonoros bem leves
 * em cada entrada e saída.
 */
export const VideoTiagoLemos: React.FC<Edicao> = ({
  video,
  captions,
  destaques,
  elementos,
  layout: modo = "dividido",
  rostoY = 35,
  ganhoSfx = sfx.ganho,
  semSom = false,
  modoLegenda = "acumula",
}) => {
  const { fps, width, height } = useVideoConfig();
  const k = width / 1080;
  const dividido = modo === "dividido";

  const fonte = video ? (
    <OffthreadVideo
      src={staticFile(video)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: `50% ${rostoY}%`,
      }}
    />
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg,#1a1510,#0d0a07)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.rotulo,
        letterSpacing: 8 * k,
        fontSize: 30 * k,
        color: colors.textoSuave,
      }}
    >
      SEU VÍDEO AQUI
    </div>
  );

  return (
    <AbsoluteFill style={{ background: colors.fundo }}>
      {dividido ? (
        <>
          <Fundo />
          <div
            style={{
              position: "absolute",
              left: layout.quadroX * k,
              top: layout.quadroY * k,
              width: layout.quadroW * k,
              height: layout.quadroH * k,
              borderRadius: layout.quadroRaio * k,
              overflow: "hidden",
              border: `${2 * k}px solid ${colors.fio}`,
              boxShadow: "0 20px 70px rgba(0,0,0,0.55)",
            }}
          >
            {fonte}
          </div>
        </>
      ) : (
        <>
          <AbsoluteFill>{fonte}</AbsoluteFill>
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(180deg, rgba(8,6,4,0.78) 0%, rgba(8,6,4,0.35) 28%, rgba(8,6,4,0) 45%)",
            }}
          />
        </>
      )}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: (dividido ? layout.painelTopo : 110) * k,
          height: (dividido ? layout.painelBase - layout.painelTopo : 520) * k,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {elementos.map((el, i) => (
          <div key={i} style={{ position: "absolute" }}>
            <ElementoPainel el={el} escala={dividido ? 1 : 0.72} />
          </div>
        ))}
      </div>

      <Legenda
        captions={captions}
        destaques={destaques}
        base={dividido ? layout.legendaBase : height / k * 0.78}
        modo={modoLegenda}
      />

      {!semSom &&
        elementos.map((el, i) => (
          <React.Fragment key={`s${i}`}>
            <Sequence from={Math.max(0, Math.round(el.de * fps) - sfx.adiantaQuadros)}>
              <Audio src={ENTRAS[i % 3]} volume={ganhoSfx} />
            </Sequence>
            <Sequence from={Math.max(0, Math.round(el.ate * fps) - SAIDA - 2)}>
              <Audio src={SAIS[i % 3]} volume={ganhoSfx} />
            </Sequence>
          </React.Fragment>
        ))}
    </AbsoluteFill>
  );
};

/** Para registrar a composição: a duração vem do edicao.json. */
export const calculaMetadados = ({ props }: { props: Edicao }) => ({
  durationInFrames: Math.max(1, Math.round(props.duracaoSeg * 30)),
  props,
});
