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
import {OrderService} from './-services/order.service';
import {GmapComponent} from './gmap/gmap.component';
import {AgmCoreModule} from '@agm/core';
import {GmapService} from './gmap/gmap.service';
import {OrderStatusComponent} from './order-status/order-status.component';
import {ShopProductsComponent} from './products/shop-products/shop-products.component';
import {CategoryItemComponent} from './products/shop-products/category-item/category-item.component';
import {SelectCategoryService} from './products/shop-products/select-category.service';
import {ProductDialogComponent} from './products/shop-products/product-dialog/product-dialog.component';
import {CategoriesService} from './categories/categories.service';
import {ProductService} from './-services/product.service';
import {ProductEditComponent} from './products/product-edit/product-edit.component';


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
    ShopProductsComponent,
    CategoryItemComponent,
    ProductDialogComponent,
    ProductEditComponent,
  ],
  entryComponents: [
    OrderStatusComponent,
    ShopProductsComponent,
    CategoryItemComponent,
    ProductDialogComponent,
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
    OrderService,
    GmapService,
    SelectCategoryService,
    CategoriesService,
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
