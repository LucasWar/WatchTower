import { getSocket } from "@/config/socket";

export function useSocket() {
  return getSocket();
}