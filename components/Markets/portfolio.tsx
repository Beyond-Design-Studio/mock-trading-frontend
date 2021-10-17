import React, { useMemo, useState } from "react";

import indianNumberConverter from "@components/functions/numberConvertor";
import styles from "@styles/market.module.scss";
import useGetPortfolio from "hooks/useGetPortfolio";
import { PortfolioIcon } from "@components/icons";
import { useAuth } from "@components/contexts/authContext";
import useGetFilteredHolding from "hooks/useGetFilteredHoldings";
// import getCurrentPriceFromHold from "@components/functions/getCurrentPriceFromHold";
import useGetStocks from "hooks/useGetStocks";
import useGetHoldings from "hooks/useGetHoldings";

const PortfolioSnapshot = (): JSX.Element => {

  const { user } = useAuth();

  const { data } = useGetPortfolio(user.jwt, user.portfolio)
  const { data: stocks } = useGetStocks(user.jwt);
  const { data: holdingData } = useGetHoldings(user.jwt, user.portfolio);
  const { filteredData: holdings } = useGetFilteredHolding(holdingData);
  const [profits, setProfits] = useState<number[]>([]);

  useMemo(() => {
    if (holdings && stocks) {
      const profitsArr = () => {
        const arr = [];
        for (const hold of holdings) {
          const holdSecurity = stocks.filter((stock: any) => stock.id === hold.security.id)[0]
          const holdSecurityCurrentPrice = holdSecurity.currentPrice;
          arr.push((holdSecurityCurrentPrice - hold.PurchasePrice) * hold.OwnedQuantity);
        }
        return arr;
      };

      setProfits(profitsArr());
    }
  }, [holdings, stocks])

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
            <p>{` ${indianNumberConverter((profits.length !== 0) ? profits.reduce((p: number, c: number) => p + c) : 0)}`}</p>
          </div>
          <div>
            <h3>Net Worth</h3>
            <p>{` ${indianNumberConverter(data.AvailableFunds + data.AllocatedFunds + (profits.length !== 0 ? profits.reduce((p: number, c: number) => p + c) : 0))}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioSnapshot;
