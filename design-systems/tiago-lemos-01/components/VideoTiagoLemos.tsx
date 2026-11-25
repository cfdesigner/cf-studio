import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { Caption } from "../../../tecnicas/legendas/texto";
import { colors, fonts, layout, sfx } from "../tokens";
import { SAIDA, clamp, outExpo } from "../movimento";
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
  /**
   * Layout por trecho (segundos no vídeo cortado), para MESCLAR: ex. "dividido" quando ele fala para a
   * câmera e "cheio" nos b-rolls. Fora dos trechos vale `layout`. A troca é uma transição suave (10 quadros).
   * `rostoY` por trecho enquadra o rosto de cada cena. Cada elemento deve caber inteiro num trecho.
   */
  /**
   * B-rolls gerados (ex.: Kling) que SUBSTITUEM a imagem do vídeo no intervalo (corte seco, como uma troca de cena).
   * `src` em public/. A fala do vídeo original continua tocando (o b-roll é mudo). `velocidade` acelera/desacelera o clipe
   * para caber na janela (ex.: um clipe de 5 s numa janela de 2,5 s: 2). `de`/`ate` em segundos no vídeo cortado.
   */
  brolls?: { de: number; ate: number; src: string; velocidade?: number }[];
  trechos?: {
    de: number;
    ate: number;
    layout: "dividido" | "cheio";
    rostoY?: number;
    /**
     * Foto (em public/) como fundo da parte de CIMA do trecho, atrás dos elementos, escurecida e esmaecida para
     * baixo. Só no layout dividido. `imagemTopoY` = posição vertical do recorte, 0 a 100 (padrão 50).
     */
    imagemTopo?: string;
    imagemTopoY?: number;
  }[];
};

const TRANSICAO = 10;

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
  trechos = [],
  brolls = [],
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const k = width / 1080;

  // Layout de cada trecho em quadros; fora deles vale o padrão.
  const lista = trechos
    .map((t) => ({
      ini: Math.round(t.de * fps),
      fim: Math.round(t.ate * fps),
      v: t.layout === "dividido" ? 1 : 0,
      y: t.rostoY ?? rostoY,
    }))
    .sort((a, b) => a.ini - b.ini);
  const padrao = modo === "dividido" ? 1 : 0;
  const em = (f: number) => lista.find((t) => f >= t.ini && f < t.fim);
  const valorEm = (f: number) => em(f)?.v ?? padrao;
  const yEm = (f: number) => em(f)?.y ?? rostoY;
  // p = 1 dividido, 0 cheio. Em cada fronteira, desliza do valor antigo para o novo.
  let p = valorEm(frame);
  let yRosto = yEm(frame);
  const ptos = Array.from(new Set(lista.flatMap((t) => [t.ini, t.fim]))).sort((a, b) => a - b);
  for (const b of ptos) {
    if (frame >= b && frame < b + TRANSICAO) {
      const q = outExpo(interpolate(frame, [b, b + TRANSICAO], [0, 1], clamp));
      p = interpolate(q, [0, 1], [valorEm(b - 1), valorEm(b)]);
      yRosto = interpolate(q, [0, 1], [yEm(b - 1), yEm(b)]);
    }
  }
  const mix = (cheio: number, div: number) => cheio + (div - cheio) * p;
  const layoutDoElemento = (de: number) => (valorEm(Math.round(de * fps)) ? "dividido" : "cheio");

  const fonte = video ? (
    <OffthreadVideo
      src={staticFile(video)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: `50% ${yRosto}%`,
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
      <div style={{ opacity: p }}>
        <Fundo />
      </div>
      {trechos
        .filter((t) => t.imagemTopo && t.layout === "dividido")
        .map((t, i) => {
          const ini = Math.round(t.de * fps);
          const fim = Math.round(t.ate * fps);
          const vis =
            interpolate(frame, [ini, ini + 8], [0, 1], clamp) *
            interpolate(frame, [fim - 4, fim + 6], [1, 0], clamp);
          if (vis <= 0) return null;
          const alt = layout.quadroY * k;
          const fade = "linear-gradient(180deg, #000 0%, #000 55%, transparent 100%)";
          return (
            <div
              key={`it${i}`}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width,
                height: alt,
                opacity: vis,
                WebkitMaskImage: fade,
                maskImage: fade,
              }}
            >
              <Img
                src={staticFile(t.imagemTopo as string)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: `50% ${t.imagemTopoY ?? 50}%`,
                  transform: `scale(${1 + 0.05 * ((frame - ini) / Math.max(1, fim - ini))})`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(10,8,6,0.62) 0%, rgba(10,8,6,0.55) 60%, rgba(10,8,6,0.8) 100%)",
                }}
              />
            </div>
          );
        })}
      <div
        style={{
          position: "absolute",
          left: mix(0, layout.quadroX * k),
          top: mix(0, layout.quadroY * k),
          width: mix(width, layout.quadroW * k),
          height: mix(height, layout.quadroH * k),
          borderRadius: mix(0, layout.quadroRaio * k),
          overflow: "hidden",
          border: `${2 * k}px solid rgba(216,171,73,${0.45 * p})`,
          boxShadow: `0 20px 70px rgba(0,0,0,${0.55 * p})`,
        }}
      >
        {fonte}
        {brolls.map((b, i) => {
          const ini = Math.round(b.de * fps);
          return (
            <Sequence
              key={i}
              from={ini}
              durationInFrames={Math.max(1, Math.round(b.ate * fps) - ini)}
              layout="none"
            >
              <AbsoluteFill>
                <OffthreadVideo
                  src={staticFile(b.src)}
                  muted
                  playbackRate={b.velocidade ?? 1}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </AbsoluteFill>
            </Sequence>
          );
        })}
      </div>
      <AbsoluteFill
        style={{
          opacity: 1 - p,
          background:
            "linear-gradient(180deg, rgba(8,6,4,0.78) 0%, rgba(8,6,4,0.35) 28%, rgba(8,6,4,0) 45%)",
        }}
      />

      {elementos.map((el, i) => {
        const div = layoutDoElemento(el.de) === "dividido";
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: (div ? layout.painelTopo : 110) * k,
              height: (div ? layout.painelBase - layout.painelTopo : 520) * k,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ElementoPainel el={el} escala={div ? 1 : 0.72} />
          </div>
        );
      })}

      <Legenda
        captions={captions}
        destaques={destaques}
        base={mix((height / k) * 0.78, layout.legendaBase)}
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
