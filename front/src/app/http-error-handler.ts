import {HttpErrorResponse} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

export function handleHttpError(error: HttpErrorResponse) {
  logDetails(error);
  return new ErrorObservable(error.error && error.error.message || error.error.error_description || 'Unknown error. Check console');
}

function logDetails(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.error(`Client-side error occurred: ${error.error.message}`);
  } else {
    console.error(`Backend returned code ${error.status}, body was: `, error.error);
  }
}
