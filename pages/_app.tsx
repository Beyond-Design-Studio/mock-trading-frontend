import "../styles/globals.scss";
import type { AppProps } from "next/app";
import React from "react";
import { AuthProvider } from "@components/contexts/authContext";
import { QueryClientProvider, QueryClient } from "react-query";


const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps): JSX.Element {

  return (
    <div>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </AuthProvider>
    </div>
);
}
export default MyApp;
