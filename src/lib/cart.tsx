import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = { id: number; qty: number };

type CartContext = {
  items: CartItem[];
  count: number;
  add: (id: number) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartContext | null>(null);
const KEY = "fc.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const value = useMemo<CartContext>(
    () => ({
      items,
      count: items.reduce((s, i) => s + i.qty, 0),
      add: (id) =>
        setItems((curr) => {
          const ex = curr.find((i) => i.id === id);
          if (ex) return curr.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
          return [...curr, { id, qty: 1 }];
        }),
      remove: (id) => setItems((curr) => curr.filter((i) => i.id !== id)),
      setQty: (id, qty) =>
        setItems((curr) =>
          qty <= 0 ? curr.filter((i) => i.id !== id) : curr.map((i) => (i.id === id ? { ...i, qty } : i)),
        ),
      clear: () => setItems([]),
    }),
    [items],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
