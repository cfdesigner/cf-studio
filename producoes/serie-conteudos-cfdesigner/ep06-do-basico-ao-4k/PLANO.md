# Episódio 06: "Da argila ao 4K" (CFDesigner) — rascunho de roteiro v2 (momentum)

Status: **tema escolhido pelo dono em 26/11/2026** (IA, com o lobo-urso guerreiro). Falta material e aprovação. Nada montado.
**Design system:** CFDesigner · 1080×1920 (entrega em 4K, veja abaixo) · 30 fps · ~25 s · Reels
**Função:** mostrar o processo de construção do personagem (skill de personagem hiper-realista) e o ganho do upscale. Autoridade em IA para vídeo.
O tema antigo ("Um corte errado pode acabar com uma boa cena") vira o **ep. 07**.

## Material recebido (26/11/2026)

O personagem se chama **Grumvald** (guerreiro lobo-urso). Chegaram:
- `referencias/grumvald-argila.webp`: o **busto de argila** (base, nível "zero").
- `referencias/grumvald-foto.webp`: o personagem **hiper-realista** (foto chata, fundo cinza).
- `Redes-Grumvald-01.mp4`: versão para redes, 1080×1920, 24 fps, **5,04 s**, H.264 ~30 Mbps, com o título "WORKFLOW: HYPER-REALISTIC-SKILL / SEEDANCE 2.5". Vem do vídeo que o dono já fez em outra sessão.
- `Render-Grumvald-01_1_prob4.mov`: o **master limpo**, ProRes 422 10 bits, 1080×1920, 24 fps, 5,04 s, 166 MB (sem texto). Está no container desta sessão (`/mnt/user-data/uploads/…`); **não vai para o git** (regra: vídeos não são versionados).
- Os clipes e prompts do Magnific (`bear-wolf hybrid warlord`, projeto `bdbc3c28…`).

**Resolução real hoje: 1080×1920.** O 4K ainda não existe: o clipe do Topaz precisa ser gerado.

Cena do clipe: o Grumvald em close, olhando para a esquerda, **abre a boca e ruge** (dentes, presas e saliva) e depois fecha com um rosnado; cenário de templo em ruínas com montanha e nuvens ao fundo.

## Faltam (para o dono apontar ou gerar; posso buscar no Magnific dele, só leitura)

1. **Texturas reais** usadas no Grumvald (as fotos do mapa de texturas) e o **cenário do templo** (`@temple`) com ele no lugar.
2. **Upscale Topaz 4K** do `Render-Grumvald-01…mov` (no computador dele, ou no Magnific com custo mostrado antes).

## A ideia (v2, pedido do dono em 26/11/2026)

Em vez de comparar níveis, o episódio conta **de forma bem superficial** o processo de construir o Grumvald com a skill de personagem hiper-realista, e termina no **antes e depois do upscale** (Topaz 4K):

**argila → texturas → personagem hiper-realista → cenário → vídeo (Seedance 2.5) → upscale 4K**

A mensagem: "dá para construir um personagem do zero, texturizar, colocar numa cena, animar, e **ainda ficar muito melhor com o upscale**". Sem tutorial passo a passo, sem prompts na tela: só mostrar o caminho.

## Mapa de momentum

- **Promessa:** "Isso aqui começou como uma bola de argila"
- **Gancho visual (resultado primeiro):** o rugido do Grumvald em close, já finalizado, nos 3 primeiros segundos. Corta para a argila.
- **Laço aberto:** "e o último passo muda tudo" (o upscale só aparece no fim).
- **Quebras de padrão:** cada etapa entra por varredura âmbar, ~2 s cada, com um número discreto (1 a 6); zoom em detalhe no fim.
- **Pedido único (escolher):** "comenta GRUMVALD" para receber a explicação do processo, ou "salva para quando for criar o seu". O dono decide.
- **Maratona:** gancho para o ep. 07 (o corte errado).
- **Medir depois:** retenção aos 3 s, tempo médio, salvamentos, comentários.

## Linha do tempo (rascunho, ~25 s)

| Tempo (s) | Botão | Etapa | Imagem | Por cima (pequeno, sem ponto final) | Fala |
| --- | --- | --- | --- | --- | --- |
| 0 a 3 | 1 | **Gancho** | O rugido do Grumvald em close (clipe final) | | "Isso aqui começou como uma bola de argila" |
| 3 a 5 | 2 | 1 · Argila | Busto de argila (`grumvald-argila.webp`), com leve `PushIn` | "1 · ARGILA" | "Primeiro, a base em argila" |
| 5 a 7 | 2 | 2 · Texturas | Detalhe de pelo, pano e miçangas (das texturas reais que ele usou) | "2 · TEXTURAS" | "Depois, texturas reais" |
| 7 a 9,5 | 2 | 3 · Personagem | A foto hiper-realista (`grumvald-foto.webp`) | "3 · PERSONAGEM" | "Aí ele ganha vida" |
| 9,5 a 12 | 2 | 4 · Cenário | O templo em ruínas com ele no lugar | "4 · CENÁRIO" | "Coloco ele numa cena" |
| 12 a 16 | 2 | 5 · Vídeo | O rugido sem upscale (master 1080p), com zoom em dentes e saliva | "5 · VÍDEO · SEEDANCE 2.5" | "E animo. Já está bom, mas dá para ir além" |
| 16 a 22 | 3 | **6 · Upscale** | Cortina sobre o mesmo quadro: sem upscale e com Topaz 4K, zoom 100% no olho e nos dentes | "6 · UPSCALE · TOPAZ 4K" | "O último passo: upscale. Olha a diferença" |
| 22 a 25 | 3 | Tese + próximo | Volta ao rugido final | "CONSTRUA. TEXTURIZE. FINALIZE" e, pequeno, "PRÓXIMO: O CORTE QUE ESTRAGA A CENA" | "Dá para construir do zero e ainda finalizar em 4K. No próximo, o corte que estraga uma boa cena" |
| 25 a 26,5 | | Fecho | `FundoCF` + logo | | |

O dono pode aparecer no começo ou no fim, se quiser (ainda não decidido). Ritmo: ~50 palavras em ~25 s.

## Sobre o 4K (resposta ao dono)

- **Entregar em 4K eu consigo:** o Remotion renderiza em 2160×3840 (escala 2, H.264, CRF 8), como já foi feito no `video-upscale-4k`. O arquivo fica grande (~120 MB para 24 s), por isso o anexo no chat pode comprimir ou recusar.
- **Detalhe real só vem do upscale:** renderizar em 4K um clipe de 1080p não inventa detalhe. O nível 3 precisa de um clipe **já passado no Topaz** (4K de verdade). No Magnific existe o `video_upscale` com os modelos do Topaz (Astra 2, Starlight, Proteus, etc.); é pago, então **só rodo se o dono pedir, com o custo mostrado antes**.
- **Por que "perdeu a qualidade" antes:** quase sempre é a compressão do anexo no chat ou do Instagram (que reduz a 1080 e recomprime). Para a demonstração, o melhor é **zoom 100% em recortes** (olho, dentes): a diferença aparece mesmo depois da compressão. Entrega do MP4 final: eu salvo em 4K e você pega por arquivo (não pelo chat), ou eu envio um recorte menor para aprovação e o 4K fica no repositório local fora do git (regra: vídeos não são versionados).

## O que preciso do dono

1. Aprovar o fluxo (argila, texturas, personagem, cenário, vídeo, upscale) e as falas.
2. Escolher o pedido final: "comenta GRUMVALD" ou "salva para criar o seu".
3. Mandar (ou autorizar buscar no Magnific) as texturas e o cenário; gerar o upscale.
4. Dizer se quer aparecer no vídeo.

## Regras que valem

Sem inventar números de resolução ou custo; sem IA paga sem pedido; efeitos sonoros baixos e sem clique (o dono faz o som, como no 04 e no 05); storyboard e aprovação antes de montar.
