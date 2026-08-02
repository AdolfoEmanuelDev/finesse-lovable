import { createServerFn } from "@tanstack/react-start";
import { getYampiCatalog } from "./yampi.server";

export const getCatalog = createServerFn({ method: "GET" }).handler(async () => {
  return await getYampiCatalog();
});
