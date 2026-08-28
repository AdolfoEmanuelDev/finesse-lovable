# Finesse Club — Redesign estilo Jaded London

Objetivo: transformar a loja no visual das referências — hero em tela cheia com imagem editorial, wordmark gigante sobreposto, navegação mínima em maiúsculas e grade de produtos edge-to-edge.

## Home

- Hero full-screen (100vh): imagem editorial de moda masculina de luxo gerada para a marca, com overlay escuro sutil.
- Wordmark gigante centralizado: `FINESSE®CLUB`, Montserrat bold, largura quase total da tela, sobre a imagem.
- Canto inferior esquerdo: linha de anúncio ("NOVAS PEÇAS DISPONÍVEIS") + botão retangular pequeno `VER PEÇAS →`.
- Abaixo do hero: faixa branca com título `NOVAS PEÇAS` + subtexto curto, e grade de produtos edge-to-edge (4 colunas no desktop, 2 no mobile, sem gaps grandes), imagens em proporção alta, nome/preço em texto pequeno maiúsculo alinhado à esquerda.
- Hover no card revela o botão de adicionar; "ESGOTADO" como etiqueta discreta.

## Header

- Fixo e transparente sobre o hero, fundo preto ao rolar (mantém o comportamento atual de esconder/mostrar).
- Esquerda: links `HOME`, `CATÁLOGO`, `COMO FUNCIONA`, `AUTENTICAÇÃO`, `VENDER`, `TERMOS` em texto minúsculo com tracking largo.
- Centro: monograma FC atual (pequeno).
- Direita: `CARRINHO (n)` em texto, sem ícone.
- Mobile: mesmo layout com menu hamburguer full-screen preto.

## Demais páginas (mesmo idioma visual)

- Produto: imagem grande à esquerda, coluna de informações compacta à direita, tipografia minúscula maiúscula, botão preto/branco de largura total.
- Carrinho, Vender, Como funciona, Autenticação, Termos: cabeçalho de página com título gigante, blocos com linhas divisórias finas, mesmo estilo de botão.
- Footer: preto, colunas de links minúsculos + assinatura da marca.

## Sistema de design

- Paleta: preto (#000) / branco (#fff) puros, cinza apenas em texto secundário — definidos como tokens em `src/styles.css`.
- Tipografia: Montserrat em todo o site; escala de labels 10–11px com `tracking-[0.2em]` uppercase; display do wordmark com `clamp()`.
- Sem bordas arredondadas, sem sombras; separação por linhas de 1px.
- Micro-interações discretas: fade/parallax leve na imagem do hero, hover com troca de cor.

## Detalhes técnicos

- Imagem do hero gerada e salva em `src/assets`, importada no componente do hero (nova `src/components/Hero.tsx`).
- Reescrita de `src/routes/index.tsx`, `src/components/SiteHeader.tsx`, `SiteFooter.tsx`; ajustes de estilo nas rotas `produto.$id`, `carrinho`, `vender`, `como-funciona`, `autenticacao`, `termos`.
- Nenhuma mudança em lógica de carrinho, catálogo Yampi ou checkout — apenas apresentação.
