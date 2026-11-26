# Checklist do projeto

**No começo de cada sessão e quando fizer sentido, lembre o dono do que está aberto** (ele pediu, porque pode esquecer). Ao concluir um item, marque `[x]`. Cada item diz quem faz: **[dono]** ou **[Claude]**.

## Feito

### Base do repositório

- [x] Remotion configurado e vídeo de teste removido
- [x] Repositório renomeado para `cf-studio` (remoto, ambiente e script de preparação ajustados)
- [x] Repositório reorganizado como "master": design systems independentes, `tecnicas/`, `producoes/`, `CLAUDE.md` com as regras do dono

### Design system CFDesigner

- [x] Tokens, componentes, logos, fotos e brand book (vindos do artefato do claude.ai)
- [x] Legendas: dia a dia (Montserrat, contorno fino, sem tarja) e frase de efeito (Título de cinema), **sem ponto final**
- [x] 10 efeitos de movimento (terceiro de nome, contador, câmera, clarão, cortina, granulado...) e fecho discreto com o logo
- [x] Barras de REC/timecode desligadas por padrão
- [x] 5 gráficos do vídeo C01 (checklist, ícone com rótulo inclinado 25°/25° virado para o centro, palavra riscada, tela + rosto, fecho simples), aprovados pelo dono. Regra: nunca na frente de rostos

- [x] **Telas de fundo `FundoCF`** (6 variantes em bronze `#8a6a2a`: grade, órbitas e bokeh, visor, timeline, losangos, pontos), pedidas pelo dono para vídeos explicativos/passo a passo. Uma variante diferente por cena. Guia em `design-systems/cfdesigner/docs/fundos.md`, exemplo `CFDesigner-Fundos-Exemplo`

### Ferramentas e skills

- [x] Whisper instalado (transcrição em português, só CPU) e script de transcrição
- [x] Skills: `producao-de-video`, `design-systems`, `criar-design-system`, `legendas`, `whisper`
- [x] HyperFrames avaliado: não instalado (conflita com o Remotion); virou inspiração para os efeitos

### Design system CERTI

- [x] Etapa 4: números sobre a imagem (identidade do A) e fecho A com logo menor (440 px), escolhas do dono. **Design system CERTI completo**
- [x] Frase de efeito do CERTI: estilo C "leve e pesado" (escolha do dono), testada com fala com pausas passando por Whisper e sugeridor
- [x] Etapa 3: legenda do CERTI feita (estilo A em caixa alta, escolha do dono), testada com fala sintética transcrita pelo Whisper
- [x] Etapa 2 aprovada e no `main`: movimento e transições medidos (site e institucional), terceiro de nome e vídeos de teste
- [x] Etapa 1 aprovada: cores medidas do logo, Nunito Sans, logo com fundo transparente, componentes base, brand book e ficha
- [x] Decisões do dono: texto branco sobre as cores, Nunito Sans em tudo, cantos e sombras opção B
- [x] Logos: vertical (colorido e negativo) fornecidos; horizontal negativo e símbolo derivados dos arquivos do dono

## Próximos passos

### Stories "Um vídeo nasce aqui" (15 s, CFDesigner)

- [x] **[Claude]** Vídeo montado e entregue (`producoes/um-video-nasce-aqui/`, composição `UmVideoNasceAqui`): 7 cenas com cortes na batida (100 BPM), transições de cortina/íris/clarão, `FundoCF` diferente por cena, fotos do dono, C02 dentro do celular, texto atrás dele com recorte refinado. Novos no design system: `EtiquetaRotulo`, `LinhaChamada`, `CantosVisor`, `FundoCF`
- [x] Ajustes da 1ª revisão: efeitos sonoros 12 dB mais baixos; recorte da pessoa refinado (modelo `birefnet-portrait` + limpeza do verde na borda + corpo some antes do cotovelo)
- [x] 2ª revisão aprovada pelo dono: efeitos sonoros −17 dB, contagem em tic-tac na frase "Cinema em 15 segundos", selo flutuante "Making off" em todas as cenas (`SeloFlutuante`, novo no design system)
- [x] 3ª revisão: efeitos sonoros normalizados pelo pico em −40 dBFS (~11 dB abaixo da música, quase imperceptíveis); tic-tac trocado pelo swell de texto do dono (`texto.wav`) com o pico no instante em que o número chega ao 15
- [x] Qualidade máxima por padrão em todos os vídeos (`remotion.config.ts`: PNG, CRF 14, x264 slow); o "Um vídeo nasce aqui" foi rerenderizado assim (`out/um-video-nasce-aqui-final-hq.mp4`), mesmo conteúdo
- [x] Ajuste final: o swell do "15 segundos" agora é cortado (fade de 5 quadros) logo antes de o número parar; arquivo `out/um-video-nasce-aqui-final-hq2.mp4` (imagem idêntica à `-hq`, só o áudio trocado)
- [x] **Vídeo FECHADO pelo dono** (v4, `out/um-video-nasce-aqui-final-v4.mp4`): não mexer mais (ritmo, tempo das cenas, trecho do C02, trecho da música 24–39 s)

### Eletroposto CELESC: vídeo de encerramento (16:9, 3 min, CERTI)

- [x] **[Claude]** Storyboard visual feito (`producoes/eletroposto-celesc/storyboard.html`, gerado por `gerar_storyboard.py`): 46 quadros ilustrados, linha do tempo, locução, texto na tela, som, janela de Libras, depoimentos e captação por diária
- [x] **[Claude]** Storyboard atualizado com 19 quadros reais dos vídeos das etapas 1 e 2 (`referencias/`) e seção de continuidade (números de cada etapa)
- [x] **[Claude]** Quadros trocados por 25 ilustrações do Seedream 5.5 no Magnific (lápis com toque de cor, 625 créditos, autorizado pelo dono), em `ilustracoes/`; quadros reais das etapas ficam como miniatura de referência de plano
- [x] **[Claude]** Versão enxuta para a equipe de captação externa (`captacao.html`, gerada por `gerar_captacao.py`): só planos por diária, orientações de câmera, sequência e entrevistas; sem locução, números nem pontos internos
- [ ] **[dono]** Aprovar o storyboard e confirmar: números da rede (36/31 x 48/38), onde entram os depoimentos, plano final (BR-101 ou Ponte Anita Garibaldi), logos do fecho (ANEEL P&D?), identidade dos textos (verde da série ou CERTI), carro adesivado
- [ ] **[Claude]** Depois da gravação: trocar as ilustrações pelos quadros reais

### CERTI: o que depende do dono

- [ ] **[dono]** (opcional) fotos, manual da marca e, se existirem, os arquivos oficiais do horizontal negativo e do símbolo (hoje derivados por mim)

### Testes que ainda não foram feitos

- [ ] **[dono + Claude]** Legendas com mais vídeos reais: vídeo longo e horizontal (música ao fundo já foi testada no C02) (o primeiro vídeo real, CERTI News, já foi feito: fala real, vertical, arquivo chegou por anexo) O C02 (vertical, fala real, sem música) foi feito e aprovado no CFDesigner; faltam música ao fundo, vídeo longo e horizontal
- [ ] **[Claude]** Confirmar com mais uma referência real o processo `criar-design-system` (já usado no CERTI com prints, sem vídeo)

### C02 com b-roll

- [x] **[Claude]** Vídeo final entregue (CFDesigner): texto atrás da pessoa, checklist vertical, texto rastreado no parapeito atrás da árvore, zoom final. Novos no design system: `TextoAtras`, `ChecklistVertical`. Novas técnicas: `tecnicas/recorte-pessoa/`, `tecnicas/texto-no-plano/`
- [x] **[Claude]** Texto rastreado virou o efeito `TextoNoPlano` do CFDesigner (guia em `design-systems/cfdesigner/docs/efeitos.md`); o C02 já usa o efeito
- [x] **Música ao fundo testada no C02** (música do Suno + efeitos do dono + look Dourado Suave); receita em `producoes/c02-broll/som/SOM.md`. Segue pendente: vídeo longo e horizontal

### Ferramenta de recorte (texto atrás da pessoa)

- [x] **[Claude]** `scripts/recortar-pessoa.py` + efeito `TextoAtras` do CFDesigner, aprovado pelo dono no C02 (cena 1)
- [x] Script de preparação do ambiente `cf-studio` agora cria o venv do recorte (`/opt/recorte-venv`) e baixa os modelos. Testado aqui; **ainda não provado numa sessão nova**: na próxima sessão, conferir `ls /opt/recorte-venv` e `/opt/recorte-venv/bin/python -c "import cv2, rembg"`

### Conferências rápidas

- [ ] **[dono]** Sempre abrir sessões novas no ambiente **`cf-studio`** (o dono já abriu uma e deu certo; manter o hábito)

### Plano de edição

### Skills da lista do dono

- [ ] **[dono]** Trazer os nomes das próximas skills
- [ ] **[Claude]** Para cada uma: achar, ver se é gratuita, ler antes de instalar, checar conflito com Remotion/design systems

### Skill de auditoria de marca

- [x] **[Claude]** Skill `auditoria-de-marca` criada (entrada do cliente, base de conhecimento, auditoria, produção do que ele pedir)
- [x] **[Claude]** Primeira auditoria (CFDesigner) feita: Doc + página visual, base em `clientes/cfdesigner/` (provisória: só print da grade e Notion)
- [ ] **[dono]** Mandar para completar a auditoria (o relatório está em `clientes/cfdesigner/AUDITORIA.md`, `BASE.md` e `auditoria.html`): print legível da bio e métricas, prints dos melhores e piores posts, 2 min de fala, texto do ChatGPT (o link não abre aqui), objetivo da autoridade
- [ ] **[dono]** Aprovar promessa ("Produção completa de vídeo com IA, do roteiro ao fecho"), nome único e os 4 pilares
- [ ] **[Claude]** Ajustar a skill `auditoria-de-marca` com o que o teste mostrou: Instagram e ChatGPT não abrem (pedir prints desde o início)
- [x] Formato do relatório: **os dois**, documento editável + página visual (escolha do dono; já está na skill)

### Design system tiago-lemos-01 e skill `video-tiago-lemos`

- [x] **[Claude]** Design system criado a partir do vídeo de referência (tela dividida, ouro e preto, Bebas Neue/Poppins/Space Mono), com legenda palavra por palavra, 4 tipos de elemento animado (ícone, título, número, lista; 32 ícones) e 6 sons suaves sintetizados. Skill `video-tiago-lemos` + `scripts/cortar-pausas.py`
- [x] **1º vídeo real feito e aprovado pelo dono (C02, `producoes/c02-tiago/`)**: layout mesclado, ilustrações dos elementos, b-rolls que ilustram a fala (Kling 2.5), fotos no topo, linhas de antes e depois, lista sincronizada com a fala, enquadramento mais alto. Design system `tiago-lemos-01` e skill `video-tiago-lemos` fechados
- [ ] **[dono]** Próximo teste: um vídeo dele **com corte de pausas** (o C02 foi sem corte) e/ou **horizontal**, para provar essas partes da skill
- [ ] **[dono]** (opcional) Mandar fontes, cores e logo oficiais, e sons dele: hoje as cores/fontes são estimadas da referência e os sons são sintetizados

### Episódio 04 "Mesma cena" (CFDesigner)

- [x] Regra nova: **storyboard antes de todo vídeo**. Storyboard, narração (do dono) e música (Suno) feitos; vídeo montado (21,4 s)
- [x] **Episódio 04 aprovado pelo dono em 24/11/2026** (versão só com a narração; ele faz música e efeitos). Calendário e recapitulação em `producoes/serie-conteudos-cfdesigner/CALENDARIO.md`
- [x] **Episódio 04 finalizado pelo dono por conta própria** (música e efeitos feitos por ele): nada mais a fazer

### Episódio 05 (CFDesigner)

- [x] Pasta da série renomeada: `producoes/serie-conteudos-cfdesigner/` (ep04, ep05 e `CALENDARIO.md` dentro; próximos episódios continuam ali)

- [x] Tema escolhido pelo dono: **B, "Mesma cena: real ou IA?"**. Plano, narração (rascunho), storyboard e prompt do clipe de IA feitos em `producoes/serie-conteudos-cfdesigner/ep05-ia-vs-tradicional/`
- [ ] **[dono]** Aprovar o storyboard do 05 (real ou IA primeiro, gancho, tese, duração) e ajustar as falas
- [ ] **[dono]** Gerar o clipe de IA (6 a 8 s, 9:16) com `PROMPT-IA.md` e a foto de referência, e mandar o MP4 (2 a 3 versões, se der)
- [ ] **[dono]** Gravar a narração do 05 e fazer música e efeitos (como no 04)
- [ ] **[Claude]** Depois que chegarem o clipe e a narração: montar o 05 no Remotion e entregar o MP4

### Carrosséis do CFDesigner (Instagram 4:5)

- [x] **[Claude]** Carrossel "Claude Code para edição de vídeo" (8 slides, base: artigo do MindStudio de 20/04/2026) **fechado pelo dono**: composição `CarrosselClaudeCode`, PNGs finais 2160×2700 em `out/carrossel/claude-code/final/` (fora do git). É a **base de identidade** dos próximos: receita em `producoes/carrossel-video-ia/README.md`
- [x] **[Claude]** Carrossel "5 geradores de vídeo com IA" (8 slides, base: comparativo de 11 geradores de videoclipes, 2026) **fechado pelo dono**: composição `CarrosselGeradores3`, prints e logos reais dos apps em `producoes/carrossel-video-ia/assets/ferramentas/`, PNGs finais 2160×2700 em `out/carrossel/geradores/final/` (fora do git)
- [x] **[Claude]** Carrossel "Melhor gerador de imagens com IA" (8 slides, modelo **Impacto**, fonte llm-stats.com, nov/2026) **fechado pelo dono**: composição `CarrosselImpacto`, 7 artes geradas no Magnific (945 créditos), PNGs finais 2700×3375 em `out/carrossel/impacto/final/` (fora do git). Modelo registrado em `design-systems/cfdesigner/docs/carrosseis.md`
- [x] Nome do modelo confirmado pelo dono: **Impacto**
- [x] Regra do Magnific definida pelo dono: **só gerar quando ele pedir**, com custo mostrado antes (já no `CLAUDE.md`)
- [x] Carrossel "Vídeo com IA" **descartado pelo dono** (prefere carrosséis com informação real); código removido
- [ ] **[dono]** Mandar os próximos assuntos (texto, link ou artigo colado); eu gero na mesma identidade com as fotos dele. Imagem gerada no Magnific só com autorização (custa ~65 créditos por imagem)

### Limpezas pequenas

- [ ] **[dono]** (opcional) Apagar a branch `previews-legenda` no GitHub: não está no `main`, guarda só os rascunhos das opções de legenda do CFDesigner (as escolhas já foram implementadas). Apagar ou manter, tanto faz

### Conteúdo viral (estrutura "momentum")

- [x] **[Claude]** Skill `conteudo-viral` criada a partir da análise do anúncio da Yotto (VDA) e de pesquisa: 3 botões, linha do tempo, ganchos visuais e de fala, série, mapa de momentum
- [ ] **[dono]** Escolher o primeiro assunto para aplicar a estrutura (preencher o mapa de momentum, storyboard e aprovação antes de montar)
- [ ] **[dono + Claude]** Depois de postar, anotar retenção aos 3 s, tempo médio e envios para calibrar a skill

## Regras que valem para tudo

Estão no `CLAUDE.md`: sem ponto final nas legendas, sem barras de REC, visual limpo e premium, aprovar escolhas de estilo antes de renderizar, nunca versionar vídeos.
