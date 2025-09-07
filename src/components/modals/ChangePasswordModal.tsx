import React, { useState } from "react";
import { useUserActions } from "../../hooks/useUserActions";
import InputPassword from "../inputs/InputPassword";
import Button from "../buttons/Button";
import Modal from "../Modal";
import styles from "../../styles/pages/Profile.module.css";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { updatePassword, loading, error } = useUserActions();
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setFormError("As novas senhas não coincidem.");
      return;
    }
    await updatePassword(passwordData);
    if (!error) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Alterar Senha">
      <form onSubmit={handlePasswordSubmit} className={styles.editForm}>
        <InputPassword
          label="Senha Antiga"
          id="oldPassword"
          value={passwordData.oldPassword}
          onChange={handlePasswordChange}
          autoComplete="current-password"
          required
        />
        <InputPassword
          label="Nova Senha"
          id="newPassword"
          value={passwordData.newPassword}
          onChange={handlePasswordChange}
          autoComplete="new-password"
          required
        />
        <InputPassword
          label="Confirmar Nova Senha"
          id="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={handlePasswordChange}
          autoComplete="new-password"
          required
        />
        {(formError || error) && (
          <p className="error-message">{formError || error}</p>
        )}
        <div className={styles.formActions}>
          <Button type="button" onClick={onClose} variant="secondary">
            Cancelar
          </Button>
          <Button type="submit" loading={loading}>
            Atualizar Senha
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;