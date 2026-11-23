// Design system CFDesigner para Remotion.
import portraitNeon from "./assets/imagery/portrait-neon.png";
import portraitEditingDesk from "./assets/imagery/portrait-editing-desk.jpg";
import studioSetup from "./assets/imagery/studio-setup.webp";
import timelineCloseup from "./assets/imagery/timeline-closeup.webp";
import manifestoBanner from "./assets/imagery/manifesto-banner.png";

export * from "./components";
export * from "./tokens";
export * from "./fundos";

/** Fotos da marca. Veja assets/imagery/README.md para o uso de cada uma. */
export const imagery = {
  portraitNeon,
  portraitEditingDesk,
  studioSetup,
  timelineCloseup,
  manifestoBanner,
};
export {
  buildPages,
  tiraPontoFinal,
  suggestPunchLines,
  pickKeywordIndex,
  type Caption,
  type PunchLine,
  type Page,
  type PunchCandidate,
} from "../../tecnicas/legendas/texto";
export * from "./efeitos";
export * from "./graficos";
