import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../categories/categories.service';
import {Category} from '../../categories/Category';
import {CategoryPath} from './category-path';
import {Product} from '../../-models/Product';
import {ProductService} from '../../-services/product.service';
import {CredentialsService} from '../../-services/credentials.service';

@Component({
  selector: 'app-app-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {

  form: FormGroup;
  categoriesPath: CategoryPath[] = [];

  constructor(private fb: FormBuilder,
              private categoriesService: CategoriesService,
              private prodService: ProductService,
              private credentialsService: CredentialsService) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      unit: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      photo: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe((categories) => categories.forEach(
      (category) => this.addAllCategoryPath(category, category.name)
    ));
  }

  private addAllCategoryPath(category: Category, path: string) {
    if (category.subcategories.length === 0) {
      this.categoriesPath.push(new CategoryPath(category.id, path));
    } else {
      category.subcategories.forEach((subcategory) => {
        const p = path + ' - ' + subcategory.name;
        this.addAllCategoryPath(subcategory, p);
      });
    }
  }

  onSubmit() {
    const shopId = this.credentialsService.getUser().shopId;
    const product = {...this.form.value, shopId: shopId} as Product;
    this.prodService.addProduct(product).subscribe((response) => console.log('id:', response));
  }
}
