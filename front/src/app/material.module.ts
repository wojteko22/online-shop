import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatGridListModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule,
  MatDialogModule,
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
    MatIconModule,
    MatDialogModule,
  ]
})
export class MaterialModule {
}
