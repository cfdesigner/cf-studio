# Design systems

Cada design system é **independente e completo**: tem o seu jeito de fazer cores, tipografia, movimento, transições, legendas, terceiros, números e fecho. Nada de um vaza para o outro.

| Pasta         | Marca / estilo                                                               | Ficha de produção             |
| ------------- | ---------------------------------------------------------------------------- | ----------------------------- |
| `cfdesigner/` | CFDesigner: cinema escuro com ponto de luz dourada                           | `cfdesigner/DESIGN-SYSTEM.md` |
| `certi/`      | CERTI: institucional, claro e tecnológico (completo: etapas 1 a 4 aprovadas) | `certi/DESIGN-SYSTEM.md`      |
| `tiago-lemos-01/` | Fala direta em tela dividida, escuro e dourado, legenda palavra por palavra, elementos animados e sons leves (skill `video-tiago-lemos`) | `tiago-lemos-01/DESIGN-SYSTEM.md` |
| `arrasta-ilha/` | Arrasta Ilha (maracatu, Florianópolis): quente e coletivo, creme com cor-tema por peça, letra de recorte manual (em construção, etapa 1) | `arrasta-ilha/DESIGN-SYSTEM.md` |

## O que cada pasta tem

```
<nome>/
  README.md          brand book (identidade, voz, cor, tipografia, regras)
  DESIGN-SYSTEM.md   ficha de produção (movimento, transições, legendas, terceiro, números, fecho, proibido)
  tokens.ts/.json    tokens (cores por tema, tipografia, espaço, raios, sombras, proporções)
  movimento.ts       personalidade de movimento (curvas e velocidades)
  fonts.ts           fontes
  components/        componentes visuais
  efeitos/           transições e animações deste design system
  assets/            logos e imagens
  docs/              documentação por componente
  exemplo/           exemplos que renderizam
  composicoes.tsx    composições de exemplo, registradas no src/Root.tsx
  index.ts           ponto de entrada
```

## Criar um novo

Use a skill `criar-design-system` (parte de imagens ou vídeos de referência). O ponto de partida é `_modelo/`.

## O que NÃO fica aqui

Técnicas gerais sem marca (transcrição, lógica de texto das legendas) ficam em `scripts/` e `tecnicas/`. Os vídeos de verdade ficam em `producoes/`.
