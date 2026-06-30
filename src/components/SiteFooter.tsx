import { Lock, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { FINESSE_VIP_GROUP } from "@/lib/products";

export function SiteFooter() {
  const items = [
    { Icon: Lock, label: "Pagamento seguro" },
    { Icon: ShieldCheck, label: "Peças 100% autenticadas" },
    { Icon: Truck, label: "Envio para todo o Brasil" },
    { Icon: CreditCard, label: "12x no cartão ou PIX" },
  ];
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      {/* VIP banner */}
      <section className="border-b border-white/10 px-6 py-12 text-center md:px-16 md:py-16">
        <h2
          className="text-2xl md:text-4xl tracking-wide"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
        >
          Entre no grupo VIP e veja os próximos drops antes de todo mundo.
        </h2>
        <a
          href={FINESSE_VIP_GROUP}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block border border-white bg-white px-8 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-black transition-opacity hover:opacity-90"
        >
          Entrar no grupo
        </a>
      </section>

      {/* Trust signals */}
      <section className="grid grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4 md:px-16">
        {items.map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon className="h-5 w-5 shrink-0" strokeWidth={1.5} />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">
              {label}
            </span>
          </div>
        ))}
      </section>

      <div className="border-t border-white/10 px-6 py-6 text-center text-[11px] tracking-[0.2em] uppercase text-white/50 md:px-16">
        © {new Date().getFullYear()} Finesse Club — Curadoria de luxo masculino
      </div>
    </footer>
  );
}
