import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../-models/Product';
import {environment} from '../../environments/environment';
import {CredentialsService} from './credentials.service';

@Injectable()
export class ProductService {

  private productEndpoint = environment.apiUrl + '/products';

  private get ownerUrl() {
    const shopId = this.auth.getShopId();
    return ProductService.url(shopId);
  }

  private static url(shopId: number) {
    return `${environment.apiUrl}/shops/${shopId}/products`;
  }

  constructor(private http: HttpClient, private auth: CredentialsService) {
  }

  addProduct(product: Product) {
    return this.http.post(this.ownerUrl, product);
  }

  editProduct(id: number, product: Product) {
    return this.http.patch(this.ownerUrl + '/' + id, product);
  }

  getShopProducts(shopId: number) {
    const url = ProductService.url(shopId);
    return this.http.get<Product[]>(url);
  }

  getProductsByCategoryAndPage(shopId: number, categoryId: Number, pageNumber: Number, pageSize: Number) {
    const url = ProductService.url(shopId);
    return this.http.get<Product[]>(url + '/category/' + categoryId + '/page/' + pageNumber + '/' + pageSize);
  }

  getProductsAmountInCategory(shopId: number, categoryId: Number) {
    const url = ProductService.url(shopId);
    return this.http.get<number>(url + '/category/' + categoryId + '/amount');
  }

  getProduct(productId: number, shopId?: number) {
    const shopUrlPart = shopId ? ProductService.url(shopId) : this.ownerUrl;
    const url = shopUrlPart + '/' + productId;
    return this.http.get<Product>(url);
  }

  getCategoryProducts(categoryId: number, shopId: number) {
    const url = ProductService.url(shopId);
    return this.http.get<Product[]>(url + '/category/' + categoryId);
  }

  getProductsLike(shopId: number, pattern: string) {
    const url = ProductService.url(shopId);
    return this.http.get<Product[]>(url + '/pattern/' + pattern);
  }
}
