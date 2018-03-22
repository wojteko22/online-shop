import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatInputModule,
  MatTabsModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
  ]
})
export class MaterialModule {
}
