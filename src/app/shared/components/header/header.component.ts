import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { AppState } from "../../redux/app-state/app.state";
import { UpdateListening } from "../../redux/app-state/app.actions";
import { TokenUpdateUser } from "@shared/redux/user-state/user.actions";
import { BaseComponent } from "@shared/components/base/base.component";
import { UserState } from "@shared/redux/user-state/user.state";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  @Select(UserState.isLogged)
  isUserLoggedIn$: Observable<boolean>;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
