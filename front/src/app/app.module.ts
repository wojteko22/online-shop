import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ShopsComponent } from './shops/shops.component';
import { AppRoutingModule } from './app-rounting.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterOwnerComponent } from './register-owner/register-owner.component';
import { CustomerComponent } from './customer/customer.component';
import { PasswordComponent } from './password/password.component';
import { CredentialsService } from './credentials.service';
import { CategoriesComponent } from './categories/categories.component';


@NgModule({
  declarations: [
    AppComponent,
    ShopsComponent,
    LoginComponent,
    RegisterOwnerComponent,
    LoginComponent,
    CustomerComponent,
    PasswordComponent,
    CategoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [CredentialsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
