import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UpdateUserPassword} from "./updateUserPassword";
import { environment } from '../../environments/environment';
import {CustomerService} from "../customer/customer.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PasswordService {

  constructor(private http: HttpClient) { }


  changeUserPassword(updateUserPassword: UpdateUserPassword) : Observable<any> {
    const url = environment.apiUrl+"/password";

    return this.http.put(url, updateUserPassword, {headers: CustomerService.getAuthorizedUserHeader()});
  }
}
