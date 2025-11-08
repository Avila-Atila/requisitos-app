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
    formState: { errors },
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
        <input
          key="login-email"
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "Insira um email",
            pattern: { value: /^\S+@\S+$/i, message: "Formato inválido" },
          })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        <input
          type="password"
          key="login-password"
          placeholder="Senha"
          {...register("password", {
            required: "Insira uma senha",
            minLength: { value: 6, message: "Mínimo de 6 caracteres" },
            maxLength: { value: 16, message: "Máximo de 16 caracteres" },
          })}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
        <input
          type="submit"
          value={loading ? "Aguarde" : "Login"}
          disabled={loading}
        />
      </>
    );
  };

  const signUpForm = () => {
    return (
      <>
        <input
          type="text"
          key="signup-firstname"
          placeholder="Primeiro nome"
          {...register("firstName", { required: true, minLength: 3 })}
        />
        {errors.firstName && (
          <p style={{ color: "red" }}>{errors.firstName.message}</p>
        )}
        <input
          type="text"
          placeholder="Último nome"
          key="signup-lastname"
          {...register("lastName", { required: true, minLength: 3 })}
        />
        {errors.lastName && (
          <p style={{ color: "red" }}>{errors.lastName.message}</p>
        )}
        <input
          type="text"
          placeholder="Email"
          key="signup-email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Senha"
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

        <input type="submit" value={loading ? "Please wait…" : "Sign up"} />
      </>
    );
  };
  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(IsNewUser ? handleSignUp : handleLogin)}>
        {IsNewUser ? signUpForm() : logInForm()}
      </form>
      <button type="button" onClick={() => setIsNewUser((v) => !v)}>
        {IsNewUser ? "Já tem conta? Entrar" : "Novo por aqui? Cadastrar"}
      </button>
      {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}{" "}
    </>
  );
}
