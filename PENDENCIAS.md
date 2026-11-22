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

### CERTI: o que depende do dono

- [ ] **[dono]** (opcional) fotos, manual da marca e, se existirem, os arquivos oficiais do horizontal negativo e do símbolo (hoje derivados por mim)

### Testes que ainda não foram feitos

- [ ] **[dono + Claude]** Legendas com mais vídeos reais: música ao fundo, vídeo longo e horizontal (o primeiro vídeo real, CERTI News, já foi feito: fala real, vertical, arquivo chegou por anexo) O C02 (vertical, fala real, sem música) foi feito e aprovado no CFDesigner; faltam música ao fundo, vídeo longo e horizontal
- [ ] **[Claude]** Confirmar com mais uma referência real o processo `criar-design-system` (já usado no CERTI com prints, sem vídeo)

### C02 com b-roll

- [x] **[Claude]** Vídeo final entregue (CFDesigner): texto atrás da pessoa, checklist vertical, texto rastreado no parapeito atrás da árvore, zoom final. Novos no design system: `TextoAtras`, `ChecklistVertical`. Novas técnicas: `tecnicas/recorte-pessoa/`, `tecnicas/texto-no-plano/`
- [x] **[Claude]** Texto rastreado virou o efeito `TextoNoPlano` do CFDesigner (guia em `design-systems/cfdesigner/docs/efeitos.md`); o C02 já usa o efeito
- [ ] **[dono]** Nas próximas produções, testar música ao fundo (o C02 tem o respiro de 1,6 s para a música entrar na edição dele)

### Ferramenta de recorte (texto atrás da pessoa)

- [x] **[Claude]** `scripts/recortar-pessoa.py` + efeito `TextoAtras` do CFDesigner, aprovado pelo dono no C02 (cena 1)
- [x] Script de preparação do ambiente `cf-studio` agora cria o venv do recorte (`/opt/recorte-venv`) e baixa os modelos. Testado aqui; **ainda não provado numa sessão nova**: na próxima sessão, conferir `ls /opt/recorte-venv` e `/opt/recorte-venv/bin/python -c "import cv2, rembg"`

### Conferências rápidas

- [ ] **[dono]** Sempre abrir sessões novas no ambiente **`cf-studio`** (o dono já abriu uma e deu certo; manter o hábito)

### Plano de edição

### Skills da lista do dono

- [ ] **[dono]** Trazer os nomes das próximas skills
- [ ] **[Claude]** Para cada uma: achar, ver se é gratuita, ler antes de instalar, checar conflito com Remotion/design systems

### Limpezas pequenas

- [ ] **[dono]** (opcional) Apagar a branch `previews-legenda` no GitHub: não está no `main`, guarda só os rascunhos das opções de legenda do CFDesigner (as escolhas já foram implementadas). Apagar ou manter, tanto faz

## Regras que valem para tudo

Estão no `CLAUDE.md`: sem ponto final nas legendas, sem barras de REC, visual limpo e premium, aprovar escolhas de estilo antes de renderizar, nunca versionar vídeos.
