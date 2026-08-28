import { Link } from "@tanstack/react-router";
import { FINESSE_VIP_GROUP } from "@/lib/products";

const TRUST = [
  "Pagamento seguro",
  "Peças 100% autenticadas",
  "Envio para todo o Brasil",
  "12x no cartão ou PIX",
];

const LINKS = [
  { to: "/como-funciona", label: "Como funciona" },
  { to: "/autenticacao", label: "Autenticação" },
  { to: "/vender", label: "Vender" },
  { to: "/carrinho", label: "Carrinho" },
  { to: "/termos", label: "Termos" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <section className="border-b border-white/10 px-5 py-14 md:px-10 md:py-20">
        <h2
          className="max-w-3xl font-black uppercase leading-[0.95] tracking-[-0.01em]"
          style={{ fontSize: "clamp(1.75rem, 5vw, 4rem)" }}
        >
          Entre no grupo VIP
        </h2>
        <p className="mt-4 max-w-md text-[11px] uppercase tracking-[0.2em] text-white/50">
          Veja os próximos drops antes de todo mundo.
        </p>
        <a
          href={FINESSE_VIP_GROUP}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-3 border border-white bg-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-black transition-colors hover:bg-transparent hover:text-white"
        >
          Entrar no grupo <span aria-hidden>→</span>
        </a>
      </section>

      <section className="grid grid-cols-2 gap-y-4 border-b border-white/10 px-5 py-8 md:grid-cols-4 md:px-10">
        {TRUST.map((label) => (
          <span
            key={label}
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70"
          >
            {label}
          </span>
        ))}
      </section>

      <section className="flex flex-wrap gap-x-6 gap-y-3 px-5 py-8 md:px-10">
        {LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
          >
            {l.label}
          </Link>
        ))}
      </section>

      <div className="border-t border-white/10 px-5 py-6 text-[10px] uppercase tracking-[0.2em] text-white/40 md:px-10">
        © {new Date().getFullYear()} Finesse Club — Curadoria de luxo masculino
      </div>
    </footer>
  );
}
