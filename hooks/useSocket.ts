import { io } from "socket.io-client";
const dbURL: string = process.env.TEST_DATABASE_URL ? process.env.TEST_DATABASE_URL : "http://localhost:1337";
const socket = io(dbURL);

const initializeSocket = () => {
    socket.on("connect", () => {
        console.log(socket.id);
    });
}


export default function useSocket(): any {
    // if socket not connected, connect it
    if (!socket.connected) {
        initializeSocket();
    }
    return socket;
}