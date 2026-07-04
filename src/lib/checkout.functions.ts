import { createServerFn } from "@tanstack/react-start";

type CartItem = { sku: string; quantity: number };

type YampiSku = {
  id: number;
  sku: string;
  token?: string | null;
  purchase_url?: string | null;
  blocked_sale?: boolean;
};

const API_ALIAS = "finesse-club";
const CHECKOUT_HOST = "seguro.finesseclub.com.br";

function getPurchaseToken(sku: YampiSku) {
  if (sku.token) return sku.token;
  const match = sku.purchase_url?.match(/\/r\/([^/?#]+)/);
  return match?.[1];
}

export const createYampiCheckout = createServerFn({ method: "POST" })
  .inputValidator((input: { items: CartItem[] }) => {
    if (!input || !Array.isArray(input.items) || input.items.length === 0) {
      throw new Error("items é obrigatório");
    }
    const items = input.items
      .filter((i) => i && typeof i.sku === "string" && i.sku.length > 0)
      .map((i) => ({ sku: String(i.sku), quantity: Math.max(1, Number(i.quantity) || 1) }));
    if (items.length === 0) throw new Error("nenhum sku válido");
    return { items };
  })
  .handler(async ({ data }) => {
    const token = process.env.YAMPI_USER_TOKEN;
    const secret = process.env.YAMPI_USER_SECRET;
    if (!token || !secret) return { error: "Yampi credentials ausentes" };

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Token": token,
      "User-Secret-Key": secret,
    };

    const catalogRes = await fetch(`https://api.dooki.com.br/v2/${API_ALIAS}/catalog/skus?limit=100`, {
      method: "GET",
      headers,
    });
    const catalogText = await catalogRes.text();
    if (!catalogRes.ok) {
      console.error("Yampi SKU catalog error", catalogRes.status, catalogText);
      return { error: `Yampi catálogo falhou (${catalogRes.status})` };
    }

    let catalogJson: any;
    try {
      catalogJson = JSON.parse(catalogText);
    } catch {
      return { error: "Resposta Yampi inválida" };
    }

    const availableSkus: YampiSku[] = Array.isArray(catalogJson?.data) ? catalogJson.data : [];
    const cartParts = data.items.map((item) => {
      const found = availableSkus.find((s) => s.sku === item.sku && !s.blocked_sale);
      const purchaseToken = found ? getPurchaseToken(found) : undefined;
      return purchaseToken ? `${purchaseToken}:${item.quantity}` : null;
    });
    const missingSkus = data.items.filter((item, index) => !cartParts[index]).map((item) => item.sku);
    if (missingSkus.length > 0) {
      return { error: `SKU não encontrado na Yampi: ${missingSkus.join(", ")}` };
    }

    return { url: `https://${CHECKOUT_HOST}/r/${cartParts.join(",")}` };
  });
