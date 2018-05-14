import {Injectable} from '@angular/core';
import {User} from '../-models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  user: User;

  signInAs(user: User) {
    this.user = user;
  }

  get pretending(): boolean {
    return this.user != null;
  }

  get userEmail() {
    return this.user.email;
  }

  clear() {
    this.user = null;
  }
}
