import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {CredentialsService} from '../../-services/credentials.service';

@Injectable()
export class SignedInGuard implements CanActivate {

  constructor(private credentialsService: CredentialsService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    return this.credentialsService.isSignedIn();
  }
}
