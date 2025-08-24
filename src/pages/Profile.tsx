import { useAuth } from "../contexts/AuthContext";

import styles from "../styles/components/Buttons.module.css";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <h1 className="title">Bem-vindo, {user?.name}!</h1>
      <button className={styles.btn} onClick={logout}>
        Sair
      </button>
    </>
  );
};

export default Profile;
