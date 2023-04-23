export class UpdateListening {
  static readonly type = '[AppState] Update Listening';
  constructor(public listening: boolean = true) {}
}

export class UpdateGradientScreen {
  static readonly type = '[AppState] Update Gradient Screen';
  constructor(public gradientScreen: boolean = false) {}
}

export class OpenUrl {
  static readonly type = '[AppState] Open Url';
  constructor(public url: string) {}
}
