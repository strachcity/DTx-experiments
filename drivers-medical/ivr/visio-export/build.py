"""Build a .vsdx flow of the NewCo phone and web chat routing from layout.json.

For each channel: an overview, the whole flow, and one page per lane. Shapes carry requirement IDs on the
face and notes, scripts and open questions as Shape Data.
"""
import json, sys, zipfile, math
from xml.sax.saxutils import escape

L = json.load(open(sys.argv[1]))
OUT = sys.argv[2]
PT = 1 / 72.0          # points to inches
MX, MTOP, MBOT = 0.5, 1.4, 0.5   # page margins in inches

NS = 'xmlns="http://schemas.microsoft.com/office/visio/2012/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"'

COL = {  # fill, line
    'req':   ('#D2E2F1', '#1D70B8'),
    'today': ('#FFFFFF', '#505A5F'),
    'prop':  ('#F3E1EC', '#D53880'),
    'ref':   ('#F3F2F1', '#505A5F'),
    'band':  ('#F8F8F8', '#B1B4B6'),
}
TXT = '#0B0C0C'


def a(v):  # attribute escape
    return escape(str(v), {'"': '&quot;'})


def cell(n, v, f=None, u=None):
    s = f'<Cell N="{n}" V="{a(v)}"'
    if u: s += f' U="{u}"'
    if f: s += f' F="{a(f)}"'
    return s + '/>'


def geom(points, w, h, nofill=False):
    """points as (x,y) fractions of Width/Height; closed polygon."""
    rows = [cell('NoFill', 1 if nofill else 0), cell('NoLine', 0), cell('NoShow', 0), cell('NoSnap', 0)]
    for i, (fx, fy) in enumerate(points):
        t = 'MoveTo' if i == 0 else 'LineTo'
        rows.append(f'<Row T="{t}" IX="{i+1}">' + cell('X', round(w*fx,5), f'Width*{fx}') + cell('Y', round(h*fy,5), f'Height*{fy}') + '</Row>')
    return '<Section N="Geometry" IX="0">' + ''.join(rows) + '</Section>'


RECT = [(0, 0), (1, 0), (1, 1), (0, 1), (0, 0)]
DIAMOND = [(0.5, 0), (1, 0.5), (0.5, 1), (0, 0.5), (0.5, 0)]
TERM = [(0.07, 0), (0.93, 0), (1, 0.5), (0.93, 1), (0.07, 1), (0, 0.5), (0.07, 0)]
PENT = [(0, 1), (1, 1), (1, 0.3), (0.5, 0), (0, 0.3), (0, 1)]


def fix_geom(xml, w, h):
    # put real values in V as well as formulas (helps viewers that don't evaluate F)
    return xml


def shape_xml(sid, name, x, y, w, h, kind, lines, props=(), link=None, bold_first=True):
    """x,y centre in inches. lines: list of (text, char_row)."""
    fill, line = COL[kind['col']]
    pts = {'rect': RECT, 'diamond': DIAMOND, 'pent': PENT, 'term': TERM, 'text': RECT}[kind['geo']]
    c = [cell('PinX', x), cell('PinY', y), cell('Width', w), cell('Height', h),
         cell('LocPinX', w / 2, 'Width*0.5'), cell('LocPinY', h / 2, 'Height*0.5'),
         cell('Angle', 0), cell('FlipX', 0), cell('FlipY', 0), cell('ResizeMode', 0)]
    if kind['geo'] == 'text':
        c += [cell('LinePattern', 0), cell('FillPattern', 0)]
    else:
        c += [cell('LineWeight', 1.25 * PT, u='PT'), cell('LineColor', line), cell('LinePattern', 1),
              cell('FillForegnd', fill), cell('FillPattern', 1)]
    if kind['geo'] == 'rect': c.append(cell('Rounding', 0.06))
    if kind.get('heavy'): c[c.index(cell('LineWeight', 1.25 * PT, u='PT'))] = cell('LineWeight', 2.25 * PT, u='PT')
    if kind['geo'] == 'diamond':
        tw, th = w * 0.72, h * 0.8
    elif kind['geo'] == 'term':
        tw, th = w * 0.86, h
    elif kind['geo'] == 'pent':
        tw, th = w, h * 0.7
    else:
        tw, th = w, h
    tpy = h * 0.35 + th / 2 if kind['geo'] == 'pent' else h / 2
    c += [cell('TxtPinX', w / 2, 'Width*0.5'), cell('TxtPinY', tpy), cell('TxtWidth', tw), cell('TxtHeight', th),
          cell('TxtLocPinX', tw / 2, 'TxtWidth*0.5'), cell('TxtLocPinY', th / 2, 'TxtHeight*0.5'), cell('TxtAngle', 0),
          cell('VerticalAlign', kind.get('valign', 1)), cell('LeftMargin', 4 * PT, u='PT'), cell('RightMargin', 4 * PT, u='PT'),
          cell('TopMargin', 3 * PT, u='PT'), cell('BottomMargin', 3 * PT, u='PT')]
    sizes = kind.get('sizes', [9, 7])
    chars = ''.join(
        f'<Row IX="{i}">' + cell('Color', TXT if i == 0 else '#505A5F') + cell('Size', s * PT, u='PT') +
        cell('Style', 1 if (i == 0 and bold_first) else 0) + '</Row>' for i, s in enumerate(sizes))
    para = '<Section N="Paragraph"><Row IX="0">' + cell('HorzAlign', kind.get('align', 1)) + '</Row></Section>'
    prop = ''
    if props:
        rows = []
        for i, (lab, val) in enumerate(props):
            rows.append(f'<Row N="P{i}">' + cell('Value', val, u='STR') + cell('Label', lab, u='STR') +
                        cell('Type', 0) + cell('Prompt', '', u='STR') + cell('SortKey', f'{i:02d}', u='STR') +
                        cell('Invisible', 0) + '</Row>')
        prop = '<Section N="Property">' + ''.join(rows) + '</Section>'
    hl = ''
    if link:
        hl = ('<Section N="Hyperlink"><Row N="Row_1">' + cell('Description', link[1], u='STR') + cell('Address', '', u='STR') +
              cell('SubAddress', link[0], u='STR') + cell('ExtraInfo', '', u='STR') + cell('Frame', '', u='STR') +
              cell('NewWindow', 0) + cell('Default', 1) + cell('Invisible', 0) + '</Row></Section>')
    text = ''.join(f'<cp IX="{r}"/>{escape(t)}' for t, r in lines)
    g = '' if kind['geo'] == 'text' else geom(pts, w, h)
    return (f'<Shape ID="{sid}" NameU="{a(name)}" Name="{a(name)}" Type="Shape" LineStyle="0" FillStyle="0" TextStyle="0">'
            + ''.join(c) + f'<Section N="Character">{chars}</Section>' + para + prop + hl + g + f'<Text>{text}</Text></Shape>')


def conn_xml(sid, src, dst, pts, label=None, lab_xy=None, lab_wh=None):
    """pts: list of page-inch points, begin..end."""
    bx, by = pts[0]; ex, ey = pts[-1]
    w, h = ex - bx, ey - by
    c = [cell('PinX', (bx + ex) / 2, 'GUARD((BeginX+EndX)/2)'), cell('PinY', (by + ey) / 2, 'GUARD((BeginY+EndY)/2)'),
         cell('Width', w, 'GUARD(EndX-BeginX)'), cell('Height', h, 'GUARD(EndY-BeginY)'),
         cell('LocPinX', w / 2, 'GUARD(Width*0.5)'), cell('LocPinY', h / 2, 'GUARD(Height*0.5)'),
         cell('Angle', 0), cell('FlipX', 0), cell('FlipY', 0),
         cell('BeginX', bx, '_WALKGLUE(BegTrigger,EndTrigger,WalkPreference)'),
         cell('BeginY', by, '_WALKGLUE(BegTrigger,EndTrigger,WalkPreference)'),
         cell('EndX', ex, '_WALKGLUE(EndTrigger,BegTrigger,WalkPreference)'),
         cell('EndY', ey, '_WALKGLUE(EndTrigger,BegTrigger,WalkPreference)'),
         cell('BegTrigger', 2, f'_XFTRIGGER(Sheet.{src}!EventXFMod)'),
         cell('EndTrigger', 2, f'_XFTRIGGER(Sheet.{dst}!EventXFMod)'),
         cell('ObjType', 2), cell('LineWeight', 1 * PT, u='PT'), cell('LineColor', '#0B0C0C'), cell('LinePattern', 1),
         cell('EndArrow', 4), cell('EndArrowSize', 2), cell('FillPattern', 0), cell('ShapeRouteStyle', 0),
         cell('ConLineRouteExt', 0)]
    text = ''
    if label:
        lx, ly = lab_xy[0] - bx, lab_xy[1] - by
        tw, th = lab_wh
        c += [cell('TxtPinX', lx), cell('TxtPinY', ly), cell('TxtWidth', tw), cell('TxtHeight', th),
              cell('TxtLocPinX', tw / 2, 'TxtWidth*0.5'), cell('TxtLocPinY', th / 2, 'TxtHeight*0.5'), cell('TxtAngle', 0),
              cell('TextBkgnd', '#FFFFFF'), cell('TextBkgndTrans', 0), cell('VerticalAlign', 1),
              cell('LeftMargin', 1 * PT, u='PT'), cell('RightMargin', 1 * PT, u='PT'),
              cell('TopMargin', 1 * PT, u='PT'), cell('BottomMargin', 1 * PT, u='PT')]
        text = (f'<Section N="Character"><Row IX="0">' + cell('Color', '#1D70B8') + cell('Size', 8 * PT, u='PT') +
                cell('Style', 1) + '</Row></Section><Section N="Paragraph"><Row IX="0">' + cell('HorzAlign', 1) +
                f'</Row></Section>')
    rows = [cell('NoFill', 1), cell('NoLine', 0), cell('NoShow', 0), cell('NoSnap', 0),
            '<Row T="MoveTo" IX="1">' + cell('X', 0) + cell('Y', 0) + '</Row>']
    for i, (px, py) in enumerate(pts[1:]):
        rows.append(f'<Row T="LineTo" IX="{i+2}">' + cell('X', round(px - bx, 5)) + cell('Y', round(py - by, 5)) + '</Row>')
    g = '<Section N="Geometry" IX="0">' + ''.join(rows) + '</Section>'
    body = f'<Text>{escape(label)}</Text>' if label else ''
    return (f'<Shape ID="{sid}" NameU="Dynamic connector.{sid}" Name="Dynamic connector.{sid}" Type="Shape" LineStyle="0" FillStyle="0" TextStyle="0">'
            + ''.join(c) + text + g + body + '</Shape>',
            f'<Connect FromSheet="{sid}" FromCell="BeginX" FromPart="9" ToSheet="{src}" ToCell="PinX" ToPart="3"/>'
            f'<Connect FromSheet="{sid}" FromCell="EndX" FromPart="12" ToSheet="{dst}" ToCell="PinX" ToPart="3"/>')


KIND = {
    'step': lambda k: {'geo': 'rect', 'col': k},
    'q':    lambda k: {'geo': 'diamond', 'col': k},
    'end':  lambda k: {'geo': 'term', 'col': k, 'heavy': True},
    'go':   lambda k: {'geo': 'pent', 'col': 'ref'},
    'from': lambda k: {'geo': 'pent', 'col': 'ref'},
}
TYPE_WORD = {'step': 'Step', 'q': 'Question', 'end': 'End of route', 'go': 'Go to another lane', 'from': 'Arrives from another lane'}
KIND_WORD = {'req': 'NewCo (from the requirements)', 'today': 'Today (BAU, unchanged)', 'prop': 'Proposed, not agreed', 'ref': 'Link between lanes'}

pages = []  # (name, w, h, shapes_xml, connects_xml)
SHORT = {'phone': 'Phone', 'chat': 'Web chat'}
GROUP_SHORT = {'pref': 'A', 'cur': 'B'}


def title_shape(sid, W, H, big, small, size=18):
    return shape_xml(sid, 'Title', W / 2, H - 0.55, W - 1.0, 0.8, {'geo': 'text', 'col': 'req', 'sizes': [size, size * 0.55], 'align': 0},
                     [(big + '\n', 0), (small, 1)])


def text_shape(sid, name, x, y, w, h, text, size=9, bold=False):
    return shape_xml(sid, name, x, y, w, h, {'geo': 'text', 'col': 'req', 'sizes': [size], 'align': 0}, [(text, 0)], bold_first=bold)


def node_shape(sid, n, X, Y, names, lane_t):
    k = n['k'] if n['k'] in COL else 'req'
    kind = KIND[n['type']](k)
    lines = [(n['l'], 0)]
    if n['r']:
        lines = [(n['l'] + '\n', 0), (', '.join(n['r']), 1)]
    props = [('Step ID', n['id']), ('Type', TYPE_WORD[n['type']]), ('Status', KIND_WORD.get(n['k'], ''))]
    if 'lane' in n: props.append(('Lane', f"Lane {n['lane']}: {lane_t[n['lane']]}"))
    if n['r']: props.append(('Requirements', ', '.join(n['r'])))
    if n['d']: props.append(('Notes', n['d']))
    for i, s in enumerate(n.get('scripts', [])):
        src = 'Wording from the requirements' if s.get('src') == 'req' else 'Draft wording, not agreed'
        props.append((f"Script {i+1}: {s.get('n','')}", f"{s['t']} ({src})"))
    if n.get('asis'): props.append(('Today’s wording', 'Not captured yet'))
    if n.get('oi'): props.append(('Open questions', '; '.join(n['oi'])))
    link = None
    if n['type'] == 'go':
        link = (names[n['toLane']], n['l'])
        props.append(('Continues at', f"Lane {n['toLane']}: {n['toNode']}"))
    if n['type'] == 'from':
        link = (names[n['fromLane']], f"Open lane {n['fromLane']}")
    return shape_xml(sid, n['id'], X(n['x']), Y(n['y']), n['w'] * PT, n['h'] * PT, kind, lines, props, link)


def edges_xml(sid, edges, ids, X, Y, sh, cn):
    for e in edges:
        pts = [(X(p['x']), Y(p['y'])) for p in e['pts']]
        if e['l']:
            s_, c = conn_xml(sid, ids[e['from']], ids[e['to']], pts, e['l'], (X(e['lx']), Y(e['ly'])), (e['lw'] * PT, e['lh'] * PT))
        else:
            s_, c = conn_xml(sid, ids[e['from']], ids[e['to']], pts)
        sh.append(s_); cn.append(c); sid += 1
    return sid


def whole_name(ch, w):
    return f"{SHORT[ch['key']]} {GROUP_SHORT[w['group']]} whole flow" if w['group'] else f"{SHORT[ch['key']]} whole flow"


def channel_pages(ch, other):
    S = SHORT[ch['key']]
    names = {ln['n']: f"{S} lane {ln['n']}" for ln in ch['lanes']}
    lane_t = {ln['n']: ln['t'] for ln in ch['lanes']}
    has_prop = any(n['k'] == 'prop' for ln in ch['lanes'] for n in ln['nodes'])

    # ---------- overview ----------
    ov = ch['overview']
    W = ov['W'] * PT + 2 * MX + 3.6
    has_prop = any(n['k'] == 'prop' for ln in ch['lanes'] for n in ln['nodes'])
    key_h = 0.2 + 0.65 + (6 if has_prop else 5) * 0.75 + 0.5 + 1.25 + len(ch['wholes']) * 0.65 + 0.6
    H = max(ov['H'] * PT + MTOP + MBOT, MTOP + key_h + MBOT)
    X = lambda px: MX + px * PT
    Y = lambda py: H - MTOP - py * PT
    sh, cn = [], []
    sid = 1
    sub = f"Built from the NewCo routing map on {L['generated']}. Select a lane to open its page."
    if ch['groups']:
        sub = (f"Built from the NewCo routing map on {L['generated']}. Two designs are shown: version A is preferred but not agreed yet. "
               "Select a lane to open its page.")
    sh.append(title_shape(sid, W, H, f"NewCo {S.lower()} routing: overview", sub)); sid += 1
    for gr in ov['groups']:
        sh.append(shape_xml(sid, f"Design {gr['id']}", X(gr['x']), Y(gr['y']), gr['w'] * PT, gr['h'] * PT,
                            {'geo': 'rect', 'col': 'band', 'sizes': [12], 'align': 0, 'valign': 0}, [(gr['t'], 0)])); sid += 1
    ids = {}
    for n in ov['nodes']:
        ids[n['n']] = sid
        sh.append(shape_xml(sid, f"Lane {n['n']}", X(n['x']), Y(n['y']), n['w'] * PT, n['h'] * PT, {'geo': 'rect', 'col': 'req', 'sizes': [10]},
                            [(f"Lane {n['n']}: {n['t']}", 0)], link=(names[n['n']], f"Open lane {n['n']}")))
        sid += 1
    for e in ov['edges']:
        pts = [(X(p['x']), Y(p['y'])) for p in e['pts']]
        s_, c = conn_xml(sid, ids[e['from']], ids[e['to']], pts); sh.append(s_); cn.append(c); sid += 1
    kx = MX + ov['W'] * PT + 0.6; ky = H - MTOP - 0.2
    sh.append(text_shape(sid, 'Key heading', kx + 1.4, ky, 2.8, 0.3, 'Key', 11, True)); sid += 1
    key = [('rect', 'req', 'NewCo step, from the requirements'), ('rect', 'today', 'Today: BAU, unchanged')]
    if has_prop: key.append(('rect', 'prop', 'Proposed, not agreed yet'))
    key += [('diamond', 'req', 'Question. Answers are on the arrows'), ('term', 'req', 'End of the route'),
            ('pent', 'ref', 'Go to, or arrive from, another lane. Select it to jump')]
    for i, (geo, col, txt) in enumerate(key):
        y = ky - 0.65 - i * 0.75
        sh.append(shape_xml(sid, f'Key {i}', kx + 0.45, y, 0.8, 0.5, {'geo': geo, 'col': col, 'heavy': geo == 'term'}, [('', 0)])); sid += 1
        sh.append(text_shape(sid, f'Key text {i}', kx + 2.0, y, 2.1, 0.6, txt)); sid += 1
    ny = ky - 0.65 - len(key) * 0.75 - 0.5
    notes = ('Each box shows the step and, underneath, the requirement IDs it implements. '
             'Notes, scripts and open questions for each step are in its Shape Data '
             '(right-click a shape, then Data, then Shape Data). '
             'The routing map web page is the master copy: if they differ, the map is right.')
    sh.append(text_shape(sid, 'Notes', kx + 1.45, ny, 2.9, 1.6, notes)); sid += 1
    for i, w in enumerate(ch['wholes']):
        lab = f"Open the whole flow, version {GROUP_SHORT[w['group']]}" if w['group'] else 'Open the whole flow on one page'
        sh.append(shape_xml(sid, f'Whole flow link {i}', kx + 1.45, ny - 1.25 - i * 0.65, 2.9, 0.5,
                            {'geo': 'rect', 'col': 'req', 'sizes': [10]}, [(lab, 0)], link=(whole_name(ch, w), lab))); sid += 1
    olab = f"Go to the {SHORT[other['key']].lower()} overview"
    sh.append(shape_xml(sid, 'Other channel link', kx + 1.45, ny - 1.25 - len(ch['wholes']) * 0.65, 2.9, 0.5,
                        {'geo': 'rect', 'col': 'ref', 'sizes': [10]}, [(olab, 0)], link=(f"{SHORT[other['key']]} overview", olab))); sid += 1
    pages.append((f'{S} overview', W, H, sh, cn))

    # ---------- whole flows ----------
    for w in ch['wholes']:
        W = w['W'] * PT + 2 * MX
        H = w['H'] * PT + MTOP + MBOT
        X = lambda px: MX + px * PT
        Y = lambda py: H - MTOP - py * PT
        sh, cn = [], []
        sid = 1
        t = f"NewCo {S.lower()} routing{', ' + w['t'] if w['t'] else ''}: the whole flow"
        sh.append(title_shape(sid, W, H, t, f"Every route on one page, built from the NewCo routing map on {L['generated']}. "
                                            "Grey bands are the lanes; each lane also has its own page.", 24)); sid += 1
        for b in w['bands']:
            sh.append(shape_xml(sid, f"Lane band {b['n']}", X(b['x']), Y(b['y']), b['w'] * PT, b['h'] * PT,
                                {'geo': 'rect', 'col': 'band', 'sizes': [14], 'align': 0, 'valign': 0},
                                [(f"Lane {b['n']}: {b['t']}", 0)], link=(names[b['n']], f"Open lane {b['n']} on its own page"))); sid += 1
        ids = {}
        for n in w['nodes']:
            ids[n['id']] = sid
            sh.append(node_shape(sid, n, X, Y, names, lane_t)); sid += 1
        sid = edges_xml(sid, w['edges'], ids, X, Y, sh, cn)
        pages.append((whole_name(ch, w), W, H, sh, cn))

    # ---------- lanes ----------
    for ln in ch['lanes']:
        W = max(ln['W'] * PT + 2 * MX, 8.27)
        H = ln['H'] * PT + MTOP + MBOT
        ox = MX + (W - 2 * MX - ln['W'] * PT) / 2
        X = lambda px: ox + px * PT
        Y = lambda py: H - MTOP - py * PT
        sh, cn = [], []
        sid = 1
        sh.append(title_shape(sid, W, H, f"{S}, lane {ln['n']}: {ln['t']}", f"NewCo {S.lower()} routing. Requirement IDs are under each step.")); sid += 1
        ids = {}
        for n in ln['nodes']:
            ids[n['id']] = sid
            sh.append(node_shape(sid, n, X, Y, names, lane_t)); sid += 1
        sid = edges_xml(sid, ln['edges'], ids, X, Y, sh, cn)
        pages.append((names[ln['n']], W, H, sh, cn))


phone, chat = L['channels']
channel_pages(phone, chat)
channel_pages(chat, phone)

# ---------- package ----------
def page_xml(shapes, connects):
    return (f'<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n<PageContents {NS} xml:space="preserve"><Shapes>'
            + ''.join(shapes) + '</Shapes>' + (f'<Connects>{"".join(connects)}</Connects>' if connects else '') + '</PageContents>')

def package(OUT, pages):
    pages_xml = [f'<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n<Pages {NS} xml:space="preserve">']
    for i, (name, w, h, _, _) in enumerate(pages):
        pages_xml.append(
            f'<Page ID="{i}" NameU="{a(name)}" Name="{a(name)}" ViewScale="-1" ViewCenterX="{w/2:.4f}" ViewCenterY="{h/2:.4f}"><PageSheet LineStyle="0" FillStyle="0" TextStyle="0">'
            + cell('PageWidth', round(w, 4)) + cell('PageHeight', round(h, 4)) + cell('ShdwOffsetX', 0.125) + cell('ShdwOffsetY', -0.125)
            + cell('PageScale', 1, u='IN_F') + cell('DrawingScale', 1, u='IN_F') + cell('DrawingSizeType', 0) + cell('DrawingScaleType', 0)
            + cell('InhibitSnap', 0) + cell('PageLockReplace', 0) + cell('PageLockDuplicate', 0) + cell('UIVisibility', 0)
            + cell('ShdwType', 0) + cell('ShdwObliqueAngle', 0) + cell('ShdwScaleFactor', 1) + cell('DrawingResizeType', 1)
            + cell('PageShapeSplit', 1) + cell('RouteStyle', 5) + cell('PlaceStyle', 1)
            + cell('PrintPageOrientation', 1 if h >= w else 2)
            + f'</PageSheet><Rel r:id="rId{i+1}"/></Page>')
    pages_xml.append('</Pages>')

    doc = (f'<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n<VisioDocument {NS} xml:space="preserve">'
           '<DocumentSettings TopPage="0" DefaultTextStyle="0" DefaultLineStyle="0" DefaultFillStyle="0" DefaultGuideStyle="0">'
           '<GlueSettings>9</GlueSettings><SnapSettings>65847</SnapSettings><SnapExtensions>34</SnapExtensions><SnapAngles/>'
           '<DynamicGridEnabled>1</DynamicGridEnabled><ProtectStyles>0</ProtectStyles><ProtectShapes>0</ProtectShapes>'
           '<ProtectMasters>0</ProtectMasters><ProtectBkgnds>0</ProtectBkgnds></DocumentSettings>'
           '<Colors><ColorEntry IX="0" RGB="#000000"/><ColorEntry IX="1" RGB="#FFFFFF"/></Colors>'
           '<FaceNames><FaceName NameU="Calibri" UnicodeRanges="-536859905 -1073732485 9 0" CharSets="536871423 0" Panose="2 15 5 2 2 2 4 3 2 4" Flags="325"/></FaceNames>'
           '<StyleSheets><StyleSheet ID="0" NameU="No Style" IsCustomNameU="1" Name="No Style" IsCustomName="1">'
           + cell('EnableLineProps', 1) + cell('EnableFillProps', 1) + cell('EnableTextProps', 1) + cell('HideForApply', 0)
           + cell('LineWeight', 0.01041666666666667) + cell('LineColor', 0) + cell('LinePattern', 1) + cell('Rounding', 0)
           + cell('EndArrowSize', 2) + cell('BeginArrow', 0) + cell('EndArrow', 0) + cell('LineCap', 0) + cell('BeginArrowSize', 2)
           + cell('LineColorTrans', 0) + cell('CompoundType', 0)
           + cell('FillForegnd', 1) + cell('FillBkgnd', 0) + cell('FillPattern', 1) + cell('ShdwForegnd', 0) + cell('ShdwPattern', 0)
           + cell('FillForegndTrans', 0) + cell('FillBkgndTrans', 0) + cell('ShdwForegndTrans', 0)
           + cell('LeftMargin', 0) + cell('RightMargin', 0) + cell('TopMargin', 0) + cell('BottomMargin', 0)
           + cell('VerticalAlign', 1) + cell('TextBkgnd', 0) + cell('DefaultTabStop', 0.5) + cell('TextDirection', 0)
           + cell('TextBkgndTrans', 0)
           + cell('QuickStyleLineColor', 100) + cell('QuickStyleFillColor', 100) + cell('QuickStyleShadowColor', 100)
           + cell('QuickStyleFontColor', 100) + cell('QuickStyleLineMatrix', 100) + cell('QuickStyleFillMatrix', 100)
           + cell('QuickStyleEffectsMatrix', 100) + cell('QuickStyleFontMatrix', 100) + cell('QuickStyleType', 0) + cell('QuickStyleVariation', 0)
           + '<Section N="Character"><Row IX="0">' + cell('Font', 'Calibri') + cell('Color', 0) + cell('Style', 0) + cell('Case', 0)
           + cell('Pos', 0) + cell('FontScale', 1) + cell('Size', 0.1666666666666667) + cell('DblUnderline', 0) + cell('Overline', 0)
           + cell('Strikethru', 0) + cell('DoubleStrikethrough', 0) + cell('Letterspace', 0) + cell('ColorTrans', 0) + cell('LangID', 'en-GB')
           + '</Row></Section><Section N="Paragraph"><Row IX="0">' + cell('IndFirst', 0) + cell('IndLeft', 0) + cell('IndRight', 0)
           + cell('SpLine', -1.2) + cell('SpBefore', 0) + cell('SpAfter', 0) + cell('HorzAlign', 1) + cell('Bullet', 0)
           + '</Row></Section></StyleSheet></StyleSheets></VisioDocument>')

    ct = ('<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
          '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
          '<Default Extension="xml" ContentType="application/xml"/>'
          '<Override PartName="/visio/document.xml" ContentType="application/vnd.ms-visio.drawing.main+xml"/>'
          '<Override PartName="/visio/pages/pages.xml" ContentType="application/vnd.ms-visio.pages+xml"/>'
          + ''.join(f'<Override PartName="/visio/pages/page{i+1}.xml" ContentType="application/vnd.ms-visio.page+xml"/>' for i in range(len(pages)))
          + '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>'
          '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>')
    rels = ('<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.microsoft.com/visio/2010/relationships/document" Target="visio/document.xml"/>'
            '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>'
            '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>')
    docrels = ('<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
               '<Relationship Id="rId1" Type="http://schemas.microsoft.com/visio/2010/relationships/pages" Target="pages/pages.xml"/></Relationships>')
    pagerels = ('<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
                + ''.join(f'<Relationship Id="rId{i+1}" Type="http://schemas.microsoft.com/visio/2010/relationships/page" Target="page{i+1}.xml"/>' for i in range(len(pages)))
                + '</Relationships>')
    core = ('<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '
            'xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
            '<dc:title>NewCo routing: phone and web chat</dc:title>'
            f'<dcterms:created xsi:type="dcterms:W3CDTF">{L["generated"]}T00:00:00Z</dcterms:created></cp:coreProperties>')
    app = ('<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties">'
           '<Application>Microsoft Visio</Application><Template></Template></Properties>')


    with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('[Content_Types].xml', ct)
        z.writestr('_rels/.rels', rels)
        z.writestr('docProps/core.xml', core)
        z.writestr('docProps/app.xml', app)
        z.writestr('visio/document.xml', doc)
        z.writestr('visio/_rels/document.xml.rels', docrels)
        z.writestr('visio/pages/pages.xml', ''.join(pages_xml))
        z.writestr('visio/pages/_rels/pages.xml.rels', pagerels)
        for i, (_, _, _, s, c) in enumerate(pages):
            z.writestr(f'visio/pages/page{i+1}.xml', page_xml(s, c))

package(OUT, pages)
if len(sys.argv) > 3:
    for k, pg in enumerate(pages):
        package(f'{sys.argv[3]}/p{k+1:02d}.vsdx', [pg])
print('pages', [(p[0], round(p[1], 1), round(p[2], 1), len(p[3])) for p in pages])
