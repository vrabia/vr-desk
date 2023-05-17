import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import {
  GetMusicHistory,
  SaveListenedSong,
  UpdateListening,
  UpdatePlayingMusic, UpdateSongGenre
} from "@shared/redux/music-state/music.actions";
import { ListenedSong, Song } from "@app/shared/models/music.model";
import { MusicListenerService } from "@app/core/music-listener.service";
import { tap } from "rxjs";

export interface HistoryStateModel {
  currentIdentifier: string;
  pageSize: number;
  totalPages: number;
  history: {
    [key: string]: ListenedSong[];
  };
}

export interface MusicStateModel {
  timeChanged?: Date;
  listening: boolean;
  playing?: boolean;
  activePlayer?: string;
  playingMusic?: Song;
  musicHistory: HistoryStateModel;
}

@State<MusicStateModel>({
  name: 'musicState',
  defaults: {
    listening: true,
    musicHistory: {
      totalPages: 0,
      currentIdentifier: '',
      pageSize: 6,
      history: {}
    }
  },
})
@Injectable()
export class MusicState {

  private readonly artistsWordList = [' ft', ' feat', ' featuring', ' vs', ' and', ' x', ' with', ' +', '|', ' &', 'X', ',', ' e', ' -',];
  private readonly titleWordList = [' ft', ' feat', ' featuring', ' +', '|', ' &', ',',
    'Oficial Video', 'Official Video', 'Official Music Video', 'Music Video', 'Video', 'Lyrics', 'Lyric Video', 'Lyric',
    'Lyrics Video', 'Lyrics', 'Audio', 'Audio Video', 'Audio Oficial', 'Audio Oficial Video', '4K', 'HD', 'HQ', 'Remix',
    'Live', '- YouTube', 'Original', 'Version', 'Cover', 'LIVE'];

  constructor(private musicListenerService: MusicListenerService) {
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

  @Selector()
  static musicHistoryCurrentPage(state: MusicStateModel) {
    return state.musicHistory.history[state.musicHistory.currentIdentifier];
  }

  @Selector()
  static musicHistoryTotalPages(state: MusicStateModel) {
    return state.musicHistory.totalPages;
  }

  @Action(UpdateListening)
  updateListening({ getState, patchState }: StateContext<MusicStateModel>, { listening }: UpdateListening) {
    return patchState({
      listening: listening
    });
  }

  @Action(UpdatePlayingMusic)
  updatePlayingMusic({ getState, patchState }: StateContext<MusicStateModel>, { title, artist }: UpdatePlayingMusic) {
    // ToDo - add validation, add separation at - if title contains -, check to be different than the previous one
    if (title.includes('-')) {
      const titleParts = title.split('-');
      title = titleParts[1];
      artist = titleParts[0];
    }
    if (title.includes('–')) {
      const titleParts = title.split('–');
      title = titleParts[1];
      artist = titleParts[0];
    }


    // remove all content from between ()
    title = title.replace(/\([^()]*\)/g, '');
    artist = artist.replace(/\([^()]*\)/g, '');
    // remove all content from between []
    title = title.replace(/\[[^\][]*]/g, '');
    artist = artist.replace(/\[[^\][]*]/g, '');

    this.artistsWordList.forEach((word) => {
      if (artist.includes(word)) {
        const artistParts = artist.split(word);
        artist = artistParts[0];
      }
    });

    this.titleWordList.forEach((word) => {
      if (title.includes(word)) {
        const titleParts = title.split(word);
        title = titleParts[0];
      }
    });

    title = title.trim();
    artist = artist.trim();

    // check if the music is the same as the previous one
    const state = {...getState()};
    const playingMusic = state.playingMusic;
    if (playingMusic && playingMusic.title === title && playingMusic.artist === artist) {
      //check if time changed
      if (state.timeChanged) {
        const currentTime = new Date();
        const difference = currentTime.getTime() - state.timeChanged.getTime();
        if (difference < 30000) {
          patchState({
            timeChanged: currentTime
          })
          return;
        }
      }
    }

    // save the music
    return patchState({
      playingMusic: {
        title,
        artist
      },
      timeChanged: new Date()
    });
  }

  @Action(GetMusicHistory)
  getMusicHistory({ getState, patchState }: StateContext<MusicStateModel>, { page, forceReset }: GetMusicHistory) {
    // if forceReset is true, we need to reset the history
    if (forceReset) {
      patchState({
        musicHistory: {
          totalPages: 0,
          currentIdentifier: '',
          pageSize: 6,
          history: {}
        }
      });
    }

    // check if we already have the history for the current page
    const state = {...getState()};
    const historyState = state.musicHistory;
    const identifier = this.getIdentifier(page, historyState?.pageSize);

    // if it is already selected, return
    if (historyState.currentIdentifier === identifier) {
      return;
    }

    // if we already have the history, update the current identifier
    if(historyState.history[identifier]) {
      return patchState({
        musicHistory: {
          ...historyState,
          currentIdentifier: identifier
        }
      });
    }

    // if we don't have the history, get it from the server
    return this.musicListenerService.getUserMusicHistory(page, historyState.pageSize).pipe(
      tap((historyPage) => {
        const pageIdentifier = this.getIdentifier(historyPage.currentPage, historyState.pageSize);
        const newHistory = historyState.history;
        newHistory[pageIdentifier] = historyPage.songs;
        const totalPages = historyPage.totalPages;

        patchState({
          musicHistory: {
            totalPages,
            pageSize: historyState.pageSize,
            currentIdentifier: pageIdentifier,
            history: newHistory,
          }
        });
      })
    )
  }

  @Action(SaveListenedSong)
  saveListenedSong({ getState, patchState }: StateContext<MusicStateModel>, { song }: SaveListenedSong) {
    return this.musicListenerService.saveListenedSong(song).pipe(
      tap((listenedSong) => {
        // no idea what to do with it, but it may be useful in the future
      }
    ));
  }

  private getIdentifier(page: number, pageSize: number) {
    return `${page}-${pageSize}`;
  }

  @Action(UpdateSongGenre)
  updateSongGenre({ getState, patchState }: StateContext<MusicStateModel>, { songId, genre }: UpdateSongGenre) {
    return this.musicListenerService.updateSongGenre(songId, genre).pipe(
      tap((song) => {
        const history = {...getState().musicHistory};
        const historyPages = history.history;
        for (const identifier in historyPages) {
          const songs = history.history[identifier];
          const index = songs.findIndex((song) => song.song.id === songId);
          if (index > -1) {
            history.history[identifier][index].song = song;
          }
        }
        return patchState({
          musicHistory: history
        });
      }));
  }
}
