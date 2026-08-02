import { Camera, Search, Truck, ClipboardCheck, CircleCheck } from "lucide-react";

const steps = [
  {
    n: "01",
    Icon: Camera,
    title: "Envio das informações",
    desc: "Preencha o formulário com fotos reais da peça, marca, estado de conservação e valor desejado.",
  },
  {
    n: "02",
    Icon: Search,
    title: "Análise inicial",
    desc: "Nossa equipe avalia se a peça está alinhada ao padrão e curadoria da Finesse Club. Entramos em contato em até 24h.",
  },
  {
    n: "03",
    Icon: Truck,
    title: "Envio da peça",
    desc: "Após a aprovação inicial, enviamos as instruções de envio para que a peça seja encaminhada à Finesse Club.",
  },
  {
    n: "04",
    Icon: ClipboardCheck,
    title: "Verificação e autenticação",
    desc: "Realizamos a análise física da peça, verificando autenticidade, condição e conformidade com as informações enviadas.",
  },
  {
    n: "05",
    Icon: CircleCheck,
    title: "Pagamento",
    desc: "Após aprovação final e autenticação da peça, o pagamento é realizado via PIX conforme as condições acordadas.",
  },
];

export function SellSteps({
  eyebrow = "Como funciona",
  title = (
    <>
      A jornada da sua peça
      <br />
      até a Finesse Club
    </>
  ),
}: {
  eyebrow?: string;
  title?: React.ReactNode;
}) {
  return (
    <section className="py-4">
      <p className="text-center text-[10px] font-semibold tracking-[0.35em] uppercase text-white/50">
        {eyebrow}
      </p>
      <h2
        className="mt-4 text-center text-3xl leading-tight md:text-5xl"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {title}
      </h2>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map(({ n, Icon, title: t, desc }) => (
          <div
            key={n}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25"
          >
            <span
              className="pointer-events-none absolute right-3 top-2 select-none text-6xl font-light text-white/[0.07]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              aria-hidden
            >
              {n}
            </span>
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5">
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <h3 className="mt-6 text-base leading-snug">{t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
