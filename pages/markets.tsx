import React from "react";
import Head from "next/head";
import Sidenav from "@components/sidenav";
import styles from "@styles/market.module.scss";
import MarketComponent from "@components/Markets/market";
import News from "@components/Markets/News";
import PortfolioSnapshot from "@components/Markets/portfolio";
import useUser from "hooks/useUser";
import Floating from "@components/floating";

const Markets = (): JSX.Element => {
  const { user } = useUser();

  return (
    <div>
      <Head>
        <title>Mock Stock Market</title>
      </Head>

      <Sidenav />
      <Floating />

      {user.jwt && (
        <div className={styles.marketPage}>
          <div className={styles.newsPort}>
            <News />
            <PortfolioSnapshot />
          </div>
          <MarketComponent />
        </div>
      )}
    </div>
  );
};

export default Markets;
