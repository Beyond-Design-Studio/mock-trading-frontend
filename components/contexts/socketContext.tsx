import { createContext, useContext, useState, ReactNode } from "react";
import io from "socket.io-client";
const dbURL: string = process.env.TEST_DATABASE_URL ? process.env.TEST_DATABASE_URL : "http://localhost:1337";
export interface socketContextType {
    socket: any;
}

const defaultValue: socketContextType = {
    socket: io(dbURL)
}
const SocketContext = createContext<socketContextType>(defaultValue);
export function useSocket(): socketContextType {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }: { children: ReactNode }): any => {
    return (
        <SocketContext.Provider value={defaultValue} >
            {children}
        </SocketContext.Provider>
    )
}