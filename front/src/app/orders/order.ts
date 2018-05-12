import {User} from '../-models/User';

export class Order {
  id: number;
  status: string;
  user: User;
}
