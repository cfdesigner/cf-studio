# LUTs do CFDesigner

- `dourado-suave.cube` (33³): look aprovado pelo dono no C02. Filme analógico suave: pouco contraste, preto levantado, luz creme e cor quente.
- Gerar outros looks (Âmbar Cinema, Noir Premium, ou novos): `python3 scripts/gerar-luts.py <pasta>` (receitas no topo do script).
- Aplicar no vídeo-base: `ffmpeg -i in.mp4 -vf "lut3d=file=dourado-suave.cube:interp=tetrahedral" -c:v libx264 -crf 16 -pix_fmt yuv420p -c:a copy out.mp4`.
- **Camadas com transparência** (recorte da pessoa, máscara da árvore) precisam do MESMO look no RGB, preservando o alfa: `ffmpeg -i %03d.png -filter_complex "[0:v]format=rgba,split[a][b];[a]format=rgb24,lut3d=file=...cube:interp=tetrahedral[c];[b]alphaextract[d];[c][d]alphamerge" %03d.png`.
- Gráficos, texto e logo ficam SEM o look (cores da marca). Aplique o look só no vídeo-base e nas camadas recortadas dele.
