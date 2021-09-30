import React, { useEffect } from "react";
import Link from "next/link";
import styles from "@styles/floating.module.scss";
import { useRound } from "./contexts/roundContext";
import { useSocket } from "@components/contexts/socketContext";
import useGetPortfolio from "hooks/useGetPortfolio";
import { useAuth } from "./contexts/authContext";
import useGetStocks from "hooks/useGetStocks";
import useGetHoldings from "hooks/useGetHoldings";


const Floating = (): JSX.Element => {
  const initialTime = 15;

  const socket = useSocket().socket;
  const { user } = useAuth();
  const { round, setRound } = useRound();

  const { refetch: portfolioRefetch } = useGetPortfolio(user.jwt, user.portfolio);
  const { refetch: stocksRefetch } = useGetStocks(user.jwt);
  const {refetch: filteredRefetch} = useGetHoldings(user.jwt, user.portfolio);

  useEffect(() => {
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
