import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Shop} from './shop';
import {environment} from '../../environments/environment';

@Injectable()
export class ShopsService {
  shopsUrl = environment.apiUrl + '/shops';

  constructor(private http: HttpClient) {
  }

  getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.shopsUrl);
  }

  getShopInfo(shopId: any) {
    return this.http.get<Shop>(this.shopsUrl+"/"+shopId);
  }
}
