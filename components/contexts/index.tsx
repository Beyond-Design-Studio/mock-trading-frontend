import React, { ReactNode } from "react";
import { AuthProvider } from "./authContext";
import { RoundProvider } from "./roundContext";


export const ContextProvider = ({ children }: { children: ReactNode }): any => {
  return (
    <RoundProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </RoundProvider>
  );
}
