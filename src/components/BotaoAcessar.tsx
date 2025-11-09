"use client";
import { useRouter } from "next/navigation";
export const BotaoAcessar = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/acessar")}
      className="btn btn-outline-secondary btn-lg px-4"
    >
      Acessar Plataforma
    </button>
  );
};
