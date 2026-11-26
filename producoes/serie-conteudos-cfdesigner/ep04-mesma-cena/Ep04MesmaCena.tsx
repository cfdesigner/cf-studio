// PRODUÇÃO: Episódio 04 "Mesma cena" (Reels 21,4 s, CFDesigner, look Âmbar Cinema). 100 BPM: o primeiro kick da música cai em 9,2 s.
// Arquivos de entrada (ignorados pelo Git) em public/entrada/canajure/: cena-bruto-full.mp4 (visual cinza) e cena-ambar-full.mp4 (com o look), 30,7 s cada.
// O vídeo sai sem áudio; a narração (e, se pedido, música e efeitos) é mixada por producoes/serie-conteudos-cfdesigner/ep04-mesma-cena/mixar.py.
import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  colors,
  EtiquetaRotulo,
  FechoSimples,
  FundoCF,
  LinhaChamada,
  LinhasDeSom,
  VarreduraAmbar,
  VeuDeLuz,
  WipeReveal,
} from "../../../design-systems/cfdesigner";
import { fontFamilies } from "../../../design-systems/cfdesigner/tokens";

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
export const EP04_FRAMES = f(21.4);

const c = colors.cinema;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ORIGEM = { x: 540, y: 0.72 * 1920 }; // ponto fixo do zoom (perto do personagem)

type Entrada = "corte" | "fade" | "wipe-direita" | "wipe-cima" | "varredura";
/** Trecho da cena. `ini` = segundo da cena original. `zoom`: aproximação até `pico` em `tPico` s e afastamento até o fim (plano contínuo). */
type Plano = {
  de: number;
  ate: number;
  arq: "bruto" | "ambar";
  ini: number;
  zoom?: number; // zoom fixo
  vaiVem?: { pico: number; tPico: number };
  entra?: Entrada;
};

// Sem braços levantados (pedido do dono). Ritmo: um plano contínuo com zoom que vai e volta. Cor: OUTRO momento da cena, sem zoom,
// com a varredura âmbar na entrada. Som: 3 planos iguais de 1,4 s (2 cortes secos). Transições entre as etapas.
const PLANOS: Plano[] = [
  { de: 0, ate: 2.6, arq: "ambar", ini: 1.2 }, // gancho: ele vira de perfil para as costas, já com o look
  { de: 2.6, ate: 5.6, arq: "bruto", ini: 9.0, entra: "fade" }, // bruto: parado, sem cortes ("sem vida")
  { de: 5.6, ate: 9.2, arq: "bruto", ini: 13.2, vaiVem: { pico: 1.3, tPico: 1.8 } }, // ritmo: plano contínuo (entra com light leak)
  { de: 9.2, ate: 12.2, arq: "ambar", ini: 4.4, entra: "varredura" }, // cor: outro momento (ele gira), sem zoom
  { de: 12.2, ate: 13.6, arq: "ambar", ini: 17.0, entra: "fade" }, // som: fusão suave de entrada, depois 2 cortes secos, planos iguais
  { de: 13.6, ate: 15.0, arq: "ambar", ini: 0.0, zoom: 1.35 },
  { de: 15.0, ate: 16.4, arq: "ambar", ini: 18.6 },
  { de: 16.4, ate: 19.4, arq: "ambar", ini: 27.7, entra: "wipe-cima" }, // resultado: ele vindo para a câmera (aprovado)
];

const FADE = 9; // quadros de cada fusão (0,3 s)

/** Escala do zoom em um plano contínuo: sobe até o pico e volta a 1 (suave). */
const escalaVaiVem = (fr: number, dur: number, v: { pico: number; tPico: number }) =>
  interpolate(fr, [0, f(v.tPico), dur], [1, v.pico, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });

const Camada: React.FC<{ p: Plano; dur: number; extra?: number }> = ({ p, dur, extra = 0 }) => {
  const fr = useCurrentFrame();
  const s = p.vaiVem ? escalaVaiVem(fr - extra, dur, p.vaiVem) : (p.zoom ?? 1);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#000" }}>
      <AbsoluteFill style={s !== 1 ? { transform: `scale(${s})`, transformOrigin: "50% 72%" } : undefined}>
        <OffthreadVideo src={staticFile(`entrada/canajure/cena-${p.arq}-full.mp4`)} startFrom={Math.max(0, f(p.ini) - extra)} muted />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const WIPE = 14; // quadros da cortina
const VARRE = 16; // quadros da varredura âmbar

const PlanoComEntrada: React.FC<{ p: Plano; prolonga?: number }> = ({ p, prolonga = 0 }) => {
  const dur = f(p.ate - p.de);
  if (p.entra === "fade") {
    // a fusão começa um pouco antes do corte, por cima do plano anterior
    return (
      <Sequence from={f(p.de) - FADE} durationInFrames={dur + FADE + prolonga}>
        <FadeIn>
          <Camada p={p} dur={dur} extra={FADE} />
        </FadeIn>
      </Sequence>
    );
  }
  if (p.entra === "wipe-direita" || p.entra === "wipe-cima") {
    return (
      <Sequence from={f(p.de)} durationInFrames={dur}>
        <WipeReveal direction={p.entra === "wipe-direita" ? "right" : "up"} durationInFrames={WIPE}>
          <Camada p={p} dur={dur} />
        </WipeReveal>
      </Sequence>
    );
  }
  if (p.entra === "varredura") {
    return (
      <Sequence from={f(p.de)} durationInFrames={dur}>
        <VarreduraAmbar durationInFrames={VARRE}>
          <Camada p={p} dur={dur} />
        </VarreduraAmbar>
      </Sequence>
    );
  }
  // se o próximo plano entra por cortina ou varredura, este continua por baixo até ela terminar
  return (
    <Sequence from={f(p.de)} durationInFrames={dur + prolonga}>
      <Camada p={p} dur={dur} />
    </Sequence>
  );
};

const FadeIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const fr = useCurrentFrame();
  return <AbsoluteFill style={{ opacity: interpolate(fr, [0, FADE], [0, 1], clamp) }}>{children}</AbsoluteFill>;
};

/** Texto no alto, entre o personagem e as folhas: uma linha grande e uma pequena e branca. */
const TextoAlto: React.FC<{
  durationInFrames: number;
  grande: React.ReactNode;
  pequena: string;
  tamanho: number;
  pequenaEmCima?: boolean;
}> = ({ durationInFrames, grande, pequena, tamanho, pequenaEmCima }) => {
  const fr = useCurrentFrame();
  const opacity =
    interpolate(fr, [0, 6], [0, 1], clamp) * interpolate(fr, [durationInFrames - 5, durationInFrames], [1, 0], clamp);
  const sombra = "0 4px 24px rgba(0,0,0,0.45)";
  const g = (
    <div style={{ fontFamily: fontFamilies.display, fontSize: tamanho, lineHeight: 0.95, letterSpacing: "0.02em", color: c.ink, textShadow: sombra }}>
      {grande}
    </div>
  );
  const pq = (
    <div style={{ fontFamily: fontFamilies.display, fontSize: 64, lineHeight: 1, letterSpacing: "0.14em", color: c.ink, opacity: 0.92, textShadow: sombra }}>
      {pequena}
    </div>
  );
  return (
    <AbsoluteFill style={{ opacity, alignItems: "center", top: 500, height: 340, justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
        {pequenaEmCima ? pq : g}
        {pequenaEmCima ? g : pq}
      </div>
    </AbsoluteFill>
  );
};

/** Linha de chamada que acompanha o zoom: aponta para a cintura dele (nunca para o rosto). `offset` = quadros já passados do plano. */
const LinhaSeguindo: React.FC<{
  durationInFrames: number;
  vaiVem?: { pico: number; tPico: number };
  offset?: number;
  total?: number;
}> = ({ durationInFrames, vaiVem, offset = 0, total }) => {
  const fr = useCurrentFrame();
  const s = vaiVem ? escalaVaiVem(fr + offset, total ?? durationInFrames, vaiVem) : 1;
  const alvo = (x: number, y: number) => ({ x: ORIGEM.x + s * (x - ORIGEM.x), y: ORIGEM.y + s * (y - ORIGEM.y) });
  const centro = alvo(548, 1310);
  const ponto = alvo(520, 1262);
  return (
    <LinhaChamada
      anel={{ x: centro.x, y: centro.y, r: 46 * s }}
      pontos={[{ x: 330, y: 770 }, ponto]}
      entra={4}
      duracao={12}
      sai={durationInFrames - 5}
    />
  );
};

/** `atraso` (s): a etiqueta entra depois do começo do plano (ex.: na palavra falada, e fora do light leak). */
const Etiqueta: React.FC<{ icone: "ritmo" | "cor"; rotulo: string; plano: Plano; atraso?: number }> = ({ icone, rotulo, plano, atraso = 0 }) => {
  const total = f(plano.ate - plano.de);
  const dur = total - f(atraso);
  return (
    <Sequence from={f(plano.de) + f(atraso)} durationInFrames={dur}>
      <EtiquetaRotulo icone={icone} rotulo={rotulo} esquerda={96} topo={650} escala={1.25} sai={dur - 5} />
      <LinhaSeguindo durationInFrames={dur} vaiVem={plano.vaiVem} offset={f(atraso)} total={total} />
    </Sequence>
  );
};

export const Ep04MesmaCena: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    {PLANOS.map((p, i) => (
      <PlanoComEntrada key={p.de} p={p} prolonga={PLANOS[i + 1]?.entra === "varredura" ? VARRE : PLANOS[i + 1]?.entra?.startsWith("wipe") ? WIPE : 0} />
    ))}

    {/* Gancho */}
    <Sequence from={0} durationInFrames={f(2.6)}>
      <TextoAlto
        durationInFrames={f(2.6)}
        tamanho={190}
        grande={<>MESMA <span style={{ color: c.amber }}>CENA</span></>}
        pequena="3 MUDANÇAS"
      />
    </Sequence>

    {/* Etapas: ritmo (bruto) e cor (virada com a varredura âmbar em 9,2 s, no primeiro kick da música) */}
    <Etiqueta icone="ritmo" rotulo="Ritmo" plano={PLANOS[2]} atraso={0.6} />
    {/* Véu de luz esbranquiçado cobrindo o corte do bruto para o ritmo (pico no corte, 5,6 s); a etiqueta só entra depois */}
    <Sequence from={f(5.6) - 10} durationInFrames={28}>
      <VeuDeLuz durationInFrames={28} quadroPico={10} />
    </Sequence>
    <Etiqueta icone="cor" rotulo="Cor" plano={PLANOS[3]} />

    {/* Som: a caixinha gira de um lado ao outro durante toda a etapa */}
    <Sequence from={f(12.2)} durationInFrames={f(4.2)}>
      <LinhasDeSom
        durationInFrames={f(4.2)}
        esquerda={150}
        topo={465}
        escala={1.5}
        trilha={330}
        alturaFaixa={26}
        giroDe={32}
        giroAte={-32}
        faixas={[
          { nome: "Voz", cor: "petroleo", segmentos: [{ deMs: 440, ateMs: 1300 }] },
          { nome: "Ambiente", cor: "ambar", segmentos: [{ deMs: 0, ateMs: 4200 }] },
          {
            nome: "Whoosh",
            cor: "ambar",
            segmentos: [
              { deMs: 0, ateMs: 250 },
              { deMs: 1150, ateMs: 1400 },
              { deMs: 2550, ateMs: 2800 },
            ],
          },
          { nome: "Impacto", cor: "ambar", segmentos: [{ deMs: 2900, ateMs: 3700 }] },
          { nome: "Tique", cor: "petroleo", segmentos: [{ deMs: 3000, ateMs: 3120 }] },
        ]}
      />
    </Sequence>

    {/* Resultado */}
    <Sequence from={f(16.4)} durationInFrames={f(3.0)}>
      <TextoAlto
        durationInFrames={f(3.0)}
        tamanho={150}
        pequenaEmCima
        pequena="MESMA CENA"
        grande={<>QUAL MUDOU <span style={{ color: c.amber }}>MAIS?</span></>}
      />
    </Sequence>

    {/* Fecho: fusão com um fundo do design system (pontos: bolinhas com uma onda de luz saindo do centro, escolha do dono) */}
    <Sequence from={f(19.4) - FADE} durationInFrames={f(2.0) + FADE}>
      <FadeIn>
        <FechoSimples durationInFrames={f(2.0) + FADE} fundo={<FundoCF variante="pontos" foco={{ x: 0.5, y: 0.5 }} duracao={f(2.0) + FADE} />} />
      </FadeIn>
    </Sequence>
  </AbsoluteFill>
);
