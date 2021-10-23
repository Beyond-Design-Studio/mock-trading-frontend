import React from "react";
import styles from "@styles/portfolio.module.scss";
import indianNumberConverter from "@components/functions/numberConvertor";
import useGetPortfolio from "hooks/useGetPortfolio";

import { useMediaQuery } from "react-responsive";
import { useAuth } from "@components/contexts/authContext";

const Funds = (): JSX.Element => {

  const { user } = useAuth();

  const { data } = useGetPortfolio(user.jwt, user.portfolio);

  const isMobile = useMediaQuery({ maxWidth: 1024 });

  return (
    <div className={styles.fundsContainer}>
      <h1>Your Funds</h1>
      <div className={styles.fundDetails}>
        {data && isMobile && (
          <>
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
          </>
        )}
        {data && !isMobile && (
          <>
            <div className={styles.fundsRow}>
              <div>
                <h3>Available Funds</h3>
                <p>{` ${indianNumberConverter(data.AvailableFunds)}`}</p>
              </div>
              <div>
                <h3>Amount Invested</h3>
                <p>{` ${indianNumberConverter(data.AllocatedFunds)}`}</p>
              </div>
            </div>
            <div className={styles.fundsRow}>
              <div>
                <h3>Unrealized Profit/Loss</h3>
                <p>{` ${indianNumberConverter(data.unrealized_networth - data.NetWorth)}`}</p>
              </div>
              <div>
                {/* {console.log(holdings)} */}
                <h3>Net Worth</h3>
                <p>{` ${indianNumberConverter(data.unrealized_networth)}`}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Funds;
