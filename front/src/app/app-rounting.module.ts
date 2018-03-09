import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsComponent } from './shops/shops.component';

const appRoutes: Routes = [
  {
    path: 'shops',
    component: ShopsComponent,
  },
  { path: '',   redirectTo: '/shops', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
