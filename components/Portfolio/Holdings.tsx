import React, { useState, useEffect } from 'react'
import styles from "@styles/portfolio.module.scss"
import { holdingInterface, holdingsData } from '@data/portfolio'
import indianNumberConverter from "@components/functions/numberConvertor";


const Holdings = (): JSX.Element => {
  
  const [holdings, setHoldings] = useState<holdingInterface[] | null>(null)
  
  useEffect(() => {
    setHoldings(holdingsData);
  }, [])
  
  return (
    <div className={styles.holdingsContainer}>
      <h1>Your Holdings</h1>
      <div className={styles.holdingsTable}>
        <h3>Stocks</h3>
        <table>
          <tr>
            <th>Stock</th>
            <th>Price at purchase</th>
            <th>Current Price</th>
            <th>Quantity</th>
            <th>Invested</th>
            <th>Current</th>
            <th>P&L</th>
          </tr>
          {holdings?.map((item, ind)=> {
            let pnlClass = styles.pnlProfit;
            if (item.pnl < 0) {
              pnlClass = styles.pnlLoss;
            }
            return (
              <tr key={ind}>
                <td>{item.stock}</td>
                <td>{`${indianNumberConverter(item.purchasePrice)}`}</td>
                <td>{`${indianNumberConverter(item.currentPrice)}`}</td>
                <td>{`${indianNumberConverter(item.quantity)}`}</td>
                <td>{`${indianNumberConverter(item.invested)}`}</td>
                <td>{`${indianNumberConverter(item.current)}`}</td>
                <td className={pnlClass}>{`${indianNumberConverter(item.pnl)}`}</td>
              </tr>
            )
          })}
        </table>
      </div>
      <div className={styles.holdingsTable}>
        <h3>Cryptocurrency</h3>
         <table>
          <tr>
            <th>Crypto</th>
            <th>Price at purchase</th>
            <th>Current Price</th>
            <th>Quantity</th>
            <th>Invested</th>
            <th>Current</th>
            <th>P&L</th>
          </tr>
          {holdings?.map((item, ind)=> {
            let pnlClass = styles.pnlProfit;
            if (item.pnl < 0) {
              pnlClass = styles.pnlLoss;
            }
            return (
              <tr key={ind}>
                <td>{item.stock}</td>
                <td>{`${indianNumberConverter(item.purchasePrice)}`}</td>
                <td>{`${indianNumberConverter(item.currentPrice)}`}</td>
                <td>{`${indianNumberConverter(item.quantity)}`}</td>
                <td>{`${indianNumberConverter(item.invested)}`}</td>
                <td>{`${indianNumberConverter(item.current)}`}</td>
                <td className={pnlClass}>{`${indianNumberConverter(item.pnl)}`}</td>
              </tr>
            )
          })}
        </table>
      </div>
      <div className={styles.holdingsTable}>
        <h3>Commodities</h3>
         <table>
          <tr>
            <th>Commodity</th>
            <th>Price at purchase</th>
            <th>Current Price</th>
            <th>Quantity</th>
            <th>Invested</th>
            <th>Current</th>
            <th>P&L</th>
          </tr>
          {holdings?.map((item, ind)=> {
            let pnlClass = styles.pnlProfit;
            if (item.pnl < 0) {
              pnlClass = styles.pnlLoss;
            }
            return (
              <tr key={ind}>
                <td>{item.stock}</td>
                <td>{`${indianNumberConverter(item.purchasePrice)}`}</td>
                <td>{`${indianNumberConverter(item.currentPrice)}`}</td>
                <td>{`${indianNumberConverter(item.quantity)}`}</td>
                <td>{`${indianNumberConverter(item.invested)}`}</td>
                <td>{`${indianNumberConverter(item.current)}`}</td>
                <td className={pnlClass}>{`${indianNumberConverter(item.pnl)}`}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default Holdings
