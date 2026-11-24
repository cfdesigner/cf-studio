import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../tokens";

/** Fundo escuro quente com brilho dourado no topo e grade sutil que deriva bem devagar. */
export const Fundo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const k = width / 1080;
  const passo = 64 * k;
  const desliza = (frame * 0.18 * k) % passo;
  return (
    <AbsoluteFill style={{ background: colors.fundo }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 90% 45% at 50% 22%, rgba(216,171,73,0.16), rgba(216,171,73,0) 70%), radial-gradient(ellipse 80% 40% at 50% 100%, rgba(216,171,73,0.05), rgba(0,0,0,0) 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)`,
          backgroundSize: `${passo}px ${passo}px`,
          backgroundPosition: `0 ${desliza}px`,
          maskImage:
            "radial-gradient(ellipse 85% 55% at 50% 30%, #000 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 55% at 50% 30%, #000 20%, transparent 75%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
