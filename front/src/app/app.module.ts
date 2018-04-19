import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {ShopsComponent} from './shops/shops.component';
import {AppRoutingModule} from './app-rounting.module';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from './register/register.component';
import {UserComponent} from './user/user.component';
import {PasswordComponent} from './password/password.component';
import {CredentialsService} from './-services/credentials.service';
import {NotFoundComponent} from './not-found/not-found.component';
import {RegisterUserComponent} from './register-user/register-user.component';
import {RegisterShopComponent} from './register-shop/register-shop.component';
import {CategoriesComponent} from './categories/categories.component';
import {TreeModule} from 'angular-tree-component';
import {SnackBarService} from './snack-bar.service';
import {AddProductComponent} from './products/add-product/add-product.component';
import {ProductsComponent} from './products/products/products/products.component';
import {ProductComponent} from './products/product/product/product.component';
import {httpInterceptorProviders} from './-http-interceptors';
import {OrdersComponent} from './orders/orders.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {OrdersService} from './orders/orders.service';
import {GmapComponent} from './gmap/gmap.component';
import {AgmCoreModule} from '@agm/core';
import {GmapService} from './gmap/gmap.service';
import {OrderStatusComponent} from './order-status/order-status.component';


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
    OrdersComponent,
    OrderDetailsComponent,
    AddProductComponent,
    ProductsComponent,
    ProductComponent,
    GmapComponent,
    OrderStatusComponent,
  ],
  entryComponents: [
    OrderStatusComponent,
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCKAHTz4KvsPHmiQpK-5ew5eq17VO7bOxM'
    }),
  ],
  providers: [
    CredentialsService,
    SnackBarService,
    httpInterceptorProviders,
    OrdersService,
    GmapService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
