import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { isAxiosError } from "axios";
import { ApiErrorResponse } from "../types";
import api from "../api/axios";

import Input from "../components/Input";
import Button from "../components/Button";

import "../styles/pages/sign.css";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { email, password } = formData;
      const response = await api.post("/login", { email, password });
      await login(response.data.data.accessToken);
      navigate("/app/profile");
    } catch (err) {
      if (isAxiosError<ApiErrorResponse>(err) && err.response) {
        setError(err.response.data.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <main className="sign">
          <h2 className="title">Login</h2>
          <form className="sign-form" onSubmit={handleSubmit}>
            <Input
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
              required
            />
            <Input
              label="Senha"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
            {error && <p className="error-message">{error}</p>}
            <Button type="submit" loading={loading}>
              Entrar
            </Button>
          </form>
          <p className="link">
            Não tem uma conta? <Link to="/register">Registre-se</Link>
          </p>
        </main>
      </div>
    </div>
  );
};

export default Login;
