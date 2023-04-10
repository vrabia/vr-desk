import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "@shared/components/base/base.component";
import { Store } from "@ngxs/store";

@Component({
  selector: 'app-music-listener-screen',
  templateUrl: './music-listener-screen.component.html',
  styleUrls: ['./music-listener-screen.component.scss']
})
export class MusicListenerScreenComponent extends BaseComponent implements OnInit {

  constructor(private store: Store ) {
    super();
  }

  ngOnInit(): void {
  }
}
