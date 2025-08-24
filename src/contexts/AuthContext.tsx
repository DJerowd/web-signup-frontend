import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../api/axios";
import { User } from "../types";

interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken"),
  );
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken) {
        try {
          const { data } = await api.get("/profile");
          setUser(data.data.user);
        } catch {
          console.error("Sessão inválida, limpando token.");
          setAccessToken(null);
          localStorage.removeItem("accessToken");
        }
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [accessToken]);

  const login = async (token: string) => {
    localStorage.setItem("accessToken", token);
    const { data } = await api.get("/profile");
    setUser(data.data.user);
    setAccessToken(token);
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {
      console.error("Erro no logout, mas limpando o estado localmente.");
    } finally {
      localStorage.removeItem("accessToken");
      setAccessToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, user, login, logout, isLoading }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
