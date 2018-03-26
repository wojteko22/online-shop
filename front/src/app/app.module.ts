import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ShopsComponent } from './shops/shops.component';
import { AppRoutingModule } from './app-rounting.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { CustomerComponent } from './customer/customer.component';
import { PasswordComponent } from './password/password.component';
import { CredentialsService } from './credentials.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterShopComponent } from './register-shop/register-shop.component';


@NgModule({
  declarations: [
    AppComponent,
    ShopsComponent,
    LoginComponent,
    RegisterComponent,
    LoginComponent,
    CustomerComponent,
    PasswordComponent,
    NotFoundComponent,
    RegisterUserComponent,
    RegisterShopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [CredentialsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
