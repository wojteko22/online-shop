import {Component, OnInit} from '@angular/core';
import {Product} from '../../orders/product';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../-services/product.service';
import {Shop} from '../../shops/shop';
import {ShopsService} from '../../shops/shops.service';
import {CategoriesService} from '../../categories/categories.service';
import {CategorySimpleDto} from '../../-models/CategorySimpleDto';
import {SelectCategoryService} from './select-category.service';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.css'],
  providers: [ProductService, ShopsService, CategoriesService]
})
export class ShopProductsComponent implements OnInit {

  products: Product[];
  shop: Shop = new Shop();
  categories: CategorySimpleDto[];

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private shopsService: ShopsService,
              private categoriesService: CategoriesService,
              private selectCategory: SelectCategoryService) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      let shopId: Number = Number(paramMap.get('shopId'));

      this.shopsService.getShopInfo(shopId).subscribe((shop) => {
        this.shop = shop;
        this.loadAllProducts();
      });

      this.categoriesService.getCategories().subscribe((categories) => {
        this.categories = categories.map((c) => new CategorySimpleDto(c.name, c.id, c.parentCategory));
      });

      this.selectCategory.categoryId.subscribe((categoryId) => {
        this.productService.getCategoryProducts(categoryId).subscribe((products) => {
            this.products = products;
          }
        );
      });
    });
  }

  getProductsByPattern(pattern: string) {
    if(pattern.length>0) {
      this.productService.getProductsLike(this.shop.id, pattern).subscribe((products) => {
        this.products = products;
      })
    } else {
      this.loadAllProducts();
    }
  }

  loadAllProducts(){
    this.productService.getShopProducts(this.shop.id).subscribe((products) =>
      this.products = products);
  }

  ngOnInit() {

  }

}
