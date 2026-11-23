---
name: plano-de-edicao
description: Use SEMPRE que o dono enviar um vídeo bruto (ou vários) para editar, montar ou "fazer um vídeo" a partir de gravações, ANTES de montar qualquer coisa. Analisa o material com FFmpeg e Whisper, monta o plano de edição (linha do tempo, cortes, legendas, destaques, transições do design system, fecho), mostra ao dono em imagem e espera aprovação antes de editar.
---

# Plano de edição

**Regra:** com material bruto, primeiro o plano, depois a edição. Não renderize o vídeo final sem o dono ter visto o plano (para um vídeo curto de um plano só, o plano pode ser de poucas linhas, mas ainda existe).

## Ferramentas (já instaladas no ambiente `cf-studio`)

- **FFmpeg 6.1** no sistema (`ffmpeg`, `ffprobe`; H.264, H.265/HEVC, AAC; filtros `xfade`, `scdet`, `silencedetect`, `loudnorm`). O Remotion traz o dele: `npx remotion ffmpeg`.
- **Whisper** (CPU) para transcrição: skill `whisper`.
- **Pacotes oficiais do Remotion 4.0.544**: `@remotion/transitions` (`TransitionSeries`, 21 apresentações), `@remotion/motion-blur` (só o `HtmlInCanvasMotionBlur` funciona bem: veja o passo 5), `@remotion/media-utils`, `@remotion/captions`.
- **`scripts/recortar-pessoa.py`**: recorta a pessoa do fundo (grátis, CPU) para texto atrás dela. Veja `tecnicas/recorte-pessoa/README.md` e o efeito `TextoAtras` do CFDesigner.
- **`scripts/analisar-video.py`**: a ferramenta de análise (abaixo).
- Skills oficiais de apoio (leia só a que for usar): `remotion-markup/transitions.md`, `video-editing.md`, `silence-detection.md`, `ffmpeg.md`, `sfx.md`, `audio.md`.

Primeiro confira: `ffmpeg -version`. Se faltar, avise o dono (o ambiente `cf-studio` deveria trazer).

## Passo a passo

### 1. Entender o pedido

Pergunte só o que faltar: **qual design system**, formato e plataforma (Reels 9:16, YouTube 16:9), duração desejada, e o que ele quer ter (legenda? frase de efeito? número? fecho?). **Terceiro de nome só se ele pedir** (regra do `CLAUDE.md`).

### 2. Analisar o material

```bash
python3 scripts/analisar-video.py <video> [pasta-de-saida]
```

Padrão de saída: `public/entrada/analise/<nome>/` (ignorada pelo Git). Gera `resumo.md`, `analise.json`, `contato.jpg` (folha de contato) e `legendas.json` (transcrição com tempo por palavra). Leia o `resumo.md` e **olhe o `contato.jpg`**. Use `--sem-transcricao` para vídeos sem fala.

O que ela entrega: formato real (já corrigindo a rotação), avisos de conversão, volume em LUFS, silêncios, cortes de plano, fala com pausas, **som de fundo nas pausas (indício de música)**, palavras de baixa confiança (nomes próprios!) e uma sugestão de aparo.

**Limitações conhecidas (não confie cegamente):**

- **Silêncio:** o limiar vem do volume do próprio vídeo; ruído de ambiente acima dele esconde o silêncio. Num teste real, 1,5 s de quieto no começo não foi detectado. A sugestão de aparo pela fala compensa.
- **Cortes:** detecta cortes secos com limiar 8 e mostra a pontuação de cada um. Pontuação abaixo de ~10 costuma ser troca entre planos parecidos (com o limiar antigo, 12, dois cortes reais passaram batido num vídeo real). Dissolvências, zooms e movimentos de câmera ainda podem passar: confira na folha de contato.
- **Whisper:** erra nome próprio e termo técnico. Sempre mostre ao dono as palavras de baixa confiança.
- Não vê conteúdo: quem está na cena, o que acontece. Isso é com a folha de contato e com o dono.

### 3. Preparar o arquivo para o Remotion

Vídeo de câmera costuma vir em HEVC, 10 bits, 59,94 fps e com rotação nos metadados. Converta (o FFmpeg corrige a rotação sozinho):

```bash
ffmpeg -i <original> -vf "scale=<L>:<A>:flags=lanczos,fps=30" -c:v libx264 -crf 16 -pix_fmt yuv420p -c:a aac -b:a 192k public/entrada/<nome>.mp4
```

(`<L>:<A>` = 1080:1920 para vertical, 1920:1080 para horizontal.) Nunca versionar o vídeo. Confira o resultado com `ffprobe` (largura, altura, fps).

### 4. Montar o plano e o storyboard

**Storyboard obrigatório (pedido do dono):** além do `PLANO.md`, publique uma página visual (Artifact) com quadros reais extraídos do material (`ffmpeg -ss <t> -i <video> -frames:v 1`), a linha do tempo proporcional, o que entra por cima em cada trecho, o som e o que falta aprovar. Etiquetas e caixinhas no storyboard também ficam **viradas para o centro da imagem** (esquerda: lado direito se afasta; direita: lado esquerdo se afasta), como no design system. Só monte o vídeo depois da aprovação. Modelo: `producoes/ep04-mesma-cena/storyboard.html`.


Copie `producoes/_modelo/PLANO.md` para `producoes/<nome>/PLANO.md` e preencha. Um bom plano tem:

- **Linha do tempo:** cada trecho com origem (início–fim no arquivo), duração, o que acontece, e o que entra por cima (legenda, destaque, número).
- **Decisões do dono:** frases de efeito candidatas, o que cortar, tamanho do fecho.
- **Riscos:** nomes a conferir, partes claras onde a legenda perde força, volume baixo.

Exemplo real: `producoes/certi-news/PLANO.md`.

### 5. Escolher transições (sem inventar)

1. **Leia a ficha** `design-systems/<nome>/DESIGN-SYSTEM.md`: ela diz quais transições aquele design system usa, quando e com que tempo.
2. **Corte seco é o padrão.** Transição é pontuação: no máximo uma ou duas por vídeo curto. Nada de transição entre todos os planos.
3. Use os **componentes do design system** quando existirem. Os pacotes oficiais servem como **mecanismo** (`TransitionSeries` encadeia as cenas e calcula os tempos) ou quando a ficha permite.
4. Catálogo oficial de `@remotion/transitions/<nome>`: `fade`, `dissolve`, `slide`, `push-cut`, `wipe`, `zoom-in-out`, `zoom-blur`, `cross-zoom`, `blur-slide`, `linear-blur`, `iris`, `clock-wipe`, `flip`, `book-flip`, `cube`, `swap`, `ripple`, `crosswarp`, `dreamy-zoom`, `film-burn`, `none`. Aproximações úteis: whip ≈ `push-cut` ou `slide` com borrão; zoom de impacto ≈ `zoom-blur`; dissolvência ≈ `dissolve`/`fade`.
5. **Não use o light leak oficial** (`@remotion/effects/light-leak`): em testes neste ambiente (sem GPU) o mesmo quadro saiu branco ou normal ao acaso, em renderizações idênticas. Use o light leak em CSS de um design system que o tenha (ex.: CFDesigner `LightLeak`).
6. **Motion blur:** use `HtmlInCanvasMotionBlur` (`@remotion/motion-blur`) para suavizar movimentos rápidos (zoom de impacto, whip). Testado com vídeo real: estável, cores exatas, custo de ~2,8× no tempo de render; envolva só o trecho que se move. **Não use `Trail`** (não fez efeito) **nem `CameraMotionBlur`** (desloca o rastro e tinge o fundo). Exemplo e medições: `tecnicas/transicoes/ExemploMotionBlur.tsx`.
7. Exemplo verificado de como encadear: `tecnicas/transicoes/ExemploTransicoes.tsx` (composição `Tecnicas-Transicoes-Exemplo`; fade e slide renderizam de forma estável).
8. Escolha nova de estilo (algo que a ficha não cobre): **mostre em imagem e peça aprovação**.

### 6. Mostrar o plano e esperar aprovação

Mostre ao dono: a folha de contato, o resumo e o plano em tabela, com **3 a 5 perguntas objetivas**. O dono é visual: prefira imagem a texto. Espere a resposta.

### 7. Implementar

`<TransitionSeries>` para trechos em sequência; `<OffthreadVideo>` (ou `Video` de `@remotion/media`) com `trimBefore`/`durationInFrames`; legendas pela skill `legendas`. Conferir **2 a 3 quadros** por tipo de elemento antes do render final. Renderizar, entregar o MP4 na conversa e salvar o código e o `PLANO.md` no `main`.

### 8. Fechar

Atualize o `PLANO.md` com o que mudou e as lições. Não versionar vídeos.

## Volume do áudio

Meça (`resumo.md` mostra os LUFS). Para redes sociais o alvo costuma ficar perto de **-14 LUFS**. Só normalize se o dono quiser: `ffmpeg -i in.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:v copy out.mp4`. Música de fundo entra bem abaixo da fala (skill `audio.md`).
