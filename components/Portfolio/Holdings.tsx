import React, { useState, useEffect } from 'react'
import styles from "@styles/portfolio.module.scss"
import holdingsData, { holding } from '@data/holdings'

function indianNumberConverter(y:number) {
  
  const x=y.toString();
  
  let lastThree = x.substring(x.length-3);
  const otherNumbers = x.substring(0,x.length-3);
  
  if(otherNumbers != '')
    lastThree = ',' + lastThree;
    const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  
    return(res);
}

const Holdings = ():JSX.Element => {
  const [holdingsVal, setHoldingsVal] = useState<holding[]|null>(null)
  useEffect(() => {
    setHoldingsVal(holdingsData);
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
        {holdingsVal?.map((item, ind)=> {
          let pnlClass = styles.pnlProfit;
          if (item.pnl < 0) {
            pnlClass = styles.pnlLoss;
          }
          return (
            <tr key={ind}>
            <td>{item.stock}</td>
            <td>{indianNumberConverter(item.purchasePrice)}</td>
            <td>{indianNumberConverter(item.currentPrice)}</td>
            <td>{indianNumberConverter(item.invested)}</td>
            <td>{indianNumberConverter(item.current)}</td>
            <td className={pnlClass}>{indianNumberConverter(item.pnl)}</td>
          </tr>
          )
        })}
      </table>
    </div>
  )
}

export default Holdings
