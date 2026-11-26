# Gera captacao.html: versão enxuta do storyboard para a equipe de captação (externa).
# Só o que interessa para filmar: planos, enquadramentos, locações, diárias e referências.
# Sem locução, números, textos na tela, pontos internos a confirmar.
# Uso: python3 producoes/eletroposto-celesc/gerar_captacao.py
import base64, html
import gerar_storyboard as sb

e = html.escape
DIARIA_OVERRIDE = {}
PULAR = {"1:50"}  # repete o drone da BR-101 (só muda o texto da edição)

INTENCAO = {
    1: "Início, tecnologia e conexão com a cidade. A ponte é o cartão-postal; a estação e o celular mostram a experiência de quem usa.",
    2: "Estrada, autonomia e turismo. É o dia mais cinematográfico: muito drone e acompanhamento do carro nas curvas da serra.",
    3: "Escala e cidade. A estação no meio do movimento urbano, comércio e pessoas; detalhes da infraestrutura de maior capacidade.",
    4: "Conclusão e litoral. Rodovia, lagoa e a Ponte Anita Garibaldi, que pode render um dos planos finais mais fortes do filme.",
}
EXTRA = {
    1: ["Sedes da CERTI e da CELESC: fachadas e ambientes de trabalho (dimensão de pesquisa)", "Entrevistas na CELESC e na CERTI (ver abaixo)"],
    2: ["Acompanhamento do carro em estrada sinuosa, em vários trechos"],
    3: ["Pórticos e arquitetura característica da cidade", "Acessos rodoviários"],
    4: ["Acesso à cidade", "Plano final alternativo: carro atravessando a Ponte Anita Garibaldi e se afastando"],
}

def coletar():
    por_dia = {1: {}, 2: {}, 3: {}, 4: {}}
    for s in sb.SECOES:
        for sh in s["shots"]:
            if sh["fonte"] != "ia" or sh["tc"] in sb.GRADE or sh["tc"] in PULAR:
                continue
            d = DIARIA_OVERRIDE.get(sh["tc"], sh["diaria"])
            if not d:
                continue
            chave = sb.IA[sh["tc"]]
            item = por_dia[d].setdefault(chave, dict(img=chave, planos=[], descs=[], refs=[], tcs=[]))
            if sh["plano"] not in item["planos"]:
                item["planos"].append(sh["plano"])
            if sh["desc"] not in item["descs"]:
                item["descs"].append(sh["desc"])
            if sh["ref"] and sh["ref"] not in item["refs"]:
                item["refs"].append(sh["ref"])
            item["tcs"].append(sh["tc"])
    return por_dia

def ref_thumb(r):
    b = base64.b64encode((sb.REF / f"{r}.jpg").read_bytes()).decode()
    return f'<img src="data:image/jpeg;base64,{b}" alt="Referência de plano">'

def cartao(n, it):
    planos = "".join(f'<span class="pl">{e(p)}</span>' for p in it["planos"])
    descs = "".join(f"<li>{e(d)}</li>" for d in it["descs"])
    refs = ""
    if it["refs"]:
        refs = '<div class="ref">' + "".join(ref_thumb(r) for r in it["refs"]) + '<span>Referência de enquadramento (vídeos anteriores do projeto)</span></div>'
    return (f'<figure class="shot"><div class="fr">{sb.frame(sb.ilu(it["img"]))}</div>'
            f'<figcaption><div class="top"><span class="num">{n:02d}</span>{planos}</div><ul>{descs}</ul>{refs}</figcaption></figure>')

def sequencia():
    out = ""
    for s in sb.SECOES:
        thumbs = ""
        for sh in s["shots"]:
            if sh["fonte"] != "ia" or sh["tc"] in sb.GRADE:
                continue
            thumbs += f'<div class="mini">{sb.frame(sb.ilu(sb.IA[sh["tc"]]), libras=False)}</div>'
        if thumbs:
            out += f'<div class="seq" style="--c:{s["cor"]}"><div class="sq-h"><b>{s["no"]}</b> {e(s["titulo"])} <small>{e(s["ideia"])}</small></div><div class="strip">{thumbs}</div></div>'
    return out

CSS = sb.CSS + '''
.guide{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px;margin-top:16px}
.g{background:#fff;border:1px solid var(--line);border-radius:8px;padding:16px}
.g h3{font-size:15px;font-weight:800;color:var(--primary);margin-bottom:6px}
.g p{margin:0;font-size:14px;color:var(--ink)}
.dsec{background:#fff;border:1px solid var(--line);border-top:5px solid var(--c);border-radius:8px;padding:22px;margin-top:26px}
.dsec .dn{font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.dsec h2{font-size:28px;font-weight:900;color:var(--ink)}
.dsec .int{margin:6px 0 0;color:var(--primary);font-weight:600;max-width:80ch}
.locs{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0 18px}
.locs span{font-size:12px;font-weight:700;padding:4px 10px;border-radius:4px;background:var(--bg);border:1px solid var(--line2);color:var(--ink)}
.shot figcaption{display:block}
.top{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.num{font-weight:900;color:var(--c);font-size:14px}
.shot ul{margin:6px 0 0;padding-left:16px;font-size:13px;color:var(--ink)}
.ref{display:flex;gap:6px;align-items:center;margin-top:8px;font-size:11px;color:var(--muted)}
.ref img{width:72px;aspect-ratio:16/9;object-fit:cover;border-radius:3px;border:1px solid var(--line)}
.extra{margin-top:16px;font-size:14px}.extra h4{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.extra ul{margin:6px 0 0;padding-left:18px}
.seq{margin-top:12px}.sq-h{font-size:14px;font-weight:800;color:var(--ink)}.sq-h b{color:var(--c)}.sq-h small{font-weight:600;color:var(--muted);margin-left:6px}
.strip{display:flex;gap:6px;overflow-x:auto;padding:6px 0}
.mini{flex:none;width:150px;border-radius:4px;overflow:hidden;border:1px solid var(--line)}.mini svg{display:block;width:100%;height:auto}
'''

def page():
    por_dia = coletar()
    total = sum(len(v) for v in por_dia.values())
    dias = ""
    cores = {1: "#00adee", 2: "#8bc53f", 3: "#e5287b", 4: "#f08522"}
    n = 0
    for d, itens in por_dia.items():
        cid, _, locs = sb.DIARIAS[d]
        cards = ""
        for it in itens.values():
            n += 1
            cards += cartao(n, it)
        extra = "".join(f"<li>{e(x)}</li>" for x in EXTRA[d])
        dias += f'''<section class="dsec" id="d{d}" style="--c:{cores[d]}">
  <span class="dn">Diária {d}</span><h2>{cid}</h2><p class="int">{e(INTENCAO[d])}</p>
  <div class="locs">{"".join(f"<span>{e(l)}</span>" for l in locs if not l.startswith("Depoimentos"))}</div>
  <div class="grid">{cards}</div>
  <div class="extra"><h4>Captar também</h4><ul>{extra}</ul></div>
</section>'''
    entrevistas = ""
    for org, c, qs in sb.ENTREVISTAS:
        entrevistas += (f'<article class="iv"><div class="fr">{sb.frame(sb.sc_facade(org, c))}</div><div class="fr">{sb.frame(sb.ilu("24"))}</div>'
                        f'<div><h3>{org}</h3><p style="margin:4px 0 6px;font-size:14px;color:var(--muted)">Fachada e ambientes da sede + entrevista em externa, com o carro e uma paisagem ao fundo. Perguntas de referência:</p><ol>{"".join(f"<li>{e(q)}</li>" for q in qs)}</ol></div></article>')
    nav = "".join(f'<a href="#d{d}" style="flex:1;--c:{cores[d]}"><b>Diária {d}</b><span>{sb.DIARIAS[d][0]}</span></a>' for d in por_dia)
    return f'''<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Captação · Eletroposto CELESC</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800;900&display=swap">
<style>{CSS}</style></head>
<body>
{sb.ilu_defs()}
<div class="hero"><div class="wrap">
  <div class="eb">Storyboard de captação</div>
  <h1>Eletroposto CELESC · <b>vídeo de encerramento</b></h1>
  <p>Filme institucional de cerca de 3 minutos, com tom mais emocional e cinematográfico. O protagonista é o carro elétrico, que percorre Santa Catarina passando por paisagens urbanas, turísticas e rodoviárias e pelas estações de recarga.</p>
  <div class="chips"><span class="chip">16:9 · 1920×1080</span><span class="chip">4 diárias · 1 cidade por dia</span><span class="chip">{total} planos</span><span class="chip">Entrevistas na Diária 1</span></div>
</div></div>
<div class="bar"><div class="wrap" style="padding-bottom:0"><div class="tl">{nav}</div>
  <div class="tog"><label><input type="checkbox" id="lb" checked> Mostrar área reservada da janela de Libras</label></div>
</div></div>
<div class="wrap">

<div class="block"><h2>Orientações <b>de captação</b></h2>
<div class="guide">
<div class="g"><h3>4 enquadramentos</h3><p>Cada locação em grande angular, plano médio, close-up e drone, para dar opções na edição.</p></div>
<div class="g"><h3>O carro é o fio condutor</h3><p>Carro elétrico branco adesivado do projeto. Acompanhar o carro chegando, passando e saindo de cada lugar, e os detalhes (partida, painel, conector).</p></div>
<div class="g"><h3>Drone e acompanhamento</h3><p>Investir em planos aéreos e de acompanhamento do veículo, principalmente em Urubici e nas pontes.</p></div>
<div class="g"><h3>Janela de Libras</h3><p>O filme terá intérprete de Libras no canto inferior direito. Evitar ação ou detalhe importante nessa área (marcada nos quadros).</p></div>
<div class="g"><h3>Espaço para texto</h3><p>Alguns planos recebem texto na edição, sempre à esquerda. Deixar respiro no lado esquerdo dos planos de estrada e paisagem.</p></div>
<div class="g"><h3>Luz e tom</h3><p>Preferir golden hour e manhãs com névoa na serra. Tom emocional e cinematográfico, sem perder os detalhes técnicos das estações.</p></div>
</div>
<p style="margin-top:14px">As ilustrações mostram a ideia de cada plano. As miniaturas abaixo delas são quadros de vídeos anteriores do projeto, como referência de enquadramento.</p></div>

<div class="block"><h2>Sequência <b>do filme</b></h2><p>A ordem dos planos na edição, para entender o ritmo e para onde cada tomada vai.</p>{sequencia()}</div>

<div class="block"><h2>Planos <b>por diária</b></h2></div>
{dias}

<div class="block"><h2>Entrevistas <b>(Diária 1)</b></h2>
<p>Depoimentos curtos de profissionais da CELESC e da CERTI que participaram do projeto. Gravar nas sedes e em externa, com o carro e uma paisagem bonita ao fundo.</p>
{entrevistas}</div>
</div>
<script>document.getElementById('lb').addEventListener('change',e=>document.body.classList.toggle('nolibras',!e.target.checked));</script>
</body></html>'''

if __name__ == "__main__":
    (sb.AQUI / "captacao.html").write_text(page(), encoding="utf-8")
    print("ok", (sb.AQUI / "captacao.html").stat().st_size)
