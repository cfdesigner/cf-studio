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
- `VeuDeLuz`: tela esbranquiçada que some (light leak elegante; escolha do dono no ep. 04).
- `VarreduraAmbar`: linha âmbar na transversal que revela a cena nova (mudança de etapa; escolha do dono no ep. 04).
- `WipeReveal` para revelar blocos; `BlurIn` para entradas suaves.
- `TextoAtras`: texto entrando atrás da pessoa recortada (veja Legendas).
- `TextoNoPlano`: texto preso a um plano rastreado do vídeo (parapeito, parede), entrando por trás de um objeto (árvore, pessoa). Aprovado pelo dono; guia em `docs/efeitos.md`.
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
- `ChecklistVertical`: versão em coluna do checklist, para vídeo/b-roll vertical (aprovada pelo dono no C02). Cartão escuro de cantos arredondados, borda dourada fina, **linha âmbar na lateral** e **perspectiva leve** (12° em X, 14° em Y) virada para o centro da imagem (sentido automático). Marque cada item uns 0,2 s antes da palavra. Posição por `esquerda`/`topo` (padrão: esquerda, no alto).
- `IconeRotulo`: quadrado escuro com ícone dourado (`cronometro` com ponteiro girando, `play`) e palavra em Bebas dourado. **Inclinado 25° em X e 25° em Y por padrão** (`inclinacao`, `inclinacaoY`); o sentido do Y é automático: a caixinha fica sempre virada para o centro da imagem.
- `PalavraRiscada`: chamada dourada pequena e palavra grande em Bebas branco com fio dourado.
- `TelaComRosto`: fundo preto, gravação de tela em cima e câmera embaixo em moldura arredondada.
- `EtiquetaRotulo`: etiqueta pequena (ícone de linha `celular`/`tripe`/`papel` + palavra em Bebas âmbar) em caixinha escura de borda dourada fina, inclinada e **virada para o centro** (sentido automático). Aparece em corte seco. Do vídeo "Um vídeo nasce aqui".
- `LinhaChamada`: anel tracejado que gira + linha fina que se desenha até um pontinho; liga um objeto à etiqueta. Cor branco gelo.
- `CantosVisor`: cantos finos de visor de câmera que se desenham em volta de uma área (ou do quadro todo).
- `SeloFlutuante`: selo pequeno e discreto que flutua embaixo da tela (texto espaçado entre fios bronze e losangos), por cima de todas as cenas. Ex.: "Making off".
- `LinhasDeSom` (**proposta do ep. 04, aguardando aprovação do dono**): caixinha semitransparente com uma faixa por camada de áudio (voz, ambiente, whoosh, impacto, tique) e uma linha de reprodução. Âmbar para efeitos, petróleo claro para voz e marcas. Fica ao lado do personagem, virada para o centro, nunca sobre o rosto. Props `trilha` e `alturaFaixa` deixam a caixinha mais esticada; `giroDe`/`giroAte` fazem ela girar no eixo vertical de um lado até o outro. Teste: composição `Ep04SomTeste`.
- `FechoSimples`: preto puro e logo horizontal branco pequeno (~36% da largura), com fade. É o fecho mais discreto; o `LogoOutro` continua sendo o fecho grande.

Regra do dono: **nenhum gráfico fica na frente do rosto de ninguém**; ajuste `topo`/`esquerda`.

## Fundos (`fundos/`)

Telas de fundo animadas para cenas sem foto/vídeo (passo a passo, explicações, frases, fecho): `FundoCF` com 6 variantes (`grade`, `orbitas`, `visor`, `timeline`, `losangos`, `pontos`). Preto `void` com traços finos em **bronze** (`#8a6a2a`), 15–55% de opacidade, movimento lento. **Uma variante diferente a cada cena**, nunca a mesma em todas. Aprovadas pelo dono. Guia e receita em `docs/fundos.md`; exemplo `CFDesigner-Fundos-Exemplo`.

## Carrossel (Instagram 4:5)

Aprovado pelo dono para carrosséis: **fundo branco** (`#ffffff`), **âmbar no lugar do petróleo** (blocos, círculos, fitas, marca-texto da palavra-chave, texto preto sobre o âmbar; nunca texto âmbar sobre branco), Montserrat 600 em frase normal para o título, Lato para apoio, Bebas só em palavras fantasma e fitas. Elementos (círculos, cartões inclinados, fitas, onda de som) **atravessam de um slide para o outro**: cada slide é uma janela de 1080 px sobre uma tela contínua de 8640 px. Logo em plaquinha preta sobre fundo claro. Fotos do dono recortadas com `rembg` (ver `producoes/carrossel-video-ia/`). Este uso de fundo claro vale só para carrossel.

## Imagem e foto

Fotos em luz baixa, 70% ou mais em sombra, vinheta preta até `void` onde há texto. Sem filtros coloridos. Retratos em `assets/imagery` (`imagery.*`).

## Proibido neste design system

Neon, gradientes coloridos (só vinheta preta), emoji em peças, barras de REC/timecode/fps (o `ReelFrame` tem `bars={false}` por padrão: assim fica), texto grande e chamativo no fim.

## Exemplos que renderizam

`CFDesigner-Componentes` (quadro com tudo), `CFDesigner-Legendas-Exemplo`, `CFDesigner-Efeitos-Exemplo`, `CFDesigner-Graficos-Exemplo` (os 5 gráficos, usa imagens de apoio de `public/entrada/`), `CFDesigner-Fundos-Exemplo` (as 6 telas de fundo) e `CFDesigner-Icone-Inclinacao` (amostra da inclinação).
