# Arrasta Ilha: ficha de produção

**Identidade em uma linha:** cultura popular viva, quente e coletiva: creme com papel, cada peça com UMA cor-tema (laranja, verde, azul ou petróleo), faixas de grafismo e letra de recorte manual.

Estado: etapa 1 (cores, tipografia) **aprovada pelo dono em 27/11/2026** (espaçamento entre letras: o normal, sem juntar; a tentativa de juntar foi descartada). Etapa 2 (movimento e transições) em aprovação. Legendas, terceiro, números e fecho: próximas etapas.

## Movimento: a "batida" (proposta, a aprovar)
Sem vídeo de referência do grupo: a personalidade vem da identidade. Entra firme como pancada de alfaia, passa um pouco do ponto e assenta. Arquivo: `movimento.ts`; efeitos em `efeitos/`; exemplo `ArrastaIlha-Movimento` (stories 9:16, 9,6 s).
- **Título:** palavras sobem de uma máscara, uma 4 quadros depois da outra (`TituloBatida`), 14 quadros, curva `batida` (passa 20%).
- **Etiqueta e filete:** deslizam e se desenham, curva `firme` (sem passar).
- **Corte:** cortina em zigue-zague na cor da cena que entra, varrendo de baixo para cima, 16 quadros, ease inOut (`CortinaZigue`) + soco de 4% em 8 quadros (`SocoDeBatida`).
- **Fecho:** fundo noite, nome em pincel, linha de apoio pequena.
- Corte na batida: 96 BPM é hipótese; ajustar ao som real do grupo.
- **Nunca:** fade longo, elástico exagerado, giro, blur pesado.

## Regras provisórias (valem já)
- **Títulos: Zenzero Grotesk Sans, só a Sans (a Round foi descartada pelo dono), com contorno de 1,8% do corpo (1,5 px em 84 px), no máximo 2,4%.**
- **Uma cor-tema por peça** (como o site: Fundamentos laranja, Toadas verde, Dança azul).
- Fundo creme com respiro; texto escuro; sem tarja pesada.
- Não redesenhar logo, bandeira, ícones nem grafismos do grupo: usar os originais.
- Fotos de pessoas só com autorização do grupo; rosto nunca coberto por texto ou caixa.
- Linguagem inclusiva como o grupo escreve ("maracatuzeiros/as", "Amigues").
- Legenda nunca termina com ponto final nem reticências. Visual limpo e premium.

## Temas por página do site
Fundamentos laranja · Toadas verde · Dança azul · **Percussão terracota** (`#c0622b`, do semicírculo da página; o título dela no site está em cinza, sem cor-tema) · Home petróleo. Grafismos da Percussão: sol de respingo, semicírculo com curvas de nível, folha larga com nervuras, faixa de triângulos. A foto real da página mostra alfaias com cordas e padrão de triângulos azuis: referência para fotos de instrumento.

## Folha oficial de grafismos (prioridade sobre o resto)
Arquivo do dono: `assets/oficiais/padrao-oficial.jpg` (1472x566, **repete sem emenda**). Dela saem as faixas e peças oficiais (`assets/oficiais/`): **triângulos verdes, hexágonos azul e branco, AXÉ com búzios, ícones (respeito, arco, axé, luta, força), armas e chifre (AXÉ · LUTA), dançarinos e batuqueiros brancos com casas, faixa MARACATU laranja, coroa, selo laranja "Arrasta Ilha", "Arrasta Ilha" vertical, pássaro e parasol**. Paleta da folha: azul-marinho, azul vivo, verde, verde-limão, laranja, branco. No código: nomes `of*` em `faixas` e `padrao` em `assets/index.ts`; `PadraoOficial` em `components/Original.tsx`. O selo laranja serviu de assinatura provisória; agora vale a **logo oficial**. As faixas de composição (ícones, dançarinos, armas) repetem lado a lado; usar em tamanho próximo ao original (até ~2x).

## Fotos recortadas do grupo (enviadas pelo dono, 27/11/2026)
23 fotos já recortadas, em `assets/fotos/` (chaves `foto*` em `assets/index.ts`; catálogo `ArrastaIlha-Fotos`): mulher com a bandeira (792x1746, alta), mulher com a cabaça, mulher de braços ao alto com a camiseta laranja, tocadores de chapéu (cor e preto e branco), tocador preto e branco, adulto e menino com caixa, menino com caixa, menino com baqueta, casal no agogô, mestre sorrindo (2 versões), saias brancas (2), chocalhos e alfaias (vários). **Têm prioridade sobre os recortes tirados do site** (qualidade melhor). Para os quatro que o dono mostrou só no chat (dançarina de chapéu, tocadores de agogô, duas cantoras, chocalhos em preto e branco), pedir reenvio como anexo.
- Rosto de pessoa só em peça com autorização do grupo; não identificar ninguém por nome sem o dono dizer.
- Fotos preto e branco e coloridas **não se misturam na mesma peça**.

## Logos oficiais (enviadas pelo dono, 27/11/2026)
`assets/logos/`: **logo vertical** (tocador de alfaia e dançarina, "MARACATU ARRASTA ILHA", fundo transparente), **logo com grafismos de fundo** (a mesma sobre folhas, pontos e curvas de nível suaves) e **logo horizontal "Ambiente Virtual de Aprendizado"** (uso da plataforma). Chaves `logoVertical`, `logoGrafismos`, `logoAmbiente`.
- O nome da logo é preto com sombra cinza: **só sobre creme ou branco, direto, sem placa**. **Regra do dono (27/11/2026): nunca quadro branco atrás da imagem.** Em fundo escuro, não usar a logo: usar o nome em pincel (Kaushan, creme) ou mudar o slide para fundo claro (como o fecho do carrossel).
- Respiro mínimo em volta: 10% da largura. Não esticar, não recolorir, não pôr sobre foto.
- Usada em: A (canto), C (placa), G (capa) e **H, o fecho** (logo grande, ensaio todo domingo 15h, @arrastailhaoficial; feed e stories).

## Elementos gráficos e ícones oficiais (enviados pelo dono, 27/11/2026)
Em `assets/elementos/` (chaves `el*`; catálogo `ArrastaIlha-Elementos`): folhas (com curvas, com tracejado, com mancha azul, larga), arcos azuis (finos e grossos), pontos laranja e pêssego, sol de respingo, semicírculo com curvas, curvas azuis com semicírculo, manchas pêssego e azul, flor laranja e buquê. **Substituem os recortes do site** nos modelos. Vários vêm cortados na borda da folha original: encostar na borda do quadro, nunca deixar flutuando. O buquê vem pela metade (só o lado esquerdo): precisa do arquivo inteiro para uso.
Em `assets/icones/` (chaves `ic*`, **brancos, só sobre fundo marinho, verde, terracota ou laranja**): arco e flecha, machado duplo, tridente com setas, leque de cabaça, ferradura com estrela, cone bordado. Nomes pela forma; o significado de cada um é do grupo e só entra em texto se o dono disser. Usados no modelo C.

## Instrumentos soltos (enviados pelo dono, 27/11/2026)
7 recortes de instrumento em `assets/fotos/` (chaves `foto*`): xequerê azul, xequerê verde, xequerê azul com búzios, tambor de madeira com triângulos, ganzá de vime, sino preto (agogô de uma boca) e caixa de aço com baquetas. Nomes provisórios, **o dono confirma o nome certo de cada instrumento** antes de entrarem em texto de peça. Servem para peças de percussão e oficina, como elemento isolado ou em grupo.

## Grafismos, faixas e recortes (ORIGINAIS do site; regra do dono: ser fiel, não inventar)
Nada de grafismo desenhado por mim: tudo vem dos prints do site (material do próprio grupo). Faixas: as 5 que o dono enviou (`assets/faixas/`): X verde (Toadas), setas lilás (Percussão), zigue azul (Dança), triângulos verdes (Home), AXÉ · LUTA (Home). **Falta a faixa coral/rosa da página Fundamentos** (pedir ao dono). Recortes (`assets/recortes/`, gerados por `scripts/recortar-site.py` com rembg + filtros de cor): mulher com a bandeira, mulher com a cabaça, tocadores de caixa, tocador de agogô, tambores (alfaias), menino com caixa, sol de respingo, folhas, pontos, arcos, semicírculo com curvas, tracejado. **Pessoas de roupa branca (página Dança) não deram recorte limpo** (branco sobre branco): pedir os originais.
Uso em código: `Faixa` e `Recorte` (`components/Original.tsx`), catálogo em `assets/index.ts`. Cada peça usa a faixa da página do site a que o tema pertence.
- Recortes são do tamanho dos prints (até ~900 px de altura): não ampliar mais de ~1,3x; trocar pelos arquivos de origem em alta quando o grupo mandar.
- Grafismos e recortes nunca passam por cima de texto; rostos livres.
- Fotos de pessoas só com autorização do grupo (as dos recortes são as que o próprio grupo já publicou no site).

## Modelos de peça (feed 4:5, em aprovação)
**A** aviso do ensaio (mulher da bandeira, faixa de triângulos, laranja) · **B** toada nova (tocador de agogô, faixa de X, verde) · **C** oficina com mestre (tocadores, faixa de zigue azul, azul-marinho, campos entre colchetes) · **D** toque de percussão (alfaias, faixa de setas, terracota) · **E** destaque institucional (mulher com a cabaça, faixa de dançarinos oficial), **G** capa e fecho (padrão oficial em tela cheia com painel creme; feed e stories). Composições `ArrastaIlha-ModeloA-Aviso`, `-B-Toada`, `-C-Oficina`, `-D-Percussao`, `-E-Destaque`, `ArrastaIlha-Recortes`.

## Cartaz de evento (referência do dono: "Lançamento da plataforma", 02 de julho)
Estrutura do cartaz que o dono fez na época da plataforma, agora modelo **F** (`ModeloEvento`, feed 4:5 e stories 9:16): faixa azul de zigue no topo; **tudo centralizado**; título em duas linhas escuras, **nome do grupo em laranja**, **data grande**, serviço (dia, hora, canal ou local) pequeno; fundo creme com **manchas orgânicas pêssego e azul-claras** (recortadas do site); folha marrom na lateral; instrumentista ilustrado à direita. O cartaz original usa uma ilustração de instrumentista (estilo ilustrado, roupa branca com listras azul e laranja): ilustração e foto recortada convivem, mas **não misturar numa mesma peça**.

## Referência: eBook das Toadas (2021, feito pelo dono)
`clientes/arrata-ilha/entrada/ebook-toadas.pdf` (fora do Git) mostra a gramática visual que o grupo já usa em página: fundo creme, **faixa oficial no topo e no rodapé**, título escuro em negrito com crédito pequeno, **recorte de foto grande no canto** com folha, pontos e curvas, **ícones brancos sobre bloco de cor** (por página) e capa em painel azul. Os modelos A a H seguem essa gramática; **o eBook é a prova de que o sistema já funciona para o grupo**. **Decisão do dono: o eBook é só referência visual. Não usar toadas nem versos das toadas nas peças**; só a linguagem (fundo branco, grafismos suaves, personagens recortados, faixas em cima e embaixo, títulos e subtítulos).

## Modelos de página na linguagem do eBook (referência visual do dono; sem conteúdo de toadas)
`components/Pagina.tsx`: **P1** página de título e lista (`PaginaTitulo`), **P2** página com personagem recortado ancorado na faixa de baixo (`PaginaPersonagem`), **P3** página com ícone em painel inclinado (`PaginaIcone`), **P4** capa em painel moldurado pelo padrão oficial (`CapaPainel`). Feed 4:5 e stories (`stories`) para P1, P2 e P4. Composições `ArrastaIlha-Pagina1-Titulo`... Todo texto é de exemplo entre colchetes.
Receita medida no eBook: **fundo branco** (`branco`); **grafismos suaves** atrás (os elementos oficiais com 7% a 13% de opacidade, via `Suave`); **faixa oficial em cima e embaixo** (alternar a faixa por página); **título** em Zenzero, vinho `#4a2720`, com **ícone em contorno vinho** (`iv*`) ao lado e **a logo horizontal** no canto; **subtítulo** em Carlito negrito sublinhado com linha de crédito em negrito menor (`Subtitulo`); **texto corrido** em Carlito 34 px, `#231f20` (`Texto`); personagem recortado grande, ancorado na faixa de baixo; ícone branco sobre bloco de cor.

## Folha do design system
Composição `ArrastaIlha-Folha` (2400x5350, `components/Folha.tsx`): prancha única com logos, cores, tipografia, faixas, grafismos, ícones, personagens e instrumentos, 12 modelos de peça em miniatura, regras e movimento. Renderizar: `npx remotion still ArrastaIlha-Folha out/arrasta-folha.png --image-format=png`.

## Carrossel de impacto (diagramação da referência do dono, visual do Arrasta Ilha)
`components/Carrossel.tsx`, composições `ArrastaIlha-Carrossel-1-Capa` a `-6-Fecho` (6 slides 4:5; PNG final `--scale=2.5`). Da referência (feed de uma agência, só a diagramação): **título enorme e apertado**, **abertura curta em pincel** acima, **palavra gigante fantasma** atrás, **personagem recortado sobrepondo o título**, texto pequeno no canto, **etiquetas arredondadas**, alternando fundos de cor e branco. Do design system: Zenzero, cores-tema, faixas, elementos, recortes e logo. Slides: capa (marinho), toque (branco), baque (marinho), serviço com número gigante (branco), oficina com campos (terracota), fecho com logo (marinho). Textos são de exemplo com dados reais do grupo (domingo, 15h, Espaço Aruanda, desde 2002).

- **Ajustes do carrossel (27/11/2026):** recortes com corte reto de origem vão **colados na borda** do quadro (ou sob a faixa), nunca no meio; **personagens grandes** (até 1000 px de altura em 1350), podendo subir atrás do título se o texto continuar legível.

## Modelo reutilizável: aniversário e homenagem (aprovado pelo dono)
`components/Aplicacao.tsx` (`ModeloAniversario`, props: saudação, título, nome, data, mensagem, foto; composições `ArrastaIlha-Modelo-Aniversario` e `-Stories`; guia `docs/modelo-aniversario.md`). O exemplo aprovado `ArrastaIlha-Aplicacao-Aniversario` refaz o post atual do grupo ("22/11 Parabéns Regente Karen", com o texto original). Título enorme em duas linhas (vinho e laranja), abertura em pincel, foto retangular em bloco azul deslocado (sem moldura branca), etiqueta de data, mensagem curta, logo e faixa de ícones. A foto é um recorte do print do post: **baixa resolução, trocar pelo arquivo original** e conferir autorização para a pessoa.

## Aplicação: "Vem vadiá! Carnaval 2027 · 25 anos" (escolha de camiseta)
`PostCamisetas` em `components/Aplicacao.tsx`, composição `ArrastaIlha-Aplicacao-Camisetas` (feed 4:5). Refeita de um post atual do grupo, com o texto original: logo, "vem vadiá!" em pincel, "Carnaval 2027" em vinho, "25 anos" em laranja, chamada em Carlito, grade 2x2 de camisetas grandes sobre branco, com o rótulo ("modelo" em pincel e o nome em Zenzero) no canto vazio embaixo à direita de cada par, como no original; faixa de dançarinos em cima e embaixo. Versão stories com logo e título centralizados (`ArrastaIlha-Aplicacao-Camisetas-Stories`). Peça esporádica: **não vira modelo reutilizável** (decisão do dono). As camisetas (Catirinas, Estandarte, Batuqueiros, Corte Real) são recortes do print (baixa resolução, bordas irregulares escondidas no fundo branco): trocar pelos arquivos originais de cada modelo, frente e costas.

## Aplicação: cartaz de chamada de evento "Domingueira" (versões branca e azul)
`PostDomingueira` em `components/Aplicacao.tsx`, composições `ArrastaIlha-Aplicacao-Domingueira-Branco` e `-Azul` (feed 4:5), refeitas de um cartaz atual do grupo, com o texto original. O dono recusou as primeiras cores (azul com laranja e verde) e pediu: **fundo branco** e **uma versão azul-marinho com todos os textos em branco** (título, "Blocos Afros Floripa", data, serviço, valores, entrada gratuita), com etiquetas só em contorno branco. Estrutura: abertura em pincel, título enorme, etiqueta dos convidados, foto do grupo em largura total, data grande, serviço, valores, entrada gratuita e a fileira de créditos (Produção, Realização, Apoio, Libras) enviada pelo dono (`assets/aplicacoes/creditos-domingueira.png`, 453x88, baixa resolução, fundo branco). Na versão azul a fileira de créditos fica numa **faixa branca de rodapé** de largura total (os logos têm fundo branco); na versão branca, direto. Logos dos blocos convidados: pendentes.

- **Domingueira, versão "degradê"** (`ArrastaIlha-Aplicacao-Domingueira-Degrade`, `variante: "degrade"`): a **versão branca foi aprovada pelo dono como está** e fica intacta; esta é a variação pedida para trabalhar a foto: foto maior que se dissolve no branco por degradê de opacidade embaixo e nas laterais (duas máscaras aninhadas), topo reto sob a etiqueta dos convidados, data sobre a parte já esmaecida.
- Degradê da Domingueira ajustado: **rosto e tronco da pessoa que segura o estandarte ficam sempre opacos** (rosto em ~y 385 da foto original 1280x854); o esmaecimento começa em 76% da altura da foto e cobre só o último quarto. Regra geral: antes de aplicar degradê em foto com pessoa, localizar o rosto e garantir opacidade total nele.
- Domingueira em **stories 9:16** (versão degradê): `PostDomingueiraStories`, composição `ArrastaIlha-Aplicacao-Domingueira-Degrade-Stories`. Foto de 740 px de altura (rosto e tronco opacos, degradê só no último quarto), texto importante fora das faixas de interface do Instagram (topo ~180 px e rodapé ~220 px livres de informação essencial; os créditos terminam em ~1710).

## Aplicações do dia a dia: ensaio e aviso de programação
Refeitas de dois posts atuais (verdes, com a data 30/08 e 11/10). Componentes em `components/Aplicacao.tsx`, com props:
- `ModeloEnsaio` (`ArrastaIlha-Aplicacao-Ensaio`): título, subtítulo, destaque em pincel, nota, data, linha, local, foto. Foto em bloco azul deslocado. A foto do exemplo é o recorte do print (muito baixa, ~390 px, borrada): **trocar pela original**.
- `ModeloProgramacao` (`ArrastaIlha-Aplicacao-Programacao`): título, subtítulo, data (etiqueta verde), mensagem (`|` quebra a linha) e detalhe opcional. Sem foto; serve para avisos (sem ensaio, mudança de horário ou local).
O dono pediu para refazer os dois no estilo branco do design system; os verdes originais foram abandonados.

## Vídeo: legendas (etapa 3, 4 opções em imagem, aguardando escolha do dono)
`components/LegendasOpcoes.tsx`, composições `ArrastaIlha-Legenda-A` a `-D` (9:16, frase de exemplo "Todo domingo tem maracatu na UFSC", sem ponto final, acima dos ~24% de baixo): **A** Zenzero branca com contorno fino e a palavra falada em laranja; **B** pílula azul-marinho com texto creme e a palavra falada em laranja; **C** frase de efeito com a palavra-chave gigante em laranja e o resto pequeno em Carlito, fundo mais escuro; **D** pincel (Kaushan) creme com a palavra falada em pêssego. Regras valem para todas: sem ponto final nem reticências; sem quadro branco; palavra falada em destaque; rosto livre. Depois da escolha: implementar o componente com palavra por palavra (`buildPages`), teste com fala real transcrita pelo Whisper.
- Legenda **E** (variação da D pedida pelo dono, que gostou da D): frases em pincel creme e **a palavra falada em Zenzero (fonte principal)** em pêssego, contorno 1,8%. Composição `ArrastaIlha-Legenda-E`, imagem `out/legendas/opcao-E.png`. Aguardando aprovação.

## Regra geral: entrelinha curta (dono, 27/11/2026)
O dono não gosta de espaço grande entre linhas. Tokens em `tokens.ts` (`entrelinha`): título 0,88, pincel 0,8, texto corrido 1,22; entre blocos o vão visível fica entre 4% e 8% do tamanho da letra. Vale para legendas, títulos, cartazes e vídeo. Já aplicado nas legendas D e E; os cartazes aprovados (aniversário, camisetas, Domingueira) já seguem. Também gravada no `CLAUDE.md` para todos os design systems.
- **Legenda F** (corrigida pelo dono): "todo domingo tem" na fonte da C (Carlito negrito, pequeno, branco, minúsculo, como a referência que ele enviou); "maracatu" gigante e "na UFSC" em Zenzero laranja, mesma fonte e contorno; entrelinha curta; fundo escurecido. Composição `ArrastaIlha-Legenda-F`. Aguardando aprovação final para virar o componente de vídeo.

## Legendas: FECHADAS pelo dono (27/11/2026)
Componente `Legendas` (`components/Legendas.tsx`), exemplo `ArrastaIlha-Legendas-Exemplo` (9:16, 9 s, palavras de tempo sintético; em produção vêm do Whisper). Mesmo contrato do CFDesigner: `captions` + `punchLines` aprovadas.
- **Frase de efeito (opção F, escolha final):** "todo domingo tem" (texto antes da palavra-chave) em **Carlito negrito, pequeno, branco, minúsculo**; **palavra-chave gigante em Zenzero laranja** ("maracatu"); o resto ("na UFSC") em **Zenzero branca**, mesmo contorno; entrelinha curta; escurecimento só no terço de baixo; a palavra-chave sobe com a "batida".
- **Dia a dia (opção A):** Zenzero branca com contorno fino, **palavra falada em laranja**, palavras entrando uma a uma, até 26 caracteres e 5 palavras por página, gradiente escuro suave embaixo para leitura sobre fotos claras. Sombra suave.
- Posição: acima dos ~24% de baixo (botões do Reels). **Nunca ponto final nem reticências**; `?` e `!` ficam.
- Usar a frase de efeito só em frases curtas e fortes, nunca em mais de ~30% do vídeo.
- Cor da palavra-chave ("maracatu") da legenda F: o laranja `#f38b4c` ficou apagado sobre as fotos (reclamação do dono). Alternativas em imagem (`out/legendas/comparativo-cor.png`, composições `ArrastaIlha-Legenda-F-Vivo/-Ouro/-Borda/-Creme`): vivo `#ff7a1a` (mais saturado, perto do laranja oficial da faixa MARACATU, `#f47f22`), ouro `#ffb81c`, vivo com borda escura, pêssego claro. Aguardando a escolha.
