import { useState, useCallback } from "react";
import { isAxiosError } from "axios";
import api from "../api/axios";
import { User, ApiErrorResponse } from "../types";

interface UsersApiResponse {
  users: User[];
  pagination: {
    totalUsers: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export const useUsersApi = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<
    UsersApiResponse["pagination"] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (page = 1, limit = 10, name = "") => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (name) {
        params.append("name", name);
      }

      const response = await api.get<{ data: UsersApiResponse }>(
        `/users?${params.toString()}`,
      );

      setUsers(response.data.data.users);
      setPagination(response.data.data.pagination);
    } catch (err) {
      if (isAxiosError<ApiErrorResponse>(err) && err.response) {
        setError(err.response.data.message || "Erro ao buscar utilizadores.");
      } else {
        setError("Ocorreu um erro inesperado.");
      }
      setUsers([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { users, pagination, loading, error, fetchUsers };
};
