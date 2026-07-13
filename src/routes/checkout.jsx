import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Header, Footer } from "@/components/site-chrome";
import { useShop, getProduct, formatPrice } from "@/lib/shop";
import { useAuth } from "@/lib/auth";
export const Route = createFileRoute("/checkout")({
    head: () => ({ meta: [{ title: "Оформление заказа — Copper Pro" }] }),
    component: CheckoutPage,
});
function CheckoutPage() {
    const { cart, clearCart } = useShop();
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!authLoading && !user) {
            toast.info("Войдите в аккаунт, чтобы оформить заказ");
            navigate({ to: "/account", search: { redirect: "/checkout" } });
        }
    }, [authLoading, user, navigate]);
    const items = cart.map((i) => ({ item: i, product: getProduct(i.productId) })).filter((x) => x.product);
    const total = items.reduce((s, x) => s + x.product.price * x.item.qty, 0);
    const shipping = total > 3000 ? 0 : 150;
    const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", note: "" });
    const submit = (e) => {
        e.preventDefault();
        if (!form.name || !form.phone || !form.address) {
            toast.error("Заполните обязательные поля");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            clearCart();
            toast.success("Заказ оформлен! Мы свяжемся с вами.");
            navigate({ to: "/" });
        }, 900);
    };
    if (authLoading || !user) {
        return (<div className="min-h-screen bg-background">
        <Header />
        <div className="container-x py-20 text-center text-sm text-muted-foreground">Загрузка...</div>
        <Footer />
      </div>);
    }
    if (items.length === 0) {
        return (<div className="min-h-screen bg-background">
        <Header />
        <div className="container-x py-20 text-center space-y-4">
          <h1 className="section-title">корзина пуста</h1>
          <Link to="/catalog" className="btn-copper">Перейти в каталог</Link>
        </div>
        <Footer />
      </div>);
    }
    return (<div className="min-h-screen bg-background">
      <Header />
      <div className="container-x py-12">
        <h1 className="section-title mb-10">оформление заказа</h1>
        <div className="grid md:grid-cols-[1fr_400px] gap-10">
          <form onSubmit={submit} className="space-y-4">
            <h3 className="font-serif text-xl mb-4">Контактные данные</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Имя *" value={form.name} onChange={(v) => setForm({ ...form, name: v })}/>
              <Field label="Телефон *" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })}/>
            </div>
            <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })}/>
            <h3 className="font-serif text-xl mb-4 mt-6">Доставка</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Город *" value={form.city} onChange={(v) => setForm({ ...form, city: v })}/>
              <Field label="Адрес *" value={form.address} onChange={(v) => setForm({ ...form, address: v })}/>
            </div>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Комментарий</span>
              <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={3} className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm rounded-sm"/>
            </label>
            <button type="submit" disabled={loading} className="btn-copper w-full mt-6 disabled:opacity-60">
              {loading ? "Отправка..." : "Подтвердить заказ"}
            </button>
          </form>

          <aside className="bg-muted/50 p-6 rounded-sm h-fit sticky top-24">
            <h3 className="font-serif text-xl mb-4">Ваш заказ</h3>
            <div className="space-y-3 mb-4">
              {items.map(({ item, product }) => (<div key={item.productId} className="flex gap-3 text-sm">
                  <img src={product.img} alt="" className="w-14 h-14 object-cover"/>
                  <div className="flex-1">
                    <div className="line-clamp-2">{product.title}</div>
                    <div className="text-muted-foreground text-xs">× {item.qty}</div>
                  </div>
                  <div className="font-medium">{formatPrice(product.price * item.qty)}</div>
                </div>))}
            </div>
            <div className="border-t border-border pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span>Товары</span><span>{formatPrice(total)}</span></div>
              <div className="flex justify-between"><span>Доставка</span><span>{shipping === 0 ? "Бесплатно" : formatPrice(shipping)}</span></div>
              <div className="flex justify-between font-serif text-xl pt-2 border-t border-border mt-2"><span>Итого</span><span>{formatPrice(total + shipping)}</span></div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>);
}
function Field({ label, value, onChange, type = "text" }) {
    return (<label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-[var(--color-copper)]"/>
    </label>);
}
