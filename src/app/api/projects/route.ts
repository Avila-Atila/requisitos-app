import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
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

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  const { data: projects, error } = await supabase.from("projects").select("*");

  if (error) {
    return NextResponse.json(
      { message: "Erro ao buscar projetos" },
      { status: 500 }
    );
  }

  return NextResponse.json({ projects });
}

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

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  const { name, description, color } = await req.json();

  if (!name) {
    return NextResponse.json(
      { message: "Nome do projeto é obrigatório" },
      { status: 400 }
    );
  }

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      name,
      description: description || "",
      color: color || "warning",
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar projeto:", error);
    return NextResponse.json(
      { message: "Erro ao criar projeto" },
      { status: 500 }
    );
  }

  return NextResponse.json({ project });
}
