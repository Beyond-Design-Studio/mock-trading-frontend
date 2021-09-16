import React, { useMemo, useState } from "react";
import styles from "@styles/portfolio.module.scss";
import indianNumberConverter from "@components/functions/numberConvertor";
import useGetPortfolio from "hooks/useGetPortfolio";

import { useMediaQuery } from "react-responsive";
import { useAuth } from "@components/contexts/authContext";
import useGetFilteredHolding from "hooks/useGetFilteredHoldings";
import getCurrentPriceFromHold from "@components/functions/getCurrentPriceFromHold";

const Funds = (): JSX.Element => {
  const { user } = useAuth();
  const { data } = useGetPortfolio(user.jwt, user.portfolio);
  const { filteredData: holdings } = useGetFilteredHolding();
  const [profits, setProfits] = useState<number[]>([]);

  useMemo(async () => {
    if (holdings) {
      const profitsArr = async () => {
        const arr = [];
        for (const hold of holdings) {
          const hold_security_currentPrice = await getCurrentPriceFromHold(hold, user.jwt);
          arr.push((hold_security_currentPrice - hold.PurchasePrice) * hold.OwnedQuantity);
        }

        return arr;
      };
    
      setProfits(await profitsArr());
    }
    
  }, [holdings, user.jwt])
  
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
              <h3>Allocated Funds</h3>
              <p>{` ${indianNumberConverter(data.AllocatedFunds)}`}</p>
            </div>
            <div>
              <h3>Profit</h3>
              <p>{` ${indianNumberConverter(profits.length !== 0 ? profits.reduce((p: number, c: number) => p + c) : 0)}`}</p>
            </div>
            <div>
              <h3>Total Value</h3>
              <p>{` ${indianNumberConverter(holdings.length !== 0 ? holdings.map((x: any) => x.PurchasePrice * x.OwnedQuantity).reduce((p: number, c: number) => (p + c)) : 0)}`}</p>
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
                <h3>Allocated Funds</h3>
                <p>{` ${indianNumberConverter(data.AllocatedFunds)}`}</p>
              </div>
            </div>
            <div className={styles.fundsRow}>
              <div>
                <h3>Profit</h3>
                <p>{` ${indianNumberConverter(profits.length !== 0 ? profits.reduce((p: number, c: number) => p + c) : 0)}`}</p>
              </div>
              <div>
                {console.log(holdings)}
                <h3>Total Value</h3>
                <p>{` ${indianNumberConverter(data.AvailableFunds + data.AllocatedFunds + (profits.length !== 0 ? profits.reduce((p: number, c: number) => p + c) : 0))}`}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Funds;
