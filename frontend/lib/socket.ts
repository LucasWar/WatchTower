import { io } from "socket.io-client";
export function ConnectSocket(accesseToken: string) {
  const socket = io("http://localhost:3001/logs",{
    auth: {
      token: accesseToken,
    }
  });

  return socket
}