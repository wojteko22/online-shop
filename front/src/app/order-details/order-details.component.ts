import {Component, Input, OnInit} from '@angular/core';
import {OrdersService} from '../orders/orders.service';
import {OrderPosition} from '../orders/order-position';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  @Input()
  orderId: number;
  orderPositions$: Observable<OrderPosition[]>;

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.orderPositions$ = this.ordersService.getOrderDetails(this.orderId);
  }
}
