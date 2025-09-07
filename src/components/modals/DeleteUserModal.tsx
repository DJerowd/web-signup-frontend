import React from "react";
import { useUserActions } from "../../hooks/useUserActions";
import { User } from "../../types";
import Button from "../buttons/Button";
import Modal from "../Modal";
import styles from "../../styles/pages/Profile.module.css";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const { deleteUser, loading } = useUserActions();

  const handleDelete = async () => {
    await deleteUser(user.id);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Exclusão">
      <p>
        Tem a certeza de que deseja excluir a sua conta? Esta ação não pode ser
        desfeita.
      </p>
      <div className={styles.modalActions}>
        <Button onClick={onClose} variant="secondary">
          Cancelar
        </Button>
        <Button onClick={handleDelete} loading={loading} variant="danger">
          Confirmar Exclusão
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;