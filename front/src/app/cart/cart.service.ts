import { Injectable } from '@angular/core';
import {Product} from "../-models/Product";
import {Shop} from "../shops/shop";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartPositions = new Set<CartPosition>();
  ordersUrl = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) { }

  addToCart(shop: Shop, product: Product, amount: number){
    this.cartPositions.add(new CartPosition(shop,product,amount))
  }

  postOrder(shop: Shop) {
    let orderPositionsDto: OrderPositionDto[] = [];
    this.cartPositions.forEach(it => {
      if (it.shop==shop){
        orderPositionsDto.push(new OrderPositionDto(it.product.id,it.amount));
      }
    });
    let createOrderDto = new CreateOrderDto(shop.id, orderPositionsDto);

    this.http.post(this.ordersUrl, createOrderDto).subscribe(res => console.log(JSON.stringify(res)));

    this.removeGivenShopPositions(shop);
  }

  removeGivenShopPositions(shop: Shop){
    let newCartPositions = new Set<CartPosition>();
    this.cartPositions.forEach(it => {
      if (it.shop!=shop){
        newCartPositions.add(it);
      }
    });
    this.cartPositions = newCartPositions;
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

export class OrderPositionDto {
  productId: number;
  amount: number;


  constructor(productId: number, amount: number) {
    this.productId = productId;
    this.amount = amount;
  }
}

export class CreateOrderDto {
  shopId: number;
  orderPositionsDto: Array<OrderPositionDto>;


  constructor(shopId: number, orderPositionsDto: Array<OrderPositionDto>) {
    this.shopId = shopId;
    this.orderPositionsDto = orderPositionsDto;
  }
}


