import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
export const Route = createFileRoute("/contact")({
    head: () => ({
        meta: [
            { title: "Контакты — Copper Pro" },
            { name: "description", content: "Свяжитесь с Copper Pro: телефон, email, адрес мастерской." },
        ],
    }),
    component: ContactPage,
});
function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    return (<div className="min-h-screen bg-background">
      <Header />
      <div className="container-x py-16">
        <h1 className="section-title mb-10">контакты</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {[
            { icon: MapPin, label: "Адрес", text: "Божова 5-Б, Киев, 02072 Украина" },
            { icon: Phone, label: "Телефон", text: "+38 (096) 990 47 96", href: "tel:+380969904796" },
            { icon: Mail, label: "Email", text: "a.akimoke@gmail.com", href: "mailto:a.akimoke@gmail.com" },
        ].map((c) => (<div key={c.label} className="flex gap-4">
                <div className="h-12 w-12 shrink-0 grid place-items-center bg-[var(--color-forest)] text-[oklch(0.75_0.12_45)]">
                  <c.icon className="h-5 w-5"/>
                </div>
                <div>
                  <div className="text-sm font-medium">{c.label}</div>
                  {c.href ? (<a href={c.href} className="text-sm text-muted-foreground hover:text-foreground">{c.text}</a>) : (<div className="text-sm text-muted-foreground">{c.text}</div>)}
                </div>
              </div>))}
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!form.name || !form.email || !form.message) {
                toast.error("Заполните все поля");
                return;
            }
            toast.success("Сообщение отправлено");
            setForm({ name: "", email: "", message: "" });
        }} className="space-y-4">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" className="w-full border border-border bg-background px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[var(--color-copper)]"/>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border border-border bg-background px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[var(--color-copper)]"/>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Сообщение" rows={5} className="w-full border border-border bg-background px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[var(--color-copper)]"/>
            <button type="submit" className="btn-copper w-full">Отправить</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>);
}
