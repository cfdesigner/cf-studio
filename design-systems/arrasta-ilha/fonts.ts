// Carrega as fontes do Arrasta Ilha (Google Fonts) uma única vez.
import { loadFont as loadLondrina } from "@remotion/google-fonts/LondrinaSolid";
import { loadFont as loadKaushan } from "@remotion/google-fonts/KaushanScript";
import { loadFont as loadCrimson } from "@remotion/google-fonts/CrimsonPro";
import { loadFont as loadStaatliches } from "@remotion/google-fonts/Staatliches";

loadLondrina("normal", { weights: ["400", "900"], subsets: ["latin"] });
loadKaushan("normal", { weights: ["400"], subsets: ["latin"] });
loadCrimson("normal", { weights: ["400", "600"], subsets: ["latin"] });
loadStaatliches("normal", { weights: ["400"], subsets: ["latin"] });
