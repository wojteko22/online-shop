import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsComponent } from './shops/shops.component';
import {LoginComponent} from "./login/login.component";
import {CustomerComponent} from "./customer/customer.component";
import {AlwaysAuthGuard} from "./always-auth.guard";
import { RegisterOwnerComponent } from './register-owner/register-owner.component';

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
    component: CustomerComponent,
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
