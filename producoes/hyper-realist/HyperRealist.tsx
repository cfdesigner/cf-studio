import React from "react";
import { AbsoluteFill, interpolate, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { BlurIn } from "../../design-systems/cfdesigner/efeitos";
import { colors, fontFamilies } from "../../design-systems/cfdesigner/tokens";
import "../../design-systems/cfdesigner/fonts";
import { clamp, outExpo } from "../../design-systems/cfdesigner/movimento";

export const HYPER_FRAMES = 121;
const c = colors.cinema;

/** Texto no canto inferior esquerdo (CFDesigner): título em Bebas e fio âmbar; apoio pequeno e discreto. */
export const HyperRealist: React.FC = () => {
  const f = useCurrentFrame();
  const fio = interpolate(f, [14, 40], [0, 1], { ...clamp, easing: outExpo });
  return (
    <AbsoluteFill style={{ backgroundColor: c.void }}>
      <OffthreadVideo src={staticFile("entrada/hyper-realist.mov")} />
      <AbsoluteFill style={{ background: "linear-gradient(to top, rgba(11,12,14,.55) 0%, rgba(11,12,14,0) 28%)" }} />
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "flex-start", padding: "0 72px 150px" }}>
        <div style={{ display: "grid", gap: 14, justifyItems: "start" }}>
          <BlurIn from={8} durationInFrames={20}>
            <div style={{ fontFamily: fontFamilies.display, fontSize: 104, lineHeight: 0.95, letterSpacing: "0.03em", textTransform: "uppercase", color: c.ink, textShadow: "0 4px 28px rgba(0,0,0,.65)" }}>
              Hyper realist skill
            </div>
          </BlurIn>
          <div style={{ height: 4, width: 150, background: c.amber, transformOrigin: "0 50%", transform: `scaleX(${fio})` }} />
          <BlurIn from={22} durationInFrames={20} blur={12} y={14}>
            <div style={{ fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: 30, letterSpacing: "0.2em", textTransform: "uppercase", color: c.amberText, textShadow: "0 2px 16px rgba(0,0,0,.7)" }}>
              Seedance 2.5
            </div>
          </BlurIn>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
