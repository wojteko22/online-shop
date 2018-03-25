import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsComponent } from './shops/shops.component';
import { LoginComponent } from './login/login.component';
import { RegisterOwnerComponent } from './register-owner/register-owner.component';
import {UserComponent} from "./user/user.component";
import {AlwaysAuthGuard} from "./always-auth.guard";
import { PasswordComponent } from './password/password.component';
import {CategoriesComponent} from "./categories/categories.component";

const appRoutes: Routes = [
  {
    path: 'shops',
    component: ShopsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profil',
    component: UserComponent,
    canActivate: [AlwaysAuthGuard]
  },
  {
    path: 'password',
    component: PasswordComponent,
    canActivate: [AlwaysAuthGuard]
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AlwaysAuthGuard]
  },
  {
    path: 'register',
    component: RegisterOwnerComponent,
  },
  {
    path: '',
    redirectTo: '/shops',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [AlwaysAuthGuard],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {
}
