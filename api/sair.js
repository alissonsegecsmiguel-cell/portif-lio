// Sair do painel do casal: apaga o cookie de sessão e volta para a tela de login.
import { cookieApagar, ENTRAR } from '../lib/sessao.js';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).end(); }
  res.setHeader('Set-Cookie', cookieApagar());
  return res.status(303).setHeader('Location', ENTRAR + '?saiu=1').end();
}
