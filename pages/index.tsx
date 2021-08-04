import React from "react";
import Head from "next/head";

import styles from "@styles/home.module.scss";
import Nav from "@components/nav";

const Home = (): JSX.Element => {
  return (
    <div style={{ overflow: "hidden" }}>

      <Head>
        <title>Mock Trading</title>
      </Head>

      <Nav />

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
