import React, { FC } from "react";

import { ChartIcon } from "@components/icons";
import LeaderboardData, { LeaderInterface } from "@data/leaders";
import styles from "@styles/market.module.scss";

const Leader: FC<LeaderInterface> = ({ name, networth }): JSX.Element => {
  return (
    <tr>
      <td>{name}</td>
      <td>{networth}</td>
    </tr>
  );
};

const LeaderComponent = (): JSX.Element => {
  return (
    <div className={`${styles.leaderComponent}`}>
      <h2> <ChartIcon /> { " " } Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Networth</th>
          </tr>
        </thead>

        <tbody>
          {LeaderboardData.slice(0, 3).map((leader, index) => (
            <Leader key={index} name={leader.name} networth={leader.networth} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderComponent;
