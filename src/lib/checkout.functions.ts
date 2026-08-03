import { createServerFn } from "@tanstack/react-start";
import { createCheckout, type CartItem } from "./checkout.server";

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
  .handler(async ({ data }) => await createCheckout(data.items));
