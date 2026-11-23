---
name: auditoria-de-marca
description: Use SEMPRE que o dono falar de um cliente (ou dele mesmo) e mencionar site, Instagram, manual de identidade, apresentação, materiais ou qualquer coisa que a pessoa/empresa tenha, ou pedir auditoria, diagnóstico, plano de conteúdo, campanha, posts, vídeos ou apresentação para uma marca. Junta o que o cliente tiver numa base de conhecimento (perfil, voz, pilares), audita o material e produz o que o cliente pediu (design para Instagram, vídeos, apresentação, plano de conteúdo).
---

# Auditoria de marca → base de conhecimento → produção

**Ideia:** o que o cliente tiver (pouco ou muito) vira uma **base de conhecimento** dele. Em cima dela, produzimos o que ele pediu. A auditoria não é o fim, é o subsídio. Serve para pessoa física, empresa, e para o próprio dono (portfólio e propostas dele).

Inspirada (ideias, não cópia) em skills MIT: `social-media-skills/skills` (brand-profile, voice-builder, content-pillars) e `charlie947/social-media-skills` (about-me/voice). Adaptada às regras do `CLAUDE.md`.

## Regras

- **Nunca inventar.** Dado que não veio do material ou do dono fica `não informado` ou `hipótese (confirmar)`. Nada de números, clientes, prêmios ou depoimentos inventados.
- **Citar a fonte** de cada achado (site, página, post, slide). Confiança: alta (visto), média (inferido), baixa (hipótese).
- **Falar com o dono, não com o cliente.** O dono decide; a skill rascunha. Mostrar e esperar aprovação (diagnóstico, plano, frases de efeito, escolhas de estilo) antes de produzir em definitivo.
- **Nada publicado, enviado ou gasto sem ordem.** Sem IA paga (Magnific etc.): prompt para o dono gerar, conforme o `CLAUDE.md`.
- Sem travessão em textos que o cliente vai ler; sem ponto final em legendas; limpo e premium.
- Dados sensíveis do cliente ficam em `clientes/<slug>/` (material bruto em `entrada/`, ignorado pelo Git). Não colocar em serviço externo.

## Fluxo

### 1. Entrada: o que o cliente tem?

Pergunte só o que faltar, em lote curto: nome, quem é (pessoa ou empresa), **o que ele pediu** (veja passo 5; pode ser indefinido), e o que há de material: site, redes (@), manual de identidade, apresentações, logos, fotos, vídeos, textos e falas, concorrentes que admira. **Material parcial é normal**: audite o que houver e liste o que falta.

Crie `clientes/<slug>/` copiando `clientes/_modelo/`. Coloque arquivos em `clientes/<slug>/entrada/`.

### 2. Coletar e ler o material

- **Site/links:** buscar as páginas (início, sobre, serviços/produtos, contato, blog) com o leitor de páginas; se a rede bloquear o host, avisar o dono e pedir prints/PDF.
- **PDFs, manual, apresentações:** ler o texto e **olhar as páginas como imagem** (cores, tipografia, logo, grid). Anotar cores (hex), fontes, regras de uso do logo.
- **Redes:** perfis e posts que o dono enviar (prints/links). Não dá para ver métricas sem acesso: não inventar; pedir os números ou exportação.
- **Vídeo/áudio de fala:** transcrever com a skill `whisper` (serve de amostra de voz).
- Use `design-systems`/`criar-design-system` quando a marca precisar de um design system para produzir vídeo (a partir das referências dela).

### 3. Auditar (por área, só o que há material)

Para cada área: o que existe, nota 0 a 10 (ou `não analisado`), forças, lacunas, evidência. Áreas:

1. **Negócio e oferta:** o que faz, para quem, o que vende, diferencial, provas (cases, números reais), preço/ticket se informado.
2. **Posicionamento e mensagem:** promessa, clareza em 5 segundos, ponto de vista, consistência entre canais.
3. **Identidade visual:** logo, cores, tipografia, fotos, grid, consistência entre site, redes e apresentações; acessibilidade (contraste, tamanhos).
4. **Site:** estrutura, clareza do CTA, prova social, velocidade percebida, mobile, SEO básico visível (títulos, descrições).
5. **Apresentações e materiais gráficos:** narrativa, hierarquia, excesso de texto, qualidade das imagens.
6. **Voz:** extraída de textos/falas reais (veja `modelos/voz.md`), sempre com citações; nunca por adjetivos soltos.
7. **Redes sociais:** perfil (bio, link, destaque), formatos usados, frequência, linha editorial, engajamento se houver dado, o que funciona.
8. **Concorrência e referências:** 3 a 5 nomes, o que fazem de bom, onde o cliente pode se diferenciar.
9. **Público:** quem compra/segue, dores, desejos, objeções (do material; o resto é hipótese).

### 4. Montar a base de conhecimento

Preencha, em `clientes/<slug>/`:

- `BASE.md` (a partir de `modelos/base.md`): perfil da marca (quem é, oferta, público, posicionamento, provas), identidade visual medida, **o que NÃO fazer** (palavras proibidas, alegações, temas, concorrentes), lacunas de material.
- `VOZ.md` (de `modelos/voz.md`): 5 a 7 assinaturas com citação. Com menos de 3 amostras, confiança baixa e dizer isso.
- `PILARES.md` (de `modelos/pilares.md`): 3 a 5 **temas** (não formatos). Cada um precisa ser: da marca (ownable), relevante ao público, estratégico, e render 10+ ideias. Um pilar assinatura; no máximo um de conversão.
- `AUDITORIA.md` (de `modelos/auditoria.md`): notas, evidências, diagnóstico (forças, lacunas, oportunidades) e as 5 prioridades.

**Mostre ao dono o resumo (1 página) e peça aprovação** antes de produzir.

### 5. Produzir o que o cliente pediu

Foque no pedido. Se ele não pediu nada específico, **sugira 2 a 3 caminhos** e deixe o dono escolher. Rotas:

| Pedido | Como |
| --- | --- |
| **Plano/calendário de conteúdo** | `modelos/plano-conteudo.md`: objetivo, pilares, plataformas, cadência, 30/60/90 dias, 12 a 30 ideias com gancho, formato, pilar e CTA. |
| **Campanha de design para Instagram** (posts, carrosséis, stories) | Briefing de campanha (ideia central, pilares, peças, textos com a voz do cliente). Produzir como imagens no Remotion (`remotion still`) usando o design system do cliente ou um novo (`criar-design-system`); ou pacotes de textos e layout para o dono. |
| **Vídeos** (Reels, Shorts) | Roteiro curto com gancho nos 3 primeiros segundos; se há vídeo bruto, skill `plano-de-edicao`; produção com `producao-de-video` e `legendas`. |
| **Apresentação da marca** | Estrutura narrativa (problema, solução, prova, oferta, próximo passo) e produção com a skill de apresentações disponível (`pptx`) ou página. |
| **Imagens/b-roll gerados por IA** | **Só o prompt** (formato, duração, enquadramento, o que evitar, onde entra). O dono gera e manda o arquivo. |
| **Proposta/portfólio do próprio dono** | Mesma base aplicada ao CFDesigner (use o design system `cfdesigner`). |

Cada peça: referenciar o pilar e a voz da base; mostrar prévia ao dono; só então renderizar final.

### 6. Entregar e arquivar

Entregue o relatório (resumo no chat; documento ou página se o dono quiser compartilhar) e os arquivos finais. Atualize `BASE.md` com o que aprendeu. Salve no `main` (regra do dono); nunca versionar vídeos nem material bruto.

## Checklist de qualidade

- Cada afirmação tem fonte ou está marcada como hipótese.
- Lacunas de material listadas, com o que pedir ao cliente.
- Pilares são temas, não formatos; voz com citações.
- A produção cobre o que foi pedido, nada a mais; texto de apoio pequeno e discreto.
- Nenhum rosto coberto por gráfico; nenhuma mistura de design systems.
