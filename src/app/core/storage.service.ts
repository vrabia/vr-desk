import { Injectable } from '@angular/core';
import { ElectronIpcService } from "@app/core/electron-ipc.service";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private es: ElectronIpcService) {
  }

  set(key: string, value: string) {
    this.es.getIpcRenderer().send('store-set', {key, value});
  }

  get(key: string) {
    this.es.getIpcRenderer().send('store-get', {key});
  }

  subscribeToGet(key: string, callback: (value: string) => void) {
    this.es.getIpcRenderer().send('store-get', {key});
    this.es.getIpcRenderer().once(`get-${key}`, callback);
  }

  delete(key: string) {
    this.es.getIpcRenderer().send('store-delete', {key});
  }
}
