import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createCheckout } from "./checkout.server";

const MAX_LINES = 20;
const MAX_QTY = 10;

// SKUs are alphanumeric codes; anything else is rejected before it reaches Yampi.
const cartSchema = z.object({
  items: z
    .array(
      z.object({
        sku: z
          .string()
          .trim()
          .min(1)
          .max(64)
          .regex(/^[A-Za-z0-9._-]+$/, "SKU inválido"),
        quantity: z.coerce.number().int().min(1).max(MAX_QTY),
      }),
    )
    .min(1)
    .max(MAX_LINES),
});

export const createYampiCheckout = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => cartSchema.parse(input))
  .handler(async ({ data }) => await createCheckout(data.items));
