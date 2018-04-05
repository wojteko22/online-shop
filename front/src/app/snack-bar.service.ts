import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  show(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }
}
