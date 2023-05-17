import { Injectable } from '@angular/core';
import { ElectronIpcService } from "@app/core/electron-ipc.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { PagedSongs, Song } from "@shared/models/music.model";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MusicListenerService {

  baseUrl = `${environment.musicServiceUrl}/song`;

  constructor(private es: ElectronIpcService, private http: HttpClient) {
  }

  subscribeToNextSong(key: string, callback: (data: any) => void) {
    this.es.getIpcRenderer().on(`music-playing`, callback);
  }

  saveListenedSong(song: Song) {
    return this.http.post(this.baseUrl, song);
  }

  getUserMusicHistory(page: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('pageSize', pageSize);
    return this.http.get<PagedSongs>(`${this.baseUrl}/user-history`, {params});
  }

  updateSongGenre(songId: string, genre: string): Observable<Song> {
    return this.http.put<Song>(`${this.baseUrl}/genre`, {id: songId, genre});
  }
}
