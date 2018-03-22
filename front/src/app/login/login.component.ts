import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Credentials } from './credentials';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: LoginService, private snackBar: MatSnackBar) {
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
    this.service.login(credentials).subscribe(
      result => console.log(result),
      error => this.handleError(error)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error.error_description === 'Bad credentials') {
      this.snackBar.open('Takie konto nie istnieje', null, {
        duration: 3000
      });
    }
  }
}
