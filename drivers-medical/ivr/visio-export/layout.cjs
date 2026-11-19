// Lay out the routing map's phone and web chat flows with dagre.
// Usage: MAP=path/to/newco-routing-map.html node layout.cjs out.json
const {dagre, data} = require('./extract.cjs');
const fs = require('fs');

function lines(t, cpl) { const w = t.split(' '); let L = 1, s = 0; w.forEach(x => { if (s + x.length + 1 > cpl && s) { L++; s = x.length; } else s += x.length + 1; }); return L; }
// sizes in points (72 to the inch)
function size(n) {
  const reqs = (n.r || []).join(', ');
  if (n.type === 'q') { const L = lines(n.l, 26) + (reqs ? lines(reqs, 34) : 0); return {w: 200, h: Math.max(100, L * 13 + 56)}; }
  if (n.type === 'go' || n.type === 'from') return {w: 170, h: Math.max(44, lines(n.l, 30) * 12 + 20)};
  const L = lines(n.l, 30) + (reqs ? lines(reqs, 36) : 0); return {w: 180, h: Math.max(50, L * 13 + 22)};
}
function label(e) { return e.l ? {width: Math.min(150, e.l.length * 5.2 + 10), height: Math.max(16, lines(e.l, 28) * 11 + 6), labelpos: 'c'} : {}; }
function graph(opts) { const g = new dagre.graphlib.Graph(opts); g.setDefaultEdgeLabel(() => ({})); return g; }

function channel(C) {
  const byId = {}, laneOf = {};
  C.lanes.forEach((ln, i) => { ln.n = i + 1; ln.nodes.forEach(n => { byId[n.id] = n; laneOf[n.id] = ln; }); });
  const OIN = {};
  data.OI.forEach(o => (o.n || []).forEach(k => { const [ch, id] = k.split(':'); if (ch === C.key) (OIN[id] = OIN[id] || []).push(o); }));
  const groupT = g => (C.groups || []).find(x => x.id === g)?.t || '';
  const out = {key: C.key, name: C.name, groups: C.groups || null, lanes: []};

  // ---- one graph per lane
  for (const ln of C.lanes) {
    const g = graph({multigraph: true});
    g.setGraph({rankdir: 'TB', nodesep: 40, ranksep: 46, edgesep: 20, marginx: 30, marginy: 30});
    const nodes = ln.nodes.map(n => {
      const o = {id: n.id, type: n.type, k: n.k || 'req', l: n.l, r: n.r || [], d: n.d || '', asis: !!n.asis, back: !!n.back};
      if (n.type === 'go') { const t = laneOf[n.to]; o.toLane = t.n; o.toNode = byId[n.to].l; o.l = n.l || `Go to lane ${t.n}: ${t.t}`; }
      o.scripts = (n.sc || []).map(k => ({k, ...data.SCRIPTS[k]})).filter(s => s.t);
      o.oi = (OIN[n.id] || []).map(x => x.t);
      return o;
    });
    const edges = ln.edges.map(e => ({from: e[0], to: e[1], l: e[2] || ''}));
    // arrivals from other lanes
    const inc = {};
    C.lanes.forEach(l2 => { if (l2 === ln) return; l2.nodes.forEach(n => { if (n.type === 'go' && laneOf[n.to] === ln) (inc[n.to] = inc[n.to] || []).push(l2.n); }); });
    Object.entries(inc).forEach(([to, ls]) => {
      const u = [...new Set(ls)].sort((a, b) => a - b), id = 'from_' + to;
      nodes.push({id, type: 'from', k: 'ref', fromLane: u[0], l: `From lane${u.length > 1 ? 's' : ''} ${u.join(' and ')}: ${u.map(x => C.lanes[x - 1].t).join('; ')}`, r: [], d: '', scripts: [], oi: []});
      edges.push({from: id, to, l: ''});
    });
    nodes.forEach(n => { Object.assign(n, size(n)); g.setNode(n.id, {width: n.w, height: n.h}); });
    edges.forEach((e, i) => { e.name = 'e' + i; g.setEdge(e.from, e.to, label(e), e.name); });
    dagre.layout(g);
    nodes.forEach(n => { const p = g.node(n.id); n.x = p.x; n.y = p.y; });
    edges.forEach(e => { const p = g.edge(e.from, e.to, e.name); e.pts = p.points; if (e.l) Object.assign(e, {lx: p.x, ly: p.y, lw: p.width, lh: p.height}); });
    const H = Math.max(...nodes.map(n => n.y + n.h / 2), ...edges.flatMap(e => e.pts.map(p => p.y))) + 20;
    out.lanes.push({n: ln.n, id: ln.id, t: ln.t, g: ln.g || null, gt: groupT(ln.g), W: g.graph().width, H, nodes, edges});
  }

  // ---- overview: lanes and the links between them, grouped by design if there are groups
  {
    const g = graph({compound: true});
    g.setGraph({rankdir: 'TB', nodesep: 50, ranksep: 60, marginx: 30, marginy: 30});
    (C.groups || []).forEach(gr => g.setNode('G_' + gr.id, {paddingTop: 40, paddingLeft: 16, paddingRight: 16, paddingBottom: 16}));
    C.lanes.forEach(ln => { g.setNode('L' + ln.n, {width: 200, height: 60}); if (ln.g) g.setParent('L' + ln.n, 'G_' + ln.g); });
    const links = {};
    C.lanes.forEach(ln => ln.nodes.forEach(n => { if (n.type === 'go' && laneOf[n.to] !== ln) links[ln.n + '>' + laneOf[n.to].n] = 1; }));
    const pairs = Object.keys(links).map(k => k.split('>').map(Number));
    pairs.forEach(([a, b]) => g.setEdge('L' + a, 'L' + b));
    dagre.layout(g);
    out.overview = {
      W: g.graph().width, H: g.graph().height,
      nodes: C.lanes.map(ln => ({n: ln.n, t: ln.t, x: g.node('L' + ln.n).x, y: g.node('L' + ln.n).y, w: 200, h: 60})),
      edges: pairs.map(([a, b]) => ({from: a, to: b, pts: g.edge('L' + a, 'L' + b).points})),
      groups: (C.groups || []).map(gr => { const p = g.node('G_' + gr.id); return {id: gr.id, t: gr.t, x: p.x, y: p.y, w: p.width, h: p.height}; }),
    };
  }

  // ---- whole flow, one per design: "go to lane" markers become real arrows, lanes become bands.
  // "Back to" markers stay as markers, as they do on the map.
  const goTo = {};
  C.lanes.forEach(ln => ln.nodes.forEach(n => { if (n.type === 'go' && !n.back) goTo[n.id] = n.to; }));
  const sets = C.groups ? C.groups.map(gr => ({id: gr.id, t: gr.t, lanes: out.lanes.filter(l => l.g === gr.id)})) : [{id: null, t: '', lanes: out.lanes}];
  out.wholes = sets.map(set => {
    const g = graph({multigraph: true, compound: true});
    g.setGraph({rankdir: 'TB', nodesep: 40, ranksep: 50, edgesep: 20, marginx: 30, marginy: 30});
    const nodes = [], edges = [];
    set.lanes.forEach(ln => {
      g.setNode('lane_' + ln.id, {paddingTop: 44, paddingLeft: 16, paddingRight: 16, paddingBottom: 16});
      ln.nodes.forEach(n => {
        if (n.type === 'from' || (n.type === 'go' && !n.back)) return;
        nodes.push({...n, lane: ln.n}); g.setNode(n.id, {width: n.w, height: n.h}); g.setParent(n.id, 'lane_' + ln.id);
      });
      ln.edges.forEach(e => { if (e.from.startsWith('from_')) return; edges.push({from: e.from, to: goTo[e.to] || e.to, l: e.l}); });
    });
    edges.forEach((e, i) => { e.name = 'w' + i; g.setEdge(e.from, e.to, label(e), e.name); });
    dagre.layout(g);
    nodes.forEach(n => { const p = g.node(n.id); n.x = p.x; n.y = p.y; });
    edges.forEach(e => { const p = g.edge(e.from, e.to, e.name); e.pts = p.points; if (e.l) Object.assign(e, {lx: p.x, ly: p.y, lw: p.width, lh: p.height}); });
    const bands = set.lanes.map(ln => { const p = g.node('lane_' + ln.id); return {n: ln.n, t: ln.t, x: p.x, y: p.y, w: p.width, h: p.height}; });
    return {group: set.id, t: set.t, W: g.graph().width, H: g.graph().height, nodes, edges, bands};
  });
  return out;
}

const result = {generated: new Date().toISOString().slice(0, 10), channels: [channel(data.PHONE), channel(data.CHAT)]};
fs.writeFileSync(process.argv[2], JSON.stringify(result));
for (const c of result.channels)
  console.log(c.name + ':', c.lanes.length, 'lanes;', c.wholes.map(w => `whole flow${w.t ? ' (' + w.t + ')' : ''} ${w.nodes.length} steps, ${(w.W / 72).toFixed(0)}x${(w.H / 72).toFixed(0)}in`).join('; '));
