import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { useCart } from "@/lib/cart";
import { getCatalog, type CatalogResult } from "@/lib/catalog.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Finesse Club — Curadoria de luxo masculino autenticada" },
      {
        name: "description",
        content:
          "Peças originais e autenticadas. Brechó de luxo masculino com curadoria, frete nacional e pagamento em até 12x.",
      },
      {
        name: "keywords",
        content:
          "luxury second hand, moda masculina de luxo, Finesse Club, revenda peças high end, brechó de luxo masculino, segunda mão autêntico",
      },
      { property: "og:title", content: "Finesse Club — Curadoria de luxo masculino" },
      {
        property: "og:description",
        content: "Peças originais e autenticadas. Curadoria de moda masculina de luxo.",
      },
    ],
  }),
  loader: async () => await getCatalog(),
  component: Index,
});

function Index() {
  const { products } = Route.useLoaderData() as CatalogResult;
  const { add } = useCart();

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <Hero />

      <main id="produtos" className="bg-white text-black">
        <div className="flex flex-wrap items-end justify-between gap-2 px-5 py-8 md:px-10">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em]">Novas peças</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/50">
            Curadoria de luxo — peças originais e autenticadas
          </p>
        </div>

        <div className="grid grid-cols-2 border-t border-black/10 lg:grid-cols-4">
          {products.map((p) => (
            <article
              key={p.id}
              className="group relative border-b border-r border-black/10 last:border-r-0"
            >
              <Link
                to="/produto/$id"
                params={{ id: String(p.id) }}
                className="block overflow-hidden"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </Link>

              {p.soldOut ? (
                <span className="absolute left-3 top-3 bg-black px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
                  Esgotado
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => add(p.id)}
                  className="absolute inset-x-3 bottom-[5.5rem] hidden bg-black py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block"
                >
                  Adicionar ao carrinho
                </button>
              )}

              <div className="flex flex-col gap-1 px-3 py-4 md:px-4">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em]">{p.name}</h3>
                <p className="text-[11px] tracking-[0.1em]">
                  <span>{p.price}</span>
                  {p.oldPrice ? (
                    <span className="ml-2 text-black/40 line-through">{p.oldPrice}</span>
                  ) : null}
                </p>
                {!p.soldOut && (
                  <button
                    type="button"
                    onClick={() => add(p.id)}
                    className="mt-2 border border-black py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] transition-colors hover:bg-black hover:text-white md:hidden"
                  >
                    Adicionar
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
