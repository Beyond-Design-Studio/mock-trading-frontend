import React, { useEffect, useState } from 'react';
import styles from "@styles/portfolio.module.scss"
import { LeaderboardIcon } from '@components/icons';
import { useAuth } from '@components/contexts/authContext';
import indianNumberConverter from "../functions/numberConvertor"

interface Props {
  InvestorName: string;
  InvestorNetWorth: number;
  PortfolioID: number;
  data: any;
}

const Leaderboard = (props: Props): JSX.Element => {
  const [top3, setTop3] = useState<any[] | null>(null)
  const [userRank, setUserRank] = useState<number | null>(null)
  const { data } = props;

  const { user } = useAuth();

  // console.log(data);
  // console.log(user);

  useEffect(() => {
    data && setTop3(data.top3)
    if (data) {
      setUserRank(data.rank);
    }
  }, [data])
  console.log(props)

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
                <td>{indianNumberConverter(item.unrealized_networth)}</td>
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