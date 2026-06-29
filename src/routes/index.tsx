import { createFileRoute } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Finesse Club" },
      { name: "description", content: "Peças selecionadas com curadoria — Finesse Club." },
      { property: "og:title", content: "Finesse Club" },
      { property: "og:description", content: "Peças selecionadas com curadoria — Finesse Club." },
    ],
  }),
  component: Index,
});

type Product = {
  id: number;
  name: string;
  price: string;
  oldPrice: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Diesel® T-just G15 Black",
    price: "R$ 555,00",
    oldPrice: "R$ 650,00",
    image:
      "https://finesseclub.com.br/_next/image?url=https%3A%2F%2Fslelguoygbfzlpylpxfs.supabase.co%2Fstorage%2Fv1%2Frender%2Fimage%2Fpublic%2Fproject-uploads%2Fe0354d74-faf5-4977-8775-aa3ee0f7ed6c%2Fproduto-1-resized-1769631761757.jpg%3Fwidth%3D8000%26height%3D8000%26resize%3Dcontain&w=1920&q=75",
  },
  {
    id: 2,
    name: "Diesel® umtee Black",
    price: "R$ 199,90",
    oldPrice: "R$ 250,00",
    image:
      "https://finesseclub.com.br/_next/image?url=https%3A%2F%2Fslelguoygbfzlpylpxfs.supabase.co%2Fstorage%2Fv1%2Frender%2Fimage%2Fpublic%2Fproject-uploads%2Fe0354d74-faf5-4977-8775-aa3ee0f7ed6c%2Fproduto-2-resized-1769631761756.jpg%3Fwidth%3D8000%26height%3D8000%26resize%3Dcontain&w=1920&q=75",
  },
  {
    id: 3,
    name: "Suéter Polo Ralph Lauren®",
    price: "R$ 950,00",
    oldPrice: "R$ 1.250,00",
    image:
      "https://finesseclub.com.br/_next/image?url=https%3A%2F%2Fslelguoygbfzlpylpxfs.supabase.co%2Fstorage%2Fv1%2Frender%2Fimage%2Fpublic%2Fproject-uploads%2Fe0354d74-faf5-4977-8775-aa3ee0f7ed6c%2Fproduto-3-1769631761346.jpg%3Fwidth%3D8000%26height%3D8000%26resize%3Dcontain&w=1920&q=75",
  },
  {
    id: 4,
    name: "Lacoste® Pima Cotton",
    price: "R$ 245,00",
    oldPrice: "R$ 399,99",
    image:
      "https://finesseclub.com.br/_next/image?url=https%3A%2F%2Fslelguoygbfzlpylpxfs.supabase.co%2Fstorage%2Fv1%2Frender%2Fimage%2Fpublic%2Fproject-uploads%2Fe0354d74-faf5-4977-8775-aa3ee0f7ed6c%2Fproduto-4-resized-1769631761761.jpg%3Fwidth%3D8000%26height%3D8000%26resize%3Dcontain&w=1920&q=75",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-[#000] text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <header className="flex items-center justify-between px-6 py-6 md:px-16 md:py-8">
        <a href="/" className="flex items-center">
          <span
            className="text-2xl tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontStyle: "italic", fontWeight: 500 }}
          >
            FC<span className="ml-0.5 align-super text-xs">✦</span>
          </span>
        </a>
        <nav className="flex items-center gap-8 text-[11px] tracking-[0.2em]">
          <a href="#termos" className="hover:opacity-70 transition-opacity">
            TERMOS
          </a>
          <a href="#carrinho" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
            CARRINHO
          </a>
        </nav>
      </header>

      <main className="px-6 pb-24 pt-8 md:px-16 md:pt-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <article key={p.id} className="flex flex-col">
              <a href={`#produto-${p.id}`} className="group relative block overflow-hidden">
                <span className="absolute left-3 top-3 z-10 bg-white px-3 py-1 text-[10px] font-semibold tracking-widest text-black">
                  OFERTA
                </span>
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </a>
              <div className="mt-5 text-center">
                <h3 className="text-[13px] font-semibold tracking-[0.15em] uppercase">{p.name}</h3>
                <p className="mt-2 text-sm">
                  <span className="font-medium">{p.price}</span>
                  <span className="ml-2 text-white/50 line-through">{p.oldPrice}</span>
                </p>
              </div>
              <button
                type="button"
                className="mt-4 w-full border border-white/80 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase transition-colors hover:bg-white hover:text-black"
              >
                Adicionar
              </button>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
