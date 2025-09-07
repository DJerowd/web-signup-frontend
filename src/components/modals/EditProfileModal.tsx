import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useUserActions } from "../../hooks/useUserActions";
import { User } from "../../types";
import Input from "../inputs/Input";
import Button from "../buttons/Button";
import Modal from "../Modal";
import styles from "../../styles/pages/Profile.module.css";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const { updateUser, loading, error } = useUserActions();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = await updateUser(user.id, formData);
    if (updatedUser) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        await login(token);
      }
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Perfil">
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
        {error && <p className="error-message">{error}</p>}
        <div className={styles.formActions}>
          <Button type="button" onClick={onClose} variant="secondary">
            Cancelar
          </Button>
          <Button type="submit" loading={loading}>
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal;