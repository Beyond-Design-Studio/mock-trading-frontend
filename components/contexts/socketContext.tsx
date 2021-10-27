import { createContext, useContext, useState, ReactNode } from "react";
import io from "socket.io-client";
const dbURL: string = process.env.NEXT_PUBLIC_SOCKET_URL ? process.env.NEXT_PUBLIC_SOCKET_URL : "http://localhost:1338";
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