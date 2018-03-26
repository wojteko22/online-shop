import { Shop } from '../register-shop/shop';
import { UserDto } from './UserDto';

export class ShopWithOwner {
  shop: Shop;
  owner: UserDto;
}
