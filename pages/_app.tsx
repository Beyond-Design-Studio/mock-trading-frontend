import "../styles/globals.scss";
import axios from "axios";
import { useSocket } from "@components/contexts/socketContext";
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
  const socket = useSocket().socket;
  // console.log("socket: ", socket);
  const { setRound } = useRound();
  const doSomethingBeforeUnload = () => {
    // Do something
    socket.off("event-start");
    socket.off("round-update");
    socket.off("round-update");
  }

  // Setup the `beforeunload` event listener
  const setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return doSomethingBeforeUnload();
    });
  };

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
    setupBeforeUnloadListener();
    return () => {
      socket.off("event-start");
      socket.off("round-update");
    }
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
