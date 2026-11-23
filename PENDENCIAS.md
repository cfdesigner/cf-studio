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
- [x] **Vídeo FECHADO pelo dono** (v4, `out/um-video-nasce-aqui-final-v4.mp4`): não mexer mais (ritmo, tempo das cenas, trecho do C02, trecho da música 24–39 s)

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
- [ ] **[dono]** Mandar para completar a auditoria: print legível da bio e métricas, prints dos melhores e piores posts, 2 min de fala, texto do ChatGPT (o link não abre aqui), objetivo da autoridade
- [ ] **[dono]** Aprovar promessa ("Produção completa de vídeo com IA, do roteiro ao fecho"), nome único e os 4 pilares
- [ ] **[Claude]** Ajustar a skill `auditoria-de-marca` com o que o teste mostrou: Instagram e ChatGPT não abrem (pedir prints desde o início)
- [x] Formato do relatório: **os dois**, documento editável + página visual (escolha do dono; já está na skill)

### Episódio 04 "Mesma cena" (CFDesigner)

- [ ] **[dono]** Aprovar o storyboard (look de cor, texto do gancho, convite final, música, duração). Regra nova: **storyboard antes de todo vídeo**
- [ ] **[Claude]** Depois da aprovação: montar no Remotion (`producoes/ep04-mesma-cena/`), mixar o som com os efeitos do design system e entregar o MP4

### Limpezas pequenas

- [ ] **[dono]** (opcional) Apagar a branch `previews-legenda` no GitHub: não está no `main`, guarda só os rascunhos das opções de legenda do CFDesigner (as escolhas já foram implementadas). Apagar ou manter, tanto faz

## Regras que valem para tudo

Estão no `CLAUDE.md`: sem ponto final nas legendas, sem barras de REC, visual limpo e premium, aprovar escolhas de estilo antes de renderizar, nunca versionar vídeos.
