import React, { useState } from "react";
import styles from "@styles/portfolio.module.scss";
import TabbedButtons from "@components/tabbedBottons";
import indianNumberConverter from "@components/functions/numberConvertor";
import useGetFilteredHolding from "hooks/useGetFilteredHoldings";

const Holdings = (): JSX.Element => {
  const [holdingsView, setHoldingsView] = useState<string>("stock");
  
  const clickHandler = (str: string): void => {
    setHoldingsView(str);
  };

  const {filteredData} = useGetFilteredHolding();

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
            {filteredData
              ?.filter((item: any) => item.security.type === holdingsView)
              .map((hold: any, ind: number) => {
                return (
                  <tr key={ind}>
                    <td>{`${hold.StockTicker}`}</td>
                    <td>{`${indianNumberConverter(hold.PurchasePrice)}`}</td>
                    <td>{`${indianNumberConverter(
                      hold.security.currentPrice
                    )}`}</td>
                    <td>{`${hold.OwnedQuantity}`}</td>
                    
                    {/* Invested */}
                    <td>{`${indianNumberConverter(
                      hold.PurchasePrice * hold.OwnedQuantity
                    )}`}</td>
                    
                    {/* Current */}
                    <td>{`${indianNumberConverter(
                      hold.OwnedQuantity * hold.security.currentPrice
                    )}`}</td>

                    {/* Profit / Loss */}
                    <td
                      className={
                        hold.security.currentPrice - hold.PurchasePrice >= 0
                          ? styles.pnlProfit
                          : styles.pnlLoss
                      }
                    >{`${indianNumberConverter(
                      (hold.security.currentPrice - hold.PurchasePrice) *
                        hold.OwnedQuantity
                    )}`}</td>
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
