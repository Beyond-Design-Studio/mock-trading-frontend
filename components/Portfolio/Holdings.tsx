import React, { useState, useEffect } from 'react'
import styles from "@styles/portfolio.module.scss"
import PortfolioData, { PortfolioInterface } from '@data/holdings'
import indianNumberConverter from "@components/functions/numberConvertor";


const Holdings = (): JSX.Element => {
  
  const [portfolio, setPortfolio] = useState<PortfolioInterface | null>(null)
  
  useEffect(() => {
    setPortfolio(PortfolioData);
  }, [])
  
  return (
    <div className={styles.holdingsContainer}>
      <h1>Your Holdings</h1>
      <table className={styles.holdingsTable}>
        <tr>
          <th>Stock</th>
          <th>Price at purchase</th>
          <th>Current Price</th>
          <th>Invested</th>
          <th>Current</th>
          <th>P&L</th>
        </tr>
        {portfolio?.holdings?.map((item, ind)=> {
          let pnlClass = styles.pnlProfit;
          
          if (item.pnl < 0) {
            pnlClass = styles.pnlLoss;
          }
          return (
            <tr key={ind}>
              <td>{item.stock}</td>
              <td>{`${indianNumberConverter(item.purchasePrice)}`}</td>
              <td>{`${indianNumberConverter(item.currentPrice)}`}</td>
              <td>{`${indianNumberConverter(item.invested)}`}</td>
              <td>{`${indianNumberConverter(item.current)}`}</td>
              <td className={pnlClass}>{`${indianNumberConverter(item.pnl)}`}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default Holdings
