import { Link, useNavigate } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useShop, getProduct, formatPrice } from "@/lib/shop";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { useEffect } from "react";
export function CartDrawer() {
    const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, clearCart } = useShop();
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        document.body.style.overflow = cartOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [cartOpen]);
    const items = cart
        .map((i) => ({ item: i, product: getProduct(i.productId) }))
        .filter((x) => !!x.product);
    const total = items.reduce((s, x) => s + x.product.price * x.item.qty, 0);
    return (<>
      <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setCartOpen(false)}/>
      <aside className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-50 shadow-2xl flex flex-col transition-transform ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-serif text-xl">Корзина</h3>
          <button onClick={() => setCartOpen(false)} className="h-8 w-8 grid place-items-center hover:bg-muted rounded-sm">
            <X className="h-4 w-4"/>
          </button>
        </div>

        {items.length === 0 ? (<div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-muted-foreground">Ваша корзина пуста</p>
            <button onClick={() => setCartOpen(false)} className="btn-copper">Продолжить покупки</button>
          </div>) : (<>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map(({ item, product }) => (<div key={item.productId} className="flex gap-3 pb-4 border-b border-border">
                  <Link to="/product/$id" params={{ id: product.id }} onClick={() => setCartOpen(false)} className="w-20 h-20 bg-muted shrink-0">
                    <img src={product.img} alt={product.title} loading="lazy" className="w-full h-full object-cover"/>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to="/product/$id" params={{ id: product.id }} onClick={() => setCartOpen(false)} className="text-sm line-clamp-2 hover:text-[var(--color-copper-dark)]">
                      {product.title}
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-sm">
                        <button onClick={() => updateQty(item.productId, item.qty - 1)} className="h-7 w-7 grid place-items-center hover:bg-muted">
                          <Minus className="h-3 w-3"/>
                        </button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <button onClick={() => updateQty(item.productId, item.qty + 1)} className="h-7 w-7 grid place-items-center hover:bg-muted">
                          <Plus className="h-3 w-3"/>
                        </button>
                      </div>
                      <div className="text-sm font-medium">{formatPrice(product.price * item.qty)}</div>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.productId)} className="h-7 w-7 grid place-items-center text-muted-foreground hover:text-[var(--color-sale)]">
                    <Trash2 className="h-4 w-4"/>
                  </button>
                </div>))}
              <button onClick={clearCart} className="text-xs text-muted-foreground hover:text-[var(--color-sale)]">Очистить корзину</button>
            </div>
            <div className="p-5 border-t border-border space-y-4 bg-muted/40">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">Итого</span>
                <span className="text-2xl font-serif">{formatPrice(total)}</span>
              </div>
              <button onClick={() => {
                setCartOpen(false);
                if (!user) {
                    toast.info("Войдите в аккаунт, чтобы оформить заказ");
                    navigate({ to: "/account", search: { redirect: "/checkout" } });
                }
                else {
                    navigate({ to: "/checkout" });
                }
            }} className="btn-copper w-full">
                Оформить заказ
              </button>
              <button onClick={() => {
                toast.success("Промокод применён");
            }} className="w-full text-xs text-muted-foreground hover:text-foreground">
                У меня есть промокод
              </button>
            </div>
          </>)}
      </aside>
    </>);
}
