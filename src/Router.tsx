import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import LoadingSpinner from "./assets/LoadingSpinner";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

const ProtectedRoute = () => {
  const { accessToken, isLoading } = useAuth();
  if (isLoading) {
    return <LoadingSpinner size="48px" />;
  }
  return accessToken ? <Layout /> : <Navigate to="/login" replace />;
};

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/app" element={<ProtectedRoute />}>
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/app/profile" />} />
    </Routes>
  );
}
export default Router;
