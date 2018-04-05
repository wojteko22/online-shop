import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from '../match-other.directive';
import {PasswordService} from './password.service';
import {UpdateUserPassword} from './updateUserPassword';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  providers: [PasswordService, UserService]
})
export class PasswordComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private passSrv: PasswordService) {
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
    const id = localStorage.getItem('userId');
    const updateUserPassDto = {...this.form.value, id: id} as UpdateUserPassword;
    this.passSrv.changeUserPassword(updateUserPassDto).subscribe();
  }
}
