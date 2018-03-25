import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegisterService } from './register.service';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { RegisterShopComponent } from '../register-shop/register-shop.component';

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

  constructor(private fb: FormBuilder, private registerService: RegisterService) {
  }

  ngOnInit() {
  }

  isValid() {
    if (this.isShop()) { // todo: W dzieciach zrobić
      return this.registerUserComponent.form.valid && this.registerShopComponent.form.valid;
    }
    return this.registerUserComponent.form.valid;
  }

  isShop() {
    return this.selectedRole === this.roles[1];
  }

  onSubmit() {
    const user = this.registerUserComponent.data();
    user.role = 'CUSTOMER';

    this.registerService.register(user).subscribe((response) => {
      if (response.status == 200) {
        this.status = 'Zarejestrowano pomyślnie!';
      }
    });
  }
}
