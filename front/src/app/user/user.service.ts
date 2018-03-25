import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {environment} from '../../environments/environment';
import {CredentialsService} from '../credentials.service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private credentialsService: CredentialsService) {
  }

  getUserInfo(): Observable<any> {
    const url = environment.apiUrl + "/user/me";
    const headers: HttpHeaders = this.credentialsService.getAuthorizedHeader();
    return this.http.get(url, {headers: headers})
  }

  saveUserSession(userDto: UserDto) {
    localStorage.setItem("userId", userDto.id.toString());
    localStorage.setItem("userEmail", userDto.email);
    localStorage.setItem("userRole", userDto.role);
    localStorage.setItem("userName", userDto.name);
    localStorage.setItem("shopId", userDto.shopId.toString());
  }

}
