import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegisterService } from './register.service';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { RegisterShopComponent } from '../register-shop/register-shop.component';
import { UserDto } from './UserDto';
import { ShopWithOwner } from './shop-with-owner';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-owner',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
  status: string;
  @ViewChild(RegisterUserComponent)
  private registerUserComponent: RegisterUserComponent;
  @ViewChild(RegisterShopComponent)
  private registerShopComponent: RegisterShopComponent;
  roles = ['klient', 'sklep'];
  selectedRole: string = this.roles[0];

  constructor(private fb: FormBuilder, private registerService: RegisterService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  isValid() {
    if (this.isShop()) {
      return this.registerUserComponent.isValid() && this.registerShopComponent.isValid();
    }
    return this.registerUserComponent.isValid();
  }

  isShop() {
    return this.selectedRole === this.roles[1];
  }

  onSubmit() {
    const user = this.registerUserComponent.data();
    const response$ = this.prepareProperRequest(user);
    response$.subscribe(
      () => this.status = 'Zarejestrowano pomyślnie!',
      error => this.handle(error)
    );
  }

  private prepareProperRequest(user: UserDto) {
    if (this.isShop()) {
      return this.createShop(user);
    }
    return this.createUser(user);
  }

  private createShop(user: UserDto) {
    user.role = 'SHOP_OWNER';
    const shopWithOwner: ShopWithOwner = {
      shop: this.registerShopComponent.data(),
      owner: user
    };
    return this.registerService.registerShop(shopWithOwner);
  }

  private createUser(user: UserDto) {
    user.role = 'CUSTOMER';
    return this.registerService.register(user);
  }

  private handle(error: HttpErrorResponse) {
    this.snackBar.open(error.error.message, null, {
      duration: 3000
    });
  }
}
