import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { FinesseLogo } from "@/components/FinesseLogo";

const NAV_LINKS = [
  { to: "/", label: "HOME" },
  { to: "/como-funciona", label: "COMO FUNCIONA" },
  { to: "/autenticacao", label: "AUTENTICAÇÃO" },
  { to: "/vender", label: "VENDER" },
  { to: "/termos", label: "TERMOS" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;
    const update = () => {
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY.current;
      setScrolled(y > 40);
      if (y < 120) setHidden(false);
      else if (delta > 8) setHidden(true);
      else if (delta < -8) setHidden(false);
      lastY.current = y;
      ticking.current = false;
    };
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) setHidden(false);
  }, [menuOpen]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "transition-[transform,background-color] duration-300 ease-out will-change-transform",
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
        scrolled || menuOpen ? "bg-black" : "bg-transparent",
      ].join(" ")}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 px-5 py-4 md:px-10">
        {/* Left nav */}
        <nav className="hidden min-w-0 items-center gap-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-white md:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="transition-opacity hover:opacity-60">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          className="justify-self-start text-[10px] font-semibold uppercase tracking-[0.22em] text-white md:hidden"
        >
          {menuOpen ? "FECHAR" : "MENU"}
        </button>

        {/* Center logo */}
        <Link to="/" aria-label="Finesse Club — Início" className="justify-self-center">
          <FinesseLogo className="h-8 w-8 text-white md:h-10 md:w-10" />
        </Link>

        {/* Cart */}
        <Link
          to="/carrinho"
          className="justify-self-end text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-60"
          aria-label={`Carrinho com ${count} itens`}
        >
          Carrinho ({count})
        </Link>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 top-[56px] z-40 bg-black md:hidden">
          <nav className="flex flex-col px-5 py-6">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-5 text-sm font-semibold uppercase tracking-[0.22em] text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
