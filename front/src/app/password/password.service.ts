import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CredentialsService} from '../credentials.service';
import {UpdateUserPassword} from './updateUserPassword';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError} from 'rxjs/operators';

@Injectable()
export class PasswordService {

  constructor(private http: HttpClient, private credentialsService: CredentialsService) {
  }

  changeUserPassword(updateUserPassword: UpdateUserPassword) {
    const url = environment.apiUrl + '/user/password';
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.credentialsService.token()
    });
    return this.http.put(url, updateUserPassword, {headers: headers}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`Client-side error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return new ErrorObservable(error.error && error.error.message || 'Unknown error');
  };
}
