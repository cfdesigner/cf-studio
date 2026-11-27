# Arrasta Ilha: ficha de produção

**Identidade em uma linha:** cultura popular viva, quente e coletiva: creme com papel, cada peça com UMA cor-tema (laranja, verde, azul ou petróleo), faixas de grafismo e letra de recorte manual.

Estado: etapa 1 (cores, tipografia) **aprovada pelo dono em 27/11/2026** (espaçamento entre letras: o normal, sem juntar; a tentativa de juntar foi descartada). Etapa 2 (movimento e transições) em aprovação. Legendas, terceiro, números e fecho: próximas etapas.

## Movimento: a "batida" (proposta, a aprovar)
Sem vídeo de referência do grupo: a personalidade vem da identidade. Entra firme como pancada de alfaia, passa um pouco do ponto e assenta. Arquivo: `movimento.ts`; efeitos em `efeitos/`; exemplo `ArrastaIlha-Movimento` (stories 9:16, 9,6 s).
- **Título:** palavras sobem de uma máscara, uma 4 quadros depois da outra (`TituloBatida`), 14 quadros, curva `batida` (passa 20%).
- **Etiqueta e filete:** deslizam e se desenham, curva `firme` (sem passar).
- **Corte:** cortina em zigue-zague na cor da cena que entra, varrendo de baixo para cima, 16 quadros, ease inOut (`CortinaZigue`) + soco de 4% em 8 quadros (`SocoDeBatida`).
- **Fecho:** fundo noite, nome em pincel, linha de apoio pequena.
- Corte na batida: 96 BPM é hipótese; ajustar ao som real do grupo.
- **Nunca:** fade longo, elástico exagerado, giro, blur pesado.

## Regras provisórias (valem já)
- **Títulos: Zenzero Grotesk Sans, só a Sans (a Round foi descartada pelo dono), com contorno de 1,8% do corpo (1,5 px em 84 px), no máximo 2,4%.**
- **Uma cor-tema por peça** (como o site: Fundamentos laranja, Toadas verde, Dança azul).
- Fundo creme com respiro; texto escuro; sem tarja pesada.
- Não redesenhar logo, bandeira, ícones nem grafismos do grupo: usar os originais.
- Fotos de pessoas só com autorização do grupo; rosto nunca coberto por texto ou caixa.
- Linguagem inclusiva como o grupo escreve ("maracatuzeiros/as", "Amigues").
- Legenda nunca termina com ponto final nem reticências. Visual limpo e premium.

## Grafismos e modelos (etapa visual, em aprovação)
Desenhados a partir do repertório do site (não são os arquivos originais; trocar quando o grupo mandar): folha de palma, aglomerado de pontos, sol, arcos concêntricos, mancha orgânica, tracejado, moldura de tambor para fotos e faixas de padrão (zigue, losangos, triângulos, símbolos geométricos). Componentes em `components/Grafismos.tsx`; modelos em `components/Modelos.tsx`: **A** aviso (laranja), **B** foto em moldura de tambor (verde), **C** cartaz de oficina com mestre (azul, com campos entre colchetes). Composições `ArrastaIlha-Grafismos`, `ArrastaIlha-ModeloA-Aviso`, `-ModeloB-Moldura`, `-ModeloC-Oficina`.
- Grafismos nunca passam por cima de texto nem de rosto.
- Sem símbolos religiosos e sem figuras do grupo desenhadas por mim: só formas geométricas e vegetais.
