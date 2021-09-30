import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@styles/floating.module.scss";
import { useRound } from "./contexts/roundContext";
import { useSocket } from "@components/contexts/socketContext";
import useGetPortfolio from "hooks/useGetPortfolio";
import { useAuth } from "./contexts/authContext";
import useGetStocks from "hooks/useGetStocks";
import useGetHoldings from "hooks/useGetHoldings";
import axios from "axios";


const Floating = (): JSX.Element => {

  const socket = useSocket().socket;
  const { user } = useAuth();
  const { round, setRound } = useRound();
  const [initialTime, setInitialTime] = useState(0);

  const { refetch: portfolioRefetch } = useGetPortfolio(user.jwt, user.portfolio);
  const { refetch: stocksRefetch } = useGetStocks(user.jwt);
  const { refetch: filteredRefetch } = useGetHoldings(user.jwt, user.portfolio);

  useEffect(() => {
    axios({
      method: "GET",
      url: "/evet-start-triggers",
      headers: {
        Authorization: `Bearer ${user.jwt}`,
      },
    }).then(res => setInitialTime(res.data.round_duration_in_seconds))
    .catch(console.error);

    socket.on("event-start", (eventStart: any) => {
      setRound({
        ...round,
        roundNumber: eventStart.roundNumber,
        timer: eventStart.timer,
      })
    })

    socket.on("round-update", (eventTimer: any) => {
      setRound({
        ...round,
        roundNumber: eventTimer.roundNumber,
        timer: 0
      });
      portfolioRefetch();
      stocksRefetch();
      filteredRefetch();
    });
    return () => {
      socket.off("round-update");
    };
  }, []);


  useEffect(() => {
    // console.log("ROUND UPDATE :floating.jsx", round);
    if (round.roundNumber > 1 && round.roundNumber < 41) {
      const interval = setInterval(() => {
        setRound({
          ...round,
          timer: round.timer > 0 ? round.timer - 1 : initialTime
        });
      }, 1000);

      return () => {
        clearInterval(interval)
      }
    }
  }, [round]);

  return (
    <div>
      <style jsx>{`
        .fixedContainer {

        }
      `}</style>

      <Link href="/all-news">
        <a className={`${styles.fixedContainer} counter-container`}>
          <div>
            <p>Round: </p>
            <p>{round.roundNumber}</p>
          </div>
          <div>
            <p>Time: </p>
            <p>{round.timer}</p>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default Floating;
