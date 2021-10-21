import React, { Fragment, useState } from "react";
import styles from "@styles/portfolio.module.scss";
import TabbedButtons from "@components/tabbedBottons";
import { useAuth } from "@components/contexts/authContext";
import RowTable from "@components/Markets/TableRow";
import useGetHoldings from "hooks/useGetHoldings";


const Holdings = (): JSX.Element => {
  const { user } = useAuth();
  const [holdingsView, setHoldingsView] = useState<string>("stock");
  const { data: holdingData, error } = useGetHoldings(user.jwt, user.portfolio);

  const clickHandler = (str: string): void => {
    setHoldingsView(str);
  };

  return (
    <>
      <div className={styles.holdingsContainer}>
        <h1>Your Holdings</h1>
        {console.log("[Holdings.tsx] 47", holdingData, error)}
        <div className={styles.holdingsMenu}>
          <TabbedButtons market={holdingsView} setMarket={clickHandler} />
        </div>

        <div className={styles.holdingsTable}>
          <table>
            <thead>
              <tr>
                {holdingsView === "stock" && <th>Stocks</th>}
                {holdingsView === "crypto" && <th>Crypto</th>}
                {holdingsView === "commodity" && <th>Commodity</th>}
                <th>Price at purchase</th>
                <th>Current Price</th>
                <th>Quantity</th>
                <th>Invested</th>
                <th>Current</th>
                <th>P&L</th>
              </tr>
            </thead>

            <tbody>
              {holdingData &&
                holdingData
                  .filter((item: any) => item.stock_type === holdingsView)
                  .map((hold: any, ind: number) => {
                    return (
                      <Fragment key={ind}>
                        <RowTable
                          index={ind}
                          hold={hold}
                        />
                      </Fragment>
                      // profits[hold.StockTicker] && (
                      // )
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Holdings;
