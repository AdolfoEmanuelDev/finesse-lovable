import type { Product } from "./products";

/** Old hardcoded ids -> Yampi SKU, keeps legacy /produto/1 links working. */
export const LEGACY_ID_TO_SKU: Record<string, string> = {
  "1": "64SM3QLK3",
  "2": "4GDZSPUQP",
  "3": "HPTP9SNLE",
  "4": "8VL8MU4LJ",
};

export function findProduct(products: Product[], idParam: string): Product | undefined {
  const byId = products.find((p) => String(p.id) === idParam);
  if (byId) return byId;
  const bySku = products.find((p) => p.sku === idParam);
  if (bySku) return bySku;
  const legacySku = LEGACY_ID_TO_SKU[idParam];
  return legacySku ? products.find((p) => p.sku === legacySku) : undefined;
}
