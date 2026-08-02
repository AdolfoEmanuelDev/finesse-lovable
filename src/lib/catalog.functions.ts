import { createServerFn } from "@tanstack/react-start";
import type { Product } from "./products";
import { getYampiCatalog } from "./yampi.server";

export type CatalogResult = { products: Product[]; source: "yampi" | "fallback" };

export const getCatalog = createServerFn({ method: "GET" }).handler(
  async (): Promise<CatalogResult> => await getYampiCatalog(),
);
