import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {environment} from '../../environments/environment';
import { CredentialsService } from '../credentials.service';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient, private credentialsService: CredentialsService) {
  }

  getLoggedUser(): Observable<any> {
    const url = environment.apiUrl + "/me";
    const headers: HttpHeaders = this.getAuthorizedUserHeader();
    return this.http.post(url, 0, {headers: headers})
  }

  private getAuthorizedUserHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.credentialsService.token(),
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    });
  }
}
