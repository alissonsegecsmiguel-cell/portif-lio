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

As classes .hero__copy, .hero__lead, .line-mask, .font-fraunces, .button-ghost, .hero-card.glass-card, .carousel-track, .signal-strip e .hero__halo seguem o vocabulário do sistema. A curva das animações vem de --ease, inclusive nos efeitos JavaScript. Não há travessões nos textos da página.

O botão “Ver cases” leva a #projetos. “Conversar no WhatsApp” abre uma nova aba com rel="noopener noreferrer". Substitua SEU_NUMERO no link https://wa.me/SEU_NUMERO pelo seu número internacional, ou cole seu link wa.me completo. O balão de conversa usa SVG inline com stroke de 1,5.

O card alterna entre três provas, em ciclo de 12 s, com aproximadamente 3 s de permanência em cada estado. Pausa com hover e foco. No celular de até 430 px, fica em linha e esconde badge e caption. A faixa abaixo da hero duplica o grupo de cinco frases para o ticker contínuo.

O botão de pausa ao lado da navegação suspende o vídeo, os efeitos de ponteiro, os elementos flutuantes, o carrossel e o ticker. A preferência por movimento reduzido mantém os textos legíveis, a foto estática e o primeiro estado do card. Os loops pausam fora da viewport e com a aba oculta.

## Retrato e quatro elementos

A hero usa novamente o vídeo de retrato indicado, na versão .scrub.mp4, preservando sua animação original. Os elementos que fazem parte dos pixels do vídeo, incluindo logos, aparecem como no arquivo fornecido. Os quatro SVGs sobre a foto continuam na composição: caneta tinteiro, cavalo de xadrez, calendário e checklist. A composição usa o halo violeta do sistema e preserva o degradê e o hero-bloom existentes.

Arquivo ativo: assets/Videos/Animating_portrait_transforming_…_20261012185500.scrub.mp4. Pôster: assets/portrait-poster.webp. A reticência … faz parte do nome real do arquivo.

O clipe ativo tem 4 s, 1280 × 720 e 24 fps. Começa automaticamente após carregar, com muted, playsinline e loop, sem aguardar GSAP ou interação. A rolagem não altera currentTime. O contador FRAME acompanha o relógio real do player. A reprodução pausa com a aba oculta, fora da viewport ou pelo controle global; retoma da posição atual. Movimento reduzido apresenta somente a foto. Se o navegador bloquear autoplay, aparece o botão “Reproduzir vídeo”, seguindo a [orientação de autoplay da MDN](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay).

No objeto CONFIG, sceneScroll = 2080 e mobileSceneScroll = 1600 controlam somente a distância de rolagem da cena fixada. Aumente para alongar a cena, sem alterar a velocidade do vídeo. A duração real é obtida dos metadados. A fixação e o parallax usam um único ScrollTrigger, seguindo a [documentação oficial](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

## Segunda dobra

O painel à esquerda mostra os números fornecidos: mais de 30 lançamentos clássicos, mais de 20 lançamentos pagos e mais de 4 projetos perpétuos criados. À direita estão os serviços de copy, gestão de projetos e coprodução/estratégia.

Os contadores crescem uma vez ao entrar na viewport. As barras representam somente a proporção entre esses números. Sem JavaScript, sem IntersectionObserver ou com movimento reduzido, os valores finais continuam visíveis. Leitores de tela recebem os valores finais sem anúncios a cada incremento.

Para alterar números, atualize data-counter, o texto inicial, o texto acessível e --meter-share de cada .metric.

## Conteúdos pessoais e publicação

- Substitua [Seu nome] no título, marca e rodapé.
- Atualize SEU_NUMERO no link do WhatsApp e seu.email@example.com no contato.
- Os cards de cases, as habilidades e os materiais ainda têm placeholders. Substitua-os por conteúdo real.
- Para hospedar, mantenha index.html, o clipe Animating_portrait_transforming_…_20261012185500.scrub.mp4, portrait-poster.webp e as fontes usadas em referenciais/terrasprint-ai-design-system/.
- serve.cjs, .preview/ e output/previews/ são ferramentas e artefatos de revisão, não dependências da página.

## Verificação e prévias

Os testes de DOM passaram para autoplay, independência da rolagem, pausa global, retomada, aba oculta, saída da viewport, bloqueio de autoplay com tentativa manual, movimento reduzido, falhas de CDN/vídeo, contadores, links e foco. O clipe foi gerado com FFmpeg.

As imagens abaixo foram renderizadas do HTML real no Chrome sem interface. O modo ?preview=1 conclui as entradas e fixa o primeiro estado do card somente para a exportação. A navegação normal não usa esse modo.

- [Hero desktop, 1440 × 900](output/previews/hero-desktop.png)
- [Hero mobile, 390 × 844](output/previews/hero-mobile.png)

As prévias permitem revisar a composição. A fluidez percebida do scroll e do decodificador ainda varia por dispositivo e não é uma promessa de precisão quadro a quadro.
