# tiago-lemos-01: brand book

**Essência:** vídeo de fala direta, escuro e dourado, com elementos grandes e limpos que ilustram o que é dito. Um elemento principal por vez; a legenda acompanha palavra por palavra.

> Origem: análise de um vídeo de referência (anúncio vertical, 45 s) enviado pelo dono. Cores e fontes foram **estimadas dos quadros**, não vêm de manual de marca. Se o dono tiver os arquivos oficiais (fontes, logo, paleta), troque em `tokens.ts` e `fonts.ts`.

## Cor

| Token | Valor | Uso |
| --- | --- | --- |
| `fundo` | `#0a0806` | fundo (preto quente, com brilho dourado no topo) |
| `ouro` | `#d8ab49` | palavra-chave da legenda, rótulos, ícones |
| `ouroClaro` / `ouroEscuro` | `#f3d58a` / `#9a7424` | pontas do degradê dourado (palavras e ícones grandes) |
| `branco` | `#ffffff` | títulos e legenda |
| `fio` | ouro a 45% | borda do quadro do rosto |

## Tipografia

- **Título:** Bebas Neue (condensada, alta, caixa alta). Branco, com a palavra-chave em ouro degradê (`*palavra*`).
- **Legenda:** Poppins 700, ~60 px em 1080, sem tarja, sombra suave.
- **Rótulo:** Space Mono 700, caixa alta, espaçamento largo, precedido de um ponto (`• POR ISSO EU PREPAREI`).

## Forma e enquadramento

Tela 1080×1920 dividida: gráficos em cima (y 130–890), legenda logo acima do quadro, rosto num quadro arredondado (y 975–1665) com fio dourado fino. Os ~250 px de baixo ficam livres (botões das redes). Opção `cheio`: vídeo inteiro com os elementos no alto, menores.

## Iconografia

Ícones de traço dourado (grade 24×24), que se desenham sozinhos e ganham um preenchimento leve. Lista em `components/icones.ts` (32 ícones). Para ilustrar uma ideia nova, acrescente um ícone lá.
