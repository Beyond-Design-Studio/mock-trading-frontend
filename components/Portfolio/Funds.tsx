import React, { useEffect, useState } from 'react';
import styles from "@styles/portfolio.module.scss"
import  { fundsData, fundsInterface } from '@data/portfolio'
import indianNumberConverter from "@components/functions/numberConvertor";
import { useMediaQuery } from 'react-responsive';


const Funds = ():JSX.Element => {

  const [funds, setFunds] = useState<fundsInterface | null>(null)
  const isMobile = useMediaQuery({maxWidth: 1024})
  useEffect(() => {
    setFunds(fundsData);
  }, [])
  

  return (
    <div className={styles.fundsContainer}>
      <h1>Your Funds</h1>
      <div className={styles.fundDetails}>
        {
          (funds && isMobile) && 
          <>
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
          </>
        }
        {
          (funds && !isMobile) && (
            <>
              <div className={styles.fundsRow}>
                <div>
                  <h3>Available Funds</h3>
                  <p>{`₹ ${indianNumberConverter(funds.availFunds)}`}</p>
                </div>
                <div>
                  <h3>Allocated Funds</h3>
                  <p>{`₹ ${indianNumberConverter(funds.allocFunds)}`}</p>
                </div>
              </div>
              <div className={styles.fundsRow}>
              <div>
                <h3>Profit</h3>
                <p>{`₹ ${indianNumberConverter(funds.profit)}`}</p>
              </div>
              <div>
                <h3>Total Value</h3>
                <p>{`₹ ${indianNumberConverter(funds.equity)}`}</p>
              </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Funds

