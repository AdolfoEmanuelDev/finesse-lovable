import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useCart } from "@/lib/cart";
import { products, FINESSE_WHATSAPP } from "@/lib/products";
import logoAsset from "@/assets/logo-fc.webp.asset.json";

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
  component: Index,
});

function Index() {
  const { add } = useCart();
  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <SiteHeader />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-20 text-center md:py-32">
        <img
          src={logoAsset.url}
          alt="Finesse Club"
          className="h-28 w-auto md:h-40"
          loading="eager"
        />
        <h1
          className="mt-8 max-w-2xl text-2xl leading-tight tracking-wide md:text-4xl"
          style={{ fontFamily: "'Montserrat', sans-serif", fontStyle: "italic" }}
        >
          Curadoria de Luxo<br />&nbsp;Peças originais e autenticadas.
        </h1>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href="#produtos"
            className="border border-white bg-white px-8 py-4 text-[11px] font-semibold tracking-[0.25em] uppercase text-black transition-opacity hover:opacity-90"
          >
            Ver peças disponíveis
          </a>
          <a
            href={FINESSE_WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="border border-white px-8 py-4 text-[11px] font-semibold tracking-[0.25em] uppercase transition-colors hover:bg-white hover:text-black"
          >
            Vender minha peça
          </a>
        </div>
      </section>

      <main id="produtos" className="px-6 pb-24 pt-4 md:px-16 md:pt-8">
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

      <SiteFooter />
    </div>
  );
}
