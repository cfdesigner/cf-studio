import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { colors } from "../tokens";
import type { ParteTextoAtras } from "./TextoAtras";
import "../fonts";

const c = colors.cinema;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Um quadro do rastreio: a matriz CSS (matrix3d) que prende o retângulo ao plano. Vem de `scripts/rastrear-plano.py`. */
export type QuadroTrilha = { matriz: number[] };

export type TextoNoPlanoProps = {
  /** Linhas do texto, de cima para baixo. Cada linha tem 1 ou mais partes (tamanhos e cores diferentes), alinhadas pela base. */
  linhas: ParteTextoAtras[][];
  /** Rastreio do plano: o JSON de `scripts/rastrear-plano.py` (um item por quadro do trecho rastreado). */
  trilha: QuadroTrilha[];
  /** Número (1, 2...) do quadro rastreado em que a `<Sequence>` começa. */
  primeiroQuadro: number;
  /** Duração da `<Sequence>` em quadros (para a saída em fade). */
  duracao: number;
  /** Largura do retângulo de texto, igual ao `--largura` usado no rastreio (padrão 1000). */
  largura?: number;
  /** Altura do retângulo de texto, igual ao `--altura` usado no rastreio (padrão 465). */
  altura?: number;
  /**
   * Objeto que fica À FRENTE do texto (ex.: a árvore). Pasta em public/ com PNGs com transparência, um por quadro do trecho
   * (`scripts/mascara-arvore.py` ou `scripts/recortar-pessoa.py`), numerados como o rastreio: 001.png, 002.png...
   */
  frente?: { pasta: string };
  /** O texto entra deslizando pelo plano, vindo desta distância (px do retângulo) à direita. 0 = só fade. Padrão 620. */
  deslizaDe?: number;
  /** Texto na base do retângulo, "assentado" em cima do objeto (padrão) ou centralizado. */
  alinhar?: "base" | "centro";
  /** Folga entre o texto e a base do retângulo, em px (padrão 14). */
  folgaBase?: number;
};

/**
 * Texto preso a um PLANO do vídeo (parapeito, parede, mesa), seguindo a câmera, com a perspectiva do plano, e com um objeto
 * (árvore, pessoa) À FRENTE: o texto pode entrar "por trás" dele. Aprovado pelo dono no C02 ("TRANSFORMAR COMPLETAMENTE"
 * em cima do parapeito, saindo de trás da árvore).
 *
 * Passo a passo e limites: `tecnicas/texto-no-plano/README.md`. Vale para vídeo de 1080 de largura (a matriz é em px).
 * Estilo CFDesigner: Bebas, branco gelo e UMA palavra em âmbar; entra deslizando e subindo um pouco, sai em fade.
 */
export const TextoNoPlano: React.FC<TextoNoPlanoProps> = ({
  linhas,
  trilha,
  primeiroQuadro,
  duracao,
  largura = 1000,
  altura = 465,
  frente,
  deslizaDe = 620,
  alinhar = "base",
  folgaBase = 14,
}) => {
  const fr = useCurrentFrame();
  const t = trilha[Math.min(Math.max(primeiroQuadro - 1 + fr, 0), trilha.length - 1)];
  const sobe = interpolate(fr, [0, 26], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.exp),
  });
  const aparece = interpolate(fr, [0, 6], [0, 1], clamp);
  const sai = interpolate(fr, [duracao - 8, duracao], [1, 0], clamp);
  const n = String(primeiroQuadro + fr).padStart(3, "0");
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: largura,
          height: altura,
          transformOrigin: "0 0",
          transform: `matrix3d(${t.matriz.join(",")})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: alinhar === "base" ? "flex-end" : "center",
          paddingBottom: alinhar === "base" ? folgaBase : 0,
          opacity: aparece * sai,
        }}
      >
        <div
          style={{
            transform: `translate(${(1 - sobe) * deslizaDe}px, ${(1 - sobe) * 30}px)`,
            textAlign: "center",
          }}
        >
          {linhas.map((partes, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 26 }}
            >
              {partes.map((p) => (
                <span
                  key={p.texto}
                  style={{
                    fontFamily: "Bebas Neue, sans-serif",
                    fontSize: p.tamanho,
                    lineHeight: 0.92,
                    color: p.cor ?? c.ink,
                    letterSpacing: 2,
                    whiteSpace: "nowrap",
                    textShadow: "0 6px 30px rgba(0,0,0,0.45)",
                  }}
                >
                  {p.texto}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      {frente ? (
        <Img
          src={staticFile(`${frente.pasta}/${n}.png`)}
          style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
