import React, { useMemo, useState } from "react";

import indianNumberConverter from "@components/functions/numberConvertor";
import styles from "@styles/market.module.scss";
import useGetPortfolio from "hooks/useGetPortfolio";
import { PortfolioIcon } from "@components/icons";
import { useAuth } from "@components/contexts/authContext";
import useGetFilteredHolding from "hooks/useGetFilteredHoldings";
import getCurrentPriceFromHold from "@components/functions/getCurrentPriceFromHold";

const PortfolioSnapshot = (): JSX.Element => {

  const { user } = useAuth();

  const { data } = useGetPortfolio(user.jwt, user.portfolio)
  const { filteredData: holdings } = useGetFilteredHolding();
  const [profits, setProfits] = useState<number[]>([]);

  useMemo(async () => {
    if (holdings) {
      const profitsArr = async () => {
        const arr = [];
        // TODO Preformance optimization - make all await concurrent
        for (const hold of holdings) {
          const hold_security_currentPrice = await getCurrentPriceFromHold(hold, user.jwt);
          arr.push((hold_security_currentPrice - hold.PurchasePrice) * hold.OwnedQuantity);
        }

        return arr;
      };
    
      setProfits(await profitsArr());
    }
  }, [holdings, user.jwt])

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
            <h3>Allocated Funds</h3>
            <p>{` ${indianNumberConverter(data.AllocatedFunds)}`}</p>
          </div>
          <div>
            <h3>Profit</h3>
            <p>{` ${indianNumberConverter((profits.length !== 0) ? profits.reduce((p: number, c: number) => p + c) : 0)}`}</p>
          </div>
          <div>
            <h3>Total Value</h3>
            <p>{` ${indianNumberConverter(data.AvailableFunds + data.AllocatedFunds + (profits.length !== 0 ? profits.reduce((p: number, c: number) => p + c) : 0))}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioSnapshot;
