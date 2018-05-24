import {Product} from '../-models/Product';
import {Shop} from '../shops/shop';

export class CartPosition {

  constructor(public shop: Shop, public userId: number, public product: Product, public amount: number) {
  }
}
