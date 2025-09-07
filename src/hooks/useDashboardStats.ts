import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import { User } from "../types";

interface DashboardStats {
  totalUsers: number;
  newUsersLast7Days: number;
  recentUsers: User[];
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<{ data: DashboardStats }>(
        "/stats/dashboard"
      );
      setStats(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar estatísticas do dashboard", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading };
};
