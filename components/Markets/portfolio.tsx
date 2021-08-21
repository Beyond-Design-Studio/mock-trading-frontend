import React, { useEffect, useState } from "react";

import indianNumberConverter from "@components/functions/numberConvertor";
import { PortfolioIcon } from "@components/icons";
import styles from "@styles/market.module.scss";
import { fundsData, fundsInterface } from "@data/portfolio";

const PortfolioSnapshot = (): JSX.Element => {
  const [funds, setFunds] = useState<fundsInterface | null>(null);

  useEffect(() => {
    setFunds(fundsData);
  }, []);

  return (
    <div className={styles.portfolioComponent}>
      <div className={styles.header}>
        <span>
          <PortfolioIcon />
        </span>
        <h1>My Portfolio</h1>
      </div>

      <div style={{width: "100%", height: "2px", backgroundColor: "var(--accent-color)"}}></div>
      
      {funds && (
        <div className={styles.fundsCont}>
          <div>
            <h3>Available Funds</h3>
            <p>{`₹ ${indianNumberConverter(funds.availFunds)}`}</p>
          </div>
          <div>
            <h3>Allocated Funds</h3>
            <p>{`₹ ${indianNumberConverter(funds.allocFunds)}`}</p>
          </div>
          <div>
            <h3>Profit</h3>
            <p>{`₹ ${indianNumberConverter(funds.profit)}`}</p>
          </div>
          <div>
            <h3>Total Value</h3>
            <p>{`₹ ${indianNumberConverter(funds.equity)}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioSnapshot;
