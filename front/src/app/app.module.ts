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
import { UserComponent } from './user/user.component';
import { PasswordComponent } from './password/password.component';
import { CredentialsService } from './credentials.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterShopComponent } from './register-shop/register-shop.component';
import { CategoriesComponent } from './categories/categories.component';
import { TreeModule } from 'angular-tree-component';
import {SnackBarService} from './snack-bar.service';
import {HttpErrorHandler} from './http-error-handler.service';


@NgModule({
  declarations: [
    AppComponent,
    ShopsComponent,
    LoginComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    PasswordComponent,
    NotFoundComponent,
    RegisterUserComponent,
    RegisterShopComponent,
    CategoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    TreeModule,
  ],
  providers: [
    CredentialsService,
    SnackBarService,
    HttpErrorHandler,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
