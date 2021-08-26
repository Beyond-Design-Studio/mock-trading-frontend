import "../styles/globals.scss";
import type { AppProps } from "next/app";
import React from "react";
import { SWRConfigProvider } from "@components/functions/swrConfig";
import { AuthProvider } from "@components/contexts/authContext";

// import Nav from '@components/nav';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {

  return (
    <div>
      <SWRConfigProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </SWRConfigProvider>
    </div>
);
}
export default MyApp;
