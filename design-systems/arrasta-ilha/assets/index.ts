// Grafismos, faixas e recortes ORIGINAIS do site do grupo (prints do arrastailha.com.br, material do próprio grupo).
// Recortes gerados por scripts/recortar-site.py; trocar pelos arquivos de origem em alta quando o grupo enviar.
import faixaVerdeXis from "./faixas/faixa-verde-xis.png";
import faixaLilasSetas from "./faixas/faixa-lilas-setas.png";
import faixaAzulZigue from "./faixas/faixa-azul-zigue.png";
import faixaVerdeTriangulos from "./faixas/faixa-verde-triangulos.png";
import faixaSimbolos from "./faixas/faixa-simbolos-axe-luta.png";
import ofTriangulos from "./oficiais/triangulos.png";
import ofHexagonos from "./oficiais/hexagonos.png";
import ofAxeBuzios from "./oficiais/axe-buzios.png";
import ofIcones from "./oficiais/icones.png";
import ofArmas from "./oficiais/armas.png";
import ofDancarinos from "./oficiais/dancarinos.png";
import ofMaracatu from "./oficiais/maracatu.png";
import coroa from "./oficiais/coroa.png";
import seloArrastaIlha from "./oficiais/selo-arrasta-ilha.png";
import arrastaIlhaVertical from "./oficiais/arrasta-ilha-vertical.png";
import passaroParasol from "./oficiais/passaro-parasol.png";
import padraoOficial from "./oficiais/padrao-oficial.jpg";
import mulherBandeira from "./recortes/mulher-bandeira.png";
import mulherCabaca from "./recortes/mulher-cabaca.png";
import tocadoresCaixa from "./recortes/tocadores-caixa.png";
import tocadorAgogo from "./recortes/tocador-agogo.png";
import tambores from "./recortes/tambores.png";
import meninoCaixa from "./recortes/menino-caixa.png";
import solRespingo from "./recortes/sol-respingo.png";
import folhaLarga from "./recortes/folha-larga.png";
import folhaToadas from "./recortes/folha-toadas.png";
import folhaFundamentos from "./recortes/folha-fundamentos.png";
import folhaDanca from "./recortes/folha-danca.png";
import pontosClaros from "./recortes/pontos-claros.png";
import pontosLaranja from "./recortes/pontos-laranja.png";
import pontosDanca from "./recortes/pontos-danca.png";
import semicirculoCurvas from "./recortes/semicirculo-curvas.png";
import arcosAzuis from "./recortes/arcos-azuis.png";
import manchaPessego from "./recortes/mancha-pessego.png";
import manchaAzul from "./recortes/mancha-azul.png";
import tracejadoLaranja from "./recortes/tracejado-laranja.png";

/** Faixas de padrão (cada uma pertence a uma página do site). */
export const faixas = {
  verdeXis: { src: faixaVerdeXis, w: 1036, h: 35 }, // página Toadas
  lilasSetas: { src: faixaLilasSetas, w: 1080, h: 34 }, // página Percussão
  azulZigue: { src: faixaAzulZigue, w: 1198, h: 40 }, // página Dança
  verdeTriangulos: { src: faixaVerdeTriangulos, w: 1851, h: 43 }, // Home
  simbolos: { src: faixaSimbolos, w: 1766, h: 35 }, // Home: AXÉ · LUTA (búzios, facas, chifre)
  ofTriangulos: { src: ofTriangulos, w: 418, h: 25 }, // OFICIAL (folha de grafismos do grupo)
  ofHexagonos: { src: ofHexagonos, w: 418, h: 27 }, // OFICIAL (folha de grafismos do grupo)
  ofAxeBuzios: { src: ofAxeBuzios, w: 330, h: 29 }, // OFICIAL (folha de grafismos do grupo)
  ofIcones: { src: ofIcones, w: 330, h: 56 }, // OFICIAL (folha de grafismos do grupo)
  ofArmas: { src: ofArmas, w: 417, h: 31 }, // OFICIAL (folha de grafismos do grupo)
  ofDancarinos: { src: ofDancarinos, w: 417, h: 57 }, // OFICIAL (folha de grafismos do grupo)
  ofMaracatu: { src: ofMaracatu, w: 417, h: 18 }, // OFICIAL (folha de grafismos do grupo)
} as const;
export type FaixaNome = keyof typeof faixas;

/** Recortes: pessoas e instrumentos (tamanho original em px) e grafismos. */
export const recortes = {
  mulherBandeira: { src: mulherBandeira, w: 392, h: 870 },
  mulherCabaca: { src: mulherCabaca, w: 512, h: 661 },
  tocadoresCaixa: { src: tocadoresCaixa, w: 400, h: 529 },
  tocadorAgogo: { src: tocadorAgogo, w: 436, h: 792 },
  tambores: { src: tambores, w: 508, h: 525 },
  meninoCaixa: { src: meninoCaixa, w: 213, h: 604 },
  solRespingo: { src: solRespingo, w: 194, h: 191 },
  folhaLarga: { src: folhaLarga, w: 154, h: 368 },
  folhaToadas: { src: folhaToadas, w: 422, h: 292 },
  folhaFundamentos: { src: folhaFundamentos, w: 311, h: 418 },
  folhaDanca: { src: folhaDanca, w: 289, h: 378 },
  pontosClaros: { src: pontosClaros, w: 139, h: 138 },
  pontosLaranja: { src: pontosLaranja, w: 165, h: 179 },
  pontosDanca: { src: pontosDanca, w: 125, h: 119 },
  semicirculoCurvas: { src: semicirculoCurvas, w: 310, h: 177 },
  arcosAzuis: { src: arcosAzuis, w: 288, h: 226 },
  manchaPessego: { src: manchaPessego, w: 328, h: 220 },
  manchaAzul: { src: manchaAzul, w: 259, h: 181 }, // cortada na borda direita do print: encostar fora do quadro
  tracejadoLaranja: { src: tracejadoLaranja, w: 234, h: 197 },
  coroa: { src: coroa, w: 88, h: 88 }, // OFICIAL
  seloArrastaIlha: { src: seloArrastaIlha, w: 140, h: 44 }, // OFICIAL
  arrastaIlhaVertical: { src: arrastaIlhaVertical, w: 36, h: 134 }, // OFICIAL
  passaroParasol: { src: passaroParasol, w: 42, h: 142 }, // OFICIAL
} as const;
export type RecorteNome = keyof typeof recortes;

/** Folha oficial de grafismos (1472x566), repete sem emenda: usar como padrão de fundo, nunca esticada. */
export const padrao = { src: padraoOficial, w: 1472, h: 566 } as const;
