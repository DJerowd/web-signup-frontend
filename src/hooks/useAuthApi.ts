// src/hooks/useAuthApi.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/axios";
import { ApiErrorResponse } from "../types";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const useAuthApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, logout: logoutContext } = useAuth(); // Renomeia para evitar conflito de nome
  const navigate = useNavigate();

  const registerUser = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/register", data);
      alert(
        "Registro realizado com sucesso! Você será redirecionado para o login.",
      );
      navigate("/login");
    } catch (err) {
      if (isAxiosError<ApiErrorResponse>(err) && err.response) {
        setError(err.response.data.message || "Erro ao registrar.");
      } else {
        setError("Ocorreu um erro inesperado.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (data: LoginData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/login", data);
      await login(response.data.data.accessToken);
      navigate("/app/profile");
    } catch (err) {
      if (isAxiosError<ApiErrorResponse>(err) && err.response) {
        setError(err.response.data.message);
      } else {
        setError("Ocorreu um erro inesperado.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    await logoutContext();
    navigate("/login");
  };

  return { registerUser, loginUser, logoutUser, loading, error };
};
