export type Product = {
  id: number;
  name: string;
  price: string;
  oldPrice: string;
  image: string;
  gallery: string[];
  description: string[];
  details?: {
    condicao: string;
    modelagem: string;
    tamanho: string;
    material: string;
  };
  buyNowUrl: string;
  sku?: string;
  soldOut?: boolean;
};

export const YAMPI_ALIAS = "finesseclub";
export function buildYampiCartUrl(items: { sku: string; qty: number }[]) {
  const params = items
    .filter((i) => i.sku)
    .map((i) => `skus[${encodeURIComponent(i.sku)}]=${i.qty}`)
    .join("&");
  return `https://seguro.${YAMPI_ALIAS}.com.br/carrinho?${params}`;
}

export const FINESSE_WHATSAPP_NUMBER = "5591920030501";
export const FINESSE_WHATSAPP =
  "https://wa.me/5591920030501?text=Ol%C3%A1%20Finesse%20Club%2C%20quero%20saber%20as%20medidas%20de%20uma%20pe%C3%A7a.";
export const FINESSE_VIP_GROUP = "https://chat.whatsapp.com/DBH3ZZJW84F8oDZx37Jas5";

const img = (path: string) => path;


export const products: Product[] = [
  {
    id: 1,
    name: "Diesel® T-just G15 Black",
    price: "R$ 555,00",
    oldPrice: "R$ 650,00",
    image: img(
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/tjust-detelhe1-resized-1766999555080.jpeg?width=8000&height=8000&resize=contain",
    ),
    gallery: [
      img(
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/tjust-detelhe1-resized-1766999555080.jpeg?width=8000&height=8000&resize=contain",
      ),
      img(
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/tjust-detalhe-costa-resized-1766999555086.jpeg?width=8000&height=8000&resize=contain",
      ),
      img(
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/TAG-tjust-resized-1766999555084.jpeg?width=8000&height=8000&resize=contain",
      ),
    ],
    description: [
      "Seminovo — usado 2-3 vezes, sem marcas.",
      "Modelagem relaxed / oversized, cai folgado no corpo.",
      "Size S (equivale a P brasileiro).",
      "100% algodão.",
      "Esta peça passou pela inspeção de autenticidade da Finesse Club.",
    ],
    details: {
      condicao: "Seminovo — Excelente estado",
      modelagem: "Relaxed / oversized",
      tamanho: "S (equivale a P BR)",
      material: "100% algodão",
    },
    buyNowUrl: "https://seguro.finesseclub.com.br/r/1YMS8P7GFD",
    sku: "64SM3QLK3",
  },
  {
    id: 2,
    name: "Diesel® umtee Black",
    price: "R$ 199,90",
    oldPrice: "R$ 250,00",
    image: img(
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e0354d74-faf5-4977-8775-aa3ee0f7ed6c/produto-2-resized-1769631761756.jpg?width=8000&height=8000&resize=contain",
    ),
    gallery: [
      img(
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e0354d74-faf5-4977-8775-aa3ee0f7ed6c/produto-2-resized-1769631761756.jpg?width=8000&height=8000&resize=contain",
      ),
    ],
    description: [
      "Seminovo — excelente estado.",
      "Modelagem regular/slim fit, caimento alinhado ao corpo.",
      "Size P (equivale a P brasileiro).",
      "100% Algodão.",
      "Esta peça passou pela inspeção de autenticidade da Finesse Club.",
    ],
    details: {
      condicao: "Seminovo — Excelente estado",
      modelagem: "Regular/slim fit",
      tamanho: "P (equivale a P BR)",
      material: "100%Algodão",
    },
    buyNowUrl: "https://seguro.finesseclub.com.br/r/MPMGCJXPW0",
    sku: "4GDZSPUQP",
  },
  {
    id: 3,
    name: "Suéter Polo Ralph Lauren®",
    price: "R$ 950,00",
    oldPrice: "R$ 1.250,00",
    image: img(
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e0354d74-faf5-4977-8775-aa3ee0f7ed6c/produto-3-1769631761346.jpg?width=8000&height=8000&resize=contain",
    ),
    gallery: [
      img(
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e0354d74-faf5-4977-8775-aa3ee0f7ed6c/produto-3-1769631761346.jpg?width=8000&height=8000&resize=contain",
      ),
    ],
    description: [
      "Novo.",
      "Modelagem regular, caimento estruturado.",
      "Size S (equivale a P brasileiro).",
      "Mistura de lã e algodão.",
      "Esta peça passou pela inspeção de autenticidade da Finesse Club.",
    ],
    details: {
      condicao: " Novo",
      modelagem: "Regular",
      tamanho: "S (equivale a P BR)",
      material: "Lã e algodão",
    },
    buyNowUrl: "https://seguro.finesseclub.com.br/r/1YMS8P7GFD",
    sku: "HPTP9SNLE",
    soldOut: true,
  },
  {
    id: 4,
    name: "Lacoste® Pima Cotton",
    price: "R$ 185,00",
    oldPrice: "R$ 245,00",
    image: img(
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e0354d74-faf5-4977-8775-aa3ee0f7ed6c/produto-4-resized-1769631761761.jpg?width=8000&height=8000&resize=contain",
    ),
    gallery: [
      img(
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e0354d74-faf5-4977-8775-aa3ee0f7ed6c/produto-4-resized-1769631761761.jpg?width=8000&height=8000&resize=contain",
      ),
    ],
    description: [
      "Seminovo — usado poucas vezes, em excelente estado.",
      "Modelagem regular, caimento clássico.",
      "Size S (equivale a P brasileiro).",
      "100% Pima Cotton.",
      "Esta peça passou pela inspeção de autenticidade da Finesse Club.",
    ],
    details: {
      condicao: "Seminovo — excelente estado",
      modelagem: "Regular",
      tamanho: "S (equivale a P BR)",
      material: "100% Pima Cotton",
    },
    buyNowUrl: "https://seguro.finesseclub.com.br/r/540WADO1SJ",
    sku: "8VL8MU4LJ",
  },
  {
    id: 45601744,
    name: "Brooksfield Branca",
    price: "R$ 115,00",
    oldPrice: "",
    image: img(
      "https://images.yampi.me/assets/stores/finesse-club/uploads/images/brooksfield-branca-6a555aa923269-large.png",
    ),
    gallery: [
      img(
        "https://images.yampi.me/assets/stores/finesse-club/uploads/images/brooksfield-branca-6a555aa923269-large.png",
      ),
    ],
    description: ["Peça autenticada pela curadoria Finesse Club."],
    buyNowUrl: "https://seguro.finesseclub.com.br/r/1KB4WO1C7D",
    sku: "RK4SRNJLC",
  },
  {
    id: 45601752,
    name: "Brooksfield Azul",
    price: "R$ 115,00",
    oldPrice: "",
    image: img(
      "https://images.yampi.me/assets/stores/finesse-club/uploads/images/brooksfield-azul-6a555a9de0e1a-large.png",
    ),
    gallery: [
      img(
        "https://images.yampi.me/assets/stores/finesse-club/uploads/images/brooksfield-azul-6a555a9de0e1a-large.png",
      ),
    ],
    description: ["Peça autenticada pela curadoria Finesse Club."],
    buyNowUrl: "https://seguro.finesseclub.com.br/r/KGI02MJHUY",
    sku: "GXRNRLK8G",
  },
  {
    id: 45771063,
    name: "Camiseta Polo Ralph Lauren Classic Black",
    price: "R$ 240,00",
    oldPrice: "",
    image: img(
      "https://images.yampi.me/assets/stores/finesse-club/uploads/images/camiseta-polo-ralph-lauren-classic-black-6a6fc351d75e1-large.jpeg",
    ),
    gallery: [
      img(
        "https://images.yampi.me/assets/stores/finesse-club/uploads/images/camiseta-polo-ralph-lauren-classic-black-6a6fc351d75e1-large.jpeg",
      ),
    ],
    description: [
      "Preço loja R$ 969.",
      "Seminovo — excelente estado.",
      "Regular fit.",
      "M (equivale a M BR).",
      "100% Algodão.",
      "Acompanha certificado de autenticidade @authbr.",
    ],
    details: {
      condicao: "Seminovo — Excelente estado",
      modelagem: "Regular fit",
      tamanho: "M (equivale a M BR)",
      material: "100% Algodão",
    },
    buyNowUrl: "https://seguro.finesseclub.com.br/r/BUF25P8436",
    sku: "PDM7C9JNC",
  },
  {
    id: 45771070,
    name: "Short Brooksfield Swim Blue",
    price: "R$ 235,00",
    oldPrice: "",
    image: img(
      "https://images.yampi.me/assets/stores/finesse-club/uploads/images/short-brooksfield-swim-blue-6a6fc46404e06-large.jpeg",
    ),
    gallery: [
      img(
        "https://images.yampi.me/assets/stores/finesse-club/uploads/images/short-brooksfield-swim-blue-6a6fc46404e06-large.jpeg",
      ),
    ],
    description: [
      "Preço loja R$ 399,99.",
      "Seminovo — excelente estado.",
      "Regular fit.",
      "P/M (veste P e M BR).",
    ],
    details: {
      condicao: "Seminovo — Excelente estado",
      modelagem: "Regular fit",
      tamanho: "P/M (veste P e M BR)",
      material: "—",
    },
    buyNowUrl: "https://seguro.finesseclub.com.br/r/RBOE7UCYP7",
    sku: "494FJBR8M",
  },
];


export const priceToCents = (p: string) =>
  Math.round(parseFloat(p.replace(/[^\d,]/g, "").replace(",", ".")) * 100);
export const centsToPrice = (cents: number) =>
  `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`;

export const getProduct = (id: number) => products.find((p) => p.id === id);
