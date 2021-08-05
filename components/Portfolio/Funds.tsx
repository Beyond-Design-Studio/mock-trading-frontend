import React from 'react';
import styles from "@styles/portfolio.module.scss"

const Funds = ():JSX.Element => {
  return (
    <div className={styles.fundsContainer}>
      <h1>Your Funds</h1>
      <div className={styles.fundDetails}>
        <div>
          <h3>Available Funds</h3>
          <p>₹ 20,10,900</p>
          </div>
        <div>
          <h3>Allocated Funds</h3>
          <p>₹ 10,12,000</p>
          </div>
        <div>
          <h3>Profit</h3>
          <p>+ ₹ 98,000</p>
          </div>
        <div>
          <h3>Equity</h3>
          <p>₹ 12,00,000</p>
        </div>
      </div>
    </div>
  )
}

export default Funds

