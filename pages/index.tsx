import React from "react";

import styles from "@styles/home.module.scss";

const Home = (): JSX.Element => {
  return (
    <div style={{ overflow: "hidden" }}>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <div>
          <h1>Mock Trading</h1>
          <p>
            {"Welcome to India's premier inter-collegiate mock stock exchange."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
