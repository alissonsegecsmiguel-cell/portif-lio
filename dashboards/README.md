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

| Pasta      | URL                    | Período         | Fonte                                |
|------------|------------------------|-----------------|--------------------------------------|
| `natalia/` | `/dashboards/natalia`  | setembro/2026   | `fonte/DRE NATÁLIA.xlsx`, aba Análise |

## Regras

- **Nome da pasta:** minúsculas, sem acento e sem espaço (`natalia`, `joao-silva`). Ela vira a URL.
- **Autocontido:** nenhum caminho local (`../`, `assets/`, `/portfolio/...`). A página precisa abrir em `/dashboards/<cliente>`, em `/dashboards/<cliente>/` e direto pelo arquivo. Fontes vêm do Google Fonts; o favicon é um SVG embutido.
- **Dados do cliente:** planilhas, CSVs e exportações ficam em `<cliente>/fonte/`. O `.gitignore` e o `.vercelignore` bloqueiam essa pasta e qualquer `.xlsx`, `.xls` ou `.csv` dentro de `dashboards/`. Confira com `git status --ignored dashboards` antes de commitar.
- **Privacidade:** os painéis usam `noindex, nofollow, noarchive`, mas a URL é pública. Quem tiver o link vê os números. Não há senha.
- **Design system:** tokens, fontes, badges, tooltip, entrada `[data-rise]` e curva `--ease` seguem `portfolio/assets/design_system_portifolio.html`. Pausa global (botão no topo, lembrada no navegador) e `prefers-reduced-motion` mostram os valores finais sem animação.

## Novo cliente

1. Copie `natalia/index.html` para `dashboards/<cliente>/index.html`.
2. Coloque a planilha em `dashboards/<cliente>/fonte/`.
3. Atualize o objeto `DADOS` no `<script>` (gráficos de linha, gauge e donut) e os textos e números do HTML (hero, KPIs, tabela, ranking, leitura do mês, `<title>` e `description`).
4. Confira em `node serve.cjs`: `http://127.0.0.1:4173/dashboards/<cliente>` e com a barra final.

## Atualizar o mês

Mesmo processo do passo 3, na pasta do cliente. Os números de setembro/2026 da Natália vêm da aba **Análise** (indicadores mês a mês) e da aba **DRE Anual** (divisão entre sócios). As abas DRE, Dashboard e Auditoria estavam fixadas em outubro, mês incompleto, e não foram usadas.
