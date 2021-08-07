import React, { useEffect, useState } from 'react';
import styles from "@styles/portfolio.module.scss"
import PortfolioData, { PortfolioInterface } from '@data/holdings'
import indianNumberConverter from "@components/functions/numberConvertor";


const Funds = ():JSX.Element => {

  const [portfolio, setPortfolio] = useState<PortfolioInterface | null>(null)
  
  useEffect(() => {
    setPortfolio(PortfolioData);
  }, [])
  

  return (
    <div className={styles.fundsContainer}>
      <h1>Your Funds</h1>
      <div className={styles.fundDetails}>
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
  )
}

export default Funds

