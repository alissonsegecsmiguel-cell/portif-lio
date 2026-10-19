# Dashboards de clientes

Um painel por cliente, publicado em `https://alissonsegecs.com.br/dashboards/<cliente>`. Cada painel é estático, sem build, e independente do portfólio.

## Estrutura

```
dashboards/
  README.md               este guia (não é publicado)
  <cliente>/
    index.html            o painel: HTML, CSS, JS e dados do mês no mesmo arquivo
    fonte/                planilhas de origem (ignoradas pelo git e pela Vercel)
```

Clientes atuais:

| Pasta      | URL                    | Meses                                   | Fonte                     |
|------------|------------------------|-----------------------------------------|---------------------------|
| `natalia/` | `/dashboards/natalia`  | mai–set/2026 fechados, out/2026 parcial | `fonte/DRE NATÁLIA.xlsx`  |
| `casal/`   | `/dashboard/casal` (e `/dashboards/casal`) | os do `historico` da planilha | `/api/financas` (Apps Script) |

O painel `casal/` é a exceção: não tem dados no HTML. Ele busca `/api/financas` (`api/financas.js`), que lê a planilha com `FIN_SHEETS_URL` e `FIN_SHEETS_KEY` sem expor a chave, e fica atrás de login: `middleware.js` exige a sessão; sem ela, as páginas vão para a tela `casal/entrar/` (`/dashboard/casal/entrar`) e a API responde 401. O formulário envia para `/api/entrar`, que confere `DASH_USER` e `DASH_PASS` e grava um cookie assinado (`lib/sessao.js`, HttpOnly, 60 dias com "Manter conectado" ou até fechar o navegador sem ele); `/api/sair` apaga o cookie. A assinatura usa `SESSION_SECRET`, se existir, ou deriva de `DASH_PASS` + `FIN_SHEETS_KEY`: trocar a senha encerra todas as sessões. O painel sempre abre no mês atual; o `?mes=` do endereço só vale para a troca de mês dentro da página. As variáveis ficam em `.env.local` (ignorado) e em Vercel › Settings › Environment Variables. No `serve.cjs` a página abre, mas sem endpoint mostra "Não foi possível carregar os dados".

## Como o painel funciona

- **Barra de meses** no topo, fixa durante a rolagem. No desktop, os meses aparecem em linha; no celular, um seletor com anterior/próximo. Cada mês tem um estado: fechado (ponto verde), parcial (ponto âmbar) ou sem dados (desativado). Mês sem lançamento nunca aparece como resultado zero.
- **O mês fica no endereço:** `/dashboards/natalia?mes=2026-07`. Sem parâmetro, ou com um mês inválido, abre o último mês fechado (`PADRAO`).
- **Tudo muda junto:** título, resumo, alertas, repasse, indicadores, gráficos, sócios, produtos e leitura. Os números partem do valor anterior, sem recontar do zero, e a posição de leitura não muda.
- **Comparação com o mês anterior** só entre meses fechados. Maio é o mês de abertura e não serve de base para junho; mês parcial não é comparado.
- **Alertas** (até três no topo) são calculados com as referências da aba Análise: ROAS mínimo de 3x, marketing até 35% da receita bruta, margem mínima de 30%, equipe até 15% da receita líquida, acerto pendente e impostos não lançados.
- **Leitura do mês:** mostra o parecer escrito quando existe (`PARECER`); nos outros meses, avisa que não há parecer e lista os alertas. Nenhum texto de análise é inventado.
- **Explicações** dos indicadores abrem por toque ou teclado (botão *i*), fecham com Esc ou toque fora.
- **Impressão/PDF** (botão da impressora): fundo claro, mês, estado, alertas e DRE resumida abertos.

## Regras

- **Nome da pasta:** minúsculas, sem acento e sem espaço (`natalia`, `joao-silva`). Ela vira a URL.
- **Autocontido:** nenhum caminho local (`../`, `assets/`, `/portfolio/...`). A página precisa abrir em `/dashboards/<cliente>`, em `/dashboards/<cliente>/` e direto pelo arquivo. Fontes vêm do Google Fonts; o favicon é um SVG embutido.
- **Dados do cliente:** planilhas, CSVs e exportações ficam em `<cliente>/fonte/`. O `.gitignore` e o `.vercelignore` bloqueiam essa pasta e qualquer `.xlsx`, `.xls` ou `.csv` dentro de `dashboards/`. Confira com `git status --ignored dashboards` antes de commitar.
- **Privacidade:** os painéis usam `noindex, nofollow, noarchive`, mas a URL é pública. Quem tiver o link vê os números. Não há senha.
- **Design system:** tokens, fontes, badges, tooltip, entrada `[data-rise]` e curva `--ease` seguem `portfolio/assets/design_system_portifolio.html`. Pausa global (botão no topo, lembrada no navegador) e `prefers-reduced-motion` mostram os valores finais sem animação.

## Novo cliente

1. Copie `natalia/index.html` para `dashboards/<cliente>/index.html`.
2. Coloque a planilha em `dashboards/<cliente>/fonte/`.
3. No `<script>`, substitua `MESES` (um objeto por mês), `PADRAO`, `MEDIA_JUN_SET` e `PARECER`. O HTML não tem números fixos: tudo é montado a partir desses dados. Ajuste também o nome na marca, o `<title>` e a `description`.
4. Confira em `node serve.cjs`: `http://127.0.0.1:4173/dashboards/<cliente>` e com a barra final.

## Atualizar o mês

1. No objeto do mês em `MESES`, troque `estado: 'parcial'` por `'fechado'`, remova `ate` e preencha os números. Para abrir um mês novo, troque `'sem-dados'` pelos campos completos.
2. De onde vem cada campo, na planilha:
   - `receita`, `taxas`, `liquida`, `vendas` e as categorias de `despesas`: aba **Análise**, bloco 1 (indicadores mês a mês).
   - `pagou.expert` e `pagou.coprod`: aba **DRE Anual**, bloco 6 (despesas pagas por sócio).
   - `repasses`: aba **Repasses** (data, quem repassou, valor).
   - `produtos`: aba **Receitas**, somando as linhas do mês por produto (Hotmart + Lia), do maior para o menor.
3. Se houver parecer escrito, acrescente em `PARECER` com o id do mês.
4. Atualize `PADRAO` para o último mês fechado e, se fizer sentido, a média de referência do gráfico de despesas.
5. Confira os totais: a soma dos produtos deve bater com `receita`, e `pagou.expert + pagou.coprod` com o total de despesas.

As abas DRE, Dashboard e Auditoria ficam fixadas no mês em andamento e não servem de fonte para meses fechados.
