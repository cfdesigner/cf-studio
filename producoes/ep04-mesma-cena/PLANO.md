# Plano de edição: Episódio 04 "Mesma cena" (CFDesigner)

Status: **versão montada para aprovação** (21,4 s, `Ep04MesmaCena`, mixagem em `mixar.py`). Storyboard: `storyboard.html` (os tempos do storyboard eram de 26 s; a narração do dono fechou em 21,4 s, veja a linha do tempo abaixo).
**Design system:** CFDesigner · **Formato:** vertical 1080×1920, 30 fps · **Duração alvo:** 26 s · **Plataforma:** Reels
**Terceiro de nome:** não. **Com narração em off** na voz do dono (ele grava; nenhuma voz de IA paga); eu corto em cima da voz e uso `Legendas` (sem ponto final). Etiquetas e checklist ficam **ao lado do personagem**, com `LinhaChamada` ligando, nunca sobre o rosto e sempre viradas para o centro.

## Narração (rascunho para o dono ajustar)

| Etapa | Fala |
| --- | --- |
| Gancho | Mesma cena. Três mudanças |
| Bruto | Assim ela saiu da câmera. Bonita, mas sem vida |
| Ritmo | Primeiro, o ritmo. Cada corte na hora certa muda a energia |
| Cor | Depois, a cor. É ela que dá clima e identidade |
| Som | E por fim, o som (e silêncio, para ouvir os efeitos) |
| Resultado | Mesma cena. Qual mudou mais? |

## Material

| Arquivo | Duração | Formato | Avisos |
| --- | --- | --- | --- |
| `public/entrada/canajure/cena.mp4` (Cena_Canajure) | 30,7 s | 1080×1920, 29,97 fps, H.264 | Plano fixo. −31 LUFS, só ambiente. Dono tem 4K, mas escolheu esta versão editada. Você quase parado até ~18 s: usar de 18 a 30 s |

## Linha do tempo

| # | Tempo | Etapa | Origem na cena | Por cima | Som |
| --- | --- | --- | --- | --- | --- |
| 1 | 0–2 s | Gancho | quadro do resultado (aprox. 24,5 s), já com o look Âmbar Cinema | "MESMA CENA" grande (Bebas, "CENA" em âmbar) e "3 MUDANÇAS" pequeno e branco embaixo, a meio caminho entre o personagem e o alto do quadro (topo ≈ 410 px) | `grande` + `cartao` |
| 2 | 2–6 s | Bruto | contínuo 20–24 s, em visual cinza (simulação de log: contraste e cor reduzidos) | selo "ORIGINAL" | só ambiente |
| 3 | 6–11 s | + Ritmo (ainda bruto) | 4 trechos de 18–30 s, cortes a cada 1,2 s (2 tempos a 100 BPM); aberto e aproximação ≤ 1,35x | etiqueta RITMO mais alta, entre o personagem e as folhas | `fraco` 0,15 s antes de cada corte |
| 4 | 11–16 s | + Cor | clarão e virada para a imagem real com o look por cima | etiqueta COR (mesma altura da RITMO); clarão curto na troca | `icone` |
| 5 | 16–21 s | + Som | mesma montagem | `LinhasDeSom` (novo, semitransparente, centralizada e esticada, ~75% da largura, entre o personagem e as folhas, topo ≈ 540 px, escala 1,5), girando no eixo Y de +32° a −32° durante a etapa (`giroDe`/`giroAte`): VOZ, AMBIENTE, WHOOSH, IMPACTO, TIQUE | ambiente mais presente, `fraco` nos cortes, `grande` quando os braços sobem, `tick`/`tick_final` nas marcas |
| 6 | 21–24 s | Resultado | último plano (você se afastando, ~28–30,7 s) com tudo | "MESMA CENA" pequeno e branco em cima e "QUAL MUDOU MAIS?" grande, no alto, entre o personagem e as folhas | `grande` suave |
| 7 | 24–26 s | Fecho | | `FechoSimples` | `fraco` na saída |

## Decisões a aprovar

1. Início bruto e cinza (ideia do dono). Se ele filmou em log de verdade, usar o original em vez de simular.
2. ~~Look~~ **Âmbar Cinema, confirmado pelo dono** (vale também para o gancho). LUT em `design-systems/cfdesigner/assets/luts/ambar-cinema.cube`.
2. Texto do gancho e convite final.
3. Música por baixo, ou só efeitos do design system?
4. Duração: 26 s ou ~20 s?

## Riscos

- O bruto é simulado (filtro de contraste e cor reduzidos); se for log real, melhor usar o original.
- Aproximações limitadas a 1,35x (a fonte é 1080×1920).
- Áudio original baixo (−31 LUFS): normalizar o ambiente e depois mixar o conjunto a −14 LUFS.
- Rosto/gráficos: você é pequeno e fica no centro-baixo; etiquetas e checklist ficam no alto.


## Versão montada (21,4 s)

Tempos pela voz do dono (narração de 17,1 s, pausa depois de "o som" alargada em 1,4 s) e pela música (kick em 9,2 s, 100 BPM). Todos os cortes caem em batidas de 0,6 s.

| Tempo | Etapa |
| --- | --- |
| 0 a 2,6 s | Gancho: "MESMA CENA" grande, "3 MUDANÇAS" pequeno e branco (Âmbar Cinema) |
| 2,6 a 5,6 s | Bruto: um plano só, visual cinza (simulado) |
| 5,6 a 9,2 s | + Ritmo: 3 cortes de 1,2 s (aberto, aproximação 1,35x, aberto); etiqueta RITMO com linha de chamada |
| 9,2 a 12,2 s | + Cor: clarão no primeiro kick e virada para a imagem real com Âmbar Cinema; etiqueta COR |
| 12,2 a 16,4 s | + Som: caixinha `LinhasDeSom` girando de +32° a −32°; música recua; efeitos nos cortes e impacto em 14,75 s |
| 16,4 a 19,4 s | Resultado: "MESMA CENA" pequeno e "QUAL MUDOU MAIS?" grande, você se afastando |
| 19,4 a 21,4 s | Fecho simples com o logo |

Legendas (dia a dia) só no miolo da fala; o gancho e o convite já têm texto grande. Correção: o Whisper ouviu "saiba da câmera" e foi corrigido para "saiu da câmera".
Áudio: voz −16 LUFS na mixagem, música abaixo (curva de volume), efeitos do design system; final −14,6 LUFS, pico −1,4 dBTP.
Comando: `npx remotion render Ep04MesmaCena out/ep04-sem-audio.mp4 --browser-executable=/opt/pw-browsers/chromium && python3 producoes/ep04-mesma-cena/mixar.py out/ep04-sem-audio.mp4 out/ep04-mesma-cena.mp4`

**Ajustes de som (pedido do dono):** cliques reduzidos de 3 para 1 (`tick` −6 dB), trocados por `suave`; entrada da caixinha com `timeline_in` (antes `cartao`); todos os efeitos 10 dB mais baixos (MASTER −8 dB; pico dos efeitos −16 dBFS contra −3 dBFS da voz); na pausa dramática depois de "o som" a música sobe ~4,5 dB e os efeitos +4 dB.

## Versão só com a narração (o dono faz música e efeitos)

Pedido do dono: ele faz o áudio. Entregues: `out/ep04-mesma-cena-so-voz.mp4` (voz a −14,1 LUFS), `out/ep04-narracao-alinhada.wav` (a voz com a pausa alargada, alinhada com a imagem) e `out/ep04-sem-audio.mp4` (vídeo limpo). Comando: `python3 producoes/ep04-mesma-cena/mixar.py out/ep04-sem-audio.mp4 out/ep04-mesma-cena-so-voz.mp4 --so-voz --wav-voz out/ep04-narracao-alinhada.wav`.

**Marcas de tempo para ele posicionar o som (s):**

| Tempo | O que acontece na imagem |
| --- | --- |
| 0,0 | Gancho: texto "MESMA CENA / 3 MUDANÇAS" |
| 2,6 | Corte para o bruto |
| 5,6 | Etiqueta RITMO |
| (sem cortes) | Ritmo agora é um plano contínuo com zoom que vai e volta |
| 9,2 | Clarão e virada para a cor (no projeto, o primeiro kick da música) |
| 10,4 · 11,6 | Cortes |
| 12,2 | Entra a caixinha de som |
| 13,4 · 14,6 · 15,8 | Cortes (giro da caixinha continua) |
| 14,75 | Braços no alto (impacto) |
| 13,5 a 16,4 | Pausa dramática depois de "o som" |
| 16,4 | "QUAL MUDOU MAIS?" |
| 19,4 | Fecho com o logo |
| 21,4 | Fim |

## Planos trocados (sem braços levantados, pedido do dono)

O primeiro e os planos do meio não repetem mais o gesto de braços para cima. Agora (segundos da cena original): gancho 1,2 (vira de perfil para as costas); bruto 6,5 a 9,5 (parado); ritmo 4,6 (gira), 15,6 aproximação (olha para baixo), 13,2 (troca o peso); cor 17,6 (passo e giro), 25,4 aproximação (se vira), 16,8; som 2,2, 13,4 aproximação, 18,6, 10,8. O último plano (27,7 a 30,7 s, ele vindo para a câmera) foi mantido por ter sido aprovado. Arquivos: `cena-bruto-full.mp4` e `cena-ambar-full.mp4` (30,7 s, em `public/entrada/canajure/`).

## Ritmo e cor em plano contínuo, transições e fecho com fundo (pedido do dono)

- **Ritmo (5,6 a 9,2 s) e cor (9,2 a 12,2 s):** o MESMO trecho da cena (13,2 s em diante) do começo ao fim de cada etapa, sem cortes, só com uma aproximação (até 1,3x) e um afastamento. A linha de chamada da etiqueta acompanha o zoom e aponta para a cintura, nunca para o rosto. **Som:** continua com cortes secos (aprovado).
- **Transições:** fusão de 0,3 s no gancho→bruto e bruto→ritmo; clarão (FlashCut) no ritmo→cor; cortina para a direita no cor→som; cortina para cima no som→resultado; fusão de 0,3 s do resultado para o fecho. O plano anterior continua por baixo da cortina.
- **Fecho:** `FechoSimples` ganhou a opção `fundo`; usa o fundo `FundoCF` variante `losangos` (combina com o losango do logo).
- Entrega: só o vídeo com a narração (`out/ep04-mesma-cena.mp4`).

## Cor sem zoom, varredura âmbar e som com 3 planos iguais (pedido do dono)

- **Cor (9,2 a 12,2 s):** outro momento da cena (4,4 s em diante, ele gira), plano contínuo e **sem zoom**; só o ritmo tem aproximação e afastamento. Trechos usados (cena original, s): gancho 1,2; bruto 9,0; ritmo 13,2; cor 4,4; som 17,0 · 25,6 (aproximação 1,35x) · 18,6; resultado 27,7.
- **Transição ritmo → cor:** `VarreduraAmbar` (novo no design system): uma linha fina âmbar cruza o quadro na transversal e revela a cena colorida (0,53 s, de 9,2 a 9,7 s). Substitui o clarão.
- **Som:** 3 planos iguais de 1,4 s (cortes secos em 13,6 e 15,0 s; um corte a menos). A caixinha mostra 3 whooshes (em 12,2, 13,6 e 15,0 s) e o impacto logo depois do segundo corte (15,1 s).

## Ajustes finais de acabamento (pedido do dono)

- Texto do gancho ("MESMA CENA / 3 MUDANÇAS") e do convite final ("MESMA CENA / QUAL MUDOU MAIS?") **100 px mais baixos e na mesma altura** (topo 500 px na base de 1080).
- **Legendas removidas** (ficavam em cima da pessoa). A narração segue sem legenda; o `legendas.json` ficou no repositório caso volte.
- **Transição cor → som:** a cortina para a direita foi trocada por fusão suave de 0,3 s (o dono não gostou da cortina). Cortina para cima (som → resultado) e varredura âmbar (ritmo → cor) seguem.
