import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../-services/product.service';
import {Product} from '../../../-models/Product';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  product$: Observable<Product>;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id: Number = Number(paramMap.get('id'));
      this.product$ = this.productService.getProduct(id);
    });
  }

  ngOnInit() {
  }

}
