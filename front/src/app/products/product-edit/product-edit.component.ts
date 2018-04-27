import {Component} from '@angular/core';
import {AddProductComponent} from '../add-product/add-product.component';
import {CategoriesService} from '../../categories/categories.service';
import {CredentialsService} from '../../-services/credentials.service';
import {FormBuilder} from '@angular/forms';
import {ProductService} from '../../-services/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../-models/Product';


@Component({
  selector: 'app-product-edit',
  templateUrl: '../add-product/add-product.component.html',
  styleUrls: ['../add-product/add-product.component.css']
})
export class ProductEditComponent extends AddProductComponent {

  submitText = 'Nadpisz dane produktu';
  private id: number;

  constructor(fb: FormBuilder,
              categoriesService: CategoriesService,
              productService: ProductService,
              credentialsService: CredentialsService,
              private activatedRoute: ActivatedRoute) {
    super(fb, categoriesService, productService, credentialsService);

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.id = Number(paramMap.get('id'));
      this.productService.getProduct(this.id).subscribe((product) => this.form.patchValue(product));
    });
  }

  protected useService(product: Product) {
    this.productService.editProduct(this.id, product).subscribe();
  }
}
