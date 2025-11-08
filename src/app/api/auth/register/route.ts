import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              cookieStore.set(name, value, options);
            } catch {}
          });
        },
      },
    }
  );

  const { email, password } = await req.json();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || !data?.session) {
    return NextResponse.json(
      { message: error?.message || "Erro de login" },
      { status: 500 }
    );
  }

  const user = data.user ?? null;

  return NextResponse.json({ ok: true, user });
}
