import {Injectable} from '@angular/core';
import {Product} from '../-models/Product';
import {Shop} from '../shops/shop';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CartPosition} from './cart-position';
import {CreateOrderDto} from './create-order-dto';
import {OrderPositionDto} from './order-position-dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartPositions = new Set<CartPosition>();
  ordersUrl = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) {
  }

  addToCart(shop: Shop, product: Product, amount: number) {
    this.cartPositions.add(new CartPosition(shop, product, amount));
  }

  postOrder(shop: Shop) {
    const orderPositionDtos: OrderPositionDto[] = [];
    this.cartPositions.forEach(it => {
      if (it.shop == shop) {
        orderPositionDtos.push(new OrderPositionDto(it.product.id, it.amount));
      }
    });
    const createOrderDto = new CreateOrderDto(shop.id, orderPositionDtos);

    this.http.post(this.ordersUrl, createOrderDto).subscribe(res => console.log(JSON.stringify(res)));

    this.removeGivenShopPositions(shop);
  }

  private removeGivenShopPositions(shop: Shop) {
    const newCartPositions = new Set<CartPosition>();
    this.cartPositions.forEach(it => {
      if (it.shop != shop) {
        newCartPositions.add(it);
      }
    });
    this.cartPositions = newCartPositions;
  }
}
