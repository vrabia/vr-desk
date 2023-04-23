import { Component } from '@angular/core';
import { BaseComponent } from "@shared/components/base/base.component";
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { UserState } from "@shared/redux/user-state/user.state";
import { Router } from "@angular/router";
import { OpenUrl } from "@shared/redux/app-state/app.actions";
import { environment } from "@environments/environment";
import { SignOut } from "@shared/redux/device-authentication-state/device-authentication.actions";

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent extends BaseComponent{

  menuVisible: boolean = false;

  @Select(UserState.username)
  username$: Observable<string>;

  constructor(private router: Router, private store: Store) {
    super();
  }

  toggleVisibility($event: MouseEvent) {
    this.menuVisible = !this.menuVisible;
  }

  redirectToProfile() {
    this.menuVisible = false;
    this.router.navigate(['/profile-edit']);
  }

  openWebsite() {
    this.menuVisible = false;
    this.store.dispatch(new OpenUrl(environment.websiteUrl));
  }

  signOut() {
    this.menuVisible = false;
    this.store.dispatch(new SignOut());
  }

  redirectToHistory() {
    this.menuVisible = false;
    this.router.navigate(['/history']);
  }
}
