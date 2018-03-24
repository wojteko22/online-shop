import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable()
export class CredentialsService {
  tokenCookieName = 'access_token';

  constructor() {
  }

  saveToken(tokenData) {
    const expireDate = new Date().getTime() + (1000 * tokenData.expires_in);
    Cookie.set(this.tokenCookieName, tokenData.access_token, expireDate);
  }

  logOut() {
    Cookie.delete(this.tokenCookieName);
  }

  token() {
    return Cookie.get('access_token');
  }

  isSignedIn() {
    return Cookie.check('access_token');
  }
}
