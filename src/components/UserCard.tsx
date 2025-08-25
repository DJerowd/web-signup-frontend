import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types";

import styles from "../styles/components/UserCard.module.css";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/app/users/${user.id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.avatar}>
        <span>{user.name.charAt(0).toUpperCase()}</span>
      </div>
      <div className={styles.userInfo}>
        <h3 className={styles.name}>{user.name}</h3>
        <p className={styles.email}>{user.email}</p>
        <span className={styles.role}>{user.role}</span>
      </div>
    </div>
  );
};

export default UserCard;
