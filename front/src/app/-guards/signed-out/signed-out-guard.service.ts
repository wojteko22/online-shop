import {Injectable} from '@angular/core';
import {CredentialsService} from '../../-services/credentials.service';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class SignedOutGuard implements CanActivate {

  constructor(private credentialsService: CredentialsService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !this.credentialsService.isSignedIn();
  }
}
