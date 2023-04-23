import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectronIpcService {

  constructor() { }

  getIpcRenderer(){
    return (<any>window).ipcRenderer;
  }
}
