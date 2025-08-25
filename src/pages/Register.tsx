import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthApi } from "../hooks/useAuthApi";

import Input from "../components/inputs/Input";
import InputPassword from "../components/inputs/InputPassword";
import Button from "../components/buttons/Button";

import styles from "../styles/pages/Sign.module.css";

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
    <div className={styles.layout}>
      <div className={styles.content}>
        <main className={styles.sign}>
          <h2 className="title">Criar conta</h2>

          <form className={styles.signForm} onSubmit={handleSubmit}>
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

            <InputPassword
              label="Senha (mínimo 8 caracteres)"
              id="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

            <InputPassword
              label="Confirmar Senha"
              id="confirmPassword"
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

          <p className={styles.link}>
            Já tem uma conta? <Link to="/login">Faça Login</Link>
          </p>
        </main>
      </div>
    </div>
  );
};

export default Register;
