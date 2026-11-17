const os = require('os');
const http = require('http');
const WebSocket = require('ws');
const PORT = Number(process.env.PORT || 8080);
const server = http.createServer((req,res)=>{
  res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
  res.end('ZERO HOUR LAN server is running. Open index.html in the browser.');
});
const wss = new WebSocket.Server({server});
const clients = new Map();
let nextId = 1;
function snapshot(){ const o={}; for(const [id,p] of clients)o[id]=p; return o; }
function broadcast(data, except){
  const msg=JSON.stringify(data);
  for(const [id,p] of clients){ if(id!==except && p.ws.readyState===WebSocket.OPEN)p.ws.send(msg); }
}
wss.on('connection', ws=>{
  const id='p'+nextId++;
  const player={id,name:'لاعب',x:140,y:140,hp:100,mode:'coop',ws};
  clients.set(id,player);
  ws.send(JSON.stringify({type:'welcome',id,players:snapshot()}));
  broadcast({type:'players',players:snapshot()},id);
  ws.on('message', raw=>{
    let m; try{m=JSON.parse(raw.toString())}catch{return}
    if(m.type==='join'){
      player.name=String(m.name||'لاعب').slice(0,16);
      player.mode=m.mode==='versus'?'versus':'coop';
      broadcast({type:'players',players:snapshot()});
      return;
    }
    if(m.type==='move'){
      player.x=Math.max(0,Math.min(1500,Number(m.x)||0));
      player.y=Math.max(0,Math.min(1100,Number(m.y)||0));
      player.hp=Math.max(0,Math.min(100,Number(m.hp)||0));
      if(typeof m.name==='string')player.name=m.name.slice(0,16);
      player.mode=m.mode==='versus'?'versus':'coop';
      broadcast({type:'state',player:{id,name:player.name,x:player.x,y:player.y,hp:player.hp,mode:player.mode}},id);
    }
  });
  ws.on('close',()=>{clients.delete(id);broadcast({type:'left',id});broadcast({type:'players',players:snapshot()});});
});
server.listen(PORT,'0.0.0.0',()=>{
  console.log('\\nZERO HOUR LAN server listening on port '+PORT);
  for(const list of Object.values(os.networkInterfaces()))for(const n of list||[])if(n.family==='IPv4'&&!n.internal)console.log('Host address: ws://'+n.address+':'+PORT);
  console.log('Keep this window open while playing.\\n');
});
