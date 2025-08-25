import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import api from "../api/axios";
import { ApiErrorResponse } from "../types";

interface UserUpdateData {
  name?: string;
  email?: string;
}

export const useUserActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const updateUser = async (id: number, data: UserUpdateData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/users/${id}`, data);
      alert("Utilizador atualizado com sucesso!");
      return response.data.data.user;
    } catch (err) {
      if (isAxiosError<ApiErrorResponse>(err) && err.response) {
        setError(err.response.data.message || "Erro ao atualizar utilizador.");
      } else {
        setError("Ocorreu um erro inesperado.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/users/${id}`);
      alert("Utilizador excluído com sucesso!");
      navigate("/app/users");
    } catch (err) {
      if (isAxiosError<ApiErrorResponse>(err) && err.response) {
        setError(err.response.data.message || "Erro ao excluir utilizador.");
      } else {
        setError("Ocorreu um erro inesperado.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, deleteUser, loading, error, setError };
};
