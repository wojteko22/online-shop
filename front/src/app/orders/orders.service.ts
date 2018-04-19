import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Order} from './order';
import {OrderPosition} from '../order-details/order-position';

@Injectable()
export class OrdersService {
  ordersUrl = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl);
  }

  getOrderDetails(orderId: number): Observable<OrderPosition[]> {
    return this.http.get<OrderPosition[]>(this.ordersUrl + '/' + orderId);
  }
}
