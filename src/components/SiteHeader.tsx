import { Link } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { FinesseLogo } from "@/components/FinesseLogo";

const NAV_LINKS = [
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
      if (y < 120) {
        setHidden(false);
      } else if (delta > 8) {
        setHidden(true);
      } else if (delta < -8) {
        setHidden(false);
      }
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
        "sticky top-0 z-50",
        "transition-[transform,background-color,backdrop-filter] duration-300 ease-out will-change-transform",
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
        scrolled || menuOpen ? "bg-black/90 backdrop-blur-md" : "bg-transparent",
      ].join(" ")}
    >
      <div className="flex items-center justify-between px-6 py-6 md:px-16 md:py-8">
        <Link to="/" aria-label="Finesse Club — Início" className="flex items-center">
          <FinesseLogo className="h-12 w-12 text-white md:h-16 md:w-16" />
        </Link>
        <nav className="flex items-center gap-4 text-[11px] tracking-[0.2em] text-white md:gap-8">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="hidden md:inline hover:opacity-70 transition-opacity">
              {l.label}
            </Link>
          ))}
          <Link
            to="/carrinho"
            aria-label={`Carrinho${count > 0 ? ` com ${count} itens` : ""}`}
            className="relative flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
            <span className="hidden sm:inline">CARRINHO</span>
            {count > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-semibold text-black">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className="md:hidden -mr-1 p-1 hover:opacity-70 transition-opacity"
          >
            {menuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-md">
          <nav className="flex flex-col px-6 py-4 text-[11px] tracking-[0.2em] text-white">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="py-3 hover:opacity-70 transition-opacity"
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
