# Plano de edição: Episódio 04 "Mesma cena" (CFDesigner)

Status: **aguardando aprovação do storyboard** (`storyboard.html`, publicado como Artifact). Não montar antes.
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
| 1 | 0–2 s | Gancho | quadro do resultado (aprox. 24,5 s), já com o look Âmbar Cinema | "MESMA CENA" (Bebas, "CENA" em âmbar), a meio caminho entre o personagem e o alto do quadro (topo ≈ 410 px) | `grande` + `cartao` |
| 2 | 2–6 s | Bruto | contínuo 20–24 s, em visual cinza (simulação de log: contraste e cor reduzidos) | selo "ORIGINAL" | só ambiente |
| 3 | 6–11 s | + Ritmo (ainda bruto) | 4 trechos de 18–30 s, cortes a cada 1,2 s (2 tempos a 100 BPM); aberto e aproximação ≤ 1,35x | etiqueta RITMO mais alta, entre o personagem e as folhas | `fraco` 0,15 s antes de cada corte |
| 4 | 11–16 s | + Cor | clarão e virada para a imagem real com o look por cima | etiqueta COR (mesma altura da RITMO); clarão curto na troca | `icone` |
| 5 | 16–21 s | + Som | mesma montagem | `LinhasDeSom` (novo, semitransparente, entre o personagem e as folhas, topo ≈ 470 px): VOZ, AMBIENTE, WHOOSH, IMPACTO, TIQUE | ambiente mais presente, `fraco` nos cortes, `grande` quando os braços sobem, `tick`/`tick_final` nas marcas |
| 6 | 21–24 s | Resultado | último plano (você se afastando, ~28–30,7 s) com tudo | "QUAL MUDOU MAIS?" no mesmo estilo do gancho, no alto, entre o personagem e as folhas | `grande` suave |
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
