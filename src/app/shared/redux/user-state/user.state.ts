import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { UserInfo } from "@shared/models/user.model";
import { TokenUpdateUser, UpdateUser } from "@shared/redux/user-state/user.actions";
import { StorageService } from "@app/core/storage.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Navigate } from "@ngxs/router-plugin";

export interface UserStateModel {
  isLogged: boolean;
  user?: UserInfo;
}

@State<UserStateModel>({
  name: 'userState',
  defaults: {
    isLogged: false,
  },
})
@Injectable()
export class UserState {
  constructor(private storage: StorageService, private store: Store) {
  }

  @Selector()
  static isLogged(state: UserStateModel) {
    return state.isLogged;
  }

  @Action(UpdateUser)
  updateUser({ getState, patchState }: StateContext<UserStateModel>, action: UpdateUser) {
    // ToDo -> take info from stored token, request user info from server

    this.storage.subscribeToGet('token', (value: string) => {
      debugger
      if (value) {
      }
    });

    patchState({
      isLogged: action.loggedIn,
      user: action.userInfo,
    });
  }

  @Action(TokenUpdateUser)
  startApplicationUpdateUser({ getState, patchState }: StateContext<UserStateModel>, action: TokenUpdateUser) {
    let token = action.token;

    if (!token) {
      // try retrieve token from storage and put it in token variable
      this.storage.subscribeToGet('token', (value: any) => {
        token = value?.data;
        if (!token) {
          return;
        }

        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        if (!decodedToken?.sub || helper.isTokenExpired(token)) {
          // ToDo -> remove token from storage
          // ToDo -> logout user with session expired
          patchState({
            isLogged: false,
            user: undefined,
          })
          return;
        }
        const userInfo = {
          username: decodedToken.sub,
          roles: decodedToken.roles
        }

        patchState({
          isLogged: true,
          user: userInfo as UserInfo,
        });

        this.store.dispatch(new Navigate(['/music-listener']));
      });
    }
  }
}
