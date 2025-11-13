import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;
  const { title, description, priority, status, type } = await req.json();

  const updateData: {
    title?: string;
    description?: string;
    priority?: string;
    status?: string;
    type?: string;
  } = {};

  if (title) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (priority) updateData.priority = priority;
  if (status) updateData.status = status;
  if (type) updateData.type = type;

  const { data: requirement, error } = await supabase
    .from("requirements")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Erro ao atualizar requisito:", error);
    return NextResponse.json(
      { message: "Erro ao atualizar requisito" },
      { status: 500 }
    );
  }

  return NextResponse.json({ requirement });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;

  const { error } = await supabase.from("requirements").delete().eq("id", id);

  if (error) {
    console.error("Erro ao deletar requisito:", error);
    return NextResponse.json(
      { message: "Erro ao deletar requisito" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
