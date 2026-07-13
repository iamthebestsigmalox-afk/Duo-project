import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/site-chrome";
export const Route = createFileRoute("/privacy")({
    head: () => ({ meta: [{ title: "Политика конфиденциальности — Copper Pro" }] }),
    component: () => (<div className="min-h-screen bg-background">
      <Header />
      <div className="container-x py-16 max-w-3xl">
        <h1 className="section-title mb-10">политика конфиденциальности</h1>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>Настоящая политика описывает, как Copper Pro собирает и использует персональные данные пользователей сайта.</p>
          <p>Мы собираем только те данные, которые необходимы для оформления и доставки заказа: имя, телефон, email, адрес. Мы не передаём ваши данные третьим лицам, за исключением служб доставки.</p>
          <p>Вы можете в любой момент запросить удаление своих данных, написав на a.akimoke@gmail.com.</p>
        </div>
      </div>
      <Footer />
    </div>),
});
