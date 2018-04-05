import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchOtherValidator } from '../match-other.directive';
import {PasswordService} from "./password.service";
import {UpdateUserPassword} from "./updateUserPassword";
import {CredentialsService} from "../-services/credentials.service";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  providers: [PasswordService]
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
      this.passSrv.changeUserPassword(updateUserPassDto).subscribe((result) => console.log(result));
  }
}
