# Fundos (`FundoCF`)

Telas de fundo animadas para cenas **sem foto ou vídeo**: passo a passo, explicações, frases, listas, fecho. Preto `void` com elementos gráficos finos em **bronze** (`colors.cinema.bronze`, `#8a6a2a`, o metal do logo), bem transparentes e em movimento lento. Aprovadas pelo dono: "ficou muito legal, como telas de fundo".

```tsx
import { FundoCF } from "../design-systems/cfdesigner";

<Sequence from={72} durationInFrames={72}>
  <FundoCF variante="grade" duracao={72} />
  {/* conteúdo por cima */}
</Sequence>
```

## As 6 variantes

| `variante`   | Clima                                | O que tem (e como se move)                                                                                              | Bom para                                  |
| ------------ | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `grade`      | Técnico, "mesa de edição"            | Grade fina que desliza na diagonal e some nas bordas, régua na lateral, cruzes que piscam em sequência, losango, cantos | Passo 1, roteiro, listas, conceitos       |
| `orbitas`    | Suave, cinematográfico               | Círculos concêntricos (dois tracejados girando), pontinhos em órbita, **bokeh** desfocado que respira                   | Lugares, cenários, "ao redor", transições |
| `visor`      | Geométrico, enquadramento            | Linhas dos terços que se desenham, mira central, cantos de enquadramento, losango grande que gira de leve               | Frase de efeito, título, destaque         |
| `timeline`   | "Isto é edição"                      | Régua de timecode que corre, cabeça de leitura, blocos de clipes em três trilhas                                         | Resultado, edição, bastidores de edição   |
| `losangos`   | Elegante, eco do logo                | Treliça de losangos que desliza, três losangos concêntricos ao centro, losangos que acendem                              | Fecho, abertura, marca                    |
| `pontos`     | Limpo, hipnótico                     | Matriz de pontos com uma onda de luz que sai do centro                                                                   | Explicações, números, dados               |

**Regra do dono:** use **uma variante diferente a cada cena** (não repita a mesma em todas). Cenas com foto ou vídeo ficam sem `FundoCF`, o fundo é a imagem.

## Props

| Prop         | Padrão          | Para quê                                                                                                   |
| ------------ | --------------- | ---------------------------------------------------------------------------------------------------------- |
| `variante`   | (obrigatório)   | `grade`, `orbitas`, `visor`, `timeline`, `losangos` ou `pontos`                                            |
| `intensidade`| 1               | Multiplicador da opacidade; 0,6 deixa ainda mais discreto                                                   |
| `entrada`    | 18 quadros      | Tempo em que os traços se desenham e a tela surge (expo-out)                                               |
| `duracao`    | (nenhum)        | Duração da cena em quadros; se informada, a tela some em fade nos últimos `saida` quadros                  |
| `saida`      | 10 quadros      | Fade de saída (só com `duracao`)                                                                           |
| `foco`       | `{x:.5,y:.45}`  | Centro visual (grade, órbitas, visor, losangos, pontos): ponha onde está o conteúdo principal              |
| `fundo`      | true            | Pinta o `void` por baixo. `false` para pôr os traços por cima de uma foto escurecida                        |
| `granulado`  | true            | `FilmGrain` leve (5%) por cima                                                                              |
| `cor`        | bronze          | Muda a cor dos traços (evite: o bronze é o padrão do design system)                                         |

## Regras de uso

- O bronze é a cor dos traços, **nunca** o âmbar forte. O âmbar continua sendo o destaque do texto (um por cena).
- Os elementos ficam em 15% a 55% de opacidade: o texto e os gráficos (checklist, cartões, caixinhas) mandam. Se algo competir com o conteúdo, baixe `intensidade`.
- Caixinhas por cima continuam **viradas para dentro** (regra do dono).
- Escala pela menor lado do vídeo (1080 = 1), então serve em vertical e horizontal.
- O movimento é lento de propósito (a grade anda ~0,25 px por quadro). Para cenas de mais de ~15 s, a grade pode precisar de um laço; avise.
- Exemplo que renderiza: composição `CFDesigner-Fundos-Exemplo` (6 telas, 3 s cada).

## Receita do vídeo "Um vídeo nasce aqui" (Stories de 15 s)

| Cena                      | Fundo                 |
| ------------------------- | --------------------- |
| Gancho, tripé (fotos)     | foto, sem `FundoCF`   |
| Passo 01: roteiro         | `grade`               |
| Passo 03: 4 cenários      | `orbitas`             |
| Passo 04: resultado       | `timeline`            |
| Frase "Cinema em 15 s"    | `visor`               |
| Fecho                     | `losangos` (`intensidade={0.6}`) |
