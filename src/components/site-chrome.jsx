import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Heart, User, ShoppingCart, Menu, X, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useShop, products, formatPrice } from "@/lib/shop";
export function Logo({ light = false }) {
    return (<Link to="/" className={`flex items-center gap-2 ${light ? "text-white" : "text-foreground"}`}>
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M8 22 L8 12 L14 8 L20 12 L20 22" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="14" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M20 14 L26 14 L26 22 L20 22" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
      <div className="font-serif text-lg italic leading-none">
        Copper Pro<sup className="text-[0.5em]">®</sup>
      </div>
    </Link>);
}
const nav = [
    { to: "/catalog", label: "Каталог" },
    { to: "/news", label: "Новости" },
    { to: "/delivery", label: "Доставка" },
    { to: "/about", label: "О нас" },
    { to: "/contact", label: "Контакты" },
];
function SearchOverlay({ open, onClose }) {
    const [q, setQ] = useState("");
    const inputRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (open) {
            setQ("");
            setTimeout(() => inputRef.current?.focus(), 50);
            const esc = (e) => e.key === "Escape" && onClose();
            window.addEventListener("keydown", esc);
            return () => window.removeEventListener("keydown", esc);
        }
    }, [open, onClose]);
    const results = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s)
            return [];
        return products
            .filter((p) => p.title.toLowerCase().includes(s) || p.categoryLabel.toLowerCase().includes(s))
            .slice(0, 6);
    }, [q]);
    if (!open)
        return null;
    return (<div className="fixed inset-0 z-[60] bg-foreground/50 backdrop-blur-sm animate-fade-up" onClick={onClose}>
      <div className="container-x pt-24" onClick={(e) => e.stopPropagation()}>
        <div className="glass-card rounded-sm p-5 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <Search className="h-5 w-5 text-muted-foreground"/>
            <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Найти медный чайник, дистиллятор..." className="flex-1 bg-transparent outline-none text-lg placeholder:text-muted-foreground/60"/>
            <button onClick={onClose} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">ESC</button>
          </div>
          {q.trim() === "" ? (<div className="pt-4 space-y-3">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Популярное</div>
              <div className="flex flex-wrap gap-2">
                {["Дистиллятор", "Чайник", "Гидролат", "Аламбик", "Аксессуары"].map((t) => (<button key={t} onClick={() => setQ(t)} className="px-3 py-1.5 rounded-full text-xs bg-muted hover:bg-[var(--color-copper)] hover:text-white transition-colors">
                    {t}
                  </button>))}
              </div>
            </div>) : results.length === 0 ? (<div className="pt-6 pb-4 text-center text-sm text-muted-foreground">Ничего не найдено</div>) : (<ul className="pt-3 divide-y divide-border">
              {results.map((p) => (<li key={p.id}>
                  <button onClick={() => {
                    navigate({ to: "/product/$id", params: { id: p.id } });
                    onClose();
                }} className="w-full flex items-center gap-4 py-3 hover:bg-muted/40 px-2 -mx-2 rounded-sm text-left transition-colors">
                    <img src={p.img} alt="" className="h-14 w-14 object-cover rounded-sm"/>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate">{p.title}</div>
                      <div className="text-xs text-muted-foreground">{p.categoryLabel}</div>
                    </div>
                    <div className="text-sm font-medium text-[var(--color-copper-dark)]">{formatPrice(p.price)}</div>
                  </button>
                </li>))}
            </ul>)}
        </div>
      </div>
    </div>);
}
export function Header({ variant = "solid" }) {
    const { favorites, cart, setCartOpen } = useShop();
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    const cartCount = cart.reduce((s, i) => s + i.qty, 0);
    const isHero = variant === "hero";
    const textCls = isHero ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-foreground";
    const activeCls = isHero ? "text-[oklch(0.75_0.14_45)]" : "text-[var(--color-copper-dark)]";
    const wrapCls = isHero
        ? "absolute top-0 left-0 right-0 z-30 pt-6"
        : "sticky top-0 z-30 bg-background/85 backdrop-blur-md border-b border-border py-4";
    const btnBg = isHero ? "bg-white/95 hover:bg-white" : "bg-muted hover:bg-secondary";
    return (<>
      <header className={wrapCls}>
        <div className="container-x flex items-center justify-between">
          <Logo light={isHero}/>
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => {
            const active = pathname.startsWith(n.to);
            return (<Link key={n.to} to={n.to} className={`text-sm tracking-wide transition-colors ${active ? activeCls : textCls}`}>
                  {n.label}
                  {active && <div className="mx-auto mt-1 h-px w-6 bg-[oklch(0.7_0.14_45)]"/>}
                </Link>);
        })}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(true)} className={`h-10 w-10 grid place-items-center rounded-sm transition-colors ${btnBg}`} aria-label="Поиск">
              <Search className="h-4 w-4 text-foreground"/>
            </button>
            <Link to="/favorites" className={`relative h-10 w-10 grid place-items-center rounded-sm transition-colors ${btnBg}`}>
              <Heart className="h-4 w-4 text-foreground"/>
              {favorites.length > 0 && <span className="absolute -top-1 -right-1 h-4 w-4 grid place-items-center text-[10px] bg-[var(--color-copper)] text-white rounded-full">{favorites.length}</span>}
            </Link>
            <Link to="/account" className={`h-10 w-10 grid place-items-center rounded-sm transition-colors ${btnBg}`}>
              <User className="h-4 w-4 text-foreground"/>
            </Link>
            <button onClick={() => setCartOpen(true)} className={`relative h-10 w-10 grid place-items-center rounded-sm transition-colors ${btnBg}`}>
              <ShoppingCart className="h-4 w-4 text-foreground"/>
              {cartCount > 0 && <span className="absolute -top-1 -right-1 h-4 w-4 grid place-items-center text-[10px] bg-[var(--color-copper)] text-white rounded-full">{cartCount}</span>}
            </button>
            <button onClick={() => setOpen(!open)} className={`md:hidden h-10 w-10 grid place-items-center rounded-sm ${isHero ? "bg-white/95" : "bg-muted"}`}>
              {open ? <X className="h-4 w-4"/> : <Menu className="h-4 w-4"/>}
            </button>
          </div>
        </div>
        {open && (<div className="md:hidden container-x mt-4 pb-4 flex flex-col gap-3 bg-background/95 rounded-sm">
            {nav.map((n) => (<Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-sm py-2 text-foreground">
                {n.label}
              </Link>))}
          </div>)}
      </header>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)}/>
    </>);
}
export function Footer() {
    return (<footer className="footer-gradient text-white relative">
      <div className="container-x py-14 grid md:grid-cols-4 gap-10">
        <div>
          <Logo light/>
          <p className="text-xs text-white/60 mt-6">
            © 2021 «Copper Pro»<br />Все права защищены
          </p>
          <Link to="/privacy" className="text-xs text-white/70 hover:text-white underline underline-offset-2 mt-8 inline-block">Политика конфиденциальности</Link>
        </div>
        <div>
          <h4 className="text-sm mb-4 font-medium">Навигация</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {nav.map((n) => (<li key={n.to}><Link to={n.to} className="hover:text-[oklch(0.75_0.14_45)] transition-colors">{n.label}</Link></li>))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm mb-4 font-medium">Каталог</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/catalog" search={{ cat: "oils" }} className="hover:text-white">Для эфирных масел</Link></li>
            <li><Link to="/catalog" search={{ cat: "hydrolats" }} className="hover:text-white">Для гидролатов</Link></li>
            <li><Link to="/catalog" search={{ cat: "cookware" }} className="hover:text-white">Медная посуда</Link></li>
            <li><Link to="/catalog" search={{ cat: "accessories" }} className="hover:text-white">Аксессуары из меди</Link></li>
            <li><Link to="/catalog" search={{ cat: "custom" }} className="hover:text-white">Индивидуальный заказ</Link></li>
            <li><Link to="/catalog" search={{ cat: "sale" }} className="hover:text-white">Скидки и предложения</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm mb-4 font-medium">Контакты</h4>
          <p className="text-sm text-white/70">Божова 5-Б, Киев,<br />02072 Украина</p>
          <a href="tel:+380969904796" className="text-sm text-white/70 hover:text-white mt-3 block">+38 (096) 990 47 96</a>
          <a href="mailto:a.akimoke@gmail.com" className="text-sm text-white/70 hover:text-white">a.akimoke@gmail.com</a>
        </div>
      </div>
    </footer>);
}
