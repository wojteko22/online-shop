import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatInputModule,
  MatRadioModule,
  MatSnackBarModule,
  MatTabsModule,
  MatExpansionModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatSnackBarModule,
    MatRadioModule,
    MatExpansionModule
  ]
})
export class MaterialModule {
}
