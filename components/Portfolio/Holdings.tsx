import React, { useState, useEffect } from 'react'
import styles from "@styles/portfolio.module.scss"
import { holdingInterface, holdingsData } from '@data/portfolio'
import indianNumberConverter from "@components/functions/numberConvertor";


const Holdings = (): JSX.Element => {
  
  const [holdings, setHoldings] = useState<holdingInterface[] | null>(null)
  const [holdingsView, setHoldingsView] = useState<string>("stocks")
  useEffect(() => {
    setHoldings(holdingsData);
  }, [])
  
  return (
    <div className={styles.holdingsContainer}>
      <h1>Your Holdings</h1>
      <div className={styles.holdingsMenu}>
        <a onClick={()=>setHoldingsView('stocks')}><button className={holdingsView === "stocks" ? styles.selButton : styles.unselButton}>
          Stocks
        </button></a>
        <a onClick={()=>setHoldingsView('crypto')}><button className={holdingsView === "crypto" ? styles.selButton : styles.unselButton}>
          Crypto
        </button></a>
        <a onClick={()=>setHoldingsView('commodities')}><button className={holdingsView === "commodities" ? styles.selButton : styles.unselButton}>
          Commodities
        </button></a>
      </div>
      {holdingsView === "stocks" && (
        <div className={styles.holdingsTable}>
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
      )}
      {holdingsView === "crypto" && (

      <div className={styles.holdingsTable}>
        
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
      )}
      {holdingsView === "commodities" && (

      <div className={styles.holdingsTable}>
       
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
      )}
    </div>
  )
}

export default Holdings
