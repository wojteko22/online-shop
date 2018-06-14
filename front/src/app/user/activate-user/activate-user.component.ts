import {Component, OnInit} from '@angular/core';
import {UserService} from "../../-services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackBarService} from "../../snack-bar.service";

@Component({
  selector: 'app-customer',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.css']
})
export class ActivateUserComponent implements OnInit {

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: SnackBarService) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const token: string = paramMap.get('token');
      this.userService.activateUser(token).subscribe(() => {
        this.snackBar.show("Konto zostało aktywowane!");
        setTimeout(this.redirectToHomepage(), 3000)
      });
    });
  }

  ngOnInit() {
  }

  redirectToHomepage() {
    this.router.navigate(['/'])
  }

}
