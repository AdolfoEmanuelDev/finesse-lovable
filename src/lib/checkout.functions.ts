import { createServerFn } from "@tanstack/react-start";

type CartItem = { sku: string; quantity: number };

type YampiSku = { id: number; sku: string };

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
    const alias = "finesse-club";
    const token = process.env.YAMPI_USER_TOKEN;
    const secret = process.env.YAMPI_USER_SECRET;
    if (!token || !secret) return { error: "Yampi credentials ausentes" };

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Token": token,
      "User-Secret-Key": secret,
    };

    const catalogRes = await fetch(`https://api.dooki.com.br/v2/${alias}/catalog/skus?limit=100`, {
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
    const skus = data.items.map((item) => {
      const found = availableSkus.find((s) => s.sku === item.sku);
      return found ? { id: found.id, quantity: item.quantity } : null;
    });
    const missingSkus = data.items.filter((item, index) => !skus[index]).map((item) => item.sku);
    if (missingSkus.length > 0) {
      return { error: `SKU não encontrado na Yampi: ${missingSkus.join(", ")}` };
    }

    const url = `https://api.dooki.com.br/v2/${alias}/checkout/payment-link`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        ...headers,
      },
      body: JSON.stringify({
        name: `Carrinho Finesse Club ${Date.now()}`,
        active: true,
        skus,
      }),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("Yampi checkout error", res.status, text);
      return { error: `Yampi checkout falhou (${res.status})` };
    }

    let json: any;
    try {
      json = JSON.parse(text);
    } catch {
      return { error: "Resposta Yampi inválida" };
    }

    const d = json?.data ?? json;
    const checkoutUrl: string | undefined =
      d?.link_url ||
      d?.url ||
      d?.checkout_url ||
      d?.redirect_url ||
      d?.whatsapp?.link;

    if (!checkoutUrl) {
      console.error("Yampi checkout sem URL", json);
      return { error: "URL de checkout não retornada" };
    }
    return { url: checkoutUrl };
  });
