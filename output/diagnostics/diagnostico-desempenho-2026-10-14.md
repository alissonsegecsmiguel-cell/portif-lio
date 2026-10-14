**Diagnóstico de carregamento e fluidez — 14/10/2026**

Há ganhos relevantes sem remover vídeos, carrosséis, ícones, brilhos ou animações. A maior oportunidade de fluidez está nas grades decorativas e nos indicadores de status. Para carregamento, as prioridades são o cache dos vídeos e o trabalho inicial de estilo/layout.

Analisei o código local e https://alissonsegecs.com.br/portfolio. O HTML recebido do site publicado corresponde exatamente aos bytes do arquivo local durante esta revisão. Não alterei arquivos do site, o README, a configuração de hospedagem ou a publicação. Os experimentos alteraram somente a página carregada no navegador de diagnóstico.

**Como foi medido**

- Chrome sem interface, via DevTools Protocol; desktop 1440 × 900 e mobile 390 × 844.
- Carregamento mobile: CPU 4× mais lenta, download de 180 KiB/s, latência configurada de 120 ms e cache desativado; três amostras na publicação.
- Animações: amostras de três segundos, depois de aguardar a entrada da seção, com CPU 4×. Foram examinadas dez áreas, no desktop e no mobile.
- Comparativos: estilos temporários em memória para separar os custos de grades, sombras, máscaras e texturas.
- Cache: duas navegações no site publicado com o cache normal habilitado.

Estes são testes de laboratório; não são uma nota de Lighthouse, uma medição de INP de usuários reais ou uma previsão de FPS em aparelhos físicos. Tempos de CPU e de pintura variam com o ambiente. As contagens de Paint identificam trabalho de renderização, não equivalem a quadros perdidos. Tempos de eventos de tracing podem incluir outros eventos aninhados e não devem ser somados entre categorias.

**Carregamento observado**

| Cenário | Primeiro conteúdo, FCP | Principal conteúdo visual, LCP | Deslocamento, CLS | Primeiro playback da hero |
|---|---:|---:|---:|---:|
| Desktop, rede livre | 2,44 s | 3,24 s | 0,0001 | 3,21 s |
| Mobile, amostra 1 | 2,38 s | 3,06 s | 0,0000 | 5,73 s |
| Mobile, amostra 2 | 3,03 s | 5,08 s | 0,0010 | 8,29 s |
| Mobile, amostra 3 | 2,34 s | 5,07 s | 0,0000 | 6,16 s |

No mobile publicado, a mediana do FCP foi **2,38 s**, e a mediana do LCP foi **5,07 s**. O LCP foi atribuído ao vídeo da hero com seu pôster. Uma das amostras teve espera inicial pela resposta de cerca de 2,4 s; não atribuo toda essa variação ao código.

O carregamento inicial transferiu aproximadamente **881 KB**, incluindo o documento e os recursos concluídos durante a observação. O MP4 da hero responde por **645.101 bytes**, cerca de 73% desse total. O pôster pesa 33.186 bytes; as duas fontes somam 91.964 bytes. As miniaturas dos clientes são pequenas e não justificam retirar o carrossel.

O HTML pesa 280.688 bytes sem compressão e foi servido com Brotli na publicação, em uma transferência do documento de aproximadamente 59 KB. Dentro dele há 132.779 bytes de CSS e 41.482 bytes de scripts, além da marcação. O documento tem 1.511 elementos e 952 regras CSS de nível superior; há várias camadas de ajustes históricos no mesmo arquivo.

**O que já funciona bem**

- Não há bibliotecas JavaScript externas ou embeds de Instagram/YouTube no carregamento inicial.
- As imagens maiores usam WebP, dimensões declaradas e carregamento tardio; André tem versões responsivas.
- Pôster e fontes da hero têm prioridade; as fontes usam font-display: swap.
- Os vídeos de Sobre e Trajetória não foram solicitados na primeira tela. Na navegação entre as áreas, o controlador pausou os vídeos que saíram da viewport.
- Movimento reduzido impediu a transferência dos três MP4s no teste e manteve os pôsteres. A carga inicial local caiu de aproximadamente 879 KB para 214 KB nessa comparação.
- As fontes e imagens com hash em assets/optimized/ receberam cache de um ano e immutable na publicação.
- O vídeo respondeu com HTTP 206 e suporte a intervalos de bytes.
- O CLS foi próximo de zero nas amostras e não houve erros JavaScript não tratados.
- A ilustração financeira do contato manteve suas animações com zero eventos Paint nas duas amostras de três segundos. Esse trecho já demonstra o tipo de implementação desejado para os demais efeitos.

**Prioridades para melhorar sem retirar elementos**

1. **Refazer a renderização das grades e pulsos. Impacto alto na fluidez.**

   A animação grid-drift altera background-position em .metric::before, .skills::after e .rp-grid. Isso provoca pintura recorrente. Nos indicadores de status, status-pulse altera box-shadow em cada atualização. O custo não ficou restrito aos pequenos indicadores: o tracing registrou pinturas também no documento.

   No teste das habilidades, o original teve 364 eventos Paint em três segundos. Um protótipo que manteve a grade se movendo com transform teve zero. No livro, congelar somente a grade isolou a causa: 358 eventos passaram para zero, com a flutuação do livro e o bloom ainda ativos. Congelar a grade foi apenas um teste de atribuição; a recomendação final é manter seu movimento usando uma camada de textura movida com transform, com a máscara de acabamento em uma camada fixa.

   Para os indicadores, manter o ponto, o brilho e o ritmo com camadas de halo previamente pintadas, animando opacity/transform, em vez de recalcular a sombra. Essa abordagem segue a [orientação do Chrome para animações](https://web.dev/articles/animations-guide), que recomenda investigar pintura e usar promoção de camadas apenas onde a medição mostrar necessidade.

2. **Pausar efeitos pela visibilidade do próprio elemento. Impacto alto na fluidez.**

   O observador atual acompanha grandes seções, como .results e .about, com margem de 100 px. Enquanto qualquer parte da seção permanece próxima da tela, animações de filhos distantes continuam rodando. Ao olhar a primeira dobra mobile, os três grids das métricas estavam ativos. Na seção de público e no FAQ, apareceram pulsos de Sobre e do Método entre os responsáveis pelas pinturas.

   Manter os observadores e a pausa global, acrescentando controle nos elementos que realmente animam: métricas, indicadores e composições. Usar a viewport real para os loops caros, sem antecipar sua reprodução. O efeito voltará a rodar ao entrar na tela.

   No protótipo conjunto, grades passaram a usar transform e os indicadores continuaram pulsando com opacity. Os vídeos e os demais movimentos permaneceram ativos:

   | Área, mobile | Paint original / 3 s | Paint do protótipo / 3 s | Trabalho da thread principal, original | Trabalho da thread principal, protótipo |
   |---|---:|---:|---:|---:|
| Primeira dobra | 907 | 0 | 2148 ms | 272 ms |
| Para quem faz sentido | 501 | 0 | 2760 ms | 10 ms |
| Trajetória | 338 | 0 | 2606 ms | 217 ms |
| FAQ | 342 | 0 | 2608 ms | 11 ms |

   Esses resultados comprovam que a aparência pode continuar animada com muito menos trabalho. O protótipo não é uma implementação final: a equivalência visual dos halos e das máscaras precisa ser refinada e revisada antes de integrar a mudança. O tempo de CPU inclui outros trabalhos da thread, além de Paint.

3. **Versionar e cachear os vídeos. Impacto alto nas visitas seguintes.**

   Os MP4s atuais estão fora de assets/optimized/ e recebem Cache-Control: public, max-age=0, must-revalidate na publicação. Na segunda navegação testada, o MP4 da hero transferiu novamente cerca de 645 KB, enquanto as fontes e outros recursos aproveitavam o cache.

   Aplicar aos vídeos a estratégia que já funciona para as fontes: nomes com hash, endereços relativos e cache longo somente nos arquivos versionados. Preservar HTTP Range e os rewrites de /portfolio e /portfolio/. Isso preserva o vídeo original e melhora o retorno ao site. Não reduz o tamanho da primeira visita.

4. **Reduzir o trabalho inicial de estilo e layout. Impacto no primeiro carregamento e na disponibilidade dos controles.**

   No tracing mobile de inicialização, uma chamada de syncMotionEffects durou cerca de 1,54 s, com recálculo de estilos dentro dela; a avaliação do script principal durou cerca de 0,93 s. Esses eventos incluem trabalho de renderização causado pelas chamadas, não apenas execução de JavaScript. Os números são de uma amostra com CPU 4×.

   Separar leituras de geometria das escritas de classes/estilos, reduzir invalidações globais repetidas e inicializar primeiro os controles da hero. Consolidar regras CSS duplicadas ou obsoletas, preservando a cascata final em todos os breakpoints. Considerar adiar a preparação de componentes distantes até a aproximação da viewport, sem atrasar seu funcionamento quando aparecerem.

   Avaliar content-visibility: auto em blocos independentes abaixo da dobra, com espaço reservado e teste de âncoras, altura, lazy loading e IntersectionObserver. É uma hipótese para ensaio, não um ganho medido nesta revisão. A [documentação do Chrome](https://web.dev/articles/content-visibility) explica a economia de renderização fora da tela e as implicações para medidas de layout.

5. **Ensaiar versões responsivas dos vídeos. Impacto no primeiro download.**

   Como o MP4 da hero domina os bytes iniciais, uma versão específica para o tamanho exibido no celular pode reduzir a transferência. Comparar qualidade percebida, nitidez em telas com alta densidade, taxa de quadros e reprodução antes de escolher resolução/bitrate. Preservar enquadramento, cores, duração e conteúdo; continuar com pôster leve e fallback. Os dois vídeos de Sobre somam 2,47 MB e já carregam sob demanda, portanto são uma segunda prioridade para esse trabalho.

   Não recomendo comprimir mais as pequenas fotos de perfil nem retirar os SVGs: eles não foram o gargalo principal observado. Nos ensaios, acrescentar will-change aos ícones do público ou retirar a textura de ruído não resolveu a origem das repinturas. Promover tudo para camadas consumiria recursos sem atacar a causa medida.

**Ordem recomendada de execução**

Primeiro, grades/pulsos e pausa por elemento. Depois, cache de vídeos versionados. Em seguida, inicialização/cascata CSS e versões responsivas dos MP4s. Em cada etapa, repetir a mesma amostra de desempenho e revisar desktop/mobile, autoplay, pausa global, movimento reduzido, âncoras e casos de erro. O objetivo é conservar a identidade visual enquanto muda a forma de renderizar e entregar os recursos.

As medições completas ficam em performance-2026-10-14.json, performance-2026-10-14-ab.json e performance-2026-10-14-proof.json nesta pasta. Os experimentos e relatórios estão fora da pasta publicada e não alteram o site.
