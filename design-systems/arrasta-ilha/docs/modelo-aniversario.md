# Modelo de aniversário e homenagem

Peça reutilizável de feed 4:5 (1080x1350) e stories 9:16 (1080x1920). Nasceu do post "22/11 Parabéns Regente Karen". Componente `ModeloAniversario` em `components/Aplicacao.tsx`.

## Campos

| campo | o que é | exemplo |
| --- | --- | --- |
| `saudacao` | abertura em pincel | `parabéns`, `feliz aniversário`, `homenagem` |
| `titulo` | 1ª linha, vinho | `Regente`, `Mestre convidado` |
| `nome` | 2ª linha, laranja | `Karen` |
| `data` | etiqueta verde | `22 de novembro` |
| `mensagem` | uma ou duas frases curtas | `A Família Arrasta Ilha lhe deseja um vendaval de axé para o novo ciclo!` |
| `foto` | caminho em `public/` ou URL; vazio mostra "FOTO" | `entrada/arrasta/karen.jpg` |
| `enquadramento` | posição da foto no retângulo | `50% 30%` (mais para cima), `50% 50%` |

Os dois títulos encolhem sozinhos para caber na largura. Nome com mais de uns 14 caracteres fica pequeno: prefira só o primeiro nome. A distância entre as duas linhas é fixa (cerca de 20 px no feed e 24 px nos stories), aprovada pelo dono.

## Como gerar

Foto: coloque o arquivo em `public/entrada/arrasta/` (pasta ignorada pelo Git, para não versionar fotos de pessoas).

```bash
npx remotion still ArrastaIlha-Modelo-Aniversario out/aniversario-feed.png --scale=2.5 --image-format=png --browser-executable=/opt/pw-browsers/chromium --props='{"titulo":"Mestre","nome":"Fulano","data":"03 de março","mensagem":"A Família Arrasta Ilha celebra a sua vida.","foto":"entrada/arrasta/fulano.jpg"}'
```

```bash
npx remotion still ArrastaIlha-Modelo-Aniversario-Stories out/aniversario-stories.png --scale=2.5 --image-format=png --browser-executable=/opt/pw-browsers/chromium --props='{"titulo":"Mestre","nome":"Fulano","data":"03 de março","mensagem":"A Família Arrasta Ilha celebra a sua vida.","foto":"entrada/arrasta/fulano.jpg"}'
```

O exemplo aprovado (Karen) é `ArrastaIlha-Aplicacao-Aniversario` (e `-Stories`).

## Regras

- Foto de pessoa só com autorização dela e do grupo; rosto livre (nenhum texto ou grafismo por cima).
- Foto em boa resolução (pelo menos 1100 px de largura); a do exemplo é de baixa resolução.
- Mensagem sem ponto final solto em legenda de vídeo; no post, frase completa como o grupo escreve.
- Sem quadro branco atrás da foto: o bloco azul deslocado é a moldura.
