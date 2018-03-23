import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {UserDto} from "./UserDto";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) { }


  register(userDto: UserDto) : Observable<any> {
    //TODO wyciągnąć do environment
    let url = "http://localhost:8080/user";

    return this.http.post(url, userDto, {observe: 'response'});
  }

}
