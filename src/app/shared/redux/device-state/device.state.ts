import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { DeviceAuthenticationCodes } from "@shared/models/device.model";
import { RequestAuthenticatedUser, RequestAuthenticationCodes } from "@shared/redux/device-state/device.actions";
import { AuthenticationService } from "@app/core/authentication.service";
import { catchError, tap, throwError } from "rxjs";
import { TokenUpdateUser } from "@shared/redux/user-state/user.actions";
import { HttpResponse, HttpStatusCode } from "@angular/common/http";
import { StorageService } from "@app/core/storage.service";

export interface DeviceStateModel {
  authenticationCodes?: DeviceAuthenticationCodes;
  clientId?: string;
  successful: boolean;
}

@State<DeviceStateModel>({
  name: 'DeviceState',
  defaults: {
    successful: false
  },
})
@Injectable()
export class DeviceState {
  constructor(private service: AuthenticationService, private store: Store, private storageService: StorageService) {
  }

  @Selector()
  static authenticationCodes(state: DeviceStateModel) {
    return state.authenticationCodes;
  }

  @Selector()
  static clientId(state: DeviceStateModel) {
    return state.clientId;
  }

  @Selector()
  static isSuccessful(state: DeviceStateModel) {
    return state.successful;
  }

  @Action(RequestAuthenticationCodes)
  requestAuthenticationCodes({ getState, patchState }: StateContext<DeviceStateModel>) {
    const state = { ...getState() };
    if (state.authenticationCodes) {
      return;
    }
    const clientId = crypto.randomUUID();

    return this.service.requestAuthenticationCodes(clientId).pipe(
      tap((response: DeviceAuthenticationCodes) => {
          patchState({
            authenticationCodes: response,
            clientId
          });
        },
        catchError((error) => {
          console.warn(error);
          return throwError(error);
        })
      )
    );
  }

  @Action(RequestAuthenticatedUser)
  requestAuthenticatedUser({ getState, patchState }: StateContext<DeviceStateModel>) {
    const state = { ...getState() };
    if (state.successful) {
      return;
    }

    return this.service.requestAuthenticatedUser(state.authenticationCodes as DeviceAuthenticationCodes, state.clientId as string).pipe(
      tap((response: HttpResponse<any>) => {
          if (response.status === HttpStatusCode.Ok) {
            patchState({
              successful: true,
            });
            const token = response.headers.get('token') as string;
            this.storageService.set('token', token);
            this.store.dispatch(new TokenUpdateUser(token));
          }
        },
        catchError((err) => {
          console.warn(err);
          return throwError(err);
        })
      )
    );
  }
}
