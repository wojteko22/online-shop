import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserInfo(): Observable<any> {
    const url = environment.apiUrl + '/user/me';
    return this.http.get(url);
  }

  saveUserSession(userDto: UserDto) {
    localStorage.setItem('userId', userDto.id.toString());
    localStorage.setItem('userEmail', userDto.email);
    localStorage.setItem('userRole', userDto.role);
    localStorage.setItem('userName', userDto.name);
    if (userDto.shopId) {
      localStorage.setItem('shopId', userDto.shopId.toString());
    }
  }
}
