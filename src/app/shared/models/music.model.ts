export interface Song {
  id?: string;
  title: string;
  artist: string;
  genre?: string;
}

export interface ListenedSong {
  song: Song;
  lastListenDate: Date;
  timesListened: number;
}

export interface PagedSongs {
  songs: ListenedSong[];
  totalSongs: number;
  totalPages: number;
  currentPage: number;
}
