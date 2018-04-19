import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../-services/order.service';
import {OrderPosition} from './order-position';
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

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderPositions$ = this.orderService.getOrderDetails(this.orderId);
  }
}
