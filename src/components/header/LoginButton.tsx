"use client";
import { useRouter } from "next/navigation";
export const LoginButton = () => {
  const router = useRouter();
  return (
    <button className="nav-link" onClick={() => router.push("/acessar")}>
      <i className="bi bi-box-arrow-in-right me-1"></i>
      Acessar
    </button>
  );
};
