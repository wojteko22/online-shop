import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Order} from './order';
import {of} from 'rxjs/observable/of';

@Injectable()
export class OrdersService {
  ordersUrl = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    // todo:
    return of([
      {
        id: 1,
        status: 'jakiś'
      },
      {
        id: 2,
        status: 'jakiś'
      },
    ]);
    // return this.http.get<Order[]>(this.ordersUrl);
  }
}
