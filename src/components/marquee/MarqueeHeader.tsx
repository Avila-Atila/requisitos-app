import marquee from "./marquee.module.css";

const items = [
  {
    icon: "bi-exclamation-triangle-fill text-warning",
    text: "Requisitos bem definidos reduzem em 50% os problemas no desenvolvimento",
  },
  {
    icon: "bi-check-circle-fill text-success",
    text: "Engenharia de Requisitos é a base para software de qualidade",
  },
  {
    icon: "bi-lightbulb-fill text-info",
    text: "Utilize nossa IA para identificar requisitos incompletos",
  },
  {
    icon: "bi-diagram-3 text-primary",
    text: "Modelagem visual ajuda na compreensão dos requisitos",
  },
];

export const MarqueeHeader = () => {
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
