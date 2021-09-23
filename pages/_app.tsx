import "../styles/globals.scss";
import type { AppProps } from "next/app";
import React from "react";
import axios from "axios";
import useSocket from 'hooks/useSocket'
import { AuthProvider } from "@components/contexts/authContext";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();
axios.defaults.baseURL = "http://localhost:1337";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const socket = useSocket();
  React.useEffect(() => {
    socket.on("round-update", (eventTimer: any) => {
      console.log("ROUND UPDATE", eventTimer)
    });
  }, [])
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <>
          <Component {...pageProps} />
        </>
      </QueryClientProvider>
    </AuthProvider>
  );
}
export default MyApp;
