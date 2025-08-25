import React, { useCallback, useEffect, useState } from "react";
import { useUsersApi } from "../hooks/useUsersApi";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

import LoadingSpinner from "../assets/LoadingSpinner";
import InputSearch from "../components/inputs/InputSearch";
import Select from "../components/selects/Select";
import Pagination from "../components/Pagination";
import UserCard from "../components/UserCard";

import styles from "../styles/pages/Users.module.css";

const Users: React.FC = () => {
  const { user } = useAuth();
  const { users, pagination, loading, error, fetchUsers } = useUsersApi();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const limitOptions = [
    { value: 4, label: "4 por página" },
    { value: 8, label: "8 por página" },
    { value: 12, label: "12 por página" },
    { value: 16, label: "16 por página" },
    { value: 24, label: "24 por página" },
  ];

  const memoizedFetchUsers = useCallback(() => {
    fetchUsers(currentPage, limit, searchTerm);
  }, [currentPage, limit, searchTerm, fetchUsers]);

  useEffect(() => {
    memoizedFetchUsers();
  }, [memoizedFetchUsers]);

  if (user?.role !== "admin") {
    return <Navigate to="/app/dashboard" replace />;
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={styles.usersPage}>
      <h1 className="title">Gestão de Utilizadores</h1>

      <div className={styles.controls}>
        <InputSearch
          label="Pesquisar por nome:"
          id="search"
          type="text"
          placeholder="Digite um nome..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Select
          label="Itens por página:"
          id="limit"
          options={limitOptions}
          value={limit}
          onChange={handleLimitChange}
        />
      </div>

      {loading && <LoadingSpinner size="48px" />}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          <Pagination
            currentPage={pagination?.currentPage || 1}
            totalPages={pagination?.totalPages || 1}
            onPageChange={setCurrentPage}
          />
          <div className={styles.usersGrid}>
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          {pagination && pagination.totalUsers === 0 && (
            <p>Nenhum utilizador encontrado.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Users;
