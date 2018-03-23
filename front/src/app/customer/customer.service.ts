import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {environment} from '../../environments/environment';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  static getAuthorizedUserHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem(environment.storage_token),
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    });
  }

  getLoggedUser(): Observable<any> {
    const url = environment.apiUrl + "/me";
    let headers: HttpHeaders = CustomerService.getAuthorizedUserHeader();
    return this.http.post(url, 0, {headers: headers})
  }
}
