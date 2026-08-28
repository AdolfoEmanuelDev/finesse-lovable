import { Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-campaign.jpg";

export function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-black">
      <img
        src={heroImage}
        alt="Campanha Finesse Club — moda masculina de luxo"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/70" />

      {/* Wordmark */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <h1
          className="w-full text-center font-black leading-none tracking-[-0.02em] text-white select-none"
          style={{ fontSize: "clamp(2.75rem, 12.5vw, 13rem)" }}
        >
          FINESSE
          <sup className="align-super text-[0.28em] font-semibold">®</sup>
          CLUB
        </h1>
      </div>

      {/* Bottom-left announcement */}
      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white md:text-[11px]">
          Novas peças disponíveis
        </p>
        <a
          href="#produtos"
          className="mt-3 inline-flex items-center gap-3 border border-white bg-white px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-black transition-colors hover:bg-transparent hover:text-white"
        >
          Ver peças <span aria-hidden>→</span>
        </a>
      </div>

      {/* Bottom-right sell CTA */}
      <div className="absolute bottom-8 right-6 md:bottom-12 md:right-10">
        <Link
          to="/vender"
          className="inline-flex items-center gap-3 border border-white px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-white hover:text-black"
        >
          Vender minha peça
        </Link>
      </div>
    </section>
  );
}
