import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {Credentials} from './credentials';
import {Router} from '@angular/router';
import {CredentialsService} from '../credentials.service';
import {TokenData} from '../token';
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
      (tokenData: TokenData) => this.saveToken(tokenData),
      error => this.snackBar.show(error)
    );
  }

  private saveToken(tokenData: TokenData) {
    this.credentialsService.saveToken(tokenData);
    this.router.navigate(['/profil']);
  }
}
