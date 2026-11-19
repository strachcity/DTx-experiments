const fs=require('fs');
const html=fs.readFileSync(process.env.MAP||process.argv[2],'utf8');
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const module_={exports:{}}; new Function('module','exports',scripts[0])(module_,module_.exports);
const dagre=module_.exports;
const app=scripts[1];
const a=app.indexOf('const REQS'), b=app.indexOf('const CH = {phone:PHONE');
const data=new Function(app.slice(a,b)+'\nreturn {REQS,SCRIPTS,PHONE,CHAT,OI};')();
module.exports={dagre,data};
if(require.main===module){ const d=data; console.log(Object.keys(d), d.PHONE.lanes.map(l=>[l.id,l.t,l.nodes.length,l.edges.length]), [...new Set(d.PHONE.lanes.flatMap(l=>l.nodes.map(n=>n.type)))], [...new Set(d.PHONE.lanes.flatMap(l=>l.nodes.map(n=>n.k)))], Object.keys(d.PHONE)); console.log(JSON.stringify(d.PHONE.lanes[0].nodes.slice(0,2)), JSON.stringify(d.SCRIPTS[Object.keys(d.SCRIPTS)[0]]), JSON.stringify(d.OI[0])); }
