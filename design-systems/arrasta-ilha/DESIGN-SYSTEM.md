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

## Temas por página do site
Fundamentos laranja · Toadas verde · Dança azul · **Percussão terracota** (`#c0622b`, do semicírculo da página; o título dela no site está em cinza, sem cor-tema) · Home petróleo. Grafismos da Percussão: sol de respingo, semicírculo com curvas de nível, folha larga com nervuras, faixa de triângulos. A foto real da página mostra alfaias com cordas e padrão de triângulos azuis: referência para fotos de instrumento.

## Grafismos, faixas e recortes (ORIGINAIS do site; regra do dono: ser fiel, não inventar)
Nada de grafismo desenhado por mim: tudo vem dos prints do site (material do próprio grupo). Faixas: as 5 que o dono enviou (`assets/faixas/`): X verde (Toadas), setas lilás (Percussão), zigue azul (Dança), triângulos verdes (Home), AXÉ · LUTA (Home). **Falta a faixa coral/rosa da página Fundamentos** (pedir ao dono). Recortes (`assets/recortes/`, gerados por `scripts/recortar-site.py` com rembg + filtros de cor): mulher com a bandeira, mulher com a cabaça, tocadores de caixa, tocador de agogô, tambores (alfaias), menino com caixa, sol de respingo, folhas, pontos, arcos, semicírculo com curvas, tracejado. **Pessoas de roupa branca (página Dança) não deram recorte limpo** (branco sobre branco): pedir os originais.
Uso em código: `Faixa` e `Recorte` (`components/Original.tsx`), catálogo em `assets/index.ts`. Cada peça usa a faixa da página do site a que o tema pertence.
- Recortes são do tamanho dos prints (até ~900 px de altura): não ampliar mais de ~1,3x; trocar pelos arquivos de origem em alta quando o grupo mandar.
- Grafismos e recortes nunca passam por cima de texto; rostos livres.
- Fotos de pessoas só com autorização do grupo (as dos recortes são as que o próprio grupo já publicou no site).

## Modelos de peça (feed 4:5, em aprovação)
**A** aviso do ensaio (mulher da bandeira, faixa de triângulos, laranja) · **B** toada nova (tocador de agogô, faixa de X, verde) · **C** oficina com mestre (tocadores, faixa de zigue azul, azul-marinho, campos entre colchetes) · **D** toque de percussão (alfaias, faixa de setas, terracota) · **E** destaque institucional (mulher com a cabaça, faixa AXÉ · LUTA). Composições `ArrastaIlha-ModeloA-Aviso`, `-B-Toada`, `-C-Oficina`, `-D-Percussao`, `-E-Destaque`, `ArrastaIlha-Recortes`.
