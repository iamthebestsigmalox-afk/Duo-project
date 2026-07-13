import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
export function Carousel({ title, children, count, bg = "bg-background", cta, }) {
    const scrollRef = useRef(null);
    const [page, setPage] = useState(0);
    const perPage = 3;
    const pages = Math.max(1, Math.ceil(count / perPage));
    const goto = (p) => {
        const el = scrollRef.current;
        if (!el)
            return;
        const clamped = Math.max(0, Math.min(pages - 1, p));
        setPage(clamped);
        el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
    };
    useEffect(() => {
        const el = scrollRef.current;
        if (!el)
            return;
        const onScroll = () => {
            const p = Math.round(el.scrollLeft / el.clientWidth);
            setPage(p);
        };
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, []);
    return (<section className={`py-20 relative ${bg}`}>
      <button onClick={() => goto(page - 1)} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white shadow grid place-items-center rounded-sm z-10 hover:bg-muted transition-colors">
        <ChevronLeft className="h-4 w-4"/>
      </button>
      <button onClick={() => goto(page + 1)} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white shadow grid place-items-center rounded-sm z-10 hover:bg-muted transition-colors">
        <ChevronRight className="h-4 w-4"/>
      </button>
      <div className="container-x">
        <h2 className="section-title mb-12">{title}</h2>
        <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-3" style={{ scrollbarWidth: "none" }}>
          {children}
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pages }).map((_, i) => (<button key={i} onClick={() => goto(i)} className={`h-1.5 w-6 transition-colors ${page === i ? "bg-[var(--color-copper)]" : "bg-foreground/30 hover:bg-foreground/60"}`} aria-label={`Страница ${i + 1}`}/>))}
        </div>
        {cta && <div className="text-center mt-8">{cta}</div>}
      </div>
    </section>);
}
export function CarouselSlide({ children }) {
    return <div className="snap-start shrink-0 w-full px-3">{children}</div>;
}
