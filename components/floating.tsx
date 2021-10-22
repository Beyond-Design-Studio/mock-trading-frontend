import Link from "next/link";
import styles from "@styles/floating.module.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useGetStocks from "hooks/useGetStocks";
import useGetPortfolio from "hooks/useGetPortfolio";
import useGetHoldings from "hooks/useGetHoldings";
import useGetNews from "hooks/useGetNews";
import { useRound } from "./contexts/roundContext";
import { useSocket } from "@components/contexts/socketContext";
import { useAuth } from "./contexts/authContext";
// import { useRouter } from "next/router";


const Floating = (): JSX.Element => {

  const { user } = useAuth();
  const socket = useSocket().socket;
  const { round, setRound } = useRound();
  const [initialTime, setInitialTime] = useState(0);
  // const router = useRouter();

  const { refetch: stocksRefetch } = useGetStocks(user.jwt);
  const { refetch: portfolioRefetch } = useGetPortfolio(user.jwt, user.portfolio);
  const { refetch: filteredRefetch } = useGetHoldings(user.jwt, user.portfolio);
  const { refetch: newsRefetch } = useGetNews(user.jwt);

  useEffect(() => {
    if (user)
      axios({
        method: "GET",
        url: "/even-start-triggers",
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      })
        .then(res => {
        // console.log(res.data);
        setInitialTime(res.data[0].round_duration_in_seconds)
        setRound({ ...round, max_rounds: res.data[0].number_rounds, eventStarted: res.data[0].event_started });
      })
        .catch((err) => console.error(err));
  }, [user]);

  useEffect(() => {
    socket.on("event-start", (eventStart: any) => {
      // console.log("event-start", eventStart);
      setRound({
        ...round,
        roundNumber: eventStart.roundNumber,
        timer: eventStart.timer,
        eventStarted: eventStart.eventStarted,
      });
    })

    socket.on("round-update", (eventTimer: any) => {
      // console.log("hello", eventTimer)
      setRound({
        ...round,
        roundNumber: eventTimer.roundNumber,
        timer: initialTime,
        eventStarted: eventTimer.eventStarted,
      });
      // router.reload();
      stocksRefetch({
        cancelRefetch: true
      });
      portfolioRefetch();
      filteredRefetch();
      newsRefetch({
        cancelRefetch: true
      });
    });
    return () => {
      socket.off("round-update");
    };
  }, []);


  useEffect(() => {
    // console.log("ROUND UPDATE :floating.jsx", round.eventStarted);
    if (round.roundNumber >= 1) {
      const interval = setInterval(() => {
        setRound({
          ...round,
          timer: round.timer > 0 ? round.timer - 1 : initialTime
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      }
    }
  }, [round.roundNumber, round.timer, round]);

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
            <p>{round.roundNumber < round.max_rounds ? round.roundNumber : round.max_rounds}</p>
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
