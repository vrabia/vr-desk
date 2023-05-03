import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { AppState } from "@shared/redux/app-state/app.state";
import { TokenUpdateUser } from "@shared/redux/user-state/user.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Vrabia';

  @Select(AppState.isGradientScreen)
  isGradientScreen$: Observable<boolean>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new TokenUpdateUser())
  }
}
