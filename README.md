# Portfólio de gestão de lançamentos

O arquivo index.html contém HTML, CSS e JavaScript incorporados. A composição usa o design system Noema × GenLabs × TerraSprint, preservando os tokens e as fontes locais. Não exige build.

## Executar

Com Node.js instalado, execute na pasta do projeto:

```powershell
node serve.cjs
```

Abra http://127.0.0.1:4173. Encerre com Ctrl+C. Live Server e servidores estáticos com suporte a HTTP Range também funcionam. GSAP e ScrollTrigger 3.12.5 carregam por CDN; se falharem, os conteúdos e as animações CSS permanecem disponíveis.

## Hero

O eyebrow é “GESTÃO DE LANÇAMENTOS / PORTFÓLIO”. A headline tem cinco linhas: “Lançamentos para experts que querem”, “escalar”, “sem perder”, “o controle da” e “operação.”. As linhas pequenas usam Manrope 400; as grandes, Arial/Helvetica 500; o destaque editorial, Fraunces 300.

As classes .hero__copy, .hero__lead, .line-mask, .font-fraunces, .button-ghost, .hero-card.glass-card, .carousel-track e .signal-strip seguem o vocabulário do sistema. A curva das animações vem de --ease, inclusive nos efeitos JavaScript. Não há travessões nos textos da página.

O botão “Ver cases” e a indicação de rolagem levam a #cases. “Conversar no WhatsApp” no hero abre uma nova aba com rel="noopener noreferrer". Substitua SEU_NUMERO no link https://wa.me/SEU_NUMERO pelo seu número internacional, ou cole seu link wa.me completo. O balão de conversa usa SVG inline com stroke de 1,5.

O card alterna entre três provas, em ciclo de 12 s, com aproximadamente 3 s de permanência em cada estado. Pausa com hover e foco. No celular de até 430 px, fica em linha e esconde badge e caption. A faixa abaixo da hero duplica o grupo de cinco frases para o ticker contínuo.

O botão de pausa ao lado da navegação suspende o vídeo, os efeitos de ponteiro, os elementos flutuantes, o carrossel e o ticker. A preferência por movimento reduzido mantém os textos legíveis, a foto estática e o primeiro estado do card. Os loops pausam fora da viewport e com a aba oculta.

## Retrato em movimento

A hero usa o fluxo de vídeo do retrato original, na versão .playback.mp4, preservando sua animação sem recodificação. Essa versão foi preparada para reprodução contínua: remove somente o áudio e coloca os metadados no início do MP4. Pesa 645.101 bytes, 79% menos que a versão .scrub.mp4 usada anteriormente. A igualdade do fluxo H.264 foi verificada por SHA-256. O arquivo original permanece disponível.

Os elementos que fazem parte dos pixels do vídeo, incluindo logos, aparecem como no arquivo fornecido. Os ícones SVG e o círculo violeta sobrepostos foram removidos. A composição preserva o degradê e o hero-bloom existentes.

Arquivo ativo: assets/Videos/Animating_portrait_transforming_…_20261012185500.playback.mp4. Pôster: assets/portrait-poster.webp. A reticência … faz parte do nome real do arquivo.

O clipe ativo tem 4 s, 1280 × 720 e 24 fps. Começa automaticamente após carregar, com muted, playsinline e loop, sem aguardar GSAP ou interação. A rolagem não altera currentTime. O contador FRAME acompanha o relógio real do player. A reprodução pausa com a aba oculta, fora da viewport ou pelo controle global; retoma da posição atual. Movimento reduzido apresenta somente a foto. Se o navegador bloquear autoplay, aparece o botão “Reproduzir vídeo”, seguindo a [orientação de autoplay da MDN](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay).

No objeto CONFIG, playbackRate = 1 mantém a velocidade original do vídeo e a cadência de 24 fps. Cada ciclo leva 4 s, com o relógio nativo do player, sem buscas manuais de quadros. A duração real é obtida dos metadados. A primeira dobra acompanha imediatamente a rolagem nativa, sem fixação ou distância extra. Os links “Ver cases” e “ROLE PARA VER OS CASES” saltam diretamente para a seção. O parallax discreto usa um único ScrollTrigger durante a saída da hero, seguindo a [documentação oficial](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

Na comparação local em Chrome sem interface, com gráficos padrão e amostras de 8 s, .scrub.mp4 descartou 18 de 184 quadros. A versão .playback.mp4 descartou 0 de 188 quadros no desktop, 0 de 189 durante a rolagem e 0 de 192 na viewport de celular. Não houve erros JavaScript. A simulação de celular não equivale a um aparelho físico. O clipe mantém seus 24 fps e a passagem original entre o último e o primeiro quadro no loop.

## Segunda dobra

Um painel ocupa a largura da seção e mostra os números fornecidos em três colunas: mais de 30 lançamentos clássicos, mais de 20 lançamentos pagos e mais de 4 projetos perpétuos criados. No celular, os indicadores empilham. A antiga coluna de serviços foi removida; o conteúdo agora está nas habilidades.

Os contadores crescem uma vez ao entrar na viewport. As barras representam somente a proporção entre esses números. Sem JavaScript, sem IntersectionObserver ou com movimento reduzido, os valores finais continuam visíveis. Leitores de tela recebem os valores finais sem anúncios a cada incremento.

Para alterar números, atualize data-counter, o texto inicial, o texto acessível e --meter-share de cada .metric.

## Terceira dobra: cases

A seção #cases usa quatro blocos sem intervalos, alternando texto claro com imagem à direita e imagem à esquerda com texto escuro. As superfícies e hairlines seguem o GenLabs, com os tokens, Manrope, Fraunces e títulos do design system do portfólio. A abertura usa .ds-top e .ds-head; o painel claro usa .surface-paper.glass-panel. As entradas usam data-rise em intervalos de 90 ms.

Os conteúdos de Marcia Macedo, Receita Previsível, Dani Martins / Prosperus Club e os dois perpétuos VTSD são os fornecidos no briefing. O quinto case permanece omitido até receber conteúdo. Dani Martins continua com a indicação de nome oficial a confirmar.

As fotos são provisórias e locais em assets/cases/, com fontes e licença registradas em [assets/cases/README.md](assets/cases/README.md). Em até 800 px, cada foto fica acima do seu texto e mede 280 px de altura. As imagens usam grayscale(1) contrast(1.1), object-fit: cover e zoom de 1,04 em 1.200 ms, com --ease. Pausa global e movimento reduzido suspendem esse zoom.

Conforme solicitado, os links desta seção são estáticos. Cada a.case-link possui data-copy-link identificando o destino, sem href e com aria-disabled="true". Para ativar depois, preencher href e retirar aria-disabled. Os atributos target="_blank" e rel="noopener" já estão preparados. A faixa de convite para conversar no WhatsApp ao final dos cases foi removida por enquanto.

## Habilidades

A seção #habilidades fica imediatamente depois de #cases. Usa .ds-group, .section-inner, .ds-top, .ds-head, .glass-card e .ds-stage, com bloom e grid discretos do sistema. Sete cards apresentam as habilidades fornecidas; o oitavo, tracejado, é o único link. Em até 800 px, a grade tem uma coluna; em até 430 px, os ícones medem 40 px e os índices ficam ocultos.

As entradas usam data-rise em cascata de 90 ms. O holofote atualiza --px e --py para cada card, inclusive vizinhos, em um único requestAnimationFrame por atualização. As leituras de layout ficam em cache e são invalidadas ao rolar ou redimensionar. Não há loop JavaScript ocioso. As máscaras de borda seguem a técnica do GenLabs. Ao sair da grade, a iluminação desaparece em 400 ms.

Ponteiro grosso, toque, movimento reduzido, aba oculta e pausa global desativam o holofote e o lift. O hover estático e o foco visível permanecem disponíveis. Os logos locais de Typebot e ClickUp aparecem desde o carregamento, em tons de cinza, sem depender de máscaras SVG. No hover ativo, recebem suas cores originais. Suas fontes estão registradas em [assets/logos/README.md](assets/logos/README.md). Como a ferramenta de Webdesign não foi informada, o card usa o SVG de navegador previsto no briefing.

O link do WhatsApp ainda não foi fornecido. O card final leva temporariamente a #contato, com navegação e foco por teclado. O comentário no HTML indica onde inserir o link wa.me e os atributos de nova aba.

## Conteúdos pessoais e publicação

- Substitua [Seu nome] no título, marca e rodapé.
- Atualize SEU_NUMERO no link do WhatsApp e seu.email@example.com no contato.
- As fotos e os links dos cases são provisórios. Os materiais ainda têm placeholders. Configure o WhatsApp do último card de habilidades.
- Para hospedar, mantenha index.html, assets/cases/, assets/logos/, o clipe Animating_portrait_transforming_…_20261012185500.playback.mp4, portrait-poster.webp e as fontes usadas em referenciais/terrasprint-ai-design-system/.
- serve.cjs, .preview/ e output/previews/ são ferramentas e artefatos de revisão, não dependências da página.

## Verificação e prévias

Os testes de DOM passaram para autoplay, independência da rolagem, pausa global, retomada, aba oculta, saída da viewport, bloqueio de autoplay com tentativa manual, movimento reduzido, falhas de CDN/vídeo, contadores, links e foco. A hero usa rolagem nativa sem fixação. O clipe foi preparado com FFmpeg.

Os testes em navegador das habilidades passaram para os oito cards, logos locais, grade responsiva até 320 px, iluminação dos vizinhos, lift, troca de cor, pausa global, movimento reduzido, proteção para toque, saída suave e foco do CTA. O GIF de 3,5 s foi gravado do HTML real no Chrome e exportado com FFmpeg.

As imagens abaixo foram renderizadas do HTML real no Chrome sem interface. O modo ?preview=1 conclui as entradas e fixa o primeiro estado do card somente para a exportação. A navegação normal não usa esse modo.

- [Hero desktop, 1440 × 900](output/previews/hero-desktop.png)
- [Hero mobile, 390 × 844](output/previews/hero-mobile.png)
- [Cases desktop, seção completa](output/previews/cases-desktop-full.png)
- [Cases mobile, seção completa](output/previews/cases-mobile-full.png)
- [Habilidades desktop](output/previews/skills-desktop.png)
- [Habilidades mobile](output/previews/skills-mobile.png)
- [GIF do efeito de proximidade](output/previews/skills-proximity.gif)
- [Painel de números atualizado](output/previews/results-desktop.png)

As prévias permitem revisar a composição. A fluidez percebida do scroll e do decodificador ainda varia por dispositivo e não é uma promessa de precisão quadro a quadro.
