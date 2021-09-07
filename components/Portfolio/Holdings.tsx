import React, { useMemo, useState } from "react";
import styles from "@styles/portfolio.module.scss";
import TabbedButtons from "@components/tabbedBottons";
import indianNumberConverter from "@components/functions/numberConvertor";
import useGetFilteredHolding from "hooks/useGetFilteredHoldings";
import getCurrentPriceFromHold from "@components/functions/getCurrentPriceFromHold";
import { useAuth } from "@components/contexts/authContext";

const Holdings = (): JSX.Element => {
  const { user } = useAuth();
  const [holdingsView, setHoldingsView] = useState<string>("stock");
  const [profits, setProfits] = useState<any>({});

  const clickHandler = (str: string): void => {
    setHoldingsView(str);
  };

  const { filteredData } = useGetFilteredHolding();

  useMemo(async () => {
    if (filteredData) {
      const profitsArr = async () => {
        const arr: any = {};
        for (const hold of filteredData) {
          const hold_security_currentPrice = await getCurrentPriceFromHold(
            hold,
            user.jwt
          );
          console.log("kuch message daal", hold_security_currentPrice);

          arr[hold.StockTicker] = hold_security_currentPrice;
        }

        console.log(arr);
        return arr;
      };

      setProfits(await profitsArr());
    }
  }, [filteredData, user.jwt]);

  console.log(profits);

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
            {profits &&
              filteredData &&
              filteredData
                .filter((item: any) => item.security.type === holdingsView)
                .map((hold: any, ind: number) => {
                  return (
                    profits[hold.StockTicker] && (
                      <tr key={ind}>
                        <td>{`${hold.StockTicker}`}</td>
                        <td>{`${indianNumberConverter(
                          hold.PurchasePrice
                        )}`}</td>
                        <td>{`${indianNumberConverter(
                          profits[hold.StockTicker]
                        )}`}</td>
                        <td>{`${hold.OwnedQuantity}`}</td>

                        {/* Invested */}
                        <td>{`${indianNumberConverter(
                          hold.PurchasePrice * hold.OwnedQuantity
                        )}`}</td>

                        {/* Current */}
                        <td>{`${indianNumberConverter(
                          hold.OwnedQuantity * profits[hold.StockTicker]
                        )}`}</td>

                        {/* Profit / Loss */}
                        <td
                          className={
                            profits[hold.StockTicker] - hold.PurchasePrice >= 0
                              ? styles.pnlProfit
                              : styles.pnlLoss
                          }
                        >{`${indianNumberConverter(
                          (profits[hold.StockTicker] - hold.PurchasePrice) *
                            hold.OwnedQuantity
                        )}`}</td>
                      </tr>
                    )
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holdings;
