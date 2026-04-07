import { createContext, useContext, useState, useCallback } from "react";
import { validateCredentials } from "../data/credentials";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("auth") === "true";
  });

  const login = useCallback((email, password) => {
    const valid = validateCredentials(email, password);
    if (valid) {
      sessionStorage.setItem("auth", "true");
      sessionStorage.setItem("user", email);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("user");
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
