// Servidor opcional para prévia local. Nenhuma dependência ou build.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.mp4':'video/mp4','.woff2':'font/woff2','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif'};
http.createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
  let file;
  try {
    const pathname = decodeURIComponent(req.url.split('?')[0]);
    file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  } catch { res.writeHead(400).end(); return; }
  if (!file.startsWith(root + path.sep) || path.relative(root, file).split(path.sep).some(part => part.startsWith('.'))) {
    res.writeHead(403).end(); return;
  }
  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) { res.writeHead(404).end('Arquivo não encontrado'); return; }
    let start=0, end=stat.size-1;
    const headers={'Content-Type':types[path.extname(file)] || 'application/octet-stream','Accept-Ranges':'bytes','Cache-Control':'no-cache'};
    const range=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range || '');
    if (range) {
      start=Number(range[1]);end=range[2]?Math.min(Number(range[2]),end):end;
      if (start>end) { res.writeHead(416, {'Content-Range':`bytes */${stat.size}`}).end(); return; }
      headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`;
    }
    headers['Content-Length']=end-start+1;
    res.writeHead(range?206:200,headers);
    if (req.method==='HEAD') { res.end(); return; }
    const stream=fs.createReadStream(file,{start,end});
    stream.on('error',()=>res.destroy());req.on('close',()=>stream.destroy());stream.pipe(res);
  });
}).listen(4173,'127.0.0.1',()=>console.log('Portfólio: http://127.0.0.1:4173 — Ctrl+C para encerrar'));
