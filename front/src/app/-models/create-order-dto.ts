import {OrderPositionDto} from '../cart/order-position-dto';

export class CreateOrderDto {

  constructor(public userId: number, public orderPositionsDto: Array<OrderPositionDto>) {
  }
}
