import "../styles/globals.scss";
import axios from "axios";
import type { AppProps } from "next/app";
import React from "react";

// import { AuthProvider } from "@components/contexts/authContext";
import { QueryClientProvider, QueryClient } from "react-query";
import { ContextProvider } from "@components/contexts";

const queryClient = new QueryClient();
axios.defaults.baseURL = process.env.TEST_DATABASE_URL;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {

  return (
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ContextProvider>
  );
}
export default MyApp;
