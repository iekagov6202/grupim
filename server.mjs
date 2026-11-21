
import http from "node:http"; import fs from "node:fs"; import path from "node:path";
const root=process.cwd();
http.createServer((req,res)=>{
 const url=new URL(req.url,"http://localhost");
 if(url.pathname==="/health"){res.writeHead(200,{"Content-Type":"application/json"});return res.end('{"ok":true}');}
 const file=path.join(root,url.pathname==="/"?"index.html":url.pathname);
 if(!file.startsWith(root)){res.writeHead(403);return res.end("Forbidden");}
 fs.readFile(file,(e,b)=>{if(e){res.writeHead(404);return res.end("Not found");}res.writeHead(200,{"Content-Type":file.endsWith(".html")?"text/html":"application/octet-stream"});res.end(b);});
}).listen(3000,()=>console.log("Local preview: http://localhost:3000"));
