import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthApi } from "../hooks/useAuthApi";

import Input from "../components/Input";
import Button from "../components/Button";

import "../styles/pages/sign.css";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { registerUser, loading, error: apiError } = useAuthApi();
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (formData.password !== formData.confirmPassword) {
      setFormError("As senhas não coincidem.");
      return;
    }
    const { name, email, password } = formData;
    await registerUser({ name, email, password }).catch(() => {});
  };

  return (
    <div className="layout">
      <div className="content">
        <main className="sign">
          <h2 className="title">Criar conta</h2>
          <form className="sign-form" onSubmit={handleSubmit}>
            <Input
              label="Nome Completo"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              autoFocus
              required
            />
            <Input
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
            <Input
              label="Senha (mínimo 8 caracteres)"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            <Input
              label="Confirmar Senha"
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            {(formError || apiError) && (
              <p className="error-message">{formError || apiError}</p>
            )}
            <Button type="submit" loading={loading}>
              Registrar
            </Button>
          </form>
          <p className="link">
            Já tem uma conta? <Link to="/login">Faça Login</Link>
          </p>
        </main>
      </div>
    </div>
  );
};

export default Register;
