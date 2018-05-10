import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CredentialsService} from '../-services/credentials.service';
import {environment} from '../../environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: CredentialsService) {
  }

  private static isBackendRequest(req) {
    return req.url.startsWith(environment.apiUrl);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isSignedIn() && AuthInterceptor.isBackendRequest(req)) {
      const authToken = this.auth.token();
      const authReq = req.clone({setHeaders: {Authorization: 'Bearer ' + authToken}});
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
