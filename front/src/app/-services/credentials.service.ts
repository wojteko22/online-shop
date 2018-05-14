import {Injectable} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {TokenData} from '../-models/token';
import {User} from '../-models/User';
import {Router} from '@angular/router';
import {AdminService} from './admin.service';

@Injectable()
export class CredentialsService {
  tokenCookieName = 'access_token';
  userStorageKey = 'user';

  constructor(private router: Router, private adminService: AdminService) {
  }

  saveToken(tokenData: TokenData) {
    const expireDate = new Date().getTime() + (1000 * tokenData.expires_in);
    Cookie.set(this.tokenCookieName, tokenData.access_token, expireDate);
  }

  logOut() {
    this.adminService.clear();
    localStorage.clear();
    Cookie.delete(this.tokenCookieName);
    this.router.navigate(['/login']);
  }

  token() {
    return Cookie.get('access_token');
  }

  isSignedIn() {
    return Cookie.check('access_token');
  }

  saveUser(user: User) {
    localStorage.setItem(this.userStorageKey, JSON.stringify(user));
  }

  getUserId() {
    return this.getUser().id;
  }

  getUser(): User {
    if (this.adminService.pretending) {
      return this.adminService.user;
    }
    const user = localStorage.getItem(this.userStorageKey);
    return JSON.parse(user);
  }

  getShopId() {
    const user = this.getUser();
    return user && user.shopId;
  }

  isShopOwner() {
    return this.role() === 'SHOP_OWNER';
  }

  isAdmin() {
    return this.adminService.pretending || this.role() === 'ADMIN';
  }

  isCustomer() {
    return this.role() === 'CUSTOMER';
  }

  private role() {
    const user = this.getUser();
    return user && user.role;
  }
}
