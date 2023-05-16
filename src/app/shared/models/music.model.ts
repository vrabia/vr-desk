export interface Song {
  title: string;
  artist: string;
  genre?: string;
}


export interface ListenedSong extends Song {
  lastListenDate: String;
  timesListened: number;
}

export interface PagedSongs {
  songs: ListenedSong[];
  totalSongs: number;
  totalPages: number;
  currentPage: number;
}
