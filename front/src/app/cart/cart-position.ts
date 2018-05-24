import {Product} from '../-models/Product';
import {Shop} from '../shops/shop';

export class CartPosition {
  shop: Shop;
  product: Product;
  amount: number;

  constructor(shop: Shop, product: Product, amount: number) {
    this.shop = shop;
    this.product = product;
    this.amount = amount;
  }
}
