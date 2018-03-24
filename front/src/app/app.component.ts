import { Component } from '@angular/core';
import { CredentialsService } from './credentials.service';

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
      visible: true,
    },
    {
      path: '/login',
      label: 'Zaloguj się',
      onlyForSignedOut: true,
    },
    {
      path: '/register',
      label: 'Zarejestruj się',
      onlyForSignedOut: true,
    },
  ];

  visible(forSignedOut: boolean) {
    if (forSignedOut) {
      return !this.signedIn();
    }
    return true;
  }

  signedIn() {
    return this.credentialsService.isSignedIn();
  }

  logOut() {
    this.credentialsService.logOut();
  }
}
