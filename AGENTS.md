# Estrutura e publicação do portfólio

Leia README.md antes de alterar o site. O projeto é estático, sem build, e é publicado em `/portfolio`.

- A página principal é `portfolio/index.html`. Não criar nem editar um `index.html` na raiz como página do site.
- A referência obrigatória de identidade visual é `portfolio/assets/design_system_portifolio.html`. Os demais referenciais e fontes locais ficam em `portfolio/referenciais/`.
- Salvar novas imagens, vídeos e outros recursos em `portfolio/assets/`.
- Preservar os caminhos relativos usados atualmente no HTML e no CSS: `assets/...`, `referenciais/...` e `favicon.svg`. Não reintroduzir prefixos absolutos `/portfolio/` nos recursos locais nem adicionar uma base fixa que impeça abrir `portfolio/index.html` diretamente pelo arquivo.
- Considerar as duas URLs, `/portfolio` e `/portfolio/`. Sem a barra final, os caminhos relativos resolvem para `/assets/...`, `/referenciais/...` e `/favicon.svg`; os rewrites do `vercel.json` os encaminham para os arquivos de `portfolio/`.
- Preservar os redirecionamentos de `/` e `/portifolio`, os rewrites de compatibilidade e os metadados canonical, Open Graph e Twitter da página.
- `serve.cjs`, na raiz, reproduz as regras de `vercel.json`. A prévia é `http://127.0.0.1:4173/portfolio`. Se alterar o servidor ou suas regras, iniciar uma nova instância para validar, pois o processo em execução não recarrega esses arquivos automaticamente.
- Verificar os recursos alterados em `/portfolio`, `/portfolio/` e pela resolução relativa ao arquivo local. Validar imagens, fontes, vídeo e links para ampliar fotos; manter HTTP Range para o MP4.
- Manter `.vercelignore` alinhado à estrutura: prévias e ferramentas locais não fazem parte do site publicado.
- Seguir os tokens, fontes, componentes e curvas de movimento do design system. Preservar a pausa global, o movimento reduzido e o agrupamento de cada case no celular.

As alterações de conteúdo não autorizam publicação, push ou alteração da configuração de hospedagem por si só. Trabalhe no código local conforme o pedido do usuário.
