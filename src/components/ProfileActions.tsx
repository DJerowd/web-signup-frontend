import React from "react";
import Button from "./buttons/Button";
import { EditIcon } from "./icons/EditIcon";
import { KeyIcon } from "./icons/KeyIcon";
import { TrashIcon } from "./icons/TrashIcon";

import styles from "../styles/components/ProfileActions.module.css";

interface ProfileActionsProps {
  onEdit: () => void;
  onChangePassword: () => void;
  onDelete: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  onEdit,
  onChangePassword,
  onDelete,
}) => {
  return (
    <div className={styles.actionsContainer}>
      <Button onClick={onEdit} aria-label="Editar Perfil">
        <EditIcon />
      </Button>
      <Button
        onClick={onChangePassword}
        variant="secondary"
        aria-label="Alterar Senha"
      >
        <KeyIcon />
      </Button>
      <Button onClick={onDelete} variant="danger" aria-label="Excluir Conta">
        <TrashIcon />
      </Button>
    </div>
  );
};

export default ProfileActions;
