import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Credentials } from './credentials';
import {CredentialsService} from "../credentials.service";


@Injectable()
export class LoginService {
  url = environment.apiUrl + '/oauth/token';

  constructor(private http: HttpClient, private credentialsService: CredentialsService) {
  }

  login(credentials: Credentials): Observable<any> {
    return this.http.post(this.url, null, {
      headers: {
        'Authorization': 'Basic ' + btoa('angularApp' + ':' + 'BardzoSilneHaslo2018')
      },
      params: {
        'grant_type': 'password',
        'username': credentials.email,
        'password': credentials.password
      },
    });
  }




}
