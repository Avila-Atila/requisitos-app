import marquee from "./marquee.module.css";

const items = [
  {
    icon: "bi bi-shield-check text-success me-2",
    text: "Segurança de dados garantida com criptografia de ponta a ponta",
  },
  {
    icon: "bi bi-people-fill text-primary me-2",
    text: "Colaboração em tempo real com sua equipe",
  },
  {
    icon: "bi bi-cloud-arrow-up-fill text-info me-2",
    text: "Armazenamento em nuvem com backup automático",
  },
  {
    icon: "bi bi-graph-up-arrow text-warning me-2",
    text: "Relatórios e métricas para acompanhamento",
  },
];

export const MarqueeBody = () => {
  const group = (
    <>
      {items.map((it, i) => (
        <span key={i} className="me-5">
          <i className={`bi ${it.icon} me-2`} />
          {it.text}
        </span>
      ))}
    </>
  );

  return (
    <div
      className={`${marquee.marquee__container} bg-warning bg-opacity-10 py-2`}
    >
      <div
        className={marquee.marquee__inner}
        role="marquee"
        aria-label="Important notices"
      >
        <div className={marquee.marquee__group}>{group}</div>
        <div className={marquee.marquee__group} aria-hidden="true">
          {group}
        </div>
      </div>
    </div>
  );
};
