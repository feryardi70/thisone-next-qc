"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import getSession from "../action/session";
import { ProtectedRouteLoader } from "./routeLoader";

// --- Context ---
interface AuthContextType {
  currentEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within DepartureRoute");
  }
  return context;
}

export default function AuthLayer({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        setCurrentEmail(session.user.email);
        setIsAuthenticated(true);
      } else {
        router.replace("/login");
      }
      setLoading(false);
    };

    fetchSession();
  }, [router]);

  if (loading) {
    return <div><ProtectedRouteLoader /></div>;
  }

  return isAuthenticated ? (
    <AuthContext.Provider value={{ currentEmail }}>
      {children}
    </AuthContext.Provider>
  ) : null;
}
