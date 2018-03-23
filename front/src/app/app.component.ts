import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navLinks = [
    {
      path: "/shops",
      label: "Sklepy"
    },
    {
      path: "/login",
      label: "Zaloguj się"
    },
    {
      path: "/register",
      label: "Zarejestruj się"
    },
    {
      path: "/profil",
      label: "Profil"
    }
  ]
}
