# Gera storyboard.html do ep. 05 (CFDesigner), no visual dos carrosséis (fundo branco, âmbar, preto cinema). Uso: python3 producoes/serie-conteudos-cfdesigner/ep05-ia-vs-tradicional/gerar_storyboard.py
import html, pathlib, base64, io
from PIL import Image
AQUI=pathlib.Path(__file__).parent
RAIZ=AQUI.parent.parent.parent
_im=Image.open(RAIZ/"design-systems/cfdesigner/assets/logos/cfdesigner-horizontal-white.png"); _im.thumbnail((320,320)); _b=io.BytesIO(); _im.save(_b,"PNG",optimize=True)
LOGO="data:image/png;base64,"+base64.b64encode(_b.getvalue()).decode()
W,H=270,480
AMB="#d9a441"
def esc(t): return html.escape(t)
FONT="Montserrat,sans-serif"

DEFS='''<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<linearGradient id="gStudio"><stop offset="0" stop-color="#0b0c0e"/><stop offset="1" stop-color="#0b0c0e"/></linearGradient>
<linearGradient id="gFloor"><stop offset="0" stop-color="#16181c"/><stop offset="1" stop-color="#16181c"/></linearGradient>
<radialGradient id="gKey"><stop offset="0" stop-color="#d9a441" stop-opacity="0"/><stop offset="1" stop-color="#d9a441" stop-opacity="0"/></radialGradient>
<radialGradient id="gVig"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<linearGradient id="gClip"><stop offset="0" stop-color="#efe9dc"/><stop offset="1" stop-color="#efe9dc"/></linearGradient>
<linearGradient id="gClipFloor"><stop offset="0" stop-color="#d9cfb8"/><stop offset="1" stop-color="#d9cfb8"/></linearGradient>
<linearGradient id="gVoid"><stop offset="0" stop-color="#0b0c0e"/><stop offset="1" stop-color="#0b0c0e"/></linearGradient>
<linearGradient id="gShirt"><stop offset="0" stop-color="#f2eee6"/><stop offset="1" stop-color="#f2eee6"/></linearGradient>
<linearGradient id="gShirtClip"><stop offset="0" stop-color="#1f2329"/><stop offset="1" stop-color="#1f2329"/></linearGradient>
<linearGradient id="gSkin"><stop offset="0" stop-color="#e2b998"/><stop offset="1" stop-color="#e2b998"/></linearGradient>
<linearGradient id="gHolo"><stop offset="0" stop-color="#d9a441" stop-opacity=".22"/><stop offset="1" stop-color="#d9a441" stop-opacity=".22"/></linearGradient>
<linearGradient id="gAlien"><stop offset="0" stop-color="#8fd49c"/><stop offset="1" stop-color="#8fd49c"/></linearGradient>
<linearGradient id="gRobot"><stop offset="0" stop-color="#cfd5db"/><stop offset="1" stop-color="#cfd5db"/></linearGradient>
<linearGradient id="gAmberLine"><stop offset="0" stop-color="#d9a441"/><stop offset="1" stop-color="#d9a441"/></linearGradient>
<filter id="fBlur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5"/></filter>
<filter id="fSoft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2"/></filter>
<pattern id="pScan" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="#d9a441" opacity=".18"/></pattern>
</defs></svg>'''

def txt(t,x,y,size=11,fill="#fff",w=600,anchor="middle",ls=1.2,font=FONT,op=1):
    return f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{w}" fill="{fill}" text-anchor="{anchor}" letter-spacing="{ls}" font-family="{font}" opacity="{op}">{esc(t)}</text>'

def stage(kind="studio"):
    if kind=="void":
        return f'<rect width="{W}" height="{H}" fill="url(#gVoid)"/>'
    if kind=="clip":
        return (f'<rect width="{W}" height="{H}" fill="#efe9dc"/><rect y="{H-92}" width="{W}" height="92" fill="url(#gClipFloor)"/>'
                f'<ellipse cx="135" cy="{H-90}" rx="120" ry="8" fill="#000" opacity=".12" filter="url(#fSoft)"/>')
    s=f'<rect width="{W}" height="{H}" fill="#0b0c0e"/><rect y="{H-84}" width="{W}" height="84" fill="#16181c"/>'
    s+=''.join(f'<rect x="{x-d}" y="{y-d}" width="{2*d}" height="{2*d}" fill="#14171b" transform="rotate(45 {x} {y})"/>' for x,y,d in [(28,120,34),(240,92,44),(214,232,22),(20,300,26)])
    return s

def vignette(): return f'<rect width="{W}" height="{H}" fill="url(#gVig)"/>'

def person(pose="open",scale=1.0,cx=135,top=170,head="human",smile=False,clip=False):
    s=scale
    X=lambda v: round(cx+(v-135)*s,1); Y=lambda v: round(top+(v-170)*s,1)
    sh="url(#gShirtClip)" if clip else "url(#gShirt)"
    o=[]
    o.append(f'<path d="M{X(55)} {Y(480)} L{X(62)} {Y(300)} Q{X(70)} {Y(250)} {X(135)} {Y(244)} Q{X(200)} {Y(250)} {X(208)} {Y(300)} L{X(215)} {Y(480)} Z" fill="{sh}"/>')
    o.append(f'<path d="M{X(62)} {Y(300)} Q{X(70)} {Y(250)} {X(135)} {Y(244)}" stroke="#d9a441" stroke-opacity=".5" stroke-width="{1.6*s}" fill="none"/>')
    o.append(f'<path d="M{X(112)} {Y(246)} Q{X(135)} {Y(268)} {X(158)} {Y(246)}" stroke="#0b0c0e" stroke-opacity=".35" stroke-width="{2.4*s}" fill="none"/>')
    arms={"open":((70,290,46,350),(200,290,224,350),(44,356),(226,356)),
          "closed":((70,290,88,372),(200,290,182,372),(90,380),(180,380)),
          "wide":((70,280,14,300),(200,280,256,300),(10,301),(260,301))}[pose]
    for a in arms[:2]:
        o.append(f'<path d="M{X(a[0])} {Y(a[1])} L{X(a[2])} {Y(a[3])}" stroke="{sh}" stroke-width="{22*s}" stroke-linecap="round" fill="none"/>')
    for h in arms[2:]:
        o.append(f'<circle cx="{X(h[0])}" cy="{Y(h[1])}" r="{11*s}" fill="url(#gSkin)"/>')
    if head=="human":
        o.append(f'<rect x="{X(124)}" y="{Y(222)}" width="{22*s}" height="{28*s}" fill="url(#gSkin)"/><ellipse cx="{X(135)}" cy="{Y(232)}" rx="{14*s}" ry="{5*s}" fill="#000" opacity=".18"/>')
        o.append(f'<ellipse cx="{X(135)}" cy="{Y(196)}" rx="{25*s}" ry="{30*s}" fill="url(#gSkin)"/>')
        o.append(f'<ellipse cx="{X(110)}" cy="{Y(198)}" rx="{4*s}" ry="{7*s}" fill="#c99a78"/><ellipse cx="{X(160)}" cy="{Y(198)}" rx="{4*s}" ry="{7*s}" fill="#c99a78"/>')
        o.append(f'<path d="M{X(109)} {Y(190)} Q{X(108)} {Y(160)} {X(135)} {Y(158)} Q{X(162)} {Y(160)} {X(161)} {Y(190)} Q{X(150)} {Y(172)} {X(135)} {Y(174)} Q{X(120)} {Y(172)} {X(109)} {Y(190)}Z" fill="#2a1f19"/>')
        o.append(f'<path d="M{X(118)} {Y(186)} L{X(130)} {Y(186)} M{X(140)} {Y(186)} L{X(152)} {Y(186)}" stroke="#2a1f19" stroke-width="{2*s}" stroke-linecap="round"/>')
        o.append(f'<circle cx="{X(126)}" cy="{Y(196)}" r="{2.4*s}" fill="#241a15"/><circle cx="{X(144)}" cy="{Y(196)}" r="{2.4*s}" fill="#241a15"/>')
        if smile: o.append(f'<path d="M{X(123)} {Y(209)} Q{X(135)} {Y(222)} {X(147)} {Y(209)}" stroke="#7a3f33" stroke-width="{2.2*s}" fill="none" stroke-linecap="round"/>')
        else: o.append(f'<path d="M{X(127)} {Y(211)} L{X(143)} {Y(211)}" stroke="#7a3f33" stroke-width="{2*s}" stroke-linecap="round"/>')
    elif head=="alien":
        o.append(f'<rect x="{X(126)}" y="{Y(222)}" width="{18*s}" height="{28*s}" fill="#4d9a62"/>')
        o.append(f'<ellipse cx="{X(135)}" cy="{Y(190)}" rx="{27*s}" ry="{38*s}" fill="url(#gAlien)"/>')
        for sx in (-1,1):
            o.append(f'<path d="M{X(135+sx*8)} {Y(180)} Q{X(135+sx*20)} {Y(172)} {X(135+sx*23)} {Y(194)} Q{X(135+sx*14)} {Y(204)} {X(135+sx*8)} {Y(180)}Z" fill="#0b0c0e"/><circle cx="{X(135+sx*17)}" cy="{Y(188)}" r="{2*s}" fill="#e8fff0" opacity=".8"/>')
        o.append(f'<path d="M{X(129)} {Y(214)} L{X(141)} {Y(214)}" stroke="#2f6b3c" stroke-width="{1.6*s}"/>')
    elif head=="robot":
        o.append(f'<rect x="{X(124)}" y="{Y(216)}" width="{22*s}" height="{34*s}" fill="#5b626c"/>')
        o.append(f'<rect x="{X(133)}" y="{Y(146)}" width="{4*s}" height="{14*s}" fill="#9aa3ad"/><circle cx="{X(135)}" cy="{Y(143)}" r="{4.5*s}" fill="{AMB}"/>')
        o.append(f'<rect x="{X(107)}" y="{Y(158)}" width="{56*s}" height="{60*s}" rx="{9*s}" fill="url(#gRobot)"/>')
        o.append(f'<rect x="{X(115)}" y="{Y(178)}" width="{40*s}" height="{14*s}" rx="{4*s}" fill="#0b0c0e"/><circle cx="{X(126)}" cy="{Y(185)}" r="{3.6*s}" fill="{AMB}"/><circle cx="{X(144)}" cy="{Y(185)}" r="{3.6*s}" fill="{AMB}"/>')
        o.append(f'<rect x="{X(121)}" y="{Y(203)}" width="{28*s}" height="{4*s}" rx="{2*s}" fill="#5b626c"/>')
    return "".join(o)

def holo(x,y,w,h,label,tint=AMB,glow=1.0,alpha=1.0):
    icx=x+w/2
    g=[f'<g opacity="{alpha}">']
    g.append(f'<ellipse cx="{icx}" cy="{y+h+12}" rx="{w*0.42}" ry="5" fill="{tint}" opacity=".5" filter="url(#fBlur)"/>')
    g.append(f'<rect x="{x-3}" y="{y-3}" width="{w+6}" height="{h+6}" rx="4" fill="{tint}" opacity="{0.35*glow}" filter="url(#fBlur)"/>')
    g.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="3" fill="url(#gHolo)" stroke="{tint}" stroke-width="1.6"/>')
    g.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="3" fill="url(#pScan)"/>')
    g.append(f'<circle cx="{icx}" cy="{y+h*0.4}" r="{w*0.11}" fill="url(#gSkin)"/><path d="M{icx-w*0.24} {y+h} L{icx-w*0.18} {y+h*0.62} Q{icx} {y+h*0.53} {icx+w*0.18} {y+h*0.62} L{icx+w*0.24} {y+h} Z" fill="#46505d"/>')
    for (a,b,dx,dy) in [(x,y,1,1),(x+w,y,-1,1),(x,y+h,1,-1),(x+w,y+h,-1,-1)]:
        g.append(f'<path d="M{a} {b+dy*9} L{a} {b} L{a+dx*9} {b}" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round"/>')
    g.append(f'<rect x="{x}" y="{y-14}" width="17" height="14" rx="3" fill="{tint}"/><text x="{x+8.5}" y="{y-3.6}" font-size="9.5" font-weight="700" fill="#0b0c0e" text-anchor="middle" font-family="{FONT}">{esc(label)}</text>')
    g.append('</g>')
    return "".join(g)

def svg(inner): return f'<svg viewBox="0 0 {W} {H}" role="img" aria-label="Quadro ilustrado do storyboard" xmlns="http://www.w3.org/2000/svg">{inner}</svg>'
def topt(t,y=48,size=14,ls=2.4,fill="#fff"): return txt(t,W/2,y,size=size,fill=fill,w=700,ls=ls)

HL=(8,268,80,100); HR=(182,268,80,100)
scenes=[]
def add(**k): scenes.append(k)

# 1
i=stage()+person("open")+holo(*HL,"1",glow=1.7)+holo(*HR,"2",glow=1.7)+vignette()
i+=''.join(f'<line x1="{a}" y1="{b}" x2="{c}" y2="{d}" stroke="#d9a441" stroke-opacity=".8" stroke-width="1.3" stroke-linecap="round"/>' for a,b,c,d in [(48,256,38,236),(62,254,64,232),(222,256,232,236),(208,254,206,232)])
i+=topt("UM DESSES SOU EU")
add(n=1,fase="alc",t="0 a 3 s",ini=0,dur=3,nome="Gancho",botao="Alcance",svg=svg(i),
 fala="Um desses dois sou eu. O outro é IA.",texto="UM DESSES SOU EU",
 imagem="Você de frente, da cintura para cima, fundo liso. Começa com as mãos fechadas e, em 0,5 s, abre as duas mãos: as imagens 1 e 2 surgem flutuando sobre as palmas, como hologramas de borda âmbar. O quadro mostra o instante logo depois da abertura.",
 camera="Tripé fixo, sem zoom. Mãos quase paradas, só pequenos movimentos, para o rastreio não tremer.",
 tecnica="Rastreio de mão (MediaPipe) com suavização, componente novo HologramaMao, entrada com BlurIn.",
 transicao="Começa já em movimento: sem cartão de título, sem logo, sem abertura lenta.",
 som="Um suspiro de luz bem baixo quando as mãos abrem, sem clique.",
 atencao="Os hologramas ficam ao lado do rosto, nunca na frente dele. Se a mão perder o rastreio, o holograma segura o último quadro bom e só balança de leve.")
# 2
i=stage()+person("open")+holo(2,258,92,114,"1",glow=1.2)+holo(176,258,92,114,"2",glow=1.2)+vignette()+topt("NO FIM, O QUE A CÂMERA NUNCA FEZ",y=46,size=10.5,ls=1.6)
add(n=2,fase="alc",t="3 a 6 s",ini=3,dur=3,nome="Promessa e laço aberto",botao="Alcance para retenção",svg=svg(i),
 fala="Eu gravei um e gerei o outro. E no fim eu mostro o que a câmera nunca fez.",texto="NO FIM, O QUE A CÂMERA NUNCA FEZ",
 imagem="Mesmo plano. Você ergue as mãos um pouco e os hologramas crescem cerca de 10%, com um zoom lento em você.",
 camera="Mesma câmera, PushIn muito leve (100% para ~105%).",
 tecnica="PushIn e crescimento suave dos hologramas ligado à altura das mãos.",
 transicao="Sem corte: é a mesma tomada, continuando.",
 som="Fundo constante e leve, nada que chame atenção.",
 atencao="Esta frase é o laço aberto da transformação final. Se a transformação sair, a frase sai junto.")
# 3
i=stage("clip")+person("wide",1.25,135,150,clip=True)+txt("1",24,44,size=28,fill=AMB,w=400,anchor="start",font="Bebas Neue",ls=1)+txt("CLIPE GRAVADO",24,58,size=7.5,fill="#5b564a",w=700,anchor="start",ls=1.8)
add(n=3,fase="ret",t="6 a 9 s",ini=6,dur=3,nome="Imagem 1 em tela cheia",botao="Retenção",svg=svg(i),
 fala="Olha o primeiro.",texto="1",
 imagem="Você aponta com o olhar para o holograma 1, na sua mão esquerda. Ele cresce e abre em tela cheia: o clipe base, em que você está sentado na escada, de frente, na pose relaxada, e no fim dá tchau para a câmera (8 s). Depois a imagem encolhe e volta para a mão.",
 camera="O clipe base tem câmera parada, no mesmo enquadramento sentado nos dois clipes. A saída do holograma até a tela cheia é um movimento do Remotion (escala e posição) a partir da mão rastreada.",
 tecnica="Crescimento do holograma até o quadro e EtiquetaRotulo (número).",
 transicao="Cresce a partir da mão (~0,4 s) e volta ao fim (~0,3 s).",
 som="Swell suave ao abrir e queda suave ao voltar, bem baixos.",
 atencao="Depende do clipe base de 8 s: você sentado na escada, dando tchau. O tchau acontece no mesmo momento nos dois clipes, para ficarem alinhados.")
# 4
i=stage("clip")+person("wide",1.25,135,150,clip=True)+txt("2",24,44,size=28,fill=AMB,w=400,anchor="start",font="Bebas Neue",ls=1)+txt("CLIPE IA",24,58,size=7.5,fill="#5b564a",w=700,anchor="start",ls=1.8)
add(n=4,fase="ret",t="9 a 12 s",ini=9,dur=3,nome="Imagem 2 em tela cheia",botao="Retenção",svg=svg(i),
 fala="Agora o segundo.",texto="2",
 imagem="Mesma ação com a mão direita. O holograma 2, o clipe de IA, abre em tela cheia: o mesmo você sentado na escada, no mesmo enquadramento, dando tchau no mesmo instante. A diferença é pequena de propósito, para o público procurar. Depois volta para a mão.",
 camera="Câmera parada, igual ao clipe 1. O tchau acontece por volta dos 5 s nos dois clipes, para ficarem sincronizados.",
 tecnica="Mesma animação da cena 3, vinda da mão direita.",
 transicao="Igual à cena 3.",
 som="Igual à cena 3, com um tom um pouco diferente.",
 atencao="Se o clipe de IA ficar óbvio demais, o gancho muda para “olha o que a IA faz comigo” e a graça passa para a transformação. A mão, a sombra na escada e o tênis são os pontos que mais entregam.")
# 5
i=stage()+person("open")+holo(*HL,"1",glow=1.1)+holo(*HR,"2",glow=1.1)+vignette()+topt("ONDE ESTÁ O ERRO?",y=46,size=13)
i+=f'<circle cx="222" cy="328" r="23" fill="none" stroke="#d9a441" stroke-width="1.5" stroke-dasharray="3 3"/><circle cx="48" cy="310" r="21" fill="none" stroke="#d9a441" stroke-width="1.5" stroke-dasharray="3 3"/>'
i+=txt("MÃOS",222,368,size=8,fill="#d9a441",w=700)+txt("SOMBRA",48,350,size=8,fill="#d9a441",w=700)
add(n=5,fase="ret",t="12 a 16 s",ini=12,dur=4,nome="Pistas e pedido",botao="Retenção",svg=svg(i),
 fala="Olha as mãos, olha a sombra. Comenta aí: 1 ou 2?",texto="ONDE ESTÁ O ERRO?",
 imagem="De volta a você, com os dois hologramas nas mãos. Zoom suave dentro de cada holograma, em detalhes (mãos, sombra, borda do corpo), com um círculo âmbar tracejado marcando onde olhar. Você olha de uma imagem para a outra.",
 camera="Parada em você. O zoom é dentro do holograma (recorte ampliado do clipe).",
 tecnica="Zoom dentro da máscara do holograma e círculo âmbar fino animado.",
 transicao="Cada pista entra com BlurIn curto, sem transição pesada.",
 som="Fundo leve, sem efeito. A voz leva a cena.",
 atencao="Aqui está o pedido único do vídeo (comentar 1 ou 2). Se preferir “manda para um amigo”, troco a fala.")
# 6
i=stage()+person("open",smile=True)+holo(*HL,"1",glow=.6,alpha=.65)+holo(*HR,"2",glow=.6,alpha=.65)+vignette()
i+=f'<path d="M-10 478 L290 140" stroke="url(#gAmberLine)" stroke-width="2.4"/><path d="M-10 478 L290 140" stroke="#d9a441" stroke-width=".8" opacity=".9"/>'
i+=txt("1 OU 2?",W/2,62,size=34,fill="#fff",w=400,ls=3,font="Bebas Neue")
add(n=6,fase="ret",t="16 a 18 s",ini=16,dur=2,nome="Pausa dramática",botao="Retenção para revelação",svg=svg(i),
 fala="Silêncio. Dois segundos sem fala.",texto="1 OU 2?",
 imagem="Você cala, sorri e olha para a câmera. Os hologramas escurecem um pouco. Uma linha fina âmbar cruza o quadro na transversal e prepara a revelação.",
 camera="Parada. Quase nenhum movimento: o silêncio faz o trabalho.",
 tecnica="VarreduraAmbar (já existe no design system) e hologramas com opacidade reduzida.",
 transicao="A varredura âmbar cruza e revela a cena seguinte.",
 som="Um swell baixo e longo, só aqui: a única ênfase do vídeo (~+4 dB), ainda bem abaixo da voz.",
 atencao="É o respiro do vídeo. Não encher de som nem de texto.")
# 7
i=stage()+person("open",smile=True)+holo(*HL,"1")+holo(*HR,"2",glow=1.6)+vignette()
i+=f'<g transform="translate(24,236) skewY(-5)"><rect width="50" height="18" rx="4" fill="#fff"/><text x="25" y="12.6" font-size="9" font-weight="700" fill="#0b0c0e" text-anchor="middle" font-family="{FONT}" letter-spacing="1.6">REAL</text></g>'
i+=f'<g transform="translate(196,236) skewY(5)"><rect width="50" height="18" rx="4" fill="{AMB}"/><text x="25" y="12.6" font-size="9" font-weight="700" fill="#0b0c0e" text-anchor="middle" font-family="{FONT}" letter-spacing="1.6">IA</text></g>'
add(n=7,fase="mar",t="18 a 20 s",ini=18,dur=2,nome="Revelação",botao="Maratona de perfil",svg=svg(i),
 fala="O primeiro sou eu. O segundo é IA.",texto="REAL  /  IA",
 imagem="Você de volta, sorrindo. Duas etiquetas aparecem acima dos hologramas, viradas para o centro da imagem: REAL sobre o 1 e IA sobre o 2. O holograma da IA ganha um brilho âmbar a mais.",
 camera="Parada.",
 tecnica="EtiquetaRotulo (já existe, inclinada para o centro) e rastreio das mãos continua.",
 transicao="Sem corte: as etiquetas entram com BlurIn.",
 som="Voz limpa. O silêncio da cena 6 termina na primeira palavra.",
 atencao="Transparência: a revelação diz claramente qual é IA. Nada fica escondido.")
# 8
def glitchfig(dx,col): return f'<g transform="translate({dx},0)" opacity=".55" style="mix-blend-mode:screen"><g fill="{col}">{person("wide",1.25,135,150,head="alien")}</g></g>'
i=stage("void")+f'<g transform="translate(-5,0)" opacity=".7">{person("wide",1.25,135,150,head="alien")}</g>'.replace('url(#gShirt)','#d9a441').replace('url(#gSkin)','#d9a441').replace('url(#gAlien)','#d9a441')
i+=f'<g transform="translate(5,0)" opacity=".7">{person("wide",1.25,135,150,head="alien")}</g>'.replace('url(#gShirt)','#eef2f5').replace('url(#gSkin)','#eef2f5').replace('url(#gAlien)','#eef2f5')
i+=f'<g>{person("wide",1.25,135,150,head="alien")}</g>'
for yy,hh in ((214,5),(262,9),(318,4),(372,7)): i+=f'<rect x="0" y="{yy}" width="{W}" height="{hh}" fill="#0b0c0e" opacity=".8"/>'
i+=f'<rect x="0" y="288" width="{W}" height="14" fill="url(#pScan)"/><g transform="translate(12,0)"><rect x="40" y="246" width="150" height="10" fill="#d9a441" opacity=".5"/></g>'
i+=txt("MESMO MOVIMENTO",W/2,46,size=9.5,fill="#d9a441",w=700,ls=3)+vignette()
strip=[]
for lab,hd in [("Você (IA)","human"),("Alienígena","alien"),("Robô","robot"),("Alienígena","alien"),("Robô","robot")]:
    strip.append((lab,svg(stage("void")+person("wide",1.25,135,150,head=hd)+vignette())))
add(n=8,fase="mar",t="20 a 23,5 s",ini=20,dur=3.5,nome="Transformação",botao="Maratona de perfil",svg=svg(i),strip=strip,
 fala="Mesmo movimento. Posso virar qualquer coisa.",texto="MESMO MOVIMENTO",
 imagem="A imagem 2 (a IA) abre em tela cheia. No clipe, você está sentado na escada, na mesma pose das cenas 3 e 4. No meio do movimento, sem o movimento mudar, vira alienígena, depois robô e volta a ser você, ~0,8 s cada. Em cada troca entra um glitch curto (6 a 8 quadros): cores separadas, fatias deslocadas e uma piscada. O quadro mostra o instante de uma troca.",
 camera="Câmera parada nos clipes: o motion control mantém o movimento original.",
 tecnica="Clipes de IA com motion control (você gera), componente novo GlitchTroca, clipes alinhados quadro a quadro.",
 transicao="Glitch curto entre um personagem e outro. Sem morph de verdade.",
 som="Textura de glitch bem suave e baixa, sem cliques. Pode ser um chiado curto de sinal.",
 atencao="É a parte mais arriscada: o motion control pode errar mão, rosto ou pé. Geramos 2 a 3 versões de cada e escolhemos.")
# 9
i=stage()+person("open",smile=True)+vignette()+txt("QUEM DIRIGE É VOCÊ",W/2,56,size=27,fill="#fff",w=400,ls=2.4,font="Bebas Neue")
i+=txt("PRÓXIMO: DA ARGILA AO 4K",W/2,338,size=7.6,fill="#d9a441",w=700,ls=2.2)
add(n=9,fase="mar",t="23,5 a 26 s",ini=23.5,dur=2.5,nome="Tese e gancho para o próximo",botao="Maratona de perfil",svg=svg(i),
 fala="A IA gera. Quem dirige é você. No próximo, da argila ao 4K.",texto="QUEM DIRIGE É VOCÊ",
 imagem="Você de volta, mãos abertas e vazias. Sorri e diz a tese olhando para a câmera. Embaixo, bem pequeno, o anúncio do próximo episódio, acima da zona do rodapé do Instagram.",
 camera="Parada, plano um pouco mais fechado (PushIn leve).",
 tecnica="Texto em Bebas com BlurIn e EtiquetaRotulo simples para o “próximo”.",
 transicao="Cortina para cima leva ao fecho.",
 som="A música (sua) pode subir um pouco aqui. A voz fica sempre acima.",
 atencao="O gancho do próximo é o passo da maratona de perfil. Se o ep. 06 mudar de tema, só esta frase muda.")
# 10
i=stage("void")+f'<rect width="{W}" height="{H}" fill="url(#gKey)" opacity=".5"/>'
i+=''.join(f'<path d="M{a} {b+dy*14} L{a} {b} L{a+dx*14} {b}" stroke="{AMB}" stroke-width="1.8" fill="none"/>' for (a,b,dx,dy) in [(24,24,1,1),(246,24,-1,1),(24,456,1,-1),(246,456,-1,-1)])
i+=txt("CFDESIGNER",W/2,242,size=30,fill="#fff",w=400,ls=7,font="Bebas Neue")+f'<line x1="104" y1="256" x2="166" y2="256" stroke="{AMB}" stroke-width="1.6"/>'
add(n=10,fase="mar",t="26 a 27,5 s",ini=26,dur=1.5,nome="Fecho",botao="Assinatura",svg=svg(i),
 fala="Sem fala.",texto="Logo",
 imagem="Fundo FundoCF (variante visor, cantos de câmera) com o logo, sem nenhum texto extra.",
 camera="Parado.",
 tecnica="FundoCF visor e LogoOutro (o fecho discreto do CFDesigner).",
 transicao="Fusão de 0,3 s vinda da cortina da cena 9.",
 som="O fim da música (sua).",
 atencao="O logo desenhado aqui é só uma indicação: no vídeo entra o logo real do design system.")

TOTAL=27.5
import base64 as _b64
def _img(path,h):
    im=Image.open(path).convert("RGBA"); r=h/im.size[1]; im=im.resize((int(im.size[0]*r),h)); b=io.BytesIO(); im.save(b,"PNG",optimize=True)
    return "data:image/png;base64,"+_b64.b64encode(b.getvalue()).decode()
FOTO=_img(RAIZ/"producoes/carrossel-video-ia/assets/eu-capa.png",1000)
FASE={"alc":"Alcance","ret":"Retenção","mar":"Maratona"}
def _webp(nome):
    return "data:image/webp;base64,"+_b64.b64encode((RAIZ/"design-systems/cfdesigner/assets/layout-storyboard"/nome).read_bytes()).decode()
IMGS={"%%IMG01T%%":"01-rastro-luz-transparente.webp","%%IMG02%%":"02-anel-3d.webp","%%IMG03%%":"03-esfera-3d.webp","%%IMG04%%":"04-ouro-liquido.webp","%%IMG05%%":"05-brilho-4-pontas.webp","%%IMG06%%":"06-lente-camera.webp","%%IMG07%%":"07-losango-3d.webp","%%IMG08%%":"08-papel-rasgado.webp"}
def hl(nome):
    p=nome.rsplit(" ",1)
    return (esc(p[0])+" " if len(p)>1 else "")+f'<mark>{esc(p[-1])}</mark>'
def ficha(s):
    left=s["ini"]/TOTAL*100; wd=s["dur"]/TOTAL*100
    strip=""
    if s.get("strip"):
        strip='<div class="strip"><p class="sl">Sequência da transformação, ~0,8 s cada, com glitch entre uma e outra</p><ol>'
        for k,(lab,sv) in enumerate(s["strip"]):
            if k>0: strip+='<li class="gl" aria-hidden="true">glitch</li>'
            strip+=f'<li><div class="mini"><div class="q {sv}"></div></div><span>{esc(lab)}</span></li>'
        strip+='</ol></div>'
    bl="".join(f'<li><b>{a}</b> {esc(s[k])}</li>' for a,k in [("Câmera","camera"),("Técnica","tecnica"),("Transição","transicao"),("Som","som")])
    return f'''<article class="ficha {s["fase"]}" id="c{s["n"]}">
<div class="flw"><div class="fl glass dark"><div class="phone"><div class="bez"><div class="q q{s["n"]}"><span class="qt glass">{esc(s["texto"])}</span></div></div></div></div></div>
<div class="fr">
<p class="eyebrow"><span class="ph">{FASE[s["fase"]]}</span> Cena {s["n"]:02d} de 10 <i></i> {esc(s["t"])}</p>
<h3>{hl(s["nome"])}</h3>
<div class="pos" role="img" aria-label="Posição no vídeo: {esc(s["t"])}"><i style="left:{left:.2f}%;width:{wd:.2f}%"></i></div>
<div class="say"><span class="lab">Fala</span><p>“{esc(s["fala"])}”</p></div>
<div class="scr"><span class="lab">Na tela</span><b class="placa">{esc(s["texto"])}</b></div>
<div class="what"><span class="lab">Imagem</span><p>{esc(s["imagem"])}</p></div>
<ul class="dia">{bl}</ul>
<div class="att glass dark"><span class="lab">Atenção</span><p>{esc(s["atencao"])}</p></div>

</div>
{('<div class="fx">'+strip+'</div>') if strip else ''}
</article>'''
def mini(s):
    return f'''<a class="mc" href="#c{s["n"]}"><div class="mb"><div class="bz"><div class="q q{s["n"]}"></div></div></div><div class="mt"><b>{s["n"]:02d}</b><span>{esc(s["nome"])}</span><em>{esc(s["t"])}</em></div><span class="ar" aria-hidden="true">↗</span></a>'''
QMAP={"q1":"cena-01","q2":"cena-02","q3":"cena-03","q4":"cena-04","q4p":"cena-04-em-pe","q5":"cena-05","q6":"cena-06","q7":"cena-07","q8":"cena-08-glitch","q8a":"cena-08-alien","q8r":"cena-08-robo","q9":"cena-09","q10":"cena-10"}
def _q(nome):
    return "data:image/webp;base64,"+_b64.b64encode((AQUI/"quadros/desenhos"/(nome+".webp")).read_bytes()).decode()
QCSS="<style>"+"".join(f".{c}{{background-image:url({_q(n)})}}" for c,n in QMAP.items())+"</style>"
scenes[7]["strip"]=[("Você","q4"),("Alienígena","q8a"),("Robô","q8r"),("Você","q4")]
fichas="\n".join(ficha(s) for s in scenes)
minis="\n".join(mini(s) for s in scenes)
card1=scenes[0]["svg"]
page=(AQUI/"storyboard-modelo.html").read_text()
for k,v in {**{k:_webp(n) for k,n in IMGS.items()},"%%FICHAS%%":fichas,"%%MINIS%%":minis,"%%CARD1%%":card1,"%%DEFS%%":DEFS+QCSS,"%%LOGO%%":LOGO,"%%FOTO%%":FOTO}.items():
    page=page.replace(k,v)
(AQUI/"storyboard.html").write_text(page); print(len(page))
