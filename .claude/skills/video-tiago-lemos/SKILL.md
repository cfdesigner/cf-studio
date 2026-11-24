---
name: video-tiago-lemos
description: Use SEMPRE que o dono subir um vídeo dele falando e pedir para editar no estilo tiago-lemos-01, ou pedir "corta as pausas", "legenda palavra por palavra", "coloca ícones/elementos animados" ou "efeitos sonoros leves" num vídeo de fala. Corta pausas e respiros, legenda palavra por palavra com palavras-chave em ouro, elementos animados que ilustram a fala e sons bem leves em cada entrada e saída.
---

# Vídeo no estilo tiago-lemos-01

Design system: `design-systems/tiago-lemos-01/` (leia a `DESIGN-SYSTEM.md`). Peça em português do Brasil. Regras do dono (`CLAUDE.md`) valem todas: **sem ponto final na legenda**, limpo e premium, **storyboard e aprovação antes de montar/renderizar**, efeitos sonoros bem baixos e sem clique, nada de IA paga, nunca versionar vídeos, salvar no `main`.

## Fluxo (4 entregas: cortar pausas (só se o dono quiser: sempre perguntar), legenda, elementos, sons)

1. **Preparar.** O vídeo vai para `public/entrada/<nome>.<ext>` (ignorada pelo Git). Rode `python3 scripts/analisar-video.py <video>` e olhe `resumo.md` e a folha de contato (formato, fala, volume). Layout padrão: `dividido` (tela dividida da referência). Se o vídeo for horizontal ou o dono pedir tela cheia, use `cheio` e confira o rosto. Pergunte só o que faltar. Terceiro de nome só se ele pedir.

2. **Cortar pausas e respiros: SEMPRE PERGUNTE ao dono, a cada vídeo, se ele quer o corte ou não** (use AskUserQuestion; não decida sozinho, nem pelo vídeo parecer já editado). Cortar é uma das funções desta skill e continua disponível; só não é automático. Se ele disser que não (comum: ele já edita antes), nada é cortado. Sem corte, prepare assim (o vídeo fica intacto, só convertido):
   ```bash
   ffmpeg -i public/entrada/<nome>.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920,fps=30" -c:v libx264 -crf 16 -pix_fmt yuv420p -c:a aac -b:a 192k public/entrada/<nome>-pronto.mp4
   /opt/whisper-venv/bin/python scripts/transcrever.py public/entrada/<nome>-pronto.mp4 public/entrada/<nome>-pronto.captions.json --lingua pt
   ```
   (se o vídeo já for 1080×1920 a 30 fps, pode usar o original). O `captions.json` vale direto, sem remapear, e `duracaoSeg` vem do `ffprobe`. Confira nomes e termos técnicos com o dono (Whisper erra). Depois siga para o passo 3.

   **Com corte (se ele disser que sim)**, o script já transcreve sozinho:
   ```bash
   python3 scripts/cortar-pausas.py public/entrada/<nome>.mp4 public/entrada/<nome>-cortado.mp4 --tamanho 1080x1920
   ```
   Saídas: o vídeo cortado (30 fps), `<nome>-cortado.captions.json` (palavras já no tempo novo) e `<nome>-cortado.cortes.json` (mapa). Padrão `--pausa-min 0.30` (vão entre palavras ≥ 0,30 s é cortado, deixando 0,07 s antes e 0,12 s depois da fala). Mais seco: `0.20`; mais natural: `0.45`. Use `--so-plano` para só calcular. Informe ao dono quantos segundos saíram e a lista de **possíveis vícios** ("é", "né", "então"...): o script NÃO os remove; só corte se ele aprovar (corte manual a partir de `captions.json`).
   - Whisper erra nome próprio e termo técnico: mostre as palavras de baixa confiança e **peça para ele conferir**; corrija o `text` no `captions.json` antes de seguir.
   - Conferir o resultado: `ffprobe` (1080×1920, 30 fps) e ouça/olhe uma emenda.

3. **Destaques (palavras-chave em ouro).** Escolha 1 por grupo de falas importante: números, nomes, o benefício, o objeto ("ecossistema", "600", "garantia"). Poucas: se tudo é dourado, nada é. Lista em `destaques`.

4. **Elementos animados (ilustram o que ele fala).** Um por ideia, **um por vez** (nunca sobrepostos), com `de`/`ate` em segundos **no vídeo cortado**:
   - `icone` (ideia concreta; ícone + título de até 3 palavras), `titulo` (frase/conceito, 1–3 linhas), `numero` (número falado), `lista` (2–4 itens enumerados). `*palavra*` fica em ouro.
   - Entra **~0,1 s antes** de a palavra-chave ser dita e fica **1,5 a 3 s** (mínimo 1,2 s); deixe ≥ 0,3 s de respiro entre um e outro. Não ilustre toda frase: cerca de um elemento a cada 3 a 5 s, e deixe a fala sozinha onde não há o que mostrar.
   - Texto de apoio pequeno e suave; `kicker` só quando ajuda. Ícones disponíveis: raio, foguete, lampada, estrela, check, alvo, relogio, calendario, chat, grafico, dinheiro, escudo, play, camera, pessoas, cadeado, link, coracao, livro, maleta, microfone, alerta, diamante, magia, lupa, computador, celular, tesoura, fogo, mais, seta, cerebro. Falta um? Acrescente em `components/icones.ts` (caminhos SVG 24×24).
   - Nunca na frente do rosto: no `dividido` já é garantido; no `cheio` confira o quadro.

5. **Sons.** Automático: o componente toca um som suave ao entrar (3 quadros antes) e outro ao sair de **cada** elemento (`assets/sfx/entra-*`, `sai-*`, pico ≈ −23 dBFS na mixagem, ~19 dB abaixo da voz). Sem cliques. Mais baixo ainda: `ganhoSfx` (ex.: 0.6). Se o dono mandar sons dele, troque os arquivos.

6. **edicao.json + composição.** Crie `producoes/<nome>/edicao.json` (tipo `Edicao`; veja `design-systems/tiago-lemos-01/exemplo/exemplo.ts`):
   ```json
   { "video": "entrada/<nome>-cortado.mp4", "duracaoSeg": 43.9, "layout": "dividido", "rostoY": 35,
     "captions": [ ...conteúdo de <nome>-cortado.captions.json... ],
     "destaques": ["ecossistema", "600"],
     "elementos": [ { "tipo": "icone", "icone": "foguete", "titulo": "PRONTO EM *MINUTOS*", "de": 1.2, "ate": 3.4 } ] }
   ```
   `duracaoSeg` = duração do vídeo cortado (`ffprobe`; ou `novo_s` do `cortes.json`). `rostoY`: onde está o rosto na altura do original (0–100); olhe um quadro. Registre em `producoes/index.tsx`:
   ```tsx
   import { VideoTiagoLemos, calculaMetadados, type Edicao } from "../design-systems/tiago-lemos-01";
   import edicao from "./<nome>/edicao.json";
   <Composition id="<Nome>" component={VideoTiagoLemos} durationInFrames={30} fps={30} width={1080} height={1920}
     defaultProps={edicao as unknown as Edicao} calculateMetadata={calculaMetadados} />
   ```

7. **STORYBOARD + aprovação (obrigatório).** Antes do vídeo final: quadros reais, um no meio de cada elemento e um da legenda com destaque:
   ```bash
   npx remotion still <Id> out/sb-N.png --frame=<quadro> --browser-executable=/opt/pw-browsers/chromium
   ```
   Publique uma página visual (Artifact) com os quadros, a linha do tempo, a tabela "trecho falado → elemento" e o som de cada entrada/saída, os destaques, o que foi cortado (segundos e vícios) e o que falta aprovar. **Espere o dono aprovar** (ele pode trocar ícone, texto, destaques, tempo).

8. **Renderizar e entregar.** `npx remotion render <Id> out/<nome>.mp4 --browser-executable=/opt/pw-browsers/chromium` (qualidade máxima já no `remotion.config.ts`). Confira 2–3 quadros e o pico do som. Entregue o MP4 na conversa.

9. **Salvar no `main`** (autorizado): `edicao.json`, composição e docs; nunca o vídeo. `git fetch --depth=10 origin main`, mesclar, `npm run lint`, push.

## Limites conhecidos

- O corte usa o tempo das palavras do Whisper: respiro colado no começo de uma palavra pode sobrar (reduza `--folga-antes`) e consoantes finais podem ser cortadas se a folga for pequena demais.
- Vídeo longo (vários minutos) e horizontal ainda não testados neste design system. Avise o dono se algo sair estranho e mostre o quadro.
- Cores e fontes vêm de estimativa do vídeo de referência (não de manual de marca).
