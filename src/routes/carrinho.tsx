import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/lib/cart";
import { buildYampiCartUrl, centsToPrice, getProduct, priceToCents } from "@/lib/products";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Carrinho — Finesse Club" },
      { name: "description", content: "Revise os itens do seu carrinho e finalize a compra." },
      { property: "og:title", content: "Carrinho — Finesse Club" },
      { property: "og:description", content: "Revise os itens do seu carrinho e finalize a compra." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, clear } = useCart();
  const lines = items
    .map((i) => ({ item: i, product: getProduct(i.id) }))
    .filter((l) => l.product) as { item: { id: number; qty: number }; product: NonNullable<ReturnType<typeof getProduct>> }[];
  const totalCents = lines.reduce((s, l) => s + priceToCents(l.product.price) * l.item.qty, 0);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-8 md:pt-16">
        <h1 className="text-2xl font-bold tracking-wide uppercase">Seu Carrinho</h1>

        {lines.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <p className="text-white/70">Seu carrinho está vazio.</p>
            <Link
              to="/"
              className="mt-6 rounded-full bg-white px-6 py-2 text-sm font-medium text-black hover:opacity-90"
            >
              Continuar comprando
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {lines.map(({ item, product }) => (
                <li key={item.id} className="flex items-center gap-4 py-5">
                  <Link to="/produto/$id" params={{ id: String(product.id) }} className="shrink-0">
                    <img src={product.image} alt={product.name} className="h-20 w-20 object-cover" />
                  </Link>
                  <div className="flex-1">
                    <Link
                      to="/produto/$id"
                      params={{ id: String(product.id) }}
                      className="text-[13px] font-semibold uppercase tracking-widest hover:opacity-70"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-white/70">{product.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQty(item.id, item.qty - 1)}
                      className="h-8 w-8 border border-white/30 text-sm hover:bg-white hover:text-black"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(item.id, item.qty + 1)}
                      className="h-8 w-8 border border-white/30 text-sm hover:bg-white hover:text-black"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    className="ml-2 text-xs text-white/50 hover:text-white"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-end gap-4">
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-white/50">Total</p>
                <p className="mt-1 text-2xl font-semibold">{centsToPrice(totalCents)}</p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={clear}
                  className="border border-white/40 px-5 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-white hover:text-black"
                >
                  Limpar
                </button>
                <a
                  href={buildYampiCartUrl(
                    lines.map((l) => ({ sku: l.product.sku || "", qty: l.item.qty })),
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white px-6 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-black hover:opacity-90"
                >
                  Finalizar Compra
                </a>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
