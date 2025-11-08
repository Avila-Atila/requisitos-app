"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  return (
    <>
      <div>dashboard</div>
      <div>
        Logout?{" "}
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
      </div>
    </>
  );
}
