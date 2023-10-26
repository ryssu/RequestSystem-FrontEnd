import { Injectable } from '@angular/core';
import { Account } from './model/account';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private data: any;
  private account : Account;

  setDataTemporary(data: any){
    this.data = data;
  }
  getDataTemporary(){
    return this.data;
  }

  setDataPersistent (key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getDataPersistent(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeDataPersistent(key: string): void {
    localStorage.removeItem(key);
  }

  setAccountTemporary(account: Account){
    this.account = account;
  }

  getAccountTemporary(){
    return this.account;
  }

}
