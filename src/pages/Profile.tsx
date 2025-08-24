import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">
          Bem-vindo, {user?.name}!
          <button className="btn" onClick={logout}>
            Sair
          </button>
        </h1>
      </div>
    </div>
  );
};

export default Profile;
