import { Song } from "@app/shared/models/music.model";

export class UpdateListening {
  static readonly type = '[MusicState] UpdateListening';
  constructor(public listening: boolean = true) {}
}

export class UpdatePlayingMusic {
  static readonly type = '[MusicState] UpdatePlayingMusic';
  constructor(public title: string, public artist: string) {}
}

export class StopMusic {
  static readonly type = '[MusicState] StopMusic';
  constructor() {}
}

export class StartMusic {
  static readonly type = '[MusicState] StopMusic';
  constructor() {}
}

export class UpdatePlayer {
  static readonly type = '[MusicState] UpdatePlayer';
  constructor(public player: string) {}
}

export class GetMusicHistory {
  static readonly type = '[MusicState] GetMusicHistory';
  constructor(public page: number, public forceReset = true) {}
}

export class SaveListenedSong {
  static readonly type = '[MusicState] SaveListenedSong';
  constructor(public song: Song) {}
}

