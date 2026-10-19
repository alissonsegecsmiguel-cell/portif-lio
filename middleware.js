// Vercel Routing Middleware (sem Next.js): exige a sessão do casal no painel e no endpoint de dados.
// Sem sessão válida, as páginas vão para a tela de login e a API responde 401. A tela de login é pública.
import { COOKIE, ENTRAR, lerCookie, tokenValido, destinoSeguro } from './lib/sessao.js';

export const config = {
  matcher: [
    '/dashboard/casal', '/dashboard/casal/:path*',
    '/dashboards/casal', '/dashboards/casal/:path*',
    '/api/financas'
  ]
};

export default async function middleware(request) {
  const url = new URL(request.url), caminho = url.pathname;
  const logado = await tokenValido(lerCookie(request.headers.get('cookie'), COOKIE));
  const naoGuardar = { 'Cache-Control': 'no-store' };

  // Tela de login: pública; quem já está logado segue direto para o painel.
  if (/^\/dashboards?\/casal\/entrar\/?$/.test(caminho)) {
    if (!logado) return;
    return new Response(null, { status: 307, headers: { Location: destinoSeguro(url.searchParams.get('proximo')), ...naoGuardar } });
  }
  if (logado) return; // segue para a página ou o endpoint

  if (caminho.startsWith('/api/')) {
    return new Response(JSON.stringify({ erro: 'sessao_expirada' }), { status: 401, headers: { 'Content-Type': 'application/json', ...naoGuardar } });
  }
  // Volta ao mesmo caminho depois do login, sem o ?mes=: o painel sempre abre no mês atual.
  return new Response(null, { status: 307, headers: { Location: ENTRAR + '?proximo=' + encodeURIComponent(caminho), ...naoGuardar } });
}
