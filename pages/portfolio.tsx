import React, { useEffect } from "react";
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
import router from "next/router";

const Portfolio = (): JSX.Element => {

	const { user } = useAuth();
	const { isVisible, toggleModal } = useModal();

  useEffect(() => {
    if (!user.jwt) router.push("/auth");
  }, [user]);


  return (
    <div>
      <Head>
        <title>Your Portfolio</title>
      </Head>

      <Sidenav />

      <div className={styles.portfolioPage}>
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
      </div>
    </div>
  );
};

export default Portfolio;
