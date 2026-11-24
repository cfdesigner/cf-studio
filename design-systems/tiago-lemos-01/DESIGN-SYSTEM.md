# tiago-lemos-01: ficha de produção

**Identidade em uma linha:** fala direta em tela dividida, escura e dourada, com um elemento animado por ideia e legenda palavra por palavra.

```ts
import { VideoTiagoLemos, type Edicao } from "../design-systems/tiago-lemos-01";
```

## Referências de origem

Um vídeo de referência (anúncio vertical de Stories, 45,6 s). Extraído: layout dividido, títulos condensados com palavra em ouro, legenda curta com palavra-chave dourada, fundo escuro com brilho, ícones e números grandes, chips mono, fala emendada sem música contínua. **Não** copiamos a interface do Instagram, o logo nem os textos do anúncio.

## Movimento (a personalidade)

Rápido, firme e limpo (`movimento.ts`). Entrada em expo: 14 quadros, sobe ~70 px, escala 0,94→1. Saída curta: 9 quadros, sobe 40 px e some com leve desfoque. Títulos se revelam subindo de uma máscara; ícones se desenham traço a traço (stagger de 4 quadros); números contam até o valor em ~26 quadros; listas entram item a item (9 quadros). Nada elástico, nada de balanço forte; só o ícone flutua de leve.

## Transições

Corte seco. Não há transição entre trechos (o vídeo cortado já corre emendado). A troca de elemento no painel é a própria saída + entrada. Só **um** elemento principal por vez: `de`/`ate` não se sobrepõem.

## Legendas

Palavra por palavra (`Legenda`): grupos de até 3 palavras (≤ 24 letras, nunca terminam em artigo/preposição); cada palavra aparece no instante em que é falada (pop de 5 quadros) e o grupo some quando acaba. Poppins 700 branca, palavra-chave em **ouro**. Posição: colada logo acima do quadro do rosto (`layout.legendaBase`); no layout `cheio`, a 78% da altura. Modo `uma`: só a palavra falada. **Nunca termina com ponto final nem reticências** (`tiraPontoFinal`). Palavras-chave (`destaques`) são aprovadas pelo dono: nomes, números, termos de oferta/resultado.

## Terceiro de nome

Não usar, a menos que o dono peça no comando (regra do `CLAUDE.md`).

## Números e destaques

Elemento `numero`: valor em ouro degradê gigante (Bebas), contagem animada, rótulo em branco com palavra em ouro. Elemento `titulo`: 1 a 3 linhas grandes. `lista`: itens com check dourado.

## Elementos (o que ilustra a fala)

| `tipo` | Quando usar | Campos |
| --- | --- | --- |
| `icone` | uma ideia concreta ("foguete", "calendário", "chat") | `icone`, `titulo?` (≤ 3 palavras, `*ouro*`), `kicker?` |
| `titulo` | frase de impacto ou conceito | `linhas[]` (`*ouro*`), `kicker?` |
| `numero` | número que a pessoa fala | `valor`, `prefixo?`, `sufixo?`, `rotulo?` |
| `lista` | enumeração (2 a 4 itens) | `itens[]` |

Rótulo (`kicker`) é opcional e discreto. Menos texto, menor, mais suave.

## Som

Dois sons por elemento: um **suave** (ar que abre) 3 quadros antes de entrar e outro (ar que fecha) no início da saída. Seis arquivos sintetizados (`assets/sfx/entra-1..3`, `sai-1..3`; gerador `assets/sfx/gerar.py`), ataque lento, sem transiente, sem clique. Pico de cada um em −20 dBFS; na mixagem com voz a −3,7 dBFS o pico dos efeitos fica em ≈ −23 dBFS (≈ 19 dB abaixo da voz; regra do dono: no mínimo 12 dB). `ganhoSfx` abaixa mais. Se o dono mandar sons dele, troque os arquivos.

## Fecho

Sem fecho padrão: termina quando a fala termina (≈ 0,3 s de folga). Se o dono pedir, fazer um elemento `titulo` final ("CHAMADA PARA AÇÃO"), sem inventar logo.

## Imagem e vídeo

Vídeo do rosto em `cover`, ajustável por `rostoY` (altura do rosto no original, 0–100%). **Gráficos nunca ficam na frente do rosto**: no layout dividido isso é garantido (painel separado); no `cheio` os elementos ficam no topo, menores, e é preciso conferir o quadro.

## Proibido neste design system

Ponto final na legenda; barras de REC/timecode; mais de um elemento ao mesmo tempo; efeitos sonoros altos ou com clique; misturar elementos de outro design system; terceiro de nome sem pedido.

## Exemplos que renderizam

`TiagoLemos01-Exemplo` (dividido) e `TiagoLemos01-Exemplo-Cheio`. Dados em `exemplo/exemplo.ts`.
