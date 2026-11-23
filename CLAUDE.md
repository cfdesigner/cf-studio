# Repositório master das produções audiovisuais

Repositório do dono para produzir vídeos e peças com Remotion. Falar em português do Brasil.

## Pendências

Leia `PENDENCIAS.md` no começo da sessão e **lembre o dono das pendências abertas**: ele pediu, porque pode esquecer.

## Estrutura

- `design-systems/<nome>/`: cada design system é independente e traz o seu movimento, transições, legendas, terceiros, números e fecho. Índice e contrato em `design-systems/README.md`. Modelo em `design-systems/_modelo/`.
- `tecnicas/`: só o que não tem marca (lógica de texto das legendas; recorte da pessoa em `tecnicas/recorte-pessoa/`; exemplo de transições com os pacotes oficiais em `tecnicas/transicoes/`).
- `scripts/`: ferramentas gerais (transcrição com Whisper, sugestão de frases de efeito, **análise de vídeo bruto** `analisar-video.py`, **recorte da pessoa** `recortar-pessoa.py` para texto atrás dela, **rastreio de plano** `rastrear-plano.py` e `mascara-arvore.py` para texto preso à cena).
- `producoes/<nome>/`: os vídeos de verdade, cada um usando UM design system. Registrados em `producoes/index.tsx`.
- `src/Root.tsx`: registra as composições (exemplos de cada design system + produções).
- `.claude/skills/`: `plano-de-edicao` (**com vídeo bruto, antes de editar**), `producao-de-video` (fluxo geral), `design-systems` (índice), `criar-design-system` (a partir de referências), `legendas`, `whisper`, e as skills do Remotion.

## Regras do dono (valem para TODOS os design systems)

- **Legenda nunca termina com ponto final nem com reticências.** Vírgula, `?` e `!` podem.
- **Sem barras de REC, timecode ou fps** nos vídeos, a menos que ele peça.
- **Limpo e premium.** O elemento principal manda; texto de apoio é pequeno, suave e discreto. Nunca "textão" nem texto chamativo sobrando. Na dúvida: menos texto, menor, mais suave.
- **Vídeo bruto: primeiro o plano de edição** (skill `plano-de-edicao`), mostrar ao dono e esperar aprovação, depois editar.
- **Storyboard sempre, antes de montar qualquer vídeo** (pedido do dono): página visual com quadros reais do material, linha do tempo, o que entra por cima e o som de cada trecho. Mostrar e esperar aprovação antes de montar o vídeo.
- **Efeitos sonoros sempre bem baixos** (pico dos efeitos pelo menos ~12 dB abaixo do pico da voz) e **sem cliques/ticks** (o dono achou feio e distrai). Preferir sons suaves (`suave`, `fraco`, `timeline_in`); se faltar som bom, pedir ao dono que mande efeitos. Dar ênfase só em pausas dramáticas (+4 dB).
- **Light leak oficial (`@remotion/effects`) não usar:** instável sem GPU (testado).
- **Motion blur: só `HtmlInCanvasMotionBlur`** (testado, estável). Não usar `Trail` (sem efeito) nem `CameraMotionBlur` (tinge o fundo).
- **Frases de efeito e escolhas de estilo novas: mostrar e esperar a aprovação** antes de renderizar o vídeo final.
- **Caixinhas e gráficos nunca ficam na frente do rosto de ninguém** (checklist, ícone com rótulo, palavra grande, etc.). Antes de posicionar, olhar onde está o rosto no quadro e mover o gráfico (`topo`/`esquerda`) para uma área livre; se não houver área livre, encurtar ou adiar o gráfico.
- **Caixinhas inclinadas (ex.: ícone com rótulo, 25° em X e Y) sempre viradas para o centro da imagem:** à esquerda afasta o lado direito, à direita afasta o lado esquerdo (o `IconeRotulo` já faz isso sozinho pela posição).
- **Nunca gerar imagem ou vídeo pela Magnific (nem por nenhuma ferramenta de IA paga).** Quando uma peça precisar de b-roll ou imagem gerada, escrever o **prompt** (com formato, duração, enquadramento, o que evitar e onde entra na edição) e entregar ao dono, que gera na ferramenta e com o custo que preferir. Esperar ele mandar o arquivo para montar. Não gastar créditos.
- **Terceiro de nome (lower third): NÃO colocar, a menos que o dono peça no comando.** É raro nos vídeos dele. Se pedir, perguntar nome e cargo; nunca inventar.
- **Salvar no `main`** (autorizado pelo dono, sem perguntar). Sessões novas podem começar numa branch própria (ex.: `claude/...`): ao concluir o trabalho, mesclar no `main` e dar push, senão ele fica fora do `main` e pode se perder. Ao mesclar, buscar antes o histórico (`git fetch --depth=10 origin main`).
- **Nunca versionar vídeos** (`out/`, `public/entrada/` são ignorados). Entregar o MP4 na conversa.
- **Nunca misturar elementos de design systems diferentes** numa peça, a menos que ele peça.

## Comandos

- Instalar: `npm ci`. Verificar: `npm run lint`.
- Quadro: `npx remotion still <id> <arquivo.png> --frame=N --browser-executable=/opt/pw-browsers/chromium`
- Vídeo: `npx remotion render <id> out/<nome>.mp4 --browser-executable=/opt/pw-browsers/chromium` (a qualidade máxima já está no `remotion.config.ts`: quadros em PNG, CRF 14, preset slow; áudio final com `loudnorm` a −14 LUFS e AAC 256k)
- Transcrever: veja a skill `whisper` (`/opt/whisper-venv/bin/python scripts/transcrever.py ...`).
