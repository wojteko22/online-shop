import { Component } from '@angular/core';
import { CredentialsService } from './credentials.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private credentialsService: CredentialsService, private router: Router) {
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
      path: "/password",
      label: "Zmiana hasła",
      visibility: Visibility.SignedIn,
    },
    {
      path: '/register',
      label: 'Zarejestruj się',
      visibility: Visibility.SignedOut,
    },
    {
      path: '/categories',
      label: 'Kategorie',
      visibility: Visibility.SignedIn,
    },
  ];

  visible(visibility: Visibility) {
    if (visibility === Visibility.SignedIn) {
      return this.signedIn();
    }
    if (visibility === Visibility.SignedOut) {
      return !this.signedIn();
    }
    return true;
  }

  signedIn() {
    return this.credentialsService.isSignedIn();
  }

  logOut() {
    this.credentialsService.logOut();
    this.router.navigate(['/login']);
  }
}

enum Visibility {
  SignedIn,
  SignedOut,
}
