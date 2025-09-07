import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import ProfileActions from "../components/ProfileActions";
import EditProfileModal from "../components/modals/EditProfileModal";
import ChangePasswordModal from "../components/modals/ChangePasswordModal";
import DeleteUserModal from "../components/modals/DeleteUserModal";

import styles from "../styles/pages/Profile.module.css";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const canPerformActions = user?.role === "admin";

  if (!user) {
    return <p className="error-message">Utilizador não encontrado.</p>;
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileCard}>
        <div className={styles.cardHeader}>
          <div className={styles.avatar}>
            <span>{user.name.charAt(0).toUpperCase()}</span>
          </div>
          <span className={styles.userRole}>{user.role}</span>
          <h1 className={styles.userName}>{user.name}</h1>
        </div>
        <div className={styles.cardBody}>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Membro desde:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Ultima atualização:</strong>{" "}
            {new Date(user.updatedAt).toLocaleDateString()}
          </p>
        </div>
        {canPerformActions && (
          <ProfileActions
            onEdit={() => setIsEditModalOpen(true)}
            onChangePassword={() => setIsChangePasswordModalOpen(true)}
            onDelete={() => setIsDeleteModalOpen(true)}
          />
        )}
      </div>

      {isEditModalOpen && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
        />
      )}

      {isChangePasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isChangePasswordModalOpen}
          onClose={() => setIsChangePasswordModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteUserModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          user={user}
        />
      )}
    </div>
  );
};

export default Profile;
