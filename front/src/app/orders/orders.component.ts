import {Component, OnInit} from '@angular/core';
import {Order} from './order';
import {Observable} from 'rxjs/Observable';
import {OrderService} from '../-services/order.service';
import {MatDialog} from '@angular/material';
import {OrderStatusComponent} from '../order-status/order-status.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {

  orders$: Observable<Order[]>;

  constructor(private ordersService: OrderService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.orders$ = this.ordersService.getOrders();
  }

  openDialog(order: Order): void {
    this.dialog.open(OrderStatusComponent, {
      width: '250px',
      data: order
    });
  }
}
