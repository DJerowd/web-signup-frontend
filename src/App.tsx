import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

const ProtectedRoute = () => {
  const { accessToken, isLoading } = useAuth();
  if (isLoading) {
    return <div>Carregando...</div>;
  }
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/app" element={<ProtectedRoute />}>
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/app/profile" />} />
    </Routes>
  );
}
export default App;
