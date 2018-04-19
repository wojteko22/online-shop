import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../-services/product.service';
import {CredentialsService} from '../../../-services/credentials.service';
import {Product} from '../../../-models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private prodService: ProductService,
              private credentialsService: CredentialsService) {
    prodService.getShopProducts(this.credentialsService.getUser().shopId).subscribe((products) => {
      this.products = products;
    })
  }

  ngOnInit() {
  }


}
