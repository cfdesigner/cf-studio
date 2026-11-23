# CFDesigner — design system (Remotion)

> Fonte: artefato "CFDesigner" na conta do claude.ai. Esta pasta é a versão para vídeo (Remotion).

## Como usar num vídeo

```tsx
import {
  ReelFrame,
  Manifesto,
  Logo,
  colors,
  imagery,
} from "../design-systems/cfdesigner";
```

- **Tokens:** `tokens.ts` (cores dos temas `cinema` e `daylight`, tipografia, espaço, raios, sombras, proporções). `tokens.json` é o original.
- **Componentes:** `components/*.tsx`, versões Remotion dos componentes do design system. Todos aceitam `scale` (padrão 1 = tamanho de web) para ajustar a vídeo 1080×1920.
- **Imagens e logos:** `assets/`, importadas por `logos` e `imagery` em `index.ts`.
- **Como produzir (movimento, transições, legendas, terceiro, números, fecho):** veja `DESIGN-SYSTEM.md`. Legendas: `components/Legendas.tsx`.
- **Efeitos de movimento** (terceiro de nome, contador, câmera, clarão, cortina, fecho...): `efeitos/`, veja `docs/efeitos.md`.
- **Telas de fundo** (`FundoCF`, 6 variantes em bronze para cenas sem foto): `fundos/`, veja `docs/fundos.md`.
- **Props de cada componente:** `docs/props.d.ts` e `docs/components/*.md`.
- **Vídeo sempre no tema Cinema** (escuro). Daylight é só para documentos.
- **Sem barras de REC/timecode nos vídeos.** O `ReelFrame` traz barras letterbox (REC, timecode, @cfdesigner, fps), mas elas ficam desligadas por padrão (`bars={false}`). Só ligue se o dono pedir. Isso vale mais que as regras de letterbox do brand book abaixo.

---

**Essência:** transformar segundos em emoção. CFDesigner é a marca pessoal de Carlos Felipe, editor de vídeo cinematográfico que une IA, Adobe e ritmo. Tudo aqui deve parecer um frame de filme: escuro, contido, com um único ponto de luz dourada.

> I turn seconds into cinematic stories.
> _Transformo segundos em histórias cinematográficas._

**Frase-assinatura (manifesto):** "A edição é o instante em que a emoção encontra o tempo." / _"Editing is the moment when emotion meets time."_ — Carlos Felipe Moura. Use pelo componente `Manifesto`.

O tema principal é **Cinema** (escuro). **Daylight** (claro) existe para documentos, propostas e PDFs; peças de redes sociais usam sempre Cinema.

## Voz e conteúdo

Técnica, criativa e humana: metade artista, metade engenheiro visual.

- **Frases curtas, com ritmo de corte.** Uma ideia por frase. Hooks com até 6 palavras.
- **Idioma por público.** Inglês em Fiverr, Upwork e banners internacionais; português no Instagram e para o público nacional. Nunca misture os dois na mesma linha.
- **Primeira pessoa no perfil** ("Eu sou Carlos Felipe…"), segunda pessoa na oferta ("seu vídeo", "your brand").
- **Números concretos** em vez de adjetivos: "30 segundos", "24 fps", "entrega em 48h".
- **Caixa:** headlines em Bebas Neue (sempre maiúsculas pela fonte); títulos em sentence case; eyebrows em caixa alta com espaçamento.
- **Emoji:** só como ícone de linha na bio do Instagram (🎬 ✂️ 💡 🌎 ⬇️). Nunca em banners, cards ou no design system.

**Headlines aprovadas**

| Inglês                               | Português                             |
| ------------------------------------ | ------------------------------------- |
| Cinematic editing powered by AI.     | Edição cinematográfica com alma e IA. |
| Every second tells a story.          | Cada segundo conta uma história.      |
| From raw clips to emotion.           | Olhar de cinema, ritmo digital.       |
| Filmmaker's eye, editor's precision. | Histórias que cabem em 30 segundos.   |
| Short-form, long impact.             |                                       |

**Hooks para Reels e legendas:** "Um corte certo pode mudar uma história." · "Cinema em 15 segundos." · "A emoção está no ritmo." · "IA é a nova lente do olhar humano." · "Edição é o novo roteiro."

## Logo

- O logo é o losango com o "olho" e o ponto, mais o nome **cfdesigner** em serifa itálica, sempre em minúsculas. Use sempre os arquivos de `assets/Logos` pelo componente `Logo`; nunca redigite o nome em outra fonte.
- **Branco** (`horizontal`, `stacked`, `symbol`) sobre `void`, `petrol` ou foto escurecida. **Metálico** (`stacked`, `symbol`) para foto de perfil, capa de portfólio, abertura de vídeo e fundos claros.
- O metal do logo dá três cores de apoio: `chrome`, `graphite` e `bronze`. O dourado `amber` continua sendo o único destaque; o bronze é a ponte entre os dois.
- Avatar em Instagram, Fiverr e Upwork: `symbol` metálico centralizado sobre `void`, ou seu retrato com luz lateral, o mesmo em todas as plataformas.
- Em textos corridos o nome da marca se escreve "CFDesigner"; no logo, sempre "cfdesigner".

## Cor

- Fundo sempre `void`; cards e capas de destaque em `surface`; bordas em `line`.
- Texto em `ink`; secundário em `ink-muted`.
- `amber` é a luz da cena: **um** uso forte por peça (o botão principal, a palavra-chave do headline ou um flare). Como texto, use `amber-text`.
- `petrol` dá calma e profundidade: faixas de banner, blocos de fundo, o botão secundário. Texto sobre ele em `on-petrol`; como cor de texto, `petrol-text`.
- `chrome`, `graphite` e `bronze` vêm do metal do logo: losangos, molduras e fios finos. Nunca como texto corrido.
- `rec` é só o ponto de gravação, "ao vivo" e erro. Nunca decorativo.
- Proporção recomendada numa peça: 80% `void`/`surface`, 15% `petrol`, 5% `amber`.
- Proibido na interface: gradientes coloridos, roxo, neon. O único gradiente aceito é o escurecimento preto (vinheta) sobre imagem, de `void` a transparente.
- Magenta, ciano e laranja aparecem **só na luz das fotos** (LEDs, monitores). Nunca vire esses tons em cor de texto, botão ou fundo: a interface fica em `void`, `petrol` e `amber`.

## Tipografia

- `display-xl`, `display-l`, `display-m` (Bebas Neue): headlines, hooks e texto sobre vídeo. Uma linha de display por peça; no máximo duas linhas.
- `title`, `heading` (Montserrat): títulos de página, nomes de serviço, títulos de card.
- `eyebrow` (Montserrat 600, caixa alta, tracking 0.18em): rótulo acima do título, como "AI + ADOBE".
- `body-l`, `body`, `body-sm` (Lato): todo texto corrido.
- `timecode` (IBM Plex Mono): timecode, duração, fps e proporção. É o detalhe que diz "isto é edição".
- As fontes vêm do Google Fonts (carregadas por `components/bundle.css`).

## Espaço, forma e enquadramento

- Escala de espaçamento: `space-1` … `space-24`. Padding de card `space-6`; de banner `space-12`.
- **Cantos retos** (`radius-none`) em frames, banners e cards. `radius-sm` em botões e tags. `radius-pill` só nas capas de destaque e no ponto REC.
- Entregue nas proporções de `frame-*`: `frame-vertical` para Reels/Shorts, `frame-portrait` para feed, `frame-wide` para banners, `frame-scope` para heroes com letterbox.
- **Letterbox:** em peças 9:16, barras pretas de `space-12` em cima e embaixo guardam o timecode e a assinatura. O texto nunca encosta nas barras.
- Sombras: `shadow-frame` para um frame flutuando; `shadow-flare` só no hover do botão principal no tema Cinema.

## Textura e imagem

- **Granulado leve** (`.cf-grain`, ~6% de opacidade) sobre fundos e frames. Nunca sobre texto pequeno.
- **Luz baixa e prática:** as fotos da marca (`assets/Imagery`) são escuras, com uma fonte de luz recortando o assunto: fita de LED âmbar, brilho de monitor, neon magenta e ciano ao fundo. Mantenha 70% ou mais da imagem em sombra.
- **Retrato:** `portrait-neon.png` é a foto de perfil, a mesma no Instagram, Fiverr e Upwork. `portrait-editing-desk.jpg` mostra o editor trabalhando: use em hero, capa de Reel e post fixado.
- **Bastidores:** `studio-setup.webp` (a estação) e `timeline-closeup.webp` (a timeline desfocada) são os fundos de banner e do destaque "Process". Texto sempre sobre a parte escurecida.
- **Bokeh:** círculos âmbar desfocados sobre preto, como na faixa do manifesto. Só atrás de citações e títulos curtos.
- Flare de lente: um só, âmbar, no canto da peça. Nunca atrás do texto.
- Proibido: fotos de banco claras, filtros coloridos por cima, recorte do retrato sobre fundo liso.

## Iconografia

- Ícones de linha, traço 1.5px, cantos retos, em `ink` ou `amber-text`, desenhados dentro de um quadrado de 24px. Os cinco ícones das capas de destaque (Reels, Process, Clients, Collabs, CineStyle) estão no componente `HighlightCover`.
- Ícones de linha não substituem o logo nem imitam o símbolo.

## Estados e foco

- Foco: anel sólido de 2px em `focus`, afastado 2px do elemento.
- Hover do botão principal: `shadow-flare`. Hover de card: fundo `surface-raised`.
- Movimento: cortes secos ou fades de 200–300ms. Respeite `prefers-reduced-motion`.

## Onde cada peça usa o sistema

- **Instagram:** `HighlightCover` para os destaques, `ReelFrame` para capas e hooks, bio com os emojis aprovados acima.
- **Fiverr / Upwork:** `ProfileBanner` como capa, `ServiceCard` para pacotes, `Testimonial` para avaliações, `timeline-closeup.webp` no fundo do banner.
- **Portfólio (Notion / Behance / Vimeo):** `Logo` horizontal no topo, hero em `frame-scope` com `portrait-editing-desk.jpg`, `Manifesto` entre seções, `Button` primário "View portfolio".
