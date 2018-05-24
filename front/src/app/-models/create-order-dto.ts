import {OrderPositionDto} from '../cart/order-position-dto';

export class CreateOrderDto {

  constructor(public shopId: number, public userId: number, public orderPositionsDto: Array<OrderPositionDto>) {
  }
}
