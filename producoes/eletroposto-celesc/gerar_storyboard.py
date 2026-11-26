# Gera storyboard.html do vídeo de encerramento do Eletroposto CELESC.
# Quadros ilustrados em SVG (ainda não há material gravado). Identidade CERTI.
# Uso: python3 producoes/eletroposto-celesc/gerar_storyboard.py
import base64, html, pathlib

AQUI = pathlib.Path(__file__).parent
RAIZ = AQUI.parent.parent
LOGO_CERTI = base64.b64encode(
    (RAIZ / "design-systems/certi/assets/logos/certi-horizontal-negativo.png").read_bytes()
).decode()

W, H = 320, 180  # 16:9

# ---------------------------------------------------------------- primitivas
def sky(kind="day"):
    c = {
        "day": ("#9fd3ee", "#e9f6fc"),
        "gold": ("#f2b36b", "#fbe6c8"),
        "dusk": ("#27466b", "#f0935a"),
        "mist": ("#b9cbd6", "#eef2f4"),
    }[kind]
    gid = f"sky{kind}"
    return (f'<defs><linearGradient id="{gid}" x1="0" y1="0" x2="0" y2="1">'
            f'<stop offset="0" stop-color="{c[0]}"/><stop offset="1" stop-color="{c[1]}"/></linearGradient></defs>'
            f'<rect width="{W}" height="{H}" fill="url(#{gid})"/>')

def sun(x, y, r=10, c="#fff3c4"):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}" opacity=".85"/>'

def sea(y, c="#3d87ad"):
    return (f'<rect y="{y}" width="{W}" height="{H-y}" fill="{c}"/>'
            f'<path d="M0 {y+6} h{W}" stroke="#fff" stroke-opacity=".25" stroke-dasharray="14 10"/>'
            f'<path d="M20 {y+14} h{W}" stroke="#fff" stroke-opacity=".18" stroke-dasharray="20 16"/>')

def ground(y, c="#7c9a6d"):
    return f'<rect y="{y}" width="{W}" height="{H-y}" fill="{c}"/>'

def mountains(base=120, dark=False):
    cs = ["#8fae9a", "#6a8f78", "#456b56"] if not dark else ["#5b7184", "#425768", "#2e3f4d"]
    return (f'<path d="M0 {base-30} L40 {base-62} L85 {base-38} L130 {base-75} L175 {base-40} L220 {base-70} L270 {base-35} L320 {base-58} V{H} H0Z" fill="{cs[0]}"/>'
            f'<path d="M0 {base-10} L55 {base-45} L105 {base-18} L160 {base-52} L215 {base-20} L265 {base-48} L320 {base-15} V{H} H0Z" fill="{cs[1]}"/>'
            f'<path d="M0 {base+10} L70 {base-15} L140 {base+8} L210 {base-12} L320 {base+12} V{H} H0Z" fill="{cs[2]}"/>')

def winding_road():
    return ('<path d="M150 180 C 120 150, 230 140, 190 118 S 120 100, 150 88" fill="none" stroke="#4a4f55" stroke-width="12" stroke-linecap="round"/>'
            '<path d="M150 180 C 120 150, 230 140, 190 118 S 120 100, 150 88" fill="none" stroke="#f4f4f4" stroke-width=".8" stroke-dasharray="4 4"/>')

def road_persp(c="#4a4f55", horizon=92):
    return (f'<path d="M120 180 L156 {horizon} L164 {horizon} L250 180Z" fill="{c}"/>'
            f'<path d="M185 180 L160 {horizon}" stroke="#fff" stroke-width="1.4" stroke-dasharray="7 7"/>')

def skyline(base=118, c="#6d8496"):
    rects = [(10,40,22),(34,62,16),(52,48,20),(74,80,14),(90,55,22),(114,70,18),(134,44,24),
             (160,90,15),(177,58,20),(199,74,16),(217,50,22),(241,66,18),(261,42,24),(287,60,20)]
    out = ""
    for x, h, w in rects:
        out += f'<rect x="{x}" y="{base-h}" width="{w}" height="{h}" fill="{c}"/>'
        for wy in range(base - h + 5, base - 4, 7):
            out += f'<rect x="{x+3}" y="{wy}" width="{w-6}" height="2" fill="#fff" opacity=".22"/>'
    return out

def hercilio(dy=0, c="#e8ecef", night=False):
    s = "#cdd5db" if not night else "#ffd88a"
    d = 128 + dy
    g = f'<g stroke="{s}" fill="none" stroke-width="1.6">'
    g += f'<path d="M20 {d} Q 70 {d-6} 112 {58+dy}"/>'
    g += f'<path d="M112 {58+dy} Q 160 {d+4} 208 {58+dy}"/>'
    g += f'<path d="M208 {58+dy} Q 250 {d-6} 300 {d}"/>'
    g += '</g>'
    g += f'<rect x="108" y="{56+dy}" width="8" height="{d-56-dy+14}" fill="{c}"/><rect x="204" y="{56+dy}" width="8" height="{d-56-dy+14}" fill="{c}"/>'
    g += f'<rect x="0" y="{d}" width="{W}" height="4" fill="{c}"/>'
    for x in range(124, 200, 8):
        t = (x - 112) / 96
        y = (1-t)**2*(58+dy) + 2*(1-t)*t*(d+4) + t*t*(58+dy)
        g += f'<line x1="{x}" y1="{y:.1f}" x2="{x}" y2="{d}" stroke="{s}" stroke-width=".6"/>'
    return g

def anita(dy=0):
    d = 124 + dy
    g = f'<path d="M0 {d} Q 160 {d-14} 320 {d}" stroke="#eef1f3" stroke-width="5" fill="none"/>'
    g += f'<path d="M156 {d-8} L160 {28+dy} L164 {d-8}Z" fill="#f3f5f7"/>'
    for i in range(1, 9):
        g += f'<line x1="160" y1="{34+dy+i*4}" x2="{160-i*17}" y2="{d-8+i*.9:.1f}" stroke="#dfe5ea" stroke-width=".7"/>'
        g += f'<line x1="160" y1="{34+dy+i*4}" x2="{160+i*17}" y2="{d-8+i*.9:.1f}" stroke="#dfe5ea" stroke-width=".7"/>'
    return g

def palms(n=6):
    out = ""
    for i in range(n):
        x = 60 + i * 18; y = 130 - i * 6; h = 70 - i * 8; s = 1 - i * .1
        out += f'<line x1="{x}" y1="{y}" x2="{x}" y2="{y-h}" stroke="#7a6a55" stroke-width="{2.4*s:.1f}"/>'
        for a in (-1, 1):
            out += f'<path d="M{x} {y-h} q {a*10*s:.1f} -4 {a*16*s:.1f} 4" stroke="#3f7d4e" stroke-width="{2*s:.1f}" fill="none"/>'
            out += f'<path d="M{x} {y-h} q {a*6*s:.1f} -8 {a*12*s:.1f} -6" stroke="#4f8f5e" stroke-width="{1.6*s:.1f}" fill="none"/>'
        xr = 330 - x
        out += f'<line x1="{xr}" y1="{y}" x2="{xr}" y2="{y-h}" stroke="#7a6a55" stroke-width="{2.4*s:.1f}"/>'
        for a in (-1, 1):
            out += f'<path d="M{xr} {y-h} q {a*10*s:.1f} -4 {a*16*s:.1f} 4" stroke="#3f7d4e" stroke-width="{2*s:.1f}" fill="none"/>'
    return out

def car(x, y, s=1, flip=False, lights=False):
    tr = f"translate({x},{y}) scale({-s if flip else s},{s})"
    g = f'<g transform="{tr}">'
    g += '<path d="M0 14 L4 7 Q14 -1 28 -2 L40 -2 Q51 2 57 7 L63 9 Q66 13 63 16 L0 16Z" fill="#f4f6f8" stroke="#2a3540" stroke-width=".6"/>'
    g += '<path d="M14 6 Q20 1 28 0.5 L38 0.5 Q46 3 50 7Z" fill="#2b4257"/>'
    g += '<line x1="31" y1="0.5" x2="31" y2="7" stroke="#f4f6f8" stroke-width=".8"/>'
    g += '<path d="M2 12 H60" stroke="#00adee" stroke-width="1"/>'
    g += '<circle cx="14" cy="16" r="5" fill="#1f262d"/><circle cx="14" cy="16" r="2" fill="#8a96a0"/>'
    g += '<circle cx="50" cy="16" r="5" fill="#1f262d"/><circle cx="50" cy="16" r="2" fill="#8a96a0"/>'
    if lights:
        g += '<path d="M63 10 L90 6 L90 16Z" fill="#fff6c8" opacity=".35"/>'
    return g + '</g>'

def car_top(x, y, s=1, rot=0):
    return (f'<g transform="translate({x},{y}) rotate({rot}) scale({s})">'
            '<rect x="-5" y="-10" width="10" height="20" rx="3.5" fill="#f4f6f8" stroke="#2a3540" stroke-width=".4"/>'
            '<rect x="-3.8" y="-5" width="7.6" height="4" rx="1" fill="#2b4257"/>'
            '<rect x="-3.6" y="3" width="7.2" height="3" rx="1" fill="#2b4257"/></g>')

def charger(x, y, s=1, cable=True):
    g = f'<g transform="translate({x},{y}) scale({s})">'
    g += '<rect x="0" y="0" width="18" height="46" rx="3" fill="#f7f9fb" stroke="#00578d" stroke-width="1"/>'
    g += '<rect x="0" y="0" width="18" height="7" rx="3" fill="#00578d"/>'
    g += '<rect x="3.5" y="11" width="11" height="9" rx="1" fill="#0b2b45"/><rect x="5" y="13" width="8" height="1.4" fill="#8bc53f"/>'
    g += '<circle cx="9" cy="28" r="2.6" fill="#00adee"/>'
    g += '<rect x="-2" y="46" width="22" height="3" fill="#9aa5ad"/>'
    if cable:
        g += '<path d="M16 30 C 30 34, 30 50, 44 44" stroke="#1f262d" stroke-width="1.6" fill="none"/>'
    return g + '</g>'

def station(x=200, y=78, s=1):
    g = f'<g transform="translate({x},{y}) scale({s})">'
    g += '<rect x="-10" y="-8" width="90" height="6" fill="#00578d"/><rect x="-6" y="-2" width="3" height="58" fill="#c8d0d6"/><rect x="73" y="-2" width="3" height="58" fill="#c8d0d6"/>'
    g += '</g>'
    return g + charger(x + 8 * s, y + 6 * s, s * .9, cable=False) + charger(x + 40 * s, y + 6 * s, s * .9, cable=False)

def person(x, y, s=1, c="#33475b"):
    return (f'<g transform="translate({x},{y}) scale({s})"><circle cx="0" cy="-30" r="6" fill="#c99b7a"/>'
            f'<path d="M-9 0 L-8 -20 Q0 -25 8 -20 L9 0Z" fill="{c}"/><rect x="-6" y="0" width="5" height="18" fill="#2a3540"/><rect x="1" y="0" width="5" height="18" fill="#2a3540"/></g>')

def drone_marks():
    return '<g stroke="#fff" stroke-opacity=".5" stroke-width=".8" fill="none"><path d="M12 12 h10 M12 12 v10 M308 12 h-10 M308 12 v10 M12 168 h10 M12 168 v-10 M308 168 h-10 M308 168 v-10"/></g>'

def motion(x1, y1, x2, y2):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#00adee" stroke-width="1.2" stroke-dasharray="3 3" marker-end="url(#arw)"/>'

ARW = '<defs><marker id="arw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10Z" fill="#00adee"/></marker></defs>'

# ---------------------------------------------------------------- cenas
def sc_black(): return f'<rect width="{W}" height="{H}" fill="#050608"/><text x="160" y="94" fill="#5b626c" font-size="9" text-anchor="middle" font-family="Nunito Sans, Nunito, sans-serif" letter-spacing="2">♪ SOM DE ESTRADA</text>'

def sc_dash():
    return (f'<rect width="{W}" height="{H}" fill="#0e141a"/>'
            '<rect x="70" y="60" width="180" height="62" rx="8" fill="#0b2b45" stroke="#00adee" stroke-width="1"/>'
            '<text x="160" y="96" fill="#00adee" font-size="18" text-anchor="middle" font-family="Nunito Sans, Nunito, sans-serif" font-weight="800">READY</text>'
            '<rect x="90" y="104" width="140" height="3" rx="1.5" fill="#1d3b52"/><rect x="90" y="104" width="120" height="3" rx="1.5" fill="#8bc53f"/>'
            '<path d="M20 190 A 140 140 0 0 1 300 190" stroke="#2a3540" stroke-width="16" fill="none"/>'
            '<ellipse cx="60" cy="168" rx="22" ry="12" fill="#c99b7a"/>')

def sc_plug():
    return (f'<rect width="{W}" height="{H}" fill="#cfd6dc"/>'
            '<rect x="170" y="30" width="150" height="150" fill="#eef1f3"/>'
            '<circle cx="225" cy="95" r="34" fill="#1f262d"/><circle cx="225" cy="95" r="28" fill="#2f3943"/>'
            '<g fill="#0b0f13"><circle cx="213" cy="85" r="5"/><circle cx="237" cy="85" r="5"/><circle cx="225" cy="100" r="5"/><circle cx="212" cy="108" r="3"/><circle cx="238" cy="108" r="3"/></g>'
            '<path d="M40 70 L170 82 Q186 84 186 95 Q186 106 170 108 L40 120Z" fill="#20272e"/>'
            '<path d="M-10 60 Q 30 70 60 78 L 60 116 Q 20 126 -10 120Z" fill="#c99b7a"/>'
            '<line x1="190" y1="95" x2="205" y2="95" stroke="#00adee" stroke-width="1.5" stroke-dasharray="2 2"/>')

def sc_phone(kind="app"):
    inner = ""
    if kind == "qr":
        cells = [(i, j) for i in range(7) for j in range(7) if (i * 3 + j * 5) % 4 < 2 or i in (0, 6) or j in (0, 6)]
        inner = "".join(f'<rect x="{150+i*4}" y="{66+j*4}" width="4" height="4" fill="#0b0f13"/>' for i, j in cells)
        inner += '<text x="164" y="112" font-size="3.4" text-anchor="middle" fill="#00578d" font-family="Nunito Sans, Nunito, sans-serif" font-weight="700">ESCANEIE PARA CARREGAR</text>'
    elif kind == "map":
        inner = ('<rect x="141" y="44" width="46" height="90" fill="#e6efe8"/>'
                 '<path d="M146 130 C 160 110, 150 90, 170 70 S 175 52, 182 48" stroke="#00578d" stroke-width="2" fill="none"/>'
                 '<circle cx="158" cy="104" r="3" fill="#00adee"/><circle cx="170" cy="70" r="3" fill="#00adee"/><circle cx="182" cy="48" r="3" fill="#8bc53f"/>')
    else:
        inner = ('<rect x="145" y="52" width="38" height="8" rx="2" fill="#00578d"/>'
                 '<text x="164" y="80" font-size="11" text-anchor="middle" fill="#00578d" font-family="Nunito Sans, Nunito, sans-serif" font-weight="900">78%</text>'
                 '<rect x="148" y="86" width="32" height="3" rx="1.5" fill="#e9e9e9"/><rect x="148" y="86" width="25" height="3" rx="1.5" fill="#8bc53f"/>'
                 '<rect x="148" y="112" width="32" height="10" rx="2" fill="#00adee"/>')
    return (f'<rect width="{W}" height="{H}" fill="#8fa3b2"/>' + car(10, 120, 2.2) +
            '<rect x="136" y="36" width="56" height="106" rx="7" fill="#11161b"/><rect x="141" y="44" width="46" height="90" fill="#fff"/>' + inner +
            '<path d="M120 150 Q 130 120 140 110 L 150 150Z" fill="#c99b7a"/>')

def sc_bridge_drone():
    return sky("gold") + sun(270, 40, 14) + sea(120) + hercilio() + car_top(170, 126, .7, 90) + motion(150, 140, 200, 140) + drone_marks()

def sc_bridge_car():
    return sky("day") + sea(126) + hercilio(dy=-18) + car(110, 92, 1.1) + motion(185, 104, 215, 104)

def sc_floripa_city():
    return sky("day") + sea(132, "#4a95b8") + skyline(130, "#7f95a6") + '<rect y="126" width="320" height="8" fill="#5d6a74"/>' + car(160, 112, .8)

def sc_serra_drone():
    return sky("mist") + mountains(110) + winding_road() + car_top(196, 124, .6, -40) + drone_marks()

def sc_urubici():
    return sky("gold") + sun(70, 50, 16) + mountains(120) + '<path d="M0 150 Q 160 132 320 150 V180 H0Z" fill="#9db67e"/>' + car(200, 132, .6)

def sc_car_landscape():
    return sky("gold") + sun(240, 55, 18) + mountains(118, dark=True) + ground(150, "#6e8a5c") + car(120, 132, 1) + person(196, 150, .9)

def sc_highway():
    return sky("day") + ground(92, "#86a56f") + road_persp() + car(150, 120, 1.2) + '<g fill="#5f7c55"><circle cx="40" cy="96" r="10"/><circle cx="290" cy="98" r="12"/></g>'

def sc_highway_drone():
    return (f'<rect width="{W}" height="{H}" fill="#7f9c69"/>'
            '<rect x="130" y="0" width="60" height="180" fill="#4a4f55"/><line x1="160" y1="0" x2="160" y2="180" stroke="#fff" stroke-dasharray="8 8"/>'
            '<rect x="0" y="0" width="70" height="180" fill="#6c8b5a"/>' + car_top(148, 96, 1.1) + motion(148, 80, 148, 50) + drone_marks())

def sc_arrive_station():
    return sky("day") + ground(130, "#b7bfc6") + station(150, 70, 1.1) + car(40, 126, 1.2) + motion(120, 150, 150, 150)

def sc_connected():
    return sky("day") + ground(130, "#b7bfc6") + charger(190, 76, 1.2) + car(70, 122, 1.6) + '<path d="M208 112 C 210 140, 190 140, 168 140" stroke="#1f262d" stroke-width="2" fill="none"/>'

def sc_archive():
    return (f'<rect width="{W}" height="{H}" fill="#d8cfbd"/>' + charger(140, 60, 1.3) +
            '<rect x="0" y="0" width="320" height="180" fill="#6b5a3e" opacity=".22"/>'
            '<text x="16" y="24" font-size="9" fill="#5a4b33" font-family="Nunito Sans, Nunito, sans-serif" font-weight="800" letter-spacing="1.5">ARQUIVO · 2015</text>')

def sc_map(final=False):
    pts = [(40, 80), (90, 70), (150, 66), (200, 58), (238, 52), (252, 60), (250, 76), (262, 84), (256, 98), (246, 112), (236, 128), (222, 142), (205, 138), (190, 124), (160, 112), (120, 104), (80, 98), (48, 94)]
    poly = " ".join(f"{x},{y}" for x, y in pts)
    dots = [(238, 60), (244, 80), (246, 98), (236, 118), (222, 134), (210, 104), (180, 96), (150, 90), (120, 88), (90, 84), (60, 86)]
    n = len(dots) if final else 4
    out = f'<rect width="{W}" height="{H}" fill="#024a77"/><polygon points="{poly}" fill="#00578d" stroke="#00adee" stroke-width="1"/>'
    out += '<ellipse cx="266" cy="92" rx="3" ry="9" fill="#00578d" stroke="#00adee" stroke-width=".8"/>'
    out += '<path d="M238 60 L244 80 L246 98 L236 118 L222 134" stroke="#8bc53f" stroke-width="1.6" fill="none"/>'
    out += '<path d="M246 98 L210 104 L180 96 L150 90 L120 88 L90 84 L60 86" stroke="#8bc53f" stroke-width="1.6" fill="none" stroke-dasharray="3 2"/>'
    for x, y in dots[:n]:
        out += f'<circle cx="{x}" cy="{y}" r="2.6" fill="#fff"/><circle cx="{x}" cy="{y}" r="5" fill="none" stroke="#00adee" stroke-width=".6"/>'
    return out

def sc_flow():
    out = f'<rect width="{W}" height="{H}" fill="#f7f9fb"/>'
    labels = ["ENERGIA", "RECARGA", "PAGAMENTO", "OPERAÇÃO"]
    cols = ["#00578d", "#00adee", "#f08522", "#8bc53f"]
    for i, (l, c) in enumerate(zip(labels, cols)):
        y = 14 + i * 40
        out += f'<rect x="40" y="{y}" width="120" height="26" rx="4" fill="{c}"/><text x="100" y="{y+17}" font-size="10" text-anchor="middle" fill="#fff" font-family="Nunito Sans, Nunito, sans-serif" font-weight="900" letter-spacing="1.2">{l}</text>'
        if i < 3:
            out += f'<path d="M100 {y+28} v8" stroke="#3c3c3b" stroke-width="1.4" marker-end="url(#arwd)"/>'
    out += '<defs><marker id="arwd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10Z" fill="#3c3c3b"/></marker></defs>'
    return out

def sc_stations_mosaic():
    out = f'<rect width="{W}" height="{H}" fill="#fff"/>'
    for i, (x, y) in enumerate([(4, 4), (108, 4), (212, 4), (4, 92), (108, 92), (212, 92)]):
        bg = ["#cfe6f3", "#e8eef1", "#f6e3cc", "#dde9d2", "#e6e1ef", "#d4e4ec"][i]
        out += f'<rect x="{x}" y="{y}" width="104" height="84" fill="{bg}"/>' + charger(x + 40, y + 18, .95 - (i % 3) * .1, cable=False)
    return out

def sc_joinville():
    return sky("day") + ground(130, "#c9c2b3") + palms() + '<path d="M120 180 L156 104 L164 104 L200 180Z" fill="#b5a994"/>' + car(140, 142, .9)

def sc_city_station():
    return sky("day") + skyline(112, "#9aaab6") + ground(112, "#d3d7da") + station(170, 66, 1) + person(80, 150, .9, "#f08522") + person(110, 152, .9, "#00578d") + car(200, 128, .9)

def sc_ultra():
    return (f'<rect width="{W}" height="{H}" fill="#dfe5ea"/>'
            '<rect x="120" y="20" width="80" height="150" rx="6" fill="#f7f9fb" stroke="#00578d" stroke-width="2"/>'
            '<rect x="120" y="20" width="80" height="20" rx="6" fill="#00578d"/>'
            '<rect x="134" y="52" width="52" height="34" rx="3" fill="#0b2b45"/>'
            '<text x="160" y="74" font-size="13" text-anchor="middle" fill="#8bc53f" font-family="Nunito Sans, Nunito, sans-serif" font-weight="900">150 kW</text>'
            '<path d="M200 110 C 240 116, 250 150, 290 150" stroke="#1f262d" stroke-width="5" fill="none"/>')

def sc_anita_drone():
    return sky("dusk") + sun(270, 70, 16, "#ffd7a0") + sea(118, "#2f6f92") + anita() + car_top(122, 115, .6, 95) + motion(110, 132, 150, 132) + drone_marks()

def sc_laguna():
    houses = "".join(f'<rect x="{20+i*36}" y="{100-(i%3)*6}" width="32" height="{40+(i%3)*6}" fill="{c}"/><path d="M{18+i*36} {100-(i%3)*6} L{36+i*36} {88-(i%3)*6} L{54+i*36} {100-(i%3)*6}Z" fill="#a4553a"/>'
                     for i, c in enumerate(["#f3d9a4", "#e9b8a6", "#cfe0e8", "#f6efe2", "#d8e6c6", "#f3d9a4", "#e9c7a6", "#cfe0e8"]))
    return sky("day") + '<rect y="140" width="320" height="40" fill="#bfb4a0"/>' + houses + car(140, 132, .9)

def sc_lagoa():
    casas = "".join(f'<rect x="{12+i*15}" y="{92-(i%2)*3}" width="13" height="{14+(i%2)*3}" fill="{c}"/>' for i, c in enumerate(["#f3d9a4", "#e9b8a6", "#f6efe2", "#cfe0e8", "#e9c7a6", "#f3d9a4"]))
    igreja = '<rect x="110" y="78" width="16" height="28" fill="#f6efe2"/><rect x="114" y="66" width="8" height="14" fill="#f6efe2"/><path d="M114 66 L118 58 L122 66Z" fill="#a4553a"/>'
    return sky("gold") + sun(260, 48, 12) + '<path d="M0 104 Q 90 92 170 100 T 320 96 V112 H0Z" fill="#6a8f78"/>' + casas + igreja + sea(110, "#4f91b3") + '<path d="M60 124 h40 M150 132 h60" stroke="#fff" stroke-opacity=".4"/>' + car(150, 94, .45)

def sc_br101_final():
    return sky("dusk") + sun(160, 92, 22, "#ffd7a0") + ground(96, "#55704c") + road_persp("#3d4247", 96) + car(150, 148, .55, lights=False) + drone_marks()

def sc_person_exit():
    return sky("mist") + mountains(124) + ground(150, "#7f9a6e") + charger(196, 96, 1.1) + car(40, 128, 1.4) + person(160, 158, 1.2, "#00578d")

def sc_cuts4():
    return (f'<rect width="{W}" height="{H}" fill="#000"/>'
            f'<svg x="0" y="0" width="160" height="90" viewBox="0 0 320 180">{sky("gold")+sea(120)+hercilio()}</svg>'
            f'<svg x="160" y="0" width="160" height="90" viewBox="0 0 320 180">{sky("mist")+mountains(120)+winding_road()}</svg>'
            f'<svg x="0" y="90" width="160" height="90" viewBox="0 0 320 180">{sky("day")+ground(130,"#c9c2b3")+palms()}</svg>'
            f'<svg x="160" y="90" width="160" height="90" viewBox="0 0 320 180">{sky("dusk")+sea(118,"#2f6f92")+anita()}</svg>')

def sc_endcard():
    return (f'<rect width="{W}" height="{H}" fill="#024a77"/>'
            '<text x="160" y="70" font-size="17" text-anchor="middle" fill="#fff" font-family="Nunito Sans, Nunito, sans-serif" font-weight="900" letter-spacing="1.5">ELETROPOSTO CELESC</text>'
            '<text x="160" y="86" font-size="9" text-anchor="middle" fill="#fff" font-family="Nunito Sans, Nunito, sans-serif" font-weight="300" letter-spacing="1.2">INOVAÇÃO QUE VIROU CAMINHO</text>'
            '<line x1="140" y1="94" x2="180" y2="94" stroke="#fff" stroke-width=".6"/>'
            '<rect x="88" y="112" width="62" height="24" rx="3" fill="none" stroke="#fff" stroke-dasharray="3 2" stroke-opacity=".7"/>'
            '<text x="119" y="127" font-size="6.5" text-anchor="middle" fill="#fff" font-family="Nunito Sans, Nunito, sans-serif" font-weight="700">LOGO CELESC</text>'
            f'<image href="data:image/png;base64,{LOGO_CERTI}" x="170" y="112" width="60" height="24" preserveAspectRatio="xMidYMid meet"/>')

def sc_facade(name, c):
    return (sky("day") + '<rect x="40" y="40" width="240" height="100" fill="#eef1f3"/>'
            + "".join(f'<rect x="{52+i*28}" y="{52+j*22}" width="20" height="14" fill="#9fb3c2"/>' for i in range(8) for j in range(3))
            + ground(140, "#c8d0d6")
            + f'<rect x="40" y="34" width="240" height="8" fill="{c}"/><text x="140" y="162" font-size="10" text-anchor="middle" fill="#3c3c3b" font-family="Nunito Sans, Nunito, sans-serif" font-weight="800" letter-spacing="2">SEDE {name}</text>')

def sc_interview(c):
    return (f'<defs><filter id="bl"><feGaussianBlur stdDeviation="2.5"/></filter></defs>'
            f'<g filter="url(#bl)">{sky("gold")}{mountains(130)}{car(170, 104, 1.6)}</g>'
            f'<g transform="translate(108,180)"><path d="M-40 0 Q-38 -46 0 -50 Q38 -46 40 0Z" fill="{c}"/><circle cx="0" cy="-70" r="18" fill="#c99b7a"/><path d="M-18 -74 Q0 -96 18 -74 Q14 -86 0 -88 Q-14 -86 -18 -74Z" fill="#3a2c22"/></g>')

def sc_lab():
    return (f'<rect width="{W}" height="{H}" fill="#eef3f7"/>'
            '<rect x="20" y="96" width="280" height="10" fill="#c8d0d6"/>'
            '<rect x="40" y="50" width="70" height="46" rx="3" fill="#0b2b45"/><path d="M46 84 L60 70 L72 78 L88 60 L104 66" stroke="#8bc53f" fill="none" stroke-width="1.5"/>'
            + charger(200, 48, 1, cable=False) + person(150, 150, 1.1, "#fff"))

# ---------------------------------------------------------------- sobreposições (estilo CERTI)
def ov_number(pre, num, label, x=26, y=70):
    return (f'<g font-family="Nunito Sans, Nunito, sans-serif" fill="#fff" style="filter:drop-shadow(0 1px 3px rgba(0,0,0,.45))">'
            f'<text x="{x}" y="{y-26}" font-size="7" font-weight="300" letter-spacing="1.5">{pre}</text>'
            f'<text x="{x}" y="{y}" font-size="30" font-weight="900">{num}</text>'
            f'<text x="{x}" y="{y+12}" font-size="7.5" font-weight="800" letter-spacing="1.2">{label}</text>'
            f'<line x1="{x}" y1="{y+17}" x2="{x+40}" y2="{y+17}" stroke="#fff" stroke-width=".6"/></g>')

def ov_phrase(light, heavy, x=26, y=74, size=22):
    return (f'<g font-family="Nunito Sans, Nunito, sans-serif" fill="#fff" style="filter:drop-shadow(0 1px 3px rgba(0,0,0,.5))">'
            f'<text x="{x}" y="{y-size+2}" font-size="8" font-weight="300" letter-spacing="1.4">{light}</text>'
            f'<text x="{x}" y="{y}" font-size="{size}" font-weight="900">{heavy}</text>'
            f'<line x1="{x}" y1="{y+6}" x2="{x+50}" y2="{y+6}" stroke="#fff" stroke-width=".6"/></g>')

def ov_small(t, x=26, y=40, c="#fff", anchor="start"):
    return f'<text x="{x}" y="{y}" font-family="Nunito Sans, Nunito, sans-serif" font-size="8" font-weight="800" letter-spacing="1.3" fill="{c}" text-anchor="{anchor}" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.5))">{t}</text>'

def ov_lines(lines, x=26, y=50, size=9, c="#fff", w="800"):
    return "".join(f'<text x="{x}" y="{y+i*(size+4)}" font-family="Nunito Sans, Nunito, sans-serif" font-size="{size}" font-weight="{w}" letter-spacing="1" fill="{c}" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.5))">{l}</text>' for i, l in enumerate(lines))

LIBRAS = ('<g class="libras"><rect x="238" y="86" width="78" height="90" fill="#002860" fill-opacity=".28" stroke="#fff" stroke-width=".8" stroke-dasharray="3 2"/>'
          '<circle cx="277" cy="114" r="8" fill="#fff" fill-opacity=".55"/><path d="M262 150 Q264 126 277 124 Q290 126 292 150Z" fill="#fff" fill-opacity=".55"/>'
          '<text x="277" y="170" font-size="6" text-anchor="middle" fill="#fff" font-family="Nunito Sans, Nunito, sans-serif" font-weight="800" letter-spacing="1.5">LIBRAS</text></g>')

def frame(scene, overlay="", libras=True):
    return (f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg" role="img">{ARW}{scene}{overlay}'
            f'{LIBRAS if libras else ""}</svg>')

# ---------------------------------------------------------------- conteúdo
D = {1: "Florianópolis", 2: "Urubici", 3: "Joinville", 4: "Laguna"}

def S(scene, tc, plano, diaria, desc, ov="", libras=True):
    return dict(scene=scene, tc=tc, plano=plano, diaria=diaria, desc=desc, ov=ov, libras=libras)

SECOES = [
    dict(id="abertura", no="00", titulo="Abertura", t0=0, t1=20, cor="#00578d",
         ideia="O carro acorda. Santa Catarina em cortes rápidos. O filme começa a andar.",
         loc=["Há dez anos, falar em mobilidade elétrica no Brasil era falar sobre futuro.",
              "Em Santa Catarina, esse futuro começou a ser construído em 2015.",
              "O que nasceu como um projeto de Pesquisa, Desenvolvimento e Inovação da CELESC, em parceria com a Fundação CERTI, tornou-se uma infraestrutura real para a mobilidade elétrica."],
         tela="2015 · Início do Projeto Eletroposto CELESC",
         som="Começa no preto só com o som da estrada. A trilha entra baixa no primeiro detalhe do carro e cresce na montagem.",
         shots=[S(sc_black(), "0:00", "Preto", 0, "Tela preta, som ambiente de estrada", libras=False),
                S(sc_dash(), "0:02", "Close", 1, "Painel acendendo, mão no volante"),
                S(sc_plug(), "0:05", "Close", 1, "Cabo de recarga sendo conectado"),
                S(sc_bridge_drone(), "0:07", "Drone", 1, "Ponte Hercílio Luz, corte rápido"),
                S(sc_serra_drone(), "0:09", "Drone", 2, "Estrada em direção à Serra, corte rápido"),
                S(sc_urubici(), "0:11", "Grande angular", 2, "Paisagem de Urubici, corte rápido"),
                S(sc_joinville(), "0:13", "Grande angular", 3, "Joinville, Rua das Palmeiras, corte rápido"),
                S(sc_laguna(), "0:15", "Grande angular", 4, "Laguna, centro histórico, corte rápido"),
                S(sc_highway(), "0:17", "Plano médio", 1, "O carro começa a rodar", ov_number("", "2015", "INÍCIO DO PROJETO ELETROPOSTO CELESC", 26, 64))]),
    dict(id="infra", no="01", titulo="De P&D à infraestrutura", t0=20, t1=55, cor="#00adee",
         ideia="A pesquisa ganha estrada: das primeiras estações ao Corredor Elétrico.",
         loc=["O desafio era entender como os veículos elétricos poderiam se integrar ao sistema de energia e como criar uma infraestrutura capaz de acompanhar essa transformação.",
              "Vieram os primeiros eletropostos. Depois, a expansão do Corredor Elétrico Catarinense.",
              "E a pesquisa ganhou escala.",
              "Hoje, a rede já conta com dezenas de estações espalhadas por Santa Catarina, conectando diferentes regiões do Estado e tornando possível percorrer grandes distâncias com a segurança de encontrar energia pelo caminho."],
         tela="36 estações · 31 municípios · mais de 1.500 km de território conectado (números a confirmar no fechamento)",
         som="A trilha ganha corpo. Ambiente de rodovia por baixo. Um som leve de “conexão” no close do carregador.",
         shots=[S(sc_highway_drone(), "0:20", "Drone", 4, "Carro percorrendo rodovia (BR-101), plano aéreo"),
                S(sc_lab(), "0:25", "Plano médio", 1, "Laboratório / CERTI: a dimensão de P&D"),
                S(sc_archive(), "0:29", "Arquivo", 0, "Imagens de arquivo das primeiras estações (contraste com a rede atual)"),
                S(sc_arrive_station(), "0:33", "Grande angular", 1, "Chegada a uma estação"),
                S(sc_connected(), "0:37", "Close", 1, "Close no carregador, carro conectado"),
                S(sc_map(False), "0:41", "Animação", 0, "Mapa de SC: a rede se expande ponto a ponto", ov_small("CORREDOR ELÉTRICO CATARINENSE", 20, 26)),
                S(sc_map(True), "0:47", "Animação", 0, "Rede completa e números",
                  ov_number("", "36", "ESTAÇÕES", 20, 62) + ov_number("", "31", "MUNICÍPIOS", 20, 112) + ov_small("+1.500 KM CONECTADOS", 20, 150))]),
    dict(id="experiencia", no="02", titulo="Não é só um eletroposto", t0=55, t1=85, cor="#8bc53f",
         ideia="Da ponte à serra: a experiência de quem está do outro lado do carregador.",
         loc=["Mas construir uma rede de recarga não significa apenas instalar equipamentos.",
              "É preciso entender onde eles devem estar, como serão utilizados, como o sistema será operado e, principalmente, como tornar essa experiência simples para quem está do outro lado do carregador: o cliente.",
              "Por isso, tecnologia, infraestrutura, operação e experiência do usuário caminharam juntas ao longo do projeto."],
         tela="Tecnologia + infraestrutura + operação + experiência",
         som="A trilha respira (menos instrumentos) nos detalhes do celular e volta a abrir na subida da serra.",
         shots=[S(sc_bridge_car(), "0:55", "Plano médio", 1, "Carro passando pela Ponte Hercílio Luz"),
                S(sc_arrive_station(), "1:00", "Grande angular", 1, "Corte para o carro chegando à estação"),
                S(sc_plug(), "1:03", "Close", 1, "Detalhes da recarga"),
                S(sc_phone("app"), "1:06", "Close", 1, "Usuário utilizando o celular"),
                S(sc_phone("map"), "1:09", "Close", 1, "Mapa das estações no celular"),
                S(sc_highway(), "1:12", "Plano médio", 2, "Carro novamente na estrada"),
                S(sc_serra_drone(), "1:16", "Drone", 2, "Transição para Urubici: carro subindo a serra (Corvo Branco)",
                  ov_lines(["TECNOLOGIA +", "INFRAESTRUTURA +", "OPERAÇÃO +", "EXPERIÊNCIA"], 20, 40, 10)),
                S(sc_urubici(), "1:21", "Grande angular", 2, "Paisagens da Serra Catarinense")]),
    dict(id="tarifa", no="03", titulo="Da recarga gratuita à tarifa", t0=85, t1=115, cor="#f08522",
         ideia="A virada: de infraestrutura experimental para serviço de mobilidade elétrica.",
         loc=["Durante quase dez anos, a utilização dos eletropostos foi gratuita.",
              "Mas, para que uma rede dessa dimensão pudesse continuar funcionando, receber manutenção e crescer, era preciso criar uma forma sustentável de operação.",
              "A terceira fase do projeto estudou justamente essa transição: como tarifar a recarga, como se relacionar com os usuários e como estruturar uma operação capaz de gerar receita e, ao mesmo tempo, manter a qualidade do serviço.",
              "A cobrança pelo uso das estações começou em setembro de 2024, depois de quase dez anos de serviço gratuito. A CELESC estruturou a cobrança para contribuir com os custos de energia, operação, aplicativo e manutenção da rede."],
         tela="Uma nova etapa: de infraestrutura experimental para serviço de mobilidade elétrica",
         som="Trilha em pulso mais marcado (é o bloco mais técnico). Sons leves nas entradas do gráfico, bem baixos.",
         shots=[S(sc_plug(), "1:25", "Close", 3, "Close no conector sendo retirado"),
                S(sc_connected(), "1:29", "Plano médio", 3, "Usuário conecta o veículo"),
                S(sc_phone("qr"), "1:33", "Close", 3, "Celular enquadrando o QR Code / aplicativo"),
                S(sc_flow(), "1:37", "Animação", 0, "Energia → Recarga → Pagamento → Operação"),
                S(sc_stations_mosaic(), "1:45", "Montagem", 0, "Diferentes tipos de estação (uma de cada cidade)"),
                S(sc_highway(), "1:50", "Plano médio", 3, "Fecho do bloco com a frase na tela",
                  ov_phrase("DE INFRAESTRUTURA EXPERIMENTAL PARA", "SERVIÇO", 20, 66) + ov_small("DE MOBILIDADE ELÉTRICA", 20, 84))]),
    dict(id="negocio", no="04", titulo="O modelo de negócio", t0=115, t1=145, cor="#e5287b",
         ideia="Escala e mercado: Joinville mostra a rede no meio da cidade; Laguna abre o caminho para o final.",
         loc=["O projeto também avançou em uma questão fundamental: transformar a infraestrutura em negócio.",
              "Foram estudados modelos de operação, oportunidades de receita, formas de parceria e os aspectos regulatórios necessários para a evolução desse mercado.",
              "O resultado é um modelo de negócios escolhido e implementado pela CELESC, com uma rede de parceiros e uma estrutura preparada para operar além do ambiente de P&D.",
              "É a inovação saindo do laboratório e entrando no mercado."],
         tela="P&D → Modelo de negócio → Operação",
         som="A trilha volta a crescer no “saindo do laboratório e entrando no mercado”. Ambiente urbano leve em Joinville.",
         shots=[S(sc_joinville(), "1:55", "Drone", 3, "Joinville: carro pela Rua das Palmeiras"),
                S(sc_city_station(), "2:00", "Grande angular", 3, "Chegada ao eletroposto, comércio e circulação de pessoas"),
                S(sc_ultra(), "2:04", "Close", 3, "Detalhes da infraestrutura: estação de maior capacidade (ultrarrápida)"),
                S(sc_city_station(), "2:08", "Plano médio", 3, "Estação em operação",
                  ov_lines(["P&amp;D  →  MODELO DE NEGÓCIO  →  OPERAÇÃO"], 20, 34, 9)),
                S(sc_anita_drone(), "2:12", "Drone", 4, "Transição para Laguna: carro atravessa a Ponte Anita Garibaldi"),
                S(sc_lagoa(), "2:17", "Grande angular", 4, "Lagoa / centro histórico / litoral"),
                S(sc_arrive_station(), "2:21", "Plano médio", 4, "Carro saindo da estação e retomando a estrada")]),
    dict(id="futuro", no="05", titulo="Um caminho para o futuro", t0=145, t1=170, cor="#00578d",
         ideia="Pausa e respiro na serra. Depois, as quatro cidades em sequência: o estado conectado.",
         loc=["De norte a sul. Do litoral à serra.",
              "De uma ideia pioneira a uma rede que conecta pessoas, cidades e oportunidades.",
              "O Projeto Eletroposto CELESC ajudou a construir, em Santa Catarina, um caminho para a mobilidade elétrica.",
              "E mostrou que inovação não é apenas antecipar o futuro.",
              "É criar as condições para que ele aconteça."],
         tela="(sem texto: deixar a imagem falar)",
         som="Ponto alto da trilha nos cortes rápidos das 4 cidades. Pequeno silêncio antes de “É criar as condições...”.",
         shots=[S(sc_serra_drone(), "2:25", "Drone", 2, "Urubici: carro em estrada de serra"),
                S(sc_urubici(), "2:29", "Grande angular", 2, "Plano aberto da paisagem"),
                S(sc_person_exit(), "2:33", "Plano médio", 2, "Carro chega ao eletroposto, pessoa desce"),
                S(sc_car_landscape(), "2:37", "Grande angular", 2, "Carro parado diante da paisagem"),
                S(sc_cuts4(), "2:41", "Montagem", 0, "Cortes rápidos: Florianópolis, Urubici, Joinville, Laguna"),
                S(sc_stations_mosaic(), "2:46", "Montagem", 0, "Imagens de outras estações do Estado")]),
    dict(id="fecho", no="06", titulo="Encerramento", t0=170, t1=180, cor="#024a77",
         ideia="O carro segue. A inovação continua em movimento.",
         loc=["E o futuro, agora, está em movimento."],
         tela="ELETROPOSTO CELESC · Inovação que virou caminho · CELESC + Fundação CERTI",
         som="Última frase sobre a trilha; a música resolve no fecho e o som termina em fade.",
         shots=[S(sc_br101_final(), "2:50", "Drone", 4, "Plano aéreo do carro seguindo pela estrada (BR-101, rumo ao litoral). O veículo se afasta"),
                S(sc_connected(), "2:54", "Plano médio", 4, "Corte para uma estação de recarga"),
                S(sc_endcard(), "2:56", "Fecho", 0, "Logo CELESC + CERTI, fade out")]),
]

ENTREVISTAS = [
    ("CELESC", "#00578d", ["O que significa chegar ao encerramento deste projeto depois de tantos anos de trabalho?",
                            "O que efetivamente está sendo entregue ao final desse ciclo?",
                            "O que foi estruturado para que essa rede continue funcionando daqui para frente?",
                            "Qual é o principal legado que esse projeto deixa para Santa Catarina?"]),
    ("CERTI", "#f08522", ["Quando esse projeto começou, qual era o grande desafio que vocês queriam resolver?",
                           "Naquela época, o que parecia mais difícil de tornar realidade?",
                           "Ao longo desses 11 anos, qual foi a conquista que mais marcou essa trajetória?",
                           "Em que momento vocês perceberam que aquela pesquisa estava se transformando em algo concreto?"]),
]

DIARIAS = {
    1: ("Florianópolis", "Início, tecnologia, conexão com a cidade",
        ["Ponte Hercílio Luz", "Beira-Mar Norte", "Região central", "Estação de recarga", "Sedes da CERTI e da CELESC (P&D)", "Depoimentos CELESC e CERTI"]),
    2: ("Urubici", "Estrada, autonomia, turismo, interiorização",
        ["Acesso à cidade", "Serra do Corvo Branco (ou trecho marcante)", "Paisagens serranas", "Centro de Urubici", "Eletroposto", "Estrada sinuosa: muito drone e acompanhamento"]),
    3: ("Joinville", "Escala, cidade, conexão com o mercado",
        ["Rua das Palmeiras", "Região central", "Pórticos e arquitetura da cidade", "Estação de recarga (ultrarrápida, se já instalada)", "Acessos rodoviários"]),
    4: ("Laguna", "Conclusão, litoral, conexão territorial",
        ["Ponte Anita Garibaldi (plano final forte)", "Centro histórico", "Região da lagoa", "Acesso à cidade", "Eletroposto", "BR-101, carro rumo ao litoral"]),
}

# ---------------------------------------------------------------- html
def fmt(t): return f"{t//60}:{t%60:02d}"
e = html.escape

def card(s):
    shots = ""
    for sh in s["shots"]:
        d = sh["diaria"]
        tag = f'D{d} · {D[d]}' if d else "Pós-produção"
        shots += (f'<figure class="shot"><div class="fr">{frame(sh["scene"], sh["ov"], sh["libras"])}</div>'
                  f'<figcaption><span class="tc">{sh["tc"]}</span><span class="pl">{e(sh["plano"])}</span><span class="dd d{d}">{tag}</span>'
                  f'<span class="ds">{e(sh["desc"])}</span></figcaption></figure>')
    loc = "".join(f"<p>{e(l)}</p>" for l in s["loc"])
    return f'''
<section class="sec" id="{s["id"]}" style="--c:{s["cor"]}">
  <div class="sh"><span class="no">{s["no"]}</span><div><h2>{e(s["titulo"])}</h2><p class="when">{fmt(s["t0"])} – {fmt(s["t1"])} · {s["t1"]-s["t0"]} s</p></div></div>
  <p class="idea">{e(s["ideia"])}</p>
  <div class="grid">{shots}</div>
  <div class="info">
    <div class="loc"><h3>Locução</h3>{loc}</div>
    <dl><dt>Texto na tela</dt><dd>{e(s["tela"])}</dd><dt>Som</dt><dd>{e(s["som"])}</dd></dl>
  </div>
</section>'''

def timeline():
    segs = "".join(f'<a href="#{s["id"]}" style="flex:{s["t1"]-s["t0"]};--c:{s["cor"]}"><b>{s["no"]}</b><span>{e(s["titulo"])}</span></a>' for s in SECOES)
    ticks = "".join(f"<span>{fmt(t)}</span>" for t in (0, 30, 60, 90, 120, 150, 180))
    return f'<div class="tl">{segs}</div><div class="ticks">{ticks}</div>'

def diarias():
    out = ""
    for n, (cid, narr, locs) in DIARIAS.items():
        usos = [(s, sh) for s in SECOES for sh in s["shots"] if sh["diaria"] == n]
        planos = {}
        for _, sh in usos:
            planos[sh["plano"]] = planos.get(sh["plano"], 0) + 1
        chips = "".join(f'<span class="chip">{e(p)} ×{q}</span>' for p, q in planos.items())
        lista = "".join(f'<li><span class="tc">{sh["tc"]}</span> {e(sh["desc"])} <em>({e(sh["plano"]).lower()})</em></li>' for s, sh in usos)
        out += f'''<article class="day d{n}"><header><span class="dn">Diária {n}</span><h3>{cid}</h3><p>{e(narr)}</p></header>
<div class="chips">{chips}</div>
<h4>Locações</h4><ul class="locs">{"".join(f"<li>{e(l)}</li>" for l in locs)}</ul>
<h4>Planos que o filme usa</h4><ul class="uses">{lista}</ul></article>'''
    return out

def entrevistas():
    out = ""
    for org, c, qs in ENTREVISTAS:
        out += (f'<article class="iv"><div class="fr">{frame(sc_facade(org, c))}</div><div class="fr">{frame(sc_interview(c))}</div>'
                f'<div><h3>{org}</h3><ol>{"".join(f"<li>{e(q)}</li>" for q in qs)}</ol></div></article>')
    return out

CSS = '''
:root{--primary:#00578d;--deep:#024a77;--navy:#002860;--sky:#00adee;--orange:#f08522;--green:#8bc53f;--pink:#e5287b;
--bg:#f7f9fb;--surface:#fff;--ink:#3c3c3b;--muted:#555d67;--line:#e9e9e9;--line2:#c8c8c8;color-scheme:light}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.55 "Nunito Sans",system-ui,sans-serif}
.wrap{max-width:1180px;margin:0 auto;padding:0 20px 80px}
.hero{background:var(--deep);color:#fff;padding:52px 0 40px}
.hero .wrap{padding-bottom:0}
.eb{font-weight:800;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--sky)}
h1{font-weight:300;font-size:clamp(34px,6vw,60px);line-height:1.05;margin:10px 0 0;letter-spacing:-.01em}
h1 b{font-weight:900}
.hero p{max-width:70ch;color:#d6e6f1;margin:16px 0 0}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:16px}
.chip{font-size:12px;font-weight:700;padding:4px 10px;border-radius:4px;border:1px solid var(--line2);color:var(--muted);background:#fff}
.hero .chip{background:transparent;border-color:rgba(255,255,255,.35);color:#fff}
.bar{position:sticky;top:0;z-index:5;background:rgba(247,249,251,.94);backdrop-filter:blur(6px);border-bottom:1px solid var(--line);padding:12px 0}
.tl{display:flex;height:44px;border-radius:6px;overflow:hidden;gap:2px}
.tl a{background:var(--c);color:#fff;text-decoration:none;display:flex;flex-direction:column;justify-content:center;padding:0 8px;min-width:0;font-size:11px;line-height:1.15}
.tl a b{font-weight:900}.tl a span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:600;opacity:.92}
.ticks{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-top:4px}
.tog{display:flex;gap:16px;align-items:center;font-size:13px;color:var(--muted);margin-top:8px;flex-wrap:wrap}
.tog label{display:flex;gap:6px;align-items:center;cursor:pointer}
body.nolibras .libras{display:none}
h2,h3,h4{margin:0}
.sec{background:var(--surface);border:1px solid var(--line);border-top:5px solid var(--c);border-radius:8px;padding:22px;margin-top:26px;box-shadow:0 2px 10px rgba(0,87,141,.06)}
.sh{display:flex;gap:14px;align-items:center}
.no{font-weight:900;font-size:34px;color:var(--c);line-height:1}
.sh h2{font-size:22px;font-weight:800;color:var(--ink)}
.when{margin:0;color:var(--muted);font-size:13px;font-weight:700}
.idea{margin:10px 0 16px;font-size:16px;color:var(--primary);font-weight:600}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}
.shot{margin:0}
.fr{border-radius:6px;overflow:hidden;border:1px solid var(--line);aspect-ratio:16/9;background:#000}
.fr svg{display:block;width:100%;height:100%}
figcaption{display:flex;flex-wrap:wrap;gap:4px 6px;align-items:center;margin-top:6px;font-size:12px}
.tc{font-weight:900;color:var(--ink);font-variant-numeric:tabular-nums}
.pl{font-weight:700;color:#fff;background:var(--primary);padding:1px 6px;border-radius:3px;font-size:11px}
.dd{font-weight:700;padding:1px 6px;border-radius:3px;font-size:11px;border:1px solid var(--line2);color:var(--muted)}
.dd.d1{border-color:#00adee;color:#007fb0}.dd.d2{border-color:#8bc53f;color:#4d7a17}.dd.d3{border-color:#e5287b;color:#b3125b}.dd.d4{border-color:#f08522;color:#b05a0c}
.ds{flex-basis:100%;color:var(--muted)}
.info{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:22px;margin-top:20px;padding-top:18px;border-top:1px solid var(--line)}
@media(max-width:780px){.info{grid-template-columns:1fr}}
.info h3,dt{font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--c)}
.loc p{margin:6px 0 0;font-size:15px;padding-left:12px;border-left:2px solid var(--line2)}
dl{margin:0}dd{margin:4px 0 14px;font-size:14px}
.block{margin-top:44px}
.block>h2{font-size:26px;font-weight:300;color:var(--primary)}
.block>h2 b{font-weight:900}
.block>p{color:var(--muted);max-width:75ch;margin:6px 0 0}
.days{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;margin-top:16px}
.day{background:#fff;border:1px solid var(--line);border-radius:8px;padding:18px;border-top:5px solid}
.day.d1{border-top-color:#00adee}.day.d2{border-top-color:#8bc53f}.day.d3{border-top-color:#e5287b}.day.d4{border-top-color:#f08522}
.dn{font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.day h3{font-size:22px;font-weight:900;color:var(--ink)}
.day header p{margin:2px 0 0;color:var(--primary);font-weight:600;font-size:14px}
.day h4{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-top:14px}
.day ul{margin:6px 0 0;padding-left:18px;font-size:13px}
.uses li{margin-bottom:3px}.uses em{color:var(--muted)}
.iv{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) minmax(0,1.3fr);gap:14px;background:#fff;border:1px solid var(--line);border-radius:8px;padding:16px;margin-top:14px;align-items:start}
@media(max-width:780px){.iv{grid-template-columns:1fr}}
.iv h3{font-size:18px;font-weight:900}.iv ol{margin:6px 0 0;padding-left:18px;font-size:14px}
.notes{background:#fff;border:1px solid var(--line);border-left:5px solid var(--orange);border-radius:8px;padding:18px 22px;margin-top:16px}
.notes li{margin-bottom:8px}
.notes b{color:var(--ink)}
'''

def page():
    total = SECOES[-1]["t1"]
    n_shots = sum(len(s["shots"]) for s in SECOES)
    return f'''<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Storyboard · Eletroposto CELESC · vídeo de encerramento</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800;900&display=swap">
<style>{CSS}</style></head>
<body>
<div class="hero"><div class="wrap">
  <div class="eb">Storyboard · vídeo de encerramento</div>
  <h1>O que começou como pesquisa <b>virou caminho.</b></h1>
  <p>Eletroposto CELESC: de P&amp;D a serviço implantado. O carro elétrico é o fio condutor e percorre Santa Catarina enquanto a locução conta a evolução do projeto: P&amp;D → infraestrutura → experiência do usuário → tarifação → modelo de negócio → futuro.</p>
  <div class="chips"><span class="chip">16:9 · 1920×1080</span><span class="chip">{fmt(total)} · institucional</span><span class="chip">Voz em off</span><span class="chip">{n_shots} quadros</span><span class="chip">4 diárias</span><span class="chip">Janela de Libras</span><span class="chip">CELESC + Fundação CERTI</span></div>
</div></div>
<div class="bar"><div class="wrap" style="padding-bottom:0">{timeline()}
  <div class="tog"><label><input type="checkbox" id="lb" checked> Mostrar janela de Libras nos quadros</label><span>Quadros ilustrados: servem para combinar enquadramento e ordem. Serão trocados pelos quadros reais depois da gravação.</span></div>
</div></div>
<div class="wrap">
{"".join(card(s) for s in SECOES)}

<div class="block"><h2>Depoimentos <b>CELESC e CERTI</b></h2>
<p>Gravados na Diária 1, nas sedes, com o carro e uma paisagem ao fundo (externa). O roteiro ainda não define onde entram. Sugestão para aprovar: trechos curtos de 5 a 8 s, por exemplo a CERTI depois da abertura (o desafio inicial) e a CELESC no modelo de negócio (o legado). Isso exige encurtar a locução ou passar de 3:00.</p>
{entrevistas()}</div>

<div class="block"><h2>Plano de <b>captação por diária</b></h2>
<p>Uma cidade por dia. Todo ponto em 4 enquadramentos: grande angular, plano médio, close-up e drone. Abaixo, os planos que o storyboard já usa de cada diária.</p>
<div class="days">{diarias()}</div></div>

<div class="block"><h2>Pontos a <b>confirmar</b></h2>
<ul class="notes">
<li><b>Números da rede:</b> o briefing novo informa 36 estações em 31 municípios; o roteiro anterior dizia 48 em 38. O storyboard usa 36 / 31 e +1.500 km. Confirmar o dado oficial no fechamento.</li>
<li><b>Janela de Libras:</b> canto inferior direito, mais ou menos 1/4 da largura e metade da altura. Por isso os textos e números ficam à esquerda. Confirmar com o intérprete o tamanho e se haverá recorte ou fundo.</li>
<li><b>Imagens de arquivo</b> das primeiras estações (2015): pedir à CELESC.</li>
<li><b>Logo da CELESC:</b> o arquivo oficial ainda não está no repositório.</li>
<li><b>Estação ultrarrápida em Joinville:</b> confirmar se já está instalada antes da diária. O valor “150 kW” no quadro é só ilustração.</li>
<li><b>Plano final:</b> o roteiro fecha com o carro numa estrada (BR-101). Alternativa forte: fechar sobre a Ponte Anita Garibaldi, que representa conexão, como sugere o plano de captação. Vale gravar os dois na Diária 4.</li>
<li><b>Nomes nos depoimentos:</b> só se vocês quiserem lettering com nome e cargo; nesse caso, enviar nome e cargo de cada entrevistado.</li>
</ul></div>
</div>
<script>document.getElementById('lb').addEventListener('change',e=>document.body.classList.toggle('nolibras',!e.target.checked));</script>
</body></html>'''

if __name__ == "__main__":
    (AQUI / "storyboard.html").write_text(page(), encoding="utf-8")
    print("ok", (AQUI / "storyboard.html").stat().st_size)
