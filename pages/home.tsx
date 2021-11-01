import React from "react";
import Head from "next/head";

import Sidenav from "@components/sidenav";
import styles from "@styles/home.module.scss";
import Rules from "@components/Home/Rules";
import AboutUs from "@components/Home/AboutUs";
import Sponsors from "@components/Home/Sponsors";
import DesignPartners from "@components/Home/DesignPartners";

import useUser from "hooks/useUser";
import Floating from "@components/floating";

const Home = (): JSX.Element => {
  const { user } = useUser();

  return (
    <div>
      <Head>
        <title>Mock Stock Market | Home</title>
      </Head>

      <Sidenav />
      <Floating />

      {user && (
        <div className={styles.pageContainer}>
          <Rules />
          <AboutUs />
          <Sponsors />
          <DesignPartners />
        </div>
      )}
    </div>
  );
};

export default Home;
