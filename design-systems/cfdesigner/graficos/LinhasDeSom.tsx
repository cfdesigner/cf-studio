import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "../fonts";
import { colors, fontFamilies } from "../tokens";

const c = colors.cinema;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type LinhaDeSomSegmento = {
  /** Início do som, em ms contados desde o início da <Sequence>. */
  deMs: number;
  /** Fim do som, em ms. */
  ateMs: number;
};

export type LinhaDeSom = {
  /** Nome da faixa (ex.: "VOZ", "AMBIENTE", "WHOOSH", "IMPACTO", "TIQUE"). */
  nome: string;
  /** "ambar" para efeitos e ambiente, "petroleo" para voz e marcas. */
  cor: "ambar" | "petroleo";
  segmentos: LinhaDeSomSegmento[];
};

export type LinhasDeSomProps = {
  /** Chamada pequena em cima (padrão "SOM"). */
  titulo?: string;
  faixas: LinhaDeSom[];
  /** Duração total em tela, em quadros (igual à da `<Sequence>`); é também a largura da linha do tempo. */
  durationInFrames: number;
  /** Distância da esquerda, em px na base de 1080 de largura. Junto do personagem, sem cobrir o rosto. */
  esquerda?: number;
  /** Distância do topo, em px na base de 1080 de largura. */
  topo?: number;
  /** Tamanho geral (padrão 1). */
  escala?: number;
  /** Largura de cada faixa, em px na base de 1080 de largura, antes da escala (padrão 210). Aumente para uma caixinha mais esticada. */
  trilha?: number;
  /** Altura de cada faixa, em px antes da escala (padrão 22). */
  alturaFaixa?: number;
  /** Perspectiva leve no eixo X, em graus (padrão 10). */
  inclinacaoX?: number;
  /** Perspectiva leve no eixo Y, em graus (padrão 14). O sentido é automático: sempre virado para o centro da imagem. */
  inclinacaoY?: number;
  /** Fade de saída em ms (padrão 250). */
  saidaMs?: number;
  /**
   * Giro no eixo vertical (Y): ângulo inicial e final, em graus. A caixinha fica na mesma posição e vai girando
   * de um lado até o outro durante toda a duração (ex.: de 30 a −30). Sem estes dois, ela fica parada com `inclinacaoY`.
   */
  giroDe?: number;
  giroAte?: number;
};

/**
 * Linha do tempo de som: caixinha semitransparente com uma faixa por camada de áudio (voz, ambiente, whoosh, impacto, tique).
 * Uma linha fina de reprodução cruza as faixas e cada som "acende" quando chega a vez dele, em âmbar (efeitos) ou petróleo claro (voz e marcas).
 * Mostra o que a pessoa está ouvindo. Vem do pedido do dono no episódio 04 (storyboard "Mesma cena").
 * Regras: perto do personagem, nunca na frente do rosto, sempre virada para o centro da imagem.
 */
export const LinhasDeSom: React.FC<LinhasDeSomProps> = ({
  titulo = "SOM",
  faixas,
  durationInFrames,
  esquerda = 40,
  topo = 1000,
  escala = 1,
  trilha = 210,
  alturaFaixa: alturaFaixaBase = 22,
  inclinacaoX = 10,
  inclinacaoY = 14,
  saidaMs = 250,
  giroDe,
  giroAte,
}) => {
  const f = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const k0 = width / 1080;
  const k = k0 * escala;
  const ms = (f / fps) * 1000;
  const endMs = (durationInFrames / fps) * 1000;
  const opacity =
    interpolate(ms, [endMs - saidaMs, endMs], [1, 0], clamp) *
    interpolate(f, [0, 10], [0, 1], clamp);

  const larguraRotulo = 150 * k;
  const larguraTrilha = trilha * k;
  const alturaFaixa = alturaFaixaBase * k;
  const larguraCartao = 40 * k + larguraRotulo + 14 * k + larguraTrilha;
  // cartão à esquerda do centro: afasta o lado direito (+); à direita: afasta o lado esquerdo (−)
  const centroCartao = esquerda * k0 + larguraCartao / 2;
  const sentidoY = centroCartao <= width / 2 ? 1 : -1;
  const giraAnimado = giroDe !== undefined && giroAte !== undefined;
  const anguloY = giraAnimado
    ? interpolate(f, [8, durationInFrames - 8], [giroDe, giroAte], {
        ...clamp,
        easing: Easing.inOut(Easing.cubic),
      })
    : sentidoY * Math.abs(inclinacaoY);
  const xAgora = (ms / endMs) * larguraTrilha;

  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: esquerda * k0,
          top: topo * k0,
          padding: `${20 * k}px ${20 * k}px ${22 * k}px ${22 * k}px`,
          borderRadius: 16 * k,
          background: "rgba(11,12,14,0.62)",
          border: `${1 * k}px solid rgba(217,164,65,0.4)`,
          borderLeft: `${5 * k}px solid ${c.amber}`,
          transform: `perspective(${1100 * k}px) rotateX(${inclinacaoX}deg) rotateY(${anguloY}deg)`,
          transformOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            fontFamily: fontFamilies.display,
            fontSize: 40 * k,
            lineHeight: 1,
            letterSpacing: "0.12em",
            color: c.amber,
            marginBottom: 14 * k,
          }}
        >
          {titulo}
        </div>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 12 * k }}>
          {faixas.map((fx) => {
            const cor = fx.cor === "ambar" ? c.amber : c.petrolText;
            return (
              <div key={fx.nome} style={{ display: "flex", alignItems: "center", gap: 14 * k }}>
                <div
                  style={{
                    width: larguraRotulo,
                    fontFamily: fontFamilies.heading,
                    fontWeight: 600,
                    fontSize: 17 * k,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(238,242,245,0.85)",
                  }}
                >
                  {fx.nome}
                </div>
                <div
                  style={{
                    position: "relative",
                    width: larguraTrilha,
                    height: alturaFaixa,
                    borderRadius: 5 * k,
                    background: "rgba(238,242,245,0.1)",
                    border: `${1 * k}px solid rgba(238,242,245,0.18)`,
                    boxSizing: "border-box",
                    overflow: "hidden",
                  }}
                >
                  {fx.segmentos.map((s, i) => {
                    const x0 = (s.deMs / endMs) * larguraTrilha;
                    const largura = ((s.ateMs - s.deMs) / endMs) * larguraTrilha;
                    // o som "enche" a barra enquanto toca
                    const p = interpolate(ms, [s.deMs, s.ateMs], [0, 1], clamp);
                    return (
                      <div
                        key={i}
                        style={{
                          position: "absolute",
                          top: 2 * k,
                          bottom: 2 * k,
                          left: x0,
                          width: Math.max(largura * p, p > 0 ? 3 * k : 0),
                          borderRadius: 3 * k,
                          background: cor,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
          {/* linha de reprodução */}
          <div
            style={{
              position: "absolute",
              top: -4 * k,
              bottom: -4 * k,
              left: larguraRotulo + 14 * k + xAgora,
              width: 2 * k,
              background: "rgba(238,242,245,0.75)",
              borderRadius: k,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
