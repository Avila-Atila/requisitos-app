export const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-white py-3 py-md-3  ">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h3 className="h5 mb-2">
                <i className="bi bi-lightbulb-fill text-warning me-2"></i>
                ReqGenius
              </h3>
              <p className="text-orange">
                Solução completa para engenharia de requisitos com IA avançada e
                modelagem visual.
              </p>
              <div className="d-flex gap-3">
                <a
                  href="https://www.linkedin.com/in/atilaavila"
                  target="blank"
                  className="text-orange"
                >
                  <i className="bi bi-linkedin fs-5"></i>
                </a>
                <a
                  href="https://github.com/Avila-Atila"
                  target="blank"
                  className="text-orange"
                >
                  <i className="bi bi-github fs-5"></i>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="text-orange"
                  target="blank"
                >
                  <i className="bi bi-youtube fs-5"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 mb-2 mb-md-0">
              <h4 className="h6 mb-3">Produto</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a
                    href="#features"
                    className="text-orange text-decoration-none"
                  >
                    <i className="bi bi-stack me-1"></i> Recursos
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-4 mb-2 mb-md-0">
              <h4 className="h6 mb-3">Suporte</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-orange text-decoration-none">
                    <i className="bi bi-file-earmark-text me-1"></i>{" "}
                    Documentação
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-4 mb-2 mb-md-0">
              <h4 className="h6 mb-3">Navegação</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-orange text-decoration-none">
                    <i className="bi bi-arrow-bar-up me-1"></i> Voltar ao topo
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-2 border-secondary" />
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              <p className="small text-secondary mb-0">
                &copy; 2025 ReqGenius. Desenvolvido por Átila Ávila.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="small text-secondary mb-0">
                Feito com <i className="bi bi-heart-fill text-danger"></i> para
                engenheiros de software
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
