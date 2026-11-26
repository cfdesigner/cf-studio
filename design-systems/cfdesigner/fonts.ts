// Carrega as fontes da marca (Google Fonts) uma única vez. Importe este arquivo antes de renderizar texto.
import { loadFont as loadBebas } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadLato } from "@remotion/google-fonts/Lato";
import { loadFont as loadPlexMono } from "@remotion/google-fonts/IBMPlexMono";
import { loadFont as loadKaushan } from "@remotion/google-fonts/KaushanScript";
import { loadFont as loadYellowtail } from "@remotion/google-fonts/Yellowtail";
import { loadFont as loadDamion } from "@remotion/google-fonts/Damion";

loadBebas("normal", { weights: ["400"], subsets: ["latin"] });
loadMontserrat("normal", { weights: ["600", "700", "800"], subsets: ["latin"] });
loadMontserrat("italic", { weights: ["600"], subsets: ["latin"] });
loadLato("normal", { weights: ["400", "700"], subsets: ["latin"] });
loadPlexMono("normal", { weights: ["500"], subsets: ["latin"] });
loadKaushan("normal", { weights: ["400"], subsets: ["latin"] });
loadYellowtail("normal", { weights: ["400"], subsets: ["latin"] });
loadDamion("normal", { weights: ["400"], subsets: ["latin"] });
