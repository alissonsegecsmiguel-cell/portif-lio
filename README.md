# Portfólio — ideias que ganham forma

`index.html` contém todo o HTML, CSS e JavaScript da página. Não exige build, instalação de pacotes nem framework. O design system e o MP4 original foram preservados.

## Executar

Na pasta do projeto, com Node.js instalado:

```powershell
node serve.cjs
```

Abra **http://127.0.0.1:4173**. Encerre com `Ctrl+C`. Também funciona com Live Server ou outro servidor estático que aceite requisições HTTP Range para o MP4. Acesso à internet é necessário para carregar GSAP e ScrollTrigger 3.12.5 pelo CDN. Se falharem, a página continua legível, com pôster, projetos, contato e links.

Para hospedar, mantenha `index.html`, `assets/video-poster.webp`, o vídeo em `assets/Videos/` e as duas fontes utilizadas em `referenciais/terrasprint-ai-design-system/`. `serve.cjs` e `.preview/` são ferramentas locais, não fazem parte da página publicada.

## Personalizar

- Pesquise `[Seu nome]`, `[Sua área de atuação]`, `[Nome do projeto]`, `[Categoria]` e `[Seu papel no projeto]` no HTML. Atualize também `<title>`, descrição, rótulos acessíveis e rodapé.
- Substitua `seu.email@example.com` tanto no texto quanto no `mailto:` e atualize seu rótulo acessível.
- Os dois cards são placeholders identificados. Troque as composições demonstrativas por imagens e os links por URLs dos cases. Não representam projetos realizados.
- Edite `stories` no JavaScript para alterar os três momentos da narrativa. Os limiares `.32` e `.7` em `renderStory` acompanham a abertura do caderno, o desenho dos eixos e a curva final.
- O vídeo usa seu nome real: `assets/Videos/Caderno_fechando_abrindo_desenha…_20261012165541.mp4`. A reticência `…` faz parte do nome.
- As fontes são Manrope e Fraunces locais; títulos principais usam Arial/Helvetica. Cores, espaços, raios e curva de transição estão em `:root`, transpostos da referência.

## Ajustar o ritmo

No objeto `CONFIG`, aumente `pixelsPerSecond` para alongar a sequência e diminua para encurtá-la. O padrão é 280 px por segundo no desktop e 210 no celular: aproximadamente 2.802 e 2.101 px de rolagem, respectivamente.

A duração vem de `video.duration` após `loadedmetadata`. O progresso controla o tempo em ambos os sentidos. O vídeo permanece pausado, sem `autoplay` e sem `loop`. Uma fila conserva somente o alvo mais recente e aguarda `seeked` antes da próxima busca. O fim usa uma margem de 1 ms para evitar solicitar um instante fora dos quadros decodificáveis.

Um único ScrollTrigger fixa a cena, atualiza o vídeo e coordena narrativa, indicador e parallax de 16 px. A extensão da sequência é recalculada ao redimensionar. A integração segue a [documentação oficial do ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/). A rolagem é nativa, sem Lenis.

Com `prefers-reduced-motion`, a cena fica estática e sem pin, usando o pôster do gráfico concluído. A preferência também é respeitada quando muda durante a visita. Um erro de vídeo ou um carregamento que exceda o limite libera a sequência e conserva o conteúdo.

## Vídeo e fluidez

Inspeção do original: H.264 High, 1280 × 720, 24 fps, 240 quadros, vídeo de 10 s e duração total do contêiner de aproximadamente 10,006 s. Há somente dois keyframes, nos quadros 1 e 61 (aproximadamente 0 s e 2,5 s). O último grupo de quadros tem cerca de 7,5 s. O índice MP4 está antes dos dados de mídia, permitindo carregamento progressivo.

Esse intervalo longo entre keyframes pode aumentar a latência das buscas, especialmente para trás. O código evita buscas concorrentes, mas não garante precisão quadro a quadro nem fluidez idêntica em todos os dispositivos. Recomenda-se uma cópia otimizada com keyframes a cada 6 quadros, sem áudio, preservando o original. Exemplo com FFmpeg instalado:

```powershell
ffmpeg -i "assets/Videos/Caderno_fechando_abrindo_desenha…_20261012165541.mp4" -an -c:v libx264 -preset medium -crf 18 -g 6 -keyint_min 6 -sc_threshold 0 -bf 0 -pix_fmt yuv420p -movflags +faststart "assets/Videos/caderno-scrubbing.mp4"
```

Para usá-la, troque o `src` do `<source>` pela cópia. GOP menor aumenta o tamanho do arquivo; compare no aparelho de destino. O original não foi recodificado nem substituído.

## Verificação realizada

- JavaScript validado; arquivos, fontes, âncoras, resposta HTTP 200 e requisição parcial do vídeo (HTTP 206) verificados.
- MP4 decodificado com FFmpeg e quadros inspecionados visualmente ao longo da sequência. Pôster extraído do instante 8 s.
- Simulação de DOM passou para metadados, pin, mapeamento da duração, avanço, retorno, parada, busca única com alvo mais recente, capítulos, foco, comprimento responsivo, mudança de preferência e falhas de CDN/vídeo.
- Navegador integrado indisponível nesta sessão. Layout visual, rolagem real, console e desempenho do decodificador em celular ainda precisam de uma revisão no navegador. A simulação não substitui essa revisão.
- A checagem direta do CDN expirou nesta rede, inclusive após tentar fora das restrições do ambiente. Sua disponibilidade não foi confirmada; a página tem timeout e fallback estático para esse caso.

Para a revisão visual, verifique 1440 × 900, 1280 × 720, 768 × 1024, 390 × 844 e 375 × 667. Role até o fim, retorne à hero, pare em diferentes pontos, redimensione no meio da sequência, use Tab/Enter, teste os CTAs e ative a preferência por movimento reduzido. Os cards de projeto e o e-mail ainda são exemplos a substituir.
