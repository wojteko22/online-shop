import {Injectable} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {TokenData} from './token';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class CredentialsService {
  tokenCookieName = 'access_token';

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
      'Authorization': 'Bearer ' + this.token(),
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });
  }
}
