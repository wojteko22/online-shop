import {Component, OnInit} from '@angular/core';
import {UserService} from '../-services/user.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../-models/User';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.users$ = this.userService.getUsers();
  }

}
