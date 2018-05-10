import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UpdateUserPassword} from './updateUserPassword';

@Injectable()
export class PasswordService {

  constructor(private http: HttpClient) {
  }

  changeUserPassword(updateUserPassword: UpdateUserPassword) {
    const url = environment.apiUrl + '/user/password';
    return this.http.put(url, updateUserPassword)
  }
}