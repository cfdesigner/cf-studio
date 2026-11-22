# Texto preso a um plano do vídeo (rastreio) e atrás de objetos

Técnica **sem marca** (aprovada pelo dono no C02: "TRANSFORMAR COMPLETAMENTE" em cima do parapeito, saindo de trás da árvore). Serve para texto ou gráfico que deve parecer parte da cena: preso a uma parede, parapeito, mesa, tela, com objetos à frente (árvore, poste, pessoa). Grátis, só CPU.

Código de referência: `producoes/c02-broll/TextoNoPlano.tsx`. Ferramentas: `scripts/rastrear-plano.py`, `scripts/mascara-arvore.py` (objeto à frente por cor) e `scripts/recortar-pessoa.py` (pessoa à frente; veja `tecnicas/recorte-pessoa/`).

## Preparar (uma vez por container)

```bash
python3 -m venv /opt/recorte-venv && /opt/recorte-venv/bin/pip install -r scripts/requirements-recorte.txt opencv-python-headless
```

## Passo a passo

1. **Extrair os quadros do trecho** (30 fps, 1080×1920, `001.png`...): `ffmpeg -ss <início> -t <duração> -i <video> -vf fps=30 <pasta>/%03d.png`. O quadro `n` é o instante `início + (n-1)/30`.
2. **Escolher o quadro de referência** (onde o plano aparece inteiro e nítido) e marcar 4 cantos do plano de texto (TL, TR, BR, BL) **olhando o quadro com uma grade** de coordenadas. Em perspectiva: os lados mais distantes são menores (use a convergência dos trilhos). Para texto "em cima" de algo, a borda de baixo do plano fica na borda de cima do objeto.
3. **Rastrear:**
   ```bash
   /opt/recorte-venv/bin/python scripts/rastrear-plano.py <quadros> <ref> producoes/<nome>/trilha.json \
     --quad x1,y1,...,x4,y4 --regiao <polígono só com a estrutura do plano> --largura 1000 --altura <H> \
     --refinar --janela <de>,<ate> --suavizar 1.5
   ```
   Leva uns 5 min. `--refinar` alinha cada quadro com o de referência (ECC sub-pixel, só na madeira/estrutura do plano; `--madeira` ajusta a cor); **sem isso o rastreio encadeado escorrega e treme**. `--suavizar 1.5` tira o ruído restante.
   **Confira** desenhando o quadrilátero sobre 6 a 8 quadros (a borda de baixo tem que ficar presa no objeto até o fim). A `--regiao` deve ter só o plano: árvore ou gente dentro dela puxa o rastreio.
4. **Objeto à frente (opcional):** `python scripts/mascara-arvore.py <quadros> trilha.json public/entrada/<pasta>` gera PNGs com só o objeto opaco, só acima da linha de baixo do plano. Por cor funciona quando o fundo é claro e azulado e o objeto é escuro/amarelado (ajuste os limiares no topo do script). Para pessoa, use o recorte de pessoa. **Modelos de recorte prontos (rembg) pegam o objeto "saliente"** (no C02 pegaram o parapeito, não a árvore): confira antes.
5. **No Remotion:** um `<div>` do tamanho do retângulo (`--largura` × `--altura`), `transform-origin: 0 0` e `transform: matrix3d(...)` com a matriz do quadro; por cima dele, a imagem do objeto à frente (mesmo número do quadro). Texto entrando "por trás" do objeto: deslize o texto pelo plano (translate no próprio retângulo) enquanto o objeto à frente o esconde.

## Limites

- Só vale enquanto o plano continua visível e a câmera não gira demais (no C02, 2,5 s de parapeito). Fora da `--janela` o rastreio volta ao encadeado, que escorrega.
- Plano de verdade (parede, parapeito, tela). Objeto curvo ou pessoa em movimento não rastreia com isso.
- Parallax: o objeto à frente se move diferente do plano; a máscara é por quadro, por isso funciona.
- Os PNGs (quadros e máscaras) ficam em `public/entrada/` (ignorada pelo Git).
