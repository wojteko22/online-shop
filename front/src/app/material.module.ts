import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatInputModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
  ]
})
export class MaterialModule {
}
