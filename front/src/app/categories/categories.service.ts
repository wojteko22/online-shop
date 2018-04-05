import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Category} from './Category';
import {CategoryDto} from './CategoryDto';


@Injectable()
export class CategoriesService {
  shopId: string = localStorage.getItem('shopId');
  private categoriesUrl = environment.apiUrl + '/' + this.shopId + '/categories';

  constructor(private http: HttpClient) {
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
    return this.http.post(this.categoriesUrl + `/${id}?newName=${newName}&parentId=${parentId}`, 0);
  }
}
