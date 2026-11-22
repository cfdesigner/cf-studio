# Som do C02: efeitos e música

Status: efeitos com os **sons do próprio dono** (extraídos do `C01_SFX`) aguardando aprovação; música a ser gerada por ele no Suno. Nenhuma ferramenta de IA paga usada. O kit sintetizado (`kit.py`) ficou só como reserva (`--sintetico`).

## Leitura do C01 do dono (referência)

- Efeitos curtos, secos, colados nos gráficos: clique/"pop" nas marcas do checklist (ex.: ~20,9 s, "SOM"), whooshes que **começam ~0,15 a 0,25 s antes do corte** (3,6 · 8,8 · 16,7 · 21,6 s), impactos graves, e um tom agudo discreto perto do logo.
- A fala domina o áudio; a música está baixa por baixo: **lá menor** (sub A1, e pad com E, A, G, B, C), cauda de ~4 s no fim, andamento em torno de **100 BPM** (batidas a cada 0,3 s no respiro de 7,4 a 8,4 s).
- Não dá para extrair os sons dele da mistura (voz e música por cima). **Pedir ao dono um export só com os efeitos** (sem voz e sem música) para usar os sons exatos.

## Sons do dono (stem `C01_SFX`)

O stem só de efeitos tem 19 sons, que são poucos arquivos repetidos em volumes diferentes (agrupados por correlação): `cartao` (3 vezes), `tick` (3), `tick_final` (2), `fraco` (4), `icone` (2), `grande` (2), `timeline_in`, `timeline_out`, `suave`, e 12 tiques de relógio no ícone de cronômetro. Kit em `design-systems/cfdesigner/assets/sfx/` (README com o uso de cada um). Padrões do C01: o whoosh de cartão vem ~0,1 s antes do cartão; um clique por marca (o último é o `tick_final`); `fraco` quando o cartão sai; `grande` no zoom e no logo.

## Mapa de efeitos do C02 (`mixar.py`, lista `EVENTOS`)

Tempo = início do som, no volume original do dono (+2,6 dB de ajuste geral porque a fala do nosso vídeo está a -14,1 LUFS e a do C01 a -16,7).

| Tempo | Som | O que é |
| --- | --- | --- |
| 2,12 | cartao | texto "MUITO MAIS INTERESSANTE" sobe atrás dele |
| 3,30 | fraco | corte para a praia (o respiro de 1,6 s fica livre para a música) |
| 5,92 | fraco | corte para o mar |
| 6,20 | cartao | frase de efeito "CÂMERA MELHOR" |
| 8,35 | fraco | corte para a árvore |
| 8,90 | cartao | cartão do checklist entra |
| 9,30 · 10,00 · 10,90 · 11,25 | tick | ✓ Direção, Composição, Cor, Iluminação |
| 11,92 | tick_final | ✓ Som (última marca) |
| 12,62 | fraco | checklist sai e corte para o parapeito |
| 12,86 | cartao | "TRANSFORMAR COMPLETAMENTE" entra |
| 15,08 | cartao | corte em que ele aparece + vazamento de luz |
| 16,76 | cartao | "SIMPLESMENTE EDITAR" entra |
| 18,10 | fraco | palavra riscada sai |
| 18,70 | grande | zoom de aproximação, "EXPERIÊNCIA VISUAL" |
| 20,14 | fraco | saída: zoom e desfoque |
| 20,70 | grande | logo CFDesigner |
| 22,95 | fraco | logo sai |

Rodar: `python3 producoes/c02-broll/som/mixar.py out/c02-final.mp4 out/c02-sfx-dono.mp4` (sem música; a música do Suno entra depois).

## Música para o Suno (instrumental)

**Estilo (cole em "Style of Music"):**

> Instrumental cinematic minimal electronic, premium and modern, dark with one warm amber glow. A minor, 100 BPM. Deep sub bass (A1) with a soft pulse, warm felt piano and muted pluck arpeggio, airy analog pad, tight understated percussion (soft kick, light rim click, fine hi-hats). Confident, focused, elegant. Leaves space for a voice-over: sparse mid-range, nothing busy between 300 Hz and 3 kHz. Clean mix, tasteful reverb, long natural tail at the end. No vocals.

**Versão curta (limite de 200 caracteres):**

> Instrumental cinematic minimal electronic, A minor 100 BPM, deep sub bass, warm felt piano, muted pluck, airy pad, soft kick, premium, space for voice-over, no vocals

**Excluir (Exclude Styles):** vocals, lyrics, choir, EDM drop, trap hi-hat rolls, distorted guitar, 8-bit, lo-fi crackle, bright happy pop, ukulele

**Estrutura (cole em "Lyrics", só as marcas):**

```
[Instrumental]
[Intro: sparse, soft pad and sub bass only, no drums, intimate]
[Build: filtered riser, drums drop out, one beat of silence, tension]
[Drop: soft kick and deep sub enter on the downbeat, steady minimal groove]
[Verse: felt piano and muted pluck, light hats, steady, understated]
[Lift: pluck arpeggio opens up, pad widens, a little brighter]
[Build: short rising tension, drums thin out]
[Outro: sustained A minor pad rings out with long reverb tail, fade, clean ending]
```

**Como o vídeo se encaixa (para eu editar):**

| Vídeo | Música |
| --- | --- |
| 0:00–0:03 (ele fala, texto atrás dele) | intro esparsa, pad + sub |
| 0:03–0:05 (respiro de 1,6 s) | build com riser e 1 batida de silêncio, **impacto em 0:04,9** ("Às vezes") |
| 0:05–0:15 | groove estável, baixo nível (a voz manda) |
| 0:15 ("E é justamente aí") | lift: arpejo abre, pad alarga |
| 0:19–0:21 (experiência visual) | tensão curta |
| 0:21–0:23 (logo) | pad de lá menor soltando, cauda longa |

Gere **3 ou 4 variações de 30 a 60 s**; eu escolho o melhor trecho, alinho o impacto a 4,9 s, aparo para 23,3 s com cauda e deixo a música uns 18 a 20 dB abaixo da fala (com "ducking" quando ele fala).

**Variações do estilo (se a primeira não agradar):** (B, mais quente) trocar "dark with one warm amber glow" por "warm, hopeful, inspiring, gentle build"; (C, mais tenso) "dark, tense, thriller-like, low drone, slow heartbeat pulse".

