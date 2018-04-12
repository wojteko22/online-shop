import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {CredentialsService} from '../-services/credentials.service';


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
    this.handleTokenExpiration(errorBody);
    return new ErrorObservable(errorBody && (errorBody.message || errorBody.error_description) || 'Unknown error. Check console');
  }

  private static logDetails(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`Client-side error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
  }

  private handleTokenExpiration(errorBody: any | null) {
    if (errorBody) {
      const errorType = errorBody.error;
      if (errorType == 'invalid_token') {
        this.credentialsService.logOut();
      }
    }
  }
}
