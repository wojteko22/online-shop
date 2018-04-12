import {Component, OnInit} from '@angular/core';
import {ShopsService} from './shops.service';
import {ShopDto} from './ShopDto';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css'],
  providers: [ ShopsService ],
})
export class ShopsComponent implements OnInit {
  shops: ShopDto[];

  constructor(private shopsService: ShopsService) { }

  ngOnInit() {
    this.getShops();
  }

  getShops(): void {
    this.shopsService.getShops()
      .subscribe(shops => this.shops = shops);
  }
}
