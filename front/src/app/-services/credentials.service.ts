import {Injectable} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {TokenData} from '../-models/token';
import {HttpHeaders} from '@angular/common/http';
import {User} from '../-models/User';

@Injectable()
export class CredentialsService {
  tokenCookieName = 'access_token';
  userStorageKey = 'user';

  constructor() {
  }

  saveToken(tokenData: TokenData) {
    const expireDate = new Date().getTime() + (1000 * tokenData.expires_in);
    Cookie.set(this.tokenCookieName, tokenData.access_token, expireDate);
  }

  logOut() {
    localStorage.clear();
    Cookie.delete(this.tokenCookieName);
  }

  token() {
    return Cookie.get('access_token');
  }

  isSignedIn() {
    return Cookie.check('access_token');
  }

  getAuthorizedHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.token()
    });
  }

  saveUser(user: User) {
    localStorage.setItem(this.userStorageKey, JSON.stringify(user));
  }

  getUser(): User {
    const user = localStorage.getItem(this.userStorageKey);
    return JSON.parse(user);
  }
}
