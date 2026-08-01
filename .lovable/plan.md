## Objetivo

Fazer o logo da Finesse Club (a imagem enviada agora) aparecer normalmente no cabeçalho e no banner da página inicial, inclusive no site publicado na Netlify.

## Diagnóstico

Hoje o componente do logo aponta para um arquivo importado com fallback para `/logo-fc.webp`. No site publicado, os caminhos de asset usados antes retornavam 404, e o logo aparecia quebrado. A imagem que você acabou de enviar é o logo definitivo (FC serifado branco com estrela, fundo preto).

## Plano

1. **Adotar a imagem enviada como logo oficial**
   - Salvar a nova imagem como o arquivo de logo do projeto, importado pelo build (versionado com hash), que é o caminho que a Netlify publica de forma confiável.

2. **Componente de logo simplificado**
   - `FinesseLogo` passa a usar apenas o arquivo importado, sem fallback para caminhos que davam 404.
   - Como a arte tem fundo preto sólido e o site é preto, o logo se integra sem moldura visível.

3. **Cabeçalho**
   - Logo clicável levando à página inicial, mesmo tamanho atual (48px mobile / 64px desktop), alt "Finesse Club".

4. **Banner da página inicial**
   - Logo em destaque acima do título, mesmo tamanho atual (112px mobile / 160px desktop).

5. **Favicon**
   - Gerar `public/favicon.png` quadrado a partir da mesma imagem e apontar o ícone do site para ele, removendo as referências antigas que davam 404.

6. **Validação**
   - Rodar o build de produção e conferir que o arquivo do logo existe na saída e que o HTML gerado aponta para ele.
   - Abrir a página no navegador e confirmar visualmente o logo no cabeçalho e no banner.

Depois disso será preciso um novo deploy na Netlify para o site publicado refletir a mudança.