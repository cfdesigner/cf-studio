# Episódio 06: "Do básico ao 4K" (CFDesigner) — rascunho de roteiro (momentum)

Status: **tema escolhido pelo dono em 26/11/2026** (IA, com o lobo-urso guerreiro). Falta material e aprovação. Nada montado.
**Design system:** CFDesigner · 1080×1920 (entrega em 4K, veja abaixo) · 30 fps · ~25 s · Reels
**Função:** mostrar processo e qualidade: a mesma criatura em 3 níveis de IA, até a finalização no Topaz. Autoridade em IA para vídeo.
O tema antigo ("Um corte errado pode acabar com uma boa cena") vira o **ep. 07**.

## Material que já existe (achei no Magnific do dono, projeto `bdbc3c28…`)

- 3 vídeos do **"bear-wolf hybrid warlord"** (guerreiro lobo-urso, `@warlord`) no templo em ruínas (`@temple`): rugido em close (`8aRfPQCIrU`, `KLds9Hxkqp`) e a investida até o close (`5jeLR7rKxe`), 9:16, câmera na mão, ~5 s, com prompts completos.
- As imagens-base do personagem e do cenário (`@warlord`, `@temple`) estão no mesmo projeto.
- **Não sei qual versão é a "básica", qual é a "top" e qual passou no Topaz.** O dono precisa apontar (veja "O que preciso").

## A ideia

A mesma cena do rugido em **três níveis**, lado a lado e em sequência, mostrando que o que muda não é a ideia, é o processo:
1. **Básico:** imagem simples + animação simples.
2. **Top:** o prompt completo, com referências (`@warlord`, `@temple`), no modelo mais forte (Seedance).
3. **Finalização:** o mesmo clipe passado pelo **Topaz**, em 4K.

## Mapa de momentum

- **Promessa:** "Mesma criatura. Três níveis de IA. O último muda tudo"
- **Gancho visual:** close do rugido (dentes, saliva, olho) com **cortina que alterna básico e final no mesmo quadro**. O pico de impacto já nos 3 primeiros segundos.
- **Laço aberto:** "o terceiro nível eu só mostro no fim" (o antes e depois em zoom 100%).
- **Quebras de padrão:** zoom em detalhes (dente, saliva, pelo), contador de resolução (720 → 1080 → 4K) discreto, troca de nível com a varredura âmbar.
- **Pedido único:** "qual nível você acha que é o do meio?" (comentário) ou "salva para quando for gerar".
- **Maratona:** gancho para o ep. 07 ("um corte errado pode acabar com uma boa cena").
- **Medir depois:** retenção aos 3 s, tempo médio, salvamentos e envios.

## Linha do tempo (rascunho)

| Tempo (s) | Botão | Etapa | Imagem | Por cima (pequeno, sem ponto final) | Fala |
| --- | --- | --- | --- | --- | --- |
| 0 a 3 | 1 | **Gancho** | Rugido em close, metade esquerda básica e metade direita final, linha âmbar dividindo | "MESMA CRIATURA" no alto | "Mesma criatura. Três níveis de IA. O último muda tudo" |
| 3 a 7 | 2 | Nível 1 | Clipe básico em tela cheia | "NÍVEL 1 · BÁSICO" | "Primeiro, o básico: uma imagem simples e uma animação simples" |
| 7 a 12 | 2 | Nível 2 | Clipe com prompt completo e referências | "NÍVEL 2 · SEEDANCE" | "Segundo, prompt completo, referência do personagem e do cenário" |
| 12 a 16 | 2 | **Pistas** | Zooms em dente, saliva, pelo no nível 2; ele fala | "OLHA OS DENTES" | "Olha a saliva, o pelo. Já é outro nível. Mas ainda não acabou" |
| 16 a 22 | 3 | **Nível 3** | Cortina sobre o mesmo quadro: sem Topaz e com Topaz em 4K, zoom 100% no olho e nos dentes | "NÍVEL 3 · TOPAZ 4K" | "Terceiro, finalização no Topaz. Mesmo clipe. Olha o detalhe" |
| 22 a 25 | 3 | Tese + próximo | Volta ao rugido final | "A IA GERA. VOCÊ FINALIZA" e, pequeno, "PRÓXIMO: O CORTE QUE ESTRAGA A CENA" | "A IA gera, você finaliza. No próximo, o corte que estraga uma boa cena" |
| 25 a 26,5 | | Fecho | `FundoCF` + logo | | |

O dono pode aparecer no começo ou no fim (como no ep. 05), se quiser; isso ainda não está decidido.

## Sobre o 4K (resposta ao dono)

- **Entregar em 4K eu consigo:** o Remotion renderiza em 2160×3840 (escala 2, H.264, CRF 8), como já foi feito no `video-upscale-4k`. O arquivo fica grande (~120 MB para 24 s), por isso o anexo no chat pode comprimir ou recusar.
- **Detalhe real só vem do upscale:** renderizar em 4K um clipe de 1080p não inventa detalhe. O nível 3 precisa de um clipe **já passado no Topaz** (4K de verdade). No Magnific existe o `video_upscale` com os modelos do Topaz (Astra 2, Starlight, Proteus, etc.); é pago, então **só rodo se o dono pedir, com o custo mostrado antes**.
- **Por que "perdeu a qualidade" antes:** quase sempre é a compressão do anexo no chat ou do Instagram (que reduz a 1080 e recomprime). Para a demonstração, o melhor é **zoom 100% em recortes** (olho, dentes): a diferença aparece mesmo depois da compressão. Entrega do MP4 final: eu salvo em 4K e você pega por arquivo (não pelo chat), ou eu envio um recorte menor para aprovação e o 4K fica no repositório local fora do git (regra: vídeos não são versionados).

## O que preciso do dono

1. **Qual clipe é o básico, qual é o Seedance e qual passou no Topaz?** (IDs ou os arquivos). Se não existir o básico ou o Topaz, aviso o que falta gerar.
2. O clipe do **Topaz em 4K** (arquivo original, sem recompressão).
3. Aprovar o tema, a ordem dos níveis e as falas.
4. Se quer aparecer no vídeo.

## Regras que valem

Sem inventar números de resolução ou custo; sem IA paga sem pedido; efeitos sonoros baixos e sem clique (o dono faz o som, como no 04 e no 05); storyboard e aprovação antes de montar.
