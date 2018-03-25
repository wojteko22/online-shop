import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchOtherValidator } from './match-other.directive';
import {RegisterService} from "./register.service";
import {UserDto} from "./UserDto";

@Component({
  selector: 'app-register-owner',
  templateUrl: './register-owner.component.html',
  styleUrls: ['./register-owner.component.css'],
  providers: [RegisterService]
})
export class RegisterOwnerComponent implements OnInit {
  form: FormGroup;
  status: string;
  constructor(private fb: FormBuilder, private registerService: RegisterService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [matchOtherValidator('password')]],
    });
  }

  onSubmit() {
    const value = this.form.value;
    let user = this.form.value as UserDto;
    user.role = "CUSTOMER";

    this.registerService.register(user).subscribe((response) => {
      if(response.status==200){
        this.status='Zarejestrowano pomyślnie!';
      }
    });
  }
}
