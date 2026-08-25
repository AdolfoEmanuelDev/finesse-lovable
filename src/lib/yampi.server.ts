import { products as fallbackProducts, type Product } from "./products";

const API_ALIAS = "finesse-club";
const CACHE_TTL_MS = 5 * 60 * 1000;

type CacheEntry = { at: number; data: Product[] };
let cache: CacheEntry | null = null;

const manualDetailsBySku = new Map(
  fallbackProducts.filter((p) => p.sku && p.details).map((p) => [p.sku as string, p.details!]),
);

function formatBRL(value: number) {
  return `R$ ${value.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d)(?=,))/g, ".")}`;
}

function stripHtml(html: string): string[] {
  return html
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function pickImages(product: any): string[] {
  const images: any[] = product?.images?.data ?? [];
  return images
    .slice()
    .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
    .map((i) => i?.large?.url || i?.medium?.url || i?.thumb?.url)
    .filter(Boolean);
}

function mapProduct(raw: any): Product | null {
  const sku = raw?.skus?.data?.[0];
  const skuCode: string | undefined = sku?.sku ?? raw?.sku ?? undefined;
  const gallery = pickImages(raw);
  const priceSale = Number(sku?.price_sale ?? 0);
  const priceDiscount = Number(sku?.price_discount ?? 0);
  const current = priceSale > 0 ? priceSale : priceDiscount;
  if (!raw?.id || !current) return null;

  const outOfStock =
    raw?.active === false ||
    sku?.blocked_sale === true ||
    (sku?.quantity_managed === true && Number(sku?.total_in_stock ?? 0) <= 0) ||
    sku?.stock_status === "out_of_stock";

  const description = stripHtml(String(raw?.texts?.data?.description ?? ""));
  if (description.length === 0) {
    description.push("Peça autenticada pela curadoria Finesse Club.");
  }

  const details = skuCode ? manualDetailsBySku.get(skuCode) : undefined;

  return {
    id: Number(raw.id),
    name: String(raw.name ?? "").replace(/\s+/g, " ").trim(),
    price: formatBRL(current),
    oldPrice: "",
    image: gallery[0] ?? "",
    gallery: gallery.length ? gallery : [""],
    description,
    details,
    buyNowUrl: sku?.purchase_url ?? "https://seguro.finesseclub.com.br",
    sku: skuCode,
    soldOut: Boolean(outOfStock),
  };
}

async function fetchCatalog(): Promise<Product[]> {
  const token = process.env["YAMPI_USER_TOKEN"];
  const secret = process.env["YAMPI_USER_SECRET"];
  if (!token || !secret) throw new Error("Yampi credentials ausentes");

  const res = await fetch(
    `https://api.dooki.com.br/v2/${API_ALIAS}/catalog/products?include=skus,images,texts&limit=100`,
    {
      headers: {
        Accept: "application/json",
        "User-Token": token,
        "User-Secret-Key": secret,
      },
    },
  );
  if (!res.ok) throw new Error(`Yampi catálogo falhou (${res.status})`);
  const json: any = await res.json();
  const list: any[] = Array.isArray(json?.data) ? json.data : [];
  const mapped = list.map(mapProduct).filter(Boolean) as Product[];
  if (mapped.length === 0) throw new Error("Catálogo Yampi vazio");
  return mapped;
}

export async function getYampiCatalog(): Promise<{ products: Product[]; source: "yampi" | "fallback" }> {
  const now = Date.now();
  if (cache && now - cache.at < CACHE_TTL_MS) {
    return { products: cache.data, source: "yampi" };
  }
  try {
    const data = await fetchCatalog();
    cache = { at: now, data };
    return { products: data, source: "yampi" };
  } catch (err) {
    console.error("Yampi catalog sync failed", err);
    if (cache) return { products: cache.data, source: "yampi" };
    return { products: fallbackProducts, source: "fallback" };
  }
}
