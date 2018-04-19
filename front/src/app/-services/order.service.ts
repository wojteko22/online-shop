import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Order} from '../orders/order';
import {OrderPosition} from '../order-details/order-position';

@Injectable()
export class OrderService {
  ordersUrl = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl);
  }

  getOrderDetails(orderId: number): Observable<OrderPosition[]> {
    return this.http.get<OrderPosition[]>(this.ordersUrl + '/' + orderId);
  }

  updateStatus(orderId: number, newStatus: string) {
    return this.http.patch(this.ordersUrl + '/' + orderId, newStatus);
  }
}
