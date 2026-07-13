import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useShop, formatPrice } from "@/lib/shop";
import { toast } from "sonner";
export function ProductCard({ p }) {
    const { favorites, toggleFavorite, addToCart } = useShop();
    const fav = favorites.includes(p.id);
    // deterministic pseudo-rating so cards feel real
    const rating = 4 + ((p.id.length * 7) % 10) / 10;
    const reviews = 8 + (p.id.charCodeAt(0) % 40);
    return (<div className="group relative">
      <div className="relative aspect-square overflow-hidden bg-muted mb-4 rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_-20px_oklch(0.42_0.09_40/0.35)] transition-shadow duration-500">
        <Link to="/product/$id" params={{ id: p.id }}>
          <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[900ms] ease-out"/>
        </Link>

        {/* copper wash on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.42_0.09_40/0.35)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"/>

        {/* shimmer sweep */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -inset-x-full inset-y-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[1200ms] ease-out"/>
        </div>

        {(p.sale || p.oldPrice) && (<div className="absolute top-3 left-0 bg-[var(--color-sale)] text-white text-[10px] tracking-[0.2em] px-3 py-1 shadow-md">
            SALE
          </div>)}
        {p.isNew && !p.sale && (<div className="absolute top-3 left-0 bg-[var(--color-copper)] text-white text-[10px] tracking-[0.2em] px-3 py-1 shadow-md">
            NEW
          </div>)}
        {p.bestseller && !p.sale && !p.isNew && (<div className="absolute top-3 left-0 bg-[var(--color-forest)] text-[oklch(0.85_0.12_60)] text-[10px] tracking-[0.2em] px-3 py-1 shadow-md">
            HIT
          </div>)}

        <button onClick={(e) => {
            e.preventDefault();
            toggleFavorite(p.id);
            toast.success(fav ? "Убрано из избранного" : "Добавлено в избранное");
        }} className={`absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full backdrop-blur-md transition-all duration-300 ${fav
            ? "bg-[var(--color-copper)] text-white scale-100 shadow-lg"
            : "bg-white/80 hover:bg-white text-foreground hover:scale-110"}`} aria-label="В избранное">
          <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`}/>
        </button>

        <button onClick={(e) => {
            e.preventDefault();
            addToCart(p.id);
            toast.success("Товар добавлен в корзину");
        }} className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 bg-foreground/95 backdrop-blur text-background py-2.5 text-[11px] tracking-[0.2em] flex items-center justify-center gap-2 rounded-sm hover:bg-[var(--color-copper-dark)]">
          <ShoppingBag className="h-3.5 w-3.5"/> В КОРЗИНУ
        </button>
      </div>

      <div className="px-1">
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 mb-1">
          {p.categoryLabel}
        </div>
        <Link to="/product/$id" params={{ id: p.id }} className="block text-sm text-foreground/90 leading-snug line-clamp-2 hover:text-[var(--color-copper-dark)] transition-colors min-h-[2.5rem]">
          {p.title}
        </Link>
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="flex items-center gap-0.5 text-[var(--color-copper)]">
            {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`h-3 w-3 ${i < Math.round(rating) ? "fill-current" : ""}`}/>))}
          </div>
          <span className="text-[10px] text-muted-foreground">({reviews})</span>
        </div>
        <div className="flex items-baseline justify-between gap-2 mt-2">
          <div className="flex items-baseline gap-2">
            <span className={`text-base font-medium ${p.oldPrice ? "text-[var(--color-sale)]" : "text-foreground"}`}>
              {formatPrice(p.price)}
            </span>
            {p.oldPrice && (<span className="text-xs text-muted-foreground line-through">
                {formatPrice(p.oldPrice)}
              </span>)}
          </div>
          {p.oldPrice && (<span className="text-[10px] text-[var(--color-sale)] font-medium">
              −{Math.round((1 - p.price / p.oldPrice) * 100)}%
            </span>)}
        </div>
      </div>
    </div>);
}
