import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatTabsModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatSnackBarModule,
  ]
})
export class MaterialModule {
}
