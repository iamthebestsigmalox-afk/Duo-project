import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/site-chrome";
import { ProductCard } from "@/components/product-card";
import { products, useShop } from "@/lib/shop";
export const Route = createFileRoute("/favorites")({
    head: () => ({ meta: [{ title: "Избранное — Copper Pro" }] }),
    component: FavoritesPage,
});
function FavoritesPage() {
    const { favorites } = useShop();
    const list = products.filter((p) => favorites.includes(p.id));
    return (<div className="min-h-screen bg-background">
      <Header />
      <div className="container-x py-12">
        <h1 className="section-title mb-10">избранное</h1>
        {list.length === 0 ? (<div className="text-center py-16 space-y-4">
            <p className="text-muted-foreground">В избранном пока нет товаров</p>
            <Link to="/catalog" className="btn-copper">Перейти в каталог</Link>
          </div>) : (<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {list.map((p) => <ProductCard key={p.id} p={p}/>)}
          </div>)}
      </div>
      <Footer />
    </div>);
}
