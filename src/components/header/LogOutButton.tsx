"use client";

import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const router = useRouter();
  return (
    <>
      {" "}
      <button
        onClick={async () => {
          const response = await fetch("/api/auth/signOut", {
            method: "POST",
          });
          if (response.ok) {
            router.push("/");
          }
        }}
      >
        Sair
      </button>
    </>
  );
}
