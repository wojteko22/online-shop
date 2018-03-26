import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Credentials } from './credentials';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CredentialsService } from '../credentials.service';
import { TokenData } from '../token';

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
    private snackBar: MatSnackBar,
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
      error => this.handleError(error)
    );
  }

  private saveToken(tokenData: TokenData) {
    this.credentialsService.saveToken(tokenData);
    this.router.navigate(['/profil']);
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage = this.errorMesssage(error);
    this.snackBar.open(errorMessage, null, {
      duration: 3000
    });
  }

  private errorMesssage(error: HttpErrorResponse) {
    if (error.error.error_description === 'Bad credentials') {
      return 'Niepoprawne hasło';
    }
    if (error.error.error_description === 'Username not found') {
      return 'Użytkownik z takim mailem nie istnieje';
    }
    console.log(error);
    return 'Nieoczekiwany błąd podczas logowania';
  }
}
