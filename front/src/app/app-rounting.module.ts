import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsComponent } from './shops/shops.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {CustomerComponent} from "./customer/customer.component";
import {AlwaysAuthGuard} from "./always-auth.guard";
import { PasswordComponent } from './password/password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {SignedOutGuard} from "./signed-out-guard.service";

const appRoutes: Routes = [
  {
    path: 'shops',
    component: ShopsComponent,
  },
  {
    path: 'profil',
    component: CustomerComponent,
    canActivate: [AlwaysAuthGuard],
  },
  {
    path: 'password',
    component: PasswordComponent,
    canActivate: [AlwaysAuthGuard],
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
  providers: [AlwaysAuthGuard, SignedOutGuard],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {
}
