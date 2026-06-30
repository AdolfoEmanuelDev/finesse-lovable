import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

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

const WHATS_NUMBER = "5511999999999"; // ajuste para o número real

function VenderPage() {
  const [form, setForm] = useState({
    nome: "",
    whats: "",
    marca: "",
    tipo: "Camiseta",
    condicao: "Seminovo",
    valor: "",
  });

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      "Olá Finesse Club, quero vender uma peça:",
      `Nome: ${form.nome}`,
      `WhatsApp: ${form.whats}`,
      `Marca: ${form.marca}`,
      `Tipo: ${form.tipo}`,
      `Condição: ${form.condicao}`,
      `Valor desejado: ${form.valor}`,
    ];
    const url = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noreferrer");
  }

  const inputCls =
    "w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none";

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 pb-24 pt-12 md:pt-20">
        <h1
          className="text-3xl md:text-5xl tracking-wide text-center"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
        >
          Vender sua peça
        </h1>
        <p className="mt-4 text-center text-sm text-white/70">
          Preencha o formulário e nossa curadoria avaliará sua peça em até 24h.
        </p>

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

          <button
            type="submit"
            className="mt-4 w-full bg-white py-4 text-[12px] font-semibold tracking-[0.25em] uppercase text-black transition-opacity hover:opacity-90"
          >
            Enviar para o WhatsApp
          </button>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
