import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {UpdateUserPassword} from '../password/updateUserPassword';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {
  }

  getUserInfo(): Observable<any> {
    return this.http.get(this.url + '/me');
  }

  changeUserPassword(updateUserPassword: UpdateUserPassword) {
    return this.http.put(this.url + '/password', updateUserPassword);
  }
}
