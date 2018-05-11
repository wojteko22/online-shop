import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CredentialsService} from '../../-services/credentials.service';

@Injectable()
export class ShopOwnerGuard implements CanActivate {

  constructor(private credentialsService: CredentialsService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.credentialsService.isShopOwner();
  }
}
