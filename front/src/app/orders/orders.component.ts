import {Component, OnInit} from '@angular/core';
import {Order} from './order';
import {Observable} from 'rxjs/Observable';
import {OrdersService} from './orders.service';
import {MatDialog} from '@angular/material';
import {OrderStatusComponent} from '../order-status/order-status.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {

  orders$: Observable<Order[]>;

  constructor(private ordersService: OrdersService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.orders$ = this.ordersService.getOrders();
  }

  openDialog(): void {
    this.dialog.open(OrderStatusComponent, {
      width: '250px',
      data: {name: 'aa', animal: 'bb'}
    });
  }
}
