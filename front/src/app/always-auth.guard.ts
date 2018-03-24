import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CredentialsService } from './credentials.service';

@Injectable()
export class AlwaysAuthGuard implements CanActivate {

  constructor(private credentialsService: CredentialsService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.credentialsService.isSignedIn();
  }
}
