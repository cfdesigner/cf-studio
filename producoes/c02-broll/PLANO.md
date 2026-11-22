# Plano de edição: C02 com b-roll (CFDesigner)

Status: **FECHADO** (vídeo final entregue). Veja "Depois da edição" no fim.
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

## Estado (prévia montada)

- Composição `C02Broll` (`C02Broll.tsx`): cena 1 com `TextoAtras`; legendas corrigidas (`legendas.json`); frases de efeito CÂMERA MELHOR (6,3 s), TRANSFORMAR COMPLETAMENTE (12,9 s, sugestão minha) e EXPERIÊNCIA VISUAL (18,85 s); checklist vertical (cartão escuro de cantos arredondados + linha âmbar + perspectiva leve virada para o centro) das 9,0 às 12,81 s; LightLeak no corte de 15,4 s; palavra riscada em 17,1 s (com vinheta suave no topo); saída com zoom/desfoque e fecho `FechoSimples` (2,5 s).
- Áudio normalizado para -14 LUFS (`public/entrada/c02-broll-n.mp4`).
- Aguardando o dono aprovar a prévia. Se aprovar o checklist vertical, mover para o design system.

## Depois da edição (versão final)

Composição `C02Broll`, 23,3 s (20,8 s de vídeo + fecho de 2,5 s), -14,1 LUFS. O que mudou em relação ao plano inicial:

- **Cena 1:** "MUITO MAIS INTERESSANTE" atrás dele (recorte da pessoa com dois modelos, borda suave): virou o efeito `TextoAtras` do CFDesigner.
- **Checklist:** versão vertical (cartão arredondado + linha âmbar + perspectiva leve): virou `ChecklistVertical` no CFDesigner.
- **"Transformar completamente":** texto rastreado em cima do parapeito (rastreio ECC refinado + suavizado), saindo de trás da árvore (máscara por cor). Técnica em `tecnicas/texto-no-plano/`.
- **Palavra riscada:** versão B (13% do topo, 1,15x) com vinheta suave no topo.
- **"Construir uma experiência visual":** zoom de aproximação 1,4x (ponto fixo embaixo, rosto sobe) com "CONSTRUIR UMA" pequeno, "EXPERIÊNCIA" âmbar e "VISUAL" branco gelo do mesmo tamanho. `PunchLine` ganhou `depoisEscala` e `antesMax`.
- Respiro entre "interessante?" e "Às vezes" mantido (música entra ali, edição do dono).
- Vazamento de luz no corte de 15,4 s; fecho com o logo (`FechoSimples`).
- **Look Dourado Suave** (LUT `design-systems/cfdesigner/assets/luts/dourado-suave.cube`) no vídeo-base e nas camadas recortadas (pessoa, árvore); gráficos e texto sem look.
- **Som:** efeitos do dono (`som/SOM.md`, kit em `design-systems/cfdesigner/assets/sfx/`); música do Suno aguardando o arquivo.

Lições: rastreio encadeado escorrega e treme, use ECC contra a referência; modelos de recorte prontos pegam o objeto "saliente" (o parapeito, não a árvore); legenda deve ficar por cima do recorte da pessoa; o zoom de aproximação com ponto fixo embaixo libera espaço para o texto sem cobrir o rosto.

- **Correção final (fala):** "composição" virou "percepção" na frase "você consegue transformar completamente a percepção daquela cena" (áudio regravado pelo dono e legenda). Detalhes em `som/SOM.md`.
