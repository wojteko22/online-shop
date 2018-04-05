import {Component, OnInit} from '@angular/core';
import {CredentialsService} from '../-services/credentials.service';

@Component({
  selector: 'app-customer',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private credentialsService : CredentialsService) {
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
    this.id = user.id.toString();
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;
    this.shop = user.shopId.toString();
  }
}
