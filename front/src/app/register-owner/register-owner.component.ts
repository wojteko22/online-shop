import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchOtherValidator } from './match-other.directive';

@Component({
  selector: 'app-register-owner',
  templateUrl: './register-owner.component.html',
  styleUrls: ['./register-owner.component.css']
})
export class RegisterOwnerComponent implements OnInit {
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

  onSubmit() {
    const value = this.form.value;
    console.log(value);
  }
}
