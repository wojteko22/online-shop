import {Component, OnInit} from '@angular/core';
import {CartService} from './cart.service';
import {Shop} from '../shops/shop';
import {CartPosition} from './cart-position';
import * as _ from 'lodash';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartPositions: CartPosition[];
  shops: Shop[];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.cartPositions = this.cartService.getCurrentUserPositions();
    this.shops = _.uniqWith(this.cartPositions.map(position => position.shop), _.isEqual);
  }

  getGivenShopPositions(shop: Shop): CartPosition[] {
    return this.cartPositions.filter(it => it.shop.id === shop.id);
  }

  getOverallPrice(): number {
    return this.cartPositions.reduce((prev, curr) => prev + curr.product.price * curr.amount, 0);
  }

  getPriceForShop(shop: Shop): number {
    return this.cartPositions
      .filter(position => position.shop.id === shop.id)
      .reduce((prev, curr) => prev + curr.product.price * curr.amount, 0);
  }

  onSubmit(shop: Shop = null) {
    if (shop == null) {
      this.shops.forEach(it => this.cartService.postOrder(it));
    } else {
      this.cartService.postOrder(shop);
    }
    this.init();
  }
}
