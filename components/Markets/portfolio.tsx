import React from "react";

import indianNumberConverter from "@components/functions/numberConvertor";
import styles from "@styles/market.module.scss";
import useGetPortfolio from "hooks/useGetPortfolio";
import { PortfolioIcon } from "@components/icons";
import { useAuth } from "@components/contexts/authContext";

const PortfolioSnapshot = (): JSX.Element => {

  const { user } = useAuth();

  const { data } = useGetPortfolio(user.jwt, user.portfolio)

  return (
    <div className={styles.portfolioComponent}>
      <div className={styles.header}>
        <span>
          <PortfolioIcon />
        </span>
        <h1>My Portfolio</h1>
      </div>

      <div style={{ width: "100%", height: "2px", backgroundColor: "var(--accent-color)" }}></div>

      {data && (
        <div className={styles.fundsCont}>
          <div>
            <h3>Available Funds</h3>
            <p>{` ${indianNumberConverter(data.AvailableFunds)}`}</p>
          </div>
          <div>
            <h3>Amount Invested</h3>
            <p>{` ${indianNumberConverter(data.AllocatedFunds)}`}</p>
          </div>
          <div>
            <h3>Unrealized Profit/Loss</h3>
            <p>{` ${indianNumberConverter(data.unrealized_networth - data.NetWorth)}`}</p>
          </div>
          <div>
            <h3>Net Worth </h3>
            <p>{` ${indianNumberConverter(data.unrealized_networth)}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioSnapshot;
