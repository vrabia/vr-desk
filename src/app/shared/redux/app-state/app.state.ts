import {Action, Selector, State, StateContext} from "@ngxs/store";
import {UpdateListening} from "./app.actions";

export interface AppStateModel {
  listening: boolean;
}

@State<AppStateModel>({
  name: 'appState',
  defaults: {
    listening: true,
  },
})
export class AppState {
  constructor() {
  }

  @Selector()
  static isAppListening(state: AppStateModel) {
    return state.listening;
  }

  @Action(UpdateListening)
  updateListening({getState, patchState}: StateContext<AppStateModel>, {listening}: UpdateListening) {
    patchState({
      listening: listening
    });
  }
}
