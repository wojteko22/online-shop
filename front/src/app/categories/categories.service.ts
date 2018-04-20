import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Category} from "./Category";
import {CredentialsService} from "../-services/credentials.service";
import {CategoryDto} from "./CategoryDto";
import {CategorySimpleDto} from '../-models/CategorySimpleDto';


@Injectable()
export class CategoriesService {
  shopId: string;
  private categoriesUrl: string;

  constructor(private http: HttpClient, private credentialsService: CredentialsService) {
    this.shopId = this.credentialsService.getUser().shopId.toString();
    this.categoriesUrl = environment.apiUrl + '/' + this.shopId + '/categories';
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  addCategory(createCategoryDto: CategoryDto) {
    return this.http.post(this.categoriesUrl, createCategoryDto);
  }

  deleteCategory(id: number) {
    return this.http.delete<Category[]>(this.categoriesUrl + `/${id}`);
  }

  editCategory(id: number, parentId: number, newName: string) {
    const body = {
      newName: newName,
      parentId: parentId,
    };
    return this.http.patch(`${this.categoriesUrl}/${id}`, body);
  }

  getSubcategories(id: number) {
    return this.http.get<CategorySimpleDto[]>(this.categoriesUrl+"/"+id+"/subcategories");
  }
}
