import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatTabsModule,
  MatListModule,
  MatExpansionModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatSnackBarModule,
    MatListModule,
    MatExpansionModule
  ]
})
export class MaterialModule {
}
