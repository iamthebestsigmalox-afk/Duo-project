import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Star, Shield, HandCoins, Package, Truck, BadgeCheck, Sparkles, Leaf, Flame, Tag, Gift } from "lucide-react";
import { useEffect, useState } from "react";
import { Header, Footer } from "@/components/site-chrome";
import { ProductCard } from "@/components/product-card";
import { Carousel, CarouselSlide } from "@/components/carousel-row";
import { products, categories, formatPrice } from "@/lib/shop";
import heroDistiller from "@/assets/hero-distiller.jpg";
import promoBanner from "@/assets/promo-banner.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
export const Route = createFileRoute("/")({
    component: Index,
});
const heroSlides = [
    { badge: "ХИТ ПРОДАЖ", title: "Дистиллятор для эфирных масел", price: 4906, id: "distiller-oil-1" },
    { badge: "НОВИНКА", title: "Медный аламбик премиум", price: 5490, id: "distiller-oil-2" },
    { badge: "СПЕЦПРЕДЛОЖЕНИЕ", title: "Профессиональный гидролатный куб", price: 6800, id: "hydrolat-2" },
];
const features = [
    { icon: Star, title: "Аутентичность", text: "Медное перегонное оборудование используется для получения эфирных масел с незапамятных времён." },
    { icon: Sparkles, title: "Изысканность", text: "Наши изделия из меди практичны, а также наполнят особой магией ваш дом или рабочее место." },
    { icon: HandCoins, title: "Честная оплата", text: "Мы стремимся предоставить лучший товар по лучшей цене с сервисом высокого уровня." },
    { icon: Package, title: "Большой ассортимент", text: "У нас есть всё от миниатюрных настольных дистилляторов до крупного оборудования." },
    { icon: Truck, title: "Доставка по всему миру", text: "Вы можете получить нашу продукцию в кратчайшие сроки в любую точку земного шара." },
    { icon: BadgeCheck, title: "Гарантия качества", text: "Наше оборудование производится вручную. Мы постоянно проводим контроль качества продукции." },
    { icon: Shield, title: "Удобство в использовании", text: "Наши изделия из меди имеют уникальный дизайн, разработанный для максимального удобства." },
    { icon: Leaf, title: "Забота о среде", text: "От 2 до 5% стоимости каждого товара мы направляем на защиту окружающей среды." },
];
const testimonials = [
    { name: "Иван Иванов", date: "20.10.24", avatar: avatar1, rating: 5, text: "Оборудование производится вручную. Постоянный контроль качества. Если возникают вопросы при транспортировке или эксплуатации в течение первых 2 лет, всегда находят удобное решение." },
    { name: "Анна Петрова", date: "12.09.24", avatar: avatar2, rating: 5, text: "Заказывала медный чайник — очень качественная работа. Приятно держать в руках, эстетика на высоте. Служба поддержки отвечает быстро и по делу." },
    { name: "Сергей Ковалёв", date: "03.11.24", avatar: avatar3, rating: 5, text: "Купил дистиллятор для эфирных масел. Собран аккуратно, все швы ровные. Работает отлично, гидролаты и масла получаются чистые." },
];
const quickFilters = [
    { icon: Flame, label: "Хиты продаж", cat: undefined, filter: "bestseller" },
    { icon: Sparkles, label: "Новинки", cat: undefined, filter: "new" },
    { icon: Tag, label: "Скидки", cat: "sale" },
    { icon: Gift, label: "Индивидуальный заказ", cat: "custom" },
];
function Hero() {
    const [i, setI] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 6000);
        return () => clearInterval(t);
    }, []);
    const slide = heroSlides[i];
    return (<section className="relative min-h-[640px] hero-gradient overflow-hidden">
      <Header variant="hero"/>
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          <circle cx="900" cy="400" r="500" stroke="white" strokeWidth="1" fill="none" opacity="0.3"/>
          <circle cx="900" cy="400" r="350" stroke="white" strokeWidth="1" fill="none" opacity="0.4"/>
          <circle cx="900" cy="400" r="200" stroke="white" strokeWidth="1" fill="none" opacity="0.5"/>
        </svg>
      </div>
      <button onClick={() => setI((v) => (v - 1 + heroSlides.length) % heroSlides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 bg-white/90 hover:bg-white grid place-items-center rounded-sm">
        <ChevronLeft className="h-4 w-4"/>
      </button>
      <button onClick={() => setI((v) => (v + 1) % heroSlides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 bg-white/90 hover:bg-white grid place-items-center rounded-sm">
        <ChevronRight className="h-4 w-4"/>
      </button>
      <div className="container-x pt-40 pb-20 relative grid md:grid-cols-2 gap-8 items-center">
        <div key={i} className="text-white relative z-10 animate-fade-up">
          <h1 className="font-serif text-6xl md:text-7xl font-light text-copper-shine">{slide.badge}</h1>
          <div className="h-px w-32 bg-white/40 my-6"/>
          <p className="text-2xl md:text-3xl font-serif italic mb-8 leading-tight">{slide.title}</p>
          <div className="flex items-center gap-6 mb-6">
            <span className="text-white/70 text-sm tracking-wider">Цена</span>
            <span className="text-2xl font-serif">{formatPrice(slide.price)}</span>
          </div>
          <Link to="/product/$id" params={{ id: slide.id }} className="btn-copper">Купить</Link>
          <div className="mt-10 flex gap-2">
            {heroSlides.map((_, idx) => (<button key={idx} onClick={() => setI(idx)} className={`h-1 w-8 transition-colors ${idx === i ? "bg-[oklch(0.7_0.14_45)]" : "bg-white/30 hover:bg-white/50"}`}/>))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 -m-8 bg-[oklch(0.75_0.14_45)]/25 blur-3xl rounded-full pointer-events-none"/>
          <img src={heroDistiller} alt="Медный дистиллятор" width={1400} height={1000} className="w-full h-auto object-contain animate-fade-up animate-float relative"/>
          <div className="absolute -bottom-10 -right-4 font-serif text-white/10 text-8xl md:text-9xl font-light leading-none pointer-events-none select-none">COPPER<br />PRO</div>
        </div>

      </div>
    </section>);
}
function CategoryGrid() {
    return (<section className="py-20 bg-background">
      <div className="container-x">
        <h2 className="section-title mb-12">наша продукция</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((c) => (<Link key={c.slug} to="/catalog" search={{ cat: c.slug }} className="group relative aspect-square overflow-hidden bg-muted">
              <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
              <div className="absolute inset-x-0 bottom-0 py-3 text-center bg-black/40 backdrop-blur-sm text-white font-serif text-lg">
                {c.title}
              </div>
            </Link>))}
          <Link to="/catalog" search={{ cat: "sale" }} className="group relative aspect-square overflow-hidden hero-gradient flex flex-col items-center justify-center text-white p-6 hover:scale-[1.01] transition-transform">
            <div className="text-center space-y-1">
              <div className="text-4xl font-serif">-30 %</div>
              <div className="text-5xl font-serif">-50 %</div>
              <div className="text-6xl font-serif">-80 %</div>
            </div>
            <div className="absolute inset-x-0 bottom-0 py-3 text-center bg-black/30 backdrop-blur-sm font-serif text-lg">
              Скидки и предложения
            </div>
          </Link>
        </div>
      </div>
    </section>);
}
function chunk(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size)
        out.push(arr.slice(i, i + size));
    return out;
}
function CatalogCarousel({ title, list, bg }) {
    const pages = chunk(list, 3);
    return (<Carousel title={title} count={list.length} bg={bg} cta={<Link to="/catalog" className="btn-copper">Перейти в каталог</Link>}>
      {pages.map((page, i) => (<CarouselSlide key={i}>
          <div className="grid md:grid-cols-3 gap-6">
            {page.map((p) => <ProductCard key={p.id} p={p}/>)}
          </div>
        </CarouselSlide>))}
    </Carousel>);
}
function PromoBanner() {
    return (<section className="relative overflow-hidden hero-gradient">
      <div className="container-x py-16 grid md:grid-cols-2 gap-8 items-center relative">
        <div className="text-white relative z-10">
          <div className="font-serif text-6xl md:text-7xl mb-6">1 + 1 = 3</div>
          <p className="text-xl mb-6 max-w-sm">Закажите два товара и получите третий бесплатно</p>
          <Link to="/catalog" className="btn-copper">Перейти в каталог</Link>
        </div>
        <div className="relative h-64 md:h-full min-h-[280px]">
          <img src={promoBanner} alt="Акция" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-90"/>
          <div className="absolute bottom-4 right-4 font-serif text-white/20 text-6xl md:text-8xl leading-none pointer-events-none select-none">COPPER<br />PRO</div>
        </div>
      </div>
    </section>);
}
function Testimonials() {
    const [i, setI] = useState(0);
    return (<section className="py-20 bg-background relative">
      <button onClick={() => setI((v) => (v - 1 + testimonials.length) % testimonials.length)} className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white shadow grid place-items-center rounded-sm z-10 hover:bg-muted">
        <ChevronLeft className="h-4 w-4"/>
      </button>
      <button onClick={() => setI((v) => (v + 1) % testimonials.length)} className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white shadow grid place-items-center rounded-sm z-10 hover:bg-muted">
        <ChevronRight className="h-4 w-4"/>
      </button>
      <div className="container-x">
        <h2 className="section-title mb-12">что думают о нас</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (<div key={idx} className={`relative bg-white shadow-sm p-7 overflow-hidden rounded-sm transition-all duration-500 hover:-translate-y-1 hover:copper-glow ${idx === i ? "ring-1 ring-[var(--color-copper)]/50 copper-glow" : ""}`}>
              <div className="absolute top-4 right-5 font-serif text-8xl text-[var(--color-copper)]/10 leading-none select-none">"</div>
              <div className="flex items-center gap-3 mb-4 relative">
                <div className="relative">
                  <img src={t.avatar} alt={t.name} loading="lazy" width={48} height={48} className="h-12 w-12 rounded-full object-cover ring-2 ring-[var(--color-copper)]/30"/>
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-[var(--color-copper)] grid place-items-center">
                    <BadgeCheck className="h-3 w-3 text-white"/>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg leading-tight">{t.name}</h3>
                  <div className="flex gap-0.5 text-[var(--color-copper)]">
                    {Array.from({ length: t.rating }).map((_, k) => (<Star key={k} className="h-3 w-3 fill-current"/>))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed relative">{t.text}</p>
              <p className="text-xs text-muted-foreground/70 mt-4">{t.date}</p>
            </div>))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (<button key={idx} onClick={() => setI(idx)} className={`h-1.5 w-6 transition-colors ${idx === i ? "bg-[var(--color-copper)]" : "bg-foreground/30 hover:bg-foreground/60"}`}/>))}
        </div>
      </div>
    </section>);
}
function Features() {
    return (<section className="py-20 bg-[oklch(0.94_0.008_80)]">
      <div className="container-x">
        <h2 className="section-title mb-12">почему выбирают нас</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          {features.map((f) => (<div key={f.title} className="group">
              <div className="h-14 w-14 bg-[var(--color-forest)] grid place-items-center mb-4 group-hover:bg-[var(--color-copper-dark)] transition-colors">
                <f.icon className="h-6 w-6 text-[oklch(0.75_0.12_45)] group-hover:text-white transition-colors"/>
              </div>
              <h3 className="font-medium text-sm mb-2">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">{f.text}</p>
              <Link to="/about" className="text-xs text-[var(--color-copper-dark)] hover:underline">Читать больше ▾</Link>
            </div>))}
        </div>
      </div>
    </section>);
}
function QuickFilters() {
    return (<section className="py-10 bg-background border-y border-border/60">
      <div className="container-x">
        <div className="flex gap-3 overflow-x-auto scrollbar-none justify-start md:justify-center">
          {quickFilters.map((f) => (<Link key={f.label} to="/catalog" search={f.cat ? { cat: f.cat } : {}} className="group shrink-0 flex items-center gap-2 px-5 py-3 rounded-full border border-border bg-white hover:border-[var(--color-copper)] hover:bg-[var(--color-copper)] hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <f.icon className="h-4 w-4 text-[var(--color-copper-dark)] group-hover:text-white transition-colors"/>
              <span className="text-sm whitespace-nowrap">{f.label}</span>
            </Link>))}
        </div>
      </div>
    </section>);
}
function Index() {
    const bestsellers = products.filter((p) => p.bestseller);
    const news = products.filter((p) => p.isNew);
    const sales = products.filter((p) => p.oldPrice);
    const recommend = products.slice(0, 6);
    return (<div className="bg-pattern min-h-screen">
      <Hero />
      <QuickFilters />
      <CategoryGrid />
      <CatalogCarousel title="лучшие продажи" list={bestsellers} bg="bg-[oklch(0.96_0.008_80)]"/>
      <CatalogCarousel title="новинки" list={news}/>
      <PromoBanner />
      <CatalogCarousel title="мы рекомендуем" list={recommend}/>
      <CatalogCarousel title="скидки" list={sales} bg="bg-[oklch(0.96_0.008_80)]"/>
      <Testimonials />
      <Features />
      <Footer />
    </div>);
}
