import styles from "@styles/Roadmap.module.css";

const Roadmap = () => {
  return (
    <div id="roadmap">
      <div className={styles.background}>
        <div className={styles.container}>
          <main className={styles.main}>
            <h1 className={styles.title}>Roadmap</h1>
            <div className={styles.timeline}>
              <div className={styles.containerRight}>
                <div className={styles.content}>
                  <p>test 1</p>
                </div>
              </div>
              <div className={styles.containerLeft}>
                <div className={styles.content}>
                  <p>test2</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
