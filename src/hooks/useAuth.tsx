import React, { createContext, useContext, useMemo, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { AuthInterface } from "../interfaces/auth";
import { authenticateUser } from "../utils/authenticateUser";
interface AuthContextType {
  user: AuthInterface | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [isFirstVisit, setIsFistVisit] = useState(true);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const user = await authenticateUser(email, password);
    setUser(user);
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  useEffect(() => {
    if (isFirstVisit && !user) {
      const demoEmail = "admin@example.com";
      const demoPassword = "securepassword?5A!@";
      setIsFistVisit(false);
      login(demoEmail, demoPassword);
    }
  }, [user, login, isFirstVisit]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
