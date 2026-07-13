import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Header, Footer } from "@/components/site-chrome";
import { ProductCard } from "@/components/product-card";
import { products, categories } from "@/lib/shop";
import { useState } from "react";
const searchSchema = z.object({
    cat: z.string().optional(),
});
export const Route = createFileRoute("/catalog")({
    head: () => ({
        meta: [
            { title: "Каталог — Copper Pro" },
            { name: "description", content: "Каталог медных дистилляторов, посуды и аксессуаров ручной работы." },
            { property: "og:title", content: "Каталог — Copper Pro" },
            { property: "og:description", content: "Каталог медных изделий Copper Pro." },
        ],
    }),
    validateSearch: (s) => searchSchema.parse(s),
    component: CatalogPage,
});
function CatalogPage() {
    const { cat } = Route.useSearch();
    const [sort, setSort] = useState("pop");
    const filtered = cat === "sale"
        ? products.filter((p) => p.oldPrice)
        : cat
            ? products.filter((p) => p.category === cat)
            : products;
    const sorted = [...filtered].sort((a, b) => sort === "asc" ? a.price - b.price : sort === "desc" ? b.price - a.price : 0);
    const currentCat = categories.find((c) => c.slug === cat);
    const title = cat === "sale" ? "Скидки и предложения" : currentCat?.title ?? "Весь каталог";
    return (<div className="min-h-screen bg-background">
      <Header />
      <div className="container-x py-10">
        <div className="text-xs text-muted-foreground mb-3">
          <Link to="/" className="hover:text-foreground">Главная</Link> / Каталог
        </div>
        <h1 className="section-title text-left mb-8">{title.toLowerCase()}</h1>

        <div className="grid md:grid-cols-[240px_1fr] gap-10">
          <aside className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3 uppercase tracking-widest">Категории</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/catalog" className={`hover:text-[var(--color-copper-dark)] ${!cat ? "text-[var(--color-copper-dark)] font-medium" : "text-muted-foreground"}`}>Все товары</Link>
                </li>
                {categories.map((c) => (<li key={c.slug}>
                    <Link to="/catalog" search={{ cat: c.slug }} className={`hover:text-[var(--color-copper-dark)] ${cat === c.slug ? "text-[var(--color-copper-dark)] font-medium" : "text-muted-foreground"}`}>{c.title}</Link>
                  </li>))}
                <li>
                  <Link to="/catalog" search={{ cat: "sale" }} className={`hover:text-[var(--color-copper-dark)] ${cat === "sale" ? "text-[var(--color-copper-dark)] font-medium" : "text-muted-foreground"}`}>Скидки</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3 uppercase tracking-widest">Сортировка</h3>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full border border-border bg-background px-3 py-2 text-sm rounded-sm">
                <option value="pop">По популярности</option>
                <option value="asc">Цена: по возрастанию</option>
                <option value="desc">Цена: по убыванию</option>
              </select>
            </div>
          </aside>

          <div>
            <p className="text-sm text-muted-foreground mb-6">Найдено товаров: {sorted.length}</p>
            {sorted.length === 0 ? (<div className="py-20 text-center text-muted-foreground">В этой категории пока нет товаров.</div>) : (<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sorted.map((p) => <ProductCard key={p.id} p={p}/>)}
              </div>)}
          </div>
        </div>
      </div>
      <Footer />
    </div>);
}
