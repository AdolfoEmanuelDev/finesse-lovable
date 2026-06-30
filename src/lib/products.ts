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
  soldOut?: boolean;
};

export const FINESSE_WHATSAPP =
  "https://wa.me/91920030501?text=Ol%C3%A1%20Finesse%20Club%2C%20quero%20vender%20uma%20pe%C3%A7a.";
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
      "Seminovo — usado 2-3 vezes, sem marcas visíveis de desgaste.",
      "Modelagem relaxed / oversized, cai folgado no corpo.",
      "Size S (equivale a M brasileiro).",
      "100% algodão.",
      "Esta peça passou pela inspeção de autenticidade da Finesse Club.",
    ],
    details: {
      condicao: "Seminovo — usado 2-3 vezes, sem marcas visíveis",
      modelagem: "Relaxed / oversized",
      tamanho: "S (equivale a M BR)",
      material: "100% algodão",
    },
    buyNowUrl: "https://seguro.finesseclub.com.br/r/1YMS8P7GFD",
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
      "Seminovo — pouquíssimo uso, sem sinais visíveis de desgaste.",
      "Modelagem regular, caimento alinhado ao corpo.",
      "Size M (equivale a M brasileiro).",
      "Algodão premium.",
      "Esta peça passou pela inspeção de autenticidade da Finesse Club.",
    ],
    details: {
      condicao: "Seminovo — pouquíssimo uso",
      modelagem: "Regular",
      tamanho: "M (equivale a M BR)",
      material: "Algodão premium",
    },
    buyNowUrl: "https://seguro.finesseclub.com.br/r/1YMS8P7GFD",
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
    soldOut: true,
  },
  {
    id: 4,
    name: "Lacoste® Pima Cotton",
    price: "R$ 245,00",
    oldPrice: "R$ 399,99",
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
      "Size M (equivale a M brasileiro).",
      "100% Pima Cotton.",
      "Esta peça passou pela inspeção de autenticidade da Finesse Club.",
    ],
    details: {
      condicao: "Seminovo — excelente estado",
      modelagem: "Regular",
      tamanho: "M (equivale a M BR)",
      material: "100% Pima Cotton",
    },
    buyNowUrl: "https://seguro.finesseclub.com.br/r/1YMS8P7GFD",
  },
];

export const priceToCents = (p: string) =>
  Math.round(parseFloat(p.replace(/[^\d,]/g, "").replace(",", ".")) * 100);
export const centsToPrice = (cents: number) =>
  `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`;

export const getProduct = (id: number) => products.find((p) => p.id === id);
