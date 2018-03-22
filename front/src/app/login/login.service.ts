import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Credentials } from './credentials';

@Injectable()
export class LoginService {
  url = environment.apiUrl + '/oauth/token';

  constructor(private http: HttpClient) {
  }

  login(credentials: Credentials): Observable<any> {
    let params = new HttpParams();
    params = params.append('grant_type', 'password');
    params = params.append('username', credentials.email);
    params = params.append('password', credentials.password);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('angularApp' + ':' + 'BardzoSilneHaslo2018')
      }),
      params: params,
    };
    return this.http.post(this.url, null, httpOptions);
  }
}
