# Carrossel do CFDesigner (Instagram 4:5, 1080×1350)

Base de identidade dos carrosséis do dono: `CarrosselClaudeCode.tsx` (e `CarrosselGeradores3.tsx`, com uma composição diferente por slide, prints e logos reais dos apps) (tema: "Claude Code para edição de vídeo", fechado pelo dono). Regras de identidade em `design-systems/cfdesigner/DESIGN-SYSTEM.md` (seção "Carrossel").

## Como fazer um carrossel novo (outro assunto)

1. **Só informação real.** Texto, artigo colado ou link que o dono mande. Nunca inventar número, cliente ou afirmação. Se o site não abrir (rede bloqueada), pedir o texto colado.
2. Copiar `CarrosselClaudeCode.tsx` para `Carrossel<Assunto>.tsx` e trocar:
   - `Textos` (título com a palavra-chave em `<Marca>`, apoio, listas), no máximo 8 slides;
   - os números fantasma e a frase da fita em `Palco` (`Ghost`, `Fita`);
   - `Quadros` (hoje: 16:9, 9:16 e 1:1) só se fizer sentido para o tema.
3. Registrar um `<Still>` em `producoes/index.tsx` (`CARROSSEL_W` × `CARROSSEL_H`, `defaultProps={{ n: 1 }}`).
4. Mostrar o **rascunho** (grade dos 8 slides) com os textos e esperar a aprovação do dono; depois exportar.
5. Exportar: `npx remotion still <Id> out/<pasta>/slide-0N.png --props='{"n":N}' --scale=2 --browser-executable=/opt/pw-browsers/chromium` (N de 1 a 8). PNGs ficam em `out/` (fora do git).

## Receita visual

Fundo branco, âmbar `#d9a441` no lugar do petróleo, texto preto, palavra-chave em marca-texto âmbar (nunca texto âmbar sobre branco). Cada slide é uma janela de 1080 px sobre uma tela contínua de 8640 px: círculos, cartões inclinados, fita e quadros **atravessam de um slide para o outro**. Logo em plaquinha preta. Fotos do dono recortadas e fotos reais; imagem gerada só com autorização (Magnific, ~65 créditos por imagem).

## Fotos do dono (`assets/`)

`eu-capa.png`, `eu-fala.png` e as poses `eu-frente`, `eu-baixo`, `eu-perfil-dir`, `eu-perfil-esq` são recortes com borda fina feitos por `scripts/recortar-foto.py` (BiRefNet + matting; veja `tecnicas/recorte-pessoa/README.md`). `foto-escritorio.jpg`, `foto-livro.jpg` e `foto-notebook.jpg` são fotos inteiras. Para fotos novas: rodar o script (`--fundo-claro` se a parede for branca/cinza) e conferir a borda no fundo branco e no âmbar.
