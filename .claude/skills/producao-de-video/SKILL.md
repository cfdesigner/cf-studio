---
name: producao-de-video
description: Use quando o usuário pedir para criar, montar ou editar um vídeo ou peça animada (Reels, Shorts, abertura, vinheta, vídeo com legenda). Fluxo geral de uma produção neste repositório master: escolher o design system, planejar, montar no Remotion, conferir, renderizar e entregar.
---

# Fluxo de uma produção

1. **Design system:** qual? (skill `design-systems`). Se o usuário não disse, pergunte. Leia o `README.md` e o `DESIGN-SYSTEM.md` dele.
   1b. **Material bruto?** Siga a skill `plano-de-edicao` (analisa, monta o plano, mostra e espera aprovação) antes de montar.
2. **Brief rápido** (só o que faltar): formato (vertical 1080×1920 / horizontal 1920×1080), duração, textos, imagens/logo, música. Não pergunte o que já está na ficha.
3. **Pasta da produção:** `producoes/<nome>/` com a composição. Registre em `producoes/index.tsx` (uma `<Composition>` com `id` único). Use só componentes e efeitos do design system escolhido.
4. **Vídeo com fala ou pedido de legenda:** siga a skill `legendas` (transcreve sozinho, sugere frases de efeito, espera aprovação).
4b. **Texto atrás da pessoa** (frase de efeito grande atrás da cabeça, pessoa recortada por cima): recorte com `scripts/recortar-pessoa.py` e use o `TextoAtras` do CFDesigner (`tecnicas/recorte-pessoa/README.md`, `design-systems/cfdesigner/docs/efeitos.md`). Só o trecho que precisa; mostrar o quadro ao dono.
5. **Conferir:** renderize 2–3 quadros-chave (`npx remotion still ... --frame=N`) e olhe antes de renderizar o vídeo. Teste um quadro de cada tipo de elemento (legenda, terceiro, número, fecho).
6. **Escolhas visuais novas** (não cobertas pela ficha): mostre em imagem e peça aprovação. Depois registre na ficha do design system.
7. **Renderizar e entregar:** `npx remotion render <id> out/<nome>.mp4 --browser-executable=/opt/pw-browsers/chromium` e envie o MP4 na conversa. Nunca versione o vídeo.
8. **Salvar:** commit no `main` com o código da produção (não os vídeos).

Regras do dono: `CLAUDE.md`. Se faltar algo na ficha do design system, não improvise por conta: pergunte ou proponha e aprove.
