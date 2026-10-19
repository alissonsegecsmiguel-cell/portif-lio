// Sessão do painel do casal: cookie assinado (HMAC-SHA256), sem banco de dados.
// Usado pelo middleware.js (Edge) e pelos endpoints /api/entrar e /api/sair (Node): só Web Crypto, comum aos dois.
//
// A chave de assinatura vem de SESSION_SECRET, se existir; senão, é derivada de DASH_PASS + FIN_SHEETS_KEY,
// que já estão na Vercel. Trocar a senha (ou o segredo) encerra todas as sessões abertas.

export const COOKIE = 'casal_sessao';
export const ENTRAR = '/dashboard/casal/entrar';
const LEMBRAR = 60 * 24 * 60 * 60; // "Manter conectado": 60 dias
const SESSAO = 12 * 60 * 60;       // sem "Manter conectado": até fechar o navegador, no máximo 12 h

const enc = new TextEncoder();

function segredo() {
  const s = process.env.SESSION_SECRET || (process.env.DASH_PASS && process.env.FIN_SHEETS_KEY
    ? 'casal|' + process.env.DASH_USER + '|' + process.env.DASH_PASS + '|' + process.env.FIN_SHEETS_KEY : '');
  return s || null;
}

function base64url(buf) {
  let s = '';
  new Uint8Array(buf).forEach(b => { s += String.fromCharCode(b); });
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function assinar(texto) {
  const s = segredo();
  if (!s) return null;
  const chave = await crypto.subtle.importKey('raw', enc.encode(s), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return base64url(await crypto.subtle.sign('HMAC', chave, enc.encode(texto)));
}

// Compara em tempo constante para não revelar, pelo tempo de resposta, quantos caracteres batem.
export function iguais(a, b) {
  a = String(a); b = String(b);
  let dif = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) dif |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return dif === 0;
}

export async function criarToken(lembrar) {
  const base = 'v1.' + (Math.floor(Date.now() / 1000) + (lembrar ? LEMBRAR : SESSAO));
  const sig = await assinar(base);
  return sig ? base + '.' + sig : null;
}

export async function tokenValido(token) {
  const m = /^v1\.(\d+)\.([\w-]+)$/.exec(token || '');
  if (!m || +m[1] < Date.now() / 1000) return false;
  const sig = await assinar('v1.' + m[1]);
  return !!sig && iguais(sig, m[2]);
}

export function lerCookie(header, nome) {
  const m = new RegExp('(?:^|;\\s*)' + nome + '=([^;]*)').exec(header || '');
  return m ? decodeURIComponent(m[1]) : '';
}

// HttpOnly: o JavaScript da página não lê o cookie. Sem "Manter conectado", vale até fechar o navegador.
export function cookieSessao(token, lembrar) {
  return COOKIE + '=' + token + '; Path=/; HttpOnly; Secure; SameSite=Lax' + (lembrar ? '; Max-Age=' + LEMBRAR : '');
}
export function cookieApagar() {
  return COOKIE + '=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0';
}

// Depois do login, só volta para dentro do painel (nunca para outro site ou para a própria tela de login).
export function destinoSeguro(p) {
  p = String(p || '');
  return /^\/dashboards?\/casal(?:[/?#]|$)/.test(p) && !/\/entrar(?:[/?#]|$)/.test(p) && !/[\\\s]/.test(p) ? p : '/dashboard/casal';
}
