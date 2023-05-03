import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { OpenUrl, UpdateGradientScreen, UpdateListening } from "./app.actions";
import { AuthenticationService } from "@app/core/authentication.service";
import { Injectable } from "@angular/core";
import { ElectronIpcService } from "@app/core/electron-ipc.service";

export interface AppStateModel {
  listening: boolean;
  gradientScreen: boolean;
}

@State<AppStateModel>({
  name: 'appState',
  defaults: {
    listening: true,
    gradientScreen: true,
  },
})
@Injectable()
export class AppState {
  constructor(private es: ElectronIpcService) {
  }

  @Selector()
  static isAppListening(state: AppStateModel) {
    return state.listening;
  }

  @Selector()
  static isGradientScreen(state: AppStateModel) {
    return state.gradientScreen;
  }

  @Action(UpdateListening)
  updateListening({getState, patchState}: StateContext<AppStateModel>, {listening}: UpdateListening) {
    patchState({
      listening: listening
    });
  }

  @Action(UpdateGradientScreen)
  updateGradientScreen({getState, patchState}: StateContext<AppStateModel>, {gradientScreen}: UpdateGradientScreen) {
    patchState({
      gradientScreen: gradientScreen
    });
  }

  @Action(OpenUrl)
  openUrl({getState, patchState}: StateContext<AppStateModel>, {url}: OpenUrl) {
    this.es.getIpcRenderer().send('open-website', url);
  }
}
