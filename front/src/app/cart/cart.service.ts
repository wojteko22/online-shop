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

  private cartPositions = new Set<CartPosition>();

  constructor(private http: HttpClient, private ordersService: OrderService, private credentialsService: CredentialsService) {
  }

  getCurrentUserPositions() {
    return Array.from(this.cartPositions).filter(position => position.userId === this.userId);
  }

  addToCart(shop: Shop, product: Product, amount: number) {
    const cartPosition = new CartPosition(shop, this.userId, product, amount);
    this.cartPositions.add(cartPosition);
  }

  private get userId() {
    return this.credentialsService.getUserId();
  }

  postOrder(shop: Shop) {
    const orderPositionDtos = this.getCurrentUserPositions()
      .filter(position => position.shop.id === shop.id)
      .map(position => new OrderPositionDto(position.product.id, position.amount));
    const userId = this.credentialsService.getUserId();
    const createOrderDto = new CreateOrderDto(userId, orderPositionDtos);
    this.ordersService.addOrder(shop.id, createOrderDto).subscribe();
    this.removeGivenShopPositions(shop); // TODO: Tak być nie powinno, bo request może się nie udać
  }

  private removeGivenShopPositions(shop: Shop) {
    const newCartPositions = Array.from(this.cartPositions)
      .filter(position => position.shop.id !== shop.id || position.userId !== this.userId);
    this.cartPositions = new Set(newCartPositions);
  }
}
