import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsComponent } from './shops/shops.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { SignedInGuard } from './-guards/signed-in/signed-in.guard';
import { PasswordComponent } from './password/password.component';
import { CategoriesComponent } from './categories/categories.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignedOutGuard } from './-guards/signed-out/signed-out-guard.service';
import {ShopOwnerGuard} from './-guards/shop-owner/shop-owner.guard';
import {CustomerGuard} from './-guards/customer/customer.guard';

const appRoutes: Routes = [
  {
    path: 'shops',
    component: ShopsComponent,
  },
  {
    path: 'profil',
    component: UserComponent,
    canActivate: [SignedInGuard],
  },
  {
    path: 'password',
    component: PasswordComponent,
    canActivate: [SignedInGuard]
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [SignedInGuard, ShopOwnerGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SignedOutGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [SignedOutGuard],
  },
  {
    path: '',
    redirectTo: '/shops',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [SignedInGuard, SignedOutGuard, ShopOwnerGuard, CustomerGuard],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {
}
