import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from '../match-other.directive';
import {UpdateUserPassword} from './updateUserPassword';
import {SnackBarService} from '../snack-bar.service';
import {CredentialsService} from '../-services/credentials.service';
import {UserService} from '../-services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: SnackBarService,
    private credentials: CredentialsService,
  ) {
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
    const id = this.credentials.getUserId();
    const updateUserPassDto = this.form.value as UpdateUserPassword;
    this.userService.changeUserPassword(id, updateUserPassDto).subscribe(
      () => this.snackBar.show('Hasło zmienione pomyślnie'),
      error => this.snackBar.show(error)
    );
  }
}
