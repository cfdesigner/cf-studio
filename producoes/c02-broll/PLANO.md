# Plano de edição: C02 com b-roll (CFDesigner)

Status: PROPOSTA, aguardando aprovação do dono.
**Design system:** CFDesigner · **Formato:** vertical 1080×1920 · **Duração:** 20,8 s de vídeo + fecho (~1,5 s) · **Plataforma:** Reels
**Terceiro de nome:** não (dono não pediu).

## Material

| Arquivo | Duração | Formato | Avisos |
| --- | --- | --- | --- |
| 31ff9d4a-C02.mp4 (`public/entrada/c02-broll.mp4`) | 20,8 s | 1080×1920, 29,97 fps, h264 | Sem conversão necessária. -21,4 LUFS (baixo). Sem música. |

O b-roll (praia, mar, pedras, lancha) **já está dentro do vídeo**, em voz em off. Ele aparece de 3,6 s a 15,4 s.

## Linha do tempo

| # | Origem | Plano | Fala | Por cima | Entrada |
| --- | --- | --- | --- | --- | --- |
| 1 | 0,0–3,6 s | Ele sentado na mesa de pedra, falando (rosto no centro, ~35% da altura) | "Sabe quando tu olha para uma imagem e sente que ela poderia ser muito mais interessante?" | Legenda dia a dia. **Frase de efeito atrás de você: "MUITO MAIS INTERESSANTE"** (entra em ~2,3 s, some no corte de 3,6 s), você recortado do fundo (pedido do dono). Resto só legenda | início |
| 2 | 3,6–6,2 s | Praia: ele de costas, depois selfie fechada | pausa, "Às vezes, não precisa de uma câmera melhor" | Legenda. **Frase de efeito: "CÂMERA MELHOR"** (~5,8–7,0 s) | corte seco |
| 3 | 6,2–8,6 s | Mar e pedras | "nem de uma produção gigantesca" | Legenda | corte seco |
| 4 | 8,6–12,8 s | Árvore e lancha no mar | "Com algumas escolhas de direção, composição, cor, iluminação e som" | **Checklist de 5 itens** no topo, cada ✓ 0,2 s antes da palavra (9,5 / 10,2 / 11,1 / 11,4 / 12,1 s). Sem rosto na cena, área livre | corte seco |
| 5 | 12,8–15,4 s | Passarela vazia, mar e morro | "você consegue transformar completamente a composição daquela cena" | Legenda | corte seco |
| 6 | 15,4–20,8 s | Ele encostado no corrimão (rosto à esquerda, ~48% da altura) | "E é justamente aí que está a diferença entre simplesmente editar um vídeo e construir uma experiência visual" | **LightLeak âmbar** no corte de 15,4 s (vira o assunto, "E é justamente aí"). **Palavra riscada** "SIMPLESMENTE / EDITAR" (~17,1–17,9 s). **Frase de efeito: "EXPERIÊNCIA VISUAL"** (~19,2–20,1 s) | corte + LightLeak |
| 7 | fecho | Fundo escuro, logo CFDesigner | | Fecho discreto com logo (~1,5 s), zoom/desfoque leve | fade 250 ms |

Rosto: nas cenas 1 e 6 as caixas ficam no topo ou na lateral livre, nunca sobre o rosto. As legendas ficam acima dos 24% de baixo.

## Legendas e destaques

- Transcrição conferida pelo dono: **não ainda**. O Whisper entendeu "Sabe quanto olha ... imagem em sede" (o trecho certo é "Sabe quando tu olha ... imagem e sente que ela"); "cena." e "E" têm baixa confiança. Corrijo antes de renderizar.
- Frases de efeito candidatas: **CÂMERA MELHOR** e **EXPERIÊNCIA VISUAL**. Opcional: "TRANSFORMAR" (13,0 s).
- Números a destacar: nenhum.

## Áudio

-21,4 LUFS, pico -3,7 dBTP. Proposta: normalizar para -14 LUFS. Sem música. Silêncio no fim é só respiro de 0,5 s.

## Decisões a aprovar

1. O respiro de 1,6 s entre "interessante?" e "Às vezes" (3,3–4,9 s): encurtar para ~0,7 s (corta ~0,9 s) ou manter?
2. Frases de efeito: CÂMERA MELHOR e EXPERIÊNCIA VISUAL, ou outras / mais uma?
3. Checklist com os 5 itens (direção, composição, cor, iluminação, som) no topo durante o b-roll da árvore: ok?
4. Normalizar o volume para -14 LUFS?
5. Fecho com logo de ~1,5 s no final: ok?

## Riscos

- Cena 1: rosto pequeno e centralizado, o gráfico não entra. Por isso o gancho fica só com legenda.
- Cortes 8,61/8,64 e 12,81/12,85 aparecem duplos na análise, é o mesmo corte (conferido na folha de contato).
- Já existe `producoes/c02-legendas` (versão anterior, 19,5 s, só com legendas). Esta é outra montagem, por isso a pasta nova `c02-broll`.

## Decisões do dono (sessão 1)

- Respiro de 1,6 s entre "interessante?" e "Às vezes": **manter** (ele vai subir a música ali, impacto).
- Frase de efeito "CÂMERA MELHOR": aprovada. Outras frases de impacto: o dono indica se quiser.
- Cena 1: "MUITO MAIS INTERESSANTE" atrás dele (aprovado, já no design system como `TextoAtras`). A frase inicial "Sabe quando tu olha…" vai só como legenda.
- Checklist: fazer versão **vertical** (b-roll é vertical); rascunho em `ChecklistVertical.tsx`, aguardando escolha A (cartão) ou B (painel). Se ficar bom, vai para o design system.
- Volume: normalizar para -14 LUFS (testar; se não ficar bom, voltar).
- Fecho com o logo, como nas outras produções (`FechoSimples`).
