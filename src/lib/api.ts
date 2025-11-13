export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
  priority: "alta" | "media" | "baixa";
  status: "em-andamento" | "concluido" | "pendente";
  type: "funcional" | "nao-funcional";
  project_id: string;
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch("/api/projects", {
    credentials: "same-origin",
  });
  if (!res.ok) throw new Error("Erro ao buscar projetos");
  const data = await res.json();
  return data.projects || [];
}

export async function createProject(project: {
  name: string;
  description: string;
  color?: string;
}): Promise<Project> {
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
    credentials: "same-origin",
  });
  if (!res.ok) throw new Error("Erro ao criar projeto");
  const data = await res.json();
  return data.project;
}

export async function updateProject(
  id: string,
  project: Partial<Project>
): Promise<Project> {
  const res = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
    credentials: "same-origin",
  });
  if (!res.ok) throw new Error("Erro ao atualizar projeto");
  const data = await res.json();
  return data.project;
}

export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
    credentials: "same-origin",
  });
  if (!res.ok) throw new Error("Erro ao deletar projeto");
}

export async function fetchRequirements(
  projectId: string
): Promise<Requirement[]> {
  const res = await fetch(`/api/requirements?project_id=${projectId}`, {
    credentials: "same-origin",
  });
  if (!res.ok) throw new Error("Erro ao buscar requisitos");
  const data = await res.json();
  return data.requirements || [];
}

export async function createRequirement(
  requirement: Omit<Requirement, "created_at">
): Promise<Requirement> {
  const res = await fetch("/api/requirements", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requirement),
    credentials: "same-origin",
  });
  if (!res.ok) throw new Error("Erro ao criar requisito");
  const data = await res.json();
  return data.requirement;
}

export async function updateRequirement(
  id: string,
  requirement: Partial<Requirement>
): Promise<Requirement> {
  const res = await fetch(`/api/requirements/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requirement),
    credentials: "same-origin",
  });
  if (!res.ok) throw new Error("Erro ao atualizar requisito");
  const data = await res.json();
  return data.requirement;
}

export async function deleteRequirement(id: string): Promise<void> {
  const res = await fetch(`/api/requirements/${id}`, {
    method: "DELETE",
    credentials: "same-origin",
  });
  if (!res.ok) throw new Error("Erro ao deletar requisito");
}
