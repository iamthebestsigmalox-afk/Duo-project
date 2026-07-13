import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Header, Footer } from "@/components/site-chrome";
import { useAuth } from "@/lib/auth";
const searchSchema = z.object({
    redirect: z.string().optional(),
});
export const Route = createFileRoute("/account")({
    head: () => ({ meta: [{ title: "Личный кабинет — Copper Pro" }] }),
    validateSearch: (s) => searchSchema.parse(s),
    component: AccountPage,
});
function AccountPage() {
    const { user, loading, signOut } = useAuth();
    const { redirect } = Route.useSearch();
    if (loading) {
        return (<div className="min-h-screen bg-background">
        <Header />
        <div className="container-x py-24 text-center text-sm text-muted-foreground">Загрузка...</div>
        <Footer />
      </div>);
    }
    return (<div className="min-h-screen bg-background">
      <Header />
      <div className="container-x py-16 max-w-md">
        {user ? <Profile email={user.email ?? ""} onSignOut={signOut}/> : <AuthForms redirect={redirect}/>}
      </div>
      <Footer />
    </div>);
}
function Profile({ email, onSignOut }) {
    const navigate = useNavigate();
    return (<div>
      <h1 className="section-title mb-8">личный кабинет</h1>
      <div className="border border-border rounded-sm p-6 space-y-1">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
        <div className="text-sm">{email}</div>
      </div>
      <button className="btn-copper w-full mt-6" onClick={async () => {
            await onSignOut();
            toast.success("Вы вышли из аккаунта");
            navigate({ to: "/" });
        }}>
        Выйти
      </button>
    </div>);
}
function AuthForms({ redirect }) {
    const [mode, setMode] = useState("login");
    return mode === "login" ? (<LoginForm redirect={redirect} onSwitch={() => setMode("register")}/>) : (<RegisterForm onSwitch={() => setMode("login")}/>);
}
function LoginForm({ redirect, onSwitch }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!email || !password) {
            setError("Заполните email и пароль.");
            return;
        }
        setLoading(true);
        await signIn(email, password);
        setLoading(false);
        toast.success("Вы вошли в аккаунт");
        navigate({ to: redirect ?? "/account" });
    };
    return (<div>
      <h1 className="section-title mb-8">вход в аккаунт</h1>
      <form className="space-y-4" onSubmit={submit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-border bg-background px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[var(--color-copper)]"/>
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-border bg-background px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[var(--color-copper)]"/>
        {error && <p className="text-xs text-[var(--color-sale)]">{error}</p>}
        <button type="submit" disabled={loading} className="btn-copper w-full disabled:opacity-60">
          {loading ? "Входим..." : "Войти"}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Нет аккаунта?{" "}
          <button type="button" onClick={onSwitch} className="text-[var(--color-copper-dark)] hover:underline">
            Зарегистрироваться
          </button>
        </p>
      </form>
    </div>);
}
function RegisterForm({ onSwitch }) {
    const { signUp } = useAuth();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!fullName || !email || !password) {
            setError("Заполните все поля.");
            return;
        }
        if (password.length < 6) {
            setError("Пароль должен быть не короче 6 символов.");
            return;
        }
        if (password !== confirm) {
            setError("Пароли не совпадают.");
            return;
        }
        setLoading(true);
        const { error, needsEmailConfirm } = await signUp(email, password, fullName);
        setLoading(false);
        if (error) {
            setError(error);
            return;
        }
        if (needsEmailConfirm) {
            setDone(true);
        }
        else {
            toast.success("Аккаунт создан, вы вошли");
        }
    };
    if (done) {
        return (<div>
        <h1 className="section-title mb-8">регистрация</h1>
        <div className="border border-border rounded-sm p-6 space-y-3 text-sm">
          <p>Мы отправили письмо для подтверждения на {email}.</p>
          <p className="text-muted-foreground">Перейдите по ссылке в письме, затем войдите в аккаунт.</p>
        </div>
        <button onClick={onSwitch} className="btn-copper w-full mt-6">
          К входу
        </button>
      </div>);
    }
    return (<div>
      <h1 className="section-title mb-8">регистрация</h1>
      <form className="space-y-4" onSubmit={submit}>
        <input placeholder="Имя" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border border-border bg-background px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[var(--color-copper)]"/>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-border bg-background px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[var(--color-copper)]"/>
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-border bg-background px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[var(--color-copper)]"/>
        <input type="password" placeholder="Повторите пароль" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full border border-border bg-background px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[var(--color-copper)]"/>
        {error && <p className="text-xs text-[var(--color-sale)]">{error}</p>}
        <button type="submit" disabled={loading} className="btn-copper w-full disabled:opacity-60">
          {loading ? "Создаём..." : "Зарегистрироваться"}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Уже есть аккаунт?{" "}
          <button type="button" onClick={onSwitch} className="text-[var(--color-copper-dark)] hover:underline">
            Войти
          </button>
        </p>
      </form>
    </div>);
}
