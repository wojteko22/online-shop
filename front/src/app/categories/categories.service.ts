import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Category} from "./Category";
import {CredentialsService} from "../credentials.service";
import {UserService} from "../user/user.service";

@Injectable()
export class CategoriesService {
  shopId : string = localStorage.getItem("shopId");
  categoriesUrl = environment.apiUrl  + '/' + this.shopId + '/categories';

  constructor(private http: HttpClient, private credentialsService: CredentialsService, private customerService: UserService) {
    if (!this.customerService.isUserInfoInLocalStorage()) {
      this.customerService.getAndSaveUserInfoToLocalStorage();
    }
  }

  getCategories(): Observable<Category[]> {
    const headers: HttpHeaders = this.credentialsService.getAuthorizedHeader();
    return this.http.get<Category[]>(this.categoriesUrl,{headers: headers});
  }
}
