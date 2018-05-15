import {Component, OnInit} from '@angular/core';
import {CredentialsService} from '../-services/credentials.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-customer',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private credentialsService: CredentialsService) {
  }

  email: string;
  name: string;
  role: string;
  shop: string;
  id: string;

  ngOnInit() {
    this.fillFields();
  }

  private fillFields() {
    const user = this.credentialsService.getUser();
    if (user != null) {
      this.id = user.id.toString();
      this.email = user.email;
      this.name = user.name;
      this.role = user.role;
      if (!isNullOrUndefined(user.shopId)) {
        this.shop = user.shopId.toString();
      }
    }
  }
}
