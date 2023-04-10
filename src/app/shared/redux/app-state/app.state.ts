import {Action, Selector, State, StateContext} from "@ngxs/store";
import { UpdateGradientScreen, UpdateListening } from "./app.actions";

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
export class AppState {
  constructor() {
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

}
