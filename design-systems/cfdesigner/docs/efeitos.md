# Efeitos de movimento (Remotion)

Componentes em `efeitos/`, importados de `design-systems/cfdesigner`. Todos usam os tokens do CFDesigner (tema Cinema) e escalam pelo menor lado do vídeo (`min(largura, altura) / 1080`), então servem em vertical e horizontal. Exemplo completo: `exemplo/ExemploEfeitos.tsx` (composição `CFDesigner-Efeitos-Exemplo`).

| Componente    | O que faz                                                                                                                                      | Props principais                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `LowerThird`  | Terceiro de nome/cargo: o rótulo cai, o nome sobe, o fio âmbar se desenha, tudo recolhe no fim. Fica acima dos 26% de baixo.                   | `kicker`, `name`, `durationInFrames`                                         |
| `CountUp`     | Número que desacelera e para exatamente no valor final, com um pulso discreto. Para números concretos ("48h", "30 segundos").                  | `to`, `from`, `prefix`, `suffix`, `decimals`, `durationInFrames`, `fontSize` |
| `PushIn`      | Aproximação lenta de câmera sobre foto ou vídeo.                                                                                               | `from`, `to`, `durationInFrames`, `originX/Y`                                |
| `CameraShake` | Tremor de câmera de mão, determinístico, com leve zoom pra esconder bordas.                                                                    | `intensity`, `speed`                                                         |
| `FlashCut`    | Clarão branco-gelo cobrindo um corte.                                                                                                          | `at`, `durationInFrames`                                                     |
| `LightLeak`   | Vazamento de luz âmbar atravessando o quadro, em cortes. **Nunca atrás de texto.**                                                             | `at`, `durationInFrames`, `from`                                             |
| `WipeReveal`  | Revela o conteúdo com uma cortina reta.                                                                                                        | `direction`, `from`, `durationInFrames`                                      |
| `BlurIn`      | Entrada suave: sai do desfoque, sobe e ganha opacidade.                                                                                        | `from`, `durationInFrames`, `blur`, `y`                                      |
| `FilmGrain`   | Granulado de filme animado (muda a cada quadro), 7% por padrão. Não usar sobre texto pequeno.                                                  | `opacity`                                                                    |
| `TextoAtras`  | Frase de efeito **atrás da pessoa**: texto gigante (Bebas) sobe de baixo para cima, de 0 a 100% de opacidade, e a pessoa recortada fica por cima. Precisa do recorte (`scripts/recortar-pessoa.py`). | `linhas`, `pessoa`, `quadros`, `entra`, `sai`, `fundoPct`, `escurece`        |
| `LogoOutro`   | Fecho: logo metálico empilhado sobre void. A assinatura embaixo é de propósito bem discreta (pequena, cinza, só um fade): o logo é o destaque. | `tagline`, `durationInFrames`                                                |

## Regras de uso

- Um único destaque âmbar por peça (o brand book). `LowerThird` (fio) e `CountUp` (sufixo) já usam âmbar: não empilhe vários no mesmo instante.
- Sem barras de REC/timecode (decisão do dono).
- Efeitos de corte (`FlashCut`, `LightLeak`) ficam na raiz da composição, com `at` em frames globais; os demais ficam dentro de `<Sequence>` (o tempo começa em 0 na sequência).
- `LowerThird` e `LogoOutro` precisam de `durationInFrames` igual ao da `<Sequence>` onde estão, pra animar a saída.

## Texto atrás da pessoa (`TextoAtras`)

Aprovado pelo dono no C02 ("MUITO MAIS INTERESSANTE"). Passo a passo:

1. Recorte só o trecho: `scripts/recortar-pessoa.py` (veja `tecnicas/recorte-pessoa/README.md`).
2. Dentro de uma `<Sequence>` por cima do vídeo da pessoa:

```tsx
<TextoAtras
  pessoa="entrada/pessoa-c02" quadros={108} entra={69} sai={107}
  linhas={[
    [{ texto: "MUITO", tamanho: 170 }, { texto: "MAIS", tamanho: 310 }],
    [{ texto: "INTERESSANTE", tamanho: 222, cor: colors.cinema.amber }],
  ]}
/>
```

- **Receita visual:** palavra de apoio menor ("MUITO"), palavra forte maior ("MAIS"), as duas em branco gelo; a palavra-chave em outra cor (âmbar), na linha de baixo e um pouco menor. Cada linha sobe 150 px com expo-out e opacidade 0 a 100%, a de baixo 4 quadros depois. Sem desfoque, sem escala.
- **Posição:** o bloco termina em ~41% da altura (`fundoPct`): fica da cabeça para cima e a cabeça/boné cobre parte da linha de baixo. Confira o quadro e ajuste `fundoPct` para cada enquadramento.
- **Fundo:** escurece só 7% (`escurece`). O dono não gostou de fundo escuro: nada de vinheta pesada.
- Só frase curta e forte, no máximo 2 linhas; só em planos com a pessoa falando para a câmera e sem outro elemento na frente (mesas, braços cruzando o texto etc. conferir no quadro). O texto some no corte.
- O recorte tem limite nas pernas e mãos soltas: o texto fica acima da cabeça. O destaque âmbar é o da peça: não empilhar com outro âmbar no mesmo instante.

## Créditos

Os efeitos foram **inspirados** no catálogo de blocos do HyperFrames (https://github.com/heygen-com/hyperframes, licença Apache-2.0): a ideia de cada efeito e a ordem/tempo da animação do `LowerThird` (bloco `lt-kicker-name`). O código foi escrito do zero em Remotion/React com os tokens do CFDesigner; nenhum arquivo do HyperFrames foi copiado ou é usado como dependência.
