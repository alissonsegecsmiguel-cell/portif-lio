# Análise do dashboard da Natália — 14/10/2026

A página tem uma identidade visual coerente e uma estrutura técnica leve. A principal oportunidade está em mostrar primeiro o resultado econômico, explicar o que mudou e orientar a próxima decisão. Hoje, a hierarquia privilegia o acerto de despesas entre sócios.

Esta revisão não alterou o HTML, a planilha nem a configuração de publicação. Foram consultados README.md, dashboards/README.md, o HTML, o design system e os valores/fórmulas armazenados no XLSX. As recomendações abaixo distinguem dados já disponíveis de informações que precisam de nova coleta.

**O resultado que deveria abrir o painel.**

“Setembro faturou mais, mas deixou menos resultado: a receita cresceu 4,4%, as despesas aumentaram 37,4% e o lucro antes de impostos caiu 15,7%.”

| Indicador | Agosto | Setembro | Variação |
| --- | ---: | ---: | ---: |
| Receita bruta | R$ 212.704,27 | R$ 222.162,33 | +4,4% |
| Receita após taxas de plataforma | R$ 197.852,75 | R$ 207.289,37 | +4,8% |
| Despesas | R$ 76.338,45 | R$ 104.877,89 | +37,4% |
| Lucro antes de impostos | R$ 121.514,30 | R$ 102.411,48 | −15,7% |
| Margem sobre receita após taxas | 61,4% | 49,4% | −12,0 p.p. |
| Vendas | 927 | 561 | −39,5% |
| Ticket médio | R$ 229,45 | R$ 396,01 | +72,6% |
| Gasto com Facebook | R$ 45.205,19 | R$ 69.497,51 | +53,7% |
| Receita total / gasto com Facebook | 4,71x | 3,20x | −32,1% |

Fonte: aba Análise, colunas E/F, linhas 6–24. Os valores foram lidos do arquivo e os indicadores usados nesta tabela foram conferidos por aritmética. A planilha inteira não foi recalculada nem auditada transação por transação.

O custo de Facebook por venda total passou de R$ 48,77 para R$ 123,88. Isso é um indicador agregado de gasto por venda, não CAC de novos clientes nem CPA de vendas atribuídas ao Facebook. Também não se pode concluir causalidade apenas comparando dois meses: calendário de lançamentos, mix de produtos, atribuição e recebimentos podem mudar.

**Definições que precisam aparecer na interface.**

- A margem de 49,4% está correta na base da planilha: R$ 102.411,48 / R$ 207.289,37. O painel mostra receita bruta de R$ 222.162,33, mas omite taxas de R$ 14.872,96 e receita após taxas. Isso cria uma aparente inconsistência. Apresentar uma ponte: receita bruta → taxas → receita após taxas → despesas → resultado antes de impostos. Sobre a receita bruta, esse mesmo resultado representa 46,1%; escolher a base e nomeá-la.
- “ROAS do Facebook” usa receita bruta total / Facebook, conforme o próprio rótulo da linha 19 da planilha. Exibir essa definição diretamente, ou separar esse indicador do retorno sobre receita atribuída às campanhas, quando essa informação existir. Não inferir atribuição.
- “Marketing sobre a receita” é o inverso da razão anterior, usando os mesmos números. O gauge e o KPI não oferecem duas medidas independentes de eficiência. Uma barra com valor, referência e tendência ocupa menos espaço.
- O repasse de R$ 33.139,60 equaliza despesas pagas pelos sócios. O crescimento de 40,1% desse acerto não significa crescimento do lucro. O badge deve ser neutro, com a direção do pagamento e o status quitado.
- R$ 51.205,74 por sócio é a divisão do resultado antes de impostos, não comprovação de dinheiro disponível para retirada. Mostrar caixa disponível exige saldos, recebimentos, obrigações e reserva de impostos.
- Os parâmetros 3x e 35% vêm das referências editáveis da planilha. Não são garantias de rentabilidade. Como usam a mesma receita/gasto, 3x corresponde a 33,3%; 35% corresponde a 2,86x. Explicar a função de cada referência e evitar sinais contraditórios.
- Mostrar “impostos pendentes de lançamento” próximo do lucro. Zero lançado não comprova imposto zero.

**Organização proposta para a página.**

| Ordem | Conteúdo | Pergunta respondida |
| --- | --- | --- |
| 1 | Natália, mês fechado, comparação, data de atualização e aviso de impostos | Que período estou vendo e quão completo está? |
| 2 | Receita, lucro antes de impostos, margem e vendas, todos com variação | O negócio melhorou? |
| 3 | Resumo em uma frase e dois ou três alertas | O que merece minha atenção? |
| 4 | Evolução de receita e lucro; despesas no mesmo período | O crescimento está deixando resultado? |
| 5 | Ponte da receita ao lucro e categorias de despesa | Por que o resultado mudou? |
| 6 | Produtos, receita, participação e margem quando disponível | Onde está a concentração e o resultado? |
| 7 | Acerto entre sócios | O que está pago ou pendente? |
| 8 | Plano de ação com responsável, prazo e evidência | O que será feito e como acompanhar? |

No topo, cada KPI deve apresentar valor, comparação e base. Exemplo: “Lucro antes de impostos · R$ 102,4 mil · −15,7% vs. agosto · impostos pendentes”. Esse alerta tem mais utilidade que apenas o valor por sócio.

Um gráfico de receita e lucro ao longo dos meses expõe a perda de eficiência melhor que um gráfico isolado de despesas comparadas com a média. A média jun–set inclui o próprio setembro; mantê-la como comparação descritiva, sem tratá-la como orçamento ou meta. Para gestão, comparar também com agosto e com metas formalmente definidas.

No ranking, distinguir participação sobre o total e tamanho relativo ao líder: a primeira barra é 100% visualmente, mas o rótulo é 92,8% do total. Usar uma escala única ou explicar a normalização. Concentração de 92,8% merece contexto de estratégia e calendário; não é automaticamente ruim em um mês de lançamento.

O mês no cabeçalho é um texto, não um filtro. Com o histórico já existente na planilha, um seletor de meses fechados e comparação anterior/acumulada acrescenta utilidade real. Meses incompletos e valores ainda não lançados devem ter status explícito; nunca convertê-los em resultado final zero.

Os três “próximos passos” parecem links, por conta das setas e do hover, mas são itens sem ação. Torná-los tarefas com responsável, prazo e critério de conclusão, ou retirar a aparência de interação. Uma ação útil seria abrir as campanhas que precisam de revisão, desde que os dados e destinos estejam disponíveis.

**Informações que exigem nova coleta.**

| Informação | Dados necessários | Uso |
| --- | --- | --- |
| Caixa disponível e compromissos dos próximos 30 dias | Saldos, recebíveis, contas a pagar e reserva de impostos | Planejar pagamentos e retiradas |
| Resultado por produto | Receita após taxas, impostos e custos diretos; regra explícita para custos compartilhados | Comparar contribuição econômica |
| Retorno por campanha | Gasto, receita atribuída e janela de atribuição | Comparar campanhas com a mesma regra |
| CAC de novos clientes | Novos clientes identificados e custo de aquisição definido | Avaliar aquisição |
| Conversão do funil | Leads, visitas, checkouts e compras no mesmo recorte | Localizar perdas |

Começar por resultado, comparações e definições com os dados atuais. Acrescentar esses blocos somente quando houver dados confiáveis. Campos ausentes devem dizer “não disponível”, com a dependência necessária.

**Identidade, movimento e leitura.**

A página preserva a paleta, Arial/Manrope/Fraunces/Courier, bordas, raio de 20 px, vidro e a curva cubic-bezier(.16,1,.3,1). A entrada de 900 ms e a subida do título de 1.250 ms correspondem ao sistema. Há pausa global persistida e suporte inicial a movimento reduzido.

No desktop de 1440 × 900, os KPIs de negócio começam perto de 900 px e ficam abaixo da primeira tela. No celular de 390 × 844, o primeiro KPI começa perto de 1.400 px, e a análise perto de 4.400 px. Reduzir o cabeçalho e deslocar o acerto entre sócios permite apresentar resultado e alertas mais cedo.

Recomendações:

- Exibir os valores finais dos KPIs imediatamente. Os contadores partem de zero, esperam 350 ms e evoluem por 1.400 ms; isso atrasa a leitura e pode sugerir dados ainda carregando. Sua curva JS também é exponencial, diferente do token CSS do sistema.
- Reservar o movimento para entrada discreta dos blocos secundários, foco e atualização de filtros. Manter a assinatura da curva do sistema, com durações adequadas ao contexto de consulta.
- Reduzir ou remover o deslocamento de −6 px de cards informativos no hover. Sem ação associada, o efeito não esclarece função. Borda/foco estáveis são suficientes.
- Tornar a grade de fundo estática e reduzir pulsos, halos e blooms contínuos. Um fechamento mensal não precisa de status pulsante de atividade.
- Evitar blur em todos os cards, especialmente no celular; concentrá-lo na navegação quando necessário.
- Aplicar a curva --ease também às transições que atualmente usam o ease padrão, como navegação e badges, quando a animação for mantida.
- A segunda linha do título usa em como filho da máscara, enquanto a animação seleciona apenas .line-mask > span. Uniformizar a marcação se a cascata do título permanecer.
- Oferecer navegação compacta no celular: a cápsula desaparece abaixo de 1100 px sem alternativa. Ampliar o botão de movimento de 40 px para os 48 px previstos pelo design system.
- Permitir toque/teclado no destaque do donut e fechamento por Escape do tooltip do gráfico de linha. A linha já tem pontos focáveis e tabela de valores; a legenda do donut não tem interação por teclado equivalente ao hover.

**Carregamento e custo de renderização.**

O HTML ocupa 59.111 bytes, cerca de 57,7 KiB. Em compressão padrão: gzip 15.973 bytes e Brotli 13.954 bytes. Não há biblioteca de gráficos, imagem fotográfica ou vídeo: os gráficos usam SVG e o JS é nativo. Portanto, a base de download é boa.

As dependências externas observadas são o CSS do Google Fonts e dois arquivos de fonte. Preconnect e display=swap já estão presentes. Display=swap permite fonte de fallback, mas não transforma o link stylesheet em um recurso não bloqueante. Otimizar essa cadeia preservando leitura imediata. Fontes locais exigiriam uma decisão explícita, pois dashboards/README.md exige painel autocontido sem caminhos locais; não copiar os caminhos do portfólio indiscriminadamente.

As URLs locais sem barra, com barra e file:// abriram corretamente, sem erros JS nos cenários normais. A resposta HTTP corresponde ao arquivo analisado. Não houve overflow horizontal em 320, 390 ou 1440 px nos recortes verificados.

Nas amostras locais, LCP: desktop 0,908 s; celular com CPU 4x 0,884 e 0,960 s; movimento reduzido 2,036 s; URL com barra 0,600 s; arquivo 0,716 s. CLS desktop aproximadamente 0,032; celular aproximadamente zero. O LCP registrado foi o título em, não os indicadores de negócio. Essa medição não indica quando o empresário consegue consultar o resultado.

Limites: Chrome headless com GPU desabilitada por incompatibilidade do ambiente. Foi solicitada limitação de rede, mas os TTFBs de loopback ficaram em aproximadamente 11–14 ms; não tratar essas amostras como benchmark validado de 4G. A variabilidade, tarefas longas e renderização por software impedem extrapolar FPS, INP ou desempenho de aparelho físico. Não são pontuações Lighthouse nem medição de produção.

Depois da entrada, foram observadas 11 animações ativas tanto no topo quanto no fim da página. A pausa global zerou as animações. Em uma janela de 2,5 s no fim da página, eventos Paint passaram de 74 para 18 após pausar. Isso confirma trabalho contínuo, mas não quantifica o ganho em dispositivo real. Um segundo teste congelando somente a grade reduziu a quantidade de Paint, porém teve tempos mais altos; resultado inconclusivo para atribuir todo o custo à grade. Perfilá-la junto com vidro, ruído e sombras em aparelho real antes de estimar ganhos.

Animações de background-position, sombras e blur podem exigir repintura. Priorizar transform e opacity quando houver movimento e medir os demais efeitos. Referência: https://web.dev/articles/animations-guide e https://web.dev/articles/animations-and-performance. Fontes: https://web.dev/learn/performance/optimize-web-fonts.

**Falhas reproduzidas que merecem correção.**

1. Imprimir a partir do topo deixa dez cards com opacity:0, porque o CSS de impressão não força a revelação. O fundo continua preto com texto claro, prejudicando a saída quando o navegador não imprime fundos. Forçar valores e gráficos finais, tabelas abertas, texto escuro e fundo claro no modo de impressão.
2. Ativar movimento reduzido depois de carregar mantém js-motion e dez cards ainda ocultos no recorte inicial. A preferência só é lida no início; não há listener de mudança que revele todos os dados e sincronize o botão.
3. Simular falha na inicialização SVG mantém os onze cards ocultos. O script do head ativa js-motion antes de concluir a inicialização e montar o observador. Ativar os estados ocultos somente após os recursos essenciais estarem prontos; manter fallback visível em falha.
4. Sem JS, os textos e tabelas permanecem, mas os três gráficos não são criados e o gauge fica com altura zero, podendo sobrepor seu valor posicionado absolutamente ao conteúdo seguinte. Fornecer apresentação textual ou SVG estático com espaço reservado.
5. Não há suspensão explícita de loops fora da viewport ou listener de visibilidade da aba. O design system prevê ambos. Adicionar controle de ciclo de vida, sem depender apenas do comportamento de throttling do navegador.

**Sequência recomendada.**

Primeiro: resultado no topo, comparações de lucro/vendas, ponte de taxas e margem, nomes precisos dos indicadores e aviso de impostos. Depois: impressão confiável, fallback visível, preferência de movimento dinâmica e menos loops. Em seguida: seleção de período, comparação com metas e tarefas acompanháveis. Por fim: dados de caixa, campanhas, produtos e aquisição, conforme a coleta permitir.

Essa ordem entrega valor com os dados atuais, preserva a identidade visual e evita criar métricas aparentes sem suporte na fonte.

**Complemento: UI/UX e navegação mensal.**

A recomendação é uma barra de período abaixo do cabeçalho, com os meses disponíveis em ordem cronológica. O período deve filtrar o painel inteiro; a navegação Resumo/Despesas/Sócios/Receita/Leitura continua sendo navegação entre seções. Diferenciar visualmente os dois controles evita a dúvida sobre o que muda após clicar.

No desktop, usar botões Jun/Jul/Ago/Set com o selecionado em violeta. No celular, usar seletor de mês com nome completo e botões anterior/próximo. Quando houver mais anos, acrescentar um seletor de ano; enquanto existir apenas 2026, basta exibi-lo. Evitar doze botões espremidos ou várias linhas de meses no celular.

Ao trocar de mês, atualizar juntos título, valores, deltas, gráficos, produtos, repasses e análise. Manter a posição de leitura e os valores finais, sem repetir contadores e animações de entrada. Preservar a seleção no endereço, por exemplo ?mes=2026-09, para permitir compartilhar e voltar ao mesmo período. Exibir o último mês fechado ao abrir sem seleção.

Meses fechados, parciais e sem dados precisam de rótulos textuais. Não representar meses sem lançamento como receita/lucro zero. Um mês parcial pode ser consultado quando houver dados suficientes, mas não deve ser comparado automaticamente com um mês completo. Oferecer comparação de períodos equivalentes quando as datas permitirem.

Outras melhorias de UI/UX: cabeçalho compacto; valores principais com contraste alto e números alinhados; duas colunas de KPIs no celular quando houver espaço; explicação das métricas acessível por toque/foco; detalhes financeiros em expansores; alerta de dados pendentes próximo do resultado; saída de impressão/PDF clara e completa. Se a barra permanecer visível durante a rolagem, fixar apenas o controle compacto de período, evitando empilhar cabeçalhos e reduzir a área de conteúdo no celular.

A proposta interativa de navegação foi verificada em 736, 360 e 320 px, sem overflow ou corte dos controles, incluindo troca de mês e de comparação. A proposta não foi aplicada ao HTML do painel.
