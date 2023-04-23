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

  @Selector()
  static username(state: UserStateModel) {
    return state.user?.username;
  }

  /**
   * This action is only used when a definitive update, not-regarding the token, is needed
   * E.g. when the user logs out or performs a profile edit
   */
  @Action(UpdateUser)
  updateUser({ getState, patchState }: StateContext<UserStateModel>, action: UpdateUser) {
    patchState({
      isLogged: action.loggedIn,
      user: action.userInfo,
    });
  }

  @Action(TokenUpdateUser)
  startApplicationUpdateUser(ctx: StateContext<UserStateModel>, action: TokenUpdateUser) {
    let token = action.token;

    if (!token) {
      // try retrieve token from storage and put it in token variable
      this.storage.subscribeToGet('token', (value: any) => {
        token = value?.data;
        if (!token) {
          return;
        }
        this.updateToken(ctx , token);
      });
    } else {
      this.updateToken(ctx , token);
    }
  }

  private updateToken({ patchState }: StateContext<UserStateModel>, token: string) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    if (!decodedToken?.sub || helper.isTokenExpired(token)) {
      this.storage.delete('token');
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
  }
}
