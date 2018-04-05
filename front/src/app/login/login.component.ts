import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {Credentials} from './credentials';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {CredentialsService} from '../-services/credentials.service';
import {TokenData} from '../-models/token';
import {User} from '../-models/User';
import {SnackBarService} from '../snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private snackBar: SnackBarService,
    private router: Router,
    private credentialsService: CredentialsService,
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const credentials = this.form.value as Credentials;
    this.loginService.login(credentials).subscribe(
      (tokenData: TokenData) => {
        this.saveToken(tokenData);
        this.loginService.getUserInfo().subscribe((user) => {
          this.saveUserDetails(user);
        }, error => this.snackBar.show(error))
      },
      error => this.snackBar.show(error)
    );
  }

  private saveToken(tokenData: TokenData) {
    this.credentialsService.saveToken(tokenData);
  }

  private saveUserDetails(user: User) {
    this.credentialsService.saveUser(user);
    this.router.navigate(['/profil']);
  }
}
