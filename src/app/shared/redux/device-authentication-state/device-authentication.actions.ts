export class RequestAuthenticationCodes {
  static readonly type = '[DeviceAuthenticationState] RequestAuthenticationCodes';
  constructor() {}
}

export class RequestAuthenticatedUser {
  static readonly type = '[DeviceAuthenticationState] RequestAuthenticatedUser';

  constructor() {
  }
}

export class SignOut {
  static readonly type = '[DeviceAuthenticationState] SignOut';
  constructor() {}
}
