import { createContext, useContext, useEffect, useState } from "react";
import productDistillerSmall from "@/assets/product-distiller-small.jpg";
import productHydrolat from "@/assets/product-hydrolat.jpg";
import productKettle from "@/assets/product-kettle.jpg";
import productAccessory from "@/assets/product-accessory.jpg";
import productCustom from "@/assets/product-custom.jpg";
import heroDistiller from "@/assets/hero-distiller.jpg";
const desc = "Изделие ручной работы из чистой меди. Идеально подходит для повседневного использования, украсит любой интерьер и станет отличным подарком для ценителей качества.";
export const products = [
    { id: "distiller-oil-1", title: "Дистиллятор для эфирных масел «Классик»", price: 4906, img: heroDistiller, category: "oils", categoryLabel: "Для эфирных масел", bestseller: true, description: desc },
    { id: "distiller-oil-2", title: "Медный аламбик для эфирных масел", price: 5490, oldPrice: 6900, img: productDistillerSmall, category: "oils", categoryLabel: "Для эфирных масел", sale: true, bestseller: true, description: desc },
    { id: "distiller-oil-3", title: "Настольный дистиллятор компактный", price: 3200, img: productDistillerSmall, category: "oils", categoryLabel: "Для эфирных масел", isNew: true, description: desc },
    { id: "hydrolat-1", title: "Медный дистиллятор для гидролатов", price: 4200, img: productHydrolat, category: "hydrolats", categoryLabel: "Для гидролатов", bestseller: true, description: desc },
    { id: "hydrolat-2", title: "Профессиональный гидролатный куб", price: 6800, oldPrice: 8500, img: productHydrolat, category: "hydrolats", categoryLabel: "Для гидролатов", sale: true, description: desc },
    { id: "hydrolat-3", title: "Мини-куб для гидролатов", price: 2900, img: productHydrolat, category: "hydrolats", categoryLabel: "Для гидролатов", isNew: true, description: desc },
    { id: "kettle-1", title: "Медный чайник с фарфоровой ручкой", price: 1953, img: productKettle, category: "cookware", categoryLabel: "Медная посуда", bestseller: true, description: desc },
    { id: "kettle-2", title: "Медный чайник классический", price: 2450, oldPrice: 3100, img: productKettle, category: "cookware", categoryLabel: "Медная посуда", sale: true, description: desc },
    { id: "kettle-3", title: "Чайник для заваривания медный", price: 1750, img: productKettle, category: "cookware", categoryLabel: "Медная посуда", isNew: true, description: desc },
    { id: "acc-1", title: "Медная подставка колонна", price: 890, img: productAccessory, category: "accessories", categoryLabel: "Аксессуары из меди", description: desc },
    { id: "acc-2", title: "Набор медных крышек", price: 1200, oldPrice: 1600, img: productAccessory, category: "accessories", categoryLabel: "Аксессуары из меди", sale: true, description: desc },
    { id: "custom-1", title: "Индивидуальный медный чайник", price: 3800, img: productCustom, category: "custom", categoryLabel: "Индивидуальный заказ", description: desc },
];
export const categories = [
    { slug: "oils", title: "Для эфирных масел", img: productDistillerSmall },
    { slug: "hydrolats", title: "Для гидролатов", img: productHydrolat },
    { slug: "cookware", title: "Медная посуда", img: productKettle },
    { slug: "accessories", title: "Аксессуары из меди", img: productAccessory },
    { slug: "custom", title: "Индивидуальный заказ", img: productCustom },
];
export function formatPrice(n) {
    return `${n.toLocaleString("ru-RU").replace(/,/g, " ")} грн`;
}
const ShopContext = createContext(null);
export function ShopProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        try {
            const c = localStorage.getItem("cp_cart");
            const f = localStorage.getItem("cp_fav");
            if (c)
                setCart(JSON.parse(c));
            if (f)
                setFavorites(JSON.parse(f));
        }
        catch { }
        setHydrated(true);
    }, []);
    useEffect(() => {
        if (hydrated)
            localStorage.setItem("cp_cart", JSON.stringify(cart));
    }, [cart, hydrated]);
    useEffect(() => {
        if (hydrated)
            localStorage.setItem("cp_fav", JSON.stringify(favorites));
    }, [favorites, hydrated]);
    const addToCart = (id, qty = 1) => setCart((prev) => {
        const found = prev.find((i) => i.productId === id);
        if (found)
            return prev.map((i) => (i.productId === id ? { ...i, qty: i.qty + qty } : i));
        return [...prev, { productId: id, qty }];
    });
    const removeFromCart = (id) => setCart((p) => p.filter((i) => i.productId !== id));
    const updateQty = (id, qty) => setCart((p) => (qty <= 0 ? p.filter((i) => i.productId !== id) : p.map((i) => (i.productId === id ? { ...i, qty } : i))));
    const toggleFavorite = (id) => setFavorites((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
    const clearCart = () => setCart([]);
    return (<ShopContext.Provider value={{ cart, favorites, addToCart, removeFromCart, updateQty, toggleFavorite, clearCart, cartOpen, setCartOpen }}>
      {children}
    </ShopContext.Provider>);
}
export function useShop() {
    const ctx = useContext(ShopContext);
    if (!ctx)
        throw new Error("useShop must be used within ShopProvider");
    return ctx;
}
export function getProduct(id) {
    return products.find((p) => p.id === id);
}
