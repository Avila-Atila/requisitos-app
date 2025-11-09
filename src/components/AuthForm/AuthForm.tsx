"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "./actions";
import { signIn, signUp } from "./actions";
export default function AuthForm() {
  const [IsNewUser, setIsNewUser] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  async function handleLogin(data: FormValues) {
    setLoading(true);
    setErrorMsg(null);
    try {
      const json = await signIn(data);
      sessionStorage.setItem("user-requisitos-app", JSON.stringify(json.user));
      router.push("/dashboard");
    } catch (err) {
      setErrorMsg(String(err));
    } finally {
      setLoading(false);
    }
  }
  async function handleSignUp(data: FormValues) {
    setLoading(true);
    setErrorMsg(null);
    try {
      const json = await signUp(data);
      sessionStorage.setItem("user-requisitos-app", JSON.stringify(json.user));
      router.push("/dashboard");
    } catch (err) {
      setErrorMsg(String(err));
    } finally {
      setLoading(false);
    }
  }
  const logInForm = () => {
    return (
      <>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            key="login-email"
            id="email"
            type="text"
            placeholder="seu@email.com"
            className="form-control"
            {...register("email", {
              required: "Insira um email",
              pattern: { value: /^\S+@\S+$/i, message: "Formato inválido" },
            })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            key="login-password"
            placeholder="••••••••"
            {...register("password", {
              required: "Insira uma senha",
              minLength: { value: 6, message: "Mínimo de 6 caracteres" },
              maxLength: { value: 16, message: "Máximo de 16 caracteres" },
            })}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <input
          className="btn btn-warning w-100 py-2 mb-3"
          type="submit"
          value={loading ? "Aguarde" : "Entrar"}
          disabled={loading || !isValid}
        />
      </>
    );
  };

  const signUpForm = () => {
    return (
      <>
        <div className="mb-3">
          <label htmlFor="first-name" className="form-label">
            Primeiro nome
          </label>
          <input
            type="text"
            key="signup-firstname"
            className="form-control"
            id="first-name"
            placeholder="João"
            {...register("firstName", { required: true, minLength: 3 })}
          />
          {errors.firstName && (
            <p style={{ color: "red" }}>{errors.firstName.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="last-name" className="form-label">
            Último nome
          </label>
          <input
            type="text"
            placeholder="Silva"
            id="last-name"
            key="signup-lastname"
            className="form-control"
            {...register("lastName", { required: true, minLength: 3 })}
          />
          {errors.lastName && (
            <p style={{ color: "red" }}>{errors.lastName.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            placeholder="seu@email.com"
            id="email"
            className="form-control"
            key="signup-email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="••••••••"
            key="signup-password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 16,
            })}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <input
          className="btn btn-warning w-100 py-2 mb-3"
          disabled={loading || !isValid}
          type="submit"
          value={loading ? "Aguarde" : "Cadastrar"}
        />
      </>
    );
  };
  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(IsNewUser ? handleSignUp : handleLogin)}>
        {IsNewUser ? signUpForm() : logInForm()}
      </form>
      <button
        className="btn btn-outline-warning w-100 text-dark"
        type="button"
        onClick={() => setIsNewUser((v) => !v)}
      >
        {IsNewUser ? "Já tem conta? Entrar" : "Novo por aqui? Cadastrar"}
      </button>
      {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}{" "}
    </>
  );
}
