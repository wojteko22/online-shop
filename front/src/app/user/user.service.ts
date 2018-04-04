import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {environment} from '../../environments/environment';
import {CredentialsService} from '../credentials.service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private credentialsService: CredentialsService) {
  }

  getAndSaveUserInfoToLocalStorage() {
    this.getUserInfo().subscribe(
      (userDto => this.saveUserSession(userDto))
    );
  }

  isUserInfoInLocalStorage(): boolean {
    return localStorage.getItem("userEmail") != null;
  }

  private getUserInfo(): Observable<any> {
    const url = environment.apiUrl + "/user/me";
    const headers: HttpHeaders = this.credentialsService.getAuthorizedHeader();
    location.reload();
    return this.http.get(url, {headers: headers})
  }

  private saveUserSession(userDto: UserDto) {
    localStorage.setItem("userId", userDto.id.toString());
    localStorage.setItem("userEmail", userDto.email);
    localStorage.setItem("userRole", userDto.role);
    localStorage.setItem("userName", userDto.name);
    localStorage.setItem("shopId", userDto.shopId.toString());
  }

}
