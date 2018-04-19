import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../-services/product.service';
import {Product} from '../../../-models/Product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService],
})
export class ProductComponent implements OnInit {

  product: Product;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      let id : Number = Number(paramMap.get('id'));
      console.log(id);
      this.productService.getProduct(id).subscribe( product => {
        this.product=product;
        console.log(this.product);
      })
    });

  }

  ngOnInit() {
  }

}
