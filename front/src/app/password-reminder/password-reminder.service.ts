import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UpdateUserPasswordUsingTokenDto, UserTokenDto} from './UserTokenDto';
import {environment} from '../../environments/environment';

@Injectable()
export class PasswordReminderService {

  url: string = environment.apiUrl + '/users/password';

  constructor(private http: HttpClient) {
  }

  sendReminderToken(email: string): Observable<any> {
    return this.http.post<UserTokenDto>(this.url + "/send-remind-token", email);
  }

  changePasswordUsingToken(dto: UpdateUserPasswordUsingTokenDto) {
    return this.http.post<UserTokenDto>(this.url + "/change-using-token", dto)
  }
}
