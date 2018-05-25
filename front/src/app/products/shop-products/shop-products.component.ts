import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../-services/product.service';
import {Shop} from '../../shops/shop';
import {ShopsService} from '../../shops/shops.service';
import {CategoriesService} from '../../categories/categories.service';
import {CategorySimpleDto} from '../../-models/CategorySimpleDto';
import {SelectCategoryService} from './select-category.service';
import {MatDialog} from '@angular/material';
import {ProductDialogComponent} from './product-dialog/product-dialog.component';
import {Product} from '../../-models/Product';
import {CartService} from '../../cart/cart.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.css'],
  providers: [ProductService, ShopsService, CategoriesService]
})
export class ShopProductsComponent implements OnInit {

  products$: Observable<Product[]>;
  shop: Shop = new Shop();
  categories: CategorySimpleDto[];

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private shopsService: ShopsService,
              private categoriesService: CategoriesService,
              private selectCategory: SelectCategoryService,
              private dialog: MatDialog,
              private cartService: CartService) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const shopId = Number(paramMap.get('shopId'));
      this.shopsService.getShopInfo(shopId).subscribe((shop) => {
        this.shop = shop;
        this.loadAllProducts();
        this.loadShopCategories(shop.id);
      });

      this.selectCategory.categoryId.subscribe((categoryId) => {
        this.products$ = this.productService.getCategoryProducts(categoryId, shopId);
      });
    });

  }

  getProductsByPattern(pattern: string) {
    if (pattern.length > 0) {
      this.products$ = this.productService.getProductsLike(this.shop.id, pattern);
    } else {
      this.loadAllProducts();
    }
  }

  loadAllProducts() {
    this.products$ = this.productService.getShopProducts(this.shop.id);
  }

  loadShopCategories(shopId: number) {
    this.categoriesService.getShopCategories(shopId).subscribe((categories) => {
      this.categories = categories.map((c) => new CategorySimpleDto(c.name, c.id, c.parentCategory));
    });
  }

  ngOnInit() {

  }

  addToChart(product: Product) {
    const productAmount = 1;
    const dialog = this.dialog.open(ProductDialogComponent, {
      width: '250px',
      data: {amount: productAmount}
    });
    dialog.afterClosed().subscribe((result) => {
      this.cartService.addToCart(this.shop, product, result);
    });
  }

}
