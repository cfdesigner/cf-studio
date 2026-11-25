import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts, ouroGradiente } from "../tokens";
import { ENTRADA, SAIDA, clamp, inCubic, outExpo } from "../movimento";
import { ICONES } from "./icones";
import { Rico, semMarcas } from "./shared";
import "../fonts";

type Base = {
  /** Segundos (no vídeo já cortado) em que o elemento entra e termina de sair. */
  de: number;
  ate: number;
  /** Rótulo pequeno em mono acima do elemento (opcional, discreto). */
  kicker?: string;
};
export type ElementoIcone = Base & {
  tipo: "icone";
  /** Nome do ícone de traço (components/icones.ts). Ignorado se houver `imagem`. */
  icone?: string;
  /**
   * Ilustração dentro de public/, PNG COM FUNDO TRANSPARENTE. Se a imagem veio em ouro sobre PRETO PURO
   * (ex.: Nano Banana), converta antes: alpha = canal mais claro (veja producoes/c02-tiago/README.md).
   * Entra no lugar do ícone de traço.
   */
  imagem?: string;
  /** Até 3 palavras; *palavra* fica em ouro. */
  titulo?: string;
};
export type ElementoTitulo = Base & { tipo: "titulo"; linhas: string[] };
export type ElementoNumero = Base & {
  tipo: "numero";
  valor: number;
  prefixo?: string;
  sufixo?: string;
  rotulo?: string;
};
export type ElementoLista = Base & {
  tipo: "lista";
  /**
   * Itens. Texto simples entra em sequência (a cada ~0,3 s). `{ texto, em }` entra no instante `em`
   * (segundos no vídeo cortado), para acompanhar a fala palavra por palavra.
   */
  itens: (string | { texto: string; em: number })[];
};
export type Elemento =
  | ElementoIcone
  | ElementoTitulo
  | ElementoNumero
  | ElementoLista;

const grad = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: ouroGradiente,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  ...extra,
});

const Kicker: React.FC<{ texto?: string; k: number; p: number }> = ({
  texto,
  k,
  p,
}) =>
  texto ? (
    <div
      style={{
        fontFamily: fonts.rotulo,
        fontWeight: 700,
        fontSize: 30 * k,
        letterSpacing: 7 * k,
        color: colors.ouro,
        textTransform: "uppercase",
        opacity: p,
        marginBottom: 28 * k,
        whiteSpace: "nowrap",
      }}
    >
      • {texto}
    </div>
  ) : null;

/** Máscara que revela o texto subindo (como os títulos do vídeo de referência). */
const Revela: React.FC<{ p: number; children: React.ReactNode }> = ({
  p,
  children,
}) => (
  <div style={{ overflow: "hidden", lineHeight: 0.98, padding: "0.04em 0" }}>
    <div style={{ transform: `translateY(${(1 - p) * 105}%)` }}>{children}</div>
  </div>
);

const IconeAnimado: React.FC<{ nome: string; tam: number; local: number }> = ({
  nome,
  tam,
  local,
}) => {
  const caminhos = ICONES[nome] ?? ICONES.estrela;
  const id = `g-${nome}`;
  const preenche = interpolate(local, [26, 44], [0, 0.13], clamp);
  return (
    <svg
      width={tam}
      height={tam}
      viewBox="0 0 24 24"
      fill="none"
      style={{ filter: "drop-shadow(0 0 22px rgba(216,171,73,0.35))" }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={colors.ouroClaro} />
          <stop offset="0.5" stopColor={colors.ouro} />
          <stop offset="1" stopColor={colors.ouroEscuro} />
        </linearGradient>
      </defs>
      {caminhos.map((d, i) => {
        const p = outExpo(interpolate(local, [2 + i * 4, 20 + i * 4], [0, 1], clamp));
        return (
          <path
            key={i}
            d={d}
            pathLength={1}
            stroke={`url(#${id})`}
            strokeWidth={1.25}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={1 - p}
            fill={colors.ouro}
            fillOpacity={preenche}
          />
        );
      })}
    </svg>
  );
};

/** Ilustração PNG com fundo transparente (o preto puro foi convertido em transparência). */
const ImagemElemento: React.FC<{ src: string; tam: number; local: number }> = ({
  src,
  tam,
  local,
}) => {
  const p = outExpo(interpolate(local, [0, 22], [0, 1], clamp));
  return (
    <Img
      src={staticFile(src)}
      style={{
        width: tam,
        height: tam,
        objectFit: "contain",
        opacity: p,
        transform: `scale(${0.82 + 0.18 * p}) rotate(${(1 - p) * -6}deg)`,
        filter: "drop-shadow(0 0 30px rgba(216,171,73,0.28))",
      }}
    />
  );
};

type CorpoProps<T> = { el: T; local: number; k: number; p: number };

const CorpoIcone: React.FC<CorpoProps<ElementoIcone>> = ({ el, local, k, p }) => {
  const boia = Math.sin(local / 18) * 7 * k;
  const palavras = el.titulo ? semMarcas(el.titulo).length : 0;
  const tam = Math.min(170, 900 / Math.max(palavras * 0.42, 1));
  return (
    <>
      <Kicker texto={el.kicker} k={k} p={p} />
      <div style={{ transform: `translateY(${boia}px)` }}>
        {el.imagem ? (
          <ImagemElemento src={el.imagem} tam={(el.titulo ? 430 : 520) * k} local={local} />
        ) : (
          <IconeAnimado nome={el.icone ?? "estrela"} tam={(el.titulo ? 380 : 470) * k} local={local} />
        )}
      </div>
      {el.titulo ? (
        <div
          style={{
            marginTop: 26 * k,
            fontFamily: fonts.titulo,
            fontSize: tam * k,
            color: colors.branco,
            letterSpacing: 2 * k,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          <Revela p={outExpo(interpolate(local, [6, 18], [0, 1], clamp))}>
            <Rico texto={el.titulo} />
          </Revela>
        </div>
      ) : null}
    </>
  );
};

const CorpoTitulo: React.FC<CorpoProps<ElementoTitulo>> = ({ el, local, k, p }) => {
  const maior = Math.max(...el.linhas.map((l) => semMarcas(l).length), 1);
  const tam = Math.min(250, 960 / (maior * 0.42));
  return (
    <>
      <Kicker texto={el.kicker} k={k} p={p} />
      {el.linhas.map((l, i) => (
        <div
          key={i}
          style={{
            fontFamily: fonts.titulo,
            fontSize: tam * k,
            color: colors.branco,
            letterSpacing: 2 * k,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          <Revela p={outExpo(interpolate(local, [2 + i * 5, 16 + i * 5], [0, 1], clamp))}>
            <Rico texto={l} />
          </Revela>
        </div>
      ))}
    </>
  );
};

const CorpoNumero: React.FC<CorpoProps<ElementoNumero>> = ({ el, local, k, p }) => {
  const v = Math.round(el.valor * outExpo(interpolate(local, [2, 28], [0, 1], clamp)));
  const texto = `${el.prefixo ?? ""}${v.toLocaleString("pt-BR")}${el.sufixo ?? ""}`;
  const tam = Math.min(420, 980 / (texto.length * 0.45));
  return (
    <>
      <Kicker texto={el.kicker} k={k} p={p} />
      <div
        style={grad({
          fontFamily: fonts.titulo,
          fontSize: tam * k,
          lineHeight: 0.95,
          letterSpacing: 3 * k,
          filter: "drop-shadow(0 0 26px rgba(216,171,73,0.25))",
        })}
      >
        {texto}
      </div>
      {el.rotulo ? (
        <div
          style={{
            marginTop: 8 * k,
            fontFamily: fonts.titulo,
            fontSize: 104 * k,
            color: colors.branco,
            letterSpacing: 2 * k,
            opacity: interpolate(local, [10, 22], [0, 1], clamp),
            whiteSpace: "nowrap",
          }}
        >
          <Rico texto={el.rotulo} />
        </div>
      ) : null}
    </>
  );
};

const CorpoLista: React.FC<CorpoProps<ElementoLista>> = ({ el, local, k, p }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <Kicker texto={el.kicker} k={k} p={p} />
      <div style={{ display: "flex", flexDirection: "column", gap: 22 * k }}>
        {el.itens.map((it, i) => {
          const texto = typeof it === "string" ? it : it.texto;
          const ini = typeof it === "string" ? 4 + i * 9 : Math.round((it.em - el.de) * fps);
          const t = local - ini; // quadros desde que o item entrou
          if (t < 0) return <div key={i} style={{ height: 120 * k }} />;
          // entra em escala, passa um pouco do tamanho e assenta (bounce)
          const esc = spring({ frame: t, fps, config: { damping: 8, stiffness: 190, mass: 0.6 } });
          const op = interpolate(t, [0, 4], [0, 1], clamp);
          // o check dá pulinhos que vão diminuindo (2 pulos)
          const u = interpolate(t, [3, 27], [0, 1], clamp);
          const pulo = -Math.abs(Math.sin(u * Math.PI * 2)) * 26 * k * (1 - u);
          const escCheck = spring({ frame: Math.max(0, t - 3), fps, config: { damping: 7, stiffness: 220, mass: 0.5 } });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 26 * k,
                height: 120 * k,
                opacity: op,
                transform: `scale(${0.35 + 0.65 * esc})`,
                transformOrigin: "left center",
              }}
            >
              <div
                style={{
                  width: 70 * k,
                  height: 70 * k,
                  transform: `translateY(${pulo}px) scale(${0.3 + 0.7 * escCheck})`,
                }}
              >
                <IconeAnimado nome="check" tam={70 * k} local={t + 6} />
              </div>
              <div
                style={{
                  fontFamily: fonts.titulo,
                  fontSize: 112 * k,
                  lineHeight: `${120 * k}px`,
                  color: colors.branco,
                  letterSpacing: 2 * k,
                  whiteSpace: "nowrap",
                }}
              >
                <Rico texto={texto} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

/**
 * Um elemento animado no painel de cima. Entra rápido (expo), fica, sai curto (sobe e some com leve desfoque).
 * Só UM por vez: o principal manda. `local` = quadros desde `de`.
 */
export const ElementoPainel: React.FC<{ el: Elemento; escala?: number }> = ({
  el,
  escala = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const k = (width / 1080) * escala;
  const ini = Math.round(el.de * fps);
  const fim = Math.round(el.ate * fps);
  const local = frame - ini;
  if (frame < ini || frame >= fim) return null;
  const p = outExpo(interpolate(local, [0, ENTRADA], [0, 1], clamp));
  const q = inCubic(interpolate(frame, [fim - SAIDA, fim], [0, 1], clamp));
  const props = { local, k, p };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: p * (1 - q),
        transform: `translateY(${(1 - p) * 70 * k - q * 40 * k}px) scale(${0.94 + 0.06 * p})`,
        filter: `drop-shadow(0 3px 14px rgba(0,0,0,0.55))${q > 0 ? ` blur(${q * 7}px)` : ""}`,
      }}
    >
      {el.tipo === "icone" && <CorpoIcone el={el} {...props} />}
      {el.tipo === "titulo" && <CorpoTitulo el={el} {...props} />}
      {el.tipo === "numero" && <CorpoNumero el={el} {...props} />}
      {el.tipo === "lista" && <CorpoLista el={el} {...props} />}
    </div>
  );
};
