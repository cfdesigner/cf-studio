import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { Logo, fontFamilies, imagery } from "../../design-systems/cfdesigner";
import "../../design-systems/cfdesigner/fonts";
import euFrente from "./assets/eu-frente.png";
import euBaixo from "./assets/eu-baixo.png";
import euPerfilDir from "./assets/eu-perfil-dir.png";
import euPerfilEsq from "./assets/eu-perfil-esq.png";
import euCapa from "./assets/eu-capa.png";
import euFala from "./assets/eu-fala.png";
import fotoEscritorio from "./assets/foto-escritorio.jpg";
import fotoLivro from "./assets/foto-livro.jpg";
import fotoNotebook from "./assets/foto-notebook.jpg";

/**
 * Carrossel PANORAMA: fundo branco, âmbar no lugar do petróleo, e elementos que atravessam de um slide para o outro.
 * Cada slide é uma "janela" de 1080 px sobre uma tela contínua de 8640 px. v=1 Sol, v=2 Fita, v=3 Linha do tempo.
 */
const W = 1080;
const H = 1350;
const N = 8;
const AM = "#d9a441";
const INK = "#0b0c0e";
const MUT = "#545c66";
const LINE = "#e3e5e8";
const GHOST = "rgba(217,164,65,0.16)";
const X = (i: number) => (i - 1) * W;

const abs = (s: React.CSSProperties): React.CSSProperties => ({ position: "absolute", ...s });

const Marca: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ background: AM, color: INK, padding: "0 16px 4px", borderRadius: 16, display: "inline-block", lineHeight: 1.08 }}>{children}</span>
);

const Titulo: React.FC<{ linhas: React.ReactNode[]; size: number }> = ({ linhas, size }) => (
  <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: size, lineHeight: 1.12, letterSpacing: "-0.02em", color: INK }}>
    {linhas.map((l, i) => <div key={i}>{l}</div>)}
  </div>
);

const Etiq: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 18, letterSpacing: "0.32em", textTransform: "uppercase", color: MUT, marginBottom: 26 }}>{children}</div>
);

const Ghost: React.FC<{ t: string; size: number; style: React.CSSProperties }> = ({ t, size, style }) => (
  <div style={abs({ fontFamily: fontFamilies.display, fontSize: size, lineHeight: 0.8, letterSpacing: "0.02em", color: GHOST, whiteSpace: "nowrap", textTransform: "uppercase", ...style })}>{t}</div>
);

const Apoio: React.FC<{ children: React.ReactNode; style: React.CSSProperties }> = ({ children, style }) => (
  <div style={abs({ fontFamily: fontFamilies.body, fontSize: 28, lineHeight: 1.4, color: MUT, ...style })}>{children}</div>
);

const Card: React.FC<{ src: string; pos?: string; cx: number; cy: number; w: number; h: number; rot: number; persp?: number }> = ({ src, pos = "50% 50%", cx, cy, w, h, rot, persp = -12 }) => (
  <div style={abs({ left: cx - w / 2, top: cy - h / 2, width: w, height: h, borderRadius: 22, overflow: "hidden", boxShadow: "0 40px 70px rgba(11,12,14,0.28)", transform: `perspective(1600px) rotateY(${persp}deg) rotate(${rot}deg)` })}>
    <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos }} />
  </div>
);

const Eu: React.FC<{ src: string; left: number; h: number; bottom?: number; flip?: boolean }> = ({ src, left, h, bottom = 0, flip }) => (
  <Img src={src} style={abs({ left, bottom, height: h, width: h * 0.8, transform: flip ? "scaleX(-1)" : undefined })} />
);

const Fita: React.FC<{ cx: number; cy: number; w: number; rot: number }> = ({ cx, cy, w, rot }) => (
  <div style={abs({ left: cx - w / 2, top: cy - 35, width: w, height: 70, background: AM, color: INK, display: "flex", alignItems: "center", overflow: "hidden", whiteSpace: "nowrap", fontFamily: fontFamilies.display, fontSize: 42, letterSpacing: "0.12em", transform: `rotate(${rot}deg)` })}>
    {Array.from({ length: 6 }).map((_, i) => <span key={i} style={{ marginRight: 30 }}>ROTEIRO · STORYBOARD · EDIÇÃO · SOM · FECHO ·</span>)}
  </div>
);

const Onda: React.FC<{ x0: number; yc: number; cor?: string; n?: number; alt?: number }> = ({ x0, yc, cor = INK, n = 38, alt = 150 }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const h = 40 + Math.abs(Math.sin(i * 0.7)) * alt + Math.abs(Math.sin(i * 1.9)) * (alt * 0.45);
      return <div key={i} style={abs({ left: x0 + i * 34, top: yc - h / 2, width: 22, height: h, borderRadius: 6, background: i > n * 0.72 ? AM : cor })} />;
    })}
  </>
);

const Passos = ["Roteiro", "Storyboard", "Edição", "Som", "Fecho"];
const Regras = ["Gancho em até 6 palavras", "Frases curtas, com ritmo de corte", "Número concreto, não adjetivo"];

const ListaPassos: React.FC<{ left: number; top: number; gap?: number }> = ({ left, top, gap = 100 }) => (
  <div style={abs({ left, top })}>
    {Passos.map((p, i) => (
      <div key={p} style={{ display: "flex", alignItems: "center", gap: 22, height: gap }}>
        <div style={{ width: 56, height: 56, borderRadius: 28, background: AM, color: INK, fontFamily: fontFamilies.mono, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{String(i + 1).padStart(2, "0")}</div>
        <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 38, color: INK }}>{p}</div>
      </div>
    ))}
  </div>
);

const ListaRegras: React.FC<{ left: number; top: number; width: number; gap?: number }> = ({ left, top, width, gap = 130 }) => (
  <div style={abs({ left, top, width })}>
    {Regras.map((r) => (
      <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: 24, minHeight: gap }}>
        <div style={{ width: 20, height: 20, background: AM, transform: "rotate(45deg)", marginTop: 12, flex: "none" }} />
        <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 34, lineHeight: 1.22, color: INK }}>{r}</div>
      </div>
    ))}
  </div>
);

const Chips: React.FC<{ left: number; top: number }> = ({ left, top }) => (
  <div style={abs({ left, top, display: "flex", gap: 14 })}>
    {["Voz", "Música", "Efeitos · 12 dB abaixo"].map((x, i) => (
      <div key={x} style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 24, padding: "16px 28px", borderRadius: 999, background: i === 2 ? AM : "#fff", color: INK, border: `1px solid ${i === 2 ? AM : "#cfd3d8"}` }}>{x}</div>
    ))}
  </div>
);

const Cta: React.FC<{ left: number; top: number }> = ({ left, top }) => (
  <>
    <div style={abs({ left, top, background: AM, color: INK, fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 32, padding: "26px 54px", borderRadius: 999 })}>Chame no direct  →</div>
    <Apoio style={{ left, top: top + 112, fontSize: 26 }}>e conte a sua ideia</Apoio>
  </>
);

/** Textos de cada slide (em coordenadas do slide). */
const Textos: React.FC<{ i: number; v: number }> = ({ i, v }) => {
  const L = X(i);
  const tit = (etq: string, linhas: React.ReactNode[], size = 104) => (
    <div style={abs({ left: L + 88, top: 190 })}>
      <Etiq>{etq}</Etiq>
      <Titulo linhas={linhas} size={size} />
    </div>
  );
  if (i === 1) return (
    <>
      <div style={abs({ left: L + 88, top: 190 })}>
        <Etiq>Produção completa</Etiq>
        <Titulo linhas={[<>Vídeo com <Marca>IA</Marca></>]} size={128} />
        <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 40, color: MUT, marginTop: 26 }}>do roteiro ao fecho</div>
      </div>
    </>
  );
  if (i === 2) return (<>{tit("O ponto", ["IA gera clipe,", "filme exige", <Marca key="m">método</Marca>])}<Apoio style={{ left: L + 88, top: v === 2 ? 700 : 660, width: 300 }}>Cada etapa tem uma regra</Apoio></>);
  if (i === 3) return (<>{tit("O método", ["Cinco", <Marca key="m">etapas</Marca>], 112)}{v === 1 && <ListaPassos left={L + 540} top={600} />}{v === 2 && <ListaPassos left={L + 88} top={570} gap={76} />}</>);
  if (i === 4) return (<>{tit("01 · Roteiro", ["Uma ideia", <>por <Marca>frase</Marca></>], 112)}{v !== 3 && <ListaRegras left={L + 88} top={v === 1 ? 600 : 600} width={v === 1 ? 480 : 520} />}</>);
  if (i === 5) return (<>{tit("02 · Storyboard", ["Antes de gerar,", <Marca key="m">desenhe</Marca>])}<Apoio style={{ left: L + 88, top: 580, width: 520, fontSize: 26 }}>Quadros, linha do tempo e o som de cada trecho</Apoio></>);
  if (i === 6) return (<>{tit("03 · Edição", ["A emoção está", <>no <Marca>ritmo</Marca></>])}<Apoio style={{ left: L + (v === 1 ? 390 : 88), top: v === 1 ? 720 : 590, width: v === 1 ? 330 : 560, fontSize: 26 }}>Corte seco, fade curto, nada sobrando</Apoio></>);
  if (i === 7) return (<>{tit("04 · Som", ["Som baixo,", <>sem <Marca>clique</Marca></>], 112)}{v === 1 && <Chips left={L + 88} top={1110} />}{v === 2 && <Chips left={L + 88} top={590} />}</>);
  return (
    <>
      {tit("05 · Fecho", ["Seu vídeo", <>com <Marca>IA</Marca></>], 120)}
      {v !== 3 && <Cta left={L + 88} top={640} />}
    </>
  );
};

/** Tela contínua de cada versão. */
const PalcoSol: React.FC = () => (
  <>
    <Ghost t="5" size={1000} style={{ left: X(3) + 700, top: 330 }} />
    <div style={abs({ left: 1010 - 500, top: 930 - 500, width: 1000, height: 1000, borderRadius: 500, background: AM })} />
    <Eu src={euFrente} left={140} h={1000} />
    <Card src={imagery.studioSetup} pos="38% 50%" cx={2160} cy={960} w={780} h={450} rot={-4} />
    <Fita cx={3240} cy={1170} w={1900} rot={-5} />
    <Card src={imagery.timelineCloseup} pos="35% 50%" cx={4320} cy={940} w={800} h={460} rot={3} persp={-10} />
    <div style={abs({ left: 5400 - 300 + 38, top: 980 - 300 + 30, width: 600, height: 600, borderRadius: 300, border: `3px solid ${AM}` })} />
    <div style={abs({ left: 5400 - 300, top: 980 - 300, width: 600, height: 600, borderRadius: 300, overflow: "hidden", boxShadow: "0 30px 60px rgba(11,12,14,0.25)" })}>
      <Img src={imagery.studioSetup} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "36% 50%" }} />
    </div>
    <Onda x0={6140} yc={960} />
    <div style={abs({ left: X(8) + 700 - 450, top: 1130 - 450, width: 900, height: 900, borderRadius: 450, background: AM })} />
    <Eu src={euPerfilEsq} left={X(8) + 1120 - 690} h={860} />
    <div style={abs({ left: X(8) + 88, top: 900, width: 190, height: 190, borderRadius: 95, background: INK, display: "flex", alignItems: "center", justifyContent: "center" })}>
      <Logo layout="symbol" finish="metal" height={110} />
    </div>
  </>
);

/** Versão 4: estrutura do Sol com as fotos reais do dono. */
const PalcoFotos: React.FC = () => (
  <>
    <Ghost t="5" size={1000} style={{ left: X(3) + 700, top: 330 }} />
    <div style={abs({ left: 1010 - 500, top: 930 - 500, width: 1000, height: 1000, borderRadius: 500, background: AM })} />
    <Img src={euCapa} style={abs({ left: 250, bottom: 0, height: 940, width: 940 * (1086 / 1702) })} />
    <Card src={fotoNotebook} pos="50% 62%" cx={2160} cy={960} w={780} h={450} rot={-4} />
    <Fita cx={3240} cy={1170} w={1900} rot={-5} />
    <Card src={fotoLivro} pos="50% 33%" cx={4500} cy={940} w={800} h={460} rot={3} persp={-10} />
    <div style={abs({ left: 5400 - 300 + 38, top: 920 - 300 + 30, width: 600, height: 600, borderRadius: 300, border: `3px solid ${AM}` })} />
    <div style={abs({ left: 5400 - 300, top: 920 - 300, width: 600, height: 600, borderRadius: 300, overflow: "hidden", boxShadow: "0 30px 60px rgba(11,12,14,0.25)" })}>
      <Img src={fotoEscritorio} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(2.3)", transformOrigin: "70% 37%" }} />
    </div>
    <Onda x0={6140} yc={960} />
    <div style={abs({ left: X(8) + 700 - 450, top: 1130 - 450, width: 900, height: 900, borderRadius: 450, background: INK })} />
    <Img src={euFala} style={abs({ left: X(8) + 1110 - 900 * (768 / 1102) , bottom: 0, height: 900, width: 900 * (768 / 1102) })} />
    <div style={abs({ left: X(8) + 88, top: 900, width: 190, height: 190, borderRadius: 95, background: INK, display: "flex", alignItems: "center", justifyContent: "center" })}>
      <Logo layout="symbol" finish="metal" height={110} />
    </div>
  </>
);

const caminho = () => {
  const pts: string[] = [];
  for (let x = -100; x <= W * N + 100; x += 40) {
    const y = 1090 + 70 * Math.sin((x / 1700) * Math.PI) + 30 * Math.sin((x / 540) * Math.PI);
    pts.push(`${pts.length ? "L" : "M"} ${x} ${Math.round(y)}`);
  }
  return pts.join(" ");
};

const PalcoFita: React.FC = () => (
  <>
    <svg width={W * N} height={H} style={abs({ left: 0, top: 0 })}>
      <path id="fita" d={caminho()} fill="none" stroke={AM} strokeWidth={96} strokeLinejoin="round" />
      <path id="fitaTxt" d={caminho()} fill="none" />
      <text fontFamily={fontFamilies.display} fontSize={46} letterSpacing={6} fill={INK}>
        <textPath href="#fitaTxt" startOffset="0">
          {"ROTEIRO · STORYBOARD · EDIÇÃO · SOM · FECHO · ".repeat(30)}
        </textPath>
      </text>
    </svg>
    <Eu src={euFrente} left={220} h={1000} />
    <Eu src={euPerfilDir} left={X(2) + 420} h={700} />
    <Eu src={euBaixo} left={X(3) + 470} h={620} />
    <Card src={imagery.timelineCloseup} pos="35% 50%" cx={4320} cy={1010} w={800} h={430} rot={3} persp={-10} />
    <div style={abs({ left: X(6) + 640 - 310, top: 1000 - 310, width: 620, height: 620, borderRadius: 310, overflow: "hidden", boxShadow: "0 30px 60px rgba(11,12,14,0.3)", border: "8px solid #fff" })}>
      <Img src={imagery.studioSetup} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "36% 50%" }} />
    </div>
    <Onda x0={X(7) + 40} yc={860} n={29} alt={130} />
    <Eu src={euFrente} left={X(8) + 520} h={780} />
    <div style={abs({ left: X(8) + 88, top: 940, width: 170, height: 170, borderRadius: 85, background: INK, display: "flex", alignItems: "center", justifyContent: "center" })}>
      <Logo layout="symbol" finish="metal" height={100} />
    </div>
  </>
);

/** Linha do tempo: trilhas contínuas com clipes que atravessam os slides. */
const Clip: React.FC<{ x: number; y: number; w: number; h?: number; cor?: string; txt?: string; children?: React.ReactNode }> = ({ x, y, w, h = 128, cor = AM, txt, children }) => (
  <div style={abs({ left: x, top: y, width: w, height: h, borderRadius: 16, background: cor, overflow: "hidden", display: "flex", alignItems: "center", boxShadow: "0 12px 26px rgba(11,12,14,0.14)" })}>
    {children}
    {txt && <span style={{ position: "relative", marginLeft: 26, fontFamily: fontFamilies.display, fontSize: 46, letterSpacing: "0.1em", color: cor === INK ? "#fff" : INK }}>{txt}</span>}
  </div>
);

const PalcoTempo: React.FC = () => (
  <>
    <div style={abs({ left: 0, top: 792, width: W * N, height: 2, background: LINE })} />
    {Array.from({ length: 8 * 18 + 1 }, (_, i) => (
      <div key={i} style={abs({ left: i * 60, top: i % 3 === 0 ? 770 : 780, width: 2, height: i % 3 === 0 ? 22 : 12, background: i % 3 === 0 ? "#b9bec5" : LINE })} />
    ))}
    {/* trilha A: etapas */}
    <Clip x={60} y={830} w={1500} txt="ROTEIRO" />
    <Clip x={1580} y={830} w={1500} cor={INK} txt="STORYBOARD" />
    <Clip x={3100} y={830} w={1700} txt="EDIÇÃO" />
    <Clip x={4820} y={830} w={1500} cor={INK} txt="SOM" />
    <Clip x={6340} y={830} w={2200} txt="FECHO" />
    {/* trilha B: imagens */}
    <Clip x={300} y={990} w={620} cor="#eceef0">
      <Img src={euFrente} style={{ width: 620, height: 128 * 5, objectFit: "cover", objectPosition: "50% 6%", marginTop: -70 }} />
    </Clip>
    <Clip x={940} y={990} w={1500} cor="#eceef0"><Img src={imagery.studioSetup} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "40% 50%" }} /></Clip>
    <Clip x={2460} y={990} w={620} cor="#eceef0">
      <Img src={euPerfilDir} style={{ width: 620, height: 128 * 5, objectFit: "cover", objectPosition: "40% 8%", marginTop: -40 }} />
    </Clip>
    <Clip x={3100} y={990} w={1800} cor="#eceef0"><Img src={imagery.timelineCloseup} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></Clip>
    <Clip x={4920} y={990} w={620} cor="#eceef0">
      <Img src={euBaixo} style={{ width: 620, height: 128 * 5, objectFit: "cover", objectPosition: "50% 8%", marginTop: -50 }} />
    </Clip>
    <Clip x={5560} y={990} w={1500} cor="#eceef0"><Img src={imagery.studioSetup} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% 50%" }} /></Clip>
    <Clip x={7080} y={990} w={620} cor="#eceef0">
      <Img src={euPerfilEsq} style={{ width: 620, height: 128 * 5, objectFit: "cover", objectPosition: "60% 8%", marginTop: -40 }} />
    </Clip>
    {/* trilha C: áudio */}
    <Onda x0={5000} yc={1190} n={70} alt={40} />
    {/* pessoa saindo do clipe de abertura */}
    <Eu src={euFrente} left={X(1) + 600} h={470} bottom={H - 830 - 5} />
    <Eu src={euPerfilEsq} left={X(8) + 600} h={470} bottom={H - 830 - 5} />
  </>
);

/** Elementos fixos da versão 3 em cada slide: lista e playhead locais. */
const ExtraTempo: React.FC<{ i: number }> = ({ i }) => {
  const L = X(i);
  return (
    <>
      {i === 3 && (
        <div style={abs({ left: L + 88, top: 590, display: "flex", flexWrap: "wrap", gap: 14, width: 900 })}>
          {Passos.map((p, k) => (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", border: `1px solid #cfd3d8`, borderRadius: 999, padding: "10px 24px 10px 10px" }}>
              <div style={{ width: 44, height: 44, borderRadius: 22, background: AM, fontFamily: fontFamilies.mono, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{String(k + 1).padStart(2, "0")}</div>
              <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 28, color: INK }}>{p}</div>
            </div>
          ))}
        </div>
      )}
      {i === 4 && <ListaRegras left={L + 88} top={590} width={900} gap={62} />}
      {i === 7 && <Chips left={L + 88} top={1235 - 1235 + 600} />}
      {i === 8 && <Cta left={L + 88} top={600} />}
    </>
  );
};

export const CarrosselPanorama: React.FC<{ n: number; v: number }> = ({ n, v }) => {
  const i = Math.min(Math.max(n, 1), N);
  const Palco = v === 1 ? PalcoSol : v === 2 ? PalcoFita : v === 4 ? PalcoFotos : PalcoTempo;
  const vt = v === 4 ? 1 : v;
  return (
    <AbsoluteFill style={{ background: "#ffffff", overflow: "hidden" }}>
      <div style={abs({ left: -X(i), top: 0, width: W * N, height: H })}>
        {vt === 1 && <Ghost t="Frase" size={470} style={{ left: X(4) - 10, top: 1000 }} />}
        {vt === 2 && <Ghost t="Método" size={420} style={{ left: X(2) - 10, top: 1000 }} />}
        <Palco />
        {Array.from({ length: N }, (_, k) => k + 1).filter((k) => k === i).map((k) => (
          <React.Fragment key={k}>
            <Textos i={k} v={vt} />
            {v === 3 && <ExtraTempo i={k} />}
          </React.Fragment>
        ))}
      </div>
      {v === 3 && (
        <>
          <div style={abs({ left: 540, top: 790, width: 3, height: 440, background: INK })} />
          <div style={abs({ left: 528, top: 768, width: 27, height: 20, background: INK, clipPath: "polygon(0 0,100% 0,50% 100%)" })} />
        </>
      )}
      {/* topo e rodapé fixos de cada slide */}
      <div style={abs({ top: 56, left: 88, right: 88, display: "flex", justifyContent: "space-between", alignItems: "center" })}>
        <div style={{ background: INK, borderRadius: 10, padding: "10px 16px" }}><Logo layout="horizontal" height={28} /></div>
        <span style={{ fontFamily: fontFamilies.mono, fontSize: 18, letterSpacing: "0.16em", color: MUT }}>{String(i).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
      </div>
      <div style={abs({ left: 88, right: 88, bottom: 56, borderTop: `1px solid ${LINE}`, paddingTop: 22, display: "flex", justifyContent: "space-between", fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 17, letterSpacing: "0.22em", color: MUT })}>
        <span style={{ background: "rgba(255,255,255,0.85)", padding: "0 6px" }}>@CFDESIGNER.OFICIAL</span>
        {i < N && <span style={{ background: "rgba(255,255,255,0.85)", padding: "0 6px" }}>ARRASTE →</span>}
      </div>
    </AbsoluteFill>
  );
};
