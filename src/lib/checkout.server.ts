import { products } from "./products";

export type CartItem = { sku: string; quantity: number };

export type YampiSku = {
  id: number;
  sku: string;
  token?: string | null;
  purchase_url?: string | null;
  blocked_sale?: boolean;
};

export const API_ALIAS = "finesse-club";
export const CHECKOUT_HOST = "seguro.finesseclub.com.br";

export function tokenFromUrl(url?: string | null) {
  return url?.match(/\/r\/([^/?#]+)/)?.[1];
}

export function getPurchaseToken(sku: YampiSku) {
  return sku.token || tokenFromUrl(sku.purchase_url);
}

export function buildCheckoutUrl(parts: string[]) {
  return `https://${CHECKOUT_HOST}/r/${parts.join(",")}`;
}

/** Fallback: builds the multi-item checkout from the local catalog tokens. */
export function localCheckout(items: CartItem[]): { url?: string; error?: string } {
  const parts: string[] = [];
  const missing: string[] = [];
  for (const item of items) {
    const product = products.find((p) => p.sku === item.sku && !p.soldOut);
    const token = tokenFromUrl(product?.buyNowUrl);
    if (token) parts.push(`${token}:${item.quantity}`);
    else missing.push(item.sku);
  }
  if (parts.length === 0) {
    return { error: `SKU não encontrado: ${missing.join(", ") || "carrinho vazio"}` };
  }
  return { url: buildCheckoutUrl(parts) };
}

export async function createCheckout(items: CartItem[]): Promise<{ url?: string; error?: string }> {
  const token = process.env["YAMPI_USER_TOKEN"];
  const secret = process.env["YAMPI_USER_SECRET"];
  if (!token || !secret) return localCheckout(items);

  try {
    const res = await fetch(`https://api.dooki.com.br/v2/${API_ALIAS}/catalog/skus?limit=100`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Token": token,
        "User-Secret-Key": secret,
      },
    });
    if (!res.ok) {
      console.error("Yampi SKU catalog error", res.status, await res.text());
      return localCheckout(items);
    }
    const json: any = await res.json();
    const available: YampiSku[] = Array.isArray(json?.data) ? json.data : [];

    const parts: string[] = [];
    const missing: string[] = [];
    for (const item of items) {
      const found = available.find((s) => s.sku === item.sku && !s.blocked_sale);
      const purchaseToken = found ? getPurchaseToken(found) : undefined;
      if (purchaseToken) parts.push(`${purchaseToken}:${item.quantity}`);
      else missing.push(item.sku);
    }
    if (parts.length === 0) return localCheckout(items);
    if (missing.length > 0) {
      const fallback = localCheckout(items.filter((i) => missing.includes(i.sku)));
      if (fallback.url) parts.push(...fallback.url.split("/r/")[1].split(","));
    }
    return { url: buildCheckoutUrl(parts) };
  } catch (err) {
    console.error("Yampi checkout failed", err);
    return localCheckout(items);
  }
}
