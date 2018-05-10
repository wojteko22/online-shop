import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {CredentialsService} from '../../-services/credentials.service';

@Injectable()
export class SignedInGuard implements CanActivate {

  constructor(private credentialsService: CredentialsService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    if (!this.credentialsService.isSignedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
