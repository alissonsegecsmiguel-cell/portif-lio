# Portfólio de gestão de lançamentos

O arquivo portfolio/index.html contém HTML, CSS e JavaScript incorporados. A composição usa o design system Noema × GenLabs × TerraSprint, preservando os tokens e as fontes locais. Não exige build.

O site é publicado em https://alissonsegecs.com.br/portfolio.

## Estrutura

```
portfolio/              site publicado em /portfolio
  index.html
  favicon.svg
  assets/               imagens, vídeos, logos, og-image.jpg e design_system_portifolio.html
  referenciais/         design systems de referência e fontes locais
dashboards/             painéis de clientes, um por pasta, publicados em /dashboards/<cliente> (ver dashboards/README.md)
  natalia/index.html    fechamento financeiro da Natália
  natalia/fonte/        planilha de origem; fora do git e da publicação
vercel.json             redirecionamentos (/ → /portfolio temporário, /portifolio → /portfolio permanente) e rewrites de /assets, /referenciais e /favicon.svg
.vercelignore           exclui output/, serve.cjs, README.md e as fontes de dados dos dashboards da publicação
serve.cjs               servidor local de prévia
output/previews/        capturas de revisão
```

Os recursos do index.html usam caminhos relativos (assets/…, referenciais/…, favicon.svg), por isso o site também abre direto pelo arquivo, com duplo clique em portfolio/index.html. Em /portfolio (sem barra final) o navegador resolve esses caminhos como /assets/…, e os rewrites do vercel.json (reproduzidos pelo serve.cjs) os entregam a partir de portfolio/. Ao adicionar um arquivo novo, mantenha caminhos relativos. Os caminhos citados neste README são relativos à pasta portfolio/.

## Executar

Com Node.js instalado, execute na raiz do projeto:

```powershell
node serve.cjs
```

Abra http://127.0.0.1:4173/portfolio. Encerre com Ctrl+C. O servidor aplica os mesmos redirecionamentos do vercel.json e aceita HTTP Range, necessário para o vídeo. A página usa JavaScript nativo e animações CSS, sem bibliotecas carregadas por CDN.

## Case Caderninho na Mão!

A cópia congelada da página da Profa. Marcia Macedo fica em `caderninho-marcia/index.html`, com seus próprios CSS, JS, imagens, fontes e favicons. A pasta não depende dos recursos da página principal do portfólio. O projeto original da cliente permanece separado.

Para abrir com duplo clique, use `caderninho-marcia/index.html`. Para testar no servidor, execute `node serve.cjs` na raiz e abra `http://127.0.0.1:4173/caderninho-marcia/`. O endereço sem barra final redireciona para a versão com barra por uma regra específica em `vercel.json`, também aplicada pelo servidor local. Os recursos usam caminhos relativos; o preload das fontes só roda em HTTP/HTTPS para evitar bloqueios CORS na abertura por arquivo.

A versão de portfólio mantém canonical para a página oficial, `noindex, nofollow` e identificação discreta no rodapé. O card desse case ainda não foi incluído na seção `#cases` de `portfolio/index.html`. A publicação depende do desbloqueio do deploy na Vercel.

## Espaçamento entre seções

O token --section-space usa clamp(24px,2.5vw,36px). A escala compacta é compartilhada por Habilidades, Método, Sobre mim, Perguntas e Contato. Cases têm entrada e saída próprias, também reduzidas. Foram encurtados os intervalos entre rótulos, títulos e conteúdo, a separação do bloco de públicos no método e os espaços da composição Sobre mim. O contato acompanha a altura do conteúdo, sem min-height de quase uma viewport. A proteção de rodapé e das âncoras para o botão flutuante permanece.

## Hero

O eyebrow é “GESTÃO DE LANÇAMENTOS / PORTFÓLIO”. A headline tem cinco linhas: “Experts que querem”, “escalar”, “sem perder”, “o controle da” e “operação.”. As linhas pequenas usam Manrope 400; as grandes, Arial/Helvetica 500; o destaque editorial, Fraunces 300. O apoio é “+40 lançamentos em 6 nichos. Crio a campanha e organizo o seu time: da gestão à copy, da estratégia a operação.”.

As classes .hero__copy, .hero__lead, .line-mask, .font-fraunces, .button-ghost, .hero-card.glass-card, .carousel-track e .signal-strip seguem o vocabulário do sistema. A curva das animações vem de --ease, inclusive nos efeitos JavaScript. Não há travessões nos textos da página.

O link “Ver cases” ao lado do botão de WhatsApp na hero leva a #cases. “Conversar no WhatsApp” abre uma nova aba com rel="noopener noreferrer", apontando para +55 11 93618-8143 e a mensagem “Alisson, posso te apresentar meu projeto?”. O símbolo do WhatsApp usa SVG inline com stroke de 1,5. Essa mesma mensagem está nos links de WhatsApp da página.

Na hero, o WhatsApp usa o botão principal violeta abaixo do texto, alinhado à esquerda, com “Ver cases” ao lado. No mobile, os dois botões permanecem juntos antes do card de experiência. O acabamento adapta o relevo, a borda em gradiente e a seta em uma pequena cápsula do GenLabs, preservando a paleta e --ease do portfólio. A borda respira em 3,2 s e um brilho atravessa o botão a cada 5,2 s. Hover e foco interrompem esses loops para manter a ação estável. Pausa global, movimento reduzido e saída da primeira dobra suspendem as animações. Os botões foram revisados de 320 a 1440 px, sem sobreposição ao card de experiência, incluindo foco visível. No mobile, o carrossel de clientes continua visível na tela inicial.

O card alterna entre três provas, em ciclo de 12 s, com aproximadamente 3 s de permanência em cada estado. Pausa com hover e foco. No celular de até 430 px, fica em linha e esconde badge e caption.

A faixa abaixo da hero mostra os oito experts e marcas informados, com fotos reais dos perfis, nomes e links para o Instagram. Mantém o ticker de 32 s com --ease e dois grupos idênticos, sem mudar o vídeo. As fotos estão em assets/experts/ e suas origens estão documentadas no README dessa pasta. Não depende de imagens externas. Hover pausa o movimento; ao navegar por teclado, apresenta uma única sequência estática com rolagem horizontal e foco visível. A cópia usa aria-hidden e links fora da sequência de Tab, mantendo os cliques durante todo o loop. Movimento reduzido organiza todos os perfis em linhas estáticas. A faixa respeita também a pausa global e a suspensão fora da viewport.

O botão de pausa ao lado da navegação, repetido no rodapé da hero no celular, suspende o vídeo, os efeitos de ponteiro, os elementos flutuantes, o carrossel e o ticker. A preferência por movimento reduzido mantém os textos legíveis, a foto estática e o primeiro estado do card. Os loops pausam fora da viewport e com a aba oculta.

## Retrato em movimento

No celular de até 800 px, o cabeçalho fica oculto e inert enquanto a hero está visível. Reaparece nas seções seguintes. O conteúdo começa no topo, com padding de clamp(32px,5svh,48px), e o vídeo recebe um overlay estático com degradês do token --void. A hero acompanha a altura do conteúdo, sem altura mínima de viewport: o rodapé fica cerca de 15 px abaixo do card rotativo, aproximando também o carrossel de clientes. O card de experiência acompanha o fluxo do conteúdo, com ajustes de tipografia em telas menores, sem sobrepor os botões. O controle de pausa fica no rodapé da dobra; enquanto a hero está visível, o WhatsApp flutuante usa a altura já medida pelo ResizeObserver da hero para ficar acima dos perfis do carrossel. No desktop, o cabeçalho e o overlay continuam como antes. Sem JavaScript, a navegação permanece disponível.

A hero usa o fluxo de vídeo do retrato original, na versão .playback.mp4, preservando sua animação sem recodificação. Essa versão foi preparada para reprodução contínua: remove somente o áudio e coloca os metadados no início do MP4. Pesa 645.101 bytes, 79% menos que a versão .scrub.mp4 usada anteriormente. A igualdade do fluxo H.264 foi verificada por SHA-256. O arquivo original permanece disponível.

Os elementos que fazem parte dos pixels do vídeo, incluindo logos, aparecem como no arquivo fornecido. Os ícones SVG e o círculo violeta sobrepostos foram removidos. A composição preserva o degradê e o hero-bloom existentes.

Arquivo ativo: assets/Videos/Animating_portrait_transforming_…_20261012185500.playback.mp4. Pôster: assets/portrait-poster.webp. A reticência … faz parte do nome real do arquivo.

O clipe ativo tem 4 s, 1280 × 720 e 24 fps. Começa automaticamente após carregar, com muted, playsinline e loop, sem aguardar GSAP ou interação. A rolagem não altera currentTime. O contador FRAME acompanha o relógio real do player. A reprodução pausa com a aba oculta, fora da viewport ou pelo controle global; retoma da posição atual. Movimento reduzido apresenta somente a foto. Se o navegador bloquear autoplay, aparece o botão “Reproduzir vídeo”, seguindo a [orientação de autoplay da MDN](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay).

A pintura da cena fica contida na hero. Ao sair da viewport, as camadas do retrato e do bloom recebem visibility: hidden, além da pausa do vídeo. Ao retornar, ficam visíveis e a reprodução retoma. A visibilidade dos textos e links não é alterada, preservando a navegação por teclado.

No objeto CONFIG, playbackRate = 1 mantém a velocidade original do vídeo e a cadência de 24 fps. Cada ciclo leva 4 s, com o relógio nativo do player, sem buscas manuais de quadros. A duração real é obtida dos metadados. A primeira dobra acompanha imediatamente a rolagem nativa, sem fixação ou distância extra. Os links “Ver cases” e “ROLE PARA VER OS CASES” saltam diretamente para a seção. O parallax discreto e a hairline de progresso usam um RAF por evento de rolagem enquanto a hero está visível, com altura em cache e a curva --ease. GSAP e ScrollTrigger foram removidos da página principal; os arquivos dos catálogos continuam como referência.

Na comparação local em Chrome sem interface, com gráficos padrão e amostras de 8 s, .scrub.mp4 descartou 18 de 184 quadros. A versão .playback.mp4 descartou 0 de 188 quadros no desktop, 0 de 189 durante a rolagem e 0 de 192 na viewport de celular. Não houve erros JavaScript. A simulação de celular não equivale a um aparelho físico. O clipe mantém seus 24 fps e a passagem original entre o último e o primeiro quadro no loop.

## Segunda dobra

Um painel ocupa a largura da seção e mostra os números fornecidos em três cards: mais de 30 lançamentos clássicos, mais de 20 lançamentos pagos e mais de 4 projetos perpétuos criados. A transição da faixa de experts usa 24 px no desktop e 8 px no celular, substituindo o espaçamento amplo de seção. Cada card tem borda em gradiente com a máscara do GenLabs, relevo interno, grade discreta do Noema, ícone e grafismo vetorial associados à categoria. Os grafismos são decorativos. A entrada usa [data-rise] com cascata de 90 ms e desenho dos traços em 1,25 s com --ease. A grade reutiliza grid-drift e pausa junto das animações globais. No celular, os indicadores empilham. A antiga coluna de serviços foi removida; o conteúdo agora está nas habilidades.

Os contadores crescem uma vez ao entrar na viewport. As barras representam somente a proporção entre esses números. Sem JavaScript, sem IntersectionObserver ou com movimento reduzido, os valores finais continuam visíveis. Leitores de tela recebem os valores finais sem anúncios a cada incremento. A entrada dos cases imediatamente após o painel usa 28 px no desktop e 22 px no celular, evitando outra faixa vazia entre as seções.

Para alterar números, atualize data-counter, o texto inicial, o texto acessível e --meter-share de cada .metric.

## Terceira dobra: cases

A seção #cases usa seis blocos alternados no desktop. No celular, cada projeto tem um card com contorno, cabeçalho com índice e nome, imagem, bio, materiais e redes sociais. A sequência fica explícita e todos os elementos pertencem ao mesmo article. Os cards têm intervalos de 24 px em até 800 px e 20 px em até 430 px. As superfícies e hairlines seguem o GenLabs, com os tokens, Manrope, Fraunces e títulos do design system. A abertura contém somente o título grande “03/ CASES”. As entradas usam data-rise, image-arrive e --ease.

Os retratos têm molduras com --radius e limite de ampliação: 340 px para Marcia, 300 px para Sanduba e Angélica, 400 px para André. As fotos são exibidas inteiras com object-fit: contain, preservando rostos e notebook. Em até 800 px, todas as áreas de imagem usam clamp(260px,75vw,360px), dentro do card de seu projeto. O livro tem escala própria para caber sem competir com a bio. As fontes originais de baixa resolução continuam limitando a nitidez; o ajuste melhora o enquadramento e reduz a ampliação excessiva.

Todos os cases têm o bloco .case-socials no final de seu conteúdo. Os seis perfis de Instagram enviados e os canais de YouTube de André e Marcia estão ativos. Sanduba do Careca usa @sandubadocareca e Angélica Gevaerd usa @angelicagevaerd; os dois não têm YouTube, conforme informado, e seus cases não exibem esse campo. Pendências: YouTube de Receita Previsível e Dani. Esses destinos ficam vazios, sem href nem foco de teclado, marcados com data-social-pending e comentários HTML. Para preencher, substituir o span pelo link com target="_blank" e rel="noopener noreferrer" e informar o perfil em data-profile-value.

Os conteúdos de Marcia Macedo, Receita Previsível, Dani Martins / Prosperus Club, Sanduba do Careca, Angélica Gevaerd e André Ferraz são os fornecidos no briefing. Os dois perpétuos VTSD agora têm cases separados. O case de Camila Soares permanece omitido até receber conteúdo. Dani Martins continua com a indicação de nome oficial a confirmar.

André Ferraz tem um case de aromaterapia com mais de 14 lançamentos, 11 pagos abertos e secretos e equipe de até 10 pessoas. A narrativa apresenta gestão de projetos, copywriting e webdesign, conforme o texto enviado. A foto de 800 × 800 px foi obtida no canal de YouTube fornecido, corresponde ao anexo e fica local em assets/cases/andre-ferraz.jpg. O case preserva o retrato inteiro, com tratamento em preto e branco e entrada image-arrive usando --ease; a pausa global e movimento reduzido funcionam como nos outros retratos. O YouTube aparece como canal principal em um card com ícone, perfil e métricas; o Instagram fica em uma linha secundária. Ambos abrem em nova aba com rel="noopener noreferrer". A mesma foto corrige a imagem de André na faixa de experts.

Sanduba do Careca usa a foto real enviada, copiada sem recodificação para assets/cases/sanduba-do-careca.jpg. O retrato inteiro aparece em uma superfície clara, com object-fit: contain e preto e branco em CSS. A entrada reutiliza .case-portrait e image-arrive; pausa global e movimento reduzido deixam a foto estática. A narrativa identifica vídeo de vendas para perpétuo, anúncios de conversão e remarketing seguindo o VTSD. As três copies enviadas estão ativas em nova aba, com rel="noopener noreferrer" e aviso de que são apenas uma seleção.

Angélica Gevaerd tem um case próprio de marketplace. A narrativa fornecida descreve sua trajetória do rugby ao marketplace e o vídeo de vendas para perpétuo, anúncios de conversão e remarketing seguindo o VTSD. A foto real, assets/cases/angelica-gevaerd.png, substitui a imagem ilustrativa e aparece inteira em uma superfície clara, preservando rosto e notebook. O layout e a entrada reutilizam .case-portrait, image-arrive, --ease, pausa global e movimento reduzido. No desktop, o texto ocupa 48% e a imagem 52%; no celular, o retrato aparece antes do texto, com as mesmas alturas do case do Sanduba. Somente as duas copies enviadas são exibidas, com abertura em nova aba, rel="noopener noreferrer" e nota de que muitas outras foram produzidas.

O case de Marcia usa a foto real enviada, em assets/cases/marcia-macedo.jpg. A área visual ocupa 52% da largura no desktop; a foto fica inteira em sua moldura, com limite de 340 px. No celular, o cabeçalho com seu nome vem antes da imagem e da bio. A figura usa data-rise e sua camada interna reutiliza image-arrive de 1,7 s com --ease, sem disputar o transform do hover. Pausa global e movimento reduzido apresentam a foto estática. A origem de 225 × 225 px limita a nitidez ao ampliar.

O case da Receita Previsível usa a headline “Copywriter do ecossistema.” e o histórico fornecido por Alisson sobre campanhas, workshops, eventos, lançamentos e produção de conteúdo. A narrativa está em quatro parágrafos, com os nomes em destaque e largura máxima de 58ch. A foto do livro enviada fica em assets/cases/receita-previsivel-livro.jpg, com 387 × 516 px. A capa aparece inteira, com moldura .glass-card, grade Noema, um bloom violeta, rótulos monoespaçados e .signal-line. A entrada usa data-rise e image-arrive de 1,7 s; a flutuação reutiliza tile-drift do design system em 6 s com --ease. Hover pausa a flutuação e responde com inclinação e borda. Pausa global e movimento reduzido deixam o livro estático. O observador de loops acompanha a figura para suspender também grade e bloom fora da viewport. No celular, a área segue a altura comum de clamp(260px,75vw,360px); o livro usa largura de clamp(128px,38vw,180px), dentro do card identificado como Receita Previsível.

O case da Dani agora usa as duas imagens enviadas, copiadas sem recodificação para assets/cases/dani-martins-empreenda.png e assets/cases/dani-martins-times-square.png. A galeria apresenta a capa da revista Empreenda e a foto na Times Square, com legendas, molduras e proporções originais. Os links nas imagens abrem os PNGs completos em nova aba, com foco visível por teclado. No desktop, a segunda foto tem um pequeno deslocamento editorial; no celular, ambas ficam alinhadas dentro do card identificado como Dani Martins. A entrada reutiliza image-arrive e --ease, respeitando pausa global e movimento reduzido. O preto e branco fica somente no CSS; não há zoom nas imagens da galeria para preservar toda a capa. O microfone ilustrativo deixou de ser exibido e permanece como arquivo de referência. A origem das imagens está registrada em [assets/cases/README.md](portfolio/assets/cases/README.md).

O case de Marcia apresenta mais de 8 lançamentos clássicos juntos e outros projetos de perpétuo, a evolução de copywriter para a operação e os produtos Fluenti e Português Todo Dia. A atuação está indicada como “Gestão operacional + copy”. Os cinco documentos e a página de vendas PTD informados por Alisson estão ativos, com target="_blank", rel="noopener noreferrer" e rótulos indicando a abertura em nova aba. O aviso abaixo explica que os links são uma seleção e que várias outras copies foram produzidas.

Na Receita Previsível, o bloco “Forbes / Sobre o livro e seu autor” apresenta referências editoriais. O item do livro está vinculado à [matéria do Forbes Agency Council de 24/05/2021](https://www.forbes.com/councils/forbesagencycouncil/2021/05/24/12-influential-books-every-agency-professional-should-read/), confirmada como a primeira imagem enviada, que inclui Predictable Revenue no item 6. O item sobre Aaron Ross mantém a atribuição Forbes informada no segundo anexo e permanece estático até receber seu endereço exato. O HTML marca essa pendência em comentário, sem inventar um destino. As referências não atribuem a Alisson autoria das matérias da Forbes.

As três copies de Dani Martins estão vinculadas aos documentos enviados, com abertura em nova aba, rel="noopener noreferrer" e descrição acessível. A tabela identifica “Seleção de copies” e inclui a nota de que muitas outras foram desenvolvidas no projeto, usando o mesmo componente do case de Marcia.

Os demais materiais pendentes continuam estáticos, com data-copy-link identificando o destino, sem href e com aria-disabled="true". Para ativar depois, preencher href e retirar aria-disabled. Há um único botão centralizado de WhatsApp ao final de todos os cases e materiais, sem botões dentro dos cases.

A ordem dos cases é André Ferraz, Marcia Macedo, Receita Previsível, Dani Martins, Sanduba do Careca e Angélica Gevaerd; a numeração mobile acompanha essa ordem. André e Marcia priorizam o YouTube em cards com borda, ícone e cores do design system, seguidos pelo Instagram. Os números reproduzem os anexos enviados: André, 471 mil inscritos e 753 vídeos; Marcia, 724 mil inscritos e 760 vídeos. São dados estáticos, sem embeds nem consultas durante o carregamento.

## Habilidades

A seção #habilidades fica imediatamente depois de #cases. Usa .ds-group, .section-inner, .ds-top, .ds-head, .glass-card e .ds-stage, com bloom e grid discretos do sistema. Seis cards apresentam as habilidades fornecidas; Coprodução foi removida. O sétimo, tracejado, é o único link e ocupa a linha inteira no desktop. O título, a numeração e os atrasos de entrada acompanham a nova quantidade. Em até 800 px, a grade tem uma coluna; em até 430 px, os ícones medem 40 px e os índices ficam ocultos.

Na entrada, a hairline se abre da esquerda para a direita, as duas linhas do título usam line-rise com intervalo de 110 ms e o apoio usa a revelação de palavras do sistema. Os cards entram em cascata de 90 ms por grupo visível, com atraso máximo de 630 ms no desktop e 270 ms no celular; no celular, os cards seguintes não acumulam o atraso dos anteriores. Ícones e textos completam a entrada em etapas próximas, usando image-arrive e rise. A sequência ocorre uma vez, respeita a pausa global e movimento reduzido e apresenta todo o conteúdo sem JavaScript ou CDN.

O holofote atualiza --px e --py para cada card, inclusive vizinhos, em um único requestAnimationFrame por atualização. As leituras de layout ficam em cache e são invalidadas ao rolar ou redimensionar. Não há loop JavaScript ocioso. As máscaras de borda seguem a técnica do GenLabs. Ao sair da grade, a iluminação desaparece em 400 ms.

Ponteiro grosso, toque, movimento reduzido, aba oculta e pausa global desativam o holofote e o lift. O hover estático e o foco visível permanecem disponíveis. Os logos locais de n8n e ClickUp aparecem desde o carregamento, sem depender de máscaras SVG. O n8n conserva seu rosa original; o ClickUp começa em tons de cinza e recebe suas cores no hover ativo. Suas fontes estão registradas em [assets/logos/README.md](portfolio/assets/logos/README.md). Como a ferramenta de Webdesign não foi informada, o card usa o SVG de navegador previsto no briefing.

O card final abre o WhatsApp de Alisson em nova aba, com o mesmo número e mensagem do botão flutuante e do hero.

O botão flutuante fica no canto inferior direito em toda a página. Usa .button.button-primary.magnetic, o gradiente violeta, as sombras e o sheen existentes. A entrada usa rise e --ease. Em até 1100 px, fica compacto, com alvo de toque de 56 px e nome acessível. Respeita as áreas seguras do dispositivo, a pausa global e movimento reduzido. A hero e o rodapé reservam espaço para preservar os controles próximos. O link funciona mesmo sem JavaScript ou CDN.

## Botões ao final das dobras

Há 16 encerramentos com .fold-cta e .fold-whatsapp: hero, experiência em números, seis cases, habilidades, método, públicos, três partes de Sobre mim, perguntas e contato. Cada case mantém seu botão dentro do mesmo article, inclusive no celular. Na seção Sobre mim, os encerramentos acompanham história, trajetória preta e formação. O contato usa um único botão principal, centralizado após os canais.

Os botões são links HTML estáticos, com o logo do WhatsApp, texto e seta em cápsula. Permanecem visíveis sem hover ou entrada por opacidade, e funcionam sem JavaScript. Reutilizam o gradiente, relevo, borda pulsante, brilho e --ease da hero. O observador de movimento pausa cada encerramento fora da viewport, além da pausa global, aba oculta e movimento reduzido. A revisão em Chrome conferiu centralização, alvos de toque, links e agrupamento dos cases em sete viewports de 320 a 1440 px; também verificou animação visível, suspensão fora da tela, pausa global e movimento reduzido.

## Como eu trabalho

A seção #metodo vem depois de Habilidades. O título ocupa toda a largura; abaixo ficam o apoio e as cinco etapas à esquerda, com a tela e sua descrição à direita. As proporções das colunas são 42/58. A seção usa .ds-group, .ds-top, .ds-head, .glass-card, .ds-sheet, .badge e os mesmos tokens e fontes. Não há fixação nem progresso ligado à rolagem.

As telas de Diagnóstico, Planejamento, Produção, Operação e Resultados são HTML/CSS decorativos. O gráfico não apresenta números ou eixos; os únicos números nas telas são os identificadores de etapa e os prazos genéricos “Semana 1” e “Semana 2” pedidos no briefing. Não há fotos, logos, nomes de clientes ou resultados inventados nas telas do método.

O autoplay usa um temporizador de 5.000 ms e uma hairline animada com --ease. Só avança quando o painel está visível. A primeira interação por hover, clique, toque ou teclado encerra o autoplay definitivamente. Pausa global, movimento reduzido, saída da viewport e aba oculta suspendem o temporizador. A pausa preserva o tempo restante. Para ajustar o ritmo, altere meterDuration = 5000 no JavaScript.

A troca combina saída de 200 ms e entrada de 300 ms, com os deslocamentos de 8 px e 12 px especificados. Trocas rápidas cancelam a anterior e preservam a última escolha; eventos repetidos na mesma etapa não reiniciam a animação. Com pausa global ou movimento reduzido, a troca é instantânea. A descrição muda junto e o link “Ver os cases” permanece fixo, levando a #cases.

O tablist usa foco itinerante, aria-selected e um tabpanel com o nome da etapa ativa. Setas verticais funcionam no desktop; setas horizontais, no celular; Home e End funcionam nos dois. Em até 800 px, as etapas viram pílulas com rolagem lateral e scroll-snap. Em até 430 px, a tela assume proporção 4:5 e simplifica os cronogramas e status. Sem JavaScript, as descrições permanecem acessíveis na apresentação estática. A interação não depende de GSAP ou CDN.

## Para quem faz sentido

A seção independente #para-quem fica entre #metodo e #sobre. Usa fundo --void-soft com luz estática discreta, texto --ink, apoio --muted e acentos --signal e --mint. O título combina Arial/Helvetica e Fraunces. A faixa horizontal atravessa a largura da página, com cards parcialmente cortados nas bordas. Quatro ícones SVG representam experts, times, operações e primeiro lançamento, sem fotografias, novas fontes ou bibliotecas. Os textos dos quatro públicos e o botão de WhatsApp centralizado foram preservados. A composição está documentada em [assets/audience/README.md](portfolio/assets/audience/README.md).

A faixa desliza da direita para a esquerda em um loop CSS linear de 48 s, com três grupos visualmente idênticos. Somente o primeiro é exposto a leitores de tela; as cópias não têm IDs nem controles interativos. Hover ou foco suspendem o deslocamento. A primeira interação por botão, gesto, rolagem horizontal ou teclado encerra o loop e assume a rolagem nativa, com snap e controles de início/fim. Os ícones flutuam 3 px em 6 s com --ease, enquanto o ponto da órbita percorre o contorno em 18 s. O observador nativo pausa a faixa e cada card fora da viewport; pausa global e aba oculta também suspendem os loops. Movimento reduzido e ausência de JavaScript apresentam uma única sequência estática com rolagem horizontal. A entrada lateral usa [data-rise] e --ease. Layout, SVGs, controles, hover, pausa, movimento reduzido e ausência de JavaScript foram revisados em seis larguras de 320 a 1440 px. Prévias: output/previews/audience-icons-desktop.png e audience-icons-mobile.png.

## Sobre mim

A seção #sobre foi criada após #metodo. A composição editorial usa .surface-paper, o .noise original, Arial/Helvetica, Manrope e Fraunces 300, com destaque #5047c9 e apoio #58575f. O retrato agora usa o vídeo enviado Criar_vídeo_com_transição_fluida_20261013164736.mp4, copiado sem recodificação para assets/about/. O clipe tem 6,016 s, 1280 × 720 e cerca de 1,34 MB. O quadro do cronograma agora usa Animation_from_book_to_timeline_20261013171036.mp4, também enviado por Alisson e copiado sem recodificação. Tem 6,016 s, 1280 × 720 e 1.132.032 bytes. A antiga foto de planejamento não é mais apresentada. As origens dos arquivos estão em [assets/about/README.md](portfolio/assets/about/README.md).

O vídeo já contém o risco sobre Só copywriter e os rótulos Estrategista e Gestor operacional; por isso, a antiga sobreposição do X foi retirada. O quadro inteiro é preservado em 16:9, com as cores originais dos rótulos. A composição reutiliza a inclinação, a sombra, image-arrive e --ease do sistema, com revelação suave do vídeo após a reprodução iniciar. A reprodução é nativa, em loop, sem áudio e sem controle temporal pela rolagem. Os dois MP4s só recebem seus endereços quando o respectivo quadro está visível e o movimento é permitido; pausa fora da viewport, com a aba oculta e pelo controle global. Um bloqueio de autoplay oferece o botão Reproduzir vídeo. Erro de vídeo, ausência de JavaScript, movimento reduzido e modo de prévia apresentam assets/about/about-video-poster.webp, quadro extraído próximo de 4,8 s com os dois cargos. O pôster pesa cerca de 45 KB. Os caminhos são relativos e seguem os rewrites de /portfolio.

O segundo vídeo mostra um livro que se transforma em linha do tempo e cronograma. A dobra da trajetória usa fundo --void em toda a largura, com os textos em --ink, apoio --muted e sinais --signal. O vídeo preenche a altura do lado direito com object-fit: cover, sem moldura, inclinação, sombra ou legenda visual. Uma máscara estática de opacidade suaviza as bordas laterais sobre o fundo preto. O MP4 original permanece sem filtros de recorte de fundo, canvas ou processamento de pixels por JavaScript. No celular, o vídeo aparece antes da trajetória, em 16:9, dentro da mesma dobra preta. O pôster timeline-video-poster.webp foi extraído próximo de 4,81 s, em 1280 × 720 e 40.532 bytes. A entrada image-arrive e o fade de 800 ms permanecem. Um controlador por quadro preserva visibilidade, carga, pausa e fallback independentes, com o mesmo controle global. Sem JavaScript ou com movimento reduzido, aparece o pôster.

História, cinco marcos da trajetória e cinco referências de formação seguem o briefing fornecido. A narrativa da história tem título curto, abertura de 20 px, parágrafos separados e destaques semânticos com strong. O trecho sobre alavancas recebe borda violeta discreta, a virada da trajetória usa Fraunces e os mais de 40 lançamentos fecham o texto após uma hairline. A organização foi conferida em 320, 390 e 1440 px, sem corte do texto ou rolagem horizontal. Assinatura, depoimentos e parágrafo familiar dependem de conteúdo ou confirmação e não foram incluídos. A grade tem 12 colunas no desktop e respeita os breakpoints 1100, 800 e 430 px. No celular, a ordem é retrato em movimento, história, vídeo do cronograma, trajetória e formação.

O retrato em vídeo foi revisado no Chrome em seis larguras, de 320 a 1440 px, com enquadramento integral, reprodução automática, avanço do relógio, pausa global, suspensão fora da viewport e retomada. Foram conferidos movimento reduzido, apresentação sem JavaScript, erro de vídeo, falha de CDN e bloqueio simulado de autoplay com reprodução por Tab e Enter. Os recursos relativos foram verificados em /portfolio, /portfolio/ e pela resolução ao arquivo local. As prévias anteriores são output/previews/about-video-desktop.png e about-video-mobile.png. A versão com os dois vídeos foi revisada nas mesmas seis larguras, incluindo reprodução manual por Enter após bloqueio simulado de autoplay, erro do MP4, carregamento adiado, pausa/retomada e movimento reduzido. As prévias com moldura estão em output/previews/about-timeline-desktop.png e about-timeline-mobile.png. A dobra preta com vídeo de fundo foi verificada de 320 a 1440 px, com ordem mobile preservada e sem rolagem horizontal. Prévias atuais: output/previews/timeline-background-desktop.png, timeline-background-mobile.png, about-background-desktop.png e about-background-mobile.png.

## Perguntas, contato e rodapé

As seções #perguntas e #contato vêm imediatamente após #sobre. A identidade mantém os tokens e componentes do design system, incluindo .ds-group, .section-inner, .ds-top, .section-title, .line-mask, .glass-card, .button-primary, .magnetic, .caption, .toast e .footer. O contato anterior foi substituído, removendo seus estilos de superfície clara. Não há textos publicados entre colchetes.

O FAQ publica as três respostas confirmadas. As quatro perguntas pendentes estão reservadas em `<template id="faq-pending">`, com comentários para preencher depois, sem aparecer no site ou no JSON-LD. Para ativar cada uma, preencha sua resposta, mova o artigo para #faq-list na ordem desejada, ajuste os atrasos em passos de 70 ms e atualize o FAQPage com a mesma pergunta e resposta.

A primeira resposta começa aberta. Botões nativos aceitam Tab, Enter e Espaço, com aria-expanded, aria-controls e regiões identificadas. Apenas uma resposta pode estar aberta. A transição usa grid-template-rows em 450 ms, com opacidade e deslocamento de 8 px; a seta gira em 400 ms. Sem JavaScript, todas as respostas confirmadas permanecem legíveis. O holofote das habilidades foi extraído para uma função compartilhada; no FAQ, a intensidade é de 8%.

Um único campo decorativo estático atravessa as duas seções. Os blooms preservam --electric a 18% e --mint a 10%, com opacidade .45 e um corredor sem luz atrás dos textos longos. Quatro fios SVG, dois no celular, e a grade de 100 px permanecem como textura. A grade não desloca background-position, os fios não animam stroke-dashoffset e o fundo não acompanha o ponteiro. Assim, o fundo deixa de ser repintado continuamente junto da ilustração.

O contato publica WhatsApp, alisson.segecsmiguel@gmail.com, Instagram e YouTube fornecidos no briefing. O clique no e-mail preserva mailto, copia o endereço e mostra “E-mail copiado.” somente após sucesso real. O CTA entra em 600 ms, com escala de .94 a 1, e recebe uma passagem do brilho original. O rodapé mostra o CNPJ 64.493.187/0001-95, © 2026 e o link #top, que retorna ao início e transfere o foco à marca.

O contato usa uma composição editorial de duas colunas: headline, texto, botão de WhatsApp e legenda à esquerda, fluxo financeiro abstrato à direita. Não há outro CTA após os canais de contato. Cédulas SVG com R$ entram em uma carteira de vidro, com rotação e deriva suaves, usando os tokens e --ease. A ilustração é decorativa, sem valores, saldos ou marcas de bancos. Os fios anteriores ficam concentrados no FAQ. Os canais de contato recebem uma hairline superior e alinhamento comum.

São seis cédulas no desktop e quatro no celular, com ciclos CSS de 10 a 14 s. Para ajustar o ritmo, altere --money-duration nos elementos .money-note; --money-delay controla a distribuição ao longo do ciclo. No celular, o texto fica centralizado e a carteira aparece abaixo. Pausa global e movimento reduzido exibem uma composição estática; fora da viewport, o fluxo pausa com IntersectionObserver. Não há RAF nem dependência externa para a animação das cédulas. A composição usa somente transform e opacity nos loops, incluindo a luz da carteira. O recorte das cédulas usa overflow, sem máscara animada ou perspectiva 3D. O IntersectionObserver acompanha .closing-visual, pausando o fluxo quando a própria ilustração sai da tela, mesmo que o texto de contato ainda esteja visível. will-change é aplicado às cédulas apenas enquanto visíveis e liberado durante pausa global, movimento reduzido e aba oculta. Sem JavaScript, a composição fica estática.

Na comparação local no Chrome sem interface, em amostras de 5 s após a entrada da seção, foram registrados 1.008 eventos Paint no desktop e 744 na viewport de celular antes da otimização; depois, 0 em ambas. O movimento das cédulas continuou ativo. Essa medida verifica a redução de repinturas no navegador de teste, não promete uma taxa de quadros em aparelhos físicos. Prévias: output/previews/contact-light-desktop.png e contact-light-mobile.png.

## Desempenho e carregamento

A revisão de 13/10/2026 mantém o site estático, sem build ou dependências de execução externas. O HTML/CSS/JS incorporados permanecem em portfolio/index.html. A hero prioriza seu pôster e as duas fontes locais, com font-display: swap. Os MP4s usam data-src e recebem o endereço somente quando o movimento é permitido e o vídeo está visível. A seção Sobre não solicita seu pôster pelo atributo poster do player: a imagem de fallback continua com loading="lazy". Movimento reduzido e ausência de JavaScript não baixam os vídeos.

As versões menores em assets/optimized/ preservam os originais para revisão e ampliação. A Dani usa WebP nas duas fotos: 1.307.845 bytes de PNG foram substituídos por 143.662 bytes na apresentação, redução de 89%. Os links de ampliação continuam abrindo os PNGs originais. O avatar de André passou de 72.777 para 9.338 bytes. O retrato de André tem srcset e sizes, para selecionar a resolução adequada à tela. As variantes antigas da foto de planejamento permanecem como referência, sem uso na página. Imagens que já eram menores que a conversão permanecem em JPEG. Origens, dimensões e tamanhos constam em assets/optimized/README.md.

Os nomes dos arquivos otimizados incluem um hash SHA-256 do conteúdo. As fontes foram copiadas sem mudar seus bytes. vercel.json configura Cache-Control: public, max-age=31536000, immutable somente para /assets/optimized/ e /portfolio/assets/optimized/. Para atualizar um recurso dessa pasta, gere outro nome com o novo hash e atualize seus usos no HTML. Não sobrescreva um nome já publicado. A página e os arquivos mutáveis não recebem esse cache longo. A configuração foi preparada e validada localmente, sem publicação.

serve.cjs reproduz os headers, usa ETag para revalidação e oferece Brotli/gzip para HTML, SVG, CSS e JS. MP4s, imagens e WOFF2 não são recomprimidos; os intervalos HTTP Range permanecem em bytes do arquivo original. Ao atualizar serve.cjs ou vercel.json, reinicie a instância local. A primeira dobra reutiliza uma textura de 180 × 180 px, evitando calcular o ruído em uma superfície do tamanho da tela. Cards com fundo opaco não usam backdrop-filter.

A revisão nativa verificou seis larguras, de 320 a 1440 px, com autoplay, pausa/retomada, vídeos fora da viewport, navegação mobile, cases agrupados, FAQ, método e contato. Movimento reduzido e ausência de JavaScript foram conferidos sem transferências de MP4. Foram verificados os headers nas duas rotas dos recursos, respostas 304, compressão sem alterar o HTML e Range 206 para vídeo. A auditoria de rotas verifica /portfolio, /portfolio/ e os caminhos relativos ao arquivo local. As medições com rede a 180 KiB/s, latência de 120 ms e CPU 4× são simulações locais, não uma nota de Lighthouse nem resultado garantido em aparelhos físicos.

Prévias atuais: output/previews/hero-performance-mobile.png e hero-performance-desktop.png. As prévias anteriores no README registram etapas anteriores da implementação.

## Conteúdos pessoais e publicação

- Alisson Segecs está no título, descrição, marca e rodapé. A marca usa o ícone de caneta do sistema.
- E-mail, WhatsApp e redes sociais estão configurados com os dados fornecidos.
- As fotos e os links dos cases são provisórios. “Materiais” no menu aponta para as peças já listadas em outros projetos. O bloco vazio de materiais foi removido.
- Para hospedar, mantenha em portfolio/: index.html, favicon.svg, assets/cases/, assets/logos/, assets/about/, assets/og-image.jpg, o clipe Animating_portrait_transforming_…_20261012185500.playback.mp4, portrait-poster.webp e as fontes usadas em referenciais/terrasprint-ai-design-system/.
- SEO: canonical e og:url apontam para https://alissonsegecs.com.br/portfolio; og:image usa https://alissonsegecs.com.br/portfolio/assets/og-image.jpg (1200 × 630, captura do hero).
- serve.cjs, .preview/ e output/previews/ são ferramentas e artefatos de revisão, não dependências da página. O .vercelignore impede que output/, serve.cjs e este README sejam publicados.

## Verificação e prévias

Os testes de DOM passaram para autoplay, independência da rolagem, pausa global, retomada, aba oculta, saída da viewport, bloqueio de autoplay com tentativa manual, movimento reduzido, falhas de CDN/vídeo, contadores, links e foco. A hero usa rolagem nativa sem fixação. O clipe foi preparado com FFmpeg.

Os testes em navegador das habilidades passaram para os oito cards, logos locais, grade responsiva até 320 px, iluminação dos vizinhos, lift, troca de cor, pausa global, movimento reduzido, proteção para toque, saída suave e foco do CTA. O GIF de 3,5 s foi gravado do HTML real no Chrome e exportado com FFmpeg.

A nova entrada foi verificada em desktop e celular, incluindo pausa durante a sequência, retomada, movimento reduzido, layout de 320 px e falha de CDN. O GIF da entrada usa 32 capturas do HTML real, com as animações CSS amostradas em instantes fixos pela Web Animations API, e foi exportado com FFmpeg. Esse método mostra a composição e a coreografia sem vincular o ritmo ao tempo de captura dos PNGs.

As imagens abaixo foram renderizadas do HTML real no Chrome sem interface. O modo ?preview=1 conclui as entradas e fixa o primeiro estado do card somente para a exportação. A navegação normal não usa esse modo.

O método passou pelos cinco estados em sete larguras, de 320 a 1440 px, e pela revisão de hover, persistência da escolha, interrupção do autoplay, teclado, trocas rápidas, pausa, movimento reduzido e falha de CDN. Os GIFs mostram o temporizador e os eventos de ponteiro reais do HTML no Chrome, com o intervalo original do autoplay. A captura respeita o tempo observado entre os quadros.

Sobre mim passou pela revisão em sete larguras de 320 a 1440 px, com fotos carregadas localmente, ordem de leitura, ausência de rolagem horizontal, cores da superfície clara, hover nativo, pausa global, movimento reduzido, falha de CDN e apresentação sem JavaScript. Não houve erros JavaScript não tratados. O GIF mostra o desenho do X e o hover nas duas fotos, gravados do HTML real com eventos de ponteiro no Chrome e exportados com FFmpeg.

As seções finais passaram por sete larguras, de 320 a 1440 px, com revisão de ordem, cores, quatro/dois fios, quatro/duas colunas de canais, ausência de rolagem horizontal e equivalência entre respostas publicadas e FAQPage. A revisão nativa verificou Enter/Espaço, foco, trocas rápidas, um card aberto, clipboard real, pausa, fundo fora da tela, movimento reduzido, #top e apresentação sem JavaScript/CDN. O vídeo MP4 usa frames nativos do screencast do Chrome, eventos reais de ponteiro e os tempos observados, exportados com FFmpeg. As prévias da seção escondem apenas a navegação e o botão flutuante para isolar a composição.

O contato refinado foi revisado em sete larguras de 320 a 1440 px, com headline completa, carteira dentro da viewport, canais sem overflow, seis/quatro cédulas, animação independente da rolagem, pausa global, retomada, suspensão fora da tela, movimento reduzido e apresentação sem JavaScript/CDN. Não houve erros JavaScript não tratados. O vídeo de revisão grava o movimento CSS real do navegador.

- [Hero desktop, 1440 × 900](output/previews/hero-desktop.png)
- [Hero mobile, 390 × 844](output/previews/hero-mobile.png)
- [Cases desktop, seção completa](output/previews/cases-desktop-full.png)
- [Cases mobile, seção completa](output/previews/cases-mobile-full.png)
- [Habilidades desktop](output/previews/skills-desktop.png)
- [Habilidades mobile](output/previews/skills-mobile.png)
- [GIF do efeito de proximidade](output/previews/skills-proximity.gif)
- [Prévia animada da entrada das habilidades](output/previews/skills-entry.gif)
- [Entrada das habilidades, desktop](output/previews/skills-entry-desktop.png)
- [Entrada das habilidades, mobile](output/previews/skills-entry-mobile.png)
- [Painel de números atualizado](output/previews/results-desktop.png)
- [Como eu trabalho, desktop](output/previews/method-desktop.png)
- [Como eu trabalho, mobile](output/previews/method-mobile.png)
- [GIF do autoplay do método](output/previews/method-autoplay.gif)
- [GIF do hover do método](output/previews/method-hover.gif)
- [Botão flutuante de WhatsApp, desktop](output/previews/whatsapp-desktop.png)
- [Botão flutuante de WhatsApp, mobile](output/previews/whatsapp-mobile.png)
- [Sobre mim, desktop](output/previews/about-desktop.png)
- [Sobre mim, mobile](output/previews/about-mobile.png)
- [GIF do X e do hover nas fotos](output/previews/about-motion.gif)
- [Perguntas, contato e rodapé, desktop](output/previews/final-desktop.png)
- [Perguntas, contato e rodapé, mobile](output/previews/final-mobile.png)
- [Vídeo das interações finais](output/previews/final-sections-motion.mp4)
- [Contato refinado, desktop](output/previews/contact-refined-desktop.png)
- [Contato refinado, mobile](output/previews/contact-refined-mobile.png)
- [Vídeo do dinheiro entrando na carteira](output/previews/contact-refined-motion.mp4)
- [Hero com WhatsApp principal, desktop](output/previews/hero-whatsapp-desktop.png)
- [Hero com WhatsApp principal, mobile](output/previews/hero-whatsapp-mobile.png)

As prévias permitem revisar a composição. A fluidez percebida do scroll e do decodificador ainda varia por dispositivo e não é uma promessa de precisão quadro a quadro.

Os botões de encerramento permanecem centralizados em resultados, cases, habilidades, método, público e FAQ. A bio, a trajetória e os professores não incluem esses botões. A hero e o próximo passo mantêm suas ações junto ao texto.
