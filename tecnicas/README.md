# Técnicas gerais

Só o que **não tem cara de marca** e serve a qualquer design system.

- `legendas/texto.ts`: lógica de TEXTO e TEMPO das legendas (tipos, agrupar palavras, tirar ponto final, sugerir frases de efeito). Ajudantes opcionais: cada design system decide como desenhar e animar.
- `recorte-pessoa/`: separa a pessoa do fundo (grátis, CPU) para colocar texto ou gráfico ATRÁS dela. Ferramenta: `scripts/recortar-pessoa.py`. O visual (como o texto entra) é de cada design system (CFDesigner: `TextoAtras`).
- Transcrição (Whisper) e ferramentas de linha de comando ficam em `scripts/`.

Regra: se tem cor, fonte, animação ou qualquer escolha visual, **não é geral**: pertence a um design system.
