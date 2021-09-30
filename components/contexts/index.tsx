import React, { ReactNode } from "react";
import { AuthProvider } from "./authContext";
import { RoundProvider } from "./roundContext";
import { SocketProvider } from "./socketContext";


export const ContextProvider = ({ children }: { children: ReactNode }): any => {
  return (
    <RoundProvider>
      <AuthProvider>
        <SocketProvider>
          {children}
        </SocketProvider>
      </AuthProvider>
    </RoundProvider>
  );
}
