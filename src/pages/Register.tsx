import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { ApiErrorResponse } from "../types";
import api from "../api/axios";

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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }
    try {
      const { name, email, password } = formData;
      await api.post("/register", { name, email, password });
      alert(
        "Registro realizado com sucesso! Você será redirecionado para o login."
      );
      navigate("/login");
    } catch (err) {
      if (isAxiosError<ApiErrorResponse>(err) && err.response) {
        const errorData = err.response.data;
        if (errorData.errors) {
          const firstErrorKey = Object.keys(errorData.errors)[0];
          setError(errorData.errors[firstErrorKey]);
        } else {
          setError(errorData.message || "Erro ao registrar.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <main className="sign">
          <h2 className="title">Criar Conta</h2>
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
            {error && <p className="error-message">{error}</p>}
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
