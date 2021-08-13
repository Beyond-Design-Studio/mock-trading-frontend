import React, { useEffect, useState } from "react";
import Link from "next/dist/client/link";

import indianNumberConverter from "@components/functions/numberConvertor";
import { PortfolioIcon } from "@components/icons";
import styles from "@styles/market.module.scss";
import { fundsData, fundsInterface } from "@data/portfolio";


const PortfolioComponent = (): JSX.Element => {
  const [portfolio, setPortfolio] = useState<fundsInterface | null>(null)
  
  useEffect(() => {
    setPortfolio(fundsData);
  }, [])
  

  return (
    <div className={`${styles.portfolioComponent}`}>

      <Link href="/portfolio">
        <a>
          <h2> <PortfolioIcon /> Your Portfolio</h2>
        </a>
      </Link>

      <div>
        {
          portfolio && <>
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
              <h3>Equity</h3>
              <p>{`₹ ${indianNumberConverter(portfolio.equity)}`}</p>
            </div>
          </>
        }
      </div>
      
    </div>
  );
};

export default PortfolioComponent;
