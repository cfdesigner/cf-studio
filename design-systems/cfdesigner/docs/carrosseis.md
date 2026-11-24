# Catálogo de modelos de carrossel (CFDesigner, Instagram 4:5)

Cada modelo tem um **nome** (escolhido pelo dono). Para pedir: "faça um carrossel no modelo <nome>". Receita geral e como montar um novo: `producoes/carrossel-video-ia/README.md`. Regras de identidade (fundo claro, âmbar, Bebas/Montserrat, losango, logo em plaquinha preta, rodapé fixo): `design-systems/cfdesigner/DESIGN-SYSTEM.md`, seção "Carrossel".

**Fluxo de qualquer modelo:** só informação real (texto/artigo/prints do dono) → rascunho com os textos para aprovação → exportar PNG (`--scale=2.5 --image-format=png`).

## Passo a passo

- **Para quê:** ensinar um processo ou método em etapas (tutorial, "como fazer").
- **Estrutura (8 slides):** capa com a sua foto recortada sobre círculo âmbar · o ponto · o que precisa · etapas com título e lista curta (uma por slide) · exemplo de comando/uso · escala · fecho com chamada.
- **Visual:** palavra-chave em marca-texto âmbar, número fantasma ao fundo (3 e 7), fita âmbar entre slides, cartões inclinados com suas fotos que atravessam a divisa, círculo de foto sua, quadros de proporção.
- **O que o dono manda:** texto ou artigo colado (o site pode estar bloqueado na rede).
- **Exemplo:** "Claude Code para edição de vídeo" · código `producoes/carrossel-video-ia/CarrosselClaudeCode.tsx` (composição `CarrosselClaudeCode`).

## Ranking

- **Para quê:** comparar ferramentas ou opções (top 5, "qual escolher").
- **Estrutura (8 slides):** capa em mosaico ou com figura · um slide por item (nome em marca-texto, etiqueta de categoria, preço em pílula, 3 pontos) · resumo "Qual escolher?" · fecho com sua foto em arco, cabeça saindo da moldura.
- **Visual:** **uma composição diferente por item** (losango, celular, janela de navegador, leque de cartões, notebook), com **print real do app** e **logo real em círculo** (fundo estendido na cor do logo). Marcador diferente por item.
- **O que o dono manda:** texto do comparativo, **print e logo (PNG/SVG) de cada item**, e a fonte para citar. Preços podem variar: avisar no slide final.
- **Exemplo:** "5 geradores de vídeo com IA" · código `producoes/carrossel-video-ia/CarrosselGeradores3.tsx` (composição `CarrosselGeradores3`); prints e logos em `producoes/carrossel-video-ia/assets/ferramentas/`.

## Impacto

- **Para quê:** rankings, comparativos e conteúdos de opinião com capa forte, no estilo "título gigante + arte desconstruída" (referência de capas de redes sociais).
- **Estrutura (8 slides):** capa com arte vazando do título · ranking com pódio · método/critério · um slide por item com **arte própria ligada ao conteúdo** · resumo "Qual escolher?" só tipografia · fecho com **a foto do dono só aqui**, cabelo passando um pouco sobre o título.
- **Visual:** fundo **alternando âmbar e preto cinema**, Bebas Neue gigante em caixa alta, palavra de destaque em placa (preta com letra âmbar no fundo âmbar; letra âmbar direta no fundo preto), losangos tom sobre tom, sombra rígida fina na cor do fundo no título da capa. Artes em **papel rasgado, meio-tom, ouro líquido e pixels dourados**, só em preto e âmbar, **sem texto dentro da imagem**, PNG transparente.
- **O que o dono manda:** o texto do assunto (só informação coerente; avisar o que foi deixado de fora). As artes são **geradas no Magnific, só com pedido explícito do dono e custo mostrado antes** (135 créditos cada, modelo `gpt-2-6`, 3:4, fundo transparente); o dono não quer o dono na capa nem nos slides, só no fecho.
- **Exemplo:** "Melhor gerador de imagens com IA" (fonte llm-stats.com, nov/2026) · código `producoes/carrossel-video-ia/CarrosselImpacto.tsx` (composição `CarrosselImpacto`); artes em `producoes/carrossel-video-ia/assets/impacto/`.
- **Nome:** "Impacto" é provisório (sugestão minha); o dono pode renomear.

## Próximos modelos

Os nomes novos entram aqui conforme o dono for passando os carrosséis.
