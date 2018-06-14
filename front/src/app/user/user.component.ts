import {Component, OnInit} from '@angular/core';
import {CredentialsService} from '../-services/credentials.service';
import {isNullOrUndefined} from 'util';
import {ShopsService} from "../shops/shops.service";
import {Shop} from "../shops/shop";

@Component({
  selector: 'app-customer',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  shopId: number;

  email: string;
  name: string;
  role: string;
  shop: Shop;
  id: string;

  constructor(private credentialsService: CredentialsService, private shopService: ShopsService) {
  }

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
        this.shopId = user.shopId;
        this.shopService.getShopInfo(this.shopId).subscribe(res => this.shop = res);
      }
    }
  }
}
