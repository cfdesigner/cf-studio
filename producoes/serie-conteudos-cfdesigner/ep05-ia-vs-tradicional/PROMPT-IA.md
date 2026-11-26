# Prompt do clipe de IA do episódio 05

Regra do repositório: **eu não gero imagem nem vídeo** (nenhuma ferramenta paga). Este arquivo é só o prompt. O dono gera na ferramenta e com o custo que preferir, e manda o MP4.

## Especificações

| Item | Valor |
| --- | --- |
| Formato | vertical 9:16 (1080×1920 ou o máximo da ferramenta) |
| Duração | 6 a 8 s (a edição usa 6 s) |
| Câmera | **parada** (locked off), plano aberto, sem zoom |
| Velocidade | tempo real (24 a 30 fps), sem câmera lenta |
| Áudio | não precisa (o dono faz o som); sem música |
| Onde entra | **cena 2** (8,4 a 14,4 s), e de novo lado a lado e na revelação |
| Imagem de referência | `referencia-cena-real.jpg` (quadro da cena real, 1080×1920) |

O ideal é gerar **2 a 3 versões** e escolher a mais convincente.

> **v2 do roteiro:** a virada do homem tem que acontecer **por volta dos 2 s**, igual à cena real, para a tela dividida ficar sincronizada. Se a ferramenta errar o tempo, eu ajusto o início do clipe na edição (sem esticar).

## Modo A: com a imagem de referência (recomendado)

Cole na ferramenta de vídeo (o formato abaixo é o da Seedance 2.0; em outras ferramentas, use `image-to-video` com a mesma foto e o texto da SHOT 1):

```
@image1: A man standing barefoot on top of a large rounded sandstone boulder at the edge of the sea. He wears a dark baseball cap, a dark long-sleeve zip hoodie with a red collar at the neck, and dark patterned athletic shorts. Relaxed, contemplative posture, one hand resting on his hip. Behind him: calm turquoise water, a distant hazy mountain ridge, a bright blue sky with large soft white cumulus clouds. Foreground: wet reflective sand mirroring the sky, dark green tree leaves framing the top edge of the image, a warm orange boulder on the left edge.

SFX & ENVIRONMENT: midday beach, bright natural sunlight, light breeze, small gentle waves, the look of a real vertical smartphone video on a tripod.

SHOT 1: Locked-off wide shot, vertical 9:16
@image1 stands in profile facing left, hand on his hip, looking out at the sea. After about two seconds he slowly turns his whole body to face away from the camera, then stands still with his arms relaxed at his sides, breathing naturally. Static camera, locked off, zero camera movement, real-time speed (24fps), deep depth of field with everything sharp, framing identical to @image1. Only subtle natural motion: jacket fabric in the breeze, leaves trembling, small waves on the sand.
SFX: soft waves lapping on the rock, light wind, distant seagulls. No Music.
```

**Evite (se a ferramenta tiver campo de negativos):** camera movement, zoom, slow motion, extra people, text, watermark, logo, cartoon or 3D-render look, oversaturated HDR glow, lens flare, warped face or hands, extra limbs, drifting or sliding feet, changing clothes.

## Modo B: sem imagem de referência (só texto)

```
VISUAL STYLE: Photorealistic vertical smartphone footage on a tripod, natural midday light, shot looks real and unretouched.

SUBJECT: A man in a dark baseball cap, dark long-sleeve zip hoodie with a red collar and dark patterned shorts, barefoot, standing on a large rounded sandstone boulder by the sea.

ENVIRONMENT: Tropical beach at midday, calm turquoise water, a distant hazy mountain ridge, bright blue sky with large soft cumulus clouds, wet reflective sand in the foreground, dark green leaves framing the top of the image, a warm orange boulder on the left edge.

EMOTIONAL TARGET: Calm and contemplative.

COLOR LOGIC: Natural saturated colors, unretouched (the editor will add the color grade later).

TIMELINE:
00:00.0–00:02.0: He stands in profile facing left, hand on his hip, looking at the sea. Static locked-off wide camera. SFX: soft waves, light wind.
00:02.0–00:06.0: He slowly turns his whole body to face away from the camera and stands still, arms relaxed, breathing. Camera stays locked off. SFX: waves lapping, distant gulls. No Music.
```

## Nota do diretor

- **Momento principal:** o giro lento de perfil para as costas (é o que deixa a IA mais próxima do real; o corpo e os pés é que costumam denunciar).
- **Gere primeiro:** o Modo A com a foto de referência. Ele mantém roupa, rocha e céu.
- **O que olhar na saída:** pés estáveis sobre a rocha (sem deslizar), mãos sem deformar, sombra coerente com o sol, água sem "derreter".
- **Se falhar:** troque o giro de corpo inteiro por um giro só da cabeça e do tronco, ou deixe ele parado de costas, sem giro.
- **Dica:** se a ferramenta tiver "camera locked/static" como opção, ligue; evita o zoom lento que muitas IAs inventam.
