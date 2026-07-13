import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/site-chrome";
const posts = [
    { title: "Как выбрать медный дистиллятор", date: "05.06.2024", excerpt: "Разбираем ключевые параметры: объём, тип конденсатора, толщина стенок и особенности сборки." },
    { title: "Уход за медной посудой", date: "22.05.2024", excerpt: "Простые правила, которые сохранят блеск и защитят вашу посуду от патины на долгие годы." },
    { title: "Гидролаты своими руками", date: "10.04.2024", excerpt: "Пошаговое руководство по производству ароматических вод из свежих трав и цветов." },
];
export const Route = createFileRoute("/news")({
    head: () => ({ meta: [{ title: "Новости — Copper Pro" }] }),
    component: NewsPage,
});
function NewsPage() {
    return (<div className="min-h-screen bg-background">
      <Header />
      <div className="container-x py-16">
        <h1 className="section-title mb-12">новости</h1>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {posts.map((p) => (<article key={p.title} className="border border-border p-6 hover:shadow-lg transition-shadow group">
              <p className="text-xs text-muted-foreground mb-3">{p.date}</p>
              <h2 className="font-serif text-xl mb-3 group-hover:text-[var(--color-copper-dark)] transition-colors">{p.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.excerpt}</p>
              <Link to="/news" className="text-xs text-[var(--color-copper-dark)] hover:underline">Читать далее →</Link>
            </article>))}
        </div>
      </div>
      <Footer />
    </div>);
}
