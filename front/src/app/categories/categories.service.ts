import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Category} from "./Category";
import {CredentialsService} from "../credentials.service";
import {UserService} from "../user/user.service";
import {CategoryDto} from "./CategoryDto";


@Injectable()
export class CategoriesService {
  shopId: string = localStorage.getItem("shopId");
  private categoriesUrl = environment.apiUrl + '/' + this.shopId + '/categories';
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private credentialsService: CredentialsService, private customerService: UserService) {
    if (!this.customerService.isUserInfoInLocalStorage()) {
      this.customerService.getAndSaveUserInfoToLocalStorage();
    }
    this.headers = this.credentialsService.getAuthorizedHeader();
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl, {headers: this.headers});
  }

  addCategory(createCategoryDto: CategoryDto) {
    return this.http.post(this.categoriesUrl, createCategoryDto, {headers: this.headers});
  }

  deleteCategory(id: number) {
    return this.http.delete<Category[]>(this.categoriesUrl + `/${id}`, {headers: this.headers});
  }

  editCategory(id: number, parentId: number, newName: string) {
    return this.http.post(this.categoriesUrl + `/${id}?newName=${newName}&parentId=${parentId}`, 0, {headers: this.headers});
  }

}
