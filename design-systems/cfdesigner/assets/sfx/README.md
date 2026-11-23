# Efeitos sonoros do CFDesigner

Sons do próprio dono, cortados do stem só de efeitos do C01 feito à mão (`C01_SFX`), **no volume original** (já com a hierarquia que ele usou: o "grande" e o "cartao" mais altos, o "fraco" e o "icone" bem baixos). Extração: `producoes/c02-broll/som/extrair_kit.py`.

| Arquivo | Dura | Para que serve (como o dono usou no C01) |
| --- | --- | --- |
| `cartao.wav` | 0,4 s | whoosh curto de **cartão/texto entrando**; começa ~0,1 s ANTES de o elemento aparecer |
| `tick.wav` | 0,4 s | clique de **marca** (✓ ou ✗) do checklist |
| `tick_final.wav` | 0,5 s | clique da **última marca** do cartão (mais brilhante) |
| `fraco.wav` | 0,3 s | whoosh baixinho: **saída de cartão** e fade do logo |
| `icone.wav` | 0,7 s | **ícone com rótulo** entrando |
| `grande.wav` | 1,1 s | som grande: **zoom de aproximação**, logo, momento de impacto |
| `timeline_in.wav` / `timeline_out.wav` | 0,9 / 0,6 s | tela da timeline entrando e saindo |
| `relogio.wav` | 1,1 s | 12 tiques do ícone de cronômetro |
| `suave.wav` | 0,4 s | abertura, bem baixo |
| `texto.wav` | 1,65 s | **swell de texto** do dono (recorte do `SFX - Texto 1`, 1ª de 5 variações): cresce e atinge o pico em ~0,9 s. Use em contagem/frase de efeito, com o pico no instante em que o número chega ao valor final. |

Regras que se leem no C01: whoosh de cartão 0,1 s antes do elemento; clique em cada marca (o último, `tick_final`); `fraco` quando o cartão sai; `grande` no logo. Mixagem: `producoes/c02-broll/som/mixar.py`.


## Nível nas peças

Os arquivos estão no volume original do dono (picos entre −8 e −20 dBFS). Numa peça com música, **normalize cada som pelo pico** e coloque-o por volta de **−40 dBFS** (≈ 11 dB abaixo da média da música) quando o dono pedir efeitos "quase imperceptíveis"; veja `ganhoSfx` em `producoes/um-video-nasce-aqui/UmVideoNasceAqui.tsx`.


## Pedido do dono (ep. 04)

Os efeitos devem ficar **bem baixos** na mixagem (pico ~12 dB abaixo do da voz ou mais) e **sem cliques**: `tick` e `tick_final` são os mais altos do kit (picos −10,6 e −8 dBFS, médios 300–3 kHz) e foram considerados feios. Use no máximo um `tick` bem baixo; prefira `suave`, `fraco` e `timeline_in`.
