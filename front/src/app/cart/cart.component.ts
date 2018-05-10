import { Component, OnInit } from '@angular/core';
import {CartPosition, CartService} from "./cart.service";
import {Shop} from "../shops/shop";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartPositions: Set<CartPosition>;
  shops = new Set<Shop>();

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartPositions = this.cartService.cartPositions;
    this.cartPositions.forEach(it => this.shops.add(it.shop))
  }

}
