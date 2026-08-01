import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Ruler, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FINESSE_WHATSAPP } from "@/lib/products";

export const Route = createFileRoute("/autenticacao")({
  head: () => ({
    meta: [
      { title: "Autenticação e Tamanhos — Finesse Club" },
      {
        name: "description",
        content:
          "Como autenticamos cada peça: Auth.br, LegitApp e inspeção manual da equipe Finesse Club. Medidas exatas pelo WhatsApp.",
      },
      { property: "og:title", content: "Autenticação e Tamanhos — Finesse Club" },
      {
        property: "og:description",
        content:
          "Auth.br, LegitApp e curadoria manual Finesse Club. Peça única: consulte as medidas exatas pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/autenticacao" }],
  }),
  component: Autenticacao,
});

const etapas = [
  {
    title: "Auth.br",
    desc: "Serviço especializado em autenticação de peças de luxo e streetwear no Brasil.",
  },
  {
    title: "LegitApp",
    desc: "Plataforma internacional de legit check, usada como segunda camada de verificação.",
  },
  {
    title: "Curadoria manual Finesse Club",
    desc: "Nossa equipe inspeciona etiquetas, costuras, tags, materiais e acabamento peça por peça.",
  },
];

function Autenticacao() {
  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-8 md:pt-16">
        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/50">
          Confiança
        </p>
        <h1
          className="mt-3 text-3xl tracking-wide md:text-5xl"
          style={{ fontFamily: "'Montserrat', sans-serif", fontStyle: "italic" }}
        >
          Autenticação
        </h1>
        <p className="mt-4 max-w-2xl text-white/70">
          Nenhuma peça entra no catálogo sem passar por verificação. Trabalhamos com{" "}
          <strong className="text-white">Auth.br</strong> e{" "}
          <strong className="text-white">LegitApp</strong>, além da autenticação manual feita pela
          equipe Finesse Club.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {etapas.map((e) => (
            <div key={e.title} className="border border-white/15 bg-white/5 p-5">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />
              <h2 className="mt-3 text-[12px] font-semibold tracking-[0.2em] uppercase">
                {e.title}
              </h2>
              <p className="mt-2 text-sm text-white/65">{e.desc}</p>
            </div>
          ))}
        </div>

        {/* Aviso sobre tamanhos */}
        <section className="mt-12 border border-white/15 bg-white/5 p-6">
          <div className="flex items-center gap-2">
            <Ruler className="h-5 w-5" strokeWidth={1.5} />
            <h2 className="text-[12px] font-semibold tracking-[0.2em] uppercase">
              Aviso sobre tamanhos
            </h2>
          </div>
          <p className="mt-3 text-sm text-white/70">
            Trabalhamos com peça única. Como cada marca e cada modelagem veste de um jeito, o
            tamanho da etiqueta nem sempre corresponde ao padrão brasileiro. Para descobrir as
            medidas, é só entrar em contato pelo WhatsApp: enviamos as medidas exatas, aferidas
            manualmente pela equipe Finesse Club.
          </p>
          <a
            href={FINESSE_WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 bg-white px-8 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-black transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            Falar no WhatsApp
          </a>
          <p className="mt-3 text-[11px] tracking-[0.2em] uppercase text-white/50">
            WhatsApp: (91) 92003-0501
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
