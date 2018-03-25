import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchOtherValidator } from '../register-owner/match-other.directive';
import {PasswordService} from "./password.service";
import {UpdateUserPassword} from "./updateUserPassword";
import {UserService} from "../user/user.service";
import {CredentialsService} from "../credentials.service";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  providers: [PasswordService, UserService]
})
export class PasswordComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private passSrv: PasswordService, private cSrv: CredentialsService) {
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
    let updateUserPassDto = this.form.value as UpdateUserPassword;

      updateUserPassDto.id=localStorage.getItem("userId");
      updateUserPassDto.oldPassword=this.form.value.oldProgram;
      updateUserPassDto.password=this.form.value.password;
      updateUserPassDto.passwordConfirmation=this.form.value.passwordConfirmation;
      console.log(JSON.stringify(updateUserPassDto));
      this.passSrv.changeUserPassword(updateUserPassDto).subscribe((result) =>
        console.log(result));

  }
}
