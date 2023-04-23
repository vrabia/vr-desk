import { AppState } from "./app-state/app.state";
import { UserState } from "./user-state/user.state";
import { DeviceAuthenticationState } from "@shared/redux/device-authentication-state/device-authentication.state";

export const appStates = [AppState, UserState, DeviceAuthenticationState];
