import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { useUserActions } from "../hooks/useUserActions";
import api from "../api/axios";

import LoadingSpinner from "../assets/LoadingSpinner";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import Modal from "../components/Modal";

import styles from "../styles/pages/Profile.module.css";

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user: loggedInUser } = useAuth();
  const {
    updateUser,
    deleteUser,
    loading: actionLoading,
    error: actionError,
  } = useUserActions();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const canPerformActions =
    loggedInUser?.role === "admin" || loggedInUser?.id === Number(id);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/users/${id}`);
      setUser(response.data.data.user);
      setFormData({
        name: response.data.data.user.name,
        email: response.data.data.user.email,
      });
    } catch (err) {
      setError("Utilizador não encontrado ou ocorreu um erro.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id, fetchUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      const updatedUser = await updateUser(Number(id), formData);
      setUser(updatedUser);
      setIsEditing(false);
    } catch {}
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteUser(Number(id));
    } catch {}
  };

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
      <Button onClick={() => navigate("/app/users")}>
        Voltar para a listagem
      </Button>
      <div className={styles.profileCard}>
        <div className={styles.cardHeader}>
          <div className={styles.avatar}>
            <span>{user.name.charAt(0).toUpperCase()}</span>
          </div>
          <h1 className={styles.userName}>{user.name}</h1>
          <span className={styles.userRole}>{user.role}</span>
        </div>

        {!isEditing ? (
          <div className={styles.cardBody}>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Membro desde:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <form onSubmit={handleUpdateSubmit} className={styles.editForm}>
            <Input
              label="Nome"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {actionError && <p className="error-message">{actionError}</p>}
            <div className={styles.formActions}>
              <Button
                type="button"
                onClick={() => setIsEditing(false)}
                variant="secondary"
              >
                Cancelar
              </Button>
              <Button type="submit" loading={actionLoading}>
                Salvar
              </Button>
            </div>
          </form>
        )}

        {canPerformActions && !isEditing && (
          <div className={styles.cardActions}>
            <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>
            <Button onClick={() => setIsDeleteModalOpen(true)} variant="danger">
              Excluir Conta
            </Button>
          </div>
        )}
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Exclusão"
      >
        <p>
          Tem a certeza de que deseja excluir a conta de{" "}
          <strong>{user.name}</strong>? Esta ação não pode ser desfeita.
        </p>
        <div className={styles.modalActions}>
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            variant="secondary"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            loading={actionLoading}
            variant="danger"
          >
            Confirmar Exclusão
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;
