import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {CredentialsService} from '../../-services/credentials.service';

@Injectable()
export class CustomerGuard implements CanActivate {

  constructor(private credentialsService: CredentialsService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.credentialsService.getUser().role === 'CUSTOMER';
  }

}
