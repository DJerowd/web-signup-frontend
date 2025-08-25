import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User } from "../types";
import api from "../api/axios";

import LoadingSpinner from "../assets/LoadingSpinner";

import styles from "../styles/pages/Profile.module.css";

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/users/${id}`);
        setUser(response.data.data.user);
      } catch (err) {
        setError("Utilizador não encontrado ou ocorreu um erro.");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner size="48px" />;
  }

  if (error || !user) {
    return (
      <p className="error-message">{error || "Utilizador não encontrado."}</p>
    );
  }

  return (
    <div className={styles.profilePage}>
      <h1 className="title">Perfil de {user.name}</h1>
      <div className={styles.profileDetails}>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Nome:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Cargo:</strong> {user.role}
        </p>
        <p>
          <strong>Membro desde:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
      <button className="btn" onClick={() => navigate("/app/users")}>
        Voltar para a listagem
      </button>
    </div>
  );
};

export default UserProfile;
