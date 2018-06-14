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
  productsInCategory$: Observable<Number>;
  shop: Shop = new Shop();
  categories: CategorySimpleDto[];
  page: number = 0;
  pages: number = 1;
  productsPerPage: number = 2;
  productsInCategory: number = -1;
  selectedCategoryId: number = -1;

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
        this.loadShopCategories(shop.id);

        this.selectCategory.categoryId.subscribe((categoryId) => {
          this.selectedCategoryId = categoryId;
          this.page = 0;
          this.productsPerPage = 2;
          this.products$ = this.productService.getProductsByCategoryAndPage(this.shop.id, this.selectedCategoryId, this.page, this.productsPerPage);
          this.productsInCategory$ = this.productService.getProductsAmountInCategory(this.shop.id, this.selectedCategoryId);
          this.countPages();
          this.loadProductsInCategory();
        });

      });

    });
  }

  getProductsByPattern(pattern: string) {
    if (pattern.length > 0) {
      this.products$ = this.productService.getProductsLike(this.shop.id, pattern);
      this.page=0;
      this.productsPerPage=0;
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
      console.log("select categor: " + this.categories[0].categoryId);
      this.selectCategory.selectCategory(this.categories[0].categoryId);
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


  getProductsByPageSize() {
    this.countPages();
    this.products$ = this.productService.getProductsByCategoryAndPage(this.shop.id, this.selectedCategoryId, this.page, this.productsPerPage);
  }

  nextPage() {
    if ((this.page + 1) < this.productsInCategory / this.productsPerPage) {
      this.page++;
      this.getProductsByPageSize();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.getProductsByPageSize();
    }
  }


  private loadProductsInCategory() {
    this.productService.getProductsAmountInCategory(this.shop.id, this.selectedCategoryId).subscribe((amount) => {
      this.productsInCategory = amount;
      this.countPages()
    })
  }

  private countPages() {
    const p = this.productsInCategory / this.productsPerPage;
    if (p < 1) {
      this.pages = 1;
    } else {
      this.pages = Math.ceil(p)
    }

    if(this.page>=this.pages){
      this.page=0;
    }
  }

}
