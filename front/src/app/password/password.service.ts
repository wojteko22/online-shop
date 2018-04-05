import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CredentialsService} from '../credentials.service';
import {UpdateUserPassword} from './updateUserPassword';

@Injectable()
export class PasswordService {

  constructor(private http: HttpClient, private credentialsService: CredentialsService) {
  }

  changeUserPassword(updateUserPassword: UpdateUserPassword) {
    const url = environment.apiUrl + '/user/password';
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.credentialsService.token()
    });
    return this.http.put(url, updateUserPassword, {headers: headers});
  }
}
