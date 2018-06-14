import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../-services/product.service';
import {Product} from '../../../-models/Product';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {CredentialsService} from "../../../-services/credentials.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  product$: Observable<Product>;
  isOwner: boolean;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private credentialsService: CredentialsService) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const productId = Number(paramMap.get('productId'));
      const shopId = Number(paramMap.get('shopId'));
      this.product$ = this.productService.getProduct(productId, shopId);
      this.isOwner = this.credentialsService.isShopOwner();
    });
  }

  ngOnInit() {
  }

}
