import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  requestsUrl: string = ' '

    constructor(private http: HttpClient){
        this.requestsUrl = 'http://localhost:18080/api'
    }

    public getRequests(): Observable<Request[]>{
        return this.http.get<Request[]> (this.requestsUrl + '/requests');
    }

    public getRequest(id: number): Observable<Request>{
        return this.http.get<Request>(this.requestsUrl + '/show-request/' + id.toString());
    }

    public createRequest(formData: FormData)  {
        return this.http.post<any>(this.requestsUrl + '/create-request/', formData);
    }
}
