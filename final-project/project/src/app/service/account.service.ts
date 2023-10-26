import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accountsUrl: string = ' '

  constructor(private http: HttpClient) {
    this.accountsUrl = 'http://localhost:18080/api'
  }

  public getAccount(id: number): Observable<Account>{
    return this.http.get<Account>(this.accountsUrl + '/show-account/' + id.toString());
  }

  public createAccount(formData: FormData)  {
    return this.http.post<Account>(this.accountsUrl + '/create-account/', formData);
  }
}
