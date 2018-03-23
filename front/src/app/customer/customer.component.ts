import { Component, OnInit } from '@angular/core';
import {CustomerService} from "./customer.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {

  constructor(private cSrv: CustomerService) { }

  email: string;
  name: string;

  ngOnInit() {
    this.cSrv.getLoggedUser().subscribe((userDto) => {
      this.email=userDto.email;
      this.name=userDto.name;
    })
  }

}
