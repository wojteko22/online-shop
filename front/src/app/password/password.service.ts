import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from '../../environments/environment';
import {Observable} from "rxjs/Observable";
import {CredentialsService} from "../credentials.service";
import {UpdateUserPassword} from "./updateUserPassword";

@Injectable()
export class PasswordService {

  constructor(private http: HttpClient, private credentialsService: CredentialsService) { }


  changeUserPassword(updateUserPassword: UpdateUserPassword) : Observable<any> {
    const url = environment.apiUrl+"/user/password";
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.credentialsService.token(),
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    return this.http.put(url, updateUserPassword, {headers: headers});
  }
}
