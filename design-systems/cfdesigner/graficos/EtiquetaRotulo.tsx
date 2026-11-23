import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import "../fonts";
import { colors, fontFamilies } from "../tokens";

const c = colors.cinema;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type EtiquetaRotuloProps = {
  icone: "celular" | "tripe" | "papel" | "ritmo" | "cor";
  /** Palavra em Bebas Neue âmbar (ex.: "1 celular"). */
  rotulo: string;
  /** Posição do canto superior esquerdo, em px na base de 1080 de largura. */
  esquerda: number;
  topo: number;
  /** Quadro (dentro da `<Sequence>`) em que aparece. Entra em corte seco, com um fade de 4 quadros. */
  entra?: number;
  /** Quadro em que some (fade de 5 quadros). Padrão: fica até o fim. */
  sai?: number;
  /** Inclinação no eixo X, em graus (padrão 10). */
  inclinacao?: number;
  /** Inclinação no eixo Y, em graus (padrão 16). O sentido é automático: a etiqueta sempre fica virada para o centro da imagem. */
  inclinacaoY?: number;
  /** Tamanho geral (padrão 1). */
  escala?: number;
  /** Só para quando a etiqueta fica dentro de outro elemento girado: força o sentido (1 = afasta o lado direito, −1 = o esquerdo). */
  sentido?: 1 | -1;
};

const Icone: React.FC<{ nome: EtiquetaRotuloProps["icone"]; s: number }> = ({
  nome,
  s,
}) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill="none"
    stroke={c.amber}
    strokeWidth={1.6}
    strokeLinecap="square"
  >
    {nome === "celular" && (
      <>
        <rect x="7" y="2.5" width="10" height="19" />
        <path d="M11 18.5h2" />
      </>
    )}
    {nome === "tripe" && (
      <path d="M12 3v8M12 11l-6 10M12 11l6 10M12 11v10M9 3h6" />
    )}
    {nome === "ritmo" && <path d="M2 12h4l2.5-7 4 14 3-10 1.5 3H22" />}
    {nome === "cor" && (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill={c.amber} />
      </>
    )}
    {nome === "papel" && (
      <>
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M14 3v5h5M9 13h7M9 17h7" />
      </>
    )}
  </svg>
);

/**
 * Etiqueta pequena (ícone de linha + palavra em Bebas âmbar) em caixinha escura com borda dourada fina.
 * Aparece em corte seco, inclinada e **virada para o centro da imagem** (sentido automático, regra do dono).
 * Use junto com `LinhaChamada` para apontar um objeto. Nunca na frente de um rosto.
 */
export const EtiquetaRotulo: React.FC<EtiquetaRotuloProps> = ({
  icone,
  rotulo,
  esquerda,
  topo,
  entra = 0,
  sai,
  inclinacao = 10,
  inclinacaoY = 16,
  escala = 1,
  sentido: sentidoFixo,
}) => {
  const f = useCurrentFrame();
  const { width } = useVideoConfig();
  const k = (width / 1080) * escala;
  const o =
    interpolate(f, [entra, entra + 4], [0, 1], clamp) *
    (sai === undefined ? 1 : interpolate(f, [sai, sai + 5], [1, 0], clamp));
  const largura = (rotulo.length * 31 + 150) * k;
  const sentido =
    sentidoFixo ??
    (esquerda * (width / 1080) + largura / 2 <= width / 2 ? 1 : -1);
  return (
    <div
      style={{
        position: "absolute",
        left: esquerda * (width / 1080),
        top: topo * (width / 1080),
        opacity: o,
        display: "flex",
        alignItems: "center",
        gap: 18 * k,
        padding: `${16 * k}px ${28 * k}px ${16 * k}px ${24 * k}px`,
        background: "rgba(22,24,28,0.93)",
        border: `${2 * k}px solid rgba(217,164,65,0.5)`,
        transform: `perspective(${1100 * k}px) rotateX(${inclinacao}deg) rotateY(${sentido * Math.abs(inclinacaoY)}deg)`,
        transformOrigin: "50% 50%",
        pointerEvents: "none",
      }}
    >
      <Icone nome={icone} s={48 * k} />
      <div
        style={{
          fontFamily: fontFamilies.display,
          fontSize: 62 * k,
          lineHeight: 1,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: c.amber,
          whiteSpace: "nowrap",
        }}
      >
        {rotulo}
      </div>
    </div>
  );
};
