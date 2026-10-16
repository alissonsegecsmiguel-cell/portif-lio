// Vercel Routing Middleware (sem Next.js): senha Basic Auth no painel do casal e no endpoint de dados.
// Usuário e senha vêm de DASH_USER e DASH_PASS (Vercel › Settings › Environment Variables).
export const config = {
  matcher: [
    '/dashboard/casal', '/dashboard/casal/:path*',
    '/dashboards/casal', '/dashboards/casal/:path*',
    '/api/financas'
  ]
};

// Compara em tempo constante para não revelar, pelo tempo de resposta, quantos caracteres batem.
function iguais(a, b) {
  let dif = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) dif |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return dif === 0;
}

export default function middleware(request) {
  const user = process.env.DASH_USER, pass = process.env.DASH_PASS;
  const auth = request.headers.get('authorization') || '';
  let recebido = '';
  if (auth.startsWith('Basic ')) {
    try { recebido = new TextDecoder().decode(Uint8Array.from(atob(auth.slice(6)), c => c.charCodeAt(0))); } catch (e) {}
  }
  if (user && pass && iguais(recebido, user + ':' + pass)) return; // segue para a página ou o endpoint
  return new Response('Acesso restrito.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Financas", charset="UTF-8"', 'Cache-Control': 'no-store' }
  });
}
