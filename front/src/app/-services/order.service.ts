import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Order} from '../orders/order';
import {OrderPosition} from '../order-details/order-position';
import {CreateOrderDto} from '../-models/create-order-dto';
import {CredentialsService} from './credentials.service';

@Injectable()
export class OrderService {

  private get ordersUrlForOwner() {
    const shopId = this.auth.getShopId();
    return OrderService.getOrdersUrl(shopId);
  }

  private static getOrdersUrl(shopId: number) {
    return `${environment.apiUrl}/shops/${shopId}/orders`;
  }

  constructor(private http: HttpClient, private auth: CredentialsService) {
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrlForOwner);
  }

  getOrderDetails(orderId: number): Observable<OrderPosition[]> {
    return this.http.get<OrderPosition[]>(this.ordersUrlForOwner + '/' + orderId);
  }

  update(orderId: number, newStatus: string) {
    const body = {
      status: newStatus
    };
    return this.http.patch(this.ordersUrlForOwner + '/' + orderId, body);
  }

  addOrder(shopId: number, createOrderDto: CreateOrderDto) {
    const url = OrderService.getOrdersUrl(shopId);
    return this.http.post(url, createOrderDto);
  }
}
