export type FormValues = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
};

export async function signIn(data: FormValues) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "same-origin",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || "Login falhou");
  return json;
}

export async function signUp(data: FormValues) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || "Cadastro falhou");
  return json;
}
