import React, { Fragment, useEffect, useState } from "react";
import styles from "@styles/portfolio.module.scss";
import TabbedButtons from "@components/tabbedBottons";
import useGetFilteredHolding from "hooks/useGetFilteredHoldings";
import { useAuth } from "@components/contexts/authContext";
import useGetStocks from "hooks/useGetStocks";
import RowTable from "@components/Markets/TableRow";
import useGetHoldings from "hooks/useGetHoldings";


const Holdings = (): JSX.Element => {
  const { user } = useAuth();
  const { data: stocks } = useGetStocks(user.jwt);
  const [holdingsView, setHoldingsView] = useState<string>("stock");
  const [profits, setProfits] = useState<any>({});
  const { data: holdingData } = useGetHoldings(user.jwt, user.portfolio);
  const { filteredData } = useGetFilteredHolding(holdingData);

  useEffect(() => {
    if (filteredData && stocks) {
      const profitsArr = () => {
        const arr: any = {};
        for (const hold of filteredData) {

          const holdSecurity = stocks.filter((stock: any) => stock.id === hold.security.id)[0]
          const holdSecurityCurrentPrice = holdSecurity.currentPrice;
          // arr.push((holdSecurityCurrentPrice - hold.PurchasePrice) * hold.OwnedQuantity);

          arr[hold.StockTicker] = holdSecurityCurrentPrice;
        }

        return arr;
      };

      setProfits(profitsArr());
    }
  }, [filteredData, stocks]);

  const clickHandler = (str: string): void => {
    setHoldingsView(str);
  };

  return (
    <>
      <div className={styles.holdingsContainer}>
        <h1>Your Holdings</h1>
        {console.log("[Holdings.tsx] 47", holdingData)}
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
                profits &&
                holdingData
                  .filter((item: any) => item.security.type === holdingsView)
                  .map((hold: any, ind: number) => {
                    return (
                      <Fragment key={ind}>
                        <RowTable
                          index={ind}
                          hold={hold}
                          profits={profits}
                        />
                      </Fragment>
                      // profits[hold.StockTicker] && (
                      // )
                    );
                  })}
              {console.log(profits)}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Holdings;
