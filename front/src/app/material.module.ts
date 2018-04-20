import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatInputModule,
  MatListModule,
  MatGridListModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatSnackBarModule,
    MatRadioModule,
    MatExpansionModule,
    MatSelectModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule
  ]
})
export class MaterialModule {
}
