export type Product = {
  id: number;
  name: string;
  price: string;
  oldPrice: string;
  image: string;
  gallery: string[];
  description: string[];
  buyNowUrl: string;
  soldOut?: boolean;
};

const img = (path: string) =>
  `https://finesseclub.com.br/_next/image?url=${encodeURIComponent(path)}&w=1920&q=75`;

export const products: Product[] = [
  {
    id: 1,
    name: "Diesel® T-just G15 Black",
    price: "R$ 555,00",
    oldPrice: "R$ 650,00",
    image: img(
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e0354d74-faf5-4977-8775-aa3ee0f7ed6c/produto-1-resized-1769631761757.jpg?width=8000&height=8000&resize=contain",
    ),
    gallery: [
      img(
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e0354d74-faf5-4977-8775-aa3ee0f7ed6c/produto-1-resized-1769631761757.jpg?width=8000&height=8000&resize=contain",
      ),
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
    description: ["Pouquíssimo uso. (DS)", "Modelagem relaxed / oversized", "Size S"],
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
    description: ["Pouquíssimo uso.", "Modelagem regular", "Size M"],
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
    description: ["Tricot cable knit.", "Modelagem regular", "Size M"],
    buyNowUrl: "https://seguro.finesseclub.com.br/r/1YMS8P7GFD",
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
    description: ["100% pima cotton.", "Modelagem regular", "Size M"],
    buyNowUrl: "https://seguro.finesseclub.com.br/r/1YMS8P7GFD",
  },
];

export const priceToCents = (p: string) =>
  Math.round(parseFloat(p.replace(/[^\d,]/g, "").replace(",", ".")) * 100);
export const centsToPrice = (cents: number) =>
  `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`;

export const getProduct = (id: number) => products.find((p) => p.id === id);
