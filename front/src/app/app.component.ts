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
      label: 'Sklepy'
    },
    {
      path: '/login',
      label: 'Zaloguj się'
    },
    {
      path: '/register',
      label: 'Zarejestruj się'
    },
    {
      path: '/profil',
      label: 'Profil'
    }
  ];

  logOut() {
    this.credentialsService.logOut();
  }
}
