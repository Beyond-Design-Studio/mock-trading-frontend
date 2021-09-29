import React, { useEffect, useMemo, useState } from "react";
import styles from "@styles/portfolio.module.scss";
import TabbedButtons from "@components/tabbedBottons";
import useGetFilteredHolding from "hooks/useGetFilteredHoldings";
import { useAuth } from "@components/contexts/authContext";
import useGetStocks, { altGetStocks } from "hooks/useGetStocks";
import RowTable from "@components/Markets/TableRow";


const Holdings = (): JSX.Element => {
  const { user } = useAuth();
  const { data } = useGetStocks(user.jwt);
  const [stocks, setStock] = useState<any[]>([]);
  const [holdingsView, setHoldingsView] = useState<string>("stock");
  const [profits, setProfits] = useState<any>({});

  const clickHandler = (str: string): void => {
    setHoldingsView(str);
  };

  // useEffect(() => {
  //   if (user.jwt && user.jwt.length !== 0) {
  //     altGetStocks(user.jwt, setStock);
  //   }
  // }, [])
  useEffect(() => {
    if (data) {
      setStock(data);
      // console.log("STOCKS: ", data);
    }
  }, [user, data]);

  const { filteredData } = useGetFilteredHolding();


  useMemo(async () => {
    if (filteredData && stocks.length !== 0) {
      const profitsArr = () => {
        const arr: any = {};
        for (const hold of filteredData) {

          const holdSecurity = stocks.filter((stock: any) => stock.id === hold.security.id)[0]
          const holdSecurityCurrentPrice = holdSecurity.currentPrice;
          // arr.push((holdSecurityCurrentPrice - hold.PurchasePrice) * hold.OwnedQuantity);

          arr[hold.StockTicker] = holdSecurityCurrentPrice;
        }

        // console.log(arr);
        return arr;
      };

      setProfits(profitsArr());
    }
  }, [filteredData, user.jwt, stocks]);

  // console.log(profits);


  return (
    <>
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
                        <RowTable
                          index={ind}
                          hold={hold}
                          profits={profits}
                        />
                      )
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
