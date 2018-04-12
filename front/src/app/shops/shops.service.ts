import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ShopDto} from './ShopDto';
import {environment} from '../../environments/environment';

@Injectable()
export class ShopsService {
  shopsUrl = environment.apiUrl + '/shops';

  constructor(private http: HttpClient) {
  }

  getShops(): Observable<ShopDto[]> {
    return this.http.get<ShopDto[]>(this.shopsUrl);
  }
}
