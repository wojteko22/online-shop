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

  constructor(private orderService: OrderService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.orders$ = this.orderService.getOrders();
  }

  openDialog(order: Order): void {
    const dialogRef = this.dialog.open(OrderStatusComponent, {
      width: '250px',
      data: order
    });
    dialogRef.afterClosed().subscribe(newStatus => this.orderService.updateStatus(order.id, newStatus).subscribe());
  }
}
