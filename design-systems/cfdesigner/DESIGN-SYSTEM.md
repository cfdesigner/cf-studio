# CFDesigner: ficha de produção

Como ESTE design system faz cada coisa. O brand book (cores, voz, logo) está em `README.md`; aqui está o "como produzir".

**Identidade em uma linha:** cinema escuro, contido, com um único ponto de luz dourada (âmbar). Limpo e premium.

```ts
import {
  Legendas,
  LowerThird,
  CountUp,
  LogoOutro,
  colors,
  imagery,
} from "../design-systems/cfdesigner";
```

## Movimento (a personalidade)

- **Seco e cinematográfico.** Cortes secos ou fades de 200–300 ms. Entradas com desaceleração forte (expo-out) e, no máximo, um leve "back" no terceiro de nome. Nada elástico, nada saltitante.
- As curvas estão em `movimento.ts`. Os efeitos em `efeitos/` (guia: `docs/efeitos.md`).

## Transições

- `FlashCut` (clarão branco-gelo, 12 frames) e `LightLeak` (vazamento âmbar, ~1 s) **em cortes**. Nunca atrás de texto.
- `WipeReveal` para revelar blocos; `BlurIn` para entradas suaves.
- `TextoAtras`: texto entrando atrás da pessoa recortada (veja Legendas).
- Um destaque âmbar por peça: não empilhe efeito âmbar com texto âmbar no mesmo instante.

## Legendas

- **Dia a dia (70–80% do vídeo):** Montserrat 700, branco gelo, **contorno preto fino, sem tarja/caixa/linha**; a palavra falada em âmbar. Quebra de linha balanceada.
- **Frase de efeito:** "Título de cinema": palavra-chave gigante em âmbar (Bebas), o resto pequeno em branco, fundo levemente escurecido, leve zoom. Só frases curtas e fortes. A palavra-chave é um número, se houver; senão a mais longa.
- **Posição:** acima dos ~24% de baixo (botões de Reels/Shorts).
- **Agrupamento** (`buildPages`): até 34 caracteres, 7 palavras, pausa de 550 ms.
- **Entrelinha 1,12** (escolha do dono, entre 1,25, 1,12 e 1,0): as linhas ficam mais próximas, mas as letras que descem (g, p, q, ç) ainda têm folga. Parâmetro `entrelinha`.
- **Frase de efeito atrás da pessoa** (`TextoAtras`, alternativa ao Título de cinema quando a pessoa está falando para a câmera): texto gigante em Bebas, branco gelo + uma palavra em âmbar, sobe de baixo para cima atrás da cabeça, com a pessoa recortada por cima. Guia em `docs/efeitos.md`; recorte em `tecnicas/recorte-pessoa/`. Aprovada pelo dono.
- Componente: `Legendas` (captions + punchLines aprovadas). As frases de efeito são sugeridas por `scripts/frases-de-efeito.mjs` e **sempre aprovadas pelo dono**.

## Terceiro de nome

`LowerThird`: rótulo pequeno em petróleo claro, nome em Bebas branco, fio âmbar que se desenha. Fica acima dos 26% de baixo.

## Números

`CountUp`: Bebas branco, sufixo em âmbar, para e pulsa de leve. Para números concretos (o brand book pede "48h", "30 segundos").

## Fecho

`LogoOutro`: logo metálico empilhado sobre void, grande. A assinatura embaixo é **minúscula, cinza e só com fade lento** (decisão do dono: o logo é o destaque).

## Gráficos (`graficos/`)

Vindos do vídeo de referência C01 e aprovados pelo dono. Todos em corte seco (aparecem de uma vez), sem animação de entrada.

- `ChecklistCard`: cartão escuro com borda dourada fina, chamada em Montserrat espaçada e itens em Bebas Neue com caixinha. Marcas `x` (riscado e apagado) e `check` (dourado) trocam num quadro só. Marque uns décimos de segundo ANTES da palavra dita.
- `IconeRotulo`: quadrado escuro com ícone dourado (`cronometro` com ponteiro girando, `play`) e palavra em Bebas dourado. **Inclinado 25° em X e 25° em Y por padrão** (`inclinacao`, `inclinacaoY`); o sentido do Y é automático: a caixinha fica sempre virada para o centro da imagem.
- `PalavraRiscada`: chamada dourada pequena e palavra grande em Bebas branco com fio dourado.
- `TelaComRosto`: fundo preto, gravação de tela em cima e câmera embaixo em moldura arredondada.
- `FechoSimples`: preto puro e logo horizontal branco pequeno (~36% da largura), com fade. É o fecho mais discreto; o `LogoOutro` continua sendo o fecho grande.

Regra do dono: **nenhum gráfico fica na frente do rosto de ninguém**; ajuste `topo`/`esquerda`.

## Imagem e foto

Fotos em luz baixa, 70% ou mais em sombra, vinheta preta até `void` onde há texto. Sem filtros coloridos. Retratos em `assets/imagery` (`imagery.*`).

## Proibido neste design system

Neon, gradientes coloridos (só vinheta preta), emoji em peças, barras de REC/timecode/fps (o `ReelFrame` tem `bars={false}` por padrão: assim fica), texto grande e chamativo no fim.

## Exemplos que renderizam

`CFDesigner-Componentes` (quadro com tudo), `CFDesigner-Legendas-Exemplo`, `CFDesigner-Efeitos-Exemplo`, `CFDesigner-Graficos-Exemplo` (os 5 gráficos, usa imagens de apoio de `public/entrada/`) e `CFDesigner-Icone-Inclinacao` (amostra da inclinação).
