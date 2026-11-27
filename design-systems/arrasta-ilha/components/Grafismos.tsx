import React from "react";
import { colors } from "../tokens";

// Grafismos do Arrasta Ilha, desenhados aqui a partir do repertório visível no site (folha, pontos, sol, arcos,
// moldura de tambor, faixas de padrão). São versões vetoriais minhas, inspiradas nos prints; trocar pelos arquivos
// originais do grupo quando o dono mandar. Não incluem símbolos religiosos nem o logo.

type G = { size?: number; cor?: string; style?: React.CSSProperties };

/** Folha de palma: haste e folíolos em leque. */
export const FolhaPalma: React.FC<G> = ({ size = 400, cor = colors.terra, style }) => {
  const n = 9;
  const folhas = Array.from({ length: n }, (_, i) => {
    const y = 330 - i * 34;
    const c = 62 - i * 4.2; // folíolos menores perto da ponta
    return [-1, 1].map((lado) => (
      <path key={`${i}${lado}`} d={`M100 ${y} Q${100 + lado * c * 0.9} ${y - 38} ${100 + lado * c * 1.35} ${y - 62} Q${100 + lado * c * 0.35} ${y - 40} 100 ${y} Z`} fill={cor} />
    ));
  });
  return (
    <svg width={size * 0.5} height={size} viewBox="0 0 200 400" style={style}>
      <path d="M100 392 Q98 200 100 20" stroke={cor} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M100 30 Q112 8 100 4 Q88 8 100 30 Z" fill={cor} />
      {folhas}
    </svg>
  );
};

/** Aglomerado de pontos (como o do canto do site). */
export const GrupoPontos: React.FC<G> = ({ size = 260, cor = colors.laranja, style }) => {
  const pts: [number, number, number][] = [];
  for (let r = 0; r < 7; r++) for (let c = 0; c < 7 - r; c++) pts.push([c * 34 + (r % 2) * 17 + 14, r * 30 + 14, 13 - r * 1.3 + (c % 2)]);
  return (
    <svg width={size} height={size * 0.82} viewBox="0 0 260 214" style={style}>
      {pts.map(([x, y, rr], i) => (
        <circle key={i} cx={x} cy={y} r={Math.max(rr, 3)} fill={cor} />
      ))}
    </svg>
  );
};

/** Sol: círculo cheio com raios curtos arredondados. */
export const Sol: React.FC<G> = ({ size = 220, cor = colors.laranja, style }) => (
  <svg width={size} height={size} viewBox="-110 -110 220 220" style={style}>
    <circle r={34} fill={cor} />
    {Array.from({ length: 14 }, (_, i) => (
      <line key={i} x1={0} y1={-52} x2={0} y2={i % 2 ? -78 : -96} stroke={cor} strokeWidth={9} strokeLinecap="round" transform={`rotate(${(i * 360) / 14})`} />
    ))}
  </svg>
);

/** Arcos concêntricos (como as ondas em azul-claro do site). */
export const Arcos: React.FC<G> = ({ size = 360, cor = "#9bb9d3", style }) => (
  <svg width={size} height={size * 0.62} viewBox="0 0 360 224" style={style}>
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <path key={i} d={`M${14 + i * 24} 224 A${166 - i * 24} ${166 - i * 24} 0 0 1 ${346 - i * 24} 224`} fill="none" stroke={cor} strokeWidth={5} strokeLinecap="round" />
    ))}
  </svg>
);

/** Mancha orgânica de fundo, suave (pêssego/areia). */
export const Mancha: React.FC<G> = ({ size = 520, cor = "#f3d6c0", style }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 520 416" style={style}>
    <path d="M60 210 C20 90 160 10 270 40 C390 70 500 120 490 240 C480 360 350 410 230 396 C110 382 90 300 60 210 Z" fill={cor} />
  </svg>
);

/** Linhas tracejadas em fileiras (como as do canto do site). */
export const Tracejado: React.FC<G> = ({ size = 260, cor = colors.laranja, style }) => (
  <svg width={size} height={size * 0.55} viewBox="0 0 260 143" style={style}>
    {Array.from({ length: 7 }, (_, r) =>
      Array.from({ length: 5 }, (_, c) => (
        <line key={`${r}${c}`} x1={20 + r * 12 + c * 44} y1={14 + r * 20} x2={44 + r * 12 + c * 44} y2={14 + r * 20} stroke={cor} strokeWidth={5} strokeLinecap="round" />
      )),
    )}
  </svg>
);

/** Moldura de tambor: círculo com aro de couro e cordas brancas. O conteúdo (foto) fica recortado no círculo. */
export const MolduraTambor: React.FC<{ size?: number; children?: React.ReactNode; style?: React.CSSProperties }> = ({ size = 520, children, style }) => {
  const aro = size * 0.07;
  return (
    <div style={{ position: "relative", width: size, height: size, ...style }}>
      <div style={{ position: "absolute", inset: aro, borderRadius: "50%", overflow: "hidden", background: colors.areia }}>{children}</div>
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: "absolute", inset: 0 }}>
        <circle cx={50} cy={50} r={50 - 3.6} fill="none" stroke="#6b3f26" strokeWidth={7.2} />
        <circle cx={50} cy={50} r={50 - 3.6} fill="none" stroke="#9a6440" strokeWidth={3.2} strokeDasharray="1.2 2" />
        {Array.from({ length: 10 }, (_, i) => (
          <rect key={i} x={48.2} y={0.6} width={3.6} height={9} rx={1.6} fill="#f3ece3" transform={`rotate(${i * 36} 50 50)`} />
        ))}
      </svg>
    </div>
  );
};

/** Faixa de padrão repetido. variante: zigue | losangos | triangulos | simbolos (branco sobre cor). */
export const FaixaPadrao: React.FC<{ variante: "zigue" | "losangos" | "triangulos" | "simbolos"; cor: string; fundo?: string; w?: number; alt?: number }> = ({ variante, cor, fundo = "transparent", w = 1080, alt = 44 }) => {
  const passo = alt;
  const n = Math.ceil(w / passo) + 1;
  const itens = Array.from({ length: n }, (_, i) => {
    const x = i * passo;
    if (variante === "zigue") return <polyline key={i} points={`${x},${alt * 0.3} ${x + passo / 2},${alt * 0.7} ${x + passo},${alt * 0.3}`} fill="none" stroke={cor} strokeWidth={3} />;
    if (variante === "losangos") return <path key={i} d={`M${x + passo / 2} ${alt * 0.2} L${x + passo * 0.85} ${alt / 2} L${x + passo / 2} ${alt * 0.8} L${x + passo * 0.15} ${alt / 2} Z`} fill={i % 2 ? cor : "none"} stroke={cor} strokeWidth={2.5} />;
    if (variante === "triangulos") return <path key={i} d={i % 2 ? `M${x} ${alt * 0.8} L${x + passo / 2} ${alt * 0.2} L${x + passo} ${alt * 0.8} Z` : `M${x} ${alt * 0.2} L${x + passo / 2} ${alt * 0.8} L${x + passo} ${alt * 0.2} Z`} fill={cor} opacity={0.9} />;
    // simbolos: sequência de formas geométricas simples (sem figuras religiosas)
    const k = i % 4;
    const cx = x + passo / 2;
    const cy = alt / 2;
    if (k === 0) return <circle key={i} cx={cx} cy={cy} r={passo * 0.2} fill={cor} />;
    if (k === 1) return <path key={i} d={`M${cx} ${cy - passo * 0.25} L${cx + passo * 0.22} ${cy + passo * 0.2} L${cx - passo * 0.22} ${cy + passo * 0.2} Z`} fill={cor} />;
    if (k === 2) return <rect key={i} x={cx - passo * 0.18} y={cy - passo * 0.18} width={passo * 0.36} height={passo * 0.36} fill={cor} transform={`rotate(45 ${cx} ${cy})`} />;
    return <path key={i} d={`M${cx - passo * 0.22} ${cy} H${cx + passo * 0.22} M${cx} ${cy - passo * 0.22} V${cy + passo * 0.22}`} stroke={cor} strokeWidth={4} strokeLinecap="round" />;
  });
  return (
    <svg width={w} height={alt} style={{ display: "block", background: fundo }}>
      {itens}
    </svg>
  );
};

/** Sol de respingo: miolo cheio e raios orgânicos afilados, com pontinhos (o sol da página Percussão). */
export const SolRespingo: React.FC<G> = ({ size = 230, cor = colors.ocre, style }) => (
  <svg width={size} height={size} viewBox="-120 -120 240 240" style={style}>
    <circle r={32} fill={cor} />
    {Array.from({ length: 11 }, (_, i) => {
      const comp = 62 + ((i * 37) % 28);
      const larg = 11 + (i % 3) * 3;
      return (
        <path key={i} transform={`rotate(${(i * 360) / 11 + 8})`} d={`M${-larg} -30 Q${-larg * 0.4} ${-comp * 0.6} ${(i % 2 ? 6 : -6)} ${-comp} Q${larg * 0.5} ${-comp * 0.6} ${larg} -30 Z`} fill={cor} />
      );
    })}
    {Array.from({ length: 14 }, (_, i) => (
      <circle key={i} cx={Math.cos((i * 2 * Math.PI) / 14) * 108} cy={Math.sin((i * 2 * Math.PI) / 14) * 108} r={3.2 + (i % 3)} fill={cor} />
    ))}
  </svg>
);

/** Semicírculo cheio com curvas de nível em linha fina (o semicírculo da página Percussão). */
export const SemiCirculoCurvas: React.FC<G> = ({ size = 320, cor = colors.terracota, style }) => (
  <svg width={size} height={size * 0.62} viewBox="0 0 320 198" style={style}>
    <path d="M60 198 A100 100 0 0 1 260 198 Z" fill={cor} />
    {[0, 1, 2, 3].map((i) => (
      <path key={i} d={`M${10 + i * 14} 190 C${30 + i * 10} ${40 + i * 12}, ${120 + i * 6} ${150 - i * 14}, ${170 + i * 8} ${60 + i * 16} S${300 - i * 10} ${40 + i * 14}, ${310 - i * 8} 190`} fill="none" stroke="#9bb9d3" strokeWidth={2.2} />
    ))}
  </svg>
);

/** Folha larga com nervuras claras (a folha marrom grande da página Percussão). */
export const FolhaLarga: React.FC<G> = ({ size = 420, cor = colors.terra, style }) => {
  const lobos = Array.from({ length: 7 }, (_, i) => {
    const y = 340 - i * 44;
    const c = 78 - i * 7.5;
    return [-1, 1].map((lado) => (
      <g key={`${i}${lado}`}>
        <path d={`M100 ${y} Q${100 + lado * c * 0.8} ${y - 14} ${100 + lado * c * 1.5} ${y - 66} Q${100 + lado * c * 0.55} ${y - 56} ${100 + lado * c * 0.1} ${y - 30} Q${100 + lado * c * 0.45} ${y - 30} 100 ${y} Z`} fill={cor} />
        <path d={`M100 ${y - 4} Q${100 + lado * c * 0.7} ${y - 22} ${100 + lado * c * 1.25} ${y - 56}`} stroke="#f3ece3" strokeWidth={1.8} fill="none" opacity={0.75} />
      </g>
    ));
  });
  return (
    <svg width={size * 0.5} height={size} viewBox="0 0 200 400" style={style}>
      <path d="M100 396 Q96 200 100 24" stroke={cor} strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d="M100 40 Q122 6 100 0 Q78 6 100 40 Z" fill={cor} />
      {lobos}
    </svg>
  );
};
