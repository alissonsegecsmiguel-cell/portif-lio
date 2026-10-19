// Login do painel do casal: confere DASH_USER e DASH_PASS e grava o cookie de sessão.
// Funciona com o formulário puro (redireciona) e com fetch (responde JSON quando Accept pede).
import { criarToken, cookieSessao, iguais, destinoSeguro, ENTRAR } from '../lib/sessao.js';

// Freio contra tentativas repetidas: 8 erros por IP em 15 min bloqueiam até a janela passar.
// Fica em memória, então vale enquanto a função está aquecida; somado à espera em cada erro, já basta para um painel pessoal.
const falhas = new Map();
const JANELA = 15 * 60 * 1000, LIMITE = 8;
const espera = ms => new Promise(r => setTimeout(r, ms));

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).end(); }

  const b = req.body || {};
  const usuario = String(b.usuario || '').trim(), senha = String(b.senha || '');
  const lembrar = b.lembrar === true || b.lembrar === 'on' || b.lembrar === '1';
  const proximo = destinoSeguro(b.proximo);
  const querJson = /application\/json/.test(req.headers.accept || '');
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim() || 'desconhecido';

  const falhar = (status, msg, codigo) => querJson
    ? res.status(status).json({ erro: msg })
    : res.status(303).setHeader('Location', ENTRAR + '?erro=' + codigo + '&proximo=' + encodeURIComponent(proximo)).end();

  const f = falhas.get(ip);
  if (f && Date.now() - f.desde > JANELA) falhas.delete(ip);
  else if (f && f.n >= LIMITE) return falhar(429, 'Muitas tentativas. Espere alguns minutos e tente de novo.', 'tentativas');

  const U = process.env.DASH_USER, P = process.env.DASH_PASS;
  if (!U || !P) return falhar(500, 'Login não configurado no servidor.', 'config');

  // Os dois testes rodam sempre, para o tempo de resposta não indicar qual dos campos errou.
  const okUsuario = iguais(usuario.toLowerCase(), U.toLowerCase()), okSenha = iguais(senha, P);
  if (!(okUsuario && okSenha)) {
    const atual = falhas.get(ip) || { n: 0, desde: Date.now() };
    atual.n++; falhas.set(ip, atual);
    await espera(400 + atual.n * 150);
    return falhar(401, 'Usuário ou senha incorretos.', '1');
  }

  falhas.delete(ip);
  const token = await criarToken(lembrar);
  if (!token) return falhar(500, 'Login não configurado no servidor.', 'config');
  res.setHeader('Set-Cookie', cookieSessao(token, lembrar));
  return querJson ? res.status(200).json({ ok: true, proximo }) : res.status(303).setHeader('Location', proximo).end();
}
