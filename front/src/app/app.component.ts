import {Component} from '@angular/core';
import {CredentialsService} from './-services/credentials.service';
import {AdminService} from './-services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private credentialsService: CredentialsService, private adminService: AdminService) {
  }

  navLinks = [
    {
      path: '/shops',
      label: 'Sklepy',
      visibility: Visibility.Customer,
    },
    {
      path: '/cart',
      label: 'Koszyk',
      visibility: Visibility.SignedIn,
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

  get adminPretending() {
    return this.adminService.pretending;
  }

  get pretendedUserEmail() {
    return this.adminService.userEmail;
  }

  visible(visibility: Visibility) {
    switch (visibility) {
      case Visibility.SignedIn:
        return this.signedIn();
      case Visibility.SignedOut:
        return !this.signedIn();
      case Visibility.ShopOwner:
        return this.credentialsService.isShopOwner();
      case Visibility.Admin:
        return this.credentialsService.isAdmin();
      case Visibility.Customer:
        return this.credentialsService.isCustomer();
      default:
        return true;
    }
  }

  signedIn() {
    return this.credentialsService.isSignedIn();
  }

  logOut() {
    this.credentialsService.logOut();
  }
}

enum Visibility {
  SignedIn,
  SignedOut,
  ShopOwner,
  Admin,
  Customer,
}
