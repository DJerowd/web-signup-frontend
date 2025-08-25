import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthApi } from "../hooks/useAuthApi";

import Input from "../components/inputs/Input";
import InputPassword from "../components/inputs/InputPassword";
import Button from "../components/buttons/Button";

import styles from "../styles/pages/Sign.module.css";

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
    <div className={styles.layout}>
      <div className={styles.content}>
        <main className={styles.sign}>
          <h2 className="title">Acesse sua conta</h2>

          <form className={styles.signForm} onSubmit={handleSubmit}>
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

            <InputPassword
              label="Senha"
              id="password"
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

          <p className={styles.link}>
            Não tem uma conta? <Link to="/register">Registre-se</Link>
          </p>
        </main>
      </div>
    </div>
  );
};

export default Login;
