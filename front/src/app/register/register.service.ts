import {Injectable} from '@angular/core';
import {UserDto} from './UserDto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ShopWithOwner} from './shop-with-owner';

@Injectable()
export class RegisterService {
  url = environment.apiUrl + '/user';

  constructor(private http: HttpClient) {
  }

  register(userDto: UserDto) {
    return this.http.post(this.url, userDto)
  }

  registerShop(shopWithOwner: ShopWithOwner) {
    return this.http.post(this.url + '/shop', shopWithOwner)
  }
}
