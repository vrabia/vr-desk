import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from "@shared/components/base/base.component";
import { ListenedSong } from "@shared/models/music.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store } from "@ngxs/store";
import { UpdateSongGenre } from "@shared/redux/music-state/music.actions";

@Component({
  selector: 'app-profile-history-card',
  templateUrl: './profile-history-card.component.html',
  styleUrls: ['./profile-history-card.component.scss']
})
export class ProfileHistoryCardComponent extends BaseComponent implements OnInit {

  @Input()
  listenedSong: ListenedSong;
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    super();
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      genre: [this.listenedSong.song.genre],
    });
  }

  saveGenre() {
    this.store.dispatch(new UpdateSongGenre(this.listenedSong.song.id as string, this.form.getRawValue().genre));
  }
}
