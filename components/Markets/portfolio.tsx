import React, { useEffect, useState } from "react";
import Link from "next/dist/client/link";

import indianNumberConverter from "@components/functions/numberConvertor";
import { PortfolioIcon } from "@components/icons";
import styles from "@styles/market.module.scss";
import { fundsData, fundsInterface } from "@data/portfolio";


const PortfolioSnapshot = (): JSX.Element => {
  const [portfolio, setPortfolio] = useState<fundsInterface | null>(null)
  
  useEffect(() => {
    setPortfolio(fundsData);
  }, [])
  

  return (
    <div className={styles.portfolioComponent}>

     <div className={styles.header}>
        <span>
          <PortfolioIcon />	
        </span>
        <h1>My Portfolio</h1>
     </div>
     <hr/>
     {portfolio && (
      <div className={styles.fundsCont}>
          <div>
            <h3>Available Funds</h3>
            <p>{`₹ ${indianNumberConverter(portfolio.availFunds)}`}</p>
          </div>
          <div>
            <h3>Allocated Funds</h3>
            <p>{`₹ ${indianNumberConverter(portfolio.allocFunds)}`}</p>
            </div>
          <div>
            <h3>Profit</h3>
            <p>{`₹ ${indianNumberConverter(portfolio.profit)}`}</p>
            </div>
          <div>
            <h3>Total Value</h3>
            <p>{`₹ ${indianNumberConverter(portfolio.equity)}`}</p>
            </div>
      </div>
     )
    }
      
    </div>
  );
};

export default PortfolioSnapshot;
