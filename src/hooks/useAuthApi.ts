// src/hooks/useAuthApi.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { ApiErrorResponse, RegisterData, LoginData } from "../types";
import toast from "react-hot-toast";
import api from "../api/axios";

export const useAuthApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, logout: logoutContext } = useAuth();
  const navigate = useNavigate();

  const registerUser = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/register", data);
      toast.success("Registo realizado com sucesso!");
      navigate("/login");
    } catch (err) {
      if (isAxiosError<ApiErrorResponse>(err) && err.response) {
        setError(err.response.data.message || "Erro ao registrar.");
        toast.error("Ocorreu um erro inesperado.");
      } else {
        toast.error("Ocorreu um erro inesperado.");
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
      toast.success("Login bem-sucedido!");
      navigate("/app/dashboard");
    } catch (err) {
      if (isAxiosError<ApiErrorResponse>(err) && err.response) {
        setError(err.response.data.message);
        toast.error("Ocorreu um erro inesperado.");
      } else {
        toast.error("Ocorreu um erro inesperado.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    await logoutContext();
    toast.success("Você se desconectou!");
    navigate("/login");
  };

  return { registerUser, loginUser, logoutUser, loading, error };
};
