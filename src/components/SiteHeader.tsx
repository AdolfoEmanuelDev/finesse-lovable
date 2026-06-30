import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import logoAsset from "@/assets/logo-fc.webp.asset.json";

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="flex items-center justify-between px-6 py-6 md:px-16 md:py-8">
      <Link to="/" aria-label="Finesse Club — Início" className="flex items-center">
        <img
          src={logoAsset.url}
          alt="Finesse Club"
          className="h-16 w-auto md:h-20"
          loading="eager"
          decoding="async"
        />
      </Link>
      <nav className="flex items-center gap-4 text-[11px] tracking-[0.2em] text-white md:gap-8">
        <Link to="/como-funciona" className="hidden md:inline hover:opacity-70 transition-opacity">
          COMO FUNCIONA
        </Link>
        <Link to="/vender" className="hidden md:inline hover:opacity-70 transition-opacity">
          VENDER
        </Link>
        <Link to="/termos" className="hover:opacity-70 transition-opacity">
          TERMOS
        </Link>
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
      </nav>
    </header>
  );
}
