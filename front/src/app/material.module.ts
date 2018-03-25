import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatInputModule,
  MatRadioModule,
  MatSnackBarModule,
  MatTabsModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatSnackBarModule,
    MatRadioModule,
  ]
})
export class MaterialModule {
}
