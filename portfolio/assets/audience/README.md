# Elementos da dobra de públicos

A seção #para-quem utiliza quatro símbolos SVG definidos uma vez em portfolio/index.html e reutilizados por use. Seguem o traço fino, pontas e junções arredondadas, tokens e curvas do [design system](../design_system_portifolio.html). Não há fotografias, fontes de ícones, imagens externas ou novo runtime.

| Público | Símbolo | Elementos |
| --- | --- | --- |
| Experts | audience-icon-expert | Pessoa e estrela, representando conhecimento e uma oferta pronta para escalar. |
| Times | audience-icon-team | Três pessoas e uma conexão comum, representando clareza e direção compartilhada. |
| Operações | audience-icon-operations | Etapas conectadas e confirmação, representando funil, execução e acompanhamento. |
| Primeiro lançamento | audience-icon-beginner | Foguete e linha de partida, representando construção e lançamento de um produto. |

O fundo --void-soft preserva a continuidade com o método; luzes violeta e mint são estáticas e discretas. Cards usam --radius, hairlines --line e relevo interno. Ícones usam --ink, --signal e --mint sobre uma grade pequena e uma órbita sutil.

A faixa tem três grupos de quatro cards para um loop CSS de 48 s. Apenas o primeiro grupo está disponível a leitores de tela. As duas cópias usam aria-hidden e não têm IDs. Cortes nas bordas e a posição inicial mostram a continuidade horizontal da referência. Hover e foco pausam a faixa. Uma interação por controle, gesto ou teclado termina o loop e oferece rolagem nativa dos quatro cards.

A flutuação dos ícones usa transform em 6 s com --ease; a órbita usa transform em 18 s. Não há loop JavaScript por quadro, animação de blur ou recarregamento de recursos. Os observadores nativos suspendem os loops fora da tela. Pausa global, aba oculta e movimento reduzido são preservados. Sem JavaScript ou com movimento reduzido, aparece uma única sequência estática e navegável.

As fotografias da versão anterior foram substituídas e suas oito variantes WebP geradas para essa dobra foram removidas dos recursos publicados.
