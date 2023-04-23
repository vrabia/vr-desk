import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "@shared/components/base/base.component";
import { ElectronIpcService } from "@app/core/electron-ipc.service";
import { Select, Store } from "@ngxs/store";
import { DeviceAuthenticationCodes } from "@shared/models/device.model";
import { DeviceAuthenticationState } from "@shared/redux/device-authentication-state/device-authentication.state";
import { Observable } from "rxjs";
import { RequestAuthenticatedUser, RequestAuthenticationCodes } from "@shared/redux/device-authentication-state/device-authentication.actions";
import { Router } from "@angular/router";
import { OpenUrl } from "@shared/redux/app-state/app.actions";

@Component({
  selector: 'app-authentication-screen',
  templateUrl: './authentication-screen.component.html',
  styleUrls: ['./authentication-screen.component.scss']
})
export class AuthenticationScreenComponent extends BaseComponent implements OnInit {

  @Select(DeviceAuthenticationState.authenticationCodes)
  authenticationCodes$: Observable<DeviceAuthenticationCodes>;
  authenticationCodes: DeviceAuthenticationCodes;
  userCode: string;

  @Select(DeviceAuthenticationState.isSuccessful)
  successful$: Observable<boolean>;
  successful: boolean;

  // @ts-ignore
  interval: string | number | NodeJS.Timer | undefined;

  constructor(private es: ElectronIpcService, private store: Store, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.subscribeToDefined(this.authenticationCodes$, (response) => {
      this.authenticationCodes = response;
      this.userCode = this.authenticationCodes.userCode;
      this.userCode = this.userCode.replace(/.{3}/g, '$& ');
      this.store.dispatch(new OpenUrl(this.authenticationCodes.verificationUri));
    });

    this.subscribeToDefined(this.successful$, (response) => {
      this.successful = response;
      if (this.successful) {
        this.router.navigate(['/music-listener']);
        clearInterval(this.interval);
      }
    });
  }

  openWebsite() {
    this.store.dispatch(new RequestAuthenticationCodes());
    this.interval = setInterval(() => {
      this.store.dispatch(new RequestAuthenticatedUser());
    }, 10000);
  }
}
