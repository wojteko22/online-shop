import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {matchOtherValidator} from "../match-other.directive";
import {UserDto} from "../register/UserDto";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
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

  data() {
    return this.form.value as UserDto;
  }

  isValid() {
    return this.form.valid;
  }
}
