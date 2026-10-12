# Portfólio — campanhas organizadas, persuasivas e focadas em conversão

`index.html` contém todo o HTML, CSS e JavaScript da página. Não exige build, instalação de pacotes nem framework. A hero usa vídeo como fundo de toda a viewport, degradês escuros, texto sobreposto à esquerda e um card de vidro, seguindo a composição do design system. O design system e o MP4 original foram preservados.

A headline contém a frase completa “Crio campanhas organizadas, persuasivas e focadas em conversão.” Os conectivos têm tamanho menor; “organizadas”, “persuasivas” e “conversão” recebem o destaque principal. As fontes se ajustam para preservar a hierarquia em celulares e em telas de pouca altura.

## Executar

Na pasta do projeto, com Node.js instalado:

```powershell
node serve.cjs
```

Abra **http://127.0.0.1:4173**. Encerre com `Ctrl+C`. Também funciona com Live Server ou outro servidor estático que aceite requisições HTTP Range para o MP4. Acesso à internet é necessário para carregar GSAP e ScrollTrigger 3.12.5 pelo CDN. Se falharem, a página continua legível, com pôster, projetos, contato e links.

Para hospedar, mantenha `index.html`, `assets/portrait-poster.webp`, o vídeo `Animating_portrait_transforming_…_20261012185500.scrub.mp4` em `assets/Videos/` e as duas fontes utilizadas em `referenciais/terrasprint-ai-design-system/`. `serve.cjs` e `.preview/` são ferramentas locais, não fazem parte da página publicada.

## Personalizar

A navegação em cápsula permanece no topo, inclusive no celular: Visão geral, Resultados, Habilidades, Materiais e Contato. Resultados leva à segunda dobra, com números e serviços; o CTA “Ver projetos” continua levando aos cases. Habilidades e Materiais possuem áreas com placeholders a substituir. O item ativo acompanha a seção visível e os links descontam a altura do cabeçalho fixo.

## Segunda dobra — experiência e serviços

O painel de vidro à esquerda apresenta os números fornecidos: mais de 30 lançamentos clássicos, mais de 20 lançamentos pagos e mais de 4 projetos perpétuos criados. À direita estão os textos de copy, gestão de projetos e coprodução/estratégia. A composição usa o preto profundo, o violeta, as fontes e as linhas finas do design system; em celular, o painel vem antes dos textos.

Os contadores começam em zero quando 25% do painel entra na viewport e crescem por aproximadamente 2 s, com intervalo de 120 ms entre eles. As barras acompanham a contagem e representam a proporção entre os três números, sem criar séries históricas ou métricas adicionais. A animação acontece uma vez, funciona sem GSAP e não mantém um loop ocioso.

Sem JavaScript, sem IntersectionObserver ou com movimento reduzido, os valores finais permanecem visíveis. Os leitores de tela sempre recebem os valores finais, sem anúncios a cada incremento. Ao ocultar a aba, sair do painel ou ativar movimento reduzido durante a contagem, os números concluem imediatamente.

Para mudar os números, atualize `data-counter`, seu texto inicial e o texto acessível de cada `.metric`. Ajuste também `--meter-share`, a proporção do número em relação ao maior, para o estado sem JavaScript. Os textos de serviços estão em `.services`.

## Dados pessoais e projetos

- Pesquise `[Seu nome]`, `[Sua área de atuação]`, `[Nome do projeto]`, `[Categoria]` e `[Seu papel no projeto]` no HTML. Atualize também `<title>`, descrição, rótulos acessíveis e rodapé.
- Substitua `seu.email@example.com` tanto no texto quanto no `mailto:` e atualize seu rótulo acessível.
- Os dois cards são placeholders identificados. Troque as composições demonstrativas por imagens e os links por URLs dos cases. Não representam projetos realizados.
- Edite `stories` no JavaScript para alterar os três momentos da narrativa: Visão, Criação e Ação. Os limiares `.32` e `.7` em `renderStory` acompanham a abertura da luz violeta, a formação dos elementos flutuantes e a composição final.
- O vídeo ativo é a cópia otimizada `assets/Videos/Animating_portrait_transforming_…_20261012185500.scrub.mp4`, derivada do original com o mesmo nome-base. A reticência `…` faz parte do nome. Os vídeos anteriores foram preservados e não são mais usados pela hero.
- As fontes são Manrope e Fraunces locais; títulos principais usam Arial/Helvetica. Cores, espaços, raios e curva de transição estão em `:root`, transpostos da referência.

## Ajustar o ritmo

No objeto `CONFIG`, aumente `pixelsPerSecond` para alongar a sequência e diminua para encurtá-la. O padrão é 520 px por segundo no desktop e 400 no celular: 2.080 e 1.600 px de rolagem para a cópia otimizada de 4 s. O ritmo foi alongado por segundo para a transformação curta continuar confortável de explorar.

A duração vem de `video.duration` após `loadedmetadata`. O progresso controla o tempo em ambos os sentidos. O vídeo permanece pausado, sem `autoplay` e sem `loop`. Uma fila conserva somente o alvo mais recente e aguarda `seeked` antes da próxima busca. A atualização usa o ciclo do ScrollTrigger, sem acrescentar outro requestAnimationFrame a cada busca. O fim usa uma margem de 1 ms para evitar solicitar um instante fora dos quadros decodificáveis.

Um único ScrollTrigger fixa a cena, atualiza o vídeo e coordena narrativa, indicador e parallax de 16 px no brilho decorativo. O vídeo permanece alinhado à viewport. A extensão da sequência é recalculada ao redimensionar. A integração segue a [documentação oficial do ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/). A rolagem é nativa, sem Lenis.

No desktop, a mídia ocupa uma camada de toda a viewport sobre preto profundo. O quadro completo é ajustado à direita e à base, preservando rosto, luz e elementos flutuantes mesmo em telas mais largas que 16:9. O preto do vídeo se integra ao fundo; degradês protegem a leitura à esquerda e deixam o retrato à direita mais visível.

Nos celulares, o enquadramento aproxima o retrato cortando o espaço preto à esquerda. Os elementos flutuantes permanecem dentro da área superior. Tablets mantêm o quadro inteiro; telas curtas usam um corte mais aberto e uma headline mais compacta. O card de vidro fica menor em desktops de pouca altura para evitar cobrir o rosto.

Com `prefers-reduced-motion`, a cena fica estática e sem pin, usando o pôster do primeiro quadro do retrato. A preferência também é respeitada quando muda durante a visita. Um erro de vídeo ou um carregamento que exceda o limite libera a sequência e conserva o conteúdo.

## Animações da referência aplicadas

- Entrada das linhas da headline: 1.250 ms, com intervalo de 120 ms; elementos de apoio entram por opacidade e deslocamento de 24 px em 900 ms.
- Projetos e contato aparecem ao entrar na viewport, com cascata de 90 ms. O título do contato se revela por palavra, com blur de 4 px, duração de 800 ms e intervalo de 55 ms, preservando as quebras de linha.
- Brilho violeta respira em um ciclo de 9 s; linha do card em 4 s, sinal de status em 2,6 s e grade dos projetos em 28 s.
- Botões respondem ao ponteiro com magnetismo limitado a 3 px, além de lift, sheen e glow. Um anel acompanha o cursor com suavização e cresce sobre links e botões. O cursor nativo é preservado.
- Efeitos de ponteiro são habilitados apenas em desktop com ponteiro fino, sem movimento reduzido. O anel usa requestAnimationFrame somente enquanto precisa alcançar o ponteiro.
- Loops decorativos pausam fora da viewport e com a aba oculta. Movimento reduzido remove animações e mantém todos os textos legíveis.

As entradas e os efeitos de apoio usam CSS e JavaScript nativos, de modo que continuem disponíveis se o CDN falhar. GSAP e ScrollTrigger continuam responsáveis pela cena fixada e pela sincronização do vídeo.

## Vídeo e fluidez

Inspeção do novo original: H.264 High, 1280 × 720, 24 fps, 96 quadros e vídeo de 4 s. O contêiner indica aproximadamente 4,01 s, incluindo áudio. Há somente um keyframe no original. O conteúdo começa com um retrato sobre preto; uma luz violeta se abre e revela cartões, ícones e uma peça de xadrez acima da cabeça.

O intervalo longo entre keyframes aumenta o trabalho de decodificação nas buscas, especialmente para trás. A página usa uma cópia já gerada e validada com **96 keyframes em 96 quadros**, sem quadros B nem áudio, com índice no início do MP4. A cópia tem 4 s, mantém resolução e taxa de quadros, e ocupa 3.023.778 bytes, contra 719.024 bytes do original.

Para regenerar essa cópia com FFmpeg instalado:

```powershell
ffmpeg -i "assets/Videos/Animating_portrait_transforming_…_20261012185500.mp4" -an -c:v libx264 -preset medium -crf 18 -g 1 -keyint_min 1 -sc_threshold 0 -bf 0 -pix_fmt yuv420p -movflags +faststart "assets/Videos/Animating_portrait_transforming_…_20261012185500.scrub.mp4"
```

A cópia já está conectada ao `<source>`. Em um teste de cinco buscas regressivas com FFmpeg, os tempos do original foram 323, 673, 334, 267 e 138 ms; os da cópia foram 144, 162, 137, 177 e 124 ms. Os números incluem inicialização do processo e decodificação por software, sem medir o navegador ou seu decodificador por hardware. O código evita buscas concorrentes, mas a experiência no dispositivo ainda precisa ser validada. O original não foi recodificado nem substituído.

## Verificação realizada

- JavaScript validado; arquivos, fontes, âncoras, resposta HTTP 200 e requisição parcial do vídeo (HTTP 206) verificados.
- Original e cópia otimizada decodificados integralmente com FFmpeg. Verificados 96 quadros independentes na cópia e realizadas buscas regressivas. Oito quadros do conteúdo original inspecionados visualmente; pôster extraído do instante 0 s.
- Simulação de DOM passou para metadados, pin, mapeamento da duração, avanço, retorno, parada, busca única com alvo mais recente, capítulos, foco, comprimento responsivo, mudança de preferência e falhas de CDN/vídeo.
- Navegador integrado indisponível nesta sessão. Layout visual, rolagem real, console e desempenho do decodificador em celular ainda precisam de uma revisão no navegador. A simulação não substitui essa revisão.
- A checagem direta do CDN expirou nesta rede, inclusive após tentar fora das restrições do ambiente. Sua disponibilidade não foi confirmada; a página tem timeout e fallback estático para esse caso.

Para a revisão visual, verifique 1440 × 900, 1280 × 720, 768 × 1024, 390 × 844 e 375 × 667. Role até o fim, retorne à hero, pare em diferentes pontos, redimensione no meio da sequência, use Tab/Enter, teste os CTAs e ative a preferência por movimento reduzido. Os cards de projeto e o e-mail ainda são exemplos a substituir.
