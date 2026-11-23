import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { FundoCF, variantesFundo, type VarianteFundo } from "../index";
import { colors, fontFamilies } from "../tokens";

const NOMES: Record<VarianteFundo, string> = {
  grade: "Grade técnica",
  orbitas: "Órbitas e bokeh",
  visor: "Visor de cinema",
  timeline: "Timeline",
  losangos: "Losangos",
  pontos: "Pontos",
};

const DURACAO = 90;

/** Mostra as 6 telas de fundo do CFDesigner, 3 s cada, com um título de exemplo por cima (1080×1920). */
export const ExemploFundos: React.FC<{ semTexto?: boolean }> = ({
  semTexto = false,
}) => (
  <AbsoluteFill style={{ background: colors.cinema.void }}>
    {variantesFundo.map((v, i) => (
      <Sequence key={v} from={i * DURACAO} durationInFrames={DURACAO}>
        <FundoCF variante={v} duracao={DURACAO} />
        {semTexto ? null : (
          <AbsoluteFill
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: fontFamilies.heading,
                fontWeight: 600,
                fontSize: 26,
                letterSpacing: "0.2em",
                color: colors.cinema.inkMuted,
                textTransform: "uppercase",
              }}
            >
              {`Fundo ${i + 1} de ${variantesFundo.length}`}
            </div>
            <div
              style={{
                fontFamily: fontFamilies.display,
                fontSize: 190,
                lineHeight: 0.95,
                color: colors.cinema.ink,
                marginTop: 16,
              }}
            >
              {NOMES[v].toUpperCase()}
            </div>
          </AbsoluteFill>
        )}
      </Sequence>
    ))}
  </AbsoluteFill>
);
