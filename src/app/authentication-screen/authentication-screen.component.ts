import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "@shared/components/base/base.component";
import { ElectronService } from "@app/core/electron.service";
import { Select, Store } from "@ngxs/store";
import { DeviceAuthenticationCodes } from "@shared/models/device.model";
import { DeviceState } from "@shared/redux/device-state/device.state";
import { Observable } from "rxjs";
import { RequestAuthenticatedUser, RequestAuthenticationCodes } from "@shared/redux/device-state/device.actions";
import { Router } from "@angular/router";

@Component({
  selector: 'app-authentication-screen',
  templateUrl: './authentication-screen.component.html',
  styleUrls: ['./authentication-screen.component.scss']
})
export class AuthenticationScreenComponent extends BaseComponent implements OnInit {

  @Select(DeviceState.authenticationCodes)
  $authenticationCodes: Observable<DeviceAuthenticationCodes>;
  authenticationCodes: DeviceAuthenticationCodes;
  userCode: string;

  @Select(DeviceState.isSuccessful)
  $successful: Observable<boolean>;
  successful: boolean;

  // @ts-ignore
  interval: string | number | NodeJS.Timer | undefined;

  constructor(private es: ElectronService, private store: Store, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.subscribeToDefined(this.$authenticationCodes, (response) => {
      this.authenticationCodes = response;
      this.userCode = this.authenticationCodes.userCode;
      this.userCode = this.userCode.replace(/.{3}/g, '$& ');
      console.log(this.userCode)
      this.es.getIpcRenderer().send('open-website', this.authenticationCodes.verificationUri);
    });

    this.subscribeToDefined(this.$successful, (response) => {
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
