import "../styles/globals.scss";
import axios from "axios";
import useSocket from 'hooks/useSocket'

import type { AppProps } from "next/app";
import React, { useEffect } from "react";

// import { AuthProvider } from "@components/contexts/authContext";
import { QueryClientProvider, QueryClient } from "react-query";
import { ContextProvider } from "@components/contexts";
import { useRound } from "@components/contexts/roundContext";

const queryClient = new QueryClient();
axios.defaults.baseURL = "http://localhost:1337";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const socket = useSocket();
  const { setRound } = useRound();

  useEffect(() => {
    socket.on("round-update", (eventTimer: any) => {
      console.log("ROUND UPDATE", eventTimer);
    });
    socket.on("event-start", (eventStart: any) => {
      console.log("EVENT START", eventStart);
      setRound({
        timer: eventStart.timer,
        roundNumber: eventStart.roundNumber
      })
    });
    return () => socket.disconnect();
  }, [])

  return (
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ContextProvider>
  );
}
export default MyApp;
