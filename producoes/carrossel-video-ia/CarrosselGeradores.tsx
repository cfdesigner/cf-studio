import React from "react";
import { Img } from "remotion";
import { Logo, fontFamilies, imagery } from "../../design-systems/cfdesigner";
import { AM, INK, X, abs, Apoio, Card, CarrosselShell, Etiq, Fita, Ghost, Marca, Titulo } from "./CarrosselClaudeCode";
import euCapa from "./assets/eu-capa.png";
import euFala from "./assets/eu-fala.png";
import fotoEscritorio from "./assets/foto-escritorio.jpg";
import fotoLivro from "./assets/foto-livro.jpg";
import fotoNotebook from "./assets/foto-notebook.jpg";

/**
 * Carrossel "5 geradores de vídeo com IA" (base: comparativo de 11 geradores de videoclipes com IA, 2026).
 * Mesma identidade do carrossel "Claude Code": fundo branco, âmbar, elementos que atravessam os slides.
 * Só entra informação que está no comparativo (preços e limites podem variar, como o próprio texto avisa).
 */
type Ferramenta = { num: string; etiqueta: string; nome: string; tag: string; preco: string; pontos: string[] };

const FERRAMENTAS: Ferramenta[] = [
  { num: "01", etiqueta: "01 · Melhor no geral", nome: "Freebeat", tag: "Videoclipe completo a partir do áudio", preco: "US$ 4,99 por semana", pontos: ["Análise de áudio de 7 sinais", "Vídeo de até 6 minutos", "Resultado depende do áudio"] },
  { num: "02", etiqueta: "02 · Transferência de movimento", nome: "Viggle", tag: "Anima personagens com vídeo de referência", preco: "Pro: US$ 7,99 por mês", pontos: ["Grátis: até 5 vídeos por dia", "Precisa de vídeo de referência", "Bom para dança e personagens"] },
  { num: "03", etiqueta: "03 · Realismo cinematográfico", nome: "Kling AI", tag: "Cenas a partir de texto, imagem ou vídeo", preco: "US$ 6,99 no 1º mês", pontos: ["Depois, US$ 8,80 por mês", "Plano grátis com limites", "Projeto longo pede vários trechos"] },
  { num: "04", etiqueta: "04 · Geração de movimento", nome: "Seedance", tag: "Modelos via integrações e API", preco: "A partir de US$ 32", pontos: ["Seedance 2.5, via BytePlus", "Recursos variam por modelo", "Para criadores avançados e devs"] },
  { num: "05", etiqueta: "05 · Edição para redes sociais", nome: "CapCut", tag: "IA e edição em linha do tempo", preco: "Pro: US$ 19,99 por mês", pontos: ["Plano básico gratuito", "Sincroniza áudio, efeitos e transições", "Videoclipe detalhado pede edição manual"] },
];

const ESCOLHA = ["Música → Freebeat", "Dança e personagem → Viggle", "Cena realista → Kling AI", "Criador avançado → Seedance", "Edição para redes → CapCut"];

const Palco: React.FC = () => (
  <>
    {FERRAMENTAS.map((f, k) => (
      <Ghost key={f.num} t={f.num} size={760} style={{ left: X(k + 2) + 640, top: 400 }} />
    ))}
    <Ghost t="5" size={1000} style={{ left: X(7) + 740, top: 330 }} />
    {/* círculo âmbar atrás da capa, atravessando para o slide 2 */}
    <div style={abs({ left: 510, top: 930 - 500, width: 1000, height: 1000, borderRadius: 500, background: AM })} />
    <Img src={euCapa} style={abs({ left: 270, bottom: 0, height: 860, width: 860 * (862 / 1378) })} />
    <Card src={imagery.timelineCloseup} pos="40% 50%" cx={2160} cy={1040} w={780} h={420} rot={-4} />
    <Card src={fotoNotebook} pos="50% 62%" cx={3240} cy={1040} w={780} h={420} rot={3} />
    <Card src={fotoLivro} pos="50% 33%" cx={4390} cy={1040} w={780} h={420} rot={-3} persp={-10} />
    <Fita cx={6480} cy={1170} w={1900} rot={-5} texto="FREEBEAT · VIGGLE · KLING · SEEDANCE · CAPCUT ·" />
    <div style={abs({ left: 5520 - 380 + 40, top: 900 - 380 + 32, width: 760, height: 760, borderRadius: 380, border: `3px solid ${AM}` })} />
    <div style={abs({ left: 5520 - 380, top: 900 - 380, width: 760, height: 760, borderRadius: 380, overflow: "hidden", boxShadow: "0 30px 60px rgba(11,12,14,0.25)" })}>
      <Img src={fotoEscritorio} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(2.3)", transformOrigin: "70% 37%" }} />
    </div>
    <div style={abs({ left: X(8) + 700 - 450, top: 1130 - 450, width: 900, height: 900, borderRadius: 450, background: INK })} />
    <Img src={euFala} style={abs({ left: X(8) + 1110 - 900 * (768 / 1108), bottom: 0, height: 900, width: 900 * (768 / 1108) })} />
    <div style={abs({ left: X(8) + 88, top: 940, width: 170, height: 170, borderRadius: 85, background: INK, display: "flex", alignItems: "center", justifyContent: "center" })}>
      <Logo layout="symbol" finish="metal" height={100} />
    </div>
  </>
);

const Chip: React.FC<{ left: number; top: number; children: React.ReactNode }> = ({ left, top, children }) => (
  <div style={abs({ left, top, background: "#fff", border: `3px solid ${AM}`, borderRadius: 999, padding: "12px 28px", fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 26, color: INK })}>{children}</div>
);

const Pontos: React.FC<{ itens: string[]; left: number; top: number; largura: number; fonte?: number; tinta?: string }> = ({ itens, left, top, largura, fonte = 30, tinta = AM }) => (
  <div style={abs({ left, top, width: largura })}>
    {itens.map((t) => (
      <div key={t} style={{ display: "flex", alignItems: "center", gap: 22, minHeight: 74 }}>
        <div style={{ width: 18, height: 18, background: tinta, transform: "rotate(45deg)", flex: "none" }} />
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
    const deslocado = i === 6; // o círculo da foto ocupa a esquerda do slide 6
    const x = L + (deslocado ? 470 : 88);
    return (
      <>
        <div style={abs({ left: L + 88, top: 190 })}>
          <Etiq>{f.etiqueta}</Etiq>
          <Titulo linhas={[<Marca key="m">{f.nome}</Marca>]} size={124} />
        </div>
        <Apoio style={{ left: x, top: 430, width: deslocado ? 560 : 880, fontSize: 28, color: INK, fontWeight: 600, fontFamily: fontFamilies.heading }}>{f.tag}</Apoio>
        <Chip left={x} top={i === 6 ? 520 : 500}>{f.preco}</Chip>
        <Pontos itens={f.pontos} left={x} top={i === 6 ? 610 : 590} largura={deslocado ? 570 : 640} fonte={deslocado ? 27 : 30} tinta={i === 2 ? INK : AM} />
      </>
    );
  }
  if (i === 7) return (
    <>
      <div style={abs({ left: L + 88, top: 190 })}>
        <Etiq>Resumo</Etiq>
        <Titulo linhas={["Qual", <Marca key="m">escolher?</Marca>]} size={112} />
      </div>
      <Pontos itens={ESCOLHA} left={L + 88} top={590} largura={900} fonte={32} />
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
      <Apoio style={{ left: L + 88, top: 820, width: 250, fontSize: 19 }}>Fonte: comparativo de geradores de videoclipes com IA, 2026. Preços podem variar.</Apoio>
    </>
  );
};

export const CarrosselGeradores: React.FC<{ n: number }> = ({ n }) => <CarrosselShell n={n} palco={<Palco />} textos={Textos} />;
