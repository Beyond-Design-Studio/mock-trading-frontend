import React, { useState, useEffect } from "react";
import styles from "@styles/portfolio.module.scss";
// import { holdingInterface, holdingsData } from "@data/portfolio";
import indianNumberConverter from "@components/functions/numberConvertor";
import { useGetUrl } from "@components/functions/useGetUrl";
import TabbedButtons from "@components/tabbedBottons";
import { useAuth } from "@components/contexts/authContext";

const Holdings = (): JSX.Element => {
  const [holdings, setHoldings] = useState<any[] | null>(null);
  const [holdingsView, setHoldingsView] = useState<string>("stock");

  const {user} = useAuth();

  const {data} = useGetUrl(user.jwt, `/holdings?portfolio=${user.portfolio}`);
  console.log(data);

  useEffect(() => {
    setHoldings(data);
  }, [data]);

  const clickHandler = (str: string): void => {
    setHoldingsView(str);
  };

  return (
    <div className={styles.holdingsContainer}>
      <h1>Your Holdings</h1>
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
            {holdings?.filter(item => item.security.type === holdingsView).map((hold, ind) => {
              return (
                <tr key={ind}>
                  <td>{`${hold.StockTicker}`}</td>
                  <td>{`${indianNumberConverter(hold.PurchasePrice)}`}</td>
                  <td>{`${indianNumberConverter(hold.security.currentPrice)}`}</td>
                  <td>{`${indianNumberConverter(hold.OwnedQuantity)}`}</td>
                  <td>{`${indianNumberConverter(hold.PurchasePrice * hold.OwnedQuantity)}`}</td>
                  <td>{`${indianNumberConverter(hold.OwnedQuantity * hold.security.currentPrice)}`}</td>
                  <td className={
                      (hold.security.currentPrice - hold.PurchasePrice) >= 0 ? styles.pnlProfit : styles.pnlLoss
                    }>{`${indianNumberConverter((hold.security.currentPrice - hold.PurchasePrice) * hold.OwnedQuantity)}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holdings;
