import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
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

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("project_id");

  if (!projectId) {
    return NextResponse.json(
      { message: "ID do projeto é obrigatório" },
      { status: 400 }
    );
  }

  const { data: requirements, error } = await supabase
    .from("requirements")
    .select("*")
    .eq("project_id", projectId);

  if (error) {
    console.error("Erro ao buscar requisitos:", error);
    return NextResponse.json(
      { message: "Erro ao buscar requisitos" },
      { status: 500 }
    );
  }

  return NextResponse.json({ requirements });
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

  const { id, title, description, priority, status, type, project_id } =
    await req.json();

  if (!id || !title || !project_id) {
    return NextResponse.json(
      { message: "ID, título e projeto são obrigatórios" },
      { status: 400 }
    );
  }

  const { data: requirement, error } = await supabase
    .from("requirements")
    .insert({
      id,
      title,
      description: description || "",
      priority: priority || "media",
      status: status || "pendente",
      type: type || "funcional",
      project_id,
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar requisito:", error);
    return NextResponse.json(
      { message: "Erro ao criar requisito" },
      { status: 500 }
    );
  }

  return NextResponse.json({ requirement });
}
