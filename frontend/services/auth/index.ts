import { getAccessToken } from "./get-access-token";
import { Login } from "./login";
import { Logout } from "./logout";
import { refreshAccessToken } from "./token-refresh";

export const AuthService = {
  Login,
  Logout,
  getAccessToken,
  refreshAccessToken
}