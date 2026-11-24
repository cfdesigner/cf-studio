// Fontes do tiago-lemos-01 (Google Fonts, carregadas uma vez). Identificadas a olho no vídeo de referência:
// título = condensada alta e pesada (Bebas Neue), legenda = geométrica negrito (Poppins), rótulo = mono (Space Mono).
import { loadFont as loadBebas } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { loadFont as loadSpaceMono } from "@remotion/google-fonts/SpaceMono";

loadBebas("normal", { weights: ["400"], subsets: ["latin"] });
loadPoppins("normal", { weights: ["600", "700"], subsets: ["latin"] });
loadSpaceMono("normal", { weights: ["700"], subsets: ["latin"] });
