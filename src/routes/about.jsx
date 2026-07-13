import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/site-chrome";
export const Route = createFileRoute("/about")({
    head: () => ({
        meta: [
            { title: "О нас — Copper Pro" },
            { name: "description", content: "Copper Pro — мастерская медных изделий ручной работы. История, ценности, команда." },
        ],
    }),
    component: AboutPage,
});
function AboutPage() {
    return (<div className="min-h-screen bg-background">
      <Header />
      <div className="container-x py-16 max-w-3xl">
        <h1 className="section-title mb-10">о нас</h1>
        <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <p>Copper Pro — семейная мастерская, специализирующаяся на изготовлении медных дистилляторов, посуды и аксессуаров ручной работы. Мы работаем с медью более 15 лет и вкладываем душу в каждое изделие.</p>
          <p>Каждый наш продукт проходит через руки опытных мастеров: от раскроя листа меди до финальной полировки. Мы используем только чистую медь без примесей, что делает наши изделия долговечными и безопасными.</p>
          <p>Наша миссия — сохранять традиции ремесла и делать красивые, функциональные вещи, которые прослужат вам десятилетиями.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 mt-16">
          {[
            { n: "15+", l: "лет опыта" },
            { n: "2000+", l: "клиентов" },
            { n: "40+", l: "стран доставки" },
        ].map((s) => (<div key={s.l} className="text-center border border-border p-8">
              <div className="font-serif text-5xl text-[var(--color-copper-dark)]">{s.n}</div>
              <div className="text-sm text-muted-foreground mt-2">{s.l}</div>
            </div>))}
        </div>
      </div>
      <Footer />
    </div>);
}
