import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Credentials} from './credentials';

@Injectable()
export class LoginService {
  url = environment.apiUrl + '/oauth/token';

  constructor(private http: HttpClient) {
  }

  login(credentials: Credentials) {
    return this.http.post(this.url, null, {
      headers: {
        'Authorization': 'Basic ' + btoa('angularApp' + ':' + 'BardzoSilneHaslo2018')
      },
      params: {
        'grant_type': 'password',
        'username': credentials.email,
        'password': credentials.password
      },
    })
  }
}
