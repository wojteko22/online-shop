import {Component, OnInit} from '@angular/core';
import {UserService} from '../-services/user.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../-models/User';
import 'rxjs-compat/add/operator/filter';
import 'rxjs-compat/add/operator/map';

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
    this.getUsers();
  }

  delete(id: number) {
    this.userService.deleteUser(id).subscribe(() => this.getUsers());
  }

  private getUsers() {
    this.users$ = this.userService.getUsers();
  }
}
