import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ElectronIpcService } from "@app/core/electron-ipc.service";
import { UpdateListening, UpdatePlayingMusic } from "@shared/redux/music-state/music.actions";
export interface Song {
  title: string;
  artist: string;
}
export interface MusicStateModel {
  listening: boolean;
  playing?: boolean;
  activePlayer?: string;
  playingMusic?: Song;
}

@State<MusicStateModel>({
  name: 'musicState',
  defaults: {
    listening: true,
  },
})
@Injectable()
export class MusicState {
  constructor(private es: ElectronIpcService) {
  }

  @Selector()
  static isAppListening(state: MusicStateModel) {
    return state.listening;
  }

  @Selector()
  static isMusicPlaying(state: MusicStateModel) {
    return state.playing;
  }

  @Selector()
  static activePlayer(state: MusicStateModel) {
    return state.activePlayer;
  }

  @Selector()
  static playingMusic(state: MusicStateModel) {
    return state.playingMusic;
  }

  @Action(UpdateListening)
  updateListening({getState, patchState}: StateContext<MusicStateModel>, {listening}: UpdateListening) {
    return patchState({
      listening: listening
    });
  }

  @Action(UpdatePlayingMusic)
  updatePlayingMusic({getState, patchState}: StateContext<MusicStateModel>, {title, artist}: UpdatePlayingMusic) {
    // ToDo - add validation, add separation at - if title contains -, check to be different than the previous one
    return patchState({
      playingMusic: {
        title,
        artist
      }
    });
  }
}
