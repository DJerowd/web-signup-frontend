import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <h1 className="title">Bem-vindo, {user?.name}!</h1>
    </>
  );
};

export default Dashboard;
