import {Component} from '@angular/core';
import {CredentialsService} from './-services/credentials.service';

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
      visibility: Visibility.Always,
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
    {
      path: '/panel',
      label: 'Panel administracyjny',
      visibility: Visibility.Admin,
    },
  ];

  visible(visibility: Visibility) {
    switch (visibility) {
      case Visibility.SignedIn:
        return this.signedIn();
      case Visibility.SignedOut:
        return !this.signedIn();
      case Visibility.ShopOwner:
        // todo: To raczej hermetyzować w credentialsService
        return this.role() === 'SHOP_OWNER';
      case Visibility.Admin:
        return this.role() === 'ADMIN';
      default:
        return true;
    }
  }

  signedIn() {
    return this.credentialsService.isSignedIn();
  }

  private role() {
    const user = this.credentialsService.getUser();
    return user && user.role;
  }

  logOut() {
    this.credentialsService.logOut();
  }
}

enum Visibility {
  Always,
  SignedIn,
  SignedOut,
  ShopOwner,
  Admin,
}
