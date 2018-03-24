import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Category} from "./Category";
import {CredentialsService} from "../credentials.service";

@Injectable()
export class CategoriesService {

  categoriesUrl = environment.apiUrl + '/categories';

  constructor(private http: HttpClient, private credentialsService: CredentialsService) {
  }

  getCategories(): Observable<Category[]> {
    const headers: HttpHeaders = this.getAuthorizedUserHeader();
    return this.http.get<Category[]>(this.categoriesUrl,{headers: headers});
  }

  public getAuthorizedUserHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.credentialsService.token(),
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });

  }
}
