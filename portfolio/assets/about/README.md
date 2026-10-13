# Imagens e vídeos da seção Sobre

- Retrato em movimento: `Criar_vídeo_com_transição_fluida_20261013164736.mp4`, enviado por Alisson e copiado sem recodificação de Downloads. Duração validada no navegador: 6,016 s, em 1280 × 720. O nome original foi preservado. O vídeo apresenta a passagem de só copywriter para estrategista e gestor operacional; os rótulos e o risco já fazem parte de seus pixels.
- `about-video-poster.webp`: quadro extraído próximo de 4,8 s do vídeo, com os rótulos Estrategista e Gestor operacional. Usado no carregamento, em caso de erro, sem JavaScript e com movimento reduzido. A imagem e o vídeo preservam o quadro completo em 16:9, sem filtros que alterem as cores dos rótulos.
- A reprodução é nativa, silenciosa e em loop, somente com o retrato visível e a aba ativa. Respeita a pausa global. Se o navegador bloquear autoplay, o botão Reproduzir vídeo permite iniciar por teclado ou toque. O retrato da hero permanece em `../portrait-poster.webp`.
- `planning.jpg`: foto provisória de mãos escrevendo em um planejamento, sem rosto identificável. Fotografia de Leeloo The First, disponibilizada gratuitamente no [Pexels](https://www.pexels.com/photo/a-person-writing-on-a-desk-calendar-5408684/), sob a [licença Pexels](https://www.pexels.com/license/). Consultada em 13/10/2026. Download local em 1200 px de largura.

A foto planning.jpg e suas variantes WebP permanecem como referência da composição anterior. Não são mais usadas na página.

## Livro e cronograma em movimento

- Animation_from_book_to_timeline_20261013171036.mp4: vídeo enviado por Alisson, copiado byte a byte de Downloads, sem recodificação. 1.132.032 bytes, 6,016 s e 1280 × 720. SHA-256: C5A0D2F06ECAAB4A08E5882697CAE6EBEB6B9EB0BE1B12AB75EA67178E2A99ED.
- timeline-video-poster.webp: quadro extraído próximo de 4,81 s, mostrando o cronograma sobre o livro. 1280 × 720 e 40.532 bytes. Serve como imagem de carregamento e fallback, com loading="lazy".
- Reprodução nativa, silenciosa, em loop e sem controle de quadros pela rolagem. O MP4 usa data-src e só recebe o endereço quando o quadro fica visível e o movimento é permitido. Pausa fora da viewport, com a aba oculta e pelo controle global.
- Os dois players da seção usam o mesmo controlador, com estado e observador independentes. Bloqueio de autoplay permite reprodução pelo botão local. Movimento reduzido, erro de mídia e ausência de JavaScript apresentam o pôster.
- O enquadramento usa object-fit: contain e 16:9, sem preto e branco em CSS. A inclinação, o contorno externo, a entrada de imagem e a linha em gradiente usam os tokens e --ease do design system. A linha entra uma vez, sem loop adicional.
