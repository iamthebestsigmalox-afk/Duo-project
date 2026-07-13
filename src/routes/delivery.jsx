import { createFileRoute } from "@tanstack/react-router";
import { Truck, Globe, Package, Clock } from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
export const Route = createFileRoute("/delivery")({
    head: () => ({
        meta: [
            { title: "Доставка — Copper Pro" },
            { name: "description", content: "Условия доставки Copper Pro: сроки, стоимость, страны." },
        ],
    }),
    component: DeliveryPage,
});
function DeliveryPage() {
    const options = [
        { icon: Truck, title: "Курьер по Киеву", price: "150 грн", days: "1–2 дня" },
        { icon: Package, title: "Новая почта", price: "по тарифам", days: "1–3 дня" },
        { icon: Globe, title: "Международная доставка", price: "по расчёту", days: "5–14 дней" },
        { icon: Clock, title: "Самовывоз", price: "бесплатно", days: "в тот же день" },
    ];
    return (<div className="min-h-screen bg-background">
      <Header />
      <div className="container-x py-16 max-w-4xl">
        <h1 className="section-title mb-10">доставка</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Мы доставляем медные изделия по всему миру. При заказе от 3 000 грн доставка по Украине бесплатная.</p>
        <div className="grid sm:grid-cols-2 gap-6">
          {options.map((o) => (<div key={o.title} className="border border-border p-6 flex gap-4">
              <div className="h-12 w-12 shrink-0 grid place-items-center bg-[var(--color-forest)] text-[oklch(0.75_0.12_45)]">
                <o.icon className="h-5 w-5"/>
              </div>
              <div>
                <h3 className="font-medium mb-1">{o.title}</h3>
                <p className="text-sm text-muted-foreground">{o.price} • {o.days}</p>
              </div>
            </div>))}
        </div>
      </div>
      <Footer />
    </div>);
}
