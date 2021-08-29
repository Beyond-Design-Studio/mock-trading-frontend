import React from 'react';
import styles from "@styles/portfolio.module.scss"
import indianNumberConverter from "@components/functions/numberConvertor";
import useGetPortfolio from 'hooks/useGetPortfolio';

import { useMediaQuery } from 'react-responsive';
import { useAuth } from '@components/contexts/authContext';


const Funds = ():JSX.Element => {

  const {user} = useAuth();
  const {data, error} = useGetPortfolio(user.jwt, user.portfolio);

  const isMobile = useMediaQuery({maxWidth: 1024})
  console.log("funds", data, error);

  return (
    <div className={styles.fundsContainer}>
      <h1>Your Funds</h1>
      <div className={styles.fundDetails}>
        {
          (data && isMobile) && 
          <>
            <div>
              <h3>Available Funds</h3>
              <p>{`₹ ${indianNumberConverter(data.AvailableFunds)}`}</p>
            </div>
            <div>
              <h3>Allocated Funds</h3>
              <p>{`₹ ${indianNumberConverter(data.AllocatedFunds)}`}</p>
            </div>
            <div>
              <h3>Profit</h3>
              <p>{`₹ ${indianNumberConverter(10)}`}</p>
            </div>
            <div>
              <h3>Total Value</h3>
              <p>{`₹ ${indianNumberConverter(data.NetWorth)}`}</p>
            </div>
          </>
        }
        {
          (data && !isMobile) && (
            <>
              <div className={styles.fundsRow}>
                <div>
                  <h3>Available Funds</h3>
                  <p>{`₹ ${indianNumberConverter(data.AvailableFunds)}`}</p>
                </div>
                <div>
                  <h3>Allocated Funds</h3>
                  <p>{`₹ ${indianNumberConverter(data.AllocatedFunds)}`}</p>
                </div>
              </div>
              <div className={styles.fundsRow}>
              <div>
                <h3>Profit</h3>
                <p>{`₹ ${indianNumberConverter(10)}`}</p>
              </div>
              <div>
                <h3>Total Value</h3>
                <p>{`₹ ${indianNumberConverter(data.NetWorth)}`}</p>
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

