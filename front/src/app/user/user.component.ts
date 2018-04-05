import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  email: string;
  name: string;
  role: string;
  shop: string;
  id: string;

  ngOnInit() {
    if (localStorage.getItem('userEmail') == null) {
      this.getUserData();
    } else {
      this.fillFields();
    }
  }

  private getUserData() {
    this.userService.getUserInfo().subscribe(
      userDto => this.saveUserData(userDto)
    );
  }

  private saveUserData(userDto) {
    this.userService.saveUserSession(userDto);
    this.fillFields();
  }

  private fillFields() {
    this.id = localStorage.getItem('userId');
    this.email = localStorage.getItem('userEmail');
    this.name = localStorage.getItem('userName');
    this.role = localStorage.getItem('userRole');
    this.shop = localStorage.getItem('shopId');
  }
}
