import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SellSteps } from "@/components/SellSteps";

export const Route = createFileRoute("/como-funciona")({
  head: () => ({
    meta: [
      { title: "Como Funciona — Finesse Club" },
      {
        name: "description",
        content:
          "Saiba como comprar e como vender sua peça na Finesse Club. Processo de autenticação, pagamento e envio.",
      },
      { property: "og:title", content: "Como Funciona — Finesse Club" },
      {
        property: "og:description",
        content: "Saiba como comprar e como vender sua peça na Finesse Club.",
      },
    ],
    links: [{ rel: "canonical", href: "/como-funciona" }],
  }),
  component: ComoFunciona,
});

const comprar = [
  {
    n: "01",
    title: "Escolha sua peça",
    desc: "Navegue pelo catálogo curado e selecione a peça desejada.",
  },
  {
    n: "02",
    title: "Pague com segurança",
    desc: "Cartão em até 12x ou PIX. Checkout 100% seguro.",
  },
  {
    n: "03",
    title: "Receba em casa",
    desc: "Enviamos para todo o Brasil, com rastreio e embalagem cuidadosa.",
  },
];




function ComoFunciona() {
  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-28 md:px-16 md:pt-36">
        <h1
          className="text-3xl md:text-5xl tracking-wide text-center"
          style={{ fontFamily: "'Montserrat', sans-serif", fontStyle: "italic" }}
        >
          Como funciona
        </h1>

        <section className="mt-16">
          <h2 className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/60">
            Como comprar
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {comprar.map((s) => (
              <div key={s.n} className="border border-white/15 p-6">
                <div className="text-white/40 text-sm">{s.n}</div>
                <h3 className="mt-2 text-base font-semibold uppercase tracking-[0.15em]">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-white/75">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <SellSteps eyebrow="Como vender sua peça" />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
