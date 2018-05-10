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

  getGivenShopPositions(shop: Shop): Set<CartPosition>{
    let result = new Set<CartPosition>();
    this.cartPositions.forEach(it => {
      if (it.shop==shop){
        result.add(it);
      }
    });
    return result;
  }

  getOverallPrice(): number{
    let result = 0;
    this.cartPositions.forEach(it => result += it.product.price * it.amount);
    return result;
  }

  getPriceForShop(shop: Shop): number{
    let result = 0;
    this.cartPositions.forEach(it => {
      if (it.shop==shop) {
        result += it.product.price * it.amount;
      }
    });
    return result;
  }

  postOrder(){
    this.cartService.postOrder();
  }

}
