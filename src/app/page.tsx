import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <div className={styles.intro}>
          <h1 className="h1 fw-bolder">
            <i className="bi bi-fire"></i>
          </h1>
        </div>
      </main>
    </div>
  );
}
