import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Order} from '../orders/order';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
  status: string;

  constructor(@Inject(MAT_DIALOG_DATA) private order: Order) {
    this.status = order.status;
  }

  ngOnInit() {
  }
}
