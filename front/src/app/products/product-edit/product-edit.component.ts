import {Component, OnInit} from '@angular/core';
import {AddProductComponent} from '../add-product/add-product.component';
import {CategoriesService} from '../../categories/categories.service';
import {CredentialsService} from '../../-services/credentials.service';
import {FormBuilder} from '@angular/forms';
import {ProductService} from '../../-services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: '../add-product/add-product.component.html',
  styleUrls: ['../add-product/add-product.component.css']
})
export class ProductEditComponent extends AddProductComponent implements OnInit {

  constructor(fb: FormBuilder,
              categoriesService: CategoriesService,
              prodService: ProductService,
              credentialsService: CredentialsService) {
    super(fb, categoriesService, prodService, credentialsService);
  }

  ngOnInit() {
  }

}
