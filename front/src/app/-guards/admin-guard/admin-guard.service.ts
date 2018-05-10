import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {CredentialsService} from '../../-services/credentials.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private credentialsService: CredentialsService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.credentialsService.getUser().role === 'ADMIN';
  }
}
