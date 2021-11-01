import Link from "next/link";
import styles from "@styles/floating.module.scss";
import axios from "axios";
import React, { useEffect } from "react";
import useGetStocks from "hooks/useGetStocks";
import useGetPortfolio from "hooks/useGetPortfolio";
import useGetHoldings from "hooks/useGetHoldings";
import useGetNews from "hooks/useGetNews";
import { useRound } from "./contexts/roundContext";
import { useSocket } from "@components/contexts/socketContext";
import { useAuth } from "./contexts/authContext";


const Floating = (): JSX.Element => {
  const socket = useSocket().socket;

  const { user } = useAuth();
  const { round, setRound } = useRound();

  const { refetch: stocksRefetch } = useGetStocks(user.jwt);
  const { refetch: portfolioRefetch } = useGetPortfolio(user.jwt, user.portfolio);
  const { refetch: filteredRefetch } = useGetHoldings(user.jwt, user.portfolio);
  const { refetch: newsRefetch } = useGetNews(user.jwt);

  function syncRoundWithBackend(): void {
    if (user.jwt) {
      console.log("sync...");
      axios({
        method: "GET",
        url: "/even-start-triggers",
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      })
        .then(res => {
          setRound({
            ...round,
            timer: 0,
            roundNumber: res.data[0].current_round,
            max_rounds: res.data[0].number_rounds,
            eventStarted: res.data[0].event_started,
            roundDuration: res.data[0].round_duration_in_seconds,
          });

          console.log(res.data[0].current_seconds);
          // console.log("ROUND floating", round);
        })
        .catch((err) => console.error(err.response.data));
    }
  }

  useEffect(() => {
    syncRoundWithBackend();
    console.log(user);
  }, [user.jwt]);

  useEffect(() => {
    socket.on("event-start", (eventStart: any) => {
      console.log("event-start", eventStart, round.roundDuration);

      setRound({
        ...round,
        roundNumber: eventStart.roundNumber,
        eventStarted: eventStart.eventStarted,
        timer: round.roundDuration ? round.roundDuration - eventStart.timer : eventStart.timer,
      });
    });

    socket.on("round-update", (eventTimer: any) => {

      if (!round.roundDuration) {
        syncRoundWithBackend();
      }
      console.log(eventTimer)

      if (eventTimer.roundNumber) {
        setRound({
          ...round,
          roundNumber: eventTimer.roundNumber,
          timer: round.roundDuration ? round.roundDuration - eventTimer.timer : eventTimer.timer,
        });
      }

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
      socket.off("event-start");
    };
  }, [round]);


  useEffect(() => {
    if (round.roundNumber >= 1) {
      const interval = setInterval(() => {
        setRound({
          ...round,
          timer: round.timer > 0 ? round.timer - 1 : 0
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      }
    }
  }, [round]);

  return (
    <div>
      <Link href="/all-news">
        <a className={`${styles.fixedContainer} counter-container`}>
          <div>
            <p>Round: </p>
            <p>{round.roundNumber}</p>
          </div>
          <div>
            <p>Time: </p>
            <p>{round.timer === 0 ? "..." : round.timer}</p>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default Floating;
