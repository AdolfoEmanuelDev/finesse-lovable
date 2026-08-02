import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/lib/cart";
import { centsToPrice, priceToCents, type Product } from "@/lib/products";
import { getCatalog, type CatalogResult } from "@/lib/catalog.functions";
import { findProduct } from "@/lib/catalog";
import { createYampiCheckout } from "@/lib/checkout.functions";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Carrinho — Finesse Club" },
      { name: "description", content: "Revise os itens do seu carrinho e finalize a compra." },
      { property: "og:title", content: "Carrinho — Finesse Club" },
      { property: "og:description", content: "Revise os itens do seu carrinho e finalize a compra." },
    ],
  }),
  loader: async () => await getCatalog(),
  component: CartPage,
});

function CartPage() {
  const { products } = Route.useLoaderData() as CatalogResult;
  const { items, setQty, remove, clear } = useCart();
  const checkout = useServerFn(createYampiCheckout);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lines = items
    .map((i) => ({ item: i, product: findProduct(products, String(i.id)) }))
    .filter((l) => l.product) as { item: { id: number; qty: number }; product: Product }[];
  const available = lines.filter((l) => !l.product.soldOut);
  const soldOutLines = lines.filter((l) => l.product.soldOut);
  const totalCents = available.reduce((s, l) => s + priceToCents(l.product.price) * l.item.qty, 0);

  const handleCheckout = async (checkoutWindow?: Window | null) => {
    setError(null);
    setLoading(true);
    try {
      const payload = available
        .filter((l) => l.product.sku)
        .map((l) => ({ sku: l.product.sku as string, quantity: l.item.qty }));
      if (payload.length === 0) {
        checkoutWindow?.close();
        setError("Nenhum item disponível no carrinho.");
        setLoading(false);
        return;
      }
      const { url, error } = await checkout({ data: { items: payload } });
      if (error || !url) {
        checkoutWindow?.close();

        setError(error || "URL de checkout não retornada");
        setLoading(false);
        return;
      }
      setLoading(false);
      if (checkoutWindow && !checkoutWindow.closed) {
        checkoutWindow.location.href = url;
      } else {
        window.open(url, "_blank");
      }
    } catch (e: any) {
      checkoutWindow?.close();
      setError(e?.message || "Erro ao criar checkout");
      setLoading(false);
    }
  };

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
                    {product.soldOut ? (
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-red-400">
                        Esgotado — não será cobrado
                      </p>
                    ) : null}
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
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!loading) handleCheckout(window.open("about:blank", "_blank"));
                  }}
                  aria-disabled={loading}
                  className={`bg-white px-6 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-black hover:opacity-90 ${loading ? "pointer-events-none opacity-60" : ""}`}
                >
                  {loading ? "Processando..." : "Finalizar Compra"}
                </a>
              </div>
              {soldOutLines.length > 0 && (
                <p className="text-xs text-white/60">
                  {soldOutLines.length} item(ns) esgotado(s) não entram no checkout.
                </p>
              )}
              {error && <p className="text-sm text-red-400">{error}</p>}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
