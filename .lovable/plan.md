## Objetivo

O site passa a ler o catálogo direto da Yampi: produtos, preços, fotos e estoque. Peça sem estoque aparece automaticamente como **ESGOTADO**; peça nova cadastrada na Yampi aparece sozinha na loja. Atualização com cache de ~5 minutos.

## Como vai funcionar

1. Uma função de servidor consulta a API da Yampi (`GET /v2/finesse-club/catalog/products` com `include=skus,images`) usando o Token e a Chave Secreta já salvos como segredos — as credenciais nunca vão para o navegador.
2. O resultado é normalizado para o formato de produto já usado no site (nome, preço, preço antigo, galeria, descrição, SKU, esgotado).
3. Estoque: SKU com quantidade 0 (ou inativo/indisponível) vira `soldOut: true` — botão desabilitado, selo ESGOTADO no card e na página do produto, e bloqueio de adicionar ao carrinho.
4. Cache de 5 minutos em memória no servidor, para não chamar a Yampi a cada visita.
5. Fallback: se a Yampi falhar, o site usa a lista atual de `src/lib/products.ts` como reserva, então a loja nunca fica vazia.

## Onde entra no site

- Home: grid de produtos vindos da Yampi (ordem da Yampi), com selo ESGOTADO quando aplicável.
- Página do produto `/produto/$id`: dados e galeria da Yampi; detalhes manuais (condição, modelagem, tamanho, material) continuam funcionando via campos customizados/descrição da Yampi quando existirem, senão caem nos valores atuais.
- Carrinho: valida estoque antes do checkout — item que esgotou enquanto estava no carrinho é sinalizado e removido do checkout multi-itens.

## Detalhes técnicos

- Novo `src/lib/catalog.functions.ts` com `getCatalog` (createServerFn, método GET) + `src/lib/yampi.server.ts` para fetch/normalização e cache TTL 5 min.
- Rotas usam loader com `ensureQueryData` + `useSuspenseQuery`, mantendo SSR.
- `src/lib/products.ts` vira apenas fallback e fonte dos dados manuais (mapeados por SKU).
- Identificação do produto na URL passa a aceitar o id da Yampi, mantendo compatibilidade com os ids atuais 1-4 por mapeamento de SKU.
- Reaproveita `checkout.functions.ts` para o checkout multi-itens, agora com SKUs vindos da Yampi.

## Verificação

Testar em preview: catálogo carregando da Yampi, um SKU zerado aparecendo como esgotado, checkout multi-itens funcionando, e build de produção sem erros.
