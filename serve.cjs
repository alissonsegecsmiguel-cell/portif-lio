// Servidor opcional para prévia local. Nenhuma dependência ou build.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const root = __dirname;
// Reproduz os redirecionamentos e rewrites do vercel.json (inclusive :path*).
const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const compile = rules => (rules || []).map(r => ({
  ...r, pattern: new RegExp('^' + r.source.replace(/\/:path\*$/, '(?:/(.*))?') + '$')
}));
const redirects = compile(vercel.redirects), rewrites = compile(vercel.rewrites);
const headerRules = compile(vercel.headers);
const applyRule = (r, match) => r.destination.replace('/:path*', match[1] ? '/' + match[1] : '');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.mp4':'video/mp4','.woff2':'font/woff2','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif'};
http.createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
  let file, requestPath;
  try {
    const [rawPath, query] = req.url.split('?');
    for (const r of redirects) {
      const match = r.pattern.exec(rawPath);
      if (!match) continue;
      res.writeHead(r.permanent ? 308 : 307, {Location: applyRule(r, match) + (query ? '?' + query : '')}).end(); return;
    }
    let pathname = decodeURIComponent(rawPath);
    requestPath = pathname;
    // Como na Vercel, o rewrite só vale quando o arquivo não existe no caminho original.
    if (!fs.existsSync(path.resolve(root, '.' + pathname))) {
      for (const r of rewrites) { const match = r.pattern.exec(pathname); if (match) { pathname = applyRule(r, match); break; } }
    }
    file = path.resolve(root, '.' + pathname);
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  } catch { res.writeHead(400).end(); return; }
  if (!file.startsWith(root + path.sep) || path.relative(root, file).split(path.sep).some(part => part.startsWith('.'))) {
    res.writeHead(403).end(); return;
  }
  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) { res.writeHead(404).end('Arquivo não encontrado'); return; }
    let start=0, end=stat.size-1;
    const headers={'Content-Type':types[path.extname(file)] || 'application/octet-stream','Accept-Ranges':'bytes','Cache-Control':'no-cache'};
    for (const rule of headerRules) {
      if (rule.pattern.test(requestPath)) for (const header of rule.headers) headers[header.key] = header.value;
    }
    headers.ETag = `W/"${stat.size.toString(16)}-${stat.mtimeMs.toString(16)}"`;
    if (!req.headers.range && req.headers['if-none-match'] === headers.ETag) { res.writeHead(304,headers).end(); return; }
    const range=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range || '');
    if (range) {
      start=Number(range[1]);end=range[2]?Math.min(Number(range[2]),end):end;
      if (start>end) { res.writeHead(416, {'Content-Range':`bytes */${stat.size}`}).end(); return; }
      headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`;
    }
    const compressible = /\.(html|css|js|svg|json)$/.test(file);
    const accepted = req.headers['accept-encoding'] || '';
    const encoding = !range && compressible ? /\bbr\b/.test(accepted) ? 'br' : /\bgzip\b/.test(accepted) ? 'gzip' : null : null;
    if (compressible) headers.Vary = 'Accept-Encoding';
    if (encoding) headers['Content-Encoding'] = encoding;
    else headers['Content-Length']=end-start+1;
    res.writeHead(range?206:200,headers);
    if (req.method==='HEAD') { res.end(); return; }
    const stream=fs.createReadStream(file,{start,end});
    stream.on('error',()=>res.destroy());req.on('close',()=>stream.destroy());
    if (encoding) {
      const compressor = encoding === 'br' ? zlib.createBrotliCompress({params:{[zlib.constants.BROTLI_PARAM_QUALITY]:4}}) : zlib.createGzip();
      compressor.on('error',()=>res.destroy());res.on('close',()=>compressor.destroy());stream.pipe(compressor).pipe(res);
    } else stream.pipe(res);
  });
}).listen(4173,'127.0.0.1',()=>console.log('Portfólio: http://127.0.0.1:4173/portfolio — Ctrl+C para encerrar'));
