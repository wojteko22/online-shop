import {Component} from '@angular/core';
import {CredentialsService} from './-services/credentials.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private credentialsService: CredentialsService) {
  }

  navLinks = [
    {
      path: '/shops',
      label: 'Sklepy',
    },
    {
      path: '/profil',
      label: 'Profil',
      visibility: Visibility.SignedIn,
    },
    {
      path: '/login',
      label: 'Zaloguj się',
      visibility: Visibility.SignedOut,
    },
    {
      path: '/password',
      label: 'Zmiana hasła',
      visibility: Visibility.SignedIn,
    },
    {
      path: '/register',
      label: 'Zarejestruj się',
      visibility: Visibility.SignedOut,
    },
    {
      path: '/orders',
      label: 'Zamówienia',
      visibility: Visibility.ShopOwner,
    },
    {
      path: '/categories',
      label: 'Kategorie',
      visibility: Visibility.ShopOwner,
    },
    {
      path: '/products',
      label: 'Produkty',
      visibility: Visibility.ShopOwner,
    },
  ];

  visible(visibility: Visibility) {
    if (visibility === Visibility.SignedIn) {
      return this.signedIn();
    }
    if (visibility === Visibility.SignedOut) {
      return !this.signedIn();
    }
    if (visibility === Visibility.ShopOwner) {
      return this.role() === 'SHOP_OWNER';
    }
    return true;
  }

  signedIn() {
    return this.credentialsService.isSignedIn();
  }

  role() {
    let user = this.credentialsService.getUser();
    if (isNullOrUndefined(user)) {
      return '';
    }
    return user.role;
  }

  logOut() {
    this.credentialsService.logOut();
  }
}

enum Visibility {
  SignedIn,
  SignedOut,
  ShopOwner
}
