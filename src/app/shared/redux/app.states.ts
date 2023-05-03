import { AppState } from "./app-state/app.state";
import { UserState } from "./user-state/user.state";
import { DeviceAuthenticationState } from "@shared/redux/device-authentication-state/device-authentication.state";
import { MusicState } from "@shared/redux/music-state/music.state";

export const appStates = [AppState, UserState, DeviceAuthenticationState, MusicState];
