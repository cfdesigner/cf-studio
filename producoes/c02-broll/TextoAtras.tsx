// Cena 1 do C02: "MUITO MAIS INTERESSANTE" atrás da pessoa. Usa o efeito do CFDesigner.
// O recorte (public/entrada/pessoa-c02/) vem de scripts/recortar-pessoa.py e é ignorado pelo Git.
import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { colors, TextoAtras } from "../../design-systems/cfdesigner";

export const C02Cena1Teste: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo
      src={staticFile("entrada/c02-broll.mp4")}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    <TextoAtras
      pessoa="entrada/pessoa-c02"
      quadros={108}
      entra={69}
      sai={107}
      fundoPct={41}
      linhas={[
        [
          { texto: "MUITO", tamanho: 170 },
          { texto: "MAIS", tamanho: 310 },
        ],
        [{ texto: "INTERESSANTE", tamanho: 222, cor: colors.cinema.amber }],
      ]}
    />
  </AbsoluteFill>
);
