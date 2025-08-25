import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import LoadingSpinner from "./assets/LoadingSpinner";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";

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
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserProfile />} />
      </Route>
      <Route path="*" element={<Navigate to="/app/dashboard" />} />
    </Routes>
  );
}
export default Router;
