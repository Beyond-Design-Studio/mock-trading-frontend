import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "@styles/portfolio.module.scss";
import Sidenav from "@components/sidenav";
import Profile from "@components/Portfolio/Profile";
import Funds from "@components/Portfolio/Funds";
import Holdings from "@components/Portfolio/Holdings";
import Modal from "@components/modal";
import useModal from "@components/functions/useModal";
import Leaderboard from "@components/Portfolio/LeaderBoard";
import { useAuth } from "@components/contexts/authContext";
import { useGetUrl } from "@components/functions/useGetUrl";
import router from "next/router";
import Loading from "@components/loading";

const Portfolio = (): JSX.Element => {

	const { user } = useAuth();
  const { data, error } = useGetUrl(user.jwt, `/portfolios/${user.portfolio}`)

	const [portfolioState, setPortfolioState] = useState<any>(null);
	const { isVisible, toggleModal } = useModal();

  useEffect(() => {
    if (!user.jwt) router.push("/auth");

		setPortfolioState(data);
  }, [user, data]);

	console.log(portfolioState, error);

  return (
    <div>
      <Head>
        <title>Your Portfolio</title>
      </Head>

      <Sidenav />

      <div className={styles.portfolioPage}>
        {portfolioState ? (
          <>
            <Modal
              showClose={true}
              isVisible={isVisible}
              toggleModal={toggleModal}
            >
              <Leaderboard />
            </Modal>

            <Profile toggleModal={toggleModal} />

            <div className={styles.statsContainer}>
              <Funds />
              <Holdings />
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Portfolio;
