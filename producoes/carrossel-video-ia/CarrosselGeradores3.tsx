import React from "react";
import { Img } from "remotion";
import { Logo, fontFamilies } from "../../design-systems/cfdesigner";
import { AM, INK, MUT, X, abs, Apoio, CarrosselShell, Etiq, Ghost, Marca, Titulo } from "./CarrosselClaudeCode";
import printFreebeat from "./assets/ferramentas/freebeat-print.jpg";
import printViggle from "./assets/ferramentas/viggle-print.jpg";
import printKling from "./assets/ferramentas/kling-print.jpg";
import printSeedance from "./assets/ferramentas/seedance-print.jpg";
import printCapcut from "./assets/ferramentas/capcut-print.jpg";
import fotoMesa from "./assets/foto-mesa.jpg";
import bebeKarate from "./assets/bebe-karate.png";

/**
 * Carrossel "5 geradores de vídeo com IA", versão com composição DIFERENTE em cada slide:
 * celular, losango, janela do navegador, leque de cartões e notebook. Prints e logos dos aplicativos entram
 * nos espaços marcados (arquivos reais do dono, em assets/ferramentas/). Tudo com os elementos do design
 * system CFDesigner (losango, âmbar, fita, fundo claro, Bebas e Montserrat).
 */
const GRAFITE = "#706b68";
type Estilo = "losango" | "pilula" | "numero" | "traco" | "quadrado";
type Ferramenta = { chave: string; num: string; etiqueta: string; nome: string; tag: string; preco: string; pontos: string[]; estilo: Estilo; logo?: string; print?: string; pos?: string };

const F: Ferramenta[] = [
  { chave: "freebeat", num: "01", etiqueta: "01 · Melhor no geral", nome: "Freebeat", tag: "Videoclipe completo a partir do áudio", preco: "US$ 4,99 por semana", pontos: ["Análise de áudio de 7 sinais", "Vídeo de até 6 minutos", "Resultado depende do áudio"], estilo: "losango", print: printFreebeat, pos: "50% 0%" },
  { chave: "viggle", num: "02", etiqueta: "02 · Transferência de movimento", nome: "Viggle", tag: "Anima personagens com vídeo de referência", preco: "Pro: US$ 7,99 por mês", pontos: ["Grátis: até 5 vídeos por dia", "Precisa de vídeo de referência", "Bom para dança e personagens"], estilo: "pilula", print: printViggle, pos: "55% 30%" },
  { chave: "kling", num: "03", etiqueta: "03 · Realismo cinematográfico", nome: "Kling AI", tag: "Cenas a partir de texto, imagem ou vídeo", preco: "US$ 6,99 no 1º mês", pontos: ["Depois, US$ 8,80 por mês", "Plano grátis com limites", "Projeto longo pede vários trechos"], estilo: "numero", print: printKling, pos: "50% 20%" },
  { chave: "seedance", num: "04", etiqueta: "04 · Geração de movimento", nome: "Seedance", tag: "Modelos via integrações e API", preco: "A partir de US$ 32", pontos: ["Seedance 2.5, via BytePlus", "Recursos variam por modelo", "Para criadores avançados e devs"], estilo: "traco", print: printSeedance, pos: "50% 0%" },
  { chave: "capcut", num: "05", etiqueta: "05 · Edição para redes sociais", nome: "CapCut", tag: "IA e edição em linha do tempo", preco: "Pro: US$ 19,99 por mês", pontos: ["Plano básico gratuito", "Sincroniza áudio, efeitos e transições", "Videoclipe detalhado pede edição manual"], estilo: "quadrado", print: printCapcut, pos: "50% 0%" },
];
const ESCOLHA = ["Música → Freebeat", "Dança e personagem → Viggle", "Cena realista → Kling AI", "Criador avançado → Seedance", "Edição para redes → CapCut"];

/** Espaço do print do aplicativo (arquivo real quando existir). */
const Print: React.FC<{ f: Ferramenta; escuro?: boolean }> = ({ f, escuro = true }) =>
  f.print ? (
    <Img src={f.print} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: f.pos ?? "50% 50%" }} />
  ) : (
    <div style={{ width: "100%", height: "100%", background: escuro ? "#16181c" : "#eceef0", display: "flex", alignItems: "center", justifyContent: "center", padding: 14, boxSizing: "border-box" }}>
      <div style={{ border: `2px dashed ${AM}`, borderRadius: 14, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 18, letterSpacing: "0.22em", color: escuro ? AM : MUT, padding: 10 }}>
        PRINT DO APP · {f.nome.toUpperCase()}
      </div>
    </div>
  );

const LogoRedondo: React.FC<{ f: Ferramenta; cx: number; cy: number; d?: number }> = ({ f, cx, cy, d = 150 }) => (
  <div style={abs({ left: cx - d / 2, top: cy - d / 2, width: d, height: d, borderRadius: d / 2, background: "#fff", boxShadow: "0 16px 36px rgba(11,12,14,0.22)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: `3px solid ${AM}` })}>
    {f.logo ? (
      <Img src={f.logo} style={{ width: "66%", height: "66%", objectFit: "contain" }} />
    ) : (
      <div style={{ fontFamily: fontFamilies.display, fontSize: d * 0.4, color: INK, letterSpacing: "0.04em" }}>{f.nome.slice(0, 2).toUpperCase()}</div>
    )}
  </div>
);

const Losango: React.FC<{ cx: number; cy: number; lado: number; cor?: string; borda?: boolean }> = ({ cx, cy, lado, cor = AM, borda }) => (
  <div style={abs({ left: cx - lado / 2, top: cy - lado / 2, width: lado, height: lado, transform: "rotate(45deg)", background: borda ? "transparent" : cor, border: borda ? `3px solid ${cor}` : undefined })} />
);

const Celular: React.FC<{ f: Ferramenta; cx: number; cy: number; w: number; h: number; rot: number }> = ({ f, cx, cy, w, h, rot }) => (
  <div style={abs({ left: cx - w / 2, top: cy - h / 2, width: w, height: h, borderRadius: 54, background: INK, padding: 14, boxSizing: "border-box", boxShadow: "0 40px 70px rgba(11,12,14,0.3)", transform: `rotate(${rot}deg)` })}>
    <div style={{ width: "100%", height: "100%", borderRadius: 42, overflow: "hidden", position: "relative" }}>
      <Print f={f} />
      <div style={abs({ left: "50%", top: 12, width: 96, height: 24, marginLeft: -48, borderRadius: 14, background: INK })} />
    </div>
  </div>
);

const Janela: React.FC<{ f: Ferramenta; cx: number; cy: number; w: number; h: number; rot: number }> = ({ f, cx, cy, w, h, rot }) => (
  <div style={abs({ left: cx - w / 2, top: cy - h / 2, width: w, height: h, borderRadius: 22, background: "#fff", boxShadow: "0 40px 70px rgba(11,12,14,0.28)", transform: `rotate(${rot}deg)`, overflow: "hidden", border: "1px solid #d6dade" })}>
    <div style={{ height: 46, background: "#eceef0", display: "flex", alignItems: "center", gap: 10, paddingLeft: 20 }}>
      {[AM, GRAFITE, INK].map((c) => <div key={c} style={{ width: 14, height: 14, borderRadius: 7, background: c }} />)}
    </div>
    <div style={{ height: h - 46 }}><Print f={f} /></div>
  </div>
);

const Notebook: React.FC<{ f: Ferramenta; cx: number; cy: number; w: number; h: number }> = ({ f, cx, cy, w, h }) => (
  <>
    <div style={abs({ left: cx - w / 2, top: cy - h / 2, width: w, height: h, borderRadius: 22, background: INK, padding: 14, boxSizing: "border-box", boxShadow: "0 40px 70px rgba(11,12,14,0.3)" })}>
      <div style={{ width: "100%", height: "100%", borderRadius: 10, overflow: "hidden" }}><Print f={f} /></div>
    </div>
    <div style={abs({ left: cx - w / 2 - 50, top: cy + h / 2, width: w + 100, height: 24, borderRadius: "0 0 26px 26px", background: GRAFITE })} />
  </>
);

const Palco: React.FC = () => (
  <>
    {/* 1 · capa: o bebê faixa preta sobre um círculo âmbar que passa para o slide 2 */}
    <Ghost t="5" size={1000} style={{ left: 40, top: 330 }} />
    <div style={abs({ left: 780 - 380, top: 930 - 380, width: 760, height: 760, borderRadius: 380, background: AM })} />
    <Img src={bebeKarate} style={abs({ left: 520 - 0.495 * 880 / 2, bottom: -30, height: 880, width: 880 * 0.495 })} />

    {/* 2 · Freebeat: print dentro de um losango, com losango âmbar que passa para o slide 3 */}
    <Ghost t="01" size={700} style={{ left: X(2) - 40, top: 790 }} />
    <Losango cx={X(2) + 860} cy={1090} lado={580} />
    <div style={abs({ left: X(2) + 810 - 290, top: 1060 - 290, width: 580, height: 580, transform: "rotate(45deg)", overflow: "hidden", boxShadow: "0 36px 66px rgba(11,12,14,0.3)", border: "6px solid #fff" })}>
      <div style={{ width: "141%", height: "141%", marginLeft: "-20.5%", marginTop: "-20.5%", transform: "rotate(-45deg)" }}>
        <Print f={F[0]} />
      </div>
    </div>
    <LogoRedondo f={F[0]} cx={X(2) + 810} cy={640} />

    {/* 3 · Viggle: celular inclinado */}
    <Ghost t="02" size={760} style={{ left: X(3) + 600, top: 330 }} />
    <Losango cx={X(3) + 1010} cy={1000} lado={300} />
    <Celular f={F[1]} cx={X(3) + 790} cy={930} w={340} h={660} rot={6} />
    <LogoRedondo f={F[1]} cx={X(3) + 980} cy={650} />

    {/* 4 · Kling: janela do navegador larga que sangra para o slide 5 */}
    <Ghost t="03" size={760} style={{ left: X(4) + 560, top: 330 }} />
    <Janela f={F[2]} cx={X(4) + 640} cy={1075} w={1060} h={420} rot={-3} />
    <LogoRedondo f={F[2]} cx={X(4) + 985} cy={790} />

    {/* 5 · Seedance: leque de três cartões que passa para o slide 6 */}
    <Ghost t="04" size={700} style={{ left: X(5) - 40, top: 790 }} />
    <div style={abs({ left: X(5) + 740 - 165, top: 1010 - 260, width: 330, height: 520, borderRadius: 30, background: AM, transform: "rotate(-14deg)" })} />
    <div style={abs({ left: X(5) + 1010 - 165, top: 1010 - 260, width: 330, height: 520, borderRadius: 30, background: INK, transform: "rotate(14deg)" })} />
    <div style={abs({ left: X(5) + 880 - 175, top: 990 - 270, width: 350, height: 540, borderRadius: 30, background: INK, padding: 12, boxSizing: "border-box", boxShadow: "0 36px 66px rgba(11,12,14,0.32)", transform: "rotate(-2deg)", border: `3px solid ${AM}` })}>
      <div style={{ width: "100%", height: "100%", borderRadius: 20, overflow: "hidden" }}><Print f={F[3]} /></div>
    </div>
    <LogoRedondo f={F[3]} cx={X(5) + 720} cy={720} />

    {/* 6 · CapCut: notebook com a linha do tempo, que atravessa para o slide 7 */}
    <Ghost t="05" size={600} style={{ left: X(6) + 640, top: 120 }} />
    <Notebook f={F[4]} cx={X(6) + 930} cy={940} w={700} h={430} />
    {[[430, 180, AM], [620, 110, INK], [740, 250, AM], [1000, 150, GRAFITE], [1160, 230, AM], [1400, 120, INK]].map(([x, w, c], k) => (
      <div key={k} style={abs({ left: X(6) + (x as number), top: 1210, width: w as number, height: 50, borderRadius: 12, background: c as string })} />
    ))}
    <LogoRedondo f={F[4]} cx={X(6) + 960} cy={690} />

    {/* 7 · resumo */}
    <Ghost t="5" size={1000} style={{ left: X(7) + 740, top: 330 }} />
    <div style={abs({ left: X(7) + 940 - 180, top: 1130 - 180, width: 360, height: 360, borderRadius: 180, background: AM })} />

    {/* 8 · fecho: o dono em arco grande, com arco âmbar deslocado e losango */}
    <Ghost t="IA" size={620} style={{ left: X(8) + 380, top: 120 }} />
    <div style={abs({ left: X(8) + 566, top: 520, width: 500, height: 800, borderRadius: "250px 250px 28px 28px", border: `4px solid ${AM}` })} />
    <div style={abs({ left: X(8) + 540, top: 490, width: 500, height: 800, borderRadius: "250px 250px 28px 28px", overflow: "hidden", boxShadow: "0 40px 70px rgba(11,12,14,0.3)" })}>
      <Img src={fotoMesa} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.3)", transformOrigin: "68% 38%" }} />
    </div>
    <Losango cx={X(8) + 560} cy={1180} lado={190} />
    <div style={abs({ left: X(8) + 88, top: 940, width: 170, height: 170, borderRadius: 85, background: INK, display: "flex", alignItems: "center", justifyContent: "center" })}>
      <Logo layout="symbol" finish="metal" height={100} />
    </div>
  </>
);

const Chip: React.FC<{ left: number; top: number; children: React.ReactNode }> = ({ left, top, children }) => (
  <div style={abs({ left, top, background: "#fff", border: `3px solid ${AM}`, borderRadius: 999, padding: "12px 28px", fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 26, color: INK })}>{children}</div>
);

const Marcador: React.FC<{ estilo: Estilo; n: number; cor?: string }> = ({ estilo, n, cor = AM }) => {
  if (estilo === "numero") return <div style={{ width: 46, height: 46, borderRadius: 23, background: AM, color: INK, fontFamily: fontFamilies.mono, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{String(n + 1).padStart(2, "0")}</div>;
  if (estilo === "traco") return <div style={{ width: 28, height: 5, background: AM, flex: "none" }} />;
  if (estilo === "quadrado") return <div style={{ width: 16, height: 16, background: INK, flex: "none" }} />;
  if (estilo === "pilula") return null;
  return <div style={{ width: 16, height: 16, background: cor, transform: "rotate(45deg)", flex: "none" }} />;
};

const Pontos: React.FC<{ f: Ferramenta; left: number; top: number; largura: number; fonte: number }> = ({ f, left, top, largura, fonte }) => (
  <div style={abs({ left, top, width: largura, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: f.estilo === "pilula" ? 12 : 8 })}>
    {f.pontos.map((t, n) => (
      <div
        key={t}
        style={{
          display: "flex", alignItems: "center", gap: 18, minHeight: 62,
          ...(f.estilo === "pilula" ? { background: "#fff", border: "1px solid #cfd3d8", borderRadius: 999, padding: "10px 26px", minHeight: 0 } : {}),
        }}
      >
        <Marcador estilo={f.estilo} n={n} cor={f.chave === "freebeat" ? INK : AM} />
        <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: fonte, lineHeight: 1.2, color: INK }}>{t}</div>
      </div>
    ))}
  </div>
);

/** Largura e deslocamento do bloco de texto de cada ferramenta (libera o espaço da imagem de cada slide). */
const BLOCO: Record<string, { x: number; w: number; fonte: number }> = {
  freebeat: { x: 88, w: 520, fonte: 27 },
  viggle: { x: 88, w: 520, fonte: 25 },
  kling: { x: 88, w: 880, fonte: 30 },
  seedance: { x: 88, w: 470, fonte: 27 },
  capcut: { x: 150, w: 410, fonte: 26 },
};

const Textos = (i: number): React.ReactNode => {
  const L = X(i);
  if (i === 1) return (
    <>
      <div style={abs({ left: L + 88, top: 190 })}>
        <Etiq>Comparativo 2026</Etiq>
        <Titulo linhas={["5 geradores de", <>vídeo com <Marca>IA</Marca></>]} size={96} />
      </div>
      <Apoio style={{ left: L + 88, top: 520, width: 280, fontSize: 28, fontWeight: 600, fontFamily: fontFamilies.heading }}>os melhores, segundo um comparativo de 2026</Apoio>
    </>
  );
  if (i >= 2 && i <= 6) {
    const f = F[i - 2];
    const b = BLOCO[f.chave];
    return (
      <>
        <div style={abs({ left: L + 88, top: 190 })}>
          <Etiq>{f.etiqueta}</Etiq>
          <Titulo linhas={[<Marca key="m">{f.nome}</Marca>]} size={124} />
        </div>
        <Apoio style={{ left: L + b.x, top: 430, width: 880, fontSize: 28, color: INK, fontWeight: 600, fontFamily: fontFamilies.heading }}>{f.tag}</Apoio>
        <Chip left={L + b.x} top={510}>{f.preco}</Chip>
        <Pontos f={f} left={L + b.x} top={600} largura={b.w} fonte={b.fonte} />
      </>
    );
  }
  if (i === 7) return (
    <>
      <div style={abs({ left: L + 88, top: 190 })}>
        <Etiq>Resumo</Etiq>
        <Titulo linhas={["Qual", <Marca key="m">escolher?</Marca>]} size={112} />
      </div>
      <div style={abs({ left: L + 250, top: 540, display: "flex", flexDirection: "column", gap: 4 })}>
        {ESCOLHA.map((t) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 20, minHeight: 62 }}>
            <div style={{ width: 16, height: 16, background: AM, transform: "rotate(45deg)", flex: "none" }} />
            <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 32, color: INK }}>{t}</div>
          </div>
        ))}
      </div>
    </>
  );
  return (
    <>
      <div style={abs({ left: L + 88, top: 190 })}>
        <Etiq>Fecho</Etiq>
        <Titulo linhas={["Escolha pelo", <Marca key="m">projeto</Marca>]} size={100} />
      </div>
      <div style={abs({ left: L + 88, top: 590, background: AM, color: INK, fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 32, padding: "26px 54px", borderRadius: 999 })}>Chame no direct  →</div>
      <Apoio style={{ left: L + 88, top: 710, width: 330, fontSize: 24 }}>Compare tempo, custo, licença e qualidade antes de assinar.</Apoio>
      <Apoio style={{ left: L + 88, top: 800, width: 230, fontSize: 18 }}>Fonte: comparativo de geradores de videoclipes com IA, 2026. Preços podem variar.</Apoio>
    </>
  );
};

export const CarrosselGeradores3: React.FC<{ n: number }> = ({ n }) => <CarrosselShell n={n} palco={<Palco />} textos={Textos} />;
