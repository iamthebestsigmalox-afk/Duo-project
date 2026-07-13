import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, ShoppingBag, Truck, Shield, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Header, Footer } from "@/components/site-chrome";
import { ProductCard } from "@/components/product-card";
import { getProduct, products, formatPrice, useShop } from "@/lib/shop";
export const Route = createFileRoute("/product/$id")({
    loader: ({ params }) => {
        const p = getProduct(params.id);
        if (!p)
            throw notFound();
        return { product: p };
    },
    head: ({ loaderData }) => ({
        meta: loaderData
            ? [
                { title: `${loaderData.product.title} — Copper Pro` },
                { name: "description", content: loaderData.product.description },
                { property: "og:title", content: loaderData.product.title },
                { property: "og:description", content: loaderData.product.description },
            ]
            : [{ title: "Товар не найден" }, { name: "robots", content: "noindex" }],
    }),
    notFoundComponent: () => (<div className="min-h-screen bg-background">
      <Header />
      <div className="container-x py-32 text-center">
        <h1 className="section-title mb-4">Товар не найден</h1>
        <Link to="/catalog" className="btn-copper">Вернуться в каталог</Link>
      </div>
      <Footer />
    </div>),
    component: ProductPage,
});
function ProductPage() {
    const { product } = Route.useLoaderData();
    const { addToCart, toggleFavorite, favorites, setCartOpen } = useShop();
    const [qty, setQty] = useState(1);
    const fav = favorites.includes(product.id);
    const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
    return (<div className="min-h-screen bg-background">
      <Header />
      <div className="container-x py-10">
        <div className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Главная</Link> /{" "}
          <Link to="/catalog" search={{ cat: product.category }} className="hover:text-foreground">{product.categoryLabel}</Link> /{" "}
          <span className="text-foreground">{product.title}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="relative aspect-square bg-muted overflow-hidden">
            <img src={product.img} alt={product.title} className="w-full h-full object-cover"/>
            {(product.sale || product.oldPrice) && (<div className="absolute top-4 left-0 bg-[var(--color-sale)] text-white text-xs tracking-widest px-3 py-1">SALE</div>)}
            {product.isNew && (<div className="absolute top-4 left-0 bg-[var(--color-copper)] text-white text-xs tracking-widest px-3 py-1">NEW</div>)}
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--color-copper-dark)] mb-2">{product.categoryLabel}</p>
            <h1 className="font-serif text-3xl md:text-4xl mb-4">{product.title}</h1>
            <div className="flex items-baseline gap-4 mb-6">
              <div className="text-3xl font-serif text-[var(--color-copper-dark)]">{formatPrice(product.price)}</div>
              {product.oldPrice && <div className="text-lg text-muted-foreground line-through">{formatPrice(product.oldPrice)}</div>}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-sm">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-11 w-11 grid place-items-center hover:bg-muted">
                  <Minus className="h-4 w-4"/>
                </button>
                <span className="w-12 text-center">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="h-11 w-11 grid place-items-center hover:bg-muted">
                  <Plus className="h-4 w-4"/>
                </button>
              </div>
              <button onClick={() => {
            addToCart(product.id, qty);
            toast.success("Добавлено в корзину");
            setCartOpen(true);
        }} className="btn-copper flex-1">
                <ShoppingBag className="h-4 w-4 mr-2"/> В корзину
              </button>
              <button onClick={() => {
            toggleFavorite(product.id);
            toast.success(fav ? "Убрано из избранного" : "Добавлено в избранное");
        }} className={`h-11 w-11 grid place-items-center border rounded-sm transition-colors ${fav ? "bg-[var(--color-copper)] text-white border-[var(--color-copper)]" : "border-border hover:bg-muted"}`}>
                <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`}/>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-border pt-6 mt-6">
              {[
            { icon: Truck, label: "Доставка", text: "По всему миру" },
            { icon: Shield, label: "Гарантия", text: "2 года" },
            { icon: RefreshCcw, label: "Возврат", text: "14 дней" },
        ].map((f) => (<div key={f.label} className="flex flex-col items-center text-center gap-1">
                  <f.icon className="h-5 w-5 text-[var(--color-copper-dark)]"/>
                  <div className="text-xs font-medium">{f.label}</div>
                  <div className="text-xs text-muted-foreground">{f.text}</div>
                </div>))}
            </div>
          </div>
        </div>

        {related.length > 0 && (<div className="mt-24">
            <h2 className="section-title mb-10">похожие товары</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((p) => <ProductCard key={p.id} p={p}/>)}
            </div>
          </div>)}
      </div>
      <Footer />
    </div>);
}
