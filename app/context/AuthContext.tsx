"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = { jid: number; username: string } | null;

interface AuthContextType {
  user: User;
  login: (data: User) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // ⬅ login بعد signup أو login
  const login = async (data: User) => {
    setUser(data);

    // ⬅ بعد الدخلة الأولى روّح اسحب الـ user الحقيقي من token
    try {
      const res = await fetch("/api/me", { credentials: "include" });
      if (res.ok) {
        const info = await res.json();
        setUser({
          jid: info.jid,
          username: info.username,
        });
      }
    } catch {
      /** IGNORE **/
    }
  };

  const logout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  // ⬅ يحصل مرة واحدة عند فتح الموقع
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUser({
            jid: data.jid,
            username: data.username,
          });
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
