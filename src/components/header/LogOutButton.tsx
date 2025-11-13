"use client";

import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const router = useRouter();
  return (
    <>
      {" "}
      <button
        className="nav-link"
        onClick={async () => {
          const response = await fetch("/api/auth/signOut", {
            method: "POST",
          });
          if (response.ok) {
            router.push("/");
          }
        }}
      >
        <i className="bi bi-box-arrow-in-left me-1"></i>
        Sair
      </button>
    </>
  );
}
