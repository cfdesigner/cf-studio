# Episódio 05: "Qual sou eu?" (CFDesigner) — roteiro v3 (dono em cena + rastreio das mãos + transformação por IA)

Status: **roteiro v3 para aprovação** (ideia do dono, estruturada com a skill `conteudo-viral`). Substitui a v1 (praia do Canajurê) e a v2 (tela dividida). O `storyboard.html` e o `PROMPT-IA.md` de antes ficam como histórico até a aprovação; atualizo depois. Nada foi montado.
**Design system:** CFDesigner · **Formato:** vertical 1080×1920, 30 fps · **Duração alvo:** ~28 s · **Plataforma:** Reels
**Função:** diferencial (vídeo com IA) + tese "a IA gera, quem dirige é você". Gera comentário ("1 ou 2?"), envio e reassistir (transformação).

## Ideia

O dono aparece falando para a câmera, com **uma imagem flutuando em cada mão**, presa às mãos pelo rastreio. As duas imagens mostram a mesma cena: uma gravada, outra gerada por IA. Ele aponta, olha e fala para elas; em alguns momentos cada uma abre em **tela cheia** e volta para a mão. No fim, a imagem da IA **se transforma** (ele → robô → alienígena → mulher → astronauta) **mantendo exatamente o mesmo movimento**: a prova de que a IA mantém a direção e troca quem está dentro.

## Mapa de momentum

- **Promessa:** "Um desses sou eu. O outro é IA. Acerta qual?"
- **Gancho visual:** ele já com duas "telas" nas mãos, em movimento, e o contraste de dois "eus" (rosto dele de verdade + dois clipes dele). Sem cartão de título.
- **Laço aberto:** qual é a IA (resolve em ~17 s) e "no fim eu mostro o que a câmera nunca fez" (a transformação).
- **Pedido único:** comentar "1 ou 2".
- **Maratona:** gancho para o episódio 06 ("o corte que entrega o amador").
- **Medir depois:** retenção aos 3 s, tempo médio, envios, comentários "1" vs "2".

## Linha do tempo

| Tempo (s) | Botão | Etapa | Imagem | Por cima (pequeno, sem ponto final) | Fala |
| --- | --- | --- | --- | --- | --- |
| 0 a 3 | 1 Alcance | **Gancho** | Ele de frente, duas imagens presas às mãos (1 e 2), já em movimento | "UM DESSES SOU EU" no alto, longe do rosto | "Um desses dois sou eu. O outro é IA" |
| 3 a 6 | 1→2 | Promessa e laço | Ele ergue as mãos e as imagens crescem um pouco | "NO FIM, O QUE A CÂMERA NUNCA FEZ" (discreto) | "Eu gravei um e gerei o outro. E no fim eu mostro o que a câmera nunca fez" |
| 6 a 9 | 2 | **Imagem 1** | Aponta para a mão esquerda; a imagem 1 abre em **tela cheia** e volta | número "1" pequeno | "Olha o primeiro" |
| 9 a 12 | 2 | **Imagem 2** | Aponta para a direita; imagem 2 em tela cheia e volta | número "2" pequeno | "Agora o segundo" |
| 12 a 16 | 2 | **Pistas** | De volta a ele, imagens nas mãos; zoom suave nas imagens (mãos, sombra, borda) | "ONDE ESTÁ O ERRO?" | "Olha as mãos, olha a sombra. Comenta aí: 1 ou 2?" |
| 16 a 18 | 2→3 | Pausa | Ele cala e sorri, olhando para a câmera | "1 OU 2?" | silêncio (ênfase só aqui, +4 dB) |
| 18 a 20 | 3 | **Revelação** | Etiqueta "REAL" na mão da real e "IA" na outra | "REAL" / "IA" | "O [X] sou eu. O [Y] é IA" |
| 20 a 25 | 3 | **Transformação** | A imagem da IA abre em tela cheia e vira, na mesma ação e no mesmo movimento: robô, alienígena, mulher, astronauta (~1 s cada, com varredura âmbar entre eles) | pequeno: "MESMO MOVIMENTO" | "Mesmo movimento. Posso virar qualquer coisa" |
| 25 a 27,5 | 3 Maratona | Tese + próximo | Volta a ele, mãos abertas | "QUEM DIRIGE É VOCÊ" e, pequeno, "PRÓXIMO: O CORTE QUE ENTREGA O AMADOR" | "A IA gera. Quem dirige é você. No próximo, o corte que entrega o amador" |
| 27,5 a 29 | | Fecho | `FundoCF` variante `visor` + logo | | |

~70 palavras em ~27 s (2,6 palavras/s, ritmo de fala natural). Sem legenda de fala (regra da série); só os textos pequenos. Se quiser mais curto (~22 s), tirar a imagem 2 em tela cheia (6 a 12 vira 6 a 10).

## A cena que vai nas imagens (não será o Canajurê): 3 sugestões

| Opção | O que é | Prós | Contras |
| --- | --- | --- | --- |
| **A. Ele mesmo (recomendada)** | Ele de frente, fundo liso (parede ou estúdio), faz um movimento simples e legível: **gira de perfil para a câmera e abre os braços** (6 s). Sem rosto em primeiro plano | Combina com "um desses sou eu"; corpo inteiro e silhueta clara é o que o motion control faz melhor; a troca para robô/alien/mulher é óbvia | O clipe de IA com ele mesmo precisa de foto de referência dele |
| B. Caminhada | Ele andando em linha reta numa rua ou corredor, câmera fixa | Muito fácil de seguir pelo motion control; ótimo para astronauta/robô | Menos "eu" no gancho |
| C. Objeto/mão | Mão servindo café ou girando um produto | Barato de gravar | A transformação em pessoa/robô perde força; a tese fica menos forte |

Gravação do clipe base: **câmera parada** (tripé), mesmo fundo, luz difusa, roupa lisa e de cor que não se confunda com o fundo, sem sombra forte. Movimento começa só depois de ~1 s parado e termina parado.

## Como cada parte é feita

1. **Gravação principal** (ele falando, 9:16, tripé, da cintura para cima, mãos livres). Em cada mão, **um cartão rígido** do tamanho de um celular com **4 marcadores nos cantos** (ArUco, que eu gero em PDF para você imprimir). O rastreio por marcador é bem mais firme que seguir a mão nua. Plano B para a mão aberta: a imagem flutuando sobre a palma (rastreio de mãos com MediaPipe; testei aqui e ele instala e baixa o modelo, mas treme mais).
2. **Dedos na frente do cartão:** uso o recorte da pessoa (`scripts/recortar-pessoa.py`) para a mão passar por cima da imagem, sem parecer colada.
3. **Tela cheia e volta:** a imagem cresce do cartão até o quadro e retorna (animação no Remotion, com a posição rastreada como ponto de partida).
4. **Clipe real e clipes de IA:** você grava o clipe base (opção A). Eu escrevo os prompts de **motion control** (mesmo movimento, outro personagem): o clipe dele como referência de movimento + uma imagem de cada personagem. Você gera no app que preferir e manda 2 a 3 versões de cada. **Eu não gero nada pago sem você pedir** (regra do `CLAUDE.md`); se pedir, mostro o conceito e o custo antes.
5. **Transformação:** como o motion control mantém o movimento, os quatro clipes ficam alinhados quadro a quadro; a troca é feita com varredura âmbar/véu de luz do CFDesigner (efeitos já existentes), sem morph de verdade.
6. **Som:** o dono faz música e efeitos; os meus sons de apoio, quando houver, ficam baixos e sem clique.

## Riscos

- **Rastreio:** mãos tremendo, desfoque de movimento e dedos cobrindo o cartão. Mitigação: cartão firme com marcadores, mãos pouco rápidas, boa luz.
- **Motion control:** pode errar mão, rosto ou pé. Gerar várias versões e escolher; se uma transformação sair fraca, tiro e fico com três.
- **Gancho "qual sou eu?":** o clipe de IA dele pode ficar óbvio; se isso acontecer, a graça vira a transformação (o payoff), e o gancho muda para "olha o que a IA faz comigo".
- **Rosto livre:** os cartões ficam na altura do peito/ombro e abaixo do queixo, nunca na frente do rosto (regra do `CLAUDE.md`).
- **Transparência:** a revelação diz com clareza qual é IA; nada de esconder.

## Material necessário

- [ ] **[dono]** Escolher a cena (A, B ou C) e a ordem (a IA é a 1 ou a 2? recomendo a IA como **1**).
- [ ] **[Claude]** Gerar o PDF dos marcadores para imprimir (2 cartões) e um guia de gravação (distância, luz, onde ficam as mãos).
- [ ] **[dono]** Gravar: (a) o clipe base de 6 s, (b) a gravação principal falando com os cartões.
- [ ] **[Claude]** Prompts de motion control para robô, alienígena, mulher e astronauta.
- [ ] **[dono]** Gerar os clipes de IA e a narração/som.
- [ ] **[Claude]** Montar no Remotion depois do storyboard aprovado.

## Decisões a aprovar

1. Cena do clipe: **A** (ele mesmo), B ou C?
2. Ordem: a IA é a **1** ou a **2**?
3. Rastreio: cartão com marcadores (recomendado) ou mão nua com a imagem flutuando?
4. Personagens da transformação: robô, alienígena, mulher, astronauta (mudar ou acrescentar algum?)
5. Falas e o gancho para o ep. 06.
6. Duração: ~28 s como está ou ~22 s.
