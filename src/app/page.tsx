import { BotaoAcessar } from "@/components/BotaoAcessar";
import { Header } from "@/components/header/Header";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <Header></Header>

      <main className="container my-5">
        <section className="row align-items-center mb-5">
          <div className="col-md-6">
            <h1 className="display-4 fw-bold mb-4">
              Transforme requisitos em software extraordinário
            </h1>
            <p className="lead mb-4">
              Solução completa para engenharia de requisitos com IA avançada e
              modelagem visual.
            </p>
            <div className="d-flex gap-3">
              <a href="#features" className="btn btn-warning btn-lg px-4">
                Ver Recursos
              </a>
              <BotaoAcessar></BotaoAcessar>
            </div>
          </div>
          <div className="col-md-6">
            <Image
              src="http://static.photos/technology/640x360/42"
              alt="Engenharia de Requisitos com IA"
              width={640}
              height={360}
              className="img-fluid rounded shadow-lg"
            />
          </div>
        </section>

        <section id="features" className="py-5">
          <h2 className="text-center mb-5">
            Recursos Avançados para Engenharia de Requisitos
          </h2>

          <div className="row g-1">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-container bg-warning bg-opacity-10 mb-4 mx-auto">
                    <i className="bi bi-diagram-3 text-warning fs-3"></i>
                  </div>
                  <h3 className="h5 mb-3">Modelagem Visual</h3>
                  <p className="text-muted">
                    Crie diagramas UML, casos de uso e fluxos de processo de
                    forma intuitiva.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-container bg-orange bg-opacity-10 mb-4 mx-auto">
                    <i className="bi bi-robot text-muted fs-3"></i>
                  </div>
                  <h3 className="h5 mb-3">Análise com IA</h3>
                  <p className="text-muted">
                    Nossa IA identifica inconsistências, ambiguidades e
                    requisitos incompletos.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-container bg-secondary bg-opacity-10 mb-4 mx-auto">
                    <i className="bi bi-graph-up text-secondary fs-3"></i>
                  </div>
                  <h3 className="h5 mb-3">Rastreabilidade</h3>
                  <p className="text-muted">
                    Mapeie requisitos desde as necessidades do negócio até a
                    implementação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
