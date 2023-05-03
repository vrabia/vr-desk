import { Injectable } from '@angular/core';
import { ElectronIpcService } from "@app/core/electron-ipc.service";

@Injectable({
  providedIn: 'root'
})
export class MusicListenerService {

  constructor(private es: ElectronIpcService) {
  }

  subscribeToNextSong(key: string, callback: (data: any) => void) {
    this.es.getIpcRenderer().on(`music-playing`, callback);
  }
}
