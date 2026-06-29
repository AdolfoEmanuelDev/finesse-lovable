import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos e Condições — Finesse Club" },
      { name: "description", content: "Termos, privacidade, entregas, trocas e pagamentos da Finesse Club." },
      { property: "og:title", content: "Termos e Condições — Finesse Club" },
      { property: "og:description", content: "Termos, privacidade, entregas, trocas e pagamentos da Finesse Club." },
    ],
  }),
  component: TermosPage,
});

function TermosPage() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-8 md:pt-16">
        <h1 className="text-3xl font-bold tracking-wide">TERMOS E CONDIÇÕES</h1>
        <p className="mt-6 text-sm text-white/80">
          Bem-vindo a Finesse Club. Ao acessar e usar este site, você concorda com os seguintes termos:
        </p>

        <section className="mt-8 space-y-2">
          <h2 className="text-sm font-semibold tracking-wide">1. POLÍTICA DE PRIVACIDADE</h2>
          <p className="text-sm text-white/80">
            Respeitamos a sua privacidade e protegemos os seus dados pessoais. Todas as informações coletadas
            são usadas exclusivamente para processar seus pedidos e melhorar sua experiência.
          </p>
        </section>

        <section className="mt-8 space-y-2">
          <h2 className="text-sm font-semibold tracking-wide">2. ENTREGAS</h2>
          <p className="text-sm text-white/80">
            Nossos prazos de entrega variam de acordo com a sua região. O rastreamento estará disponível assim
            que o pedido for postado.
          </p>
        </section>

        <section className="mt-8 space-y-2">
          <h2 className="text-sm font-semibold tracking-wide">3. TROCAS E DEVOLUÇÕES</h2>
          <p className="text-sm text-white/80">
            Você tem até 7 dias após o recebimento para solicitar a troca ou devolução de um produto, desde
            que este não tenha sido utilizado e mantenha as etiquetas originais.
          </p>
        </section>

        <section className="mt-8 space-y-2">
          <h2 className="text-sm font-semibold tracking-wide">4. PAGAMENTOS</h2>
          <p className="text-sm text-white/80">
            Aceitamos diversas formas de pagamento seguras para garantir a melhor experiência de compra.
          </p>
        </section>

        <section className="mt-8 space-y-2">
          <h2 className="text-sm font-semibold tracking-wide">5. CONTATO</h2>
          <p className="text-sm text-white/80">
            Em caso de dúvidas sobre nossos termos ou qualquer outra solicitação, entre em contato com nosso
            suporte através do Instagram:{" "}
            <a
              href="https://www.instagram.com/_finesseclub/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:opacity-70"
            >
              @_finesseclub
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
