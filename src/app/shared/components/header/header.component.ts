import { Component, OnInit } from '@angular/core';
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
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
