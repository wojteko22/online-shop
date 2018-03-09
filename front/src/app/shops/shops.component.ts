import { Component, OnInit } from '@angular/core';
import { ShopsService } from './shops.service';
import { Shop } from './Shop';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css'],
  providers: [ ShopsService ],
})
export class ShopsComponent implements OnInit {
  shops: Shop[];

  constructor(private shopsService: ShopsService) { }

  ngOnInit() {
    this.getShops();
  }

  getShops(): void {
    this.shopsService.getShops()
      .subscribe(shops => this.shops = shops);
  }
}
