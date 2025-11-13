"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import styles from "./dashboard.module.css";
import {
  fetchProjects,
  createProject,
  deleteProject,
  fetchRequirements,
  createRequirement,
  updateRequirement,
  deleteRequirement,
  Project,
  Requirement,
} from "@/lib/api";

export default function DashboardPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateRequirement, setShowCreateRequirement] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    color: "warning",
  });
  const [newRequirement, setNewRequirement] = useState({
    id: "",
    title: "",
    description: "",
    priority: "media" as "alta" | "media" | "baixa",
    status: "pendente" as "em-andamento" | "concluido" | "pendente",
    type: "funcional" as "funcional" | "nao-funcional",
  });

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadRequirements(selectedProject.id);
    }
  }, [selectedProject]);

  async function loadProjects() {
    try {
      setLoading(true);
      const data = await fetchProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar projetos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadRequirements(projectId: string) {
    try {
      const data = await fetchRequirements(projectId);
      setRequirements(data);
    } catch (err) {
      console.error("Erro ao carregar requisitos:", err);
    }
  }

  async function handleCreateProject(e: React.FormEvent) {
    e.preventDefault();
    try {
      const project = await createProject(newProject);
      setProjects([project, ...projects]);
      setShowCreateProject(false);
      setNewProject({ name: "", description: "", color: "warning" });
    } catch (err) {
      alert("Erro ao criar projeto");
      console.error(err);
    }
  }

  async function handleDeleteProject(id: string) {
    if (!confirm("Tem certeza que deseja deletar este projeto?")) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
      if (selectedProject?.id === id) {
        setSelectedProject(null);
      }
    } catch (err) {
      alert("Erro ao deletar projeto");
      console.error(err);
    }
  }

  async function handleCreateRequirement(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProject) return;

    try {
      const requirement = await createRequirement({
        ...newRequirement,
        project_id: selectedProject.id,
      });
      setRequirements([requirement, ...requirements]);
      setShowCreateRequirement(false);
      setNewRequirement({
        id: "",
        title: "",
        description: "",
        priority: "media",
        status: "pendente",
        type: "funcional",
      });
    } catch (err) {
      alert("Erro ao criar requisito");
      console.error(err);
    }
  }

  async function handleUpdateRequirementStatus(
    id: string,
    status: Requirement["status"]
  ) {
    try {
      await updateRequirement(id, { status });
      setRequirements(
        requirements.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (err) {
      alert("Erro ao atualizar requisito");
      console.error(err);
    }
  }

  async function handleDeleteRequirement(id: string) {
    if (!confirm("Tem certeza que deseja deletar este requisito?")) return;
    try {
      await deleteRequirement(id);
      setRequirements(requirements.filter((r) => r.id !== id));
    } catch (err) {
      alert("Erro ao deletar requisito");
      console.error(err);
    }
  }

  const getPriorityBadge = (priority: string) => {
    const badges = {
      alta: "danger",
      media: "warning",
      baixa: "secondary",
    };
    return badges[priority as keyof typeof badges] || "secondary";
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      "em-andamento": "primary",
      concluido: "success",
      pendente: "secondary",
    };
    return badges[status as keyof typeof badges] || "secondary";
  };

  const getStatusText = (status: string) => {
    const text = {
      "em-andamento": "Em Andamento",
      concluido: "Concluído",
      pendente: "Pendente",
    };
    return text[status as keyof typeof text] || status;
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="container my-5 text-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!selectedProject) {
    return (
      <>
        <Header />
        <main className="container my-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="display-5 fw-bold mb-2">
                <i className="bi bi-folder2-open text-warning me-3"></i>
                Meus Projetos
              </h1>
              <p className="text-muted">
                Selecione um projeto para gerenciar seus requisitos
              </p>
            </div>
            <button
              className="btn btn-warning btn-lg"
              onClick={() => setShowCreateProject(true)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Novo Projeto
            </button>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row g-4">
            {projects.map((project) => (
              <div key={project.id} className="col-md-6 col-lg-4">
                <div
                  className={`card h-100 shadow-sm border-0 ${styles.projectCard}`}
                >
                  <div
                    className="card-body p-4"
                    onClick={() => setSelectedProject(project)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-start mb-3">
                      <div
                        className={`${styles.projectIcon} bg-${project.color} bg-opacity-10 me-3`}
                      >
                        <i
                          className={`bi bi-kanban text-${project.color} fs-4`}
                        ></i>
                      </div>
                      <div className="flex-grow-1">
                        <h3 className="h5 mb-1">{project.name}</h3>
                        <p className="text-muted small mb-0">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                      <div className="text-muted small">
                        <i
                          className={`bi bi-folder me-1 text-${project.color}`}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent border-0 p-3 d-flex gap-2">
                    <button
                      className="btn btn-outline-warning btn-sm flex-grow-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                    >
                      <i className="bi bi-arrow-right-circle me-2"></i>
                      Abrir Projeto
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(project.id);
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-folder-x display-1 text-muted mb-3 d-block"></i>
              <h3 className="text-muted">Nenhum projeto encontrado</h3>
              <p className="text-muted">
                Crie seu primeiro projeto para começar
              </p>
              <button
                className="btn btn-warning mt-3"
                onClick={() => setShowCreateProject(true)}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Criar Projeto
              </button>
            </div>
          )}

          {showCreateProject && (
            <div
              className="modal show d-block"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              onClick={() => setShowCreateProject(false)}
            >
              <div
                className="modal-dialog modal-dialog-centered"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Novo Projeto</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowCreateProject(false)}
                    ></button>
                  </div>
                  <form onSubmit={handleCreateProject}>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Nome do Projeto</label>
                        <input
                          type="text"
                          className="form-control"
                          value={newProject.name}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Descrição</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          value={newProject.description}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              description: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Cor</label>
                        <select
                          className="form-select"
                          value={newProject.color}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              color: e.target.value,
                            })
                          }
                        >
                          <option value="warning">Laranja</option>
                          <option value="primary">Azul</option>
                          <option value="success">Verde</option>
                          <option value="danger">Vermelho</option>
                          <option value="info">Ciano</option>
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowCreateProject(false)}
                      >
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-warning">
                        Criar Projeto
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container-fluid my-4">
        <div className="row mb-4">
          <div className="col">
            <button
              className="btn btn-link text-decoration-none p-0 mb-3"
              onClick={() => setSelectedProject(null)}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Voltar para projetos
            </button>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h1 className="display-6 fw-bold mb-2">
                  {selectedProject.name}
                </h1>
                <p className="text-muted">{selectedProject.description}</p>
              </div>
              <button
                className="btn btn-warning"
                onClick={() => setShowCreateRequirement(true)}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Novo Requisito
              </button>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="bi bi-list-ul text-warning me-2"></i>
                    Requisitos ({requirements.length})
                  </h5>
                </div>
              </div>
              <div className="card-body p-0">
                {requirements.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-inbox display-1 text-muted mb-3 d-block"></i>
                    <h5 className="text-muted">Nenhum requisito ainda</h5>
                    <p className="text-muted">
                      Comece criando seu primeiro requisito
                    </p>
                  </div>
                ) : (
                  <div className="list-group list-group-flush">
                    {requirements.map((req) => (
                      <div
                        key={req.id}
                        className={`list-group-item ${styles.requirementItem}`}
                      >
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center mb-2">
                              <span className="badge bg-light text-dark me-2">
                                {req.id}
                              </span>
                              <h6 className="mb-0">{req.title}</h6>
                            </div>
                            <p className="text-muted small mb-2">
                              {req.description}
                            </p>
                            <div className="d-flex gap-2 flex-wrap">
                              <span
                                className={`badge bg-${getPriorityBadge(
                                  req.priority
                                )}`}
                              >
                                <i className="bi bi-flag-fill me-1"></i>
                                {req.priority.charAt(0).toUpperCase() +
                                  req.priority.slice(1)}
                              </span>
                              <select
                                className={`badge bg-${getStatusBadge(
                                  req.status
                                )} border-0`}
                                value={req.status}
                                onChange={(e) =>
                                  handleUpdateRequirementStatus(
                                    req.id,
                                    e.target.value as Requirement["status"]
                                  )
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <option value="pendente">Pendente</option>
                                <option value="em-andamento">
                                  Em Andamento
                                </option>
                                <option value="concluido">Concluído</option>
                              </select>
                              <span className="badge bg-info text-dark">
                                <i className="bi bi-tag me-1"></i>
                                {req.type === "funcional"
                                  ? "Funcional"
                                  : "Não-Funcional"}
                              </span>
                            </div>
                          </div>
                          <div className="btn-group btn-group-sm ms-3">
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleDeleteRequirement(req.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-warning text-white">
                <h6 className="mb-0">
                  <i className="bi bi-graph-up-arrow me-2"></i>
                  Estatísticas do Projeto
                </h6>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-6">
                    <div className={styles.statCard}>
                      <div className="text-muted small">Total</div>
                      <div className="h3 mb-0 fw-bold text-warning">
                        {requirements.length}
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className={styles.statCard}>
                      <div className="text-muted small">Concluídos</div>
                      <div className="h3 mb-0 fw-bold text-success">
                        {
                          requirements.filter((r) => r.status === "concluido")
                            .length
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className={styles.statCard}>
                      <div className="text-muted small">Em Andamento</div>
                      <div className="h3 mb-0 fw-bold text-primary">
                        {
                          requirements.filter(
                            (r) => r.status === "em-andamento"
                          ).length
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className={styles.statCard}>
                      <div className="text-muted small">Alta Prioridade</div>
                      <div className="h3 mb-0 fw-bold text-danger">
                        {
                          requirements.filter((r) => r.priority === "alta")
                            .length
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showCreateRequirement && (
          <div
            className="modal show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setShowCreateRequirement(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Novo Requisito</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowCreateRequirement(false)}
                  ></button>
                </div>
                <form onSubmit={handleCreateRequirement}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">ID do Requisito</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="REQ-001"
                        value={newRequirement.id}
                        onChange={(e) =>
                          setNewRequirement({
                            ...newRequirement,
                            id: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Título</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newRequirement.title}
                        onChange={(e) =>
                          setNewRequirement({
                            ...newRequirement,
                            title: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Descrição</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={newRequirement.description}
                        onChange={(e) =>
                          setNewRequirement({
                            ...newRequirement,
                            description: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Prioridade</label>
                        <select
                          className="form-select"
                          value={newRequirement.priority}
                          onChange={(e) =>
                            setNewRequirement({
                              ...newRequirement,
                              priority: e.target
                                .value as Requirement["priority"],
                            })
                          }
                        >
                          <option value="baixa">Baixa</option>
                          <option value="media">Média</option>
                          <option value="alta">Alta</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Tipo</label>
                        <select
                          className="form-select"
                          value={newRequirement.type}
                          onChange={(e) =>
                            setNewRequirement({
                              ...newRequirement,
                              type: e.target.value as Requirement["type"],
                            })
                          }
                        >
                          <option value="funcional">Funcional</option>
                          <option value="nao-funcional">Não-Funcional</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowCreateRequirement(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-warning">
                      Criar Requisito
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
