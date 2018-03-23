import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchOtherValidator } from '../register-owner/match-other.directive';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.fb.group({
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [matchOtherValidator('password')]],
    });
  }

  onSubmit() {
    const value = this.form.value;
    console.log(value);
  }
}
