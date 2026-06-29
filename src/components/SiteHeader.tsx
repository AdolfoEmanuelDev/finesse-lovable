import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="flex items-center justify-between px-6 py-6 md:px-16 md:py-8">
      <Link to="/" className="flex items-center">
        <span
          className="text-2xl tracking-wide text-white"
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
            fontStyle: "italic",
            fontWeight: 500,
          }}
        >
          FC<span className="ml-0.5 align-super text-xs">✦</span>
        </span>
      </Link>
      <nav className="flex items-center gap-8 text-[11px] tracking-[0.2em] text-white">
        <Link to="/termos" className="hover:opacity-70 transition-opacity">
          TERMOS
        </Link>
        <Link to="/carrinho" className="relative flex items-center gap-2 hover:opacity-70 transition-opacity">
          <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
          CARRINHO
          {count > 0 && (
            <span className="absolute -right-4 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-semibold text-black">
              {count}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
