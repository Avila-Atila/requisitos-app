import { BotaoAcessar } from "@/components/BotaoAcessar";
import { Header } from "@/components/header/Header";
import { MarqueeBody } from "@/components/marquee/MarqueeBody";
import { MarqueeHeader } from "@/components/marquee/MarqueeHeader";
import Image from "next/image";
import page from "./page.module.css";
import { Footer } from "@/components/footer/Footer";
export default function Home() {
  return (
    <>
      <Header></Header>
      <MarqueeHeader></MarqueeHeader>
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
              <div className={` ${page.card}  card h-100 border-0 shadow-sm`}>
                <div className="card-body text-center p-4">
                  <div
                    className={`${page.icon__container} bg-warning bg-opacity-10 mb-4 mx-auto`}
                  >
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
              <div className={` ${page.card}  card h-100 border-0 shadow-sm`}>
                <div className="card-body text-center p-4">
                  <div
                    className={`${page.icon__container}  bg-orange bg-opacity-10 mb-4 mx-auto`}
                  >
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
              <div className={` ${page.card}  card h-100 border-0 shadow-sm`}>
                <div className="card-body text-center p-4">
                  <div
                    className={`${page.icon__container}   bg-secondary bg-opacity-10 mb-4 mx-auto`}
                  >
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
        <MarqueeBody></MarqueeBody>

        <section className="py-5 bg-light rounded-3 mb-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <Image
                src="http://static.photos/technology/640x360/33"
                alt="IA na Engenharia de Requisitos"
                width={640}
                height={360}
                className="img-fluid rounded shadow-lg"
              />
            </div>
            <div className="col-md-6">
              <h2 className="mb-4">
                {" "}
                <i className="bi bi-stars me-2"></i>Análise de Requisitos com IA
              </h2>
              <p className="lead">
                Nossa plataforma utiliza algoritmos de machine learning para:
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-warning me-2"></i>
                  Identificar requisitos ambíguos ou conflitantes
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-warning me-2"></i>
                  Classificar requisitos automaticamente
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-warning me-2"></i>
                  Sugerir requisitos não-funcionais relevantes
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-warning me-2"></i>
                  Detectar dependências ocultas
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-warning me-2"></i>
                  Priorizar requisitos baseado em impacto
                </li>
              </ul>
              <p className="mt-3">
                Baseado nas melhores práticas da Engenharia de Requisitos
                orientada a negócios.
              </p>
            </div>
          </div>
        </section>

        <section
          id="features-cards"
          className="py-5 bg-light text-dark rounded-3 mt-5"
        >
          <div className="container">
            <h2 className="text-center mb-5">
              {" "}
              <i className="bi bi-gear-wide-connected me-2"></i> Funcionalidades
              Básicas
            </h2>

            <div className="row g-4">
              <div className="col-md-4">
                <div
                  className={`card ${page.card}  h-100 border-0 bg-white shadow-sm`}
                >
                  <div className="card-body text-center p-4">
                    <div
                      className={`${page.icon__container} ${page.orange__text__container} bg-light mb-4 mx-auto`}
                    >
                      <i className="bi bi-diagram-3 fs-3"></i>
                    </div>
                    <h3 className="h5 mb-3">Múltiplos Projetos</h3>
                    <p>
                      Participe e gerencie diversos projetos simultaneamente com
                      controle total de acesso.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className={`card ${page.card}  h-100 border-0 bg-white shadow-sm`}
                >
                  <div className="card-body text-center p-4">
                    <div
                      className={`${page.icon__container} ${page.orange__text__container} bg-light mb-4 mx-auto`}
                    >
                      <i className="bi bi-flag fs-3"></i>
                    </div>
                    <h3 className="h5 mb-3">Priorização</h3>
                    <p>
                      Atribua níveis de prioridade aos requisitos para um
                      planejamento mais eficiente.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className={`card ${page.card}  h-100 border-0 bg-white shadow-sm`}
                >
                  <div className="card-body text-center p-4">
                    <div
                      className={`${page.icon__container} ${page.orange__text__container} bg-light mb-4 mx-auto`}
                    >
                      <i className="bi bi-link-45deg fs-3"></i>
                    </div>
                    <h3 className="h5 mb-3">Dependências</h3>
                    <p>
                      Estabeleça relações entre requisitos para mapear impactos
                      e dependências.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className={`card ${page.card}  h-100 border-0 bg-white shadow-sm`}
                >
                  <div className="card-body text-center p-4">
                    <div
                      className={`${page.icon__container} ${page.orange__text__container} bg-light mb-4 mx-auto`}
                    >
                      <i className="bi bi-file-earmark-text fs-3"></i>
                    </div>
                    <h3 className="h5 mb-3">Documentação Ágil</h3>
                    <p>
                      Gere documentação técnica automaticamente com nossos
                      templates inteligentes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className={`card ${page.card}  h-100 border-0 bg-white shadow-sm`}
                >
                  <div className="card-body text-center p-4">
                    <div
                      className={`${page.icon__container} ${page.orange__text__container} bg-light mb-4 mx-auto`}
                    >
                      <i className="bi bi-translate fs-3"></i>
                    </div>
                    <h3 className="h5 mb-3">Resumos Simples</h3>
                    <p>
                      Transforme requisitos técnicos em linguagem acessível para
                      stakeholders.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className={`card ${page.card}  h-100 border-0 bg-white shadow-sm`}
                >
                  <div className="card-body text-center p-4">
                    <div
                      className={`${page.icon__container} ${page.orange__text__container} bg-light mb-4 mx-auto`}
                    >
                      <i className="bi bi-envelope-paper-heart fs-3"></i>
                    </div>
                    <h3 className="h5 mb-3">Contato</h3>
                    <p>Tem dúvidas sobre nossa plataforma?</p>
                    <a
                      href="mailto:contato@reqgenius.com"
                      className="btn btn-light btn-sm mt-2"
                    >
                      <i className="bi bi-envelope-at-fill me-1"></i> Enviar
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}
