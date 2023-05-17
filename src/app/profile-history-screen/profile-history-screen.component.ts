import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "@shared/components/base/base.component";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { ListenedSong } from "@shared/models/music.model";
import { MusicState } from "@shared/redux/music-state/music.state";
import { GetMusicHistory } from "@shared/redux/music-state/music.actions";
import { UserState } from "@shared/redux/user-state/user.state";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-profile-history-screen',
  templateUrl: './profile-history-screen.component.html',
  styleUrls: ['./profile-history-screen.component.scss']
})
export class ProfileHistoryScreenComponent extends BaseComponent implements OnInit {

  @Select(MusicState.musicHistoryCurrentPage)
  historyPage$: Observable<ListenedSong[]>;
  historyPageSongs: ListenedSong[] = [];

  @Select(UserState.username)
  username$: Observable<string>;

  @Select(MusicState.musicHistoryTotalPages)
  totalPages$: Observable<number>;
  totalPages: number = 0;

  page: number = 0;
  hasNextPage: boolean = false;
  hasPreviousPage: boolean = false;

  constructor(private store: Store) {
    super();
  }
  ngOnInit(): void {
    this.store.dispatch(new GetMusicHistory(this.page, true));
    this.subscribeToDefined(this.historyPage$, (historyPage) => {
      this.historyPageSongs = historyPage;
    });

    this.subscribeToDefined(this.totalPages$, (totalPages) => {
      this.totalPages = totalPages;
      this.hasNextPage = this.page < totalPages - 1;
      this.hasPreviousPage = this.page > 0;
    });
  }

  requestNextPage() {
    this.page++;
    this.hasNextPage = this.page < this.totalPages - 1;
    this.hasPreviousPage = this.page > 0;
    this.store.dispatch(new GetMusicHistory(this.page, false));
  }

  requestPreviousPage() {
    this.page--;
    this.hasNextPage = this.page < this.totalPages - 1;
    this.hasPreviousPage = this.page > 0;
    this.store.dispatch(new GetMusicHistory(this.page, false));
  }
}
