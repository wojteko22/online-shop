import {Injectable} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {TokenData} from '../-models/token';
import {User} from '../-models/User';
import {Router} from '@angular/router';
import {AdminService} from './admin.service';

@Injectable()
export class CredentialsService {
  private readonly tokenCookieName = 'access_token';
  private readonly userStorageKey = 'user';

  constructor(private router: Router, private adminService: AdminService) {
  }

  saveToken(tokenData: TokenData) {
    const expireDate = new Date().getTime() + (1000 * tokenData.expires_in);
    Cookie.set(this.tokenCookieName, tokenData.access_token, expireDate);
  }

  signOut() {
    this.adminService.clear();
    localStorage.clear();
    Cookie.delete(this.tokenCookieName);
    this.router.navigateByUrl('/login');
  }

  token() {
    return Cookie.get(this.tokenCookieName);
  }

  isSignedIn() {
    return Cookie.check(this.tokenCookieName);
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
