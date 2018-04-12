import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CredentialsService} from '../-services/credentials.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: CredentialsService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isSignedIn()) {
      const authToken = this.auth.token();
      const authReq = req.clone({setHeaders: {Authorization: 'Bearer ' + authToken}});
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
