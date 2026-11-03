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

O fluxo de branch, handoff, commit, push e publicação segue a seção Passagem de contexto abaixo.

## Passagem de contexto

Estas regras substituem as orientações anteriores sobre visibilidade e autorização de push.

- Repositório público. Nunca registrar no HANDOFF.md ou em qualquer arquivo: dados pessoais, financeiros, de clientes, credenciais, links ou IDs de planilhas privadas, falhas de segurança ou pendências sensíveis.
- O HANDOFF.md deve conter somente informações apropriadas para leitura pública: estado do site, estrutura, tarefas de copy e código, decisões de copy e design e regras de fluxo. Na seção "Pendências que dependem de pessoas", escrever apenas: "Itens sensíveis são acompanhados fora do repositório."
- Antes de trabalhar, ler HANDOFF.md e verificar o estado do Git. Todo trabalho ocorre na branch dev. Se dev não existir localmente nem no origin, criá-la a partir da main; se existir no origin, acompanhar a branch existente. Preservar alterações e commits do usuário.
- Manter .vercelignore excluindo HANDOFF.md, AGENTS.md, CLAUDE.md e README.md em qualquer pasta, além de portfolio/referenciais/. Preservar as demais exclusões existentes.
- Push da dev ao final de toda tarefa, depois de confirmar que nada sensível entrou no commit.
- Antes do push, revisar os commits da dev ainda não presentes no GitHub, incluindo conteúdo e mensagens. Se houver conteúdo incompatível com este repositório público, não fazer push e avisar o usuário em canal apropriado, sem reproduzir valores ou identificadores.
- Atualizar o HANDOFF.md público antes de cada commit. Relatórios que não sejam apropriados para publicação devem permanecer fora da pasta do repositório.
- Nunca fazer merge nem push na main sem o usuário escrever "publica". Quando isso ocorrer, integrar dev na main, fazer push da main e registrar a publicação no handoff público.
- Nas publicações autorizadas, conferir as rotas e os recursos do site. Excluir um arquivo do deploy não o remove do histórico do GitHub.
- Não implementar funcionalidades nem reescrever o histórico sem a autorização correspondente. Registrar no handoff apenas a próxima evolução aprovada para descrição pública.
