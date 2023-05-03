import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "@shared/components/base/base.component";
import { Select, Selector, Store } from "@ngxs/store";
import { MusicListenerService } from "@app/core/music-listener.service";
import { MusicState, Song } from "@shared/redux/music-state/music.state";
import { Observable } from "rxjs";
import { UpdateListening, UpdatePlayer, UpdatePlayingMusic } from "@shared/redux/music-state/music.actions";

@Component({
  selector: 'app-music-listener-screen',
  templateUrl: './music-listener-screen.component.html',
  styleUrls: ['./music-listener-screen.component.scss']
})
export class MusicListenerScreenComponent extends BaseComponent implements OnInit {

  @Select(MusicState.isAppListening)
  isAppListening$: Observable<boolean>;
  isAppListening: boolean;

  @Select(MusicState.playingMusic)
  playingMusic$: Observable<Song>;
  playingMusic: Song;

  constructor(private store: Store, private musicListenerService: MusicListenerService ) {
    super();
  }

  ngOnInit(): void {
    this.subscribeTo(this.isAppListening$, (isAppListening) => {
      this.isAppListening = isAppListening;
    });

    this.subscribeToDefined(this.playingMusic$, (playingMusic) => {
      this.playingMusic = playingMusic;
    });

    this.musicListenerService.subscribeToNextSong('music-playing', (data) => {
      if (!this.isAppListening) {
        return;
      }
      this.store.dispatch(new UpdatePlayer(data.player));
      this.store.dispatch(new UpdatePlayingMusic(data.title, data.artist));
    });
  }

  toggleListening() {
    this.store.dispatch(new UpdateListening(!this.isAppListening));
  }
}
