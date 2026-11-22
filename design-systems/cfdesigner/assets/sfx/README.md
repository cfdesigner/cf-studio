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

Regras que se leem no C01: whoosh de cartão 0,1 s antes do elemento; clique em cada marca (o último, `tick_final`); `fraco` quando o cartão sai; `grande` no logo. Mixagem: `producoes/c02-broll/som/mixar.py`.
