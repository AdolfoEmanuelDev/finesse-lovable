import { createServerFn } from "@tanstack/react-start";

type CartItem = { sku: string; quantity: number };

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
    const alias = "finesseclub";
    const token = process.env.YAMPI_USER_TOKEN;
    const secret = process.env.YAMPI_USER_SECRET;
    if (!token || !secret) throw new Error("Yampi credentials ausentes");

    const url = `https://api.dooki.com.br/v2/${alias}/checkouts`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Token": token,
        "User-Secret": secret,
      },
      body: JSON.stringify({ items: data.items }),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("Yampi checkout error", res.status, text);
      throw new Error(`Yampi checkout falhou (${res.status})`);
    }

    let json: any;
    try {
      json = JSON.parse(text);
    } catch {
      throw new Error("Resposta Yampi inválida");
    }

    const d = json?.data ?? json;
    const checkoutUrl: string | undefined =
      d?.url ||
      d?.checkout_url ||
      d?.redirect_url ||
      (d?.token ? `https://seguro.finesseclub.com.br/checkout/${d.token}` : undefined);

    if (!checkoutUrl) {
      console.error("Yampi checkout sem URL", json);
      throw new Error("URL de checkout não retornada");
    }
    return { url: checkoutUrl };
  });
