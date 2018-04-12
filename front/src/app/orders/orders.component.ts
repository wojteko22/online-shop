import {Component, OnInit} from '@angular/core';
import {Order} from './order';
import {Observable} from 'rxjs/Observable';
import {OrdersService} from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrdersService]
})
export class OrdersComponent implements OnInit {

  orders$: Observable<Order[]>;

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.orders$ = this.ordersService.getOrders();
  }

}
