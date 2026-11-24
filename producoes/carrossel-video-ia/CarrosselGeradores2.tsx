import React from "react";
import { Img } from "remotion";
import { Logo, fontFamilies } from "../../design-systems/cfdesigner";
import { AM, INK, MUT, X, abs, Apoio, CarrosselShell, Etiq, Ghost, Marca, Titulo } from "./CarrosselClaudeCode";
import euCapa from "./assets/eu-capa.png";
import euFala from "./assets/eu-fala.png";

/**
 * Carrossel "5 geradores de vídeo com IA", identidade 2: fundo Daylight do design system (#f3f4f5),
 * losango do logo como forma que atravessa os slides, fita preta com texto âmbar e, no lugar das fotos,
 * o logo e uma geração de cada ferramenta (espaços prontos; entram os arquivos reais do dono).
 */
const FUNDO = "#f3f4f5";
const GRAFITE = "#706b68";

type Ferramenta = { chave: string; num: string; etiqueta: string; nome: string; tag: string; preco: string; pontos: string[]; logo?: string; geracao?: string };

const FERRAMENTAS: Ferramenta[] = [
  { chave: "freebeat", num: "01", etiqueta: "01 · Melhor no geral", nome: "Freebeat", tag: "Videoclipe completo a partir do áudio", preco: "US$ 4,99 por semana", pontos: ["Análise de áudio de 7 sinais", "Vídeo de até 6 minutos", "Resultado depende do áudio"] },
  { chave: "viggle", num: "02", etiqueta: "02 · Transferência de movimento", nome: "Viggle", tag: "Anima personagens com vídeo de referência", preco: "Pro: US$ 7,99 por mês", pontos: ["Grátis: até 5 vídeos por dia", "Precisa de vídeo de referência", "Bom para dança e personagens"] },
  { chave: "kling", num: "03", etiqueta: "03 · Realismo cinematográfico", nome: "Kling AI", tag: "Cenas a partir de texto, imagem ou vídeo", preco: "US$ 6,99 no 1º mês", pontos: ["Depois, US$ 8,80 por mês", "Plano grátis com limites", "Projeto longo pede vários trechos"] },
  { chave: "seedance", num: "04", etiqueta: "04 · Geração de movimento", nome: "Seedance", tag: "Modelos via integrações e API", preco: "A partir de US$ 32", pontos: ["Seedance 2.5, via BytePlus", "Recursos variam por modelo", "Para criadores avançados e devs"] },
  { chave: "capcut", num: "05", etiqueta: "05 · Edição para redes sociais", nome: "CapCut", tag: "IA e edição em linha do tempo", preco: "Pro: US$ 19,99 por mês", pontos: ["Plano básico gratuito", "Sincroniza áudio, efeitos e transições", "Videoclipe detalhado pede edição manual"] },
];

const ESCOLHA = ["Música → Freebeat", "Dança e personagem → Viggle", "Cena realista → Kling AI", "Criador avançado → Seedance", "Edição para redes → CapCut"];

const Losango: React.FC<{ cx: number; cy: number; lado: number; cor?: string; borda?: boolean }> = ({ cx, cy, lado, cor = AM, borda }) => (
  <div style={abs({ left: cx - lado / 2, top: cy - lado / 2, width: lado, height: lado, transform: "rotate(45deg)", background: borda ? "transparent" : cor, border: borda ? `3px solid ${cor}` : undefined })} />
);

/** Espaço do logo (arquivo real quando existir; antes disso, marcador). */
const LogoCard: React.FC<{ f: Ferramenta; left: number; top: number }> = ({ f, left, top }) => (
  <div style={abs({ left, top, width: 230, height: 230, borderRadius: 40, background: "#fff", boxShadow: "0 24px 50px rgba(11,12,14,0.16)", transform: "rotate(4deg)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" })}>
    {f.logo ? (
      <Img src={f.logo} style={{ width: "74%", height: "74%", objectFit: "contain" }} />
    ) : (
      <div style={{ border: `3px dashed ${AM}`, borderRadius: 26, width: "82%", height: "82%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <div style={{ fontFamily: fontFamilies.display, fontSize: 64, color: INK, letterSpacing: "0.04em" }}>{f.nome.slice(0, 2).toUpperCase()}</div>
        <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 15, letterSpacing: "0.22em", color: MUT }}>LOGO</div>
      </div>
    )}
  </div>
);

/** Espaço da geração (arquivo real quando existir). Sai um pouco para o slide seguinte. */
const GeracaoCard: React.FC<{ f: Ferramenta; left: number; top: number }> = ({ f, left, top }) => (
  <div style={abs({ left, top, width: 1010, height: 400, borderRadius: 26, background: INK, boxShadow: "0 36px 70px rgba(11,12,14,0.28)", transform: "rotate(-2deg)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" })}>
    {f.geracao ? (
      <Img src={f.geracao} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    ) : (
      <div style={{ border: `3px dashed ${AM}`, borderRadius: 18, width: "94%", height: "88%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 22, letterSpacing: "0.26em", color: AM }}>
        FRAME DE UMA GERAÇÃO · {f.nome.toUpperCase()}
      </div>
    )}
  </div>
);

const Palco: React.FC = () => (
  <>
    {FERRAMENTAS.map((f, k) => (
      <Ghost key={f.num} t={f.num} size={760} style={{ left: X(k + 2) + 640, top: 330 }} />
    ))}
    {/* losango grande atrás da capa, atravessando para o slide 2 */}
    <Losango cx={1010} cy={1090} lado={600} />
    <Losango cx={1010} cy={1090} lado={760} cor={GRAFITE} borda />
    <Img src={euCapa} style={abs({ left: 270, bottom: 0, height: 860, width: 860 * (862 / 1378) })} />
    {/* fita preta com texto âmbar entre 6 e 7 */}
    <div style={abs({ left: 6480 - 950, top: 1170 - 35, width: 1900, height: 70, background: INK, color: AM, display: "flex", alignItems: "center", overflow: "hidden", whiteSpace: "nowrap", fontFamily: fontFamilies.display, fontSize: 42, letterSpacing: "0.12em", transform: "rotate(-5deg)" })}>
      {Array.from({ length: 6 }).map((_, i) => <span key={i} style={{ marginRight: 30 }}>FREEBEAT · VIGGLE · KLING · SEEDANCE · CAPCUT ·</span>)}
    </div>
    <Losango cx={X(7) + 960} cy={1020} lado={300} />
    <Losango cx={X(8) + 700} cy={1100} lado={860} cor={INK} />
    <Img src={euFala} style={abs({ left: X(8) + 1110 - 900 * (768 / 1108), bottom: 0, height: 900, width: 900 * (768 / 1108) })} />
    <div style={abs({ left: X(8) + 88, top: 940, width: 170, height: 170, borderRadius: 85, background: INK, display: "flex", alignItems: "center", justifyContent: "center" })}>
      <Logo layout="symbol" finish="metal" height={100} />
    </div>
    {FERRAMENTAS.map((f, k) => (
      <React.Fragment key={f.chave}>
        <GeracaoCard f={f} left={X(k + 2) + 96} top={850} />
        <LogoCard f={f} left={X(k + 2) + 770} top={150} />
      </React.Fragment>
    ))}
  </>
);

const Chip: React.FC<{ left: number; top: number; children: React.ReactNode }> = ({ left, top, children }) => (
  <div style={abs({ left, top, background: "#fff", border: `3px solid ${AM}`, borderRadius: 999, padding: "12px 28px", fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 26, color: INK })}>{children}</div>
);

const Pontos: React.FC<{ itens: string[]; left: number; top: number; largura: number; fonte?: number }> = ({ itens, left, top, largura, fonte = 30 }) => (
  <div style={abs({ left, top, width: largura })}>
    {itens.map((t) => (
      <div key={t} style={{ display: "flex", alignItems: "center", gap: 22, minHeight: 72 }}>
        <div style={{ width: 18, height: 18, background: AM, transform: "rotate(45deg)", flex: "none" }} />
        <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: fonte, lineHeight: 1.2, color: INK }}>{t}</div>
      </div>
    ))}
  </div>
);

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
    const f = FERRAMENTAS[i - 2];
    return (
      <>
        <div style={abs({ left: L + 88, top: 190 })}>
          <Etiq>{f.etiqueta}</Etiq>
          <Titulo linhas={[<Marca key="m">{f.nome}</Marca>]} size={124} />
        </div>
        <Apoio style={{ left: L + 88, top: 430, width: 880, fontSize: 28, color: INK, fontWeight: 600, fontFamily: fontFamilies.heading }}>{f.tag}</Apoio>
        <Chip left={L + 88} top={500}>{f.preco}</Chip>
        <Pontos itens={f.pontos} left={L + 88} top={585} largura={880} />
      </>
    );
  }
  if (i === 7) return (
    <>
      <div style={abs({ left: L + 88, top: 190 })}>
        <Etiq>Resumo</Etiq>
        <Titulo linhas={["Qual", <Marca key="m">escolher?</Marca>]} size={112} />
      </div>
      <Pontos itens={ESCOLHA} left={L + 88} top={560} largura={700} fonte={32} />
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

export const CarrosselGeradores2: React.FC<{ n: number }> = ({ n }) => <CarrosselShell n={n} palco={<Palco />} textos={Textos} fundo={FUNDO} />;
