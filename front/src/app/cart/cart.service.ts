import { Injectable } from '@angular/core';
import {Product} from "../-models/Product";
import {Shop} from "../shops/shop";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartPositions = new Set<CartPosition>();


  constructor() { }

  addToCart(shop: Shop, product: Product, amount: number){
    this.cartPositions.add(new CartPosition(shop,product,amount))
  }

}

export class CartPosition{
  shop: Shop;
  product: Product;
  amount: number;


  constructor(shop: Shop, product: Product, amount: number) {
    this.shop = shop;
    this.product = product;
    this.amount = amount;
  }
}
