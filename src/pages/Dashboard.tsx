import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDashboardStats } from "../hooks/useDashboardStats";

import StatCard from "../components/StatCard";
import Button from "../components/buttons/Button";
import LoadingSpinner from "../assets/LoadingSpinner";
import styles from "../styles/pages/Dashboard.module.css";
import { UserIcon, UsersIcon } from "../components/icons/UserIcons";

const AdminDashboard: React.FC = () => {
  const { stats, loading } = useDashboardStats();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingSpinner size="48px" />;
  }

  if (!stats) {
    return (
      <p className="error-message">
        Não foi possível carregar os dados do dashboard.
      </p>
    );
  }

  return (
    <>
      <div className={styles.statsGrid}>
        <StatCard
          title="Total de Utilizadores"
          value={stats.totalUsers}
          icon={<UsersIcon />}
        />
        <StatCard
          title="Novos Utilizadores (7 dias)"
          value={stats.newUsersLast7Days}
          icon={<UserIcon />}
        />
      </div>
      <div className={styles.listSection}>
        <h2 className="subtitle">Utilizadores Recentes</h2>
        <ul className={styles.recentUsersList}>
          {stats.recentUsers.map((user) => (
            <li key={user.id}>
              <span>
                {user.name} ({user.email})
              </span>
              <span>
                Registado em: {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.userActions}>
        <h2 className="subtitle">Ações Rápidas</h2>
        <div className={styles.actionsGrid}>
          <Button onClick={() => navigate("/app/profile")}>
            Editar o Meu Perfil
          </Button>
          <Button onClick={() => navigate("/app/users")}>
            Ver Utilizadores (Admin)
          </Button>
          <Button onClick={() => navigate("/app/settings")}>
            Ir para Configurações
          </Button>
        </div>
      </div>
    </>
  );
};

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.userActions}>
      <h2 className="subtitle">Ações Rápidas</h2>
      <div className={styles.actionsGrid}>
        <Button onClick={() => navigate("/app/profile")}>
          Editar o Meu Perfil
        </Button>
        <Button onClick={() => navigate("/app/settings")}>
          Ir para Configurações
        </Button>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className={styles.dashboardPage}>
      <h1 className="title">Bem-vindo(a), {user?.name}!</h1>
      {user?.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;
