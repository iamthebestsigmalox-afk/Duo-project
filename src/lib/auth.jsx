import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const saved = localStorage.getItem("user");
        if (saved) {
            setUser(JSON.parse(saved));
        }
        setLoading(false);
    }, []);
    const signIn = async (email, password) => {
        const fakeUser = { email };
        localStorage.setItem("user", JSON.stringify(fakeUser));
        setUser(fakeUser);
        return { error: null };
    };
    const signUp = async (email, password, fullName) => {
        const fakeUser = { email };
        localStorage.setItem("user", JSON.stringify(fakeUser));
        setUser(fakeUser);
        return {
            error: null,
            needsEmailConfirm: false,
        };
    };
    const signOut = async () => {
        localStorage.removeItem("user");
        setUser(null);
    };
    return (<AuthContext.Provider value={{
            user,
            session: null,
            loading,
            signIn,
            signUp,
            signOut,
        }}>
      {children}
    </AuthContext.Provider>);
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
}
