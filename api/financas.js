// Endpoint do painel do casal: repassa os dados da planilha (Apps Script) sem expor a chave ao navegador.
// Protegido pela senha do middleware.js. Variáveis: FIN_SHEETS_URL e FIN_SHEETS_KEY.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, max-age=60');
  const base = process.env.FIN_SHEETS_URL, key = process.env.FIN_SHEETS_KEY;
  if (!base || !key) return res.status(500).json({ erro: 'Variáveis FIN_SHEETS_URL e FIN_SHEETS_KEY não configuradas' });

  const mes = typeof req.query.mes === 'string' && /^\d{4}-\d{2}$/.test(req.query.mes) ? req.query.mes : '';
  const url = base + '?key=' + encodeURIComponent(key) + (mes ? '&mes=' + mes : '');
  try {
    const r = await fetch(url, { redirect: 'follow' });
    const dados = await r.json();
    if (dados && dados.erro) return res.status(502).json({ erro: dados.erro });
    return res.status(200).json(dados);
  } catch (e) {
    return res.status(502).json({ erro: 'Não foi possível ler a planilha' });
  }
}
