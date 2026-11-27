// Carrega as fontes do Arrasta Ilha (Google Fonts) uma única vez.
import { continueRender, delayRender } from "remotion";
import zenzeroUrl from "./assets/fonts/ZenzeroGroteskSans-Regular.otf";
import { loadFont as loadOdibee } from "@remotion/google-fonts/OdibeeSans";
import { loadFont as loadKaushan } from "@remotion/google-fonts/KaushanScript";
import { loadFont as loadCrimson } from "@remotion/google-fonts/CrimsonPro";
import { loadFont as loadStaatliches } from "@remotion/google-fonts/Staatliches";

loadOdibee("normal", { weights: ["400"], subsets: ["latin"] });
loadKaushan("normal", { weights: ["400"], subsets: ["latin"] });
loadCrimson("normal", { weights: ["400", "600"], subsets: ["latin"] });
loadStaatliches("normal", { weights: ["400"], subsets: ["latin"] });

// Zenzero Grotesk Sans: arquivo fornecido pelo dono (fonte dos títulos e do menu do site do grupo).
const espera = delayRender("Zenzero Grotesk Sans");
new FontFace("Zenzero Grotesk Sans", `url(${zenzeroUrl})`)
  .load()
  .then((face) => {
    document.fonts.add(face);
    continueRender(espera);
  })
  .catch(() => continueRender(espera));
