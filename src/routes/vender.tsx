import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SellSteps } from "@/components/SellSteps";


export const Route = createFileRoute("/vender")({
  head: () => ({
    meta: [
      { title: "Vender sua peça — Finesse Club" },
      {
        name: "description",
        content: "Envie sua peça para curadoria da Finesse Club. Análise em 24h.",
      },
      { property: "og:title", content: "Vender sua peça — Finesse Club" },
      {
        property: "og:description",
        content: "Envie sua peça para curadoria da Finesse Club.",
      },
    ],
    links: [{ rel: "canonical", href: "/vender" }],
  }),
  component: VenderPage,
});

const WHATS_NUMBER = "5591920030501";

const TIPOS = ["Camiseta", "Calçados", "Shorts", "Acessório", "Hoodies"] as const;
const CONDICOES = ["Novo", "Seminovo", "Bom estado"] as const;

// Remove control characters so nothing can forge extra lines in the message.
const clean = (v: string) =>
  v
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const sellSchema = z.object({
  nome: z.string().transform(clean).pipe(z.string().min(2, "Informe seu nome").max(100)),
  whats: z
    .string()
    .transform(clean)
    .pipe(
      z
        .string()
        .min(8, "Informe um WhatsApp válido")
        .max(20)
        .regex(/^[0-9()+\-\s]+$/, "WhatsApp deve conter apenas números"),
    ),
  marca: z.string().transform(clean).pipe(z.string().min(2, "Informe a marca").max(80)),
  tipo: z.enum(TIPOS),
  condicao: z.enum(CONDICOES),
  valor: z.string().transform(clean).pipe(z.string().min(1, "Informe o valor").max(20)),
});

function VenderPage() {
  const [form, setForm] = useState({
    nome: "",
    whats: "",
    marca: "",
    tipo: "Camiseta",
    condicao: "Seminovo",
    valor: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = sellSchema.safeParse(form);
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Verifique os dados do formulário");
      return;
    }
    setFormError(null);
    const d = parsed.data;
    const lines = [
      "Olá Finesse Club, quero vender uma peça:",
      `Nome: ${d.nome}`,
      `WhatsApp: ${d.whats}`,
      `Marca: ${d.marca}`,
      `Tipo: ${d.tipo}`,
      `Condição: ${d.condicao}`,
      `Valor desejado: ${d.valor}`,
    ];
    const url = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = url;
  }

  const inputCls =
    "w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none";

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <SiteHeader />
      <main className="pb-24 pt-12 md:pt-20">
        <div className="mx-auto max-w-6xl px-6 md:px-16">
          <h1
            className="text-3xl md:text-5xl tracking-wide text-center"
            style={{ fontFamily: "'Montserrat', sans-serif", fontStyle: "italic" }}
          >
            Vender sua peça
          </h1>
          <p className="mt-4 text-center text-sm text-white/70">
            Preencha o formulário e nossa curadoria avaliará sua peça em até 24h.
          </p>

          <div className="mt-16">
            <SellSteps eyebrow="Como vender sua peça" />
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-6">


        <form onSubmit={onSubmit} className="mt-10 space-y-4">
          <div>
            <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60">
              Nome
            </label>
            <input
              required
              maxLength={100}
              className={inputCls}
              value={form.nome}
              onChange={(e) => update("nome", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60">
              WhatsApp
            </label>
            <input
              required
              maxLength={20}
              placeholder="(11) 99999-9999"
              className={inputCls}
              value={form.whats}
              onChange={(e) => update("whats", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60">
              Marca da peça
            </label>
            <input
              required
              maxLength={80}
              className={inputCls}
              value={form.marca}
              onChange={(e) => update("marca", e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60">
                Tipo
              </label>
              <select
                className={inputCls}
                value={form.tipo}
                onChange={(e) => update("tipo", e.target.value)}
              >
                {["Camiseta", "Calçados", "Shorts", "Acessório", "Hoodies"].map((t) => (
                  <option key={t} value={t} className="bg-black">
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60">
                Condição
              </label>
              <select
                className={inputCls}
                value={form.condicao}
                onChange={(e) => update("condicao", e.target.value)}
              >
                {["Novo", "Seminovo", "Bom estado"].map((c) => (
                  <option key={c} value={c} className="bg-black">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60">
              Valor desejado
            </label>
            <input
              required
              maxLength={20}
              placeholder="R$"
              className={inputCls}
              value={form.valor}
              onChange={(e) => update("valor", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60">
              Fotos da peça
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full text-sm text-white/70 file:mr-4 file:border file:border-white/30 file:bg-transparent file:px-4 file:py-2 file:text-[10px] file:font-semibold file:uppercase file:tracking-[0.2em] file:text-white"
            />
            <p className="mt-2 text-xs text-white/50">
              Você enviará as fotos pelo WhatsApp ao confirmar o envio.
            </p>
          </div>

          {formError && (
            <p role="alert" className="text-sm text-red-400">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className="mt-4 w-full bg-white py-4 text-[12px] font-semibold tracking-[0.25em] uppercase text-black transition-opacity hover:opacity-90"
          >
            Enviar para o WhatsApp
          </button>
        </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
