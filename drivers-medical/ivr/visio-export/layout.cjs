const {dagre,data}=require('./extract.cjs');
const fs=require('fs');
const C=data.PHONE;
const byId={},laneOf={};
C.lanes.forEach((ln,i)=>{ln.n=i+1; ln.nodes.forEach(n=>{byId[n.id]=n; laneOf[n.id]=ln;});});
const OIN={}; data.OI.forEach(o=>(o.n||[]).forEach(k=>{ if(k.startsWith('phone:')) (OIN[k.slice(6)]=OIN[k.slice(6)]||[]).push(o);}));
// size in points (72/in)
function lines(t,cpl){ const w=t.split(' '); let L=1,s=0; w.forEach(x=>{ if(s+x.length+1>cpl&&s){L++;s=x.length;} else s+=x.length+1;}); return L; }
function size(n){
  const reqs=(n.r||[]).join(', ');
  if(n.type==='q'){ const W=200; const L=lines(n.l,26)+(reqs?lines(reqs,34):0); return {w:W,h:Math.max(100,L*13+56)}; }
  if(n.type==='go'||n.type==='from'){ return {w:170,h:Math.max(44,lines(n.l,30)*12+20)}; }
  const W=180; const L=lines(n.l,30)+(reqs?lines(reqs,36):0); return {w:W,h:Math.max(50,L*13+22)};
}
const out={lanes:[],generated:new Date().toISOString().slice(0,10)};
for(const ln of C.lanes){
  const g=new dagre.graphlib.Graph({multigraph:true}); g.setGraph({rankdir:'TB',nodesep:40,ranksep:46,edgesep:20,marginx:30,marginy:30}); g.setDefaultEdgeLabel(()=>({}));
  const nodes=ln.nodes.map(n=>{
    const o={id:n.id,type:n.type,k:n.k||'req',l:n.l,r:n.r||[],d:n.d||'',asis:!!n.asis,dflt:n.dflt||''};
    if(n.type==='go'){ const t=laneOf[n.to]; o.l=n.l||`Go to lane ${t.n}: ${t.t}`; o.toLane=t.n; o.toNode=byId[n.to].l; }
    o.scripts=(n.sc||[]).map(k=>({k,...data.SCRIPTS[k]})).filter(s=>s.t);
    o.oi=(OIN[n.id]||[]).map(x=>x.t);
    return o; });
  // incoming references from other lanes
  const inc={};
  C.lanes.forEach(l2=>{ if(l2===ln) return; l2.nodes.forEach(n=>{ if(n.type==='go'&&laneOf[n.to]===ln){ const key=n.to; (inc[key]=inc[key]||[]).push(l2.n);} });});
  const edges=ln.edges.map(e=>({from:e[0],to:e[1],l:e[2]||''}));
  Object.entries(inc).forEach(([to,ls],i)=>{ const u=[...new Set(ls)].sort(); const id='from_'+to;
    nodes.push({id,type:'from',k:'ref',l:`From lane${u.length>1?'s':''} ${u.join(' and ')}: ${u.map(x=>C.lanes[x-1].t).join('; ')}`,r:[],d:'',scripts:[],oi:[]}); edges.push({from:id,to,l:''}); });
  nodes.forEach(n=>{ const s=size(n); n.w=s.w; n.h=s.h; g.setNode(n.id,{width:s.w,height:s.h}); });
  edges.forEach((e,i)=>{ const lab=e.l?{width:Math.min(150,e.l.length*5.2+10),height:Math.max(16,lines(e.l,28)*11+6),labelpos:'c'}:{}; g.setEdge(e.from,e.to,lab,'e'+i); e.name='e'+i; });
  dagre.layout(g);
  nodes.forEach(n=>{ const p=g.node(n.id); n.x=p.x; n.y=p.y; });
  edges.forEach(e=>{ const p=g.edge(e.from,e.to,e.name); e.pts=p.points; if(e.l){e.lx=p.x; e.ly=p.y; e.lw=p.width; e.lh=p.height;} });
  const G=g.graph();
  out.lanes.push({n:ln.n,id:ln.id,t:ln.t,W:G.width,H:G.height,nodes,edges});
}
// overview: lane links
const links={}; C.lanes.forEach(ln=>ln.nodes.forEach(n=>{ if(n.type==='go'){ const t=laneOf[n.to].n; links[ln.n+'>'+t]=1; }}));
out.links=Object.keys(links).map(k=>k.split('>').map(Number));
{ const g=new dagre.graphlib.Graph(); g.setGraph({rankdir:'TB',nodesep:50,ranksep:60,marginx:30,marginy:30}); g.setDefaultEdgeLabel(()=>({}));
  C.lanes.forEach(ln=>g.setNode('L'+ln.n,{width:200,height:60}));
  out.links.forEach(([a,b])=>g.setEdge('L'+a,'L'+b));
  dagre.layout(g);
  out.overview={W:g.graph().width,H:g.graph().height,nodes:C.lanes.map(ln=>({n:ln.n,t:ln.t,x:g.node('L'+ln.n).x,y:g.node('L'+ln.n).y,w:200,h:60})),
    edges:out.links.map(([a,b])=>({from:a,to:b,pts:g.edge('L'+a,'L'+b).points}))}; }

// whole flow: go markers become real connections, lanes become clusters
{ const g=new dagre.graphlib.Graph({multigraph:true,compound:true}); g.setGraph({rankdir:'TB',nodesep:40,ranksep:50,edgesep:20,marginx:30,marginy:30}); g.setDefaultEdgeLabel(()=>({}));
  const goTo={}; out.lanes.forEach(ln=>ln.nodes.forEach(n=>{ if(n.type==='go') goTo[n.id]=byId[n.id].to; }));
  const nodes=[], edges=[];
  out.lanes.forEach(ln=>{ g.setNode('lane_'+ln.id,{label:'',paddingTop:44,paddingLeft:16,paddingRight:16,paddingBottom:16});
    ln.nodes.forEach(n=>{ if(n.type==='go'||n.type==='from') return; const c={...n,lane:ln.n}; nodes.push(c); g.setNode(n.id,{width:n.w,height:n.h}); g.setParent(n.id,'lane_'+ln.id); });
    ln.edges.forEach(e=>{ if(e.from.startsWith('from_')) return; const to=goTo[e.to]||e.to; edges.push({from:e.from,to,l:e.l,cross:!!goTo[e.to]}); }); });
  edges.forEach((e,i)=>{ const lab=e.l?{width:Math.min(150,e.l.length*5.2+10),height:Math.max(16,lines(e.l,28)*11+6),labelpos:'c'}:{}; e.name='w'+i; g.setEdge(e.from,e.to,lab,e.name); });
  dagre.layout(g);
  nodes.forEach(n=>{ const p=g.node(n.id); n.x=p.x; n.y=p.y; });
  edges.forEach(e=>{ const p=g.edge(e.from,e.to,e.name); e.pts=p.points; if(e.l){e.lx=p.x; e.ly=p.y; e.lw=p.width; e.lh=p.height;} });
  const bands=out.lanes.map(ln=>{ const p=g.node('lane_'+ln.id); return {n:ln.n,t:ln.t,x:p.x,y:p.y,w:p.width,h:p.height}; });
  out.whole={W:g.graph().width,H:g.graph().height,nodes,edges,bands};
  console.log('whole',Math.round(g.graph().width),Math.round(g.graph().height),nodes.length,edges.length,edges.filter(e=>e.cross).length);
}
fs.writeFileSync(process.argv[2],JSON.stringify(out,null,1));
console.log(out.lanes.map(l=>[l.n,Math.round(l.W),Math.round(l.H),l.nodes.length]), out.links);
