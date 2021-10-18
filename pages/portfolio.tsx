import React from "react";
import Head from "next/head";
import styles from "@styles/portfolio.module.scss";
import Sidenav from "@components/sidenav";
import Profile from "@components/Portfolio/Profile";
import Funds from "@components/Portfolio/Funds";
import Holdings from "@components/Portfolio/Holdings";
import Modal from "@components/modal";
import useModal from "@components/functions/useModal";
import Leaderboard from "@components/Portfolio/LeaderBoard";
import useGetPortfolio from "hooks/useGetPortfolio";
import useGetLeader from 'hooks/useGetLeader';
import useUser from "hooks/useUser";

const Portfolio = (): JSX.Element => {

  const { user } = useUser();
  const { isVisible, toggleModal } = useModal();
  const { data: rankData } = useGetLeader(user.jwt, user.portfolio);
  const [textRank, setTextRank] = React.useState("");
  const { data } = useGetPortfolio(user.jwt, user.portfolio);

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
            {data && console.log("[portfolio.tsx 38]", data)}
            {data &&
              <Leaderboard PortfolioID={data.id} InvestorName={data.InvestorName} InvestorNetWorth={data.NetWorth} data={rankData} />
            }
          </Modal>

          <Profile toggleModal={toggleModal} textRank={rankData ? rankData.rank.toString() : ""} />

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
