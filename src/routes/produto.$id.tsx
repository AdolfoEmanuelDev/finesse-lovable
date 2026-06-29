import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";

export const Route = createFileRoute("/produto/$id")({
  head: ({ params }) => {
    const p = getProduct(Number(params.id));
    const title = p ? `${p.name} — Finesse Club` : "Produto — Finesse Club";
    const desc = p ? `${p.name} por ${p.price}. Frete para todo o Brasil.` : "Produto Finesse Club.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(p ? [{ property: "og:image", content: p.image }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const p = getProduct(Number(params.id));
    if (!p) throw notFound();
    return p;
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <div className="flex flex-col items-center justify-center px-6 py-32 text-center">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="mt-3 text-white/70">Produto não encontrado</p>
        <Link to="/" className="mt-6 rounded-full bg-white px-6 py-2 text-sm text-black">
          Voltar para a Home
        </Link>
      </div>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData() as NonNullable<ReturnType<typeof getProduct>>;
  const { add } = useCart();
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-10 px-6 pb-24 pt-8 md:grid-cols-2 md:gap-16 md:pt-16">
        <div>
          <div className="overflow-hidden bg-neutral-900">
            <img src={product.gallery[active]} alt={product.name} className="aspect-square w-full object-cover" />
          </div>
          {product.gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {product.gallery.map((g, i) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`overflow-hidden border ${i === active ? "border-white" : "border-transparent opacity-70"}`}
                >
                  <img src={g} alt={`${product.name} ${i}`} className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold uppercase tracking-wide md:text-3xl">{product.name}</h1>
            <span className="bg-white px-3 py-1 text-[10px] font-semibold tracking-widest text-black">
              OFERTA
            </span>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-semibold">{product.price}</span>
            <span className="ml-3 text-white/50 line-through">{product.oldPrice}</span>
          </div>

          <div className="mt-6 space-y-1 text-sm text-white/85">
            {product.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <button
            type="button"
            onClick={() => add(product.id)}
            className="mt-8 w-full bg-white py-4 text-[12px] font-semibold tracking-[0.25em] uppercase text-black transition-opacity hover:opacity-90"
          >
            Adicionar ao Carrinho
          </button>
          <a
            href={product.buyNowUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 w-full border border-white py-4 text-center text-[12px] font-semibold tracking-[0.25em] uppercase transition-colors hover:bg-white hover:text-black"
          >
            Comprar Agora
          </a>

          <hr className="my-8 border-white/15" />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-semibold tracking-widest text-white/50">FRETE</h3>
              <p className="mt-2 text-[12px] font-semibold tracking-widest uppercase">
                Enviamos para todo o Brasil
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-widest text-white/50">PAGAMENTO</h3>
              <p className="mt-2 text-[12px] font-semibold tracking-widest uppercase">
                Até 12x no cartão ou PIX
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
