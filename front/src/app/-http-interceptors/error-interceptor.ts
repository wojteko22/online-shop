import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {CredentialsService} from '../-services/credentials.service';
import {of} from 'rxjs/observable/of';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private credentialsService: CredentialsService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(this.createErrorHandler())
    );
  }

  private createErrorHandler() {
    return (error: HttpErrorResponse) => this.handle(error);
  }

  private handle(error: HttpErrorResponse) {
    ErrorInterceptor.logDetails(error);
    const errorBody = error.error;
    if (errorBody && errorBody.error == 'invalid_token') {
      return this.handleTokenExpiration();
    }
    const userFriendlyMessage = ErrorInterceptor.userFriendlyMessage(errorBody);
    return new ErrorObservable(userFriendlyMessage);
  }

  private static userFriendlyMessage(errorBody) {
    return ErrorInterceptor.receivedErrorMessage(errorBody) || 'Unknown error. Check console';
  }

  private static receivedErrorMessage(errorBody) {
    return errorBody && (errorBody.message || errorBody.error_description);
  }

  private static logDetails(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`Client-side error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
  }

  private handleTokenExpiration() {
    this.credentialsService.logOut();
    const emptyObject = {} as HttpEvent<any>;
    return of(emptyObject);
  }
}
