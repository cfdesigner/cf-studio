# Storyboard e guia de produção visuais (CFDesigner, linguagem A)

Receita criada no ep. 05 (26/11/2026). Serve para storyboards, guias de produção e apresentações a clientes.

## Onde está cada coisa

- **Modelo da página:** `producoes/serie-conteudos-cfdesigner/ep05-ia-vs-tradicional/storyboard-modelo.html` (CSS e estrutura) + `gerar_storyboard.py` (conteúdo das 10 cenas e geração). O guia usa o mesmo CSS: `gerar_guia.py`.
- **Para um episódio novo:** copiar a pasta do ep. 05, trocar as cenas em `gerar_storyboard.py` (lista `add(...)`), os desenhos em `quadros/desenhos/` e rodar `python3 .../gerar_storyboard.py`. Publicar o `.html` como Artifact (mesmo arquivo = mesma URL).
- **Imagens de layout** (rastro de luz, anel, esfera, ouro líquido, brilho, lente, gema, papel): `design-systems/cfdesigner/assets/layout-storyboard/`. Sobre fundo preto usa direto; só recortar (`scripts/preto-para-alpha.py`) se for para outro fundo.
- **Personagem (o dono):** `design-systems/cfdesigner/assets/personagem/folha-personagem-dono.webp` (rosto de frente, perfil e corpo). Sobe como referência de personagem no Magnific; sem ela o rosto não se mantém entre as cenas.
- **Vidro esfumaçado, título em pincel (`TituloScript`) e fases:** `DESIGN-SYSTEM.md`.

## Regras do dono para esse visual

- Tema preto (`#0b0c0e`), âmbar chapado, texto branco; capa de ponta a ponta com base reta; vidro esfumaçado nas caixinhas (preto com âmbar, linha mínima de âmbar).
- Texto pequeno e leve, margem lateral única (a capa e as seções alinham), tudo responsivo; o que não couber vira rolagem lateral e **mantém o formato** (ex.: cartões das fases inclinados).
- Sem caixa de "pedir mudança" no storyboard: as mudanças são pedidas na conversa.
- Quadros desenhados: Seedream 5.5, 9:16, 1k, estilo lápis com toque de aquarela, **folha de personagem como referência**; custo mostrado antes; 25 créditos sem referência, 35 com uma, 45 com duas.
