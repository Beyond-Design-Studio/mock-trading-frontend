import "../styles/globals.scss";
import type { AppProps } from "next/app";
import React from "react";
import axios from "axios";
import { AuthProvider } from "@components/contexts/authContext";
import { RouteGuard } from "@components/routeGuard";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();
axios.defaults.baseURL = "https://bodhi-stock-cms.herokuapp.com";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </QueryClientProvider>
    </AuthProvider>
  );
}
export default MyApp;
