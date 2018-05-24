import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Order} from '../orders/order';
import {OrderPosition} from '../order-details/order-position';
import {CreateOrderDto} from '../-models/create-order-dto';

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

  update(orderId: number, newStatus: string) {
    const body = {
      status: newStatus
    };
    return this.http.patch(this.ordersUrl + '/' + orderId, body);
  }

  addOrder(createOrderDto: CreateOrderDto) {
    return this.http.post(this.ordersUrl, createOrderDto);
  }
}
