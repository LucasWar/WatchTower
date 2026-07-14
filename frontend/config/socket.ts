import { AuthService } from "@/services/auth";
import { io, Socket } from "socket.io-client";


let socket: Socket | null = null;

export function getSocket(): Socket {
  if (socket) return socket;

  socket = io(`${process.env.NEXT_PUBLIC_API_URL}/logs`, {
    autoConnect: false,
    auth: (cb) => {
      cb({ token: AuthService.getAccessToken() });
    },
  });

  socket.on("auth_error", async ({ reason }: { reason: string }) => {
    if (reason === "token_expired") {
      try {
        await AuthService.refreshAccessToken();
        socket!.connect();
      } catch {
        window.location.href = "/login";
      }
    }
  });

  socket.io.on("reconnect_attempt", async () => {
    const token = AuthService.getAccessToken();
    if (!token) return;
    socket!.auth = { token };
  });

  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}