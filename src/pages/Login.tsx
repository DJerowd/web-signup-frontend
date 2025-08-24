import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthApi } from "../hooks/useAuthApi";

import Input from "../components/Input";
import Button from "../components/Button";

import "../styles/pages/sign.css";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loginUser, loading, error } = useAuthApi();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginUser(formData).catch(() => {});
  };

  return (
    <div className="layout">
      <div className="content">
        <main className="sign">
          <h2 className="title">Acesse sua conta</h2>

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
