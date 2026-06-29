import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/lib/cart";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Finesse Club" },
      { name: "description", content: "Peças selecionadas com curadoria — Finesse Club." },
      { property: "og:title", content: "Finesse Club" },
      { property: "og:description", content: "Peças selecionadas com curadoria — Finesse Club." },
    ],
  }),
  component: Index,
});

function Index() {
  const { add } = useCart();
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteHeader />
      <main className="px-6 pb-24 pt-8 md:px-16 md:pt-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <article key={p.id} className="flex flex-col">
              <Link
                to="/produto/$id"
                params={{ id: String(p.id) }}
                className="group relative block overflow-hidden"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </Link>
              <div className="mt-5 text-center">
                <h3 className="text-[13px] font-semibold tracking-[0.15em] uppercase">{p.name}</h3>
                <p className="mt-2 text-sm">
                  <span className="font-medium">{p.price}</span>
                  <span className="ml-2 text-white/50 line-through">{p.oldPrice}</span>
                </p>
              </div>
              {p.soldOut ? (
                <button
                  type="button"
                  disabled
                  className="mt-4 w-full border border-white/40 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-white/40 cursor-default"
                >
                  Esgotado
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => add(p.id)}
                  className="mt-4 w-full border border-white/80 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase transition-colors hover:bg-white hover:text-black"
                >
                  Adicionar
                </button>
              )}
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
