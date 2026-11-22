# Recorte da pessoa (texto atrás da pessoa)

Técnica **sem marca**: separa a pessoa do fundo, para qualquer design system colocar texto ou gráfico **atrás** dela. Grátis, só CPU, roda no container (nada de ferramenta paga, nada de Magnific).

## Fluxo

1. **Preparar o ambiente (uma vez por container, ~2 min):**
   ```bash
   python3 -m venv /opt/recorte-venv && /opt/recorte-venv/bin/pip install -r scripts/requirements-recorte.txt
   ```
   Os modelos (`u2net_human_seg`, `isnet-general-use`, ~180 MB cada) baixam na primeira execução.
2. **Recortar só o trecho que precisa** (≈ 1 s de CPU por modelo por quadro; 3,6 s de vídeo levaram poucos minutos):
   ```bash
   /opt/recorte-venv/bin/python scripts/recortar-pessoa.py public/entrada/<video>.mp4 public/entrada/pessoa-<nome> --inicio 0 --duracao 3.6
   ```
   Saída: `001.png`, `002.png`... (30 fps, com transparência). Fica em `public/entrada/` (ignorada pelo Git, ~2,6 MB por quadro).
3. **Montar no Remotion** com o efeito do design system (CFDesigner: `TextoAtras`, veja `design-systems/cfdesigner/docs/efeitos.md`). O efeito desenha: vídeo (sua camada) → texto → pessoa recortada por cima.

## O que está na receita (aprovada pelo dono no C02)

- Dois modelos misturados (média das máscaras): bordas mais estáveis que um só.
- Suavização no tempo (média ponderada de 3 quadros) para a borda não piscar.
- Borda firmada, recuada 1 px (tira o halo do fundo) e desfocada ~2,6 px (`--borda`): fica macia, sem aspecto "recortado com tesoura".

## Limites conhecidos

- Pernas, mãos soltas e objetos que a pessoa segura podem falhar; serve bem para **cabeça e tronco**. Por isso o texto atrás deve ficar da cabeça para cima.
- Se alguma borda piscar no quadro, olhar o recorte com um fundo de cor (ex.: magenta) antes de montar.
- Cada quadro é um PNG grande: recorte só o trecho necessário (1 a 4 s).
- Outro fundo muito parecido com a pele ou a roupa pode confundir o modelo: confira 2 a 3 quadros.
