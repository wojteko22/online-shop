import {Injectable} from '@angular/core';
import {Product} from '../-models/Product';
import {Shop} from '../shops/shop';
import {HttpClient} from '@angular/common/http';
import {CartPosition} from './cart-position';
import {CreateOrderDto} from '../-models/create-order-dto';
import {OrderPositionDto} from './order-position-dto';
import {OrderService} from '../-services/order.service';
import {CredentialsService} from '../-services/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartPositions = new Set<CartPosition>();

  constructor(private http: HttpClient, private ordersService: OrderService, private credentialsService: CredentialsService) {
  }

  addToCart(shop: Shop, product: Product, amount: number) {
    this.cartPositions.add(new CartPosition(shop, product, amount));
  }

  postOrder(shop: Shop) {
    const orderPositionDtos = Array.from(this.cartPositions)
      .filter(position => position.shop === shop)
      .map(position => new OrderPositionDto(position.product.id, position.amount));
    const userId = this.credentialsService.getUserId();
    const createOrderDto = new CreateOrderDto(shop.id, userId, orderPositionDtos);
    this.ordersService.addOrder(createOrderDto).subscribe();
    this.removeGivenShopPositions(shop); // TODO: Tak być nie powinno, bo request może się nie udać
  }

  private removeGivenShopPositions(shop: Shop) {
    const newCartPositions = Array.from(this.cartPositions)
      .filter(position => position.shop !== shop);
    this.cartPositions = new Set(newCartPositions);
  }
}
