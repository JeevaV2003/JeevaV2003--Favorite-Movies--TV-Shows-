import { createContext, useContext, useState } from 'react';

type AuthCtx = { token: string | null; user: any | null; setAuth: (token: string | null, user?: any | null) => void };
const AuthContext = createContext<AuthCtx>({ token: null, user: null, setAuth: () => {} });

export function getToken() { return localStorage.getItem('token'); }

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<any | null>(JSON.parse(localStorage.getItem('user') || 'null'));
  const setAuth = (t: string | null, u: any | null = null) => {
    if (t) localStorage.setItem('token', t); else localStorage.removeItem('token');
    if (u) localStorage.setItem('user', JSON.stringify(u)); else localStorage.removeItem('user');
    setToken(t); setUser(u);
  };
  return <AuthContext.Provider value={{ token, user, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
