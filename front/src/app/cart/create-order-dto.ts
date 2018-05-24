import {OrderPositionDto} from './order-position-dto';

export class CreateOrderDto {
  shopId: number;
  orderPositionsDto: Array<OrderPositionDto>;

  constructor(shopId: number, orderPositionsDto: Array<OrderPositionDto>) {
    this.shopId = shopId;
    this.orderPositionsDto = orderPositionsDto;
  }
}
