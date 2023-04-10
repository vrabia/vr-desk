import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { AppState } from "../../redux/app-state/app.state";
import { UpdateListening } from "../../redux/app-state/app.actions";
import { TokenUpdateUser } from "@shared/redux/user-state/user.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Select(AppState.isAppListening)
  isAppListening$: Observable<boolean>;
  isAppListening: boolean;

  subscription: any;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.subscription = this.isAppListening$.subscribe(listening => this.isAppListening = listening);
  }

  toggleListening() {
    this.store.dispatch(new UpdateListening(!this.isAppListening));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  trigger($event: MouseEvent) {
      this.store.dispatch(new TokenUpdateUser());
  }
}
