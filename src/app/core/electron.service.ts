import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  constructor() { }

  getIpcRenderer(){
    return (<any>window).ipcRenderer;
  }
}
