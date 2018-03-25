import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RegisterService} from "./register.service";
import {RegisterUserComponent} from "../register-user/register-user.component";

@Component({
  selector: 'app-register-owner',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  status: string;
  @ViewChild(RegisterUserComponent)
  private registerUserComponent: RegisterUserComponent;

  constructor(private fb: FormBuilder, private registerService: RegisterService) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.registerUserComponent.form;
  }

  onSubmit() {
    const user = this.registerUserComponent.data();
    user.role = "CUSTOMER";

    this.registerService.register(user).subscribe((response) => {
      if (response.status == 200) {
        this.status = 'Zarejestrowano pomyślnie!';
      }
    });
  }
}
