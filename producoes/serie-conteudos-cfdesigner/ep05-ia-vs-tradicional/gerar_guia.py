# Gera guia-producao.html e PROMPT-IA.md do ep. 05 (mesma linguagem A do storyboard). Uso: python3 producoes/serie-conteudos-cfdesigner/ep05-ia-vs-tradicional/gerar_guia.py
import html, pathlib, re, base64, io
from PIL import Image
AQUI = pathlib.Path(__file__).parent
RAIZ = AQUI.parent.parent.parent
esc = html.escape

# ------------------------------------------------------------------ conteúdo
NEG = "no text, no subtitles, no logos, no watermark, no extra people, no morphing of the face, no changing clothes, no warped hands or fingers, no extra fingers, no sliding feet"
ESTILO_BASE = "Photorealistic live-action footage, natural overcast daylight, real skin texture, shot on a gimbal-stabilized cinema camera, vertical 9:16, 24 fps, 8 seconds."
CENA = "a man sitting on weathered concrete stairs in an urban alley, legs apart, elbows resting on his knees, hands hanging relaxed in front of him, wearing a plain white t-shirt, olive cargo pants and black-and-white sneakers, dark curly hair, mustache and goatee"
PROMPTS = [
 dict(id="D", titulo="Clipe de IA: você (cena 4 e fim da cena 8)",
  entra="Cena 4 (imagem 2) e o último quadro da transformação (cena 8)",
  refs="Imagem de referência: um quadro do take B (o primeiro, parado) ou a sua folha de personagem. Vídeo de referência (se o Omni aceitar): o take B.",
  texto=f"{ESTILO_BASE} {CENA.capitalize()}. Keep the exact same man as the reference (same face, hair, beard and clothes). Camera: slow orbital arc around him from the right side to the left side, smooth and continuous for the whole shot, keeping him centered in frame. Action: he sits relaxed and still for about 2 seconds, then raises one hand and waves goodbye to the camera at around the 5 second mark, then lowers it. Light breathing, subtle fabric movement. Audio: very soft ambient city sound, no music, no voice. Negative: {NEG}."),
 dict(id="E", titulo="Clipe de IA: alienígena (cena 8)",
  entra="Cena 8, segunda troca (depois do glitch)",
  refs="Mesmo vídeo de referência (take B) e uma imagem de referência do alienígena sentado (veja os prompts de imagem abaixo).",
  texto=f"{ESTILO_BASE} Same scene, same stairs, same camera orbit and same timing as the reference video, but the man is replaced by a friendly green alien with smooth green skin, big black almond eyes and no hair, wearing the same plain white t-shirt, olive cargo pants and sneakers. The alien copies the exact body movement of the reference: sits relaxed with elbows on knees, then waves goodbye at around the 5 second mark. Camera: slow orbital arc from the right side to the left side. Audio: soft ambient city sound, no music, no voice. Negative: {NEG}, no human face."),
 dict(id="F", titulo="Clipe de IA: robô (cena 8)",
  entra="Cena 8, terceira troca",
  refs="Mesmo vídeo de referência (take B) e uma imagem de referência do robô sentado.",
  texto=f"{ESTILO_BASE} Same scene, same stairs, same camera orbit and same timing as the reference video, but the man is replaced by a silver humanoid robot with a polished metal head, two softly glowing amber eyes, and metal arms and hands, wearing the same plain white t-shirt, olive cargo pants and sneakers. The robot copies the exact body movement of the reference: sits relaxed with elbows on knees, then waves goodbye at around the 5 second mark with smooth mechanical precision. Camera: slow orbital arc from the right side to the left side. Audio: soft ambient city sound with a faint servo hum, no music, no voice. Negative: {NEG}, no human face."),
]
IMGS = [
 dict(id="alien", titulo="Imagem de partida: alienígena sentado",
  texto=f"Photorealistic photo, edit the reference image: keep the exact same pose, framing, stairs, light and clothes, but replace the man with a friendly green alien with smooth green skin, big black almond eyes and no hair. Vertical 9:16. {NEG}, no human face."),
 dict(id="robo", titulo="Imagem de partida: robô sentado",
  texto=f"Photorealistic photo, edit the reference image: keep the exact same pose, framing, stairs, light and clothes, but replace the man with a silver humanoid robot with a polished metal head, two softly glowing amber eyes, metal arms and hands. Vertical 9:16. {NEG}, no human face."),
]
FALAS = [
 ("0 a 3 s", "Gancho", "Mãos fechadas. Em 0,5 s, abre as duas mãos, palmas para cima.", "Um desses dois sou eu. O outro é IA."),
 ("3 a 6 s", "Promessa", "Ergue as mãos um pouco, olha para a câmera.", "Eu gravei um e gerei o outro. E no fim eu mostro o que a câmera nunca fez."),
 ("6 a 9 s", "Imagem 1", "Olha para a mão esquerda (o clipe A entra em tela cheia).", "Olha o primeiro."),
 ("9 a 12 s", "Imagem 2", "Olha para a mão direita (o clipe D entra em tela cheia).", "Agora o segundo."),
 ("12 a 16 s", "Pistas", "Olha de uma mão para a outra, depois para a câmera.", "Olha as mãos, olha a sombra. Comenta aí: 1 ou 2?"),
 ("16 a 18 s", "Pausa", "Cala, sorri, olha para a câmera. Sem fala.", "Silêncio de 2 segundos"),
 ("18 a 20 s", "Revelação", "Sorri, mãos abertas.", "O primeiro sou eu. O segundo é IA."),
 ("20 a 23,5 s", "Transformação", "Pode ficar em silêncio no vídeo (a tela é do clipe).", "Mesmo movimento. Posso virar qualquer coisa."),
 ("23,5 a 26 s", "Tese e próximo", "Mãos abertas e vazias, sorriso, olha para a câmera.", "A IA gera, quem dirige é você. No próximo, um pedaço de argila vira um personagem digno de cinema de Hollywood, e eu te mostro como."),
]
ARQUIVOS = [
 ("A", "ep05-take-a.mp4", "Você sentado, tchau, órbita da esquerda para a direita, 8 s", "Cena 3 (imagem 1, o clipe real)"),
 ("B", "ep05-take-b.mp4", "O mesmo, com a órbita da direita para a esquerda, 8 s", "Referência de movimento para D, E e F"),
 ("C", "ep05-principal.mp4", "Você de frente falando, com as mãos abertas, ~27 s", "Gravação principal (voz e rastreio das mãos)"),
 ("D", "ep05-ia-voce.mp4", "Clipe de IA: você, 8 s", "Cena 4 e fim da cena 8"),
 ("E", "ep05-ia-alien.mp4", "Clipe de IA: alienígena, 8 s", "Cena 8"),
 ("F", "ep05-ia-robo.mp4", "Clipe de IA: robô, 8 s", "Cena 8"),
]

# ------------------------------------------------------------------ PROMPT-IA.md
md = ["# Prompts de IA do episódio 05 (v3.1, sentado na escada)\n",
"Substitui a versão antiga (praia). **Eu não gero nada**: os prompts abaixo você cola no gerador que preferir (Google Flow, Veo 3 Omni Flash 2.1). Escritos em inglês e em linguagem natural, no formato que o Veo entende bem (cena, sujeito, ação, câmera, áudio, negativo). Formato 9:16, 8 s, sem música.\n",
"**Antes de gerar, confirme no Omni o que ele aceita:** vídeo de referência para copiar o movimento (modo ideal) ou só imagem de partida. Se só aceitar imagem, use a imagem de partida + o prompt (o movimento sai do texto, com menos precisão).\n",
"Gere 2 a 3 versões de cada clipe e escolha a melhor. Os três clipes D, E e F saem do mesmo take B, para ficarem alinhados quadro a quadro.\n"]
for im in IMGS:
    md.append(f"\n## {im['titulo']}\n\n```\n{im['texto']}\n```\n")
for p in PROMPTS:
    md.append(f"\n## {p['titulo']}\n\n- **Entra em:** {p['entra']}\n- **Referências:** {p['refs']}\n\n```\n{p['texto']}\n```\n")
md.append("\n## Se falhar\n\n- Rosto mudando: reforce \"keep the exact same man as the reference\" e use a folha de personagem como imagem de referência.\n- Câmera sem órbita: reduza o prompt de câmera a uma frase (\"slow orbital arc around him, right to left\") e gere de novo; se persistir, gere com câmera parada.\n- Mão errada no tchau: troque por \"raises his right hand\" e repita a versão.\n")
(AQUI/"PROMPT-IA.md").write_text("".join(md))

# ------------------------------------------------------------------ HTML
css = re.search(r"<style>(.*?)</style>", (AQUI/"storyboard-modelo.html").read_text(), re.S).group(1)
_im = Image.open(RAIZ/"design-systems/cfdesigner/assets/logos/cfdesigner-horizontal-white.png"); _im.thumbnail((320,320)); _b=io.BytesIO(); _im.save(_b,"PNG",optimize=True)
LOGO = "data:image/png;base64,"+base64.b64encode(_b.getvalue()).decode()
FOTO = "data:image/webp;base64,"+base64.b64encode((AQUI/"quadros/desenhos/cena-08-glitch.webp").read_bytes()).decode()
extra = """
.gcard{margin-top:26px;background:var(--white);border:1px solid var(--line);border-radius:26px;padding:28px;box-shadow:0 22px 44px -30px rgba(0,0,0,.8)}
.gcard h3{font-weight:800;font-size:clamp(22px,2.8vw,30px);line-height:1.15;letter-spacing:-.02em;margin:10px 0 0}
.gcard .lead2{color:var(--muted);margin:10px 0 0;max-width:70ch;font-size:15px}
.gcard .ph{background:var(--amber)}
.two2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:18px}
.list{list-style:none;margin:14px 0 0;padding:0;display:grid;gap:10px}
.list li{position:relative;padding-left:24px;font-size:15px}
.list li::before{content:"";position:absolute;left:3px;top:.55em;width:8px;height:8px;background:var(--amber);transform:rotate(45deg)}
.list b{font-weight:700}
table.t{width:100%;border-collapse:collapse;margin-top:16px;font-size:14px}
table.t th{font:600 9.5px var(--head);letter-spacing:.2em;text-transform:uppercase;color:var(--muted);text-align:left;padding:8px 12px;border-bottom:1px solid var(--line)}
table.t td{padding:12px;border-bottom:1px solid var(--line);vertical-align:top}
table.t td:first-child b{color:var(--amber);font:400 22px var(--display);letter-spacing:.06em}
.tw{overflow-x:auto}
.code{position:relative;margin-top:14px;border-radius:16px;padding:16px 18px 16px;font:500 13px/1.6 var(--mono,ui-monospace,monospace);color:#e9e4d8;background:#07080a;border:1px solid rgba(217,164,65,.4);white-space:pre-wrap;overflow-wrap:anywhere}
.cp{position:absolute;right:12px;top:12px;font:700 10px var(--head);letter-spacing:.14em;background:var(--amber);color:var(--ink);border:0;border-radius:99px;padding:7px 14px;cursor:pointer}
.code{padding-right:110px}
.meta2{font-size:13.5px;color:var(--muted);margin:10px 0 0}
.meta2 b{color:var(--txt)}
.hphoto.gph{min-height:0;aspect-ratio:5/5.3;width:100%;max-width:560px;justify-self:end}
.gph .disc{right:3%;top:23%;width:76%}
.gph .ring{right:-8%;top:15%;width:94%}
.gph .gimg{position:absolute;z-index:5;left:auto;right:12%;bottom:0;width:58%;aspect-ratio:9/16;border-radius:22px;border:1px solid rgba(217,164,65,.6);box-shadow:0 24px 50px -20px rgba(0,0,0,.8)}
.selos span{white-space:nowrap;flex:none}
@media (max-width:1100px){.hero{padding-top:92px!important}.hgrid{grid-template-columns:minmax(0,1fr)!important}.hphoto.gph{justify-self:center;max-width:480px;margin-top:8px}}
.warn{margin-top:18px;border-radius:16px;padding:14px 18px;font-size:14px}
.warn .lab{color:#f1d9a3}
@media (max-width:820px){.two2{grid-template-columns:1fr}.gcard{padding:20px 16px}.code{padding-right:18px;padding-top:50px}}
"""
def card(eyebrow, titulo, lead, corpo, n=""):
    return f'<article class="gcard" id="{n}"><p class="eyebrow">{esc(eyebrow)} <i></i></p><h3>{titulo}</h3><p class="lead2">{lead}</p>{corpo}</article>'
def ul(items): return '<ul class="list">'+"".join(f"<li>{i}</li>" for i in items)+"</ul>"
def code(t): return f'<div class="code"><button class="cp" type="button">COPIAR</button><span class="ct">{esc(t)}</span></div>'

secs=[]
# 1 visão geral
rows="".join(f'<tr><td><b>{a}</b></td><td><code>{esc(f)}</code></td><td>{esc(d)}</td><td>{esc(u)}</td></tr>' for a,f,d,u in ARQUIVOS)
secs.append(card("Visão geral","Seis arquivos fazem o episódio","Dois você grava com a câmera (A e B), a gravação principal é a terceira (C), e os outros três são de IA a partir do take B (D, E, F).",
 f'<div class="tw"><table class="t"><thead><tr><th></th><th>Arquivo</th><th>O que é</th><th>Onde entra</th></tr></thead><tbody>{rows}</tbody></table></div>'
 '<div class="two2"><div><span class="lab">Ordem sugerida</span>'+ul(["Gravar A e B (os dois takes na escada)","Gerar a IA: D, E e F, a partir do take B","Gravar a principal (C), já sabendo como ficou a IA","Mandar tudo aqui: eu faço o rastreio, o holograma, o glitch e a montagem"])+'</div>'
 '<div><span class="lab">Por que o take B</span><p class="meta2">A cena 4 e a transformação usam a mesma órbita (da direita para a esquerda). Se D, E e F saem do mesmo movimento, a troca de personagem no meio da cena 8 fica alinhada, sem pulo.</p></div></div>',"visao"))
# 2 gravação clipes base
secs.append(card("Gravação","Clipes base A e B: você sentado na escada, dando tchau","Dois takes de 8 s, no mesmo lugar, com a mesma roupa. A única diferença é o sentido da órbita.",
 '<div class="two2"><div><span class="lab">Pose e ação</span>'+ul(["<b>Pose:</b> sentado na escada, pernas abertas, cotovelos nos joelhos, mãos soltas, olhar direto para a câmera (como na foto do modelo)","<b>0 a 2 s:</b> parado e relaxado, só respirando","<b>~5 s:</b> levanta uma mão e dá tchau, depois abaixa. <b>Mesmo momento nos dois takes</b>","<b>Roupa:</b> camiseta branca, calça cargo verde-oliva, tênis preto (igual à folha de personagem)"])+'</div>'
 '<div><span class="lab">Câmera e luz</span>'+ul(["<b>Órbita lenta</b> em arco ao redor de você, contínua nos 8 s. A: da esquerda para a direita. B: da direita para a esquerda","Gimbal, trilho circular ou alguém andando em volta com a câmera. Mantenha você no centro do quadro","<b>Vertical 9:16</b>, 4K se der, 24 ou 30 fps (o mesmo nos dois takes)","Luz natural difusa (dia nublado ou sombra aberta), sem sol duro. Nada passando atrás que possa confundir a IA","Grave 2 ou 3 takes de cada sentido e escolha o mais limpo"])+'</div></div>'
 '<div class="warn glass dark"><span class="lab">Atenção</span>Antes de tudo, faça um teste de 1 s do tchau com a órbita. Se a órbita ficar tremida, o motion control copia o tremor.</div>',"clipes"))
# 3 gravação principal
fr="".join(f'<tr><td>{esc(t)}</td><td><b>{esc(c)}</b></td><td>{esc(a)}</td><td>“{esc(f)}”</td></tr>' for t,c,a,f in FALAS)
secs.append(card("Gravação","Gravação principal (C): você falando com as mãos abertas","Uma gravação só, de uns 27 s, de frente, da cintura para cima. É dela que saem a voz, o rastreio das mãos e os hologramas.",
 '<div class="two2"><div><span class="lab">Enquadramento e mãos</span>'+ul(["<b>Tripé fixo</b>, vertical 9:16, 30 fps, da cintura para cima, fundo liso e escuro","Mãos <b>abertas, palmas para cima ou para a câmera, dedos separados</b>, longe do rosto e <b>quase paradas</b> (só pequenos movimentos)","Manga curta ou punho que não cubra o pulso. Sem nada nas mãos","Boa luz frontal difusa. Nada passando entre a mão e a câmera","Faça uma palma no início, para eu sincronizar imagem e som"])+'</div>'
 '<div><span class="lab">Som</span>'+ul(["<b>Microfone de lapela</b> (ou gravador separado) para a voz, sem eco","Fale com calma, as pausas são parte do vídeo","A pausa de 2 s (cena 6) tem que ser silêncio de verdade, sem respirar fundo","Grave 2 a 3 versões completas e mais 5 s de mãos abertas paradas, para o teste do rastreio"])+'</div></div>'
 f'<div class="tw"><table class="t"><thead><tr><th>Tempo</th><th>Cena</th><th>O que fazer</th><th>Fala</th></tr></thead><tbody>{fr}</tbody></table></div>',"principal"))
# 4 imagens
secs.append(card("Prompts","Imagens de partida do alienígena e do robô","Para o motion control de E e F, o Omni precisa ver o personagem. Gere uma imagem de cada, a partir de um quadro do take B (parado, no começo).",
 "".join(f'<h4 style="margin:20px 0 0;font:700 15px var(--head)">{esc(i["titulo"])}</h4>'+code(i["texto"]) for i in IMGS)
 +'<p class="meta2"><b>Como usar:</b> suba um quadro do take B como imagem de referência e cole o prompt. Peça 2 versões e fique com a que mais mantém a cena e a pose.</p>',"imagens"))
# 5 prompts
corpo="".join(f'<h4 style="margin:22px 0 0;font:700 15px var(--head)">{p["id"]} · {esc(p["titulo"].split(": ",1)[1])}</h4><p class="meta2"><b>Entra em:</b> {esc(p["entra"])}<br><b>Referências:</b> {esc(p["refs"])}</p>'+code(p["texto"]) for p in PROMPTS)
corpo+='<div class="warn glass dark"><span class="lab">Antes de gerar</span>Confirme no Omni se ele aceita <b>vídeo de referência</b> para copiar o movimento. Se aceitar, use o take B como referência nos três (é o jeito mais fiel). Se só aceitar imagem, o movimento sai do texto e fica menos preciso: gere mais versões.</div>'
secs.append(card("Prompts","Clipes de IA no Google Flow (Veo 3 Omni Flash 2.1)","Em inglês, em linguagem natural, 9:16, 8 s, sem música. Gere 2 a 3 versões de cada clipe. Como você vai usar o Omni, escrevi no formato do Veo, não no do Seedance.",corpo,"prompts"))
# 6 riscos
secs.append(card("Cuidados","O que pode dar errado e como resolver","",
 '<div class="two2"><div><span class="lab">Na IA</span>'+ul(["<b>Rosto mudando:</b> use a folha de personagem como imagem de referência e repita","<b>A órbita some:</b> simplifique a frase de câmera ou gere com câmera parada (eu faço um movimento leve na edição)","<b>Mão do tchau errada:</b> peça \"raises his right hand\" e gere outra versão","<b>Escada deformando na órbita:</b> reduza a velocidade da órbita (\"very slow\")"])+'</div>'
 '<div><span class="lab">Na gravação</span>'+ul(["<b>Mão tremendo no rastreio:</b> mais luz, dedos separados, menos movimento","<b>Voz com eco:</b> lapela ou gravador perto da boca","<b>Dois takes diferentes:</b> mesmo lugar, mesma roupa, mesmo horário (a luz muda)"])+'</div></div>'
 '<p class="meta2" style="margin-top:18px">Eu só escrevo os prompts: você gera no Omni. Se quiser que eu gere no Magnific como teste, eu mostro o custo antes.</p>',"cuidados"))
# 7 entrega
secs.append(card("Entrega","O que me mandar para eu montar","",
 ul(["Os arquivos A a F, com esses nomes, em MP4 ou MOV, sem recompressão","A narração separada, se gravou à parte (WAV ou M4A)","Se der, o quadro do take B usado para a IA","Eu volto com: quadros de teste do holograma e do glitch para você aprovar o estilo, e depois a montagem"]),"entrega"))

nav='<nav class="pillnav" aria-label="Seções"><a class="l on" href="#visao">Visão geral</a><a class="l" href="#clipes">Clipes base</a><a class="l" href="#principal">Principal</a><a class="l" href="#imagens">Imagens</a><a class="l" href="#prompts">Prompts</a><a class="l" href="#cuidados">Cuidados</a><a class="l" href="#entrega">Entrega</a></nav>'
page=f"""<title>Guia de produção Qual sou eu</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Kaushan+Script&family=Lato:wght@400;700&family=Montserrat:wght@500;600;700;800&display=swap">
<style>{css}{extra}</style>
<div class="topbar"><div class="nav"><span class="plate"><img src="{LOGO}" alt="CFDesigner"></span>{nav}<span></span></div></div>
<header class="hero" style="padding:68px 0 22px"><div class="wrap"><div class="hgrid" id="topo" style="grid-template-columns:minmax(0,1.35fr) minmax(0,.65fr)">
<div><p class="eyebrow" style="color:var(--amber)">Guia de produção · Episódio 05 <i></i></p>
<h1 style="font-size:clamp(44px,6.6vw,92px);white-space:nowrap;line-height:1.1">Como <span class="sc">gravar<svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true"><path d="M2 14 C 25 2, 70 2, 98 10" stroke="#d9a441" stroke-width="4" fill="none" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg></span></h1>
<p class="lead">Tudo o que você precisa para gravar os dois takes, a gravação principal e os clipes de IA: o que fazer, em que ordem, e os prompts prontos para colar.</p>
<div class="selos" style="flex-wrap:wrap;gap:8px;overflow:visible;position:relative;z-index:6"><span class="glass">6 arquivos</span><span class="glass">Takes de 8 s</span><span class="glass">Google Flow · Veo 3 Omni</span><span class="glass">Órbita esquerda e direita</span></div></div>
<div class="hphoto gph" aria-hidden="true"><span class="disc"></span><span class="ring"></span><div class="gimg" style="background:url({FOTO}) center/cover"></div></div>
</div></header>
<div class="wrap"><main>{''.join(secs)}</main><footer class="ft"><span class="plate"><img src="{LOGO}" alt="CFDesigner"></span><span>@CFDESIGNER.OFICIAL</span></footer></div>
<script>
(function(){{
  document.querySelectorAll('.cp').forEach(function(b){{b.addEventListener('click',function(){{
    var t=b.parentNode.querySelector('.ct').textContent,o=b.textContent;
    var ok=function(){{b.textContent='COPIADO';setTimeout(function(){{b.textContent=o}},1500)}};
    try{{navigator.clipboard.writeText(t).then(ok,function(){{fb(t,ok)}})}}catch(e){{fb(t,ok)}}
  }})}});
  function fb(t,ok){{var a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{{document.execCommand('copy');ok()}}catch(e){{}}document.body.removeChild(a)}}
  var links=document.querySelectorAll('.pillnav a.l'),map={{}};links.forEach(function(a){{map[a.getAttribute('href').slice(1)]=a}});
  function spy(){{var y=window.scrollY+140,cur='visao';['visao','clipes','principal','imagens','prompts','cuidados','entrega'].forEach(function(id){{var e=document.getElementById(id);if(e&&e.getBoundingClientRect().top+window.scrollY<=y)cur=id}});links.forEach(function(a){{a.classList.remove('on')}});if(map[cur])map[cur].classList.add('on')}}
  window.addEventListener('scroll',spy,{{passive:true}});spy();
}})();
</script>"""
(AQUI/"guia-producao.html").write_text(page)
print(len(page))
