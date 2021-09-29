import React, { useEffect, useState } from 'react';
import styles from "@styles/portfolio.module.scss"
import { LeaderboardIcon } from '@components/icons';
import { useAuth } from '@components/contexts/authContext';
import indianNumberConverter from "../functions/numberConvertor"
import useGetLeader from 'hooks/useGetLeader';

interface Props {
  InvestorName: string;
  InvestorNetWorth: number;
  PortfolioID: number;
}

const Leaderboard = (props: Props): JSX.Element => {
  const [top3, setTop3] = useState<any[] | null>(null)
  const [userRank, setUserRank] = useState<number | null>(null)

  const { user } = useAuth();
  const { data } = useGetLeader(user.jwt, user.portfolio);

  // console.log(data);
  // console.log(user);

  useEffect(() => {
    data && setTop3(data.top3)
    data && setUserRank(data.rank)
  }, [data])

  return (
    <div className={styles.leaderBoardContainer}>
      <div className={styles.leaderHeader}>
        <LeaderboardIcon />
        <h1>Leaderboard</h1>
      </div>

      <div style={{ width: "100%", height: "2px", backgroundColor: "var(--accent-color)" }}></div>

      <div className={styles.leaderTable}>
        <table>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Net Worth</th>
          </tr>
          {top3 && top3.map((item, ind) => {
            let top3name;
            if (item.InvestorName === props.InvestorName) {
              top3name = styles.yourPosition
            }
            return (
              <tr className={top3name} key={ind}>
                <td>{ind + 1}</td>
                <td><span>{item.InvestorName}</span></td>
                <td>{indianNumberConverter(item.NetWorth)}</td>
              </tr>
            )
          }
          )}
          {(userRank && userRank > 3) && (
            <>
              <tr className={styles.seperator}>
                <hr />
              </tr>
              <tr className={styles.yourPosition}>
                <td>{userRank}</td>
                <td><span>{props.InvestorName}</span></td>
                <td>{indianNumberConverter(props.InvestorNetWorth)}</td>
              </tr>
            </>
          )}
        </table>
      </div>
    </div>
  )
}
export default Leaderboard;