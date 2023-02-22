export class UpdateListening {
  static readonly type = '[AppState] Update Listening';
  constructor(public listening: boolean = true) {}
}
