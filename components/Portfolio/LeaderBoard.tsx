import React from 'react';
import styles from "@styles/portfolio.module.scss"
import { LeaderboardIcon } from '@components/icons';

const Leaderboard = ():JSX.Element => {
  return(
    <div className={styles.leaderBoardContainer}>
      <div className={styles.leaderHeader}>
        <LeaderboardIcon />
        <h1>Leaderboard</h1>
      </div>

      <div style={{width: "100%", height: "2px", backgroundColor: "var(--accent-color)"}}></div>

      <div className={styles.leaderTable}>
        <table>
        <tr>
          <th>Position</th>
          <th>Name</th>
          <th>Net Worth</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Niranjan Rajesh</td>
          <td>232323232</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Elon Musk</td>
          <td>52011010</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Warren Buffet</td>
          <td>10110100</td>
        </tr>
        <tr className={styles.yourPosition}>
          <td>205</td>
          <td>You</td>
          <td>69500</td>
        </tr>
        </table>
      </div>
    </div>
  )
}
export default Leaderboard;